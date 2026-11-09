# SOLARIS design-reference audit

Inspected 2026-11-09. Sources are design references only, not evidence for the new paper.

## Selected foundation: TQPNet
Repository: https://github.com/SOLARIS-JHU/TQPNet
Commit: ddda5a6437a970a488b3b1701b08dd4b9c27858a
Sources: website/index.html, website/style.css, website/main.js.
The live page was inaccessible through the web extraction service; raw source was successfully inspected. Browser rendering is pending with the parent agent.

Reuse its lightweight buildless static structure, serif heading hierarchy, restrained JHU-blue palette, pill resource links, wide science figures, and accessible focus styles.
- Inter body, 1.125rem, line-height 1.6; 1rem below 560px.
- Fraunces headings, weight 600, line-height 1.15, letter spacing -0.01em.
- Hero title clamp(1.9rem,3.7vw,2.7rem); h2 clamp(1.6rem,2.8vw,2.2rem); h3 1.25rem.
- Light: bg #fbfbfd, fg #1a1f2b, muted #5b6470, accent #002d72, card #fff, border #dfe3ea.
- Dark: bg #0d1628, fg #e8ecf3, muted #a7b1c2, accent #68ace5, card #15223d, border #2a3a5c.
- 14px radius, 1100px wrap width (100%-2.5rem), 68ch prose maximum.
- Section spacing clamp(2.5rem,5vw,4rem).
- Resource buttons .6rem 1.15rem padding, radius999px, 1px border; primary uses heritage blue/white.
- Grid collapses at900px, mobile typography at560px; horizontally scrolling equation and table wrappers.
- 3px visible focus; skip-to-content; reduced-motion disables smooth scroll.
TQPNet repository LICENSE is Apache-2.0 (saved as TQPNet-LICENSE). The website footer has no third-party template attribution. Preserve Apache license and identify borrowed source in provenance if reusing CSS.

## Other references
| Repository | Commit | Source/presentation observations |
| --- | --- | --- |
| SOLARIS-JHU/MI-DPC-UPHES | 24f98439537015661731dc8f4fb0b28a051d012e | website/index.html and style.css; same exact foundation as TQPNet. Clear numbered ingredients, equation explanations, result tables, supplementary-figure disclosure. MIT repository license, no template footer. |
| SOLARIS-JHU/SD-DPC-website | 19d59483571e79ea8220103bf89ef23b06999160 | index.html and static/css/sd-dpc.css; Inter17px/1.72, 880px column, blue/teal palette, framed figures, lightbox. Credits Academic Project Page Template and CC BY-SA4.0. |
| xboldocky/midpc-web | 87175b4d75e4294f8564c3627b16f004a91a9ae6 | index.html + static/css/index.css; classic Nerfies/Bulma, Google Sans headings, Noto Sans body, large equation-centric narrative. CC BY-SA4.0 footer. |
| centrum-intelliphysics/PDEControl_DPC_website | b4ba65bf5a5c0225bf669a6f7aba8c8ec92f32c4 | index.html + static/css/index.css/custom.css; Academic Project Page Template, Inter, blue/cyan/gradient accents, large experiment media, data links. CC BY-SA4.0 template credit; research code/models MIT. |
| SOLARIS-JHU/CINOC-website | 724968ff0cb23e1b4a4faa1d01924b0616da3f24 | index.html + static/css/index.css; same modernized academic/Bulma base as PDE page; very prominent figure/policy explanation. CC BY-SA4.0 and Academic Project Page Template credit. |
| SOLARIS-JHU/score-website | e4d32e3d8aa7e065ee22110a865ce3f16c0fd355 | index.html + static/css/index.css; Inter, purple/blue accent, framed figure, tutorials, copyable citation, prominent scope explanation. Academic Project Page Template credit. |
| xboldocky/chiller-plant-MIDPC | ce1e95ffeae9f4cefd261e9d1d172db3eaa8881b | index.html + static/css/index.css; classic Nerfies/Bulma. Useful large physical system schematic, equations with interpretation, original figures. CC BY-SA4.0/Nerfies footer. |
| drgona/NeuralDAEs | 2a1a933d332cfbc0e5bfd51e56ea89acf5a5875c | index.html + static/css/index.css; classic Nerfies/Bulma, Google Sans/Noto Sans. Physical schematic and full-width result figures. CC BY-SA4.0/Nerfies footer. |

The page should not import the decorative CSS of these secondary references. Borrow their narrative patterns only.

## Existing co-design graphical abstract
- Live SVG: https://solaris-jhu.github.io/solaris-website/images/papers/v13/arxiv-2507.09050.svg
- Source: https://github.com/SOLARIS-JHU/solaris-website/blob/39ab44d3dbe9a4a28e66313ce19b2142fe5dfe2e/static/images/papers/v13/arxiv-2507.09050.svg
- Blob SHA: 2ce81ea5e6bb41677f747064d34ef5e27480f008
- Saved: original-codesign.svg (165843 bytes).
- Rendering is self-contained SVG glyph geometry, viewBox0 0 760 392; no embedded animation.
- Animation is the v9-bilevel updater in static/js/paper-abstracts-v13.js (blob ad22efa8b90b6bd40580744a7e9c1626ce8f447a). Saved full script and isolated bilevel-updater.js.
- Panels: Predict design, Project design, Inner control, Upper objective. Formula labels: yhat=Ntheta(p), Pi_Cp, z*=O_p(y), F_p(y,z*), [U_p(y,z*)]+; lower feedback labels projected coupling correction and offline objective+coupling penalty.
- Colors: #173B65 navy, #286F9C blue, #148F87 teal, #BF8736 amber; pale gradients.
- Motion: hand-specified 21-point inner optimization trajectory, animated projected candidate on a pentagon, and damped illustrative curve/constraint-violation fill. These are explanatory synthetic geometry, not experimental evidence. The existing curve should be explicitly labelled illustrative or replaced when expanded into full method.
- Original updater uses 9-second cycle. It computes Euclidean projection of candidate onto the polygon; other motion uses manually specified samples, not code benchmark data.
- Main-site graphical abstracts have separate pause/restart controls and matchMedia reduced motion handling in papers.js.
- No repo-wide LICENSE located for SOLARIS main site. User explicitly authorized reuse of their existing SVG; preserve attribution/provenance rather than assert a new blanket license for this asset.

## Reusable brand assets
Downloaded:
- jhu-whiting.svg from TQPNet website/static/logos/jhu-whiting.svg (blob b02d08417d5e3983cfdb7fa0ffedbc04394344d1).
- solaris.png from TQPNet website/static/logos/solaris.png (blob c217b3fae21f8b381842c5f289484f79a3acf4ee,21832 bytes).

Logos should remain identified as institutional/lab marks, with no implication that the page's code license grants trademark rights.

