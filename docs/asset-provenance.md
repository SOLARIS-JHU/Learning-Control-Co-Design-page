# Asset provenance

Prepared 2026-11-09. Figures are included for this author-requested research website. Retain source attribution and original authors' rights; the website does not relicense third-party scientific assets or institutional trademarks.

| Asset | Source | Treatment |
| --- | --- | --- |
| TQPNet visual foundation / stylesheet | https://solaris-jhu.github.io/TQPNet/ and corresponding SOLARIS-JHU/TQPNet source | Adapted typography, palette, layout, headings, resource buttons and responsive behavior. Retain upstream license/attribution. |
| `assets/figures/QP_curves_2.svg` | https://arxiv.org/html/2507.09050v2/QP_curves_2.svg | Original paper Figure 2 SVG, unaltered experimental data. |
| `assets/figures/tt_curves.svg` | https://arxiv.org/html/2507.09050v2/tt_curves.svg | Original two-tank panel of paper Figure 3. |
| `assets/figures/HVAC_curves.svg` | https://arxiv.org/html/2507.09050v2/HVAC_curves.svg | Original HVAC panel of paper Figure 3. |
| Figure display variants | Original SVGs above, prepared by `scripts/prepare-figures.mjs` | White background and 16pt viewBox padding only; curves, axes, labels and uncertainty retained. |
| SOLARIS and JHU Whiting logos | TQPNet's local author/institution assets | Affiliation/branding identification, not endorsement of unrelated claims. |
| `assets/pnnl.svg` | https://www.pnnl.gov/themes/gesso/images/pnnl-logo.svg | Official PNNL logo URL referenced by official site CSS. |
| `assets/uva.png` | https://www.virginia.edu/assets/images/logo-primary-blue.png | Official University of Virginia logo. |
| Inter and Fraunces fonts | Google Fonts CSS endpoint `https://fonts.googleapis.com/css2?family=Fraunces:wght@600&family=Inter:wght@400;500;600;700&display=swap` | Locally hosted font files; accompanying OFL licenses retained. |
| KaTeX 0.16.22 | Official KaTeX distribution | Local JS/CSS/fonts; MIT license retained with package. |
| Method / social-preview graphics | Newly authored explanatory SVG/PNG and generation scripts in this repository | Explain the manuscript architecture; not measured trajectories or benchmark evidence. |

No figures, videos, pretrained weights or experiment logs were available in the inspected research-code tree. Do not advertise such resources. The research code has no repository-level LICENSE in the audited snapshot; its source is linked, not copied into the website.

## Template and diagram lineage

TQPNet source commit: `ddda5a6437a970a488b3b1701b08dd4b9c27858a`. The root LICENSE preserves its Apache2.0 license; CSS has a co-design adaptation marker. The other reference projects informed presentation only; their scientific claims and code were not copied.

The method diagram refines the existing SOLARIS co-design graphical abstract from `SOLARIS-JHU/solaris-website` commit `39ab44d3dbe9a4a28e66313ce19b2142fe5dfe2e`, path `static/images/papers/v13/arxiv-2507.09050.svg`, viewed at https://solaris-jhu.github.io/solaris-website/images/papers/v13/arxiv-2507.09050.svg. Reuse was expressly requested by the project owner. The redraw retains the palette, network and projection motifs while making the Algorithm1 correction loop, final lower solve and offline feedback explicit. The original synthetic objective motion was not carried into the research page. New geometry is schematic; the finite-state highlight sequence is explanatory, not a new experiment. `scripts/generate-method.mjs` reproduces the exact SVG.

The complete asset audit and reference-source/license review are in `design-audit.md`. The original paper figures retain their source legends, including the Figure3 label “Alg.2”; the public captions explain its relation to Algorithm1 in v2.
