# Shandong Lantian Energy Technology Co., Ltd. — Release 23

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
- Twenty-two individual product configurations: `products/details/*.html`
- Twenty-two downloadable technical selection summaries: `resources/specifications/*.txt`
- Technical source register: `resources/catalog-reference.html`

## Product catalogue delivery

The website now has 32 static HTML pages. The four homepage product families lead to category directories, with subcategory filters, unit/model search and a three-product comparison tool. Each configuration has local product photography, 8+ source-verified technical fields, a specification download, application starting points, source/model notes and a direct WhatsApp quotation link. The directory includes 6 storage, 5 inverter, 5 solar and 6 wind configurations (22 total). Homepage hero/carousel and the company section remain unchanged.

The previous four generic product marketing pages have been replaced by these category directories while preserving their public URLs. A new complete-catalogue link is available beside the four-family homepage display and in the footer. The source register and model-specific caveats distinguish reviewed supplier data from any claim of Lantian manufacture, current inventory, pricing, warranty or certified compatibility.

Catalogue data is maintained in `catalog-data/{storage,inverters,solar,wind}.json`. Generated HTML, TXT downloads and sitemap can be rebuilt with `node scripts/build-catalog.mjs`. Run `node scripts/check-catalog.mjs` for schema, static specification, image-caption, download-note, internal-link and sitemap checks. Category search/comparison and product image enlargement are in `catalog.js`; catalogue-only styling is in `catalog.css`. No package installation or server backend is required.

Image-edit provenance and final asset paths are documented in `assets/CATALOG_EDIT_NOTES.md`. Original/rejected source images are retained outside the publishable checkout; only reviewed clean versions are referenced by the website.

## Visitor experience

The homepage includes the existing automatic/manual carousel, a company overview before the product section, an undated business-development direction, four product categories, system architecture selector, six industry-specific outage use cases, six photo-led application scenarios, a six-photo image viewer, engineering, production, inventory, verification, export packing, quotation process, project support, buyer resources, a prominent direct WhatsApp contact panel and FAQ.

The former abstract operating-problem cards are now concrete application cards: large hospitals, supermarkets/cold chain, factories, hotels, farm irrigation and remote communities. Each pairs an outage risk with the selected-load power priority and a context-specific WhatsApp link. Hospital copy explicitly coordinates with the site's electrical team, UPS, generators and transfer design; refrigeration copy accounts for starting loads and backup duration. These are representative planning scenarios, not claimed company installations or guarantees of uninterrupted operation or food safety.

The company introduction uses the approved name and product scope. The development section is explicitly labelled as development direction rather than historical milestones. Founding dates and dated company milestones are still awaiting owner-provided information; none have been invented.

Each product page includes a dedicated product/installation hero, application information, four-image detail gallery, technical buying questions and direct WhatsApp contact. The resource pages provide linked contents, practical procurement information and a downloadable project brief.

The company name is displayed in English as Shandong Lantian Energy Technology Co., Ltd. across page headers, footers and browser titles. No graphical logo has been added. All contact buttons use WhatsApp +86 152 2422 0207. The homepage information form has been removed entirely. Application links now open WhatsApp directly with a short, context-specific inquiry, and the labelled floating WhatsApp button remains available over the product section. It hides only while the large WhatsApp contact card is in view, to avoid covering that card on phones. No website form or database collects visitor information; visitors choose whether to send the prepared message within WhatsApp.

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
