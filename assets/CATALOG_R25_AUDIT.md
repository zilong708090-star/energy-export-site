# Release 25 — physical product identity correction

Reviewed 2026-10-15. The owner confirmed the fourth product family is complete **Wind Turbines**, not replacement blades.

## Storage equipment routing

- `products/energy-storage.html`: 3 commercial battery cabinets only.
- `products/battery-modules.html`: 8 battery-only wall, rack and high-voltage stacked modules.
- `products/containerized-storage.html`: 1 DC battery container, with external PCS and site scope distinguished.
- Homepage remains four main product families; the full catalogue exposes all six physical-equipment directories.
- Each storage detail page returns to its physical directory; related cards stay within the same equipment type.
- The former `storage-all-in-one-5kwh` and `storage-all-in-one-10kwh` inverter-plus-battery entries are withdrawn from all active listings, source registers and sitemap. Old HTML URLs are noindex redirects; old TXT downloads are withdrawal notices.
- Exact withdrawn source records are retained recoverably outside the published repository at `../catalog-r25-retired-all-in-one.json`. No existing customer files or unrelated source assets were deleted.

See `CATALOG_STORAGE_R25_AUDIT.md` for the item-level source audit. Battery-only modules were not falsely relabelled as inverters: the correction separates equipment formats and removes the residential integrated inverter/battery systems from the active catalogue.

## Complete wind turbines

- New canonical directory: `products/wind-turbines.html`; `products/small-wind.html` is a noindex compatibility redirect.
- Exact homepage/category name: **Wind Turbines**.
- The category cover uses `catalog-wind-r25-complete-10kw.webp`, an unmodified copy of the clean supplier installation photograph. The homepage card and category hero use `object-fit: contain` to retain the whole rotor, nacelle, mast and foundation.
- The GH-series internal record uses `catalog-wind-r25-gh-complete.jpg`, with a visible caption stating that the exact individual model and dimensions are not identified in the source photograph. Its former head-only rendering remains a clearly labelled secondary detail.
- Photos do not imply Lantian-owned installations, included tower/foundation scope or new technical performance claims. Numerical specifications are unchanged.

Exact listing and image URLs are recorded in `CATALOG_WIND_R25_SOURCES.md`.

## Reproducibility and checks

- Build: `node scripts/build-catalog.mjs`.
- Regression checks: `node scripts/check-catalog.mjs`.
- 50 active configurations, 714 labelled specification fields, 46 distinct active product/gallery images, 50 active TXT downloads.
- 65 physical HTML files, including 3 compatibility redirects; 62 active generated routes.
- Regression checks assert cabinet/module/container membership, detail return routes, same-format related cards, retired URL handling, canonical wind links, homepage category/image identity, specification/download integrity and local link validity.
- Shared asset cache tags are `25.1`.
