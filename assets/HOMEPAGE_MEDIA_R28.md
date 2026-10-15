# Release 28 homepage image delivery

Integration and layout checked 2026-10-16 (Asia/Shanghai). Source access/asset-review dates are recorded in each source register.

## Selected final assets

| Section | Published file | Role |
| --- | --- | --- |
| Wind Turbines cover | `assets/catalog-wind-500w-alt.webp` | Naturally white-background FD-series turbine, linked to the matching catalogue record; no new edit |
| Verification | `assets/supplier-storage-internals.webp` | Existing lead view of open cabinets |
| Verification | `assets/r28-quality-battery-inspection.jpg` | New battery-module connection inspection reference |
| Verification | `assets/r28-quality-solar-inspection.jpg` | New solar-module EL/VI image-review reference |
| Dispatch | `assets/supplier-export-crates.jpg` | Existing lead packing photograph |
| Dispatch | `assets/r28-dispatch-export-crates.webp` | New staged export-case photograph |
| Dispatch | `assets/r28-dispatch-container-loading.jpg` | New industrial container-loading reference |

All paths are relative to the published site root. Originals and intermediate generated outputs remain recoverable outside the public checkout. The unselected warehouse candidate was not used because it retains a possibly branded blue circular mark and adds less visual variety than container loading.

## Source and exact prompt registers

- [Wind source and physical-identity review](CATALOG_WIND_R28_SOURCES.md).
- [Verification sources, retained originals, final paths and exact cleanup prompt](QUALITY_R28_SOURCES.md).
- [Dispatch sources, retained originals, final paths and exact cleanup prompt set](DISPATCH_R28_SOURCES.md).

Editing mode: the built-in image editor, not the CLI/API fallback, was used only for tightly scoped brand/watermark cleanup of the battery-inspection and container-loading photographs. Equipment geometry, people, setting and technical content were not intentionally changed. The wind image, solar-inspection image and new export-case image are naturally clean source photographs. These edits are not evidence of a technical rating, test result or Lantian ownership of a site.

## Integration and safeguards

- Four homepage product names, corresponding category links and the correct cabinet/inverter separation are retained.
- Existing hero/carousel markup and the Release 27 homepage width frame are unchanged.
- The six existing field photos, three verification photos and three dispatch photos each retain their own viewer group.
- New photos open from either the image itself or a keyboard-accessible labelled button. Previous/next arrows, arrow keys and Escape/close are supported.
- The catalogue regression check asserts the reviewed white wind cover and exactly three distinct captioned, lazy-loaded photos per new group.
