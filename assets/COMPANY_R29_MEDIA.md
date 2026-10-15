# Company introduction entrance image — Release 29

Prepared 2026-10-16 (Asia/Shanghai).

## Final asset and status

- Published project asset: `assets/company-factory-entrance-r29.jpg`.
- Absolute project asset: `/Users/zilongyang/Documents/Codex/2026-09-30/wo/work/github-pages-energy-export-site/assets/company-factory-entrance-r29.jpg`.
- Size: 1448 × 1086 pixels (4:3), JPEG, quality 90.
- The entrance sign reads exactly **山东蓝天能源科技有限公司**. All 12 characters were visually checked at original resolution.
- This is a **branded entrance visualization / brand entrance mockup**, created by editing a supplier entrance photograph. It is not a photograph supplied by the company and must not be used as evidence of ownership of the depicted buildings, the company's actual factory, factory size, workforce, capacity, certifications, or project execution.
- Suggested visible caption: `Factory entrance branding concept.`
- Suggested image alternative text: `Factory entrance branding concept with the Chinese name 山东蓝天能源科技有限公司 on a central monument sign.`
- No third-party branding or watermark is visible in the approved final image. No certifications, flags or awards were added.

## Input photograph

- Source page: [About SUNPAL ESS](https://www.sunpaless.com/about-sunpal/).
- Direct source photograph: [SUNPAL entrance photograph](https://www.sunpaless.com/wp-content/uploads/2026/09/2008.webp).
- Retrieved 2026-10-16.
- Retained original, outside the publishing repository: `/Users/zilongyang/Documents/Codex/2026-09-30/wo/work/r29-company-media/sunpal-entrance-original.webp`.
- The original was loaded with `view_image` before the edit. It showed white industrial buildings, a security booth and a central Sunpal / 尚瑞新能源 monument sign, with a dark website overlay.
- The user's request states that the required material permissions have been obtained. This record documents the input and transformation; it does not independently verify authorization or imply an affiliation with the source supplier.

## Editing method

- **Built-in image generation/editing tool mode** (`image_gen.imagegen`), not CLI/API fallback.
- One targeted edit call, with the retained source photograph as the edit target.
- Native generated PNG retained: `/Users/zilongyang/.codex/generated_images/01a14096-78b5-73f1-a0af-82ad7b38734b/exec-9a3becdb-c9a6-426b-bd48-f7baa6297408.png`.
- The approved PNG was converted to JPEG with macOS `sips` (format conversion only). No shell, Python, SVG, or canvas compositing was used to perform the image edit.
- Review: correct Chinese wording, full sign inside central image area, coherent entrance geometry, natural daytime exposure, complete gate and booth, no visible source logo/watermark.

## Exact prompt

```text
Use case: text-localization / precise-object-edit.
Asset type: photorealistic company-entrance branding concept for an English corporate energy website. This is a branded illustrative mockup, not documentary proof of a particular company facility.
Input image 1 is the edit target: a real factory entrance photograph, two white industrial buildings, blue canopy at the security booth, and a central white monument sign. Preserve the believable architecture, road, trees, gate, material textures, perspective and natural proportions.
Primary edit: remove the Sunpal green swirl/logo, the English Sunpal brand and the existing Chinese 尚瑞新能源 text from the white monument. Replace with one centered line of large dark navy blue Chinese metal lettering, exact verbatim text: "山东蓝天能源科技有限公司". Spell and render all 12 Chinese characters accurately: 山 东 蓝 天 能 源 科 技 有 限 公 司. No other writing on the sign. The Chinese should be highly legible, professional contemporary sans-serif, a physically mounted industrial entrance sign, with perspective and soft realistic letter shadows matched to the stone sign surface. Enlarge the sign within the image moderately so the full name remains readable in a website image panel; keep the sign in the central 70 percent of the frame and do not crop any character.
Remove any tiny third-party name on far factory facades as well. Retain the complete entrance and security booth. Brighten the dark website overlay into natural daytime photographic exposure, blue sky and realistic white facades, no excessive saturation, no overly dramatic sky or cinematic color grade. Produce a 4:3 horizontal composition by sensible reframing, keeping the factory entrance monument and surrounding buildings coherent, factory gate visible and well-balanced. No people, no fabricated awards or certification signs, no flags, no logos, no watermarks. Do not add English company text; the only readable wording should be 山东蓝天能源科技有限公司.
```
