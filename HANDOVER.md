# Shandong Lantian Energy Technology Co., Ltd. — Release 37

Public website: https://www.photovoltaicpanels.com.cn/

## Release 37 — remove analytics popup and floating preferences control

The owner requested removal of the entire screenshot-marked analytics region, including the optional-analytics popup and the bottom-left “Analytics preferences” button. The production analytics module is paused before any UI, stylesheet, Google tag, analytics event or measurement listener is created. This applies to unknown, rejected and previously accepted consent choices: removing the control must not turn optional tracking into automatic tracking. The paused module sets the GA opt-out flag and attempts to clear only this site's prior `_ga` and `_ga_P2KJHXDBS2` cookies. Earlier saved preference values are retained but ignored while paused; no remote historical Analytics data or account is deleted.

Shared app and analytics-script cache tags are `37.1`; existing styles and catalogue-script tags remain `33.1`. All current pages load the paused module, and the three immediate compatibility redirects remain unchanged. The retained English privacy notice now describes the paused state. Header, hero/carousel, copy, imagery, product data, WhatsApp contacts, footer, domain and HTTPS configuration are unchanged. The previous opt-in implementation remains in source history; future measurement changes need an explicit owner decision and updated visitor-facing controls/notice before re-enabling.

The catalogue suite must still run in a clean isolated snapshot because of the owner's unrelated pending deletion of `assets/supplier-solar-farm.jpg`; preserve that working-tree deletion and untracked `assets/.DS_Store`. No Google Ads campaign, payment or account setting is changed by this release.

## Release 36 — optional visitor and WhatsApp-click analytics

The owner approved GA4 visitor statistics and WhatsApp button-click measurement, not a paid advertising launch. The existing Google account owns Analytics account `412401425`, property `559471009`, website stream `16153697889` and public measurement ID `G-P2KJHXDBS2`. The stream URL is `https://www.photovoltaicpanels.com.cn/`. Analytics report entry: https://analytics.google.com/analytics/web/#/a412401425p559471009/reports/intelligenthome . Never add API secrets, passwords or account credentials to this public repository.

The isolated `analytics.js` module is loaded once by shared `app.js`; only the app-script cache version changes to `36.1`. Existing styles, catalogue scripts, design, content and domain/hosting are unchanged. The English consent controls and persistent “Analytics preferences” entry use scoped `analytics.css`. The new `resources/privacy.html` describes this integration and is included in the sitemap. All content pages load the module; the three immediate compatibility redirects do not.

No Google script or analytics request is initiated by the module before explicit acceptance, after rejection, or when local-storage access fails. DNT/GPC override saved acceptance. Acceptance enables analytics storage only; advertising storage, ad user data, ad personalization and Google signals remain disabled. Configure the GA4 website stream with **Enhanced measurement OFF** before publishing; otherwise Google can automatically collect full outbound WhatsApp URLs outside this module's deliberately limited events. Do not enable cross-domain linking, Google signals or advertising integrations without a new owner request and a matching privacy review.

Intentional events are a query/fragment-stripped `page_view` and `whatsapp_click`. WhatsApp parameters contain only contact method, general button location and page path, never the telephone number, full destination link, prefilled message or form data. A click is not a sent message, confirmed enquiry or sale. GA4 may also create its normal session/first-visit records. Identifier cookies are configured for 90 days without expiry refresh and `SameSite=Lax;Secure`. Withdrawal sets the GA opt-out flag immediately, stops subsequent module events and deletes only `_ga` and `_ga_P2KJHXDBS2` for this site's host/domain candidates; it cannot recall in-flight requests or erase historical Google data. Consent is stored separately under `lantian_analytics_consent_v1` in local storage.

Run `node scripts/check-analytics.mjs` for opt-in, rejection, withdrawal, delayed tag loads, URL minimization, idempotence, storage failures, cookie scope, DNT/GPC and click-link behavior. Run the existing catalogue regression suite as well. A clean isolated snapshot is needed for the catalogue suite while the owner's unrelated working-tree deletion of `assets/supplier-solar-farm.jpg` remains pending; do not restore or publish that deletion as part of analytics work. Live collection must be checked in Analytics Realtime after a consented browser test. Statistics start after installation and consent; they cannot reconstruct prior visitor history.

## Release 35 — owner-purchased custom domain

