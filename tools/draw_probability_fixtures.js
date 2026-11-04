// Production helpers/handlers versus independent draw and Bernoulli branch enumeration.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const defaults={
 bag:{total:20,targets:5,draw:3,required:1,replacement:'without'},
 pool:{dice:5,sides:6,threshold:5,required:2,mode:'atleast'},
 reroll:{dice:5,sides:6,threshold:5,required:1,rule:'failed'},
 card:{deck:60,targets:4,draw:7,required:1,mode:'atleast'},
 opening:{deck:60,hand:7,a:4,b:4,mulligan:'none'}
};
const selectors=new Set(['replacement','mode','rule','mulligan']);
function shellFor(kind){
 const fields=Object.fromEntries(Object.entries(defaults[kind]).map(([k,v])=>[k,{value:String(v),type:selectors.has(k)?'select':'number',attrs:{},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]}}]));
 const outputs=Object.fromEntries(['main','a','b','c','d','scenario'].map(k=>[k,{textContent:''}]));
 const status={textContent:'',error:false,classList:{toggle(_,v){status.error=v}}};
 const buttons=Object.fromEntries(['copy','print','reset'].map(k=>[k,{disabled:false,addEventListener(_,fn){this.click=fn}}]));
 const unit={textContent:''},events={};
 return {fields,outputs,status,buttons,unit,events,dataset:{mathCalc:kind},
  querySelector(s){
   const f=s.match(/^\[name="(.+)"\]$/);if(f)return fields[f[1]];
   const o=s.match(/^\[data-result="(.+)"\]$/);if(o)return outputs[o[1]];
   if(s==='.status')return status;if(s==='.result-unit')return unit;
   if(s==='form')return {reset(){for(const [k,v] of Object.entries(defaults[kind]))fields[k].value=String(v)}};
   return buttons[s.slice(1)];
  },
  querySelectorAll(s){if(s==='[aria-invalid]')return Object.values(fields).filter(f=>f.attrs['aria-invalid']);if(s==='input[type="number"]')return Object.values(fields).filter(f=>f.type==='number');assert.equal(s,'.copy,.print');return [buttons.copy,buttons.print]},
  addEventListener(k,fn){events[k]=fn}
 };
}
const shells=Object.fromEntries(Object.keys(defaults).map(k=>[k,shellFor(k)]));let ready,cases=0;
const context={document:{addEventListener(_,fn){ready=fn},querySelectorAll(){return Object.values(shells)}}};
const code=fs.readFileSync(path.join(__dirname,'../assets/js/game-math-calculators.js'),'utf8');
vm.runInNewContext(code.replace('const calc={','globalThis.drawTest={bin,binTail,hyper,hyperTail};const calc={'),context);ready();
function run(kind,overrides={}){const s=shells[kind];for(const [k,v] of Object.entries({...defaults[kind],...overrides}))s.fields[k].value=String(v);s.events.input();cases++;assert(!Object.values(s.outputs).some(o=>/NaN|Infinity|undefined/.test(o.textContent)));return s}
const num=(s,k)=>Number(s.outputs[k].textContent.replaceAll(',',''));
function probability(s,k,p){assert(Number.isFinite(p)&&p>=-1e-12&&p<=1+1e-12);const actual=Number(s.outputs[k].textContent.replace('%',''))/100;assert(Number.isFinite(actual)&&Math.abs(actual-p)<=.000051,`${s.dataset.mathCalc}/${k}: ${s.outputs[k].textContent} != ${p}`)}
const tail=(a,k)=>a.reduce((sum,p,i)=>sum+(i>=k?p:0),0);
function tokens(N,K,d,replacement){const bins=Array(d+1).fill(0);let total=0;function draw(bag,left,success){if(!left){bins[success]++;total++;return}for(let i=0;i<bag.length;i++)draw(replacement?bag:bag.filter((_,j)=>j!==i),left-1,success+Number(bag[i]<K))}draw(Array.from({length:N},(_,i)=>i),d,0);return bins.map(n=>n/total)}
function bernoulli(N,p){const bins=Array(N+1).fill(0);function branch(left,k,weight){if(!left){bins[k]+=weight;return}branch(left-1,k,weight*(1-p));branch(left-1,k+1,weight*p)}branch(N,0,1);return bins}
// Each token is a distinct physical object, including identically marked targets.
for(let N=1;N<=5;N++)for(let K=0;K<=N;K++)for(const replace of [false,true])for(let d=0;d<=3;d++){
 if(!replace&&d>N)continue;
 const ref=tokens(N,K,d,replace);
 for(let k=0;k<=d+1;k++){
  const s=run('bag',{total:N,targets:K,draw:d,required:k,replacement:replace?'with':'without'});
  assert.equal(s.dataset.invalid,'false');probability(s,'main',tail(ref,k));probability(s,'a',ref[k]||0);probability(s,'b',ref[0]);assert(Math.abs(num(s,'c')-d*K/N)<.00051);
  if(replace&&d>N)assert.match(s.outputs.scenario.textContent,/unavailable/);
  else{const other=tokens(N,K,d,!replace),match=s.outputs.scenario.textContent.match(/([\d.]+)%/);assert(match&&Math.abs(Number(match[1])/100-tail(other,k))<=.000051)}
  if(!replace)for(const mode of ['exact','atleast']){const c=run('card',{deck:N,targets:K,draw:d,required:k,mode});probability(c,'main',mode==='exact'?(ref[k]||0):tail(ref,k));probability(c,'b',ref[0])}
 }
}
for(const sides of [1,2,6])for(let dice=0;dice<=4;dice++)for(const threshold of [1,sides,sides+1]){
 const p=Math.max(0,Math.min(1,(sides-threshold+1)/sides)),ref=bernoulli(dice,p);
 for(let required=0;required<=dice+1;required++)for(const mode of ['exact','atleast'])probability(run('pool',{dice,sides,threshold,required,mode}),'main',mode==='exact'?(ref[required]||0):tail(ref,required));
}
for(const sides of [2,6])for(let dice=0;dice<=4;dice++)for(const threshold of [1,sides,sides+1])for(const rule of ['failed','worst','selected']){
 let hits=0,original=0;for(let f=1;f<=sides;f++){if(f>=threshold)original++;for(let second=1;second<=sides;second++){const a=f>=threshold,b=second>=threshold;if(rule==='worst'?a&&b:rule==='selected'?a||(!a&&second===1):a||b)hits++}}
 const before=bernoulli(dice,original/sides),after=bernoulli(dice,hits/(sides*sides));
 for(let required=0;required<=dice+1;required++){const s=run('reroll',{dice,sides,threshold,required,rule});probability(s,'main',tail(after,required));probability(s,'a',tail(before,required))}
}
function opening(N,A,B,h){const hits=[0,0,0];let total=0;function draw(bag,left,a,b){if(!left){total++;hits[0]+=Number(a);hits[1]+=Number(a||b);hits[2]+=Number(a&&b);return}for(let i=0;i<bag.length;i++){const card=bag[i];draw(bag.filter((_,j)=>i!==j),left-1,a||card<A,b||(card>=A&&card<A+B))}}draw(Array.from({length:N},(_,i)=>i),h,false,false);return hits.map(n=>n/total)}
for(let N=1;N<=6;N++)for(let hand=0;hand<=Math.min(3,N);hand++)for(let a=0;a<=N;a++)for(let b=0;b<=N-a;b++)for(const mulligan of ['none','full']){
 const ref=opening(N,a,b,hand),apply=p=>mulligan==='full'?1-(1-p)**2:p,s=run('opening',{deck:N,hand,a,b,mulligan});probability(s,'main',apply(ref[0]));probability(s,'a',ref[0]);probability(s,'b',apply(ref[1]));probability(s,'c',apply(ref[2]));
}
// Direct normalization and exact/tail distinction in the actual private helpers.
for(let N=0;N<=8;N++)for(const p of [0,.25,.5,1]){let mass=0;for(let k=0;k<=N;k++){mass+=context.drawTest.bin(N,p,k);assert(Math.abs(context.drawTest.binTail(N,p,k,true)-context.drawTest.bin(N,p,k))<1e-12)}assert(Math.abs(mass-1)<1e-12)}
for(const replacement of ['with','without'])for(const targets of [0,1000]){const s=run('bag',{total:1000,targets,draw:1000,required:1000,replacement});probability(s,'main',targets?1:0);probability(s,'a',targets?1:0)}
let invalidCases=0;
function invalid(s,key){invalidCases++;assert.equal(s.dataset.invalid,'true');assert(s.status.error);assert(s.buttons.copy.disabled&&s.buttons.print.disabled);assert.equal(s.outputs.main.textContent,'Check inputs');for(const k of ['a','b','c','d'])assert.equal(s.outputs[k].textContent,'—');assert.equal(s.fields[key].attrs['aria-invalid'],'true')}
for(const key of ['total','targets','draw','required'])for(const value of ['',-1,.5,'Infinity','1e309','9007199254740992'])invalid(run('bag',{[key]:value}),key);
invalid(run('bag',{total:0}),'total');invalid(run('bag',{targets:21}),'targets');invalid(run('bag',{draw:21}),'draw');invalid(run('bag',{draw:1001,replacement:'with'}),'draw');invalid(run('bag',{replacement:'bad'}),'replacement');
run('bag');shells.bag.events.change();assert.equal(shells.bag.outputs.main.textContent,'60.09%');assert.equal(shells.bag.outputs.a.textContent,'46.05%');
invalid(run('bag',{total:''}),'total');shells.bag.buttons.reset.click();assert.equal(shells.bag.dataset.invalid,'false');assert(!shells.bag.buttons.copy.disabled&&!shells.bag.buttons.print.disabled);assert(Object.values(shells.bag.fields).every(f=>!f.attrs['aria-invalid']));
console.log(`Draw probability production handlers: ${cases} cases passed (${invalidCases} invalid-state cases), plus helper normalization/exact-tail checks and change/Reset recovery. Five consumers checked by independent enumeration.`);
