# Research-code audit

Audited 2026-11-09. Repository: https://github.com/anon-research-coding/Control-Design-Learning
Pinned main commit: a6743e1a3477427bde2500b12249691275289d4c (2025-11-25; commit message: "three experiments").
Only main branch returned. Releases endpoint returns empty list. No LICENSE in full recursive tree; GitHub license metadata is null. README contains only "# Learning-Control-Co-Design". Do not copy research code under the website's own license.

## Contents and available assets

- BQP/: QP solver, correction, training/data-generation scripts; three MAT files: param_sol_data_3_2_10000.mat, param_sol_data_6_4_1000b.mat, param_sol_data_9_6_1000b.mat.
- TT/: nonlinear two-tank differentiable MPC, upper design learning, PSO; xf_dev_standard.p test references.
- HVAC/: linear building MPC with temperature slacks, design learning, PSO, utilities; data/zone_data_30steps_11000samples.p.
- BQP and HVAC vendor cvxpylayers version 0.1.4.
- No committed plots, application videos, trained weights, experiment run logs, or paper figure-generation source/data. Plotting routines exist inside training scripts but their output directories/files are absent.
- requirements.txt files are command instructions, not pip requirement manifests.
- No hardware specification in inspected experiment text/source files.
- Audited via GitHub API text/tree. Did not execute models, load pickle payloads, or claim reproduction.

## Method implementation map

All links should pin the commit above.

| Scientific component | Code | Details |
| --- | --- | --- |
| BQP lower-level solve | BQP/QP_layer.py:get_QP_layer | CvxpyLayer solves convex QP in z given upper variable x. Paper uses y for code x. |
| BQP coupling correction | BQP/QP_correction.py:x_correction (15-28) | ReLU(Ax-b-Ez), gradient of squared residual, repeat lower solve at each update. Upper projection is identity in this unconstrained-upper-set example. |
| BQP self-supervised loss | BQP/bilevel_QP.py (99-100, 177-196) | Upper quadratic objective (includes additive 100) plus penalty times squared coupling residual; random fresh parameter samples. Reference solutions used only in test metrics. |
| Two-tank dynamics and lower solve | TT/twotank_diffmpc.py:ode_equations, TwoTankDx, DiffTwoTankSolver | Euler step; pump and valve; nonlinear differentiable MPC; bounded controls, clipped dynamics inputs, sqrt smoothing 1e-5. |
| Two-tank correction/projection | TT/twotank_codesign_mpc.py:c_correction (40-61) | Repeated lower-level trajectory solve, terminal-state squared-residual gradient, design box clipping before each lower solve and after loop. |
| Two-tank predictor/training | TT/twotank_codesign_mpc.py (92, 134-138, 244-270) | Reference target to NN design, sigmoid initialization to bounds, correction, lower solve, sum of design parameters plus terminal MSE penalty. |
| HVAC lower solver/slacks | HVAC/building_MPC_layer.py:get_building_MPC_layer (22-64) | Dynamics and input bounds; lower/upper comfort slacks nonnegative, squared slack cost and control cost. Output [u,x,y,slack_lower,slack_upper]. |
| HVAC projection | HVAC/building_control_codesign.py:B_restore (161-165) | ReLU nonnegativity multiplied by fixed structural B mask. |
| HVAC predictor/inference | HVAC/building_control_codesign.py:predict_correct_solve (202-221) | NN takes flattened lower comfort bounds and initial state. All bounds, disturbances, initial state passed into lower solver. Output predicted/corrected B and lower solution. |
| HVAC correction | HVAC/building_correction.py:B_correction (31-63) | Project B, solve lower MPC, differentiate squared stacked slacks, update B; final projection. |
| HVAC outer loss | HVAC/building_control_codesign.py (360-397) | Sum of B plus penalty times squared temperature slacks. |
| PSO baseline | TT/twotank_pyswarms.py; HVAC/building_pyswarms.py | Same types of lower optimizations; bounded particles; penalized upper objectives. Baseline scripts configure 128 particles/200 iterations. |

## Required diagram structure

