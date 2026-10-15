# Wind catalogue R24 — source and image audit

Reviewed 2026-10-15. Twelve supplier-reference configurations, not twelve claimed in-house models. Sources are supplier-authored Made-in-China pages or official manufacturer pages. Ratings, starting rotation, cut-in, operating wind and survival limits must remain distinct. No annual energy, certification, inventory, warranty or independent-test claim has been inferred.

## Existing six records rechecked

| Record | Technical model / original page | Image and category audit |
| --- | --- | --- |
| wind-500w-horizontal | FD1.7-500; https://chinaoulu.en.made-in-china.com/product/zwrfEZRPgoWu/China-Wholesale-Windmill-500W-Horizontal-Wind-Turbine-24V.html | `catalog-wind-500w-alt.webp` shows the correct horizontal FD family; clean three-blade view. Source offers 3/5 blades, so exact option remains qualified. |
| wind-1500w-horizontal | NE-1500 M8; https://wxnaiermic.en.made-in-china.com/product/idDtocyvywVU/China-1500W-Small-Wind-Generator-Manufacturer.html | `catalog-wind-1500w.webp` is an installation image from that listing, not a different vertical turbine. Rated wind speed is absent; conflicting operating range is not copied as a definitive number. |
| wind-3kw-horizontal | GH-3KW; https://www.greef-energy.com/china-suppliers-greef-1kw-30kw-horizontal-axis-wind-turbine-factory-for-efficient-clean-energy-solutions-product/ | `catalog-wind-3kw-family.jpg` is the matching official GH horizontal family rendering. Caption explicitly says it is not a scale drawing of GH-3KW. |
| wind-5kw-pitch-controlled | AH-5000W; https://chinawindenergy.en.made-in-china.com/product/eouxjWcCldpI/China-Anhua-5kw-Wind-Turbine-Generator-for-Home-Use-with-CE-Certificate.html | `catalog-wind-5kw-product.webp` and `catalog-wind-5kw.webp` are the supplier's own listed installation references; both horizontal, no prominent marks. The 240 rpm / 3 m/s technical table revision is retained, not values from another AH-5kW page. |
| wind-10kw-pitch-controlled | AH-10KW; https://chinawindenergy.en.made-in-china.com/product/IXrQWaoDblVs/China-10kw-Wind-Turbine-Generator-for-Home-or-Farm-Use.html | `catalog-wind-10kw-product.webp` is its listing's clean hybrid-site image. It shows the correct horizontal-axis equipment class, not an isolated battery cabinet or utility-scale turbine. |
| wind-2500w-vertical | NE-2500H; https://bessent.en.made-in-china.com/product/KxnrBDFbrhkZ/China-2-5kw-Three-Phase-Vertical-Axis-Wind-Turbine-Generator.html | `catalog-wind-2500w-vertical.webp` shows the correct aluminium straight-blade NE-H vertical family. Caption asks for the final model drawing; it is not represented as a dimensioned photograph. |

Exact existing image URLs remain in each record's `source.imageUrl`. No existing ID or file was removed.

## Six added configurations and precise image origins

### WKH-400 carbon-blade horizontal turbine

- Technical page: https://windwing.en.made-in-china.com/product/SoeQBXYCEKTG/China-Horizontal-Axis-Wind-Power-Generator-with-Ce-Certificate.html
- Model: WKH-400. Thirteen parameters use the technical table, not the erroneous 10–100 kW category tag. Blade options are 3/5; the photo shows the five-blade demonstration arrangement.
- Image origin: https://image.made-in-china.com/2f0j00lNVEADiMEjqa/Horizontal-Axis-Wind-Power-Generator-with-Ce-Certificate.webp
- Published asset: `catalog-wind-r24-400w-carbon-clean.jpg`.
- Edit: built-in ImageGen removed the supplier URL watermark, preserving the original demonstration installation. The small solar base is explicitly not standard included supply. AI cleanup is disclosed in record notes.

### UHWT series 2000 W horizontal turbine

