import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const categories=['storage','inverters','solar','wind'];
const products=categories.flatMap(category=>{
  const data=JSON.parse(fs.readFileSync(path.join(root,'catalog-data',category+'.json'),'utf8'));
  assert.ok(data.items.length>=4,'Each category must contain a useful reviewed selection');
  return data.items;
});
const escape=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
assert.equal(new Set(products.map(item=>item.id)).size,products.length,'Unique product IDs');
for(const product of products){
  assert.ok(product.specs.length>=8,'A complete technical selection table: '+product.id);
  assert.ok(product.source.url.startsWith('https://'),'Primary reference URL: '+product.id);
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

function htmlFiles(directory){
 return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>entry.name==='.git'?[]:entry.isDirectory()?htmlFiles(path.join(directory,entry.name)):entry.name.endsWith('.html')?[path.join(directory,entry.name)]:[]);
}
const files=htmlFiles(root);
for(const file of files){
  const html=fs.readFileSync(file,'utf8');
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
for(const category of ['energy-storage','inverters','solar-modules','small-wind']){
 const html=fs.readFileSync(path.join(root,'products',category+'.html'),'utf8');
 assert.ok(html.includes('id="catalog-data"')&&html.includes('data-catalog-card'),'Static category directory');
}
console.log(JSON.stringify({passed:true,categories:categories.length,products:products.length,htmlPages:files.length,specificationDownloads:products.length}));
