# Scientific audit — control co-design website

Verified 2026-11-09. Primary scientific version: **arXiv:2507.09050v2**, dated 3 December 2025, 16 pages. The supplied unversioned URL resolves to v2. Full text, references, and Appendices A–E were read through arXiv HTML; PDF text and figure locations were checked independently.

## Authoritative sources

- Primary PDF: https://arxiv.org/pdf/2507.09050v2
- Primary HTML: https://arxiv.org/html/2507.09050v2
- Version history: https://arxiv.org/abs/2507.09050
- Official publication: https://proceedings.mlr.press/v331/kotary26a.html
- Official proceedings: https://proceedings.mlr.press/v331/
- Official conference program: https://sites.google.com/usc.edu/l4dc2026/program/technical-program
- Code expressly linked in v2, §1: https://github.com/anon-research-coding/Control-Design-Learning

## Bibliography and version distinctions

Exact v2 title: **Learning to Solve Constrained Bilevel Control Co-Design Problems**.

Author order (v2): James Kotary; Himanshu Sharma; Ethan King; Draguna Vrabie; Ferdinando Fioretto; Jan Drgona. Affiliations on v2 PDF page 1: first four Pacific Northwest National Laboratory; Fioretto University of Virginia; Drgona Johns Hopkins University. PMLR lists the fourth author as **Draguna L Vrabie**. Do not silently imply the arXiv author spelling and official citation spelling are identical.

Published in *Proceedings of The 8th Annual Learning for Dynamics and Control Conference*, PMLR **331:222–241**, **2026**. Official conference dates 17–19 June 2026, Los Angeles, California, USA. PMLR publication is verified; the paper is no longer only a preprint. The publication record has the same title and updated abstract as the v2 PDF. The arXiv abstract landing page surprisingly retains an older abstract while the v2 HTML/PDF have the updated abstract—use the actual v2 PDF content.

v1 (11 July 2025) used the different title *A Method for Learning to Solve Parametric Bilevel Optimization with Coupling Constraints*. Do not mix v1 title with v2 content. Use explicit versioned scientific links and a separate official publication button/citation. The full official conference program verifies **Oral Session 4: Learning Theory, Optimization, and Decision-Making**, third paper; it also appears in Poster Session 4. An L4DC 2026 Oral badge is supported by the official schedule.

### Verified author URLs

| Author | Verified primary profile |
|---|---|
| James Kotary | https://j-kota.github.io/ |
| Himanshu Sharma | https://www.pnnl.gov/people/himanshu-sharma |
| Ethan King | https://www.pnnl.gov/people/ethan-king |
| Draguna Vrabie | https://www.pnnl.gov/people/draguna-vrabie-phd |
| Ferdinando Fioretto | https://nandofioretto.github.io/ |
| Jan Drgona | https://engineering.jhu.edu/case/faculty/jan-drgona/ |

Kotary's personal publication list swaps Fioretto and Vrabie for this paper; follow the primary PDF/PMLR order. The personal profile itself confirms his PNNL affiliation and email.

## Claim and equation source map

