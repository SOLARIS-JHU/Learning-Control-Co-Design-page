# Validation record

Checked 2026-11-09 against arXiv v2 and research-code commit a6743e1a3477427bde2500b12249691275289d4c.

- Independent full-paper scientific audit: author order, affiliations, official publication/citation, displayed equations, numerical Tables1/2, uncertainty, experimental settings and limitations checked. See scientific-audit.md and code-audit.md. Results were not independently reproduced.
- All nine requested reference pages inspected as rendered pages; HTML/CSS/assets inspected in design-audit.md. TQPNet is the single visual foundation.
- Static validation and build passed; local links, anchors, fonts/CSS assets, metadata, citation, image alt text and placeholder scan checked. Ten SVG assets parsed successfully with an XML parser; method JavaScript syntax checked.
- Chrome desktop (1707px viewport) and same-origin iframe viewports of390px and320px inspected. No document-level horizontal overflow after fixes. Wide equations, plots, tables and method diagram scroll within their own containers.
- Nineteen KaTeX expressions rendered with zero KaTeX errors. Original paper SVGs retain axes, legends and uncertainty; display margins add no experimental data.
- Keyboard operation tested for diagram Step, Play/Pause and BibTeX copying. Clipboard content matched the official displayed citation. Native links, buttons, disclosures and scroll regions are keyboard accessible; a skip link is provided. Animation begins paused, stops on page hiding or a changed reduced-motion preference, and uses discrete highlights. CSS disables motion under reduced-motion preference.
- No application JavaScript errors observed. The browser extension emitted asynchronous-message channel warnings, unrelated to website source.
- External resource link checks are recorded in link-checks.json; some official JHU pages reject automated fetches with403. Their official URLs were verified independently.

Deployment and live-site verification are recorded after publication.
