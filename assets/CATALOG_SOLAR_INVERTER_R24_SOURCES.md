# R24 solar and inverter catalogue source register

Checked: 2026-10-15. Catalogue data: 14 inverter configurations across 9 hardware families; 12 solar module configurations across 8 hardware families.

## Audit and evidence rules

- Existing inverter images were inspected individually. They show inverter hardware, not batteries or energy-storage cabinets. Existing solar images show the corresponding module family; no cross-category images are used in these two data files.
- Each configuration retains its exact manufacturer technical reference model. No claim is made that Shandong Lantian manufactures these referenced third-party models.
- Shared photographs are limited to actual members of the same published manufacturer family and carry an explicit `image.caption` on both configurations.
- Model-specific changes include real output/capacity, electrical limits, MPPT counts or rating bins. No stock, price, lead-time, certification or warranty guarantees were added.
- The 760 W G3 reference uses the official 2026 PA5 preliminary sheet. Its public product name includes “(Preliminary)” and its summary opens with the production-values/availability disclosure, in addition to its technical notes. It is not presented as confirmed commercial stock.
- Grid-connected string/microinverters are not represented as independent outage-backup systems.
- Existing Jinko 580 W specifications remain tied to F5 rather than mixing newer supplier-listing voltages with that revision.

## Exact technical references

