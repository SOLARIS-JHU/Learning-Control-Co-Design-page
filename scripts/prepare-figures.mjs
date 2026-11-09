import {readFile,writeFile} from 'node:fs/promises';
for (const name of ['QP_curves_2','tt_curves','HVAC_curves']) {
 const path = new URL('../assets/figures/'+name+'.svg',import.meta.url);
 let svg=await readFile(path,'utf8');
 const match=svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
 if(!match)throw new Error('Unexpected original SVG viewport: '+name);
 const width=Number(match[1])+32,height=Number(match[2])+32;
 svg=svg.replace(/width="[^"]+" height="[^"]+" viewBox="[^"]+"/,'width="'+width+'pt" height="'+height+'pt" viewBox="-16 -16 '+width+' '+height+'"');
 svg=svg.replace(/(<svg[^>]+>)/,'$1<rect x="-16" y="-16" width="'+width+'" height="'+height+'" fill="white"/>');
 await writeFile(new URL('../assets/figures/'+name+'-display.svg',import.meta.url),svg);
}
console.log('Added whitespace around original vector figures; source plots unchanged.');
