# Scientific source map

Maintained 2026-11-09. Primary scientific source: the arXiv manuscript at https://arxiv.org/abs/2507.09050v2 (3 December 2025). The page uses the version-pinned source documented in its text and figure provenance. The research-code snapshot is pinned to **a6743e1a3477427bde2500b12249691275289d4c**, dated 2025-11-25, at https://github.com/anon-research-coding/Control-Design-Learning. It is a related implementation, not a verified exact reproduction of manuscript experiments.

| Page content | Primary manuscript support | Implementation support / qualification |
| --- | --- | --- |
| Title, author order, affiliations | Manuscript title block; arXiv bibliographic record | Verified against https://proceedings.mlr.press/v331/kotary26a.html (PMLR331:222–241,2026) and the official L4DC2026 program. Full byline/affiliation and name-variant records are in scientific-audit.md. |
| Motivation: repeated bilevel design with coupling constraints | Introduction; problem setting | Upper decisions alter the feasible/optimal lower control response. |
| Bilevel formulation and notation | Problem setting, Eqs. (1)-(2) | Code BQP uses x for the manuscript upper variable y. |
| Neural prediction, projection, lower solver | Method sections on differentiable optimization and upper projection | BQP/QP_layer.py; HVAC/building_MPC_layer.py; TT/twotank_diffmpc.py. |
| Coupling violation and projected correction | Method's coupling residual and correction equations | BQP/QP_correction.py:x_correction; HVAC/building_correction.py:B_correction; TT/twotank_codesign_mpc.py:c_correction. |
| Training loss and inference distinction | Soft penalty loss and training algorithm | Offline weights updated; inference still uses lower solves/correction. Finite correction is not exact feasibility. |
| Softening potentially infeasible lower constraints | Lower-level constraints section; two-tank/HVAC appendices | Two-tank terminal residual and HVAC nonnegative comfort slacks are corrected at upper level. |
| BQP experiments | BQP experiment section, results table and original figure | Three problem sizes; reported mean and standard deviation. Research script defaults differ. |
| Two-tank and HVAC co-design | Co-design experiment sections, results table and original figures | Simulation benchmarks; PSO is heuristic and its objective is not a certified global optimum. |
| Scope and assumptions | Lower-level uniqueness/differentiability discussion; limitations | Nonconvex lower solves do not certify global optimality; soft penalties do not guarantee zero residual. |

## Version and discrepancy policy

Reported numerical results are transcribed from the chosen manuscript, not recomputed from code. Preserve manuscript metric definitions and uncertainty. Original released figures retain all axes, curves and legends. An explanatory architecture graphic is not experimental evidence.

The linked implementation differs from manuscript descriptions in sampling distributions, design bounds, model/training defaults, correction counts and some objective definitions. BQP computes a signed relative gap whereas the manuscript defines an absolute gap. Two-tank code applies stage tracking rather than the manuscript's stated terminal penalty. All correction routines omit `create_graph=True`; therefore exact higher-order differentiation through correction gradients is not established by this snapshot. Timing scopes and batch sizes also differ across scripts, and no inspected source specifies the benchmark hardware. Do not interpret the paper's reported timing as independently verified single-request latency.

See `code-audit.md` for the detailed pinned-code inspection when present. Manuscript-version differences take precedence over older audit notes; always reconcile against the page's explicitly selected version before modifying public copy.

## Exact claim, equation, and number mapping

`scientific-audit.md` is an integral part of this source map: it records every public equation by manuscript equation/algorithm line, each Table1/2 numerical value, Figure2/3 context, every displayed training and baseline setting, author links, limitations and discrepancies. The public content uses Sections1–6 and AppendicesA–E of v2. `code-audit.md` maps implementation details to pinned files and lines.

| Public item | Exact source |
| --- | --- |
| Problem equation | §3, Eqs.(1)–(2) |
| Residual and projected gradient update | Eq.(5), Eqs.(7)–(9), Algorithm1 lines4–8 |
| Training loss | Eq.(10), Algorithm1 lines10–11 |
| Diagram and playback order | Algorithm1 lines3–11; §4.2. Literal unprojected initial y0, projection after each correction; final lower solve retained. |
| BQP numbers and uncertainty | Table1, PDFpage6; §5.1; Figure2; AppendixC.1 |
| Co-design numbers and uncertainty | Table2, PDFpage6; §5.2; Figure3; AppendicesD–E |
| PSO settings | AppendixA;128particles,200iterations,coefficients0.5/0.5,inertia0.9 |
| Two-tank settings and relaxation | Eqs.(13)–(16), AppendixD.1–D.2 |
| HVAC settings and slack relaxation | Eqs.(17)–(18), AppendixE.1–E.2 |
| Timing limitations | §5 tables omit benchmark hardware and timing batch size; code-audit.md records incompatible timing scopes. |

All timings are seconds. Table spreads are across test instances, not training seeds or confidence intervals. Figure2 uses logarithmic vertical axes; nonpositive portions of mean±SD bands are not displayed.

The animated QP surface, gradient field, candidate trajectory and projection are explicitly generated explanatory geometry. They share the dimensionless toy defined in illustrative-animation.md; they are not manuscript results or authors’ solver traces. Their computational order follows Algorithm1.
