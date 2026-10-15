# Dispatch imagery — R28 source record

Accessed: 2026-10-15 (Asia/Shanghai)

These photographs are third-party reference imagery and must not be presented as the company's own factory, warehouse, inventory, shipment, staff, or completed project. If used on the public site, describe them only as representative packaging/logistics imagery. The user stated that they have authorization to reuse third-party supplier imagery. The first two files below are unedited downloads; the third received a tightly scoped brand-and-watermark cleanup, recorded below.

## Unselected candidate — `r28-dispatch-warehouse-stock.webp`

- Scene: electrical cabinets and finished export cases staged inside a factory/warehouse.
- Dimensions: 750 × 1000 px.
- Source page: https://zj-shenheng.en.made-in-china.com/product/DmvpuMRYHNVc/China-Solar-PV-Combiner-Box-for-2-Strings-Solar-Panel.html
- Direct image: https://image.made-in-china.com/365f3j00YBqkuTIRCdbm/Solar-PV-Combiner-Box-for-2-Strings-Solar-Panel.webp
- Final decision: not published. Root review identified a possibly branded blue circular mark on a crate and found the scene too similar to the other packing views. The file is retained at `/Users/zilongyang/Documents/Codex/2026-09-30/wo/work/r28-dispatch-candidates/r28-dispatch-warehouse-stock-unselected.webp`, outside the public checkout.

## `r28-dispatch-export-crates.webp`

- Scene: a clean row of tall plywood export cases staged for dispatch inside a factory.
- Dimensions: 749 × 645 px.
- Source page: https://cnkcele.en.made-in-china.com/product/DnzYpQucTAUF/China-Hxgn-12kv-630A-Box-Type-Fixed-Ring-Network-Switchgear-Electric-Cabinet-Switch-Cabinet.html
- Direct image: https://image.made-in-china.com/365f3j00cABlNRCPnGpL/Hxgn-12kv-630A-Box-Type-Fixed-Ring-Network-Switchgear-Electric-Cabinet-Switch-Cabinet.webp
- Visual QA: no obvious brand logo or overlaid watermark was detected at the downloaded resolution. Standard crate handling marks remain part of the photographed scene.

## `r28-dispatch-container-loading.jpg`

- Scene: workers and a forklift loading wrapped industrial energy equipment into two shipping containers inside a factory dispatch bay.
- Final dimensions: 1448 × 1086 px.
- Source page: https://eraes.com.cn/newsinfo/9010153.html
- Original direct image: https://n.sinaimg.cn/spider20260327/640/w1280h960/20260327/24e4-592587e04d17be8dda18b46936853d13.jpg
- Original dimensions: 1280 × 960 px.
- First processing pass: the built-in image generation editor removed the `HANGCHA` forklift wordmark, oversized `CIMC` container lettering, the red Chinese news watermark, and legible license-plate characters. It did not intentionally change the people, equipment, loading operation, factory setting, crop, or lighting.
- Second cleanup pass: the first-pass JPEG was preserved outside the repository as `work/r28-dispatch-candidates/16-container-loading-clean-before-logo-pass.jpg`. A second built-in image edit removed the remaining silver circular forklift badge and small supplier-style garment emblems while retaining PPE, safety indicators and scene geometry.
- Final visual QA: no obvious company logo or overlaid watermark remains at the final saved resolution. Small safety/operational markings intrinsic to the photographed factory scene remain.
- First-pass exact edit prompt:

  ```text
  Use case: precise-object-edit
  Asset type: authentic website photo for an export logistics section
  Primary request: Remove only the visible brand marks and watermark from the supplied real factory loading photograph.
  Edit target: the supplied photograph.
  Exact removals:
  1) remove the word "HANGCHA" from the rear orange panel of the forklift and reconstruct the orange painted metal naturally;
  2) remove the oversized black "CIMC" lettering from the side of the gray shipping container and reconstruct the corrugated gray metal naturally;
  3) remove the red Chinese news watermark in the bottom-right corner and reconstruct the polished concrete floor and red safety-light line behind it naturally;
  4) remove legible license-plate characters and replace them with blank, non-identifying plates consistent with the scene.
  Constraints: preserve the original people, faces, poses, blue uniforms, forklift, containers, wrapped equipment, factory architecture, red safety lines, perspective, crop, lighting, colors, reflections, and photographic grain. Do not add, move, restyle, beautify, or replace any other element. Keep this an authentic documentary photograph. No new logos, text, labels, symbols, or watermark.
  Avoid: synthetic-looking surfaces, altered faces or hands, changed machinery, additional equipment, cinematic relighting, illustration or CGI.
  ```

- Second-pass exact edit prompt:

  ```text
  Use case: precise-object-edit
  Asset type: authentic website photo for an export logistics section
  Input image: edit target — the supplied already-cleaned factory loading photograph.
  Primary request: Make one final, tightly localized brand cleanup and change nothing else.

  Exact removals:
  1) On the orange forklift, remove the remaining silver circular manufacturer emblem located at the very bottom center of the orange front/rear body panel, between the two visible black tires. Reconstruct the surrounding orange painted metal and recessed panel naturally, with no badge, text, icon, circular outline, or symbol.
  2) Remove only recognizable supplier/company logo embroidery or brand marks on the blue work uniforms and black garments. In particular, neutralize the small yellow/gold company-style emblem on the black sleeveless shirt of the seated worker at the right container opening and the gold company-style emblem on the black jacket of the standing woman at far right. Where any similar small supplier logo appears on blue uniforms, replace it with matching plain blue fabric.

  Critical invariants: preserve every person's identity, face, hair, pose, body proportions, hands, clothing cut, folds and color; preserve all PPE including hard hats, gloves, ID badge/lanyard, shoulder epaulettes, reflective or safety details; preserve the forklift geometry, tires, lights and orange paint; preserve both containers, wrapped equipment, factory architecture, red safety-light lines, yellow floor line, perspective, crop, lighting, reflections, photographic grain and all previously cleaned areas. Do not alter any other object or region.
  No new logos, text, badges, icons, symbols, watermarks, decorative patches or labels.
  Avoid: synthetic surfaces, altered faces/hands, changed machinery, changed uniform design, removed safety indicators, cinematic relighting, beautification, illustration or CGI.
  ```

## Rejected alternatives

- Supplier loading montages were rejected when they carried prominent company marks, truck/forklift brands, container-line logos, baked-in promotional titles, or news watermarks.
- Generic stock logistics photos were rejected when they showed unrelated food, agricultural, or construction cargo or visible equipment/trucking brands.
