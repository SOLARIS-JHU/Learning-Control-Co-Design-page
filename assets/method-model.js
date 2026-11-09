// Dimensionless explanatory example; not paper experiment data or a solver trace.
export const K=4, initial=[0.95,0.80], gamma=0.35;
export const clip=(x,lo,hi)=>Math.min(hi,Math.max(lo,x));
export const solve=y=>[clip(0.7*y[0]+0.2,-1,1),clip(0.9*y[1]+0.1,-1,1)];
export const violation=y=>Math.max(0,solve(y).reduce((a,b)=>a+b,0)-0.75);
export const gradient=y=>[0.7,0.9].map((a,i)=>{const q=a*y[i]+[.2,.1][i];return q>-1&&q<1?2*a*violation(y):0;});
export const correct=y=>y.map((v,i)=>v-gamma*gradient(y)[i]);
export const project=y=>y.map(v=>clip(v,0.2,1));
export const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
export const states=[initial];
for(let k=0;k<K;k++)states.push(project(correct(states[k])));
export const qpPoint=(z,target)=>[550+80*z[0]+40*z[1],229+15*z[0]-15*z[1]-21*0.5*((z[0]-target[0])**2+(z[1]-target[1])**2)];
export const outerPoint=y=>[812+216*y[0]/1.1,539-95*y[1]/1.1];
export const projectionPoint=y=>[424+116*y[0]/1.1,520-100*y[1]/1.1];
export const n=x=>Number(x.toFixed(2));
export const path=points=>points.map((p,i)=>(i?'L':'M')+p.map(n).join(' ')).join(' ');
export function qpMesh(y){const target=solve(y);let out='';for(let axis=0;axis<2;axis++){for(let j=0;j<=8;j++){const points=[];for(let i=0;i<=20;i++){let z=axis?[-1+2*i/20,-1+2*j/8]:[-1+2*j/8,-1+2*i/20];points.push(qpPoint(z,target));}out+='<path d="'+path(points)+'" fill="none" stroke="'+(j===0||j===8?'#668BAB':'#A2BBD0')+'" stroke-width="'+(j===0||j===8?'1.3':'0.7')+'"/>';}}return out;}
export function outerField(){let out='';const boundary=[[0,0],[0.45/0.7,0],[0,0.45/0.9],[0,0]];out+='<path d="'+path(boundary.map(outerPoint))+'Z" fill="#D7ECE7"/>';for(const level of [0,.2,.4,.6,.8,1]){const c=.45+level,pts=[];for(const x of [0,1]){const y=(c-.7*x)/.9;if(y>=0&&y<=1)pts.push([x,y]);}for(const y of [0,1]){const x=(c-.9*y)/.7;if(x>=0&&x<=1)pts.push([x,y]);}if(pts.length>=2)out+='<path d="'+path(pts.slice(0,2).map(outerPoint))+'" fill="none" stroke="#AAC1D2" stroke-width=".8"/>';}
for(let i=1;i<=6;i++)for(let j=1;j<=4;j++){const y=[i*.16,j*.22];if(violation(y)<.04)continue;const p=outerPoint(y),g=gradient(y),q=outerPoint(y.map((v,k)=>v-.018*g[k]/Math.hypot(...g)*7));out+='<path d="'+path([p,q])+'" fill="none" stroke="#7E9EAE" stroke-width=".9" marker-end="url(#field-arrow)"/>';}
out+='<path d="'+path([[.2,.2],[1,.2],[1,1],[.2,1],[.2,.2]].map(outerPoint))+'" fill="none" stroke="#148F87" stroke-width="1" stroke-dasharray="3 3"/>';return out;}
