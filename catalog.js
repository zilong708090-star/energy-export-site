/* Progressive enhancement only: the product pages and specifications are static. */
(() => {
  'use strict';
  const configNode = document.getElementById('catalog-data');
  if (configNode) {
    let config;
    try { config = JSON.parse(configNode.textContent); } catch { return; }
    const items = config.items || [];
    const cards = [...document.querySelectorAll('[data-catalog-card]')];
    const search = document.getElementById('catalog-search');
    const filters = [...document.querySelectorAll('[data-catalog-filter]')];
    const status = document.querySelector('[data-catalog-status]');
    const empty = document.querySelector('[data-catalog-empty]');
    const searchClear = document.querySelector('[data-search-clear]');
    const selected = new Set();
    const limit = 3;
    let group = 'all';
    const lookup = new Map(items.map(item => [item.id,item]));
    const normalizeSearch = text => String(text).toLowerCase().replace(/[\s,\-–]/g,'');
    const textLookup = new Map(items.map(item => [item.id,normalizeSearch(JSON.stringify([item.name,item.subcategoryLabel,item.source?.model,item.headlineSpecs,item.specs]))]));
    const updateFilters = () => {
      const query = normalizeSearch((search?.value || '').trim());
      let visible = 0;
      for (const card of cards) {
        const item = lookup.get(card.dataset.productId);
        const groupMatch = group === 'all' || item?.[config.filterBy] === group;
        const queryMatch = !query || textLookup.get(card.dataset.productId)?.includes(query);
        card.hidden = !(groupMatch && queryMatch);
        if (!card.hidden) visible++;
      }
      if (status) status.textContent = `Showing ${visible} of ${items.length} configurations`;
      if (empty) empty.hidden = visible !== 0;
      if (searchClear) searchClear.hidden = !query;
      filters.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.catalogFilter === group)));
    };
    filters.forEach(button => button.addEventListener('click',() => { group = button.dataset.catalogFilter; updateFilters(); }));
    search?.addEventListener('input',updateFilters);
    searchClear?.addEventListener('click',() => { search.value = ''; updateFilters(); search.focus(); });
    document.querySelector('[data-reset-filters]')?.addEventListener('click',() => { group = 'all'; if (search) search.value = ''; updateFilters(); });

    const tray = document.querySelector('[data-compare-tray]');
    const count = document.querySelector('[data-compare-count]');
    const compareOpen = document.querySelector('[data-compare-open]');
    const compareStatus = document.querySelector('[data-compare-status]');
    const compareDialog = document.getElementById('catalog-compare-dialog');
    const checkboxes = [...document.querySelectorAll('[data-compare-id]')];
    const updateSelection = () => {
      if (tray) tray.hidden = selected.size === 0;
      if (count) count.textContent = `${selected.size} of ${limit} selected`;
      if (compareOpen) compareOpen.disabled = selected.size < 2;
      document.body.classList.toggle('catalog-has-selection',selected.size > 0);
      checkboxes.forEach(checkbox => { checkbox.checked = selected.has(checkbox.dataset.compareId); });
    };
    checkboxes.forEach(checkbox => checkbox.addEventListener('change',() => {
      const id = checkbox.dataset.compareId;
      if (checkbox.checked) {
        if (selected.size === limit) {
          checkbox.checked = false;
          if (compareStatus) compareStatus.textContent = 'You can compare up to three products. Remove one before adding another.';
          return;
        }
        selected.add(id);
      } else selected.delete(id);
      if (compareStatus) compareStatus.textContent = `${selected.size} products selected for comparison.`;
      updateSelection();
    }));
    document.querySelector('[data-compare-clear]')?.addEventListener('click',() => { selected.clear(); updateSelection(); });
    const textCell = (tag,text) => { const element = document.createElement(tag); element.textContent = text; return element; };
    const aliases = new Map([
      ['rated output power',['ac-power','Rated AC power']],
      ['rated ac power',['ac-power','Rated AC power']],
      ['rated ac output',['ac-power','Rated AC power']],
      ['rated ac input / output',['ac-power','Rated AC power']],
      ['rated inverter output',['ac-power','Rated AC power']],
      ['nominal battery energy',['battery-energy','Battery energy (reference conditions)']],
      ['rated battery energy',['battery-energy','Battery energy (reference conditions)']],
      ['rated battery energy (@bol)',['battery-energy','Battery energy (reference conditions)']],
      ['battery energy',['battery-energy','Battery energy (reference conditions)']],
      ['maximum power at stc',['pv-stc','PV maximum power at STC (front-side)']],
      ['front-side maximum power at stc',['pv-stc','PV maximum power at STC (front-side)']],
      ['cooling',['cooling','Thermal management']],
      ['battery cooling',['cooling','Thermal management']],
      ['thermal management',['cooling','Thermal management']]
    ]);
    const specKey = label => {
      const normalized = label.toLowerCase().replace(/\s+/g,' ').trim();
      return aliases.get(normalized)?.[0] || normalized;
    };
    const comparisonLabel = label => aliases.get(label.toLowerCase().replace(/\s+/g,' ').trim())?.[1] || label;
    const buildComparison = () => {
      const products = [...selected].map(id => lookup.get(id));
      const target = document.querySelector('[data-compare-table]');
      target.replaceChildren();
      const table = document.createElement('table');
      const caption = textCell('caption','Published reference specifications for the selected products.');
      caption.className = 'sr-only';
      table.append(caption);
      const thead = document.createElement('thead');
      const header = document.createElement('tr');
      const label = textCell('th','Reference configuration');
      label.scope = 'col';
      header.append(label);
      for (const product of products) {
        const cell = document.createElement('th'); cell.scope = 'col';
        const image = document.createElement('img'); image.src = config.base + product.image.src; image.alt = product.image.alt || product.name;
        cell.append(image,textCell('div',product.name));
        const link = textCell('a','Open specifications ↗'); link.href = config.base + 'products/details/' + product.id + '.html';
        cell.append(link); header.append(cell);
      }
      thead.append(header); table.append(thead);
      const rows = new Map();
      products.forEach(product => product.specs.forEach(spec => { if (!rows.has(specKey(spec.label))) rows.set(specKey(spec.label),comparisonLabel(spec.label)); }));
      const tbody = document.createElement('tbody');
      for (const [key,label] of rows) {
        const row = document.createElement('tr'); const rowLabel = textCell('th',label); rowLabel.scope = 'row'; row.append(rowLabel);
        products.forEach(product => row.append(textCell('td',product.specs.find(spec => specKey(spec.label) === key)?.value || '—')));
        tbody.append(row);
      }
      table.append(tbody); target.append(table);
    };
    const closeComparison = () => { compareDialog?.close(); document.body.classList.remove('catalog-dialog-open'); };
    compareOpen?.addEventListener('click',() => {
      if (selected.size < 2 || !compareDialog || typeof compareDialog.showModal !== 'function') return;
      buildComparison(); compareDialog.showModal(); document.body.classList.add('catalog-dialog-open');
    });
    document.querySelector('[data-compare-close]')?.addEventListener('click',closeComparison);
    compareDialog?.addEventListener('close',() => document.body.classList.remove('catalog-dialog-open'));
    updateFilters(); updateSelection();
  }

  const mainImage = document.querySelector('[data-product-image]');
  const imageDialog = document.getElementById('catalog-image-dialog');
  document.querySelectorAll('[data-product-photo]').forEach(button => button.addEventListener('click',() => {
    if (!mainImage) return;
    mainImage.src = button.dataset.productPhoto;
    mainImage.alt = button.dataset.productAlt;
    const caption = document.querySelector('[data-current-photo-caption]');
    if (caption) caption.textContent = button.dataset.productCaption || 'Supplier model-family reference image.';
    document.querySelectorAll('[data-product-photo]').forEach(candidate => candidate.setAttribute('aria-pressed',String(candidate === button)));
  }));
  document.querySelector('[data-image-enlarge]')?.addEventListener('click',() => {
    if (!mainImage || !imageDialog || typeof imageDialog.showModal !== 'function') return;
    const enlarged = imageDialog.querySelector('img'); enlarged.src = mainImage.currentSrc || mainImage.src; enlarged.alt = mainImage.alt;
    imageDialog.showModal(); document.body.classList.add('catalog-dialog-open');
  });
  document.querySelector('[data-image-close]')?.addEventListener('click',() => imageDialog?.close());
  imageDialog?.addEventListener('close',() => document.body.classList.remove('catalog-dialog-open'));
})();