| Category | Catalogue ID | Exact reference model | Primary source |
| --- | --- | --- | --- |
| inverters | inverter-off-grid-5kw | SUN-5K-OG03LP1-EU-AM2 | [Deye — official off-grid inverter specifications](https://www.deyeinverter.com/product/offgrid-inverter/SUN3-3-6-5-6KOG02LP1EUAM1.html) |
| inverters | inverter-single-hybrid-6kw | SUN-6K-SG04LP1-EU | [Deye — official single-phase hybrid specifications](https://www.deyeinverter.com/product/single-phase-low-voltage-hybrid-inverter/sun3-3-6-5-6ksg04lp1-3-6kw-single-phase.html) |
| inverters | inverter-three-hybrid-12kw | SUN-12K-SG05LP3-EU-SM2 | [Deye — official three-phase LV hybrid specifications](https://www.deyeinverter.com/product/three-phase-hybrid-inverter-1/sun3-4-5-6-8-10-12ksg05lp3eusm2-312kw-three-phase-2-mppt-hybrid-inverter-lv-battery-supported.html) |
| inverters | inverter-commercial-hybrid-50kw | SUN-50K-SG01HP3-EU-BM4 | [Deye — official high-voltage hybrid specifications](https://www.deyeinverter.com/product/three-phase-high-voltage-hybrid-inverter/sun29-9-30-35-40-50ksg01hp3eubm3-4-29-950kw-three-phase-2-3-4-mppt-hybrid-inverter-hv-battery-supported-339.html) |
| inverters | inverter-grid-string-50kw | SUN-50K-G04 | [Deye — official commercial string inverter specifications](https://www.deyeinverter.com/product/three-phase-string-inverter/sun40-45-50kg04-4050kw-three-phase-4-mppt.html) |
| inverters | inverter-off-grid-8-8kw | SUN-8.8K-OG03LP1-EU-AM2 | [Deye — official off-grid inverter specifications](https://www.deyeinverter.com/product/offgrid-inverter/SUN3-3-6-5-6KOG02LP1EUAM1.html) |
| inverters | inverter-single-hybrid-3-6kw | SUN-3.6K-SG04LP1-EU | [Deye — official single-phase hybrid specifications](https://www.deyeinverter.com/product/single-phase-low-voltage-hybrid-inverter/sun3-3-6-5-6ksg04lp1-3-6kw-single-phase.html) |
| inverters | inverter-three-hybrid-8kw | SUN-8K-SG05LP3-EU-SM2 | [Deye — official three-phase LV hybrid specifications](https://www.deyeinverter.com/product/three-phase-hybrid-inverter-1/sun3-4-5-6-8-10-12ksg05lp3eusm2-312kw-three-phase-2-mppt-hybrid-inverter-lv-battery-supported.html) |
| inverters | inverter-commercial-hybrid-30kw | SUN-30K-SG01HP3-EU-BM3 | [Deye — official high-voltage hybrid specifications](https://www.deyeinverter.com/product/three-phase-high-voltage-hybrid-inverter/sun29-9-30-35-40-50ksg01hp3eubm3-4-29-950kw-three-phase-2-3-4-mppt-hybrid-inverter-hv-battery-supported-339.html) |
| inverters | inverter-grid-string-40kw | SUN-40K-G04 | [Deye — official commercial string inverter specifications](https://www.deyeinverter.com/product/three-phase-string-inverter/sun40-45-50kg04-4050kw-three-phase-4-mppt.html) |
| inverters | inverter-micro-800w | SUN-M80G4-EU-Q0 | [Deye — official Module-level microinverters technical reference](https://www.deyeinverter.com/product/microinverter-1/SUNM60-80-100G3EUQ0-6001000W-Single-Phase-2-MPPT-Micro-Inverter.html) |
| inverters | inverter-micro-2000w | SUN-M200G4-EU-Q0-I | [Deye — official Module-level microinverters technical reference](https://www.deyeinverter.com/product/microinverter-1/sunm130-160-180-200-220g4euq0i.html) |
| inverters | inverter-grid-string-20kw | SUN-20K-G05 | [Deye — official Grid-tied string inverters technical reference](https://www.deyeinverter.com/product/three-phase-string-inverter/sun18-20-25kg04-1825kw-three-phase-2-mppt-237.html) |
| inverters | inverter-grid-string-100kw | SUN-100K-G03 | [Deye — official Grid-tied string inverters technical reference](https://es.deyeinverter.com/product/three-phase-string-inverter/sun70-75-80-90-100-110kg03-70110kw-three-phase-6-mppt.html) |
| solar | solar-full-black-450w | TSM-450NEG9R.25 | [Trina Solar — Vertex S+ full-black official datasheet](https://vertexsplus.trinasolar.com/wp-content/uploads/2024/04/Datasheet_Vertex-S_NEG9R.25_EN_2024_PA_web-1.pdf) |
| solar | solar-black-frame-460w | TSM-460NEG9R.28 | [Trina Solar — Vertex S+ black-frame official datasheet](https://vertexsplus.trinasolar.com/wp-content/uploads/2024/09/240831_Datasheet_Vertex-S_NEG9R.28_EN_2024_C_web.pdf) |
| solar | solar-clear-bifacial-450w | TSM-450NEG9RC.27 | [Trina Solar — Vertex S+ clear-black official datasheet](https://vertexsplus.trinasolar.com/wp-content/uploads/2024/09/240910_Datasheet_VertexS_NEG9RC.27_EN_2024_A_web.pdf) |
| solar | solar-commercial-505w | TSM-505NEG18R.28 | [Trina Solar — Vertex S+ commercial official datasheet](https://vertexsplus.trinasolar.com/wp-content/uploads/2024/03/DS-NEG18R.28-EN-1.pdf) |
| solar | solar-bifacial-580w | JKM580N-72HL4-BDV | [Jinko Solar — Tiger Neo official F5 datasheet](https://www.jinkosolar.com/uploads/JKM560-580N-72HL4-BDV-F5-EN.pdf) |
| solar | solar-full-black-440w | TSM-440NEG9R.25 | [Trina Solar — Vertex S+ full-black official datasheet](https://vertexsplus.trinasolar.com/wp-content/uploads/2024/04/Datasheet_Vertex-S_NEG9R.25_EN_2024_PA_web-1.pdf) |
| solar | solar-black-frame-440w | TSM-440NEG9R.28 | [Trina Solar — Vertex S+ black-frame official datasheet](https://vertexsplus.trinasolar.com/wp-content/uploads/2024/09/240831_Datasheet_Vertex-S_NEG9R.28_EN_2024_C_web.pdf) |
| solar | solar-clear-bifacial-430w | TSM-430NEG9RC.27 | [Trina Solar — Vertex S+ clear-black official datasheet](https://vertexsplus.trinasolar.com/wp-content/uploads/2024/09/240910_Datasheet_VertexS_NEG9RC.27_EN_2024_A_web.pdf) |
| solar | solar-commercial-500w | TSM-500NEG18R.28 | [Trina Solar — Vertex S+ commercial official datasheet](https://vertexsplus.trinasolar.com/wp-content/uploads/2024/03/DS-NEG18R.28-EN-1.pdf) |
| solar | solar-flexible-100w | RNG-100DB-H (G3) | [Manufacturer official Flexible lightweight modules datasheet](https://www.renogy.com/cdn/shop/files/RNG-100DB-H-G3_20Datashhet.pdf?v=2121247365811578325) |
| solar | solar-compact-bifacial-200w | RSP200DCT (G1) | [Manufacturer official Compact off-grid modules datasheet](https://cdn.shopify.com/s/files/1/0758/6519/4753/files/100-200DCT-G1-Datasheet.pdf?v=1782282353) |
| solar | solar-utility-bifacial-760w | TSM-760NEG21C.20Q | [Manufacturer official High-output bifacial modules datasheet](https://www-cdn.trinasolar.com/wwwstorage/sites/7/DT-M-0133_Datasheet_210_NEG21C.20Q_EN_2026PA5_web_20260413.pdf) |

## Image provenance and final local assets

All final paths below are repository-relative. Only clean, referenced final assets remain in the publishable `assets/` directory. Source originals and intermediate lossless PNG outputs were moved recoverably to `/Users/zilongyang/Documents/Codex/2026-09-30/wo/work/catalog-solar-inverter-r24-source-originals/`.

| Final local path | Original exact source image URL | Treatment |
| --- | --- | --- |
| assets/catalog-inverter-off-grid.jpg | https://www.deyeinverter.com/deyeinverter/2026/08/21/8U1gV-cC4e.png | Existing source-derived clean asset; visually re-audited in R24. |
| assets/catalog-inverter-single-phase.jpg | https://www.deyeinverter.com/deyeinverter/2025/05/29/3-1.png | Existing source-derived clean asset; visually re-audited in R24. |
| assets/catalog-inverter-three-phase.jpg | https://www.deyeinverter.com/deyeinverter/2025/10/14/12.png | Existing source-derived clean asset; visually re-audited in R24. |
| assets/catalog-inverter-commercial-hybrid.jpg | https://www.deyeinverter.com/deyeinverter/2025/05/30/15.png | Existing source-derived clean asset; visually re-audited in R24. |
| assets/catalog-inverter-grid.jpg | https://www.deyeinverter.com/deyeinverter/2025/05/30/8-1.png | Existing source-derived clean asset; visually re-audited in R24. |
| assets/catalog-inverter-r24-micro-800.jpg | https://www.deyeinverter.com/deyeinverter/2025/06/02/8.png | Built-in image editing: source-derived isolation/branding cleanup; JPEG quality 85. |
| assets/catalog-inverter-r24-micro-2000.jpg | https://www.deyeinverter.com/deyeinverter/2026/09/14/cVPpb-3-4.png | Built-in image editing: source-derived isolation/branding cleanup; JPEG quality 85. |
| assets/catalog-inverter-r24-string-20.jpg | https://www.deyeinverter.com/deyeinverter/2025/05/30/6-1.png | Built-in image editing: source-derived isolation/branding cleanup; JPEG quality 85. |
| assets/catalog-inverter-r24-string-100.jpg | https://es.deyeinverter.com/deyeinverter/2024/05/15/%E4%B8%BB%E5%9B%BE-6.png | Built-in image editing: source-derived isolation/branding cleanup; JPEG quality 85. |
| assets/catalog-solar-full-black.png | https://vertexsplus.trinasolar.com/wp-content/uploads/2024/03/TSM-NEG9R.25-1.png | Existing source-derived clean asset; visually re-audited in R24. |
| assets/catalog-solar-black-frame.png | https://vertexsplus.trinasolar.com/wp-content/uploads/2024/03/TSM-NEG9R.28-1.png | Existing source-derived clean asset; visually re-audited in R24. |
| assets/catalog-solar-clear-black.png | https://vertexsplus.trinasolar.com/wp-content/uploads/2024/03/TSM-NEG9RC.27-1.png | Existing source-derived clean asset; visually re-audited in R24. |
| assets/catalog-solar-commercial.png | https://vertexsplus.trinasolar.com/wp-content/uploads/2024/03/TSM-NEG18R.28-2.png | Existing source-derived clean asset; visually re-audited in R24. |
| assets/catalog-solar-bifacial-580w.jpg | https://image.made-in-china.com/2f0j00NFDcBqIRrfoZ/Jinko-72hl4-Bdv-Tiger-Neo-Bifacial-570W-575W-580W-585W-590W-N-Type-Solar-Panel-Holder-Mounting.webp | Existing source-derived clean asset; visually re-audited in R24. |
| assets/catalog-solar-r24-flex-100.jpg | https://www.renogy.com/cdn/shop/files/RNG-100DB-H-US__05559.1748418093.1280.1280.jpg?v=1774508914 | Built-in image editing: source-derived isolation/branding cleanup; JPEG quality 85. |
| assets/catalog-solar-r24-compact-200.jpg | https://eu.renogy.com/cdn/shop/files/12_6a8a4d34-f09c-4f01-b487-93ead3bdc4e5.jpg?v=1781677032 | Built-in image editing: source-derived isolation/branding cleanup; JPEG quality 85. |
| assets/catalog-solar-r24-utility-760.png | https://www-cdn.trinasolar.com/wwwstorage/sites/5/en-n-760w-tsm-neg21c-20-section2-1.png | Untouched transparent manufacturer render. |

## Image editing mode and prompt set

Mode: built-in `image_gen.imagegen`, one separate edit call for each of six assets. No CLI/API fallback. Inputs were inspected with `view_image` before editing. The original generated files also remain in the tool's default generated-images folder.

Common final prompt framing:

> Use case: precise-object-edit. Asset type: technical product catalogue photo. Image 1 is the EDIT TARGET, manufacturer-authorized image. [Asset-specific task below] Place the single isolated product centered on plain pure white, fully visible with modest consistent padding, crisp realistic edges and neutral original colors. No re-design, no extra devices, no labels, no logo, no watermark, no decorative props. Output one individual product image, not a collage.

Asset-specific tasks:

1. `catalog-inverter-r24-micro-800.jpg`: isolate the exact microinverter hardware shown on the left; remove adjacent blue specification panel and other graphic text; keep fins, dark junction box, cables/connectors, mounting tabs, proportions and viewpoint unchanged.
2. `catalog-inverter-r24-micro-2000.jpg`: isolate the exact wide black finned microinverter at the top; remove lower text and specification banner; keep fins, side DC connectors, right output cable, mounting tabs, screws and viewpoint unchanged.
3. `catalog-inverter-r24-string-20.jpg`: isolate the exact upright white inverter on the left; erase small blue Deye logo and adjacent specification panel; preserve case, screen, arrows, switch, inspection cover and bottom connectors.
4. `catalog-inverter-r24-string-100.jpg`: retain the exact wide white inverter; erase small blue Deye branding only; preserve technical indicators, screen, connectors, warning triangle, panel seams and brackets.
5. `catalog-solar-r24-compact-200.jpg`: isolate only the larger 200 W panel on the right of the supplier comparison image; remove arrows, dimensions, corner ribbon, labels and tiny branding; retain its four-column paired-half-cell pattern, silver frame, busbars, aspect ratio and viewpoint.
6. `catalog-solar-r24-flex-100.jpg`: retain the exact curved flexible panel, cell layout, two top black boxes, eyelets, white polymer edge and viewpoint; remove tiny branding/barcode only, without changing curvature or cell count.

Post-processing was format-only JPEG encoding at quality 85. The genuinely transparent G3 utility module asset remains PNG.

## Cautions for future updates

- Do not substitute generic storage-cabinet imagery for any inverter item.
- The compact RSP200DCT photo is the larger 200 W unit, not the smaller 100 W unit visible in its source comparison.
- Do not replace 800 W Q0 limits with Q0-P limits: the selected Q0 table has 13 A per input, not 18 A.
- SUN-20K-G05 uses the technical table's 98.5% efficiency; the page headline makes a broader 98.6% family claim.
- SUN-100K-G03 uses the linked regional official page for its 824 mm cabinet width; other revisions list 826 mm. Do not merge those mechanical revisions silently.
- Exact delivered appearance, approved grid setting, battery compatibility, production revision and commercial scope require confirmation before quotation.

