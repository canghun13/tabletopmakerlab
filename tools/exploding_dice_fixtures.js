// Run the production handler; compare with independent finite-chain enumeration.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const defaults={sides:'6',trigger:'6',dice:'1',limit:'0',target:'10'};
const controls=Object.fromEntries(Object.entries(defaults).map(([k,value])=>[k,{value,attrs:{},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]}}]));
const outputs=Object.fromEntries(['main','a','b','c','d','scenario'].map(k=>[k,{textContent:''}]));
const status={textContent:'',error:false,classList:{toggle(_,x){status.error=x}}};
const buttons=Object.fromEntries(['copy','print','reset'].map(k=>[k,{disabled:false,addEventListener(_,fn){this.click=fn}}]));
const events={};
const shell={
  dataset:{mathCalc:'explode'},
  querySelector(s){
    const key=s.match(/^\[name="(.+)"\]$/);if(key)return controls[key[1]];
    const result=s.match(/^\[data-result="(.+)"\]$/);if(result)return outputs[result[1]];
    if(s==='.status')return status;
    if(s==='form')return {reset(){for(const [k,v] of Object.entries(defaults))controls[k].value=v}};
    return buttons[s.slice(1)];
  },
  querySelectorAll(s){
    if(s==='input[aria-invalid]')return Object.values(controls).filter(c=>c.attrs['aria-invalid']);
    assert.equal(s,'.copy,.print');return [buttons.copy,buttons.print];
  },
  addEventListener(k,fn){events[k]=fn}
};
let ready,seed=1,calls=0,cases=0;
const math=Object.create(Math);math.random=()=>{calls++;seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
const document={addEventListener(_,fn){ready=fn},querySelectorAll(){return [shell]}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../assets/js/game-math-calculators.js'),'utf8'),{document,Math:math});ready();
function run(overrides={}){
  for(const [k,v] of Object.entries({...defaults,...overrides}))controls[k].value=String(v);
  calls=0;seed=1;events.input();cases++;
  assert(!Object.values(outputs).some(o=>/NaN|Infinity|undefined/.test(o.textContent)));
}
function invalid(key){
  assert.equal(shell.dataset.invalid,'true');assert(status.error);assert.equal(calls,0);
  assert(buttons.copy.disabled&&buttons.print.disabled);assert.equal(outputs.main.textContent,'Check inputs');
  for(const k of ['a','b','c','d'])assert.equal(outputs[k].textContent,'—');
  assert.equal(controls[key].attrs['aria-invalid'],'true');
}
function valid(){assert.equal(shell.dataset.invalid,'false');assert(!status.error);assert(!buttons.copy.disabled&&!buttons.print.disabled)}
function close(actual,expected,tolerance=.001){assert(Math.abs(Number(String(actual).replaceAll(',','').replace('%',''))-expected)<=tolerance,`${actual} != ${expected}`)}
run();valid();close(outputs.main.textContent,4.2);close(outputs.a.textContent,100/6,.006);close(outputs.b.textContent,.2);close(outputs.c.textContent,100/12,1.5);
// Independent enumerator: branch over actual faces, stop at the finite extra-roll limit.
function enumerate(s,tr,d,L,t){
  const chain=new Map();
  function walk(sum,left,p){for(let f=1;f<=s;f++){if(f===tr&&left>0)walk(sum+f,left-1,p/s);else chain.set(sum+f,(chain.get(sum+f)||0)+p/s)}}
  walk(0,L,1);let pool=new Map([[0,1]]);
  for(let i=0;i<d;i++){const next=new Map();for(const [x,p] of pool)for(const [y,q] of chain)next.set(x+y,(next.get(x+y)||0)+p*q);pool=next}
  let mean=0,win=0;for(const [x,p] of pool){mean+=x*p;if(x>=t)win+=p}
  return {mean,win};
}
for(const [s,tr,d,L,t] of [[2,2,1,1,3],[3,1,2,2,8],[4,4,1,3,10],[6,6,2,1,15],[1,1,1,2,3],[1,1,1,2,4],[1,1,100,100,10100],[1,1,100,100,10101]]){
  run({sides:s,trigger:tr,dice:d,limit:L,target:t});valid();const ref=enumerate(s,tr,d,L,t);
  close(outputs.main.textContent,ref.mean,.00051);close(outputs.c.textContent,100*ref.win,s===1?.00001:1.5);
  if(s===1){close(outputs.b.textContent,d*L);assert.equal(calls,0)}
}
run({target:0});valid();assert.equal(outputs.c.textContent,'100.00%');
run({target:Number.MAX_SAFE_INTEGER});valid();assert.equal(outputs.c.textContent,'0.00%');
run({sides:1000,trigger:1000,dice:100,limit:100});valid();close(outputs.main.textContent,50100.1001001,.00051);
for(const key of Object.keys(defaults)){
  for(const value of ['',-1,.5,'Infinity','1e309','9007199254740992']){run({[key]:value});invalid(key)}
}
for(const [key,value] of [['sides',0],['sides',1001],['trigger',0],['trigger',7],['dice',0],['dice',101],['limit',101]]){run({[key]:value});invalid(key)}
run({sides:1,trigger:1});invalid('limit');assert.match(status.textContent,/never finishes/);
run();valid();events.change();valid();
run({dice:''});invalid('dice');buttons.reset.click();valid();assert.equal(outputs.main.textContent,'4.2');assert(Object.values(controls).every(c=>!c.attrs['aria-invalid']));
console.log(`Exploding Dice production handler: ${cases} cases passed, plus change/Reset recovery. Seeded simulations checked against independent enumeration.`);