| Website content | Scientific source | Necessary qualifications |
|---|---|---|
| Motivation: repeatedly solve related engineering design problems with optimal-control responses | §1, §3 | Learned approximations over a parameter distribution; no universal solver claim |
| Upper design y, lower response z, parameters p | §3, Eqs. (1)–(2) | z is a lower-level optimizer, not a second independent neural prediction |
| Minimize L_p(y,z), y in C_p, U_p(y,z) ≤ 0, z in argmin over S_p(y) | Eqs. (1)–(2) | Keep design-only, lower-level, and coupling constraints distinct |
| Neural initialization y₀=N_θ(p) | §4.2, Algorithm 1 line 3 | Network initializes the design; it does not remove online optimization/corrections |
| Lower-level solve z=O_p(y) and sensitivity ∂z/∂y | §4.1; Algorithm 1 line 5 | Assumes a useful differentiable solution map; nonconvex test uses numerical local solver |
| Design projection Π_C(y)=argmin_{w∈C}||y−w||² | Eq. (4), §4.1 | Enforces design-only set, not full coupling feasibility |
| Coupling violation ν(y)=ReLU(U_p(y,O_p(y))) | Eq. (5), §4.2 | Differentiation includes the lower-level solution map |
| Correction y_{k+1}=Π_Cp(y_k−γ∇_y||ν(y_k)||²₂) | Eqs. (7)–(9), Algorithm 1 lines 4–8, Fig. 1 | Re-solve lower problem for each candidate; finite corrections do not ensure zero violation |
| Final lower-level solve after corrections | Algorithm 1 line 9 | Essential stage: output pair must use final corrected design |
| Self-supervised loss L_p(yhat,zhat)+λ||ν(yhat)||²₂ | Eq. (10), Algorithm 1 lines 10–11 | No optimal-solution labels needed; penalty encourages, does not guarantee feasibility |
| Offline weight update through all unrolled stages | §4.2, Algorithm 1 | Forward solve and correction remain at inference; weight update is training-only |
| Handling lower-level infeasibility | §4.3; Appendices D.1 and E.1 | Lift troublesome conditions into upper coupling conditions and use penalties/slacks in lower solve |
| Three contribution themes | §1 Contributions | Differentiable lower solves plus design projection; coupling correction; empirical constrained bilevel/co-design evaluation |

### Diagram requirements

Depict parameters → network design estimate → lower-level solver → coupling violation and gradient → design update → design projection → repeated lower-level solve. The lower solve is needed inside every correction iteration. After m steps, perform the final lower solve and output both design and control response. Show the training loss and backward weight update as a separate training-only feedback path. The projection is onto C_p; it is not a projection onto the full bilevel feasible set. An animation may step through those operations but must not animate fabricated performance curves or imply guaranteed convergence.

### Selected equations suitable for public page

```tex
\min_y \mathcal L_p(y,z)\quad\text{s.t.}\quad y\in\mathcal C_p,\ U_p(y,z)\le0,\ z\in\arg\min_{z\in\mathcal S_p(y)}l_p(y,z).
```

```tex
\nu(y)=\operatorname{ReLU}(U_p(y,\mathcal O_p(y))),\qquad y_{k+1}=\Pi_{\mathcal C_p}\left(y_k-\gamma\nabla_y\|\nu(y_k)\|_2^2\right).
```

```tex
\mathcal L_p^{\mathrm{soft}}(\hat y,\hat z)=\mathcal L_p(\hat y,\hat z)+\lambda\|\nu(\hat y)\|_2^2.
```

Do not reproduce Eq. (6) literally: it contains an apparent ∂U/∂c notation error where y is the independent variable. Explain chain-rule sensitivity in prose or use the consistent derivative wrt y.

## Results — exact reported values

All metrics are averages over their test sets (§5 evaluation criteria). The ± values are **standard deviations across test instances**, not confidence intervals or variability across training seeds. Selected hyperparameter runs are reported (Appendices C.1, D.2, E.2), not repeated-seed averages.

### Bilevel quadratic programs: Table 1, §5.1, Figure 2

| Upper × lower variable count | Relative objective gap mean ± SD | Coupling residual L2 norm mean ± SD | Learned time (s) | YALMIP time (s) |
|---|---:|---:|---:|---:|
| 3 × 2 | 9.2e−4 ± 2e−3 | 5.9e−3 ± 1e−2 | 0.064 | 0.12 |
| 6 × 4 | 2.0e−3 ± 5e−3 | 2.8e−4 ± 9e−4 | 0.064 | 1.2 |
| 9 × 6 | 1.1e−2 ± 1e−2 | 4.0e−5 ± 7e−4 | 0.067 | 10.3 |

Gap = |(L(learned)−L(reference))/L(reference)|. Reference: certified optima from YALMIP KKT reformulation and branch-and-bound/MIP (§5.1). Thus gap reports refer only to these small BQPs. Each validation/test set contains 1000 instances. Objective linear coefficients c,d ~ U(0,1); other matrices/vectors drawn U(0,1); Q,H made PSD by self-multiplication. Five-layer network; cvxpylayers; 10 correction steps in training and 20 at test (Appendix C.1); Figure 2 covers 75 epochs. Hyperparameters chosen by lowest loss among runs; selected Adam learning rate 1e−3, correction γ=1e−4, λ=100. Larger instances beginning at 12×9 lacked tractable certified references in this study. Hardware and timing batch size are not specified in v2; state this if showing times.