The owner purchased `photovoltaicpanels.com.cn` in Alibaba Cloud and requested binding it to this existing website. The formal hostname is `www.photovoltaicpanels.com.cn`; GitHub Pages custom-domain configuration and the tracked root `CNAME` preserve that binding. Alibaba Cloud DNS has four apex A records for GitHub Pages and a `www` CNAME to `zilong708090-star.github.io`. Both names should resolve to the same site, with the apex redirecting to `www` and HTTPS enforced after GitHub issues the certificate.

Homepage and resource canonicals, Open Graph URLs, generated catalogue canonical/structured-data URLs, retired-product notices, robots sitemap discovery and all sitemap entries use the new HTTPS origin. Layout, content, product records and shared assets remain unchanged. Domain registration/DNS stay in the owner's Alibaba Cloud account; source/hosting stay in the existing GitHub repository. Continue editing and rebuilding normally without changing the domain.

## Release 34 — remove exhibition, construction and certificate sections

The owner requested removal of all three R31 homepage additions: `#industry-connections`, `#project-execution` and `#document-library`. Each complete section is removed, including its heading, copy, photographs/cards and supporting rows. The document-library FAQ is removed, and the remaining image FAQ no longer refers to the retired exhibition/meeting collection. The now-unused homepage link to `reference-media.css` is removed without changing shared CSS or JavaScript; existing shared asset cache tags therefore remain `33.1`.

Company introduction now leads directly into the product section, engineering depth into operations, and verification into export delivery. All other section markup, the four-slide hero, the twelve original field/verification/dispatch images, contact controls and the horizontal R33 footer remain. The removed photographs, certificate originals/previews and source registers are retained as archived assets, not displayed or opened by the homepage. No catalogue/product data or inner-page source was changed.

## Release 33 — screenshot-scoped cleanup and horizontal footer identity

The fifteen owner annotations are applied to the homepage only. Removed: the remaining three hero-slide action groups and shared scroll prompt; selected company micro-labels, two company links and factory-image text overlay/note; six essential-place discussion links and six field-application links; visible extra notes/source links beneath the exhibition, construction and certificate cards; document-review and dispatch-document strips; the dispatch image disclaimer; buyer-guide action rows and the download banner; and the homepage footer's integrated-energy micro-label. Resource cards are now non-linked articles, so deleted calls to action do not leave invisible navigation targets.

Unmarked headings, body copy, imagery, category navigation, visual grids, reading frame, carousel arrows/dots and prominent WhatsApp contacts remain. Original supplier PDFs/PNGs and the R31 source registers are unchanged; photo enlargement retains its source/context notes and unmarked supplier-copy labels remain on certificate cards. Removing visible caption clutter does not change the documented ownership or scope of the referenced material. The factory image's visualization provenance remains in its alt text and asset register.

The homepage footer displays “Shandong Lantian Energy Technology Co., Ltd.” as one larger continuous horizontal wordmark, with responsive font scaling rather than the previous stacked brand descriptor. Inner-page footers are not restyled. Shared cache tags are `33.1`.

## Release 32 — partnership message on the first screen

The first homepage slide retains the white “One-stop power solutions.” heading and its existing background. The marked regional eyebrow, “Power everywhere.” tagline and two in-slide calls to action are removed. The exact closing message, “Let our long-term partnership begin with getting to know each other.”, now appears below the white heading in a smaller lime-green typographic block. It is removed from the homepage footer rather than duplicated. The footer's unmarked integrated-energy label and company identity remain; inner-page footers are unchanged.

All four carousel slides, automatic/manual navigation, the masthead project button, floating WhatsApp contact and the R31 reference-media sections are retained. New copy styling is scoped to `hero__partnership`, with narrow/short-screen adjustments. Shared cache tags are `32.1`.

## Release 31 — industry dialogue, construction and document references

Three photo-led homepage sections add the requested presentation depth without attributing other companies' activities to Lantian. `#industry-connections` uses a full-width exhibition photograph with two supporting public group/discussion images. `#project-execution` shows three separate supplier construction references: module installation, electrical-panel work and on-site module coordination. These six photographs are drawn from Sunpal and 19Energy official publications, with limited built-in image editing of prominent brand/watermark areas. People, settings and equipment are not recast as Lantian staff, customers, event participation or completed projects. Source links, edited-reference labels and explicit ownership limitations appear in the sections and remain visible as notes in the enlargement viewer. The three site photos are not claimed to be consecutive stages of the same project or evidence of passed inspection.

