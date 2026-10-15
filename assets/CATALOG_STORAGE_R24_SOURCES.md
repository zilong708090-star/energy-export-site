# Storage catalog R24: sources and image audit

Checked: 2026-10-15. Scope: `catalog-data/storage.json` and storage assets only. No claim is made that Shandong Lantian manufactures the referenced supplier models. Prices, availability, warranty promises and certification badges are intentionally excluded.

## Result

- 14 storage configurations, expanded from 6; 199 individually labelled specifications.
- Six real format groups: commercial cabinets, containerized storage, wall batteries, rack batteries, high-voltage stacks, and all-in-one systems.
- Commercial cabinets lead the catalog, followed by containerized storage; smaller battery formats follow so a wall battery cannot be mistaken for the principal cabinet product.
- 11 distinct product images. All 14 entries have visitor-visible captions distinguishing an exact supplier render from a shared family image.
- The old six IDs are retained. `storage-liquid-215kwh` remains a commercial cabinet.

## Configuration sources

| Catalog ID | Exact reference model / edition | Technical source |
| --- | --- | --- |
| storage-air-215kwh | 100 kW x 215 kWh Air-cooled Energy Storage Cabinet; no separate SKU published | https://www.run-strategy.com/High-Power-Air-Cooled-Energy-Storage-Cabinet-pd562369348.html |
| storage-liquid-215kwh | HCESS1-100-215 | https://hcdf-electric.en.made-in-china.com/product/ftgUsqGuOMhP/China-Efficient-215kwh-Controlled-Energy-Storage-Cabinet-for-Resale.html |
| storage-liquid-261kwh | HESS-261-2h, official global datasheet V202504 | https://www.hoymiles.com/downloads/datasheet-hoyultra2-hess-261-2h-global-en.html ; underlying official PDF https://w3oss.hoymiles.com/uploadfile/1/202505/6f00ea918d.pdf |
| storage-container-3700kwh | Corey-L3.7-1500; DC battery container | https://szcorey.en.made-in-china.com/product/AUirMSchbtks/China-3-7MW-European-Stock-Corey-Solar-Compact-System-Lithium-Battery-Efficient-Energy-Storage-Container.html |
| storage-wall-5kwh | PNG-E51100-LV | https://pnsolar.en.made-in-china.com/product/bQVUNWJCbBrz/China-Wall-Mounted-Lithium-Battery-51-2V-100ah-5kwh-LiFePO4-Power-Wall-Energy-Storage-Battery.html |
| storage-rack-25v-100 | LR24-100; LFELI-24100HR-B-EN-V1.7-202602 | https://www.leochlithium.com/pdf/lithium/HomeStorage/Rack-mounted/LR24-100.pdf |
| storage-rack-25v-200 | LR24-200; LFELI-24200HR-D-EN-V1.7-202602 | https://www.leochlithium.com/pdf/lithium/HomeStorage/Rack-mounted/LR24-200.pdf |
| storage-rack-5kwh | LR51.2-100 4U; LFELI-48100HR-A-EN-V1.7-202602 | https://www.leochlithium.com/pdf/lithium/HomeStorage/Rack-mounted/LR51.2-100%284U%29.pdf |
| storage-rack-51v-200 | LR51.2-200; LFELI-48200H-D-EN-V1.6-202512 | https://www.leochlithium.com/pdf/lithium/HomeStorage/Rack-mounted/LR51.2-200%2882Kg%29.pdf |
| storage-hv-stacked-20kwh | ES-20KHS; four-module column only | https://enjoysolar.en.made-in-china.com/product/qZMtfzDGbcaw/China-20-48kwh-High-Voltage-Home-Use-Stacked-LiFePO4-Solar-Storage-Battery-Lithium-Ion-Battery.html |
| storage-hv-stacked-30kwh | ES-30KHS; six-module column only | Same supplier table as ES-20KHS above |
| storage-hv-stacked-40kwh | ES-40KHS; eight-module column only | Same supplier table as ES-20KHS above |
| storage-all-in-one-5kwh | ES-ESS-BP51100; 5.12 kWh column only | https://enjoysolar.en.made-in-china.com/product/rFEaYPHgJstX/China-All-in-One-5kwh-10kwh-LiFePO4-Lithium-Ion-Cell-Lithium-Battery-Pack-with-5kw-Hybrid-Solar-Inverter-for-Residential-Solar-Battery-Storage-System.html |
| storage-all-in-one-10kwh | ES-ESS-BP51200; 10.24 kWh column only | Same supplier table as ES-ESS-BP51100 above |

