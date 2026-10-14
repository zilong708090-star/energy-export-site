# Product catalogue images — Release 23

The user stated that reproduction and adaptation permission had been obtained. Product photography and numerical specifications are tied to the supplier/model records in `catalog-data/*.json`. They are not represented as Lantian-owned factories, original Lantian designs, completed Lantian projects or guaranteed exact ordered configurations. Final supplied appearance, accessories and documentation are confirmed by quotation.

## Final edited assets

- `assets/catalog-storage-wall-5kwh-clean.jpg`
- `assets/catalog-storage-rack-5kwh-clean.jpg`
- `assets/catalog-storage-all-in-one-10kwh-clean.jpg`
- `assets/catalog-storage-liquid-215kwh-clean.jpg`
- `assets/catalog-storage-container-3700kwh-clean.jpg`
- `assets/catalog-inverter-off-grid.jpg`
- `assets/catalog-inverter-single-phase.jpg`
- `assets/catalog-inverter-three-phase.jpg`
- `assets/catalog-inverter-grid.jpg`
- `assets/catalog-inverter-commercial-hybrid.jpg`
- `assets/catalog-solar-bifacial-580w.jpg`

All eleven edits used the built-in imagegen tool, not an API/CLI fallback. Inputs were inspected before editing; results were inspected for remaining prominent branding and preservation of equipment. JPEG encoding at quality 85 is a delivery-format optimization. The unmodified generated PNGs remain recoverable in the user's generated-images directories; working source copies are retained in sibling `work/catalog-storage-source-originals/` and `work/catalog-inverter-source-originals/` directories outside the published checkout.

## Prompt set

The cleanup deliberately preserves hardware rather than using AI to invent product models. Edited illustrations are not dimensioned engineering drawings. Model-specific image captions and supplier-reference notes remain on detail pages and in downloaded specifications.

### Four smaller inverter families

Use case: precise-object-edit. Asset type: authorized neutral product photograph for an energy equipment catalogue. The provided image is the EDIT TARGET, not a style reference. Isolate only the actual inverter from the left of the image onto a plain pure-white background, centered with generous white margins. Remove ONLY the Deye brand logo on the inverter and all advertising/specification text, banner, grey/blue graphic panel to its right. This is a narrowly scoped cleanup, NOT new hardware design. Preserve the exact inverter housing shape, proportions, angle, all enclosure seams, display screen and its contents, indicator/button locations, cooling fins, bottom connectors, cables, metallic colours and generic electrical hazard labels. Preserve every visible physical component. Do not add or remove physical parts, do not change ratings or invent technical labels. Keep a realistic faithful product cutout. No new text, no logo, no watermark, no company name, no decorative objects. Single image showing this exact inverter only.

### Commercial high-voltage inverter

Use case: precise-object-edit. Authorized product-photo cleanup. The provided image is the edit target. Isolate only the actual high-voltage inverter on the left, remove the Deye logo on its front control panel and all promotional/specification graphics on the right. Center this SAME inverter on a plain pure-white background. Preserve the exact tall rectangular light-grey enclosure, screw positions, central display and buttons, side black isolator, left-side fittings, orange and black bottom connectors, angle, size proportions, seams, cooling construction and visible hardware. Change no physical parts. No new text, no logo, no watermark, no decorative objects. Do not redesign or invent hardware. This is strictly a logo-neutral faithful photographic cutout of the supplied inverter.

### Bifacial solar module

Use case: precise-object-edit. Authorized product-photo cleanup. The provided image is the edit target. Remove ONLY the green Jinko logo and the 570-590W promotional banner covering the solar modules. Naturally reconstruct the small covered grid/frame region from the surrounding cell pattern. Keep the same two front/rear double-glass solar module views, exact silver frames, module dimensions/proportions, cell count/rows/busbar pattern, slight perspective, textures and shadows. Pure-white background. Center the two unchanged modules with white margin. Do not add or remove solar cells, do not change module structure, no new text, no logo, no watermark, no promotional banner. Do not generate a different product. Preserve all visible hardware and framing.

### Storage cleanup prompt briefs (faithfully consolidated)

- Wall battery: remove PNG Solar logos from both enclosures and the lower-right battery badge; retain both enclosures, circular orange screens, black side panels, perspective and soft shadow. Fill only logo areas with matching white; no redesign or new parts.
- All-in-one: remove only the upper-left EnjoySolar logo, replacing it with white background; retain exact unit proportions, display/buttons, black band, enclosure and shadow.
- Liquid cabinet: remove manufacturer lettering, certification overlays and the blue promotional border; preserve cabinet shape, perspective, doors, lamps, vents, base, handles and emergency button. Fill only removed-mark areas with matching cabinet colour.
- Rack battery: remove only the LEOCH logo/brand words; preserve electrical labels, terminals, handles, connectors, LEDs, display and enclosure. Use a white background.
- Container: remove only COREY logos; preserve corner castings, vents, doors, locks, cooling, warnings, alarm panels, colours, perspective and shadow. No new objects or redesign.

## Original clean imagery

The air-cooled cabinet, four Trina module family images, four inverter rear/side images and seven wind reference images did not require generative brand removal. Wind family renderings and supplier installation photographs are explicitly captioned as references rather than exact model scale drawings or Lantian projects. Individual original image URLs are retained in the catalogue JSON records where supplied; storage source/model URLs are in the same records.
