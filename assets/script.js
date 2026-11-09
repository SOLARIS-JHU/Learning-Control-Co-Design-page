'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 if(window.renderMathInElement) renderMathInElement(document.body,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,strict:'warn'});
 const button=document.getElementById('copy-bibtex'), status=document.getElementById('copy-status');
 button?.addEventListener('click',async()=>{const text=document.getElementById('bibtex').textContent;try{await navigator.clipboard.writeText(text);status.textContent='BibTeX copied.';button.textContent='Copied';setTimeout(()=>button.textContent='Copy BibTeX',2000);}catch{const range=document.createRange();range.selectNodeContents(document.getElementById('bibtex'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='Citation selected. Press Ctrl+C (or Command+C) to copy.';}});
});
