# Validation record

Checked 2026-11-09 against arXiv v2 and research-code commit a6743e1a3477427bde2500b12249691275289d4c.

- Independent full-paper scientific audit: author order, affiliations, official publication/citation, displayed equations, numerical Tables1/2, uncertainty, experimental settings and limitations checked. See scientific-audit.md and code-audit.md. Results were not independently reproduced.
- All nine requested reference pages inspected as rendered pages; HTML/CSS/assets inspected in design-audit.md. TQPNet is the single visual foundation.
- Static validation and build passed; local links, anchors, fonts/CSS assets, metadata, citation, image alt text and placeholder scan checked. Ten SVG assets parsed successfully with an XML parser; method JavaScript syntax checked.
- Chrome desktop (1707px viewport) and same-origin iframe viewports of390px and320px inspected. No document-level horizontal overflow after fixes. Wide equations, plots, tables and method diagram scroll within their own containers.
- Nineteen KaTeX expressions rendered with zero KaTeX errors. Original paper SVGs retain axes, legends and uncertainty; display margins add no experimental data.
- Keyboard operation tested for diagram Step, Play/Pause and BibTeX copying. Clipboard content matched the official displayed citation. Native links, buttons, disclosures and scroll regions are keyboard accessible; a skip link is provided. The revised animation plays only while visible, pauses on page hiding or a changed reduced-motion preference, and has Play/Pause, Step and Restart. Reduced-motion preference suppresses autoplay and smooth motion. CSS disables motion under reduced-motion preference.
- No application JavaScript errors observed. The browser extension emitted asynchronous-message channel warnings, unrelated to website source.
- External resource link checks are recorded in link-checks.json; some official JHU pages reject automated fetches with403. Their official URLs were verified independently.

## Deployment and live verification

GitHub Actions run42687357645 completed successfully: https://github.com/SOLARIS-JHU/Learning-Control-Co-Design-page/actions/runs/42687357645. The actual published page opened successfully at https://solaris-jhu.github.io/Learning-Control-Co-Design-page/. All90 public files returned HTTP200 and matched the committed source byte-for-byte; see live-asset-checks.json. Live Chrome verified all eight image elements loaded,19 equations rendered without KaTeX errors, and diagram Step/Play/Pause operation. Screenshot: qa/live-site.jpg.

Final refinement makes section navigation immediate rather than smoothly scrolling through the long page. A local favicon is provided. Deployment workflows validate every subsequent source change.

## Requested animation refinement

Added a moving inner-QP iterate on a quadratic surface, a negative-gradient field with a moving design correction, and a separate animated projection. All insets share a consistent dimensionless toy; see illustrative-animation.md. The resource button now reads “arXiv”; its version-pinned target remains the primary scientific source.
