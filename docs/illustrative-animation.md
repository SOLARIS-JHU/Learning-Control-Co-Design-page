# Illustrative animation model

The original research results are not used to synthesize moving curves. The animated insets use this dimensionless toy problem solely to explain the computational stages. They are not reported experiment data or the authors' numerical solver trace.

- Design set: C=[0.2,1]^2; initial y=(0.95,0.80).
- Lower QP: minimize one half of ||z-(Ay+b)||_2^2 over z in [-1,1]^2, with A=diag(0.7,0.9), b=(0.2,0.1). Its exact solution is componentwise clipping of Ay+b.
- Coupling residual: nu(y)=max(z_1(y)+z_2(y)-0.75,0).
- Correction: y_tilde=y-0.35*gradient_y(nu(y)^2), followed by componentwise projection onto C.
- Four illustrative corrections are shown. This is a visualization budget, not a paper hyperparameter. The final toy coupling residual remains nonzero.

The inner panel draws the actual quadratic surface for the current design, then animates a descending path toward its analytic solution. Motion uses an exponential visual easing and is not a measured runtime, a reproduction of cvxpylayers internals, or a solver convergence result. The lower QP is re-evaluated after each projected design. The output stage includes the final lower solve.

The correction panel has parallel level sets because its active coupling penalty is rank-one quadratic. Arrows show the negative chain-rule gradient. A moving candidate follows one straight, discrete gradient step. Projection happens separately in the next panel; after the first correction, subsequent candidates cross the lower design bound and project back onto it.

Sources of implementation: assets/method-model.js defines the toy mathematics; scripts/method-template.svg defines the static layout; scripts/generate-method.mjs generates the static fallback; assets/method.js coordinates playback. No research-code implementation is copied.

Validation: analytic lower response checked against its box constraints; chain-rule gradient checked by centered finite differences along the displayed path; first update and subsequent projection checked numerically; final nonzero residual checked.

Animation starts only while the diagram is visible, pauses when hidden/offscreen, and includes Play/Pause, Step, and Restart. Reduced-motion preference suppresses autoplay and uses discrete stage changes if playback is explicitly requested. The SVG remains fully readable without JavaScript.
