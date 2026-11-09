import {cp, mkdir, readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
await mkdir(dist, {recursive: true});
await cp(path.join(root, 'index.html'), path.join(dist, 'index.html'));
await cp(path.join(root, 'assets'), path.join(dist, 'assets'), {recursive: true});
await cp(path.join(root, 'citation.bib'), path.join(dist, 'citation.bib'));
await writeFile(path.join(dist, '.nojekyll'), '');
console.log('Built static GitHub Pages artifact in dist/');
