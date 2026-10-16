# Shandong Lantian Energy Technology Co., Ltd. — Release 30

Public website: https://zilong708090-star.github.io/energy-export-site/

## Release 30 — simplified partnership closing

The homepage and shared page footers now close with the owner's requested English message: “Let our long-term partnership begin with getting to know each other.” The footer WhatsApp call-to-action, navigation columns and their labels, product/category tagline, specification line and media note have been removed. The unmarked company wordmark and small integrated-energy label remain, with a shorter layout rather than empty link-column space. An `#footer` anchor permits direct review of the updated area.

The floating WhatsApp control hides while a footer is in view, matching the marked screenshot. It remains available elsewhere; the masthead project-contact button and main contact section are unchanged. Cache tags are `30.1`. Catalogue data, company profile, entrance image, first-screen carousel and the approved homepage reading width are unchanged.

## Release 29 — company profile and solution-led masthead

The company section (`#company`) now contains the owner's complete English company profile in five editorial groups: integrated energy solutions, capabilities across products and projects, regional project experience, international presence and commitment. The founding year (2017), workforce (more than 3,000 employees), market regions and multi-country warehouses/branch offices are owner-supplied statements, not newly researched or inferred claims. No named project, client, country-specific office, certification or additional historical date has been invented. The old undated development-priority panel has been replaced by the supplied business narrative, with the `#company-development` anchor retained for the capabilities section.

The residential rooftop image is replaced by a factory-entrance brand visualization bearing the requested Chinese company name. Its on-page caption and media register identify it as a visualization, not evidence of an actual company-owned facility. Final source, prompt and image paths are recorded in `assets/COMPANY_R29_MEDIA.md`.

The six top navigation links and hamburger menu have been removed from the homepage, generated catalogue/detail pages and standalone buyer guides. A non-interactive English descriptor, “One-stop Energy Solutions”, takes their place on desktop; the company home link and direct WhatsApp “Start a project” remain. On phones the descriptor hides to preserve room for the contact button. This is a solution-led company website, not an online checkout: technology directories remain available within page content, without adding shopping-cart or payment behavior. Shared cache tags are `29.2`; masthead-specific styles are in `header-solutions.css`. The hero slides, product category identities and R27 reading width are preserved.

The floating WhatsApp pill hides while the company section is in view so it cannot obscure the entrance sign, workforce figure or long-form profile. The sticky masthead's direct project contact remains visible, and the floating contact returns outside the section. Company and masthead layouts are checked at desktop, tablet and narrow phone widths.

## Release 28 — white product cover and richer photo collections

The Wind Turbines category now uses the existing, naturally white-background Oulu FD-series complete-unit image, linked to its own `wind-500w-horizontal` catalogue record. The rotor, generator housing, short display support and base remain visible. It is not mislabelled as the previous AH-10KW installation. That previous installation remains available within the catalogue; no numerical product specifications were changed.

The verification area (`#verification`) now has a three-photo composition: cabinet interiors, battery-module connection inspection and solar-module EL/VI image review. The dispatch area (`#dispatch`) has a separate three-photo composition covering protective packing, staged export cases and container loading. Four new reviewed photographs have been added. Supplier-reference captions distinguish the visible process from any claim of company-owned premises or a successful test result. Every new photo opens by clicking the image or its labelled button. The shared image viewer keeps the six field references, three verification images and three dispatch images in separate collections, with arrow keys, previous/next controls and Escape/close support.

The homepage hero, approved company copy and Release 27 side margins remain unchanged. Desktop and phone layouts are checked separately; images are lazy-loaded and the original source files are retained outside the published checkout. Asset/source links and exact built-in editing prompts are indexed in `assets/HOMEPAGE_MEDIA_R28.md`. Shared cache tags are `28.1`.

## Release 27 — larger homepage side margins

The homepage hero/carousel, navigation, slide copy and media positioning remain unchanged. All 17 content containers below the hero, including the footer, now use a narrower homepage-only frame: `clamp(940px, 72vw, 1120px)` above 1050px. On a 1440px viewport this yields a 1036.8px content area with approximately 201.6px / 14% margins on each side, instead of the previous 80px / 5.6%. On a 1800px viewport the content is capped at 1120px with 340px margins. Full-width section backgrounds are retained. The `.home-page` scope leaves product/resource pages and the hero/header unaffected. Below-hero display headings and four-column product labels/arrows are adapted to the narrower frame; category names, images and links are unchanged. At 1051–1350px, product cards remain two columns and engineering uses a stacked layout. The 940px lower bound avoids a width jump at the existing 1050px tablet breakpoint; phones keep their existing 16px gutters.

