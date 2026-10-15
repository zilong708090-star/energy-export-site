# Shandong Lantian Energy Technology Co., Ltd. — Release 24

Public website: https://zilong708090-star.github.io/energy-export-site/

## Delivered pages

- Homepage: `index.html`
- Complete product catalogue: `products/index.html`
- Battery storage: `products/energy-storage.html`
- Inverters: `products/inverters.html`
- Solar PV modules: `products/solar-modules.html`
- Small wind: `products/small-wind.html`
- Storage planning guide: `resources/storage-planning.html`
- Hybrid power guide: `resources/hybrid-power.html`
- Export project checklist: `resources/project-checklist.html`
- Downloadable project brief: `resources/project-brief-template.txt`
- Fifty-two individual product configurations: `products/details/*.html`
- Fifty-two downloadable technical selection summaries: `resources/specifications/*.txt`
- Technical source register: `resources/catalog-reference.html`

## Product catalogue delivery

The website now has 62 static HTML pages. The four homepage product families lead to category directories, with 22 equipment-format subgroups, counted filters, unit/model search and a three-product comparison tool. The directory includes 14 storage, 14 inverter, 12 solar and 12 wind configurations (52 total), 742 labelled technical fields, 45 distinct product/gallery images and 52 specification downloads. Each configuration includes source/model notes and a direct WhatsApp quotation link. Homepage hero/carousel and the company section remain unchanged.

All four homepage covers have been replaced by reviewed catalogue equipment: a liquid-cooled battery storage cabinet, a wall-mounted three-phase hybrid inverter, PV front/rear module views and a small horizontal-axis wind turbine. `catalog-data/categories.json` ties each cover to a product ID in its own category. The builder updates the marked homepage grid from those records; regression checks reject mismatched category IDs, images and links. Previously ambiguous supplier pack covers are retained as historical assets but are no longer used as category covers.

Category pages now explain the equipment's role and provide photo-led format navigation. Storage starts with commercial cabinets and then distinguishes containerized, wall, rack, high-voltage stacked and all-in-one systems. Inverters distinguish off-grid, single-phase and three-phase LV hybrid, commercial HV hybrid, microinverters and grid-tied string units. PV includes full-black, rooftop, clear bifacial, commercial, flexible, compact and utility configurations. Wind separates horizontal-axis, pitch-controlled and vertical-axis turbines. Filter links retain their type on reload. Exact model references and family-photo captions are visible on cards; captions are also retained in comparison, enlargement, details and downloads.

The previous four generic product marketing pages have been replaced by these category directories while preserving their public URLs. A new complete-catalogue link is available beside the four-family homepage display and in the footer. The source register and model-specific caveats distinguish reviewed supplier data from any claim of Lantian manufacture, current inventory, pricing, warranty or certified compatibility.

Catalogue data is maintained in `catalog-data/{storage,inverters,solar,wind}.json`; reviewed category identity/cover links are in `catalog-data/categories.json`. Generated homepage grid, catalogue HTML, TXT downloads and sitemap can be rebuilt with `node scripts/build-catalog.mjs`. Run `node scripts/check-catalog.mjs` for schema, category-cover correspondence, static specification, image-caption, download-note, internal-link and sitemap checks. Category search/comparison and product image enlargement are in `catalog.js`; catalogue-only styling is in `catalog.css`. No package installation or server backend is required.

R24 image-edit provenance, source registers and final asset paths are indexed in `assets/CATALOG_R24_AUDIT.md`; R23 records remain in `assets/CATALOG_EDIT_NOTES.md`. Original/rejected source images and generated PNG masters are retained recoverably outside the publishable checkout; only reviewed delivery images are referenced by the website.

## Visitor experience

The homepage includes the existing automatic/manual carousel, a company overview before the product section, an undated business-development direction, four product categories, system architecture selector, six industry-specific outage use cases, six photo-led application scenarios, a six-photo image viewer, engineering, production, inventory, verification, export packing, quotation process, project support, buyer resources, a prominent direct WhatsApp contact panel and FAQ.

The former abstract operating-problem cards are now concrete application cards: large hospitals, supermarkets/cold chain, factories, hotels, farm irrigation and remote communities. Each pairs an outage risk with the selected-load power priority and a context-specific WhatsApp link. Hospital copy explicitly coordinates with the site's electrical team, UPS, generators and transfer design; refrigeration copy accounts for starting loads and backup duration. These are representative planning scenarios, not claimed company installations or guarantees of uninterrupted operation or food safety.

The company introduction uses the approved name and product scope. The development section is explicitly labelled as development direction rather than historical milestones. Founding dates and dated company milestones are still awaiting owner-provided information; none have been invented.

Each product detail page includes a corresponding supplier product/family view, a labelled parameter table, applications, source/model notes, a download and direct WhatsApp contact. Additional gallery angles are provided only when reviewed matching images are available. The resource pages provide linked contents, practical procurement information and a downloadable project brief.

The company name is displayed in English as Shandong Lantian Energy Technology Co., Ltd. across page headers, footers and browser titles. No graphical logo has been added. All contact buttons use WhatsApp +86 152 2422 0207. The homepage information form has been removed entirely. Application links open WhatsApp directly with a context-specific inquiry. The floating WhatsApp control contracts to its icon while the homepage product grid is visible, so it does not cover product names; its label remains elsewhere. It hides while the large WhatsApp contact card is in view, to avoid covering that card on phones. No website form or database collects visitor information; visitors choose whether to send the prepared message within WhatsApp.

## Maintaining the website

- Edit homepage content in `index.html`.
- Edit page layouts and responsive appearance in `styles.css`.
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
