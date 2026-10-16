import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
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
const integratedSlide=homepage.match(/<article class="hero__slide hero__slide--integrated[\s\S]*?<\/article>/)?.[0];
assert.ok(integratedSlide,'Primary homepage slide retained');
assert.ok(integratedSlide.includes('One-stop power')&&integratedSlide.includes('solutions.'),'White solution headline retained');
assert.ok(integratedSlide.includes('Let our long-term partnership</span> <span>begin with getting to know each other.'),'Partnership closing text moved into the first slide');
assert.ok(!/For Africa|Power everywhere|hero__actions|Discuss your project|Explore the portfolio/.test(integratedSlide),'Marked primary-slide eyebrow, old tagline and calls to action removed');
assert.equal((homepage.match(/data-hero-slide\s/g)||[]).length,4,'Four original carousel slides remain');
const homeSection=id=>homepage.match(new RegExp('<section[^>]+id="'+id+'"[\\s\\S]*?<\\/section>'))?.[0]||'';
assert.ok(!homepage.includes('hero__actions')&&!homepage.includes('hero__scroll'),'All marked carousel actions and scroll prompt removed');
assert.ok(!homeSection('company').includes('Discover our capabilities')&&!homeSection('company').includes('<figcaption>')&&!homeSection('company').includes('company__image-note'),'Marked company actions and image overlays removed');
for(const label of ['ABOUT US','REGIONAL EXPERIENCE','INTERNATIONAL OPERATIONS','LONG-TERM VALUE','Discuss your energy solution']) assert.ok(!homeSection('company').includes(label),'Marked company label removed: '+label);
assert.ok(!homeSection('use-cases').includes('challenge-card__link'),'Application discussion links removed');
assert.ok(!homeSection('applications').includes('application-link'),'Field application actions removed');
for(const id of ['industry-connections','project-execution','document-library']){
  const section=homeSection(id);
  assert.ok(!section.includes('reference-disclosure')&&!section.includes('reference-source'),'Marked reference caption extras removed: '+id);
  for(const caption of section.matchAll(/<figcaption>([\s\S]*?)<\/figcaption>/g)) assert.ok(!/<small|<a\b/.test(caption[1]),'Only unmarked caption label and heading remain: '+id);
}
assert.ok(!homeSection('document-library').includes('document-review-points'),'Marked document review strip removed');
assert.ok(!homeSection('dispatch').includes('document-ribbon')&&!homeSection('dispatch').includes('evidence-note'),'Marked dispatch note and ribbon removed');
assert.ok(!homeSection('resources').includes('brief-download')&&!homeSection('resources').includes('<a '),'Removed resource action rows leave no invisible card links');
const companyProfile=homepage.match(/<section class="company section"[\s\S]*?<\/section>/)?.[0];
assert.ok(companyProfile,'Company profile stays in the requested homepage position');
for(const heading of ['Integrated Energy Solutions.','Global Project Experience.','Capabilities Across','Products and Projects','Experience Across Markets','An International Presence,','Closer to Our Customers','Our Commitment']) assert.ok(companyProfile.includes(heading),'Owner-supplied profile heading: '+heading);
assert.ok(companyProfile.includes('Founded in 2017')&&companyProfile.includes('more than 3,000 employees'),'Owner-provided founding year and employee scale');
assert.ok(companyProfile.includes('company-factory-entrance-r29.jpg')&&companyProfile.includes('branding visualization'),'Company entrance provenance remains in the image alt text');
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
  const footer=html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
  if(footer){
    assert.ok(footer.includes('footer--minimal')&&footer.includes('id="footer"'),'Minimal anchored footer: '+file);
    if(file===path.join(root,'index.html')) {
      assert.ok(!footer.includes('Let our long-term partnership')&&!footer.includes('<h2>')&&!footer.includes('Integrated clean energy'),'Removed homepage closing and small label stay absent');
      assert.ok(footer.includes('<p class="footer__company-name">Shandong Lantian Energy Technology Co., Ltd.</p>')&&!footer.includes('<small>'),'Homepage company identity is one continuous horizontal line');
    }
    else assert.ok(footer.includes('Let our long-term partnership<br>begin with getting to know each other.'),'Unchanged inner-page partnership closing line: '+file);
    assert.ok(!/<a\b|<nav\b|footer__links|footer__media-note/.test(footer),'Removed footer calls to action, navigation and notes: '+file);
    assert.ok(footer.includes('Shandong Lantian')&&!footer.includes('Specifications confirmed'),'Company identity retained without deleted small print: '+file);
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
for(const group of ['engagements','construction','documents']){
  const figures=[...homepage.matchAll(new RegExp('<figure[^>]+data-photo-group="'+group+'"[\\s\\S]*?<\\/figure>','g'))].map(match=>match[0]);
  assert.equal(figures.length,3,'Three distinct new reference items: '+group);
  assert.equal(new Set(figures.map(figure=>figure.match(/<img[^>]+src="([^"]+)"/)[1])).size,3,'No duplicated reference image: '+group);
  for(const figure of figures){
    assert.ok(figure.includes('data-photo-note=')&&figure.includes('loading="lazy"'),'Carry-through provenance note and lazy image: '+group);
  }
}
assert.ok(homepage.includes('data-photo-note-output'),'Image viewer retains reference attribution');
const documentHashes={solar:'b3f801c1ffb5071d8cca98d91ef365126f7f6148ada0aeb158c82acd62a6f033',storage:'bff840c05e94c283191e9d01d181aab64be8b30b9e98b7116534689f5df6818b',inverter:'0c130799a6e1bc947aca658607df130f710aacee36992a2638507aa7767e5a1c'};
for(const [type,expected] of Object.entries(documentHashes)){
  const pdf=fs.readFileSync(path.join(root,'assets/r31-document-'+type+'.pdf'));
  assert.equal(createHash('sha256').update(pdf).digest('hex'),expected,'Original supplier PDF remains byte-identical: '+type);
  assert.ok(fs.existsSync(path.join(root,'assets/r31-document-'+type+'.png')),'Whole-page document preview: '+type);
}
console.log(JSON.stringify({passed:true,categories:categories.length,products:products.length,htmlPages:files.length,specificationDownloads:products.length}));
