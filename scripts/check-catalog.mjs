import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const categories=['storage','inverters','solar','wind'];
const products=categories.flatMap(category=>{
  const data=JSON.parse(fs.readFileSync(path.join(root,'catalog-data',category+'.json'),'utf8'));
  assert.ok(data.items.length>=4,'Each category must contain a useful reviewed selection');
  for(const item of data.items) assert.equal(item.category,category,'Record belongs to its source category: '+item.id);
  return data.items;
});
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
assert.equal(new Set(products.map(item=>item.id)).size,products.length,'Unique product IDs');
for(const product of products){
  assert.ok(product.specs.length>=8,'A complete technical selection table: '+product.id);
  assert.ok(product.source.url.startsWith('https://'),'Primary reference URL: '+product.id);
  assert.ok(product.source.model,'An explicit technical model: '+product.id);
  const prefix=product.category==='inverters'?'inverter':product.category;
  assert.ok(product.image.src.startsWith('assets/catalog-'+prefix+'-'),'Category-specific product photograph: '+product.id);
  assert.equal(new Set(product.specs.map(spec=>spec.label.toLowerCase().trim())).size,product.specs.length,'Unambiguous specification labels: '+product.id);
  const detail=fs.readFileSync(path.join(root,'products/details',product.id+'.html'),'utf8');
  const txt=fs.readFileSync(path.join(root,'resources/specifications',product.id+'.txt'),'utf8');
  assert.ok(detail.includes('data-current-photo-caption'),'Current image caption has its own selector');
  for(const spec of product.specs){
    assert.ok(spec.label&&spec.value,'Non-empty spec field: '+product.id);
    assert.ok(detail.includes(escape(spec.label))&&detail.includes(escape(spec.value)),'Static spec rendered: '+product.id);
    assert.ok(txt.includes(spec.label+': '+spec.value),'Download spec rendered: '+product.id);
  }
  const notes=Array.isArray(product.notes)?product.notes.join(' '):product.notes;
  if(notes) assert.ok(txt.includes(notes),'Download retains model-specific caveats: '+product.id);
  for(const image of [product.image,...(product.gallery||[])]){
    assert.ok(fs.existsSync(path.join(root,image.src)),'Image exists: '+image.src);
    if(image.caption) assert.ok(detail.includes(escape(image.caption)),'Image-family caption preserved: '+product.id);
  }
  const structured=[...detail.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(structured.length,1,'Product structured data');
  const data=JSON.parse(structured[0][1]);
  assert.equal(data['@type'],'Product');
  assert.equal(data.additionalProperty.length,product.specs.length);
  assert.ok(!data.offers,'No invented price or availability');
}
const homepage=fs.readFileSync(path.join(root,'index.html'),'utf8');
const companyProfile=homepage.match(/<section class="company section"[\s\S]*?<\/section>/)?.[0];
assert.ok(companyProfile,'Company profile stays in the requested homepage position');
for(const heading of ['Integrated Energy Solutions.','Global Project Experience.','Capabilities Across','Products and Projects','Experience Across Markets','An International Presence,','Closer to Our Customers','Our Commitment']) assert.ok(companyProfile.includes(heading),'Owner-supplied profile heading: '+heading);
assert.ok(companyProfile.includes('Founded in 2017')&&companyProfile.includes('more than 3,000 employees'),'Owner-provided founding year and employee scale');
assert.ok(companyProfile.includes('company-factory-entrance-r29.jpg')&&companyProfile.includes('brand visualization'),'Company entrance is a labelled branding visualization');
for(const market of ['China','Southeast Asia','Middle East','Central Asia','Africa']) assert.ok(companyProfile.includes(market),'Owner-provided market: '+market);
const identity=JSON.parse(fs.readFileSync(path.join(root,'catalog-data/categories.json'),'utf8'));
const pageFor={storage:'energy-storage',inverters:'inverters',solar:'solar-modules',wind:'wind-turbines'};
assert.equal(identity.length,4,'Four reviewed category identities');
for(const category of identity){
  const cover=products.find(item=>item.id===category.coverProduct);
  assert.equal(cover?.category,category.id,'Homepage cover is a product of its own category');
  const card=homepage.match(new RegExp('<a class="product-card[^>]+data-product-category="'+category.id+'"[\\s\\S]*?<\\/a>'))?.[0];
  assert.ok(card,'Homepage category card: '+category.id);
  assert.ok(card.includes('src="'+cover.image.src+'"'),'Homepage cover matches catalogue: '+category.id);
  assert.ok(card.includes('href="products/'+pageFor[category.id]+'.html"'),'Homepage category target: '+category.id);
  assert.ok(card.includes('data-cover-product="'+cover.id+'"'),'Homepage cover provenance: '+category.id);
}
assert.ok(!homepage.includes('src="assets/supplier-storage-cabinet.jpg"')&&!homepage.includes('src="assets/supplier-inverter-cabinet.jpg"'),'Ambiguous old category covers are no longer used');

function htmlFiles(directory){
 return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>entry.name==='.git'?[]:entry.isDirectory()?htmlFiles(path.join(directory,entry.name)):entry.name.endsWith('.html')?[path.join(directory,entry.name)]:[]);
}
const files=htmlFiles(root);
for(const file of files){
  const html=fs.readFileSync(file,'utf8');
  const header=html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
  if(header){
    assert.ok(!header.includes('<nav')&&!header.includes('nav-toggle'),'No masthead navigation buttons: '+file);
    assert.ok(header.includes('<p class="header-solution-line">One-stop Energy Solutions</p>'),'Non-linked one-stop energy positioning: '+file);
    assert.equal((header.match(/<a\b/g)||[]).length,2,'Only brand home link and project contact remain in masthead: '+file);
    assert.ok(header.includes('Start a project')&&header.includes('wa.me/8615224220207'),'Prominent project contact: '+file);
  }
  const ids=[...html.matchAll(/(?:^|\s)id="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(new Set(ids).size,ids.length,'Duplicate ID: '+file);
  for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
    const link=match[1].replaceAll('&amp;','&');
    if(/^(https?:|data:|mailto:|tel:)/.test(link)) continue;
    const [pathname,hash]=link.split('#');
    const destination=pathname.split('?')[0]?path.resolve(path.dirname(file),decodeURI(pathname.split('?')[0])):file;
    assert.ok(fs.existsSync(destination),'Broken local path: '+file+' → '+link);
    if(hash&&destination.endsWith('.html')){
      const destinationHtml=fs.readFileSync(destination,'utf8');
      assert.ok(destinationHtml.includes('id="'+hash+'"'),'Broken anchor: '+file+' → '+link);
    }
  }
}
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
for(const product of products) assert.ok(sitemap.includes('/products/details/'+product.id+'.html'),'Product URL in sitemap');
for(const category of ['energy-storage','battery-modules','containerized-storage','inverters','solar-modules','wind-turbines']){
 const html=fs.readFileSync(path.join(root,'products',category+'.html'),'utf8');
 assert.ok(html.includes('id="catalog-data"')&&html.includes('data-catalog-card'),'Static category directory');
}
const parseDirectory=file=>{
  const html=fs.readFileSync(path.join(root,'products',file+'.html'),'utf8');
  return JSON.parse(html.match(/<script type="application\/json" id="catalog-data">([\s\S]*?)<\/script>/)[1]);
};
const storage=products.filter(item=>item.category==='storage');
assert.ok(storage.every(item=>['battery-cabinet','battery-module','battery-container'].includes(item.equipmentType)),'Storage has explicit physical equipment types');
for(const [file,type] of [['energy-storage','battery-cabinet'],['battery-modules','battery-module'],['containerized-storage','battery-container']]){
  const directory=parseDirectory(file);
  assert.deepEqual(directory.items.map(item=>item.id),storage.filter(item=>item.equipmentType===type).map(item=>item.id),'Strict physical equipment membership: '+file);
  for(const item of directory.items){
    const detail=fs.readFileSync(path.join(root,'products/details',item.id+'.html'),'utf8');
    assert.ok(detail.includes('href="../../products/'+file+'.html#catalogue"'),'Correct equipment-type return link: '+item.id);
    for(const match of detail.matchAll(/data-product-id="([^"]+)"/g)) assert.equal(storage.find(candidate=>candidate.id===match[1])?.equipmentType,type,'No cross-type storage recommendations: '+item.id);
  }
}
const retired=JSON.parse(fs.readFileSync(path.join(root,'catalog-data/retired-products.json'),'utf8'));
const complete=parseDirectory('index');
assert.equal(complete.filterBy,'directory','Hub filters use exact equipment directories');
for(const item of retired){
  assert.ok(!products.some(active=>active.id===item.id),'Withdrawn inverter-plus-battery units are not active');
  const html=fs.readFileSync(path.join(root,'products/details',item.id+'.html'),'utf8');
  assert.ok(html.includes('http-equiv="refresh"')&&!html.includes('application/ld+json'),'Retired model URL is no longer a product page');
  assert.ok(!sitemap.includes('/details/'+item.id+'.html'),'Retired model is not indexed in sitemap');
}
const oldWind=fs.readFileSync(path.join(root,'products/small-wind.html'),'utf8');
assert.ok(oldWind.includes('http-equiv="refresh"')&&oldWind.includes('wind-turbines.html'),'Old wind URL forwards to the precise category name');
const windHome=homepage.match(/data-product-category="wind"[\s\S]*?<\/a>/)[0];
assert.ok(windHome.includes('Wind<br>Turbines')&&!windHome.includes('catalog-wind-3kw-family'),'Wind homepage uses complete equipment imagery and exact wording');
assert.ok(windHome.includes('catalog-wind-500w-alt.webp'),'Wind category uses the reviewed white-background complete turbine');
for(const group of ['quality','dispatch']){
  const figures=[...homepage.matchAll(new RegExp('<figure[^>]+data-photo-group="'+group+'"[\\s\\S]*?<\\/figure>','g'))].map(match=>match[0]);
  assert.equal(figures.length,3,'Three-photo evidence collection: '+group);
  const images=figures.map(figure=>figure.match(/<img[^>]+src="([^"]+)"/)[1]);
  assert.equal(new Set(images).size,3,'Distinct photographs in '+group+' collection');
  assert.ok(figures.every(figure=>figure.includes('<figcaption>')&&figure.includes('loading="lazy"')),'Captioned lazy-loaded evidence photographs');
}
console.log(JSON.stringify({passed:true,categories:categories.length,products:products.length,htmlPages:files.length,specificationDownloads:products.length}));