Parameters -> upper-level NN -> upper feasible-set projection -> lower optimization -> coupling residual -> gradient through lower solver -> upper design update -> projection -> repeated lower solve. After correction, final lower solve produces design/trajectory solution pair. Training additionally computes upper objective + squared-residual penalty and updates NN weights via gradients. Inference keeps NN weights fixed but STILL executes lower solves and correction; it is not a pure one-shot neural controller. In two-tank/HVAC, terminal/comfort constraints are softened in the lower problem and their residual/zero-slack target is enforced approximately at the upper level. Show these essential distinctions.

## Manuscript/code discrepancies requiring maintenance note

Primary comparison here is arXiv v1, the publicly retrieved 11 July 2025 manuscript; verify if parent selects newer version.

1. BQP parameter distribution: paper §5.1 describes U(0,1), code bilevel_QP.py:179-180 and gen_QP_data.py use 2*rand = U(0,2).
2. BQP metric: paper §5 definition is absolute relative optimality gap. Code bilevel_QP.py:150-151 uses signed ratio without abs. Do not replace paper-reported values with reinterpretations of this script.
3. BQP network/default training: paper describes five-layer network/75 epochs; script has eight specified linear output widths and 30-epoch default. Command-line defaults also differ from Appendix C chosen hyperparameters. No saved run configuration resolves this.
4. TT design bounds: paper §5.2.1 states [0,1/3]; code :130-131 uses [0.01,0.32].
5. TT sample distribution: paper states U(0,1) subject p1<p2; code :111-113 uses p2 in [0.2,1], p1/p2 in [0.5,1]. Code default n_train=3000 vs paper 10000.
6. TT lower objective: Appendix D describes terminal quadratic penalty rho=100 plus control cost. DiffTwoTankSolver instead sets stage state tracking with blockdiag(Ix,0.001 Iu), repeated at every time and reference linear term. These are not the identical stated objectives. Code also clips state values within ODE evaluation, which is not a hard trajectory-state constraint.
7. TT correction: code default 3 train/10 test vs Appendix D 5 train/10 test. Script lower MPC limits 50 train/100 test LQR iterations; exit_unconverged=False, so do not claim global lower optimality for nonlinear experiments.
8. HVAC: code defaults one zone vs manuscript two, signed normalized inputs unless --upos, and 2 train/5 test correction steps vs paper 5/10. --nzones 2 can select two zones but no published exact run command is present.
9. HVAC: lower bound + initial state as NN input; data generator defaults zero disturbances; manuscript describes external disturbances. Do not assert recorded dataset disturbances without inspecting data safely.
10. Differentiating correction: all three correction routines use torch.autograd.grad(... retain_graph=True) without create_graph=True. Under PyTorch defaults the gradient computation is not itself retained for higher derivatives; paper describes fully differentiating correction updates. Do not claim repository demonstrates exact full second-order differentiation.
11. Timing scope differs: BQP :132-136 and TT :200-204 start timer after NN prediction and end before final lower solve. Their prints divide batch duration by sample count. BQP uses all 1000 test samples together; TT test batch=50. HVAC :272-275 includes NN + corrections + final solve with batch=100. Thus cannot convert manuscript time table into independently verified single-request latency.
12. Reproduction gaps: BQP imports Nets but BQP/Nets.py absent (similar file exists under TT/HVAC); TT baseline requires x0_dev_standard.p which is absent; output dirs ./plt ./pickle ./models ./PSO_solves absent; data generator has hard-coded local MATLAB path; no YALMIP solution-generation scripts in release. Do not promise one-command reproduction.
13. Paper itself: Table 2 TT PSO 1268.7 s versus §5.2.1 prose 1286.7 s; use table if including and record mismatch. Paper HVAC claims ~19% lower cost, but (1.46-1.23)/1.46 is ~15.75%; don't repeat disputed percentage. Prefer direct cost values.

Website public resource wording: "Research code" and "The reported results follow the paper. The linked code snapshot contains implementation and configuration differences; see the repository's source map." Avoid a large public bug list; retain the detailed record here.

## Safe claims

- Self-supervised upper-level solution prediction combined with differentiable lower optimization and projected correction.
- Convex QP benchmarks and simulated nonlinear two-tank / linear building co-design.
- Finite correction and penalties do not imply zero coupling residual.
- Lower uniqueness/differentiability assumptions; no universal guarantee for nonconvex lower solves.
- Offline NN learning amortizes repeated parametric design; runtime still solves optimization subproblems.