- Technical page: https://uintltrade.en.made-in-china.com/product/qZKQcYxDOJWa/China-2000W-2kw-Low-Wind-Speed-High-Efficiency-Horizonal-Wind-Turbine.html
- Model reference: UHWT series, exact 2000 W column. This distinguishes 2 kW rated output from 3 kW maximum. The source specifies 3.8 m diameter and rated wind 8 m/s.
- Image origin: https://image.made-in-china.com/2f0j00AVTUbnWJwmoq/2000W-2kw-Low-Wind-Speed-High-Efficiency-Horizonal-Wind-Turbine.webp
- Published asset: `catalog-wind-r24-2kw-horizontal-clean.jpg`.
- Edit: built-in ImageGen removed the cyan supplier URL watermark. Supplier photo source, installation-reference status and AI cleanup are explicit.

### UHWT series 20000 W horizontal turbine

- Technical page: https://uintltrade.en.made-in-china.com/product/odKxQraPJEVX/China-20000W-20kw-Windmill-Generator-on-off-Grid-Generation-System.html
- Model reference: UHWT series, exact 20000 W column. The 10 m / 20 kW / 11 m/s / 160 rpm values come from that column, not adjacent 10 kW or 30 kW columns.
- Image origin: https://image.made-in-china.com/2f0j00HWQUnNscLAoP/20000W-20kw-Windmill-Generator-on-off-Grid-Generation-System.webp
- Published asset: `catalog-wind-r24-20kw-horizontal-clean.jpg`.
- Edit: built-in ImageGen removed only supplier URL branding. The original horizontal rotor, rear tail arm and monopole layout remain an installation reference rather than a dimensional verification.

### AH-30KW variable-pitch turbine

- Technical page: https://chinawindenergy.en.made-in-china.com/product/BwmGYJvxgyRK/China-30kw-Wind-Turbine.html
- Model: AH-30KW. The detailed 13.1 m / 30 kW / 12 m/s / 105 rpm table is used; a generic 10 kW name field and unrelated prose are ignored. Start-up 3 m/s and cut-in 3.5 m/s are separately stated.
- Image origin: https://image.made-in-china.com/2f0j00owWhugPcaVpE/30kw-Wind-Turbine.webp
- Published asset: `catalog-wind-r24-30kw-alt.webp`.
- No image edit. A clean supplier angle was selected after rejecting a close view with a visible tower logo. It shows supplier installation/maintenance, not the user's claimed project.

### Aeolos-V 1kW straight-blade vertical turbine

- Technical page: https://www.windturbinestar.com/1kwv-v-aeolos-wind-turbine.html
- Model: Aeolos-V 1kW. Current English page values: 1 kW rated at 10 m/s, 2.8 m height and 2.0 m diameter. Weight is omitted because language versions disagree. No certified noise claim or annual energy promise is made.
- Image origin: https://www.windturbinestar.com/uploads/images/v1kw.gif
- Published asset: `catalog-wind-r24-v1kw-clean.jpg`.
- Edit: built-in ImageGen removed manufacturer blade logo and large overlaid branding. The source's straight-blade vertical rotor is retained; photo cleanup is disclosed and is not a technical drawing.

### Aeolos-V 5kW commercial vertical turbine

- Technical page: https://www.windturbinestar.com/5kwv-v-aeolos-wind-turbine.html
- Model revision: current English page's 4.8 m height / 4.5 m diameter / 500 kg / 11 m/s revision. Older 3.6 m, 4 m, 5 m and 5.3 m brochure variants are not mixed into this record. Start-up 1.5 m/s is not labelled generation cut-in.
- Image origin: https://www.windturbinestar.com/uploads/images/V-5kW/V%205kW-01%20main.jpg
- Published asset: `catalog-wind-r24-v5kw-clean.jpg`.
- Edit: built-in ImageGen removed large manufacturer overlay and building logo. The source's large vertical rotor remains illustrative of its manufacturer's installation, not a dimensional drawing.

## ImageGen prompt set and retention

Built-in tool mode was used, not API/CLI. Each target was inspected before editing. All prompts requested removal of only the supplier text/logo while preserving the source turbine's blade count, rotor axis, geometry, hub, mast, scale, setting and framing, with no product redesign or new objects. Specific targets were: (1) Aeolos V1 blade logo plus overlay; (2) Aeolos V5 overlay plus building mark; (3) WKH-400 white supplier-URL overlay; (4) UHWT 2 kW cyan supplier URL; (5) UHWT 20 kW cyan supplier URL. No generative turbine was passed off as a different exact model.