Browser checks at 1800, 1440, 1351, 1350, 1181, 1051, 1050 and 390px confirm aligned section edges and no horizontal page or text overflow. Hero markup is unchanged; on the 1440px test its 1440px width, 980px height and 1280px content frame remain intact. Shared asset cache tags are now `27.1`.

## Delivered pages

- Homepage: `index.html`
- Complete product catalogue: `products/index.html`
- Energy storage cabinets only: `products/energy-storage.html`
- Battery-only modules: `products/battery-modules.html`
- Containerized battery storage: `products/containerized-storage.html`
- Inverters: `products/inverters.html`
- Solar PV modules: `products/solar-modules.html`
- Wind Turbines: `products/wind-turbines.html` (the old `small-wind.html` address redirects here)
- Storage planning guide: `resources/storage-planning.html`
- Hybrid power guide: `resources/hybrid-power.html`
- Export project checklist: `resources/project-checklist.html`
- Downloadable project brief: `resources/project-brief-template.txt`
- Fifty active individual product configurations: `products/details/*.html`
- Fifty active downloadable technical selection summaries: `resources/specifications/*.txt`
- Technical source register: `resources/catalog-reference.html`

## Product catalogue delivery

The website now has 65 static HTML pages, including three compatibility redirect pages. The four homepage product families lead to physical-equipment directories, with 21 equipment-format subgroups, counted filters, unit/model search and a three-product comparison tool. The active directory includes 12 storage, 14 inverter, 12 solar and 12 wind configurations (50 total), 714 labelled technical fields, 46 distinct product/gallery images and 50 specification downloads. Each configuration includes source/model notes and a direct WhatsApp quotation link. Homepage hero/carousel visuals and the company section remain unchanged.

All four homepage covers use reviewed catalogue equipment on white backgrounds: a liquid-cooled battery storage cabinet, a wall-mounted three-phase hybrid inverter, PV front/rear module views and a complete compact wind turbine on its display support. `catalog-data/categories.json` ties each cover to a product ID in its own category. The builder updates the marked homepage grid from those records; regression checks reject mismatched category IDs, images and links. Previously ambiguous supplier pack covers are retained as historical assets but are no longer used as category covers.

Category pages explain the equipment's role and provide photo-led format navigation. Storage equipment is now separated into three actual directories: 3 commercial cabinets, 8 battery-only wall/rack/high-voltage stacked modules, and 1 DC battery container. The cabinet entry contains only cabinet products, including its related recommendations and detail-page return routes. The full catalogue filters these three physical formats separately. Two former residential inverter-plus-battery all-in-one records have been withdrawn from active presentation; their old detail URLs redirect to the current cabinet directory and their old TXT files show a withdrawal notice. Neither is in the sitemap or active source register. Their source records remain recoverable outside the published checkout. Inverters distinguish off-grid, single-phase and three-phase LV hybrid, commercial HV hybrid, microinverters and grid-tied string units. PV includes full-black, rooftop, clear bifacial, commercial, flexible, compact and utility configurations. Wind Turbines separates horizontal-axis, pitch-controlled and vertical-axis generators; it is not a replacement-blade category. Filter links retain their type on reload. Exact model references and family-photo captions are visible on cards; captions are also retained in comparison, enlargement, details and downloads.

The previous four generic product marketing pages have been replaced by these category directories while preserving their public URLs. A new complete-catalogue link is available beside the four-family homepage display and in the footer. The source register and model-specific caveats distinguish reviewed supplier data from any claim of Lantian manufacture, current inventory, pricing, warranty or certified compatibility.

