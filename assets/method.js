(function(){
'use strict';
const steps=[['predict','1. Initialize the design with the neural network.'],['lower','2. Solve the lower-level control problem for the current design.'],['coupling','3. Evaluate coupling violations and differentiate through the lower solve.'],['update','4. Take a gradient step on the coupling penalty.'],['project','5. Project the updated design onto design-only constraints.'],['lower','Repeat: re-solve control for the projected design.'],['coupling','Repeat: evaluate the new coupling violation.'],['update','Repeat: update the design using the new gradient.'],['project','Repeat until the prescribed number of correction steps.'],['output','6. Recompute the final lower-level solution and return the design-control pair.'],['training','Offline only: differentiate the training loss to update network weights.']];
window.initMethodDiagram=function(options={}){
const object=options.object||document.querySelector('#method-diagram');
const play=options.playButton||document.querySelector('#method-play');
const next=options.stepButton||document.querySelector('#method-step');
const status=options.status||document.querySelector('#method-status');
if(!object)return;
let svg=null,index=-1,timer=null;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
function stop(){if(timer!==null)clearInterval(timer);timer=null;if(play){play.textContent='Play';play.setAttribute('aria-pressed','false');}}
function show(i){if(!svg)return;svg.querySelectorAll('[data-step]').forEach(n=>n.classList.toggle('active',n.dataset.step===steps[i][0]));if(status)status.textContent=steps[i][1];}
function advance(){index=(index+1)%steps.length;show(index);if(index===steps.length-1)stop();}
function connect(){try{svg=object.tagName.toLowerCase()==='svg'?object:object.contentDocument?.querySelector('svg');}catch(e){svg=null;}if(svg){if(play)play.disabled=false;if(next)next.disabled=false;if(status)status.textContent='Illustrative execution order. Select Step or Play to follow the method.';}}
if(play){play.disabled=true;play.setAttribute('aria-pressed','false');play.addEventListener('click',()=>{if(timer!==null){stop();return;}if(index===steps.length-1)index=-1;advance();if(index<steps.length-1){play.textContent='Pause';play.setAttribute('aria-pressed','true');timer=setInterval(advance,reduced.matches?2400:1600);}});}
if(next){next.disabled=true;next.addEventListener('click',()=>{stop();advance();});}
if(status){status.setAttribute('role','status');status.setAttribute('aria-live','polite');}
object.addEventListener('load',connect);connect();
reduced.addEventListener('change',stop);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
return {pause:stop,step:()=>{stop();advance();},reset:()=>{stop();index=-1;if(svg)svg.querySelectorAll('.active').forEach(n=>n.classList.remove('active'));}};
};
document.addEventListener('DOMContentLoaded',()=>window.initMethodDiagram());
})();