Raw downloaded candidates, marked source originals and full PNG cleaned masters were moved recoverably to `/Users/zilongyang/Documents/Codex/2026-09-30/wo/work/catalog-wind-r24-source-originals/` and are not published. Five final cleaned images were mechanically encoded as JPEG at quality 85 without changing dimensions or composition. Only the referenced JPEG derivatives and clean AH-30KW WebP are in this asset directory. Original generated outputs also remain in `/Users/zilongyang/.codex/generated_images/01a13b52-b4ff-70f2-b483-a721f8f3e86c/`.

| Final JPEG basename | Original generated PNG basename |
| --- | --- |
| catalog-wind-r24-v1kw-clean.jpg | exec-c6d0f84d-38f5-4cd9-a5e0-927d3e760fe7.png |
| catalog-wind-r24-v5kw-clean.jpg | exec-fbbc0b3d-af83-4825-ba43-c50df7a71c3b.png |
| catalog-wind-r24-400w-carbon-clean.jpg | exec-ec7faf9f-0de1-4381-b4d8-bfdb0468379a.png |
| catalog-wind-r24-2kw-horizontal-clean.jpg | exec-12b92178-7c0f-41f7-bd4f-848be5d05901.png |
| catalog-wind-r24-20kw-horizontal-clean.jpg | exec-6dc87e6a-7544-4ed9-91bc-76d3b7f3a7d1.png |

### Exact prompt set

All calls used `transparent_background: false` and their individually referenced, inspected original local file.

**Aeolos V1**

Use case: precise-object-edit. Asset type: product catalogue photograph. Remove only the AEOLOS blade logo and the large AEOLOS WIND TURBINE words from this authorized supplier photograph. Preserve the exact original single vertical-axis turbine, straight blades, three support arm levels, blade proportions, hub, mast, light pole and building, landscape and framing. Do not create a different turbine. Photorealistic cleanup with no text, no logo, no watermark; do not add any object. Output one cleaned photograph.

**Aeolos V5**

Use case: precise-object-edit. Asset type: product catalogue photograph. Remove only the large AEOLOS WIND TURBINE text overlay and visible building logo from this authorized photograph. Preserve exact original vertical-axis turbine, all narrow straight blades and support arm levels, generator, mast, scale, perspective, night lighting, building architecture, plants and framing. Do not redesign or replace the turbine. No added objects, logos, watermarks or text. Output one cleaned photograph.

**WKH-400**

Use case: precise-object-edit. Asset type: product catalogue photograph. Remove only the white windwing.en.made-in-china.com watermark across this authorized supplier photograph. Keep the exact original small horizontal-axis wind turbine, every blade and tail shape, small mast and photovoltaic base, building architecture, sky and ground unchanged. No other edits or replacement product. Output one cleaned photo, no logos, no watermark, no new text.

**UHWT 2 kW**

Use case: precise-object-edit. Asset type: product catalogue photograph. Remove only the cyan uintltrade.en.made-in-china.com watermark from this authorized photograph. Preserve the exact original horizontal-axis turbine: three green-and-white blades, hub, tail vane, guyed mast and cables, solar panels, trees, cloudless sky, composition and product geometry. No new objects and no product redesign. Output one cleaned photo without logos, watermark or text.

**UHWT 20 kW**

Use case: precise-object-edit. Asset type: product catalogue installation photo. Remove only the cyan uintltrade.en.made-in-china.com watermark crossing this authorized supplier photo. Preserve the exact original horizontal-axis three-bladed turbine, blade proportions, central hub, tail vane on rear arm, white mast, generator and attachments, mountainous landscape, tiny building, clouds, sky and ground with identical object positions. No product redesign and no new objects. Clean commercial photo with no watermark, logo or text. Output one edited image.

## Checks

- Twelve unique IDs, stable original six IDs.
- Four headline fields per item and at least eleven sourced specification rows per item.
- Local images exist and are all named `catalog-wind-*`.
- Visible photos visually checked for turbine axis/type, source matching and prominent marks.
- Supplier-reference and variant caveats belong on cards/detail/downloads; keep them when rendering the JSON.
