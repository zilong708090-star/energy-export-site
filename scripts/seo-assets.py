#!/usr/bin/env python3
"""Post-build SEO/performance pass for the Lantian site.

Idempotent. Run after the catalogue build:

    node scripts/build-catalog.mjs      # regenerates all HTML
    python3 scripts/seo-assets.py       # this pass

It does four things:

1. Generates WebP derivatives (480 / 960 / 1440 / full width) for every
   raster image referenced by an <img> element.
2. Rewrites those <img> elements to WebP with srcset + sizes.
3. Preloads the home-page hero image (the LCP element) and marks it
   fetchpriority="high".
4. Adds the site-level pieces that were missing: a robots meta tag, real
   favicon links, and Organization / WebSite / BreadcrumbList JSON-LD.

Images whose .src is mutated at runtime by app.js or catalog.js keep a
single src and no srcset, so the JavaScript image swaps keep working.
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import urljoin

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
ORIGIN = "https://www.photovoltaicpanels.com.cn/"
RASTER = {".jpg", ".jpeg", ".png", ".webp"}
WIDTHS = (480, 960, 1440)
QUALITY = 76
SITE_NAME = "Shandong Lantian Energy Technology Co., Ltd."

IMG_RE = re.compile(r"<img\b[^>]*>", re.I)
ATTR_RE = re.compile(r'([\w:.-]+)(?:\s*=\s*"([^"]*)")?')
DIALOG_RE = re.compile(r"<dialog\b[^>]*>[\s\S]*?</dialog>", re.I)

stats = {"images": 0, "derivatives": 0, "srcset": 0, "preload": 0, "schema": 0, "files": 0}


# --------------------------------------------------------------------------- #
# attribute helpers
# --------------------------------------------------------------------------- #
def attr_items(tag: str) -> list[list[str]]:
    """Return [[name, value], ...] in source order, keeping bare attributes.

    Boolean attributes such as `data-product-image` have no value and must
    survive the round-trip: catalog.js looks them up.
    """
    inner = re.match(r"<\s*img\b(.*)", tag, re.I)
    body = inner.group(1) if inner else tag
    body = body.rstrip()[:-1] if body.rstrip().endswith(">") else body
    return [[m.group(1), m.group(2) or ""] for m in ATTR_RE.finditer(body)]


def render_tag(name: str, items: list[list[str]]) -> str:
    parts = []
    for key, value in items:
        parts.append(f" {key}" if value == "" else f' {key}="{value}"')
    return f"<{name}{''.join(parts)}>"


def set_attr(items: list[list[str]], key: str, value: str) -> None:
    for pair in items:
        if pair[0].lower() == key.lower():
            pair[1] = value
            return
    items.append([key, value])


def del_attr(items: list[list[str]], key: str) -> None:
    for pair in list(items):
        if pair[0].lower() == key.lower():
            items.remove(pair)


def get_attr(items: list[list[str]], key: str) -> str | None:
    for k, v in items:
        if k.lower() == key.lower():
            return v
    return None


def strip_tags(value: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", value)).strip()


# --------------------------------------------------------------------------- #
# image derivatives
# --------------------------------------------------------------------------- #
def webp_for(source: Path, width: int | None) -> Path:
    """Create (or reuse) a WebP derivative of `source` at `width` px."""
    suffix = f"-{width}" if width else ""
    target = source.with_name(f"{source.stem}{suffix}.webp")
    if target.exists() and target.stat().st_mtime >= source.stat().st_mtime:
        return target

    with Image.open(source) as im:
        im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
        if width and width < im.width:
            height = max(1, round(im.height * width / im.width))
            im = im.resize((width, height), Image.LANCZOS)
        im.save(target, "WEBP", quality=QUALITY, method=5)
    stats["derivatives"] += 1
    return target


def variant_widths(source: Path) -> list[int]:
    with Image.open(source) as im:
        natural = im.width
    return [w for w in WIDTHS if w < natural] + [natural]


# --------------------------------------------------------------------------- #
# favicon
# --------------------------------------------------------------------------- #
INK = "#07111f"
BRIGHT = "#baff4a"


def _icon(size: int) -> Image.Image:
    """Lime sun over a horizon bar on the site's ink background (128-unit grid)."""
    k = size / 128
    im = Image.new("RGB", (size, size), INK)
    draw = ImageDraw.Draw(im)
    draw.ellipse([34 * k, 22 * k, 94 * k, 82 * k], fill=BRIGHT)
    draw.rectangle([14 * k, 88 * k, 114 * k, 100 * k], fill=BRIGHT)
    return im