Catalogue data is maintained in `catalog-data/{storage,inverters,solar,wind}.json`; reviewed category identity/cover links are in `catalog-data/categories.json`, and retired URL handling is in `catalog-data/retired-products.json`. Each storage record has an explicit `equipmentType`; do not move a battery module or integrated residential inverter into the cabinet directory. Generated homepage grid, catalogue HTML, TXT downloads and sitemap can be rebuilt with `node scripts/build-catalog.mjs`. Run `node scripts/check-catalog.mjs` for schema, physical-equipment membership, category-cover correspondence, return/related-product routing, retirement redirects, static specification, image-caption, download-note, internal-link and sitemap checks. Category search/comparison and product image enlargement are in `catalog.js`; catalogue-only styling is in `catalog.css`. No package installation or server backend is required.

R25 classification and clean complete-turbine photo provenance are indexed in `assets/CATALOG_R25_AUDIT.md`. R24 image-edit provenance and final asset paths remain in `assets/CATALOG_R24_AUDIT.md`; R23 records remain in `assets/CATALOG_EDIT_NOTES.md`. No numerical specifications were inferred from the new photographs. Original/rejected source images and generated PNG masters are retained recoverably outside the publishable checkout; only reviewed delivery images are referenced by the website.

## Visitor experience

The homepage includes the existing automatic/manual carousel, a full company profile before the technology categories, company facts, manufacturing/engineering capabilities, regional experience and international operations, four technology categories, system architecture selector, six industry-specific outage use cases, six photo-led application scenarios, a grouped twelve-photo image viewer, engineering, production, inventory, three-image verification and export-packing collections, quotation process, project support, buyer resources, a prominent direct WhatsApp contact panel and FAQ.

The former abstract operating-problem cards are now concrete application cards: large hospitals, supermarkets/cold chain, factories, hotels, farm irrigation and remote communities. Each pairs an outage risk with the selected-load power priority and a context-specific WhatsApp link. Hospital copy explicitly coordinates with the site's electrical team, UPS, generators and transfer design; refrigeration copy accounts for starting loads and backup duration. These are representative planning scenarios, not claimed company installations or guarantees of uninterrupted operation or food safety.

The company introduction uses the owner-provided English profile, including establishment in 2017 and more than 3,000 employees. Other dated company milestones have not been provided and none have been invented. The previous development-direction placeholder has been replaced by the supplied capabilities, project-experience, presence and commitment copy.

Each product detail page includes a corresponding supplier product/family view, a labelled parameter table, applications, source/model notes, a download and direct WhatsApp contact. Additional gallery angles are provided only when reviewed matching images are available. The resource pages provide linked contents, practical procurement information and a downloadable project brief.

The company name is displayed in English as Shandong Lantian Energy Technology Co., Ltd. across page headers, footers and browser titles. No graphical logo has been added. All contact buttons use WhatsApp +86 152 2422 0207. The homepage information form has been removed entirely. Application links open WhatsApp directly with a context-specific inquiry. The floating WhatsApp control contracts to its icon while the homepage product grid is visible, so it does not cover product names; its label remains elsewhere. It hides while the company profile, large WhatsApp contact card or page footer is in view. No website form or database collects visitor information; visitors choose whether to send the prepared message within WhatsApp.

## Maintaining the website

- Edit homepage content in `index.html`.
- Edit page layouts and responsive appearance in `styles.css`; solution-led masthead styling is in `header-solutions.css`.
- Edit carousel, image viewer and navigation behaviour in `app.js`.
- Images are local in `assets/`; image provenance is recorded in `assets/ASSET_SOURCES.md`.
- When adding or renaming a page, update `sitemap.xml` and relevant navigation links.
- Bump the CSS/JS `?v=` values across all pages when changing those shared files.
- The project is buildless HTML/CSS/JavaScript. Any standard static web host can serve it.
- The current GitHub Pages deployment publishes the root of the `main` branch.

## Local preview

From the extracted project directory:

```sh
python3 -m http.server 4175 --bind 127.0.0.1
```

Open http://127.0.0.1:4175/ in a browser. Stop the local preview with Ctrl+C.

## Asset selection

Eight usable pictures from the supplied Alibaba pack were integrated, together with five additional supplier photographs of wind installations, wind assembly, cabinet interiors and battery inventory. The pack's damaged/used-panel loading picture was excluded from the customer-facing presentation. Existing authorized field imagery remains in the site.

Product ratings, certifications, commercial terms and support scope are supplied with the selected-model quotation rather than invented for the website.
