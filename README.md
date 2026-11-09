# Learning Control Co-Design

SOLARIS project website for **Learning to Solve Constrained Bilevel Control Co-Design Problems**.

- Website: https://solaris-jhu.github.io/Learning-Control-Co-Design-page/
- Paper: https://arxiv.org/abs/2507.09050v2
- Research code: https://github.com/anon-research-coding/Control-Design-Learning

This repository contains the research communication website. The research implementation remains in the separate linked repository.

## Local preview and checks

Node.js 22 or later is sufficient. No package installation or framework build is required.

```sh
npm run check
npm run preview
```

Open http://127.0.0.1:4173/Learning-Control-Co-Design-page/. Set `PORT` to use a different port. `npm run build` creates `dist/` with only the public website and assets.

## Deployment

GitHub Pages uses GitHub Actions. `.github/workflows/pages.yml` validates the page and local assets, packages the static files, and deploys `main`. Pull requests run validation and build without publishing. A successful source commit is not evidence of a successful deployment: check the workflow and open the published URL after changes.

## Maintenance

- `index.html`: scientific prose, equations, citations, metadata, and page structure.
- `assets/`: local styles, scripts, fonts, logos, original paper figures and generated explanatory graphics.
- `citation.bib`: downloadable citation; keep synchronized with the displayed BibTeX and citation metadata.
- `docs/source-map.md`: scientific claim/source relationships and version policy.
- `docs/asset-provenance.md`: asset sources and reuse/attribution notes.
- `scripts/`: static validation, build, preview, and reproducible graphic preparation.

Use versioned paper URLs and pinned code commits when updating scientific claims. Do not merge manuscript results with different implementation defaults. Preserve metric definitions, uncertainty, and experiment context. A code snapshot is not an independent reproduction of the paper's results.

The visual foundation is the SOLARIS TQPNet project page. Retain attribution and upstream licenses with reused assets. Institutional logos retain their owners' rights and identify author affiliations; they do not license the research code.

## Figure generation

`node scripts/generate-method.mjs` recreates the method SVG. `node scripts/prepare-figures.mjs` adds presentation margins to the original paper figures without changing their data. `node scripts/generate-social.mjs` creates the social SVG; PNG regeneration additionally uses the optional `sharp` package. Generated assets are committed, so deployment needs no image-processing dependency.

The complete source mapping is in `docs/scientific-audit.md`, with a concise entry point in `docs/source-map.md`. Numerical results are transcribed from arXiv v2; they were not independently rerun. Official publication details and the citation follow PMLR331 (2026).