`#document-library` contains three complete-page previews and unchanged original PDFs from Sunpal's official download library. The actual named entities are Sunpal Power Co., Ltd. (PV module certificate), Shanghai Elecnova Energy Storage Co., Ltd. (battery-system certificate) and SRNE Solar Co., Ltd. (inverter conformity document). They are labelled supplier document examples, not Lantian corporate certifications or blanket evidence for the website catalogue. Original holders, models, marks, identifiers, seals and dates are retained. The solar preview is page 1 of its two-page PDF; the other PDFs are one page each. No AI creation, editing, cropping or rebranding was performed on these documents. Printed dates do not establish current issuer status; selected-model applicability and market acceptance remain unverified. Regression checks pin the unchanged original PDF hashes.

The image viewer now has 21 items in six separate collections: field 6, verification 3, dispatch 3, engagements 3, construction 3 and documents 3. The last three groups carry persistent source/context notes in the modal; original PDF/source links remain separate from photo-open controls. Every new image is lazy-loaded with intrinsic dimensions. New-section styling is isolated in `reference-media.css`. Shared cache tags are `31.1`. The approved hero, company profile, product covers and data, header, R27 reading frame and R30 minimal footer are preserved. Sources, exact photo-edit prompts and final asset paths are indexed in `assets/HOMEPAGE_REFERENCES_R31.md`.

## Release 30 — simplified partnership closing

The homepage and shared page footers now close with the owner's requested English message: “Let our long-term partnership begin with getting to know each other.” The footer WhatsApp call-to-action, navigation columns and their labels, product/category tagline, specification line and media note have been removed. The unmarked company wordmark and small integrated-energy label remain, with a shorter layout rather than empty link-column space. An `#footer` anchor permits direct review of the updated area.

The floating WhatsApp control hides while a footer is in view, matching the marked screenshot. It remains available elsewhere; the masthead project-contact button and main contact section are unchanged. Cache tags are `30.1`. Catalogue data, company profile, entrance image, first-screen carousel and the approved homepage reading width are unchanged.

## Release 29 — company profile and solution-led masthead

The company section (`#company`) now contains the owner's complete English company profile in five editorial groups: integrated energy solutions, capabilities across products and projects, regional project experience, international presence and commitment. The founding year (2017), workforce (more than 3,000 employees), market regions and multi-country warehouses/branch offices are owner-supplied statements, not newly researched or inferred claims. No named project, client, country-specific office, certification or additional historical date has been invented. The old undated development-priority panel has been replaced by the supplied business narrative, with the `#company-development` anchor retained for the capabilities section.

The residential rooftop image is replaced by a factory-entrance brand visualization bearing the requested Chinese company name. Its on-page caption and media register identify it as a visualization, not evidence of an actual company-owned facility. Final source, prompt and image paths are recorded in `assets/COMPANY_R29_MEDIA.md`.

The six top navigation links and hamburger menu have been removed from the homepage, generated catalogue/detail pages and standalone buyer guides. A non-interactive English descriptor, “One-stop Energy Solutions”, takes their place on desktop; the company home link and direct WhatsApp “Start a project” remain. On phones the descriptor hides to preserve room for the contact button. This is a solution-led company website, not an online checkout: technology directories remain available within page content, without adding shopping-cart or payment behavior. Shared cache tags are `29.2`; masthead-specific styles are in `header-solutions.css`. The hero slides, product category identities and R27 reading width are preserved.

The floating WhatsApp pill hides while the company section is in view so it cannot obscure the entrance sign, workforce figure or long-form profile. The sticky masthead's direct project contact remains visible, and the floating contact returns outside the section. Company and masthead layouts are checked at desktop, tablet and narrow phone widths.

## Release 28 — white product cover and richer photo collections

The Wind Turbines category now uses the existing, naturally white-background Oulu FD-series complete-unit image, linked to its own `wind-500w-horizontal` catalogue record. The rotor, generator housing, short display support and base remain visible. It is not mislabelled as the previous AH-10KW installation. That previous installation remains available within the catalogue; no numerical product specifications were changed.

