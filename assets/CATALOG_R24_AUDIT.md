# Release 24 — category, image and specification audit

Reviewed 2026-10-15. The user authorized adaptation of supplied and researched supplier imagery. Product data remains a selection reference tied to each exact supplier model or named model column, not a claim of in-house manufacture, inventory, current commercial availability, warranty or certified system compatibility.

## Corrected homepage covers

| Category | Reviewed cover record | Final asset |
| --- | --- | --- |
| Battery energy storage | HCESS1-100-215 liquid-cooled battery storage cabinet | `assets/catalog-storage-liquid-215kwh-clean.jpg` |
| Inverters | SUN-12K-SG05LP3-EU-SM2 three-phase hybrid inverter family | `assets/catalog-inverter-three-phase.jpg` |
| Solar PV | TSM-460NEG9R.28 black-frame module family, front/rear view | `assets/catalog-solar-black-frame.png` |
| Small wind | GH-series horizontal-axis turbine rendering; family representation, not a scale drawing | `assets/catalog-wind-3kw-family.jpg` |

Each cover's category, exact catalogue record, local image and target link are synchronized through `catalog-data/categories.json` and `scripts/build-catalog.mjs`. The checker verifies all four against the homepage. The old `supplier-storage-cabinet.jpg` and `supplier-inverter-cabinet.jpg` are no longer referenced by the homepage. No merely renamed old image is used as a substitute for a reviewed equipment class.

## Catalogue expansion

- 52 configurations: 14 storage, 14 inverter, 12 PV and 12 wind.
- 22 format subgroups, 742 technical fields and 45 distinct product/gallery images.
- 52 static detail pages and 52 downloadable model-specific specification summaries.
- Storage leads with commercial cabinets; battery-only, integrated all-in-one and DC container scope remain explicit.
- Photographs shared within an actual supplier family are labelled. Captions remain visible on cards, detail pages, comparison headers, enlarged views and downloads.
- Specific supplier editions and conflicting specifications are retained in model notes rather than blended across revisions.

## Image origins, edit prompts and saved outputs

All R24 image edits used the built-in imagegen tool, not a CLI/API fallback. Inputs and final outputs were visually inspected. Edits removed only supplier branding, watermarks or advertising overlays; prompts preserved equipment type, geometry, connectors, blades/module counts and safety labels. Original hardware images were used rather than generating new product designs. Delivery JPEGs were mechanically encoded at quality 85; genuine transparent manufacturer renders remain PNG.

The following registers contain the source and image URLs, exact model limitations, final asset paths, complete prompt sets, tool mode and generated-output mappings:

- [Storage sources, images and prompt set](CATALOG_STORAGE_R24_SOURCES.md)
- [Inverter and PV sources, images and prompt set](CATALOG_SOLAR_INVERTER_R24_SOURCES.md)
- [Wind sources, images and prompt set](CATALOG_WIND_R24_SOURCES.md)
- [Earlier R23 image-edit record](CATALOG_EDIT_NOTES.md)

Raw/rejected supplier downloads and cleaned PNG masters were moved recoverably into sibling work folders outside the published checkout. None were deleted. Their exact paths are in the category registers above.

## Validation

The static build/check scripts verify records, category membership, cover mapping, local images, visible parameters and captions, model-specific download notes, structured product metadata without fabricated offers, all internal links/anchors and sitemap coverage. Browser QA covers desktop/phone layout, category-to-product navigation, subcategory deep links, model/unit search, no-results/reset, comparison and image enlargement. No visitor message is sent automatically; quotation links only prepare a WhatsApp conversation for the visitor to send.
