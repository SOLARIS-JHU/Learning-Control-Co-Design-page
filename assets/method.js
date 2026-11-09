import{K,states,solve,correct,project,mix,qpPoint,outerPoint,projectionPoint,path,n,qpMesh}from'./method-model.js';
const stages=[{name:'predict',round:0,duration:1400}];
for(let k=0;k<K;k++)stages.push({name:'lower',round:k,duration:3200},{name:'coupling',round:k,duration:1400},{name:'update',round:k,duration:2800},{name:'project',round:k,duration:1700});
stages.push({name:'output',round:K,duration:2400},{name:'training',round:K,duration:2400});
const descriptions={predict:'Predict the initial design.',lower:'Solve the illustrative inner QP; amber iterates approach the teal solution.',coupling:'Evaluate the coupling residual and differentiate through the lower response.',update:'Move along the negative coupling-penalty gradient: one discrete correction step.',project:'Project the candidate onto the design bounds; only the design constraint is enforced.',output:'Solve once more for the final design and return the design–control pair.',training:'Offline only: backpropagate the training loss to update network weights.'};
const object=document.querySelector('#method-diagram'),play=document.querySelector('#method-play'),step=document.querySelector('#method-step'),reset=document.querySelector('#method-reset'),status=document.querySelector('#method-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let svg,index=0,elapsed=0,last=0,frame=0,playing=false,visible=false,userPaused=reduced.matches;
const get=id=>svg?.getElementById(id);
function dot(id,p){const el=get(id);if(el){el.setAttribute('cx',n(p[0]));el.setAttribute('cy',n(p[1]));}}
function line(id,points){get(id)?.setAttribute('d',path(points));}
function render(t){if(!svg)return;const s=stages[index],k=Math.min(s.round,K-1),y=states[k],trial=correct(y),projected=project(trial),target=solve(states[s.round]);
const innerPhase=s.name==='predict'?0:s.name==='lower'||s.name==='output'?t:1;
const ease=(1-Math.exp(-4*innerPhase))/(1-Math.exp(-4));
const trace=Array.from({length:25},(_,i)=>qpPoint(mix([-.8,-.7],target,ease*i/24),target));line('qp-trail',trace);dot('qp-dot',trace.at(-1));
const outerPhase=['predict','lower','coupling'].includes(s.name)?0:s.name==='update'?t:1;
const current=mix(y,trial,outerPhase);dot('outer-dot',outerPoint(current));line('outer-trail',[outerPoint(y),outerPoint(current)]);
const projectionPhase=['output','training'].includes(s.name)?1:s.name==='project'?t:0;
const p=mix(trial,projected,projectionPhase);dot('projection-dot',projectionPoint(p));line('projection-trail',[projectionPoint(trial),projectionPoint(p)]);
}
function setup(){const s=stages[index],k=Math.min(s.round,K-1),y=states[k],target=solve(states[s.round]);svg.querySelectorAll('[data-step]').forEach(el=>el.classList.toggle('active',el.dataset.step===s.name));get('qp-mesh').innerHTML=qpMesh(states[s.round]);dot('qp-target',qpPoint(target,target));const trial=correct(y);dot('outer-start',outerPoint(y));line('gradient-vector',[outerPoint(y),outerPoint(trial)]);dot('projection-target',projectionPoint(project(trial)));const history=[states[0]];for(let j=0;j<k;j++)history.push(correct(states[j]),states[j+1]);line('outer-history',history.map(outerPoint));status.textContent='Illustrative example'+(s.round<K?' · correction '+(s.round+1)+' of '+K:'')+': '+descriptions[s.name];}
function stop(manual=false){playing=false;if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(manual)userPaused=true;play.textContent='Play';play.setAttribute('aria-pressed','false');}
function tick(time){if(!playing)return;if(last)elapsed+=time-last;last=time;const duration=stages[index].duration;if(elapsed>=duration){index=(index+1)%stages.length;elapsed=0;setup();}render(reduced.matches?1:Math.min(elapsed/stages[index].duration,1));frame=requestAnimationFrame(tick);}
function start(){if(!svg||playing)return;userPaused=false;playing=true;last=0;play.textContent='Pause';play.setAttribute('aria-pressed','true');frame=requestAnimationFrame(tick);}
function connect(){try{svg=object.contentDocument?.querySelector('svg');}catch{}if(!svg)return;play.disabled=step.disabled=reset.disabled=false;setup();render(reduced.matches?1:0);if(visible&&!userPaused&&!document.hidden)start();}
play.addEventListener('click',()=>playing?stop(true):start());
step.addEventListener('click',()=>{stop(true);index=(index+1)%stages.length;elapsed=stages[index].duration;setup();render(1);});
reset.addEventListener('click',()=>{stop();index=0;elapsed=0;setup();render(reduced.matches?1:0);userPaused=reduced.matches;if(!userPaused&&visible)start();});
object.addEventListener('load',connect);
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&!userPaused&&!document.hidden&&!playing&&svg)start();if(!visible)stop();},{threshold:.12}).observe(object);
reduced.addEventListener('change',()=>{stop(true);if(svg)render(1);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else if(visible&&!userPaused)start();});
connect();