The verification area (`#verification`) now has a three-photo composition: cabinet interiors, battery-module connection inspection and solar-module EL/VI image review. The dispatch area (`#dispatch`) has a separate three-photo composition covering protective packing, staged export cases and container loading. Four new reviewed photographs have been added. Supplier-reference captions distinguish the visible process from any claim of company-owned premises or a successful test result. Every new photo opens by clicking the image or its labelled button. The shared image viewer keeps the six field references, three verification images and three dispatch images in separate collections, with arrow keys, previous/next controls and Escape/close support.

The homepage hero, approved company copy and Release 27 side margins remain unchanged. Desktop and phone layouts are checked separately; images are lazy-loaded and the original source files are retained outside the published checkout. Asset/source links and exact built-in editing prompts are indexed in `assets/HOMEPAGE_MEDIA_R28.md`. Shared cache tags are `28.1`.

## Release 27 — larger homepage side margins

The homepage hero/carousel, navigation, slide copy and media positioning remain unchanged. All 17 content containers below the hero, including the footer, now use a narrower homepage-only frame: `clamp(940px, 72vw, 1120px)` above 1050px. On a 1440px viewport this yields a 1036.8px content area with approximately 201.6px / 14% margins on each side, instead of the previous 80px / 5.6%. On a 1800px viewport the content is capped at 1120px with 340px margins. Full-width section backgrounds are retained. The `.home-page` scope leaves product/resource pages and the hero/header unaffected. Below-hero display headings and four-column product labels/arrows are adapted to the narrower frame; category names, images and links are unchanged. At 1051–1350px, product cards remain two columns and engineering uses a stacked layout. The 940px lower bound avoids a width jump at the existing 1050px tablet breakpoint; phones keep their existing 16px gutters.

Browser checks at 1800, 1440, 1351, 1350, 1181, 1051, 1050 and 390px confirm aligned section edges and no horizontal page or text overflow. Hero markup is unchanged; on the 1440px test its 1440px width, 980px height and 1280px content frame remain intact. Shared asset cache tags are now `27.1`.

## Delivered pages

- Homepage: `index.html`
- Complete product catalogue: `products/index.html`
- Energy storage cabinets only: `products/energy-storage.html`
- Battery-only modules: `products/battery-modules.html`
- Containerized battery storage: `products/containerized-storage.html`
- Inverters: `products/inverters.html`
- Solar PV modules: `products/solar-modules.html`
- Wind Turbines: `products/wind-turbines.html` (the old `small-wind.html` address redirects here)
- Storage planning guide: `resources/storage-planning.html`
- Hybrid power guide: `resources/hybrid-power.html`
- Export project checklist: `resources/project-checklist.html`
- Downloadable project brief: `resources/project-brief-template.txt`
- Fifty active individual product configurations: `products/details/*.html`
- Fifty active downloadable technical selection summaries: `resources/specifications/*.txt`
- Technical source register: `resources/catalog-reference.html`

## Product catalogue delivery

The website now has 65 static HTML pages, including three compatibility redirect pages. The four homepage product families lead to physical-equipment directories, with 21 equipment-format subgroups, counted filters, unit/model search and a three-product comparison tool. The active directory includes 12 storage, 14 inverter, 12 solar and 12 wind configurations (50 total), 714 labelled technical fields, 46 distinct product/gallery images and 50 specification downloads. Each configuration includes source/model notes and a direct WhatsApp quotation link. Homepage hero/carousel visuals and the company section remain unchanged.

All four homepage covers use reviewed catalogue equipment on white backgrounds: a liquid-cooled battery storage cabinet, a wall-mounted three-phase hybrid inverter, PV front/rear module views and a complete compact wind turbine on its display support. `catalog-data/categories.json` ties each cover to a product ID in its own category. The builder updates the marked homepage grid from those records; regression checks reject mismatched category IDs, images and links. Previously ambiguous supplier pack covers are retained as historical assets but are no longer used as category covers.

Category pages explain the equipment's role and provide photo-led format navigation. Storage equipment is now separated into three actual directories: 3 commercial cabinets, 8 battery-only wall/rack/high-voltage stacked modules, and 1 DC battery container. The cabinet entry contains only cabinet products, including its related recommendations and detail-page return routes. The full catalogue filters these three physical formats separately. Two former residential inverter-plus-battery all-in-one records have been withdrawn from active presentation; their old detail URLs redirect to the current cabinet directory and their old TXT files show a withdrawal notice. Neither is in the sitemap or active source register. Their source records remain recoverable outside the published checkout. Inverters distinguish off-grid, single-phase and three-phase LV hybrid, commercial HV hybrid, microinverters and grid-tied string units. PV includes full-black, rooftop, clear bifacial, commercial, flexible, compact and utility configurations. Wind Turbines separates horizontal-axis, pitch-controlled and vertical-axis generators; it is not a replacement-blade category. Filter links retain their type on reload. Exact model references and family-photo captions are visible on cards; captions are also retained in comparison, enlargement, details and downloads.

