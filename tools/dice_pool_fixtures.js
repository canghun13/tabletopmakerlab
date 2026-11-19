// Shipped Dice Pool handler versus independent enumeration of physical die faces.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const defaults={dice:5,sides:6,threshold:5,required:2,mode:'atleast'};
const fields=Object.fromEntries(Object.entries(defaults).map(([k,v])=>[k,{value:String(v),attrs:{},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]}}]));
const outputs=Object.fromEntries(['main','a','b','c','d','scenario'].map(k=>[k,{textContent:''}]));
const unit={textContent:''},events={},buttons=Object.fromEntries(['copy','print','reset'].map(k=>[k,{disabled:false,addEventListener(_,fn){this.click=fn}}]));
const status={textContent:'',error:false,classList:{toggle(_,v){status.error=v}}};
const shell={dataset:{mathCalc:'pool'},querySelector(s){
 const f=s.match(/^\[name="(.+)"\]$/);if(f)return fields[f[1]];const o=s.match(/^\[data-result="(.+)"\]$/);if(o)return outputs[o[1]];
 if(s==='form')return {reset(){for(const [k,v] of Object.entries(defaults))fields[k].value=String(v)}};
 if(s==='.status')return status;if(s==='.result-unit')return unit;return buttons[s.slice(1)];
},querySelectorAll(s){if(s==='[aria-invalid]')return Object.values(fields).filter(f=>f.attrs['aria-invalid']);assert.equal(s,'.copy,.print');return [buttons.copy,buttons.print]},addEventListener(k,fn){events[k]=fn}};
let ready,cases=0,invalidCases=0;
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../assets/js/game-math-calculators.js'),'utf8'),{document:{addEventListener(_,fn){ready=fn},querySelectorAll(){return [shell]}}});ready();
function run(values={}){for(const [k,v] of Object.entries({...defaults,...values}))fields[k].value=String(v);events.input();cases++;return shell}
const number=k=>Number(outputs[k].textContent.replaceAll(',','').replace('%',''));
function probability(k,value){const actual=number(k)/100;assert(Number.isFinite(actual)&&Math.abs(actual-value)<.000051,`${k} ${actual} != ${value}`)}
function enumeration(d,s,t){const counts=Array(d+1).fill(0);let total=0;function roll(left,hits){if(!left){counts[hits]++;total++;return}for(let face=1;face<=s;face++)roll(left-1,hits+Number(face>=t))}roll(d,0);return counts.map(c=>c/total)}
function event(dist,k,exact){return exact?(dist[k]||0):dist.reduce((sum,p,i)=>sum+(i>=k?p:0),0)}
for(let dice=0;dice<=4;dice++)for(let sides=1;sides<=6;sides++)for(let threshold=0;threshold<=sides+1;threshold++){
 const dist=enumeration(dice,sides,threshold),next=enumeration(dice+1,sides,threshold),p=enumeration(1,sides,threshold)[1]||0;
 for(let required=0;required<=dice+1;required++)for(const mode of ['atleast','exact']){
  run({dice,sides,threshold,required,mode});const chance=event(dist,required,mode==='exact');
  assert.equal(shell.dataset.invalid,'false');assert(!status.error);assert(!buttons.copy.disabled&&!buttons.print.disabled);
  probability('main',chance);probability('a',p);probability('c',1-chance);assert(Math.abs(number('b')-dice*p)<.00051);
  assert.equal(outputs.d.textContent,`${p===1?dice:0}–${p===0?0:dice} successes`);
  assert(unit.textContent.startsWith(mode==='exact'?'Exactly':'At least'));
  const match=outputs.scenario.textContent.match(/([\d.]+)%/);assert(match);assert(Math.abs(Number(match[1])/100-event(next,required,mode==='exact'))<.000051);
 }
}
run();assert.equal(outputs.main.textContent,'53.91%');assert.equal(outputs.b.textContent,'1.667');
run({dice:3,threshold:5,required:1,mode:'exact'});assert.equal(outputs.main.textContent,'44.44%');assert.match(outputs.scenario.textContent,/39\.51%/);
run({dice:3,threshold:5,required:1});assert.equal(outputs.main.textContent,'70.37%');assert.match(outputs.scenario.textContent,/80\.25%/);
for(const mode of ['exact','atleast'])for(const threshold of [0,2]){run({dice:1000,sides:1,threshold,required:1000,mode});probability('main',threshold===0?1:0);assert.match(outputs.scenario.textContent,/work limit/)}
run({sides:9007199254740991,threshold:9007199254740991});assert.equal(shell.dataset.invalid,'false');assert(!Object.values(outputs).some(o=>/NaN|Infinity|undefined/.test(o.textContent)));
run({dice:0,required:9007199254740991});probability('main',0);assert.equal(shell.dataset.invalid,'false');
function invalid(key){invalidCases++;assert.equal(shell.dataset.invalid,'true');assert.equal(fields[key].attrs['aria-invalid'],'true');assert(status.error);assert(buttons.copy.disabled&&buttons.print.disabled);assert.equal(outputs.main.textContent,'Check inputs');for(const k of ['a','b','c','d'])assert.equal(outputs[k].textContent,'—');assert.match(unit.textContent,/unavailable/)}
for(const key of ['dice','sides','threshold','required'])for(const value of ['',-1,.5,'Infinity','1e309','9007199254740992']){run({[key]:value});invalid(key)}
run({sides:0});invalid('sides');run({dice:1001});invalid('dice');run({mode:'bad'});invalid('mode');
run();events.change();assert.equal(outputs.main.textContent,'53.91%');assert.equal(shell.dataset.invalid,'false');
run({sides:''});invalid('sides');buttons.reset.click();assert.equal(outputs.main.textContent,'53.91%');assert.equal(shell.dataset.invalid,'false');assert(!buttons.copy.disabled&&!buttons.print.disabled);assert(Object.values(fields).every(f=>!f.attrs['aria-invalid']));
console.log(`Dice Pool production handler: ${cases} cases passed (${invalidCases} invalid states), including physical-face enumeration, exact/at-least extra-die comparison, empty/deterministic pools, 1,000-dice work boundary, invalid counts/modes and change/Reset recovery.`);