### Control co-design: Table 2, §5.2, Figure 3

| System | Method | Design objective | Coupling residual L2 norm mean ± SD | Reported time (s) |
|---|---|---:|---:|---:|
| Two-tank | Learned | 0.122 | 0.014 ± 0.02 | 0.027 |
| Two-tank | PSO | 0.140 | 0.016 ± 0.02 | 1268.7 |
| HVAC | Learned | 1.23 | 0.030 ± 0.05 | 0.0770 |
| HVAC | PSO | 1.46 | 0.030 ± 0.02 | 1055.9 |

Design costs are objective values, **not dollar values**, and are incomparable in magnitude across the two applications. Residual norms are the benchmark coupling metrics, not asserted physical-unit maximum constraint violations. These are numerical/simulation benchmarks, not physical plant deployment tests. PSO is a heuristic baseline and the true global co-design optimum is unknown. Times exclude offline training; the measured inference includes numerical work, not just a neural forward pass. V2 does not specify timing hardware or timing batch size. The full code may clarify implementation defaults but should not retroactively supply unverified hardware metadata for the paper table.

### Two-tank experiment scope

- §5.2, Eqs. (13)–(16), Appendix D: nonlinear two-tank dynamics, one pump and two-way valve; y=[y₁,y₂] inlet/outlet coefficients; x=[x₁,x₂] levels; u=[u₁,u₂] pump modulation/valve opening.
- Design objective vᵀy, v=ones; bounds 0≤y≤1/3. Initial state zero; target reference p in [0,1]² restricted p₁<p₂; T=10s, N=20 Euler steps (dt=0.5s).
- Network eight layers; datasets 10000/1000/1000 training/validation/test. Solver: differentiable MPC, sensitivity from KKT conditions of the final convex subproblem of a sequential quadratic scheme. Do not claim global solution of the nonconvex lower problem.
- Appendix D.1: terminal equality x^(N)=p moved to coupling condition; lower energy objective augmented by ρ||x^(N)−p||² with ρ=100. Keep terminal condition as the corrected upper coupling constraint; don't claim a finite penalty enforces it exactly.
- D.2: five correction steps in training, ten at test; 10 epochs; selected lr=1e−3, γ=1e−2, λ=10. Model chosen for lowest mean design objective among runs with mean residual ≤ PSO.

### HVAC experiment scope

- §5.2, Eqs. (17)–(18), Appendix E: two thermally coupled zones; eight thermal states; two heat-flow controls; design matrix Y∈R^(8×2), Y≥0. Linear model x⁺=Ax+Yu+Ed and output w=Cx.
- Design cost Tr(VᵀY), V=ones; lower objective squared input norm. Time-varying comfort bounds p_low≤w≤p_high, upper bound lower+2.0; N=30. No timestep/total horizon duration stated.
- Thermal-bound scenarios from β-random walk; fixed disturbance pattern from NeuroMANCER building-control test suite. Six-layer ReLU network; cvxpylayers. Dataset sizes printed 10000/1000/1000 (text has grammatical omission of 'training'); can label intended training/validation/test but record this editorial issue.
- E.1: nonnegative-type comfort slacks are penalized quadratically at lower level; zero-slack condition is upper coupling condition corrected by algorithm. Do not assert exact zero-slack outcome.
- E.2: five corrections training, ten test; 25 epochs; selected lr=1e−3, γ=1e−4, λ=100. Same model-selection rule as two-tank.

### PSO baseline scope

Appendix A: pyswarms; 128 particles, 200 iterations; cognitive/social coefficients 0.5/0.5, inertia 0.9; native simple design bounds; coupling-violation penalty tuned to mean residual on order 1e−2. κ=100 two-tank, κ=5 HVAC. Same lower-level reformulations as learned method. Appendix B Figures 4–5 show best particle objective by PSO iteration, test-set average, decomposed into design cost and coupling penalty. These settings should accompany numerical performance comparisons or be expandable contextual notes.

## Scope and qualifications for public page