The previous four generic product marketing pages have been replaced by these category directories while preserving their public URLs. A new complete-catalogue link is available beside the four-family homepage display and in the footer. The source register and model-specific caveats distinguish reviewed supplier data from any claim of Lantian manufacture, current inventory, pricing, warranty or certified compatibility.

Catalogue data is maintained in `catalog-data/{storage,inverters,solar,wind}.json`; reviewed category identity/cover links are in `catalog-data/categories.json`, and retired URL handling is in `catalog-data/retired-products.json`. Each storage record has an explicit `equipmentType`; do not move a battery module or integrated residential inverter into the cabinet directory. Generated homepage grid, catalogue HTML, TXT downloads and sitemap can be rebuilt with `node scripts/build-catalog.mjs`. Run `node scripts/check-catalog.mjs` for schema, physical-equipment membership, category-cover correspondence, return/related-product routing, retirement redirects, static specification, image-caption, download-note, internal-link and sitemap checks. Category search/comparison and product image enlargement are in `catalog.js`; catalogue-only styling is in `catalog.css`. No package installation or server backend is required.

R25 classification and clean complete-turbine photo provenance are indexed in `assets/CATALOG_R25_AUDIT.md`. R24 image-edit provenance and final asset paths remain in `assets/CATALOG_R24_AUDIT.md`; R23 records remain in `assets/CATALOG_EDIT_NOTES.md`. No numerical specifications were inferred from the new photographs. Original/rejected source images and generated PNG masters are retained recoverably outside the publishable checkout; only reviewed delivery images are referenced by the website.

## Visitor experience

The homepage includes the automatic/manual carousel, a full company profile before the technology categories, company facts, manufacturing/engineering capabilities, regional experience and international operations, four technology categories, system architecture selector, six industry-specific outage use cases, six photo-led application scenarios, a grouped 12-item image viewer, engineering, production, inventory, three-image verification and export-packing collections, quotation process, project support, buyer resources, a prominent direct WhatsApp contact panel and FAQ. The separate exhibition, construction and certificate sections are no longer displayed.

The former abstract operating-problem cards are now concrete application cards: large hospitals, supermarkets/cold chain, factories, hotels, farm irrigation and remote communities. Each pairs an outage risk with the selected-load power priority and a context-specific WhatsApp link. Hospital copy explicitly coordinates with the site's electrical team, UPS, generators and transfer design; refrigeration copy accounts for starting loads and backup duration. These are representative planning scenarios, not claimed company installations or guarantees of uninterrupted operation or food safety.

The company introduction uses the owner-provided English profile, including establishment in 2017 and more than 3,000 employees. Other dated company milestones have not been provided and none have been invented. The previous development-direction placeholder has been replaced by the supplied capabilities, project-experience, presence and commitment copy.

Each product detail page includes a corresponding supplier product/family view, a labelled parameter table, applications, source/model notes, a download and direct WhatsApp contact. Additional gallery angles are provided only when reviewed matching images are available. The resource pages provide linked contents, practical procurement information and a downloadable project brief.

The company name is displayed in English as Shandong Lantian Energy Technology Co., Ltd. across page headers, footers and browser titles. No graphical logo has been added. All contact buttons use WhatsApp +86 152 2422 0207. The homepage information form has been removed entirely. Application links open WhatsApp directly with a context-specific inquiry. The floating WhatsApp control contracts to its icon while the homepage product grid is visible, so it does not cover product names; its label remains elsewhere. It hides while the company profile, large WhatsApp contact card or page footer is in view. No website form or database collects visitor information; visitors choose whether to send the prepared message within WhatsApp.

## Maintaining the website

- Edit homepage content in `index.html`.
- Edit page layouts and responsive appearance in `styles.css`; solution-led masthead styling is in `header-solutions.css`, and R31 industry/project/document sections are in `reference-media.css`.
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
