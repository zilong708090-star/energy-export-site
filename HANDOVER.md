# Energy export website — Release 19

Public website: https://zilong708090-star.github.io/energy-export-site/

## Delivered pages

- Homepage: `index.html`
- Battery storage: `products/energy-storage.html`
- Inverters: `products/inverters.html`
- Solar PV modules: `products/solar-modules.html`
- Small wind: `products/small-wind.html`
- Storage planning guide: `resources/storage-planning.html`
- Hybrid power guide: `resources/hybrid-power.html`
- Export project checklist: `resources/project-checklist.html`
- Downloadable project brief: `resources/project-brief-template.txt`

## Visitor experience

The homepage includes the existing automatic/manual carousel, four product categories, system architecture selector, six application scenarios, a six-photo image viewer, engineering, production, inventory, verification, export packing, quotation process, project support, buyer resources, WhatsApp project briefing and FAQ.

Each product page includes a dedicated product/installation hero, application information, four-image detail gallery, technical buying questions and direct WhatsApp contact. The resource pages provide linked contents, practical procurement information and a downloadable project brief.

Company name and logo remain unassigned. All contact buttons use WhatsApp +86 152 2422 0207. The project form prepares a WhatsApp message locally; it does not collect information in a website database. The visitor confirms sending in WhatsApp.

## Maintaining the website

- Edit homepage content in `index.html`.
- Edit page layouts and responsive appearance in `styles.css`.
- Edit carousel, image viewer and form behaviour in `app.js`.
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
