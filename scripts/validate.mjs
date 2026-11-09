import {readFile, access, readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const failures = [];
const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]);
if (new Set(ids).size !== ids.length) failures.push('Duplicate HTML ids');
for (const [, ref] of html.matchAll(/\b(?:src|href|poster)=["']([^"']+)["']/g)) {
  if (/^(https?:|mailto:|tel:|data:)/i.test(ref)) continue;
  if (ref.startsWith('#')) {
    if (ref.length > 1 && !ids.includes(ref.slice(1))) failures.push(`Broken section anchor: ${ref}`);
    continue;
  }
  if (ref.startsWith('/')) { failures.push(`Root-relative path breaks repository hosting: ${ref}`); continue; }
  const local = decodeURIComponent(ref.split(/[?#]/)[0]);
  if (!local) continue;
  const target = path.resolve(root, local);
  if (target !== root && !target.startsWith(root + path.sep)) { failures.push(`Path escapes website: ${ref}`); continue; }
  try { await access(target); } catch { failures.push(`Missing local resource: ${ref}`); }
}
for (const tag of html.matchAll(/<img\b[^>]*>/g)) {
  if (!/\balt=["'][^"']*["']/.test(tag[0])) failures.push(`Image missing alt: ${tag[0].slice(0,100)}`);
}
for (const [label, expression] of [
  ['document language', /<html[^>]+lang=["']en["']/],
  ['viewport', /name=["']viewport["']/],
  ['page title', /<title>[^<]+<\/title>/],
  ['description', /name=["']description["']/],
  ['canonical URL', /rel=["']canonical["']/],
  ['social preview image', /property=["']og:image["']/],
  ['scholarly citation title', /name=["']citation_title["']/],
  ['main landmark', /<main\b/],
  ['primary heading', /<h1\b/]
]) if (!expression.test(html)) failures.push(`Missing ${label}`);
if ((html.match(/<h1\b/g)||[]).length !== 1) failures.push('Expected exactly one h1');
if (/\b(?:Lorem ipsum|TODO|PLACEHOLDER|YOUR[_ ](?:NAME|URL)|example\.com)\b/i.test(html)) failures.push('Placeholder content found');
async function checkCss(dir) {
  for (const entry of await readdir(dir, {withFileTypes:true})) {
    const file = path.join(dir,entry.name);
    if (entry.isDirectory()) await checkCss(file);
    else if (entry.name.endsWith('.css')) {
      const css=await readFile(file,'utf8');
      for(const [,raw] of css.matchAll(/url\(\s*["']?([^\s)'"\r\n]+)["']?\s*\)/g)) {
        if (/^(?:https?:|data:|#)/i.test(raw)) continue;
        try { await access(path.resolve(dir,raw.split(/[?#]/)[0])); }
        catch { failures.push(`Missing CSS resource ${raw} in ${path.relative(root,file)}`); }
      }
    }
  }
}
await checkCss(path.join(root,'assets'));
try { const bib=await readFile(path.join(root,'citation.bib'),'utf8'); if(!/@\w+\s*\{/.test(bib)) failures.push('Invalid citation.bib'); }
catch { failures.push('Missing citation.bib'); }
if(failures.length) { console.error(failures.join('\n')); process.exitCode=1; }
else console.log('Validated local resources, section anchors, CSS assets, accessible image labels, metadata and citation.');