Official LEOCH product page linking the individual current datasheets and exact-model renders: https://www.leoch.com/products/lithium/residential-rack-mounted-battery . Official Hoymiles product page: https://www.hoymiles.com/products/hoyultra2-all-in-one-battery-system.html . Where the current web product name differs, the stored technical fields remain tied to the explicitly named datasheet edition, not a fusion of revisions.

## Exact image origins and category checks

| Final asset | Original image URL | Match / limitation |
| --- | --- | --- |
| catalog-storage-air-215kwh.jpg | https://ilrorwxhnpmplk5m-static.micyjz.com/cloud/lrBpiKomlnSRklqoipjjkp/1.jpg | Original unbranded commercial air-cooled cabinet from the technical source; no edit. |
| catalog-storage-liquid-215kwh-clean.jpg | https://image.made-in-china.com/2f0j00pfqeUwtKLybJ/Efficient-215kwh-Controlled-Energy-Storage-Cabinet-for-Resale.webp | HCESS1-100-215 supplier cabinet render. Original branding/overlays removed in R23. Not a slim hybrid inverter. |
| catalog-storage-r24-hoy261-clean.jpg | https://w3oss.hoymiles.com/uploadfile/1/202504/a08b64f81f.png | Exact HESS-261-2h official product render; brand mark removed. Retrieved with normal page Referer/User-Agent after bare CDN request returned 403. |
| catalog-storage-container-3700kwh-clean.jpg | https://image.made-in-china.com/2f0j00wqbvoBuKrEkg/3-7MW-European-Stock-Corey-Solar-Compact-System-Lithium-Battery-Efficient-Energy-Storage-Container.webp | Exact supplier DC container render, logos removed in R23. AC PCS/transformer not shown and not inferred. |
| catalog-storage-wall-5kwh-clean.jpg | https://image.made-in-china.com/2f0j00FNQcnCVBcApJ/Wall-Mounted-Lithium-Battery-51-2V-100ah-5kwh-LiFePO4-Power-Wall-Energy-Storage-Battery.webp | PNG wall battery family; two controller/display styles pictured. Caption identifies family limitation. Branding removed in R23. |
| catalog-storage-r24-rack-25v-100.jpg | https://www.leoch.com/Public/Uploads/uploadfile/images/20260922/residentialrackmountedbattery5.webp | Exact LR24-100 supplier render. Brand removed; original model label retained. Supplier screen readings are illustrative, not the 25.6 V operating voltage. |
| catalog-storage-r24-rack-25v-200.jpg | https://www.leoch.com/Public/Uploads/uploadfile/images/20260922/residentialrackmountedbattery4.webp | Exact LR24-200 supplier render. Brand removed; original model label retained. Same screen-reading caveat is visible. |
| catalog-storage-rack-5kwh-clean.jpg | https://www.leoch.com/Public/Uploads/uploadfile/images/20260922/residentialrackmountedbattery3.webp | LR51.2-100 4U supplier render, not the larger 200 Ah unit. Branding removed in R23. |
| catalog-storage-r24-rack-51v-200.jpg | https://www.leoch.com/Public/Uploads/uploadfile/images/20260922/residentialrackmountedbattery2.webp | Exact LR51.2-200 200 Ah supplier render with thicker enclosure and upper terminals, not LR51.2-100. Brand removed. |
| catalog-storage-r24-hv-family.jpg | https://image.made-in-china.com/2f0j00LFtloWznLdfw/20-48kwh-High-Voltage-Home-Use-Stacked-LiFePO4-Solar-Storage-Battery-Lithium-Ion-Battery.webp | Shared ES-KHS family render. Right = four-module ES-20KHS; center = six-module ES-30KHS; left = eight-module ES-40KHS. Caption on each entry names its position; no different device family substituted. |
| catalog-storage-all-in-one-10kwh-clean.jpg | https://image.made-in-china.com/2f0j00MyuVdUIGheRP/All-in-One-5kwh-10kwh-LiFePO4-Lithium-Ion-Cell-Lithium-Battery-Pack-with-5kw-Hybrid-Solar-Inverter-for-Residential-Solar-Battery-Storage-System.webp | Shared BP51100/BP51200 all-in-one storage family image. These units include a battery and inverter; they are explicitly classified all-in-one, not represented as standalone storage cabinets. Different capacity enclosures have different sizes; caption warns this is family artwork. Brand removed in R23. |