def write_favicons() -> None:
    assets = ROOT / "assets"
    for name, size in {"favicon-32.png": 32, "favicon-180.png": 180, "favicon-512.png": 512}.items():
        target = assets / name
        if not target.exists():
            _icon(size).save(target, "PNG")

    ico = ROOT / "favicon.ico"
    if not ico.exists():
        _icon(48).save(ico, sizes=[(16, 16), (32, 32), (48, 48)])


# --------------------------------------------------------------------------- #
# HTML pass
# --------------------------------------------------------------------------- #
def relative_url(target: Path, page_dir: Path) -> str:
    return Path(os.path.relpath(target, page_dir)).as_posix()


def process_page(page: Path) -> None:
    html = page.read_text(encoding="utf-8")
    if 'http-equiv="refresh"' in html:
        return

    page_dir = page.parent
    dialog_spans = [m.span() for m in DIALOG_RE.finditer(html)]

    def rewrite(match: re.Match) -> str:
        tag = match.group(0)
        items = attr_items(tag)
        if get_attr(items, "data-seo-img") == "1":
            return tag  # already processed, keep the pass idempotent
        src = get_attr(items, "src")
        if not src or src.startswith(("http://", "https://", "data:")):
            return tag
        source = (page_dir / src).resolve()
        if not source.is_file() or source.suffix.lower() not in RASTER:
            return tag
        if ROOT not in source.parents and source.parent != ROOT:
            return tag

        in_dialog = any(start <= match.start() < end for start, end in dialog_spans)
        js_swapped = get_attr(items, "data-product-image") is not None
        width_attr = get_attr(items, "width")
        try:
            width_px = int(width_attr) if width_attr else 0
        except ValueError:
            width_px = 0

        full = webp_for(source, None)
        set_attr(items, "src", relative_url(full, page_dir))
        set_attr(items, "decoding", "async")
        set_attr(items, "data-seo-img", "1")
        stats["images"] += 1

        # A srcset would fight the JavaScript swaps and the enlarge dialog.
        if in_dialog or js_swapped or width_px and width_px <= 160:
            del_attr(items, "srcset")
            del_attr(items, "sizes")
            return render_tag("img", items)

        candidates = []
        for width in variant_widths(source):
            variant = webp_for(source, width)
            candidates.append(f"{relative_url(variant, page_dir)} {width}w")
        set_attr(items, "srcset", ", ".join(candidates))
        set_attr(
            items,
            "sizes",
            f"{width_px}px" if width_px and width_px <= 400 else "(max-width: 700px) 92vw, 45vw",
        )
        stats["srcset"] += 1
        return render_tag("img", items)

    html = IMG_RE.sub(rewrite, html)

    # Home-page hero: the LCP element gets a preload and high priority.
    hero_preload = ""
    if page == ROOT / "index.html":

        def hero(match: re.Match) -> str:
            nonlocal hero_preload
            tag = match.group(0)
            items = attr_items(tag)
            if get_attr(items, "loading") == "lazy" or get_attr(items, "srcset") is None:
                return tag
            set_attr(items, "fetchpriority", "high")
            set_attr(items, "loading", "eager")
            set_attr(items, "sizes", "100vw")  # the hero is a full-bleed panel
            hero_preload = (
                '<link rel="preload" as="image"'
                f' href="{get_attr(items, "src")}"'
                f' imagesrcset="{get_attr(items, "srcset")}"'
                ' imagesizes="100vw" fetchpriority="high">'
            )
            return render_tag("img", items)

        for match in list(IMG_RE.finditer(html)):
            if get_attr(attr_items(match.group(0)), "loading") != "lazy":
                html = html[: match.start()] + hero(match) + html[match.end() :]
                break

    if hero_preload and 'rel="preload"' not in html:
        stats["preload"] += 1
        html = html.replace("</head>", hero_preload + "</head>", 1)

    # robots meta: home, catalogue and guide pages should allow large images.
    if not re.search(r'<meta\s+name="robots"', html, re.I):
        html = html.replace(
            "</head>",
            '<meta name="robots" content="index,follow,max-image-preview:large"></head>',
            1,
        )

    # Real favicon instead of the empty data: placeholder.
    prefix = "../" * len(page_dir.relative_to(ROOT).parts) if page_dir != ROOT else ""
    favicon_links = (
        f'<link rel="icon" href="{prefix}favicon.ico" sizes="any">'
        f'<link rel="icon" type="image/png" sizes="32x32" href="{prefix}assets/favicon-32.png">'
        f'<link rel="apple-touch-icon" href="{prefix}assets/favicon-180.png">'
    )
    html = re.sub(r'<link rel="icon" href="data:,">', favicon_links, html, count=1)
    if 'rel="icon"' not in html and 'rel="apple-touch-icon"' not in html:
        html = html.replace("</head>", favicon_links + "</head>", 1)

    html = add_json_ld(html, page)

    stats["files"] += 1
    page.write_text(html, encoding="utf-8")