1. Continuous upper/lower decision variables; integer-variable extension is future work (§6).
2. Architecture uses unique lower-level response and useful gradients; §3 treats differentiability/uniqueness as practical applicability guidelines, not a proved universal condition.
3. Design-set projection and lower solve have distinct roles; coupling correction and soft penalties do **not** ensure zero residual (§4.2 explicitly says so).
4. Finite correction and numerical optimization yield approximate results. No theorem proves globally optimal co-design or feasibility for all scenarios.
5. Co-design comparisons are against PSO without certified global optima; certified references exist only for small BQPs.
6. Training is offline; inference still includes lower-level optimization and gradient corrections. No physical hardware experiments or controller deployment are reported.
7. No timing hardware or batch-size information in v2, confirmed by full HTML read plus PDF text searches for hardware, batch, GPU.

## Discrepancy register

- **Percentage framing:** abstract says 15–19% lower design cost; table values yield (0.140−0.122)/0.140≈12.9% and (1.46−1.23)/1.46≈15.8% relative to PSO. TT prose instead says PSO costs 15% more, consistent with dividing by learned cost. Prefer raw table costs; do not repeat ambiguous headline percentages.
- **TT PSO time:** Table 2 says **1268.7s**, §5.2 says **1286.7s**. Use Table 2, record conflict. No silent averaging or repair.
- **Figure 3 legend:** original plot labels learned method 'Alg. 2' while v2 method is Algorithm 1. Preserve original graphic and explain source labeling in caption/provenance if necessary.
- **Equation notation:** Eq. (6) ∂U/∂c despite independent y; §4.2 claims iteration toward (3c) where context means coupling (3d); §4.3 partitions constraint feasible set by union, questionable as set notation; E.1/23c repeats lower slack where upper slack is expected. Avoid reproducing these slips uncritically. The website can use the sound high-level formulation and named slack roles.
- **Finite-penalty equivalence claim:** Appendices D/E describe reformulation as equivalent. Do not elevate finite quadratic penalties to a guarantee of exact feasibility/equivalence for every candidate; describe actual implemented relaxation and coupling correction.
- **Official names:** PMLR includes middle initial L for Vrabie; arXiv does not.
- **Version date:** publication year2026 vs primary scientific source v2 December2025. Make both clear.

## Available original visual sources

- Figure 1 architecture sketch, PDF page5: https://arxiv.org/html/2507.09050v2/images/L4DC_fig_sketch.png
- Figure 2 BQP training, PDF page7 (zero-index page6): three panels with gap/residual mean and SD over test set.
- Figure 3 co-design training, PDF page8 (zero-index page7): two-tank left/HVAC right, mean objective and residual across test instances. Preserve axis scale differences and PSO baseline lines.
- Figure 4 PSO two-tank curves: https://arxiv.org/html/2507.09050v2/images/pso_tt_curves.png
- Figure 5 PSO HVAC curve present in PDF/Appendix B; discover released filename from source/code rather than guessing.
- Figures 2/3 are omitted as actual image URLs in the HTML extraction; PDF extraction is appropriate.
- arXiv license is its perpetual nonexclusive distribution license; do not relabel source figures as CC-BY by inference. Website permission comes from author commissioning; source credits still needed. Check code/template licenses independently.

## Official BibTeX (abstract omitted)

```bibtex
@InProceedings{pmlr-v331-kotary26a,
  title = {Learning to Solve Constrained Bilevel Control Co-Design Problems},
  author = {Kotary, James and Sharma, Himanshu and King, Ethan and Vrabie, Draguna L and Fioretto, Ferdinando and Drgona, Jan},
  booktitle = {Proceedings of The 8th Annual Learning for Dynamics and Control Conference},
  pages = {222--241},
  year = {2026},
  editor = {Sukhatme, Gaurav and Lindemann, Lars and Tu, Stephen and Wierman, Adam and Atanasov, Nikolay},
  volume = {331},
  series = {Proceedings of Machine Learning Research},
  month = {17--19 Jun},
  publisher = {PMLR},
  pdf = {https://raw.githubusercontent.com/mlresearch/v331/main/assets/kotary26a/kotary26a.pdf},
  url = {https://proceedings.mlr.press/v331/kotary26a.html}
}
```