## R24 image-edit provenance

Built-in imagegen was used only on five inspected supplier images after reading the imagegen skill. All calls used one local referenced image, `transparent_background: false`, no generated additions to the hardware, and no new branding. Every result was inspected again. JPEG copies use `sips` format conversion at quality 85. These are cleaned supplier renders, not photographs taken by Lantian.

Faithful prompt set:

- Rack variants: remove only the white LEOCH logo and LEOCH BATTERY text. Preserve each original exact model/electrical label, enclosure geometry/thickness, screen, terminals, handles, connectors, status lights, breaker, perspective and shadow. Composite transparency onto white. No redesign or added parts.
- ES-KHS family: remove the page logo, logos on all three controller units, heading and tiny base wording. Preserve all three original stacks and their module counts (eight/six/four), controller displays, side connectors/handles, blue non-word decoration, shadows and the original rounded 40/30/20 kWh labels. No hardware redesign or module count change.
- HESS-261-2h: remove only the upper-front Hoymiles logo, fill with matching light-gray paint. Preserve the same cabinet, upper grille, handle, emergency stop, service panels, plinth, warning triangle, proportions and perspective. Composite transparency onto white. No new hardware.

Generated PNG base directory: `/Users/zilongyang/.codex/generated_images/01a13b51-ef50-7e81-a3d1-4e4abb7ab4de/`.

| Final JPEG | Generated PNG |
| --- | --- |
| catalog-storage-r24-rack-25v-100.jpg | exec-8817faff-e575-4122-abc1-0e0cb9aa310e.png |
| catalog-storage-r24-rack-25v-200.jpg | exec-8299bbeb-9802-4437-9b00-5b07216e3740.png |
| catalog-storage-r24-rack-51v-200.jpg | exec-3aa02389-48d6-4ded-bff9-61870219bbb5.png |
| catalog-storage-r24-hv-family.jpg | exec-5ee8e2ce-1662-4712-a213-4715c8df8090.png |
| catalog-storage-r24-hoy261-clean.jpg | exec-0f25b23a-009b-4657-8930-bd6ac4b29850.png |

Unpublished original/rejected R24 downloads are preserved recoverably outside the site repo at `/Users/zilongyang/Documents/Codex/2026-09-30/wo/work/catalog-storage-source-originals-r24/`. R23 original/rejected downloads remain at the sibling `catalog-storage-source-originals/` directory. No original user asset was deleted or overwritten.

## Specification guardrails

- Current individual LEOCH datasheets are used instead of mixing older 40-parallel-unit literature with 15-unit revisions.
- HV battery nominal voltage and energy are not AC inverter output. ES-KHS top control boxes are battery HV controllers, not stand-alone solar inverters.
- Original all-in-one marketplace voltage/enclosure discrepancies remain omitted pending final supplier confirmation.
- The Corey listing mislabels kWh as power in places. Only the separately stated nominal battery energy is reproduced; no AC power is inferred.
- HESS-261-2h power is 125 kW at 50 C in the named edition, not a guarantee for every temperature or grid market.
- Application suitability, uninterrupted transfer, runtime, certifications and final delivery scope require project engineering and final model documentation.

Validation: JSON parses; all 14 IDs are unique; every entry has exactly four headline specs, at least ten detailed specs, category `storage`, a dated technical source, a local `assets/catalog-storage-...` image that exists, and a visible image caption. All final images were visually inspected for device family and visible branding/watermarks.