def add_json_ld(html: str, page: Path) -> str:
    blocks: list[dict] = []

    # Site-level entity graph, once, on the home page.
    if page == ROOT / "index.html" and '"Organization"' not in html:
        blocks.append(
            {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "Organization",
                        "@id": ORIGIN + "#organization",
                        "name": SITE_NAME,
                        "alternateName": "Shandong Lantian",
                        "url": ORIGIN,
                        "logo": ORIGIN + "assets/favicon-512.png",
                        "description": "Manufacturer and exporter of battery energy storage cabinets, inverters, solar PV modules and small wind turbines for commercial, industrial and remote-energy projects.",
                        "knowsLanguage": "en",
                        "areaServed": [
                            {"@type": "Place", "name": "Africa"},
                            {"@type": "Place", "name": "Middle East"},
                            {"@type": "Place", "name": "Southeast Asia"},
                            {"@type": "Place", "name": "South America"},
                        ],
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "contactType": "sales",
                            "telephone": "+8615224220207",
                            "availableLanguage": ["en", "zh"],
                        },
                    },
                    {
                        "@type": "WebSite",
                        "@id": ORIGIN + "#website",
                        "url": ORIGIN,
                        "name": "Shandong Lantian Energy Technology",
                        "inLanguage": "en",
                        "publisher": {"@id": ORIGIN + "#organization"},
                    },
                ],
            }
        )

    # BreadcrumbList from the visible breadcrumb, if the page has one.
    nav = re.search(r'<nav class="breadcrumb"[^>]*>([\s\S]*?)</nav>', html)
    if nav and '"BreadcrumbList"' not in html:
        page_url = ORIGIN + page.relative_to(ROOT).as_posix()
        entries: list[tuple[str, str]] = []
        for m in re.finditer(
            r'<a\s+href="([^"]+)"[^>]*>([\s\S]*?)</a>|<span>([\s\S]*?)</span>', nav.group(1)
        ):
            if m.group(1):
                name = strip_tags(m.group(2))
                if name:
                    entries.append((name, urljoin(page_url, m.group(1))))
            else:
                name = strip_tags(m.group(3))
                # Skip the "/" separators that sit between the crumb links.
                if name and name not in {"/", "·", "›", ">"}:
                    entries.append((name, page_url))
        if entries and entries[0][0].lower() == "home":
            entries[0] = (entries[0][0], ORIGIN)
        if len(entries) >= 2:
            blocks.append(
                {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {"@type": "ListItem", "position": i + 1, "name": name, "item": url}
                        for i, (name, url) in enumerate(entries)
                    ],
                }
            )

    if not blocks:
        return html

    stats["schema"] += 1
    payload = "".join(
        '<script type="application/ld+json">'
        + json.dumps(block, ensure_ascii=False).replace("<", "\\u003c")
        + "</script>"
        for block in blocks
    )
    return html.replace("</head>", payload + "</head>", 1)


CSS_URL_RE = re.compile(r"url\(\s*([\"']?)([^\"')]+\.(?:jpg|jpeg|png))\1\s*\)", re.I)


def process_css() -> None:
    """Background images cannot use srcset; swap them to WebP outright."""
    for sheet in sorted(ROOT.glob("*.css")):
        text = sheet.read_text(encoding="utf-8")

        def repl(match: re.Match) -> str:
            quote, relative = match.group(1), match.group(2)
            source = (ROOT / relative).resolve()
            if not source.is_file() or source.suffix.lower() not in RASTER:
                return match.group(0)
            target = webp_for(source, None)
            return f"url({quote}{Path(os.path.relpath(target, ROOT)).as_posix()}{quote})"

        updated = CSS_URL_RE.sub(repl, text)
        if updated != text:
            sheet.write_text(updated, encoding="utf-8")
            stats["css"] = stats.get("css", 0) + 1


def sync_sitemap_mirror() -> None:
    """sitemap-main.xml is the copy Search Console reads; keep it identical."""
    generated = ROOT / "sitemap.xml"
    mirror = ROOT / "sitemap-main.xml"
    if not generated.is_file():
        return
    content = generated.read_text(encoding="utf-8")
    if not mirror.is_file() or mirror.read_text(encoding="utf-8") != content:
        mirror.write_text(content, encoding="utf-8")
        stats["sitemap_mirror"] = 1


def main() -> int:
    write_favicons()
    pages = sorted(p for p in ROOT.rglob("*.html") if "node_modules" not in p.parts)
    for page in pages:
        process_page(page)
    process_css()
    sync_sitemap_mirror()
    print(json.dumps(stats, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
