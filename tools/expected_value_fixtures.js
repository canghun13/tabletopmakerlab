// Exercise the shipped EV handler with independent equally likely ticket outcomes.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const field=value=>({value:String(value),initial:String(value),attrs:{},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]}});
const row=(value,prob,label='Outcome')=>({fields:{value:field(value),prob:field(prob),label:field(label)},querySelector(s){return this.fields[s.match(/name="(.+)"/)[1]]}});
let rows=[row(0,50,'Miss'),row(4,50,'Hit')],ready,cases=0,invalidCases=0;
const outputs=Object.fromEntries(['main','a','b','c','d','scenario'].map(k=>[k,{textContent:''}]));
const unit={textContent:''},breakdown={textContent:''},events={},buttons=Object.fromEntries(['copy','print','reset','add-row'].map(k=>[k,{disabled:false,addEventListener(_,fn){this.click=fn}}]));
const status={textContent:'',error:false,classList:{toggle(_,v){status.error=v}}};
const shell={dataset:{mathCalc:'ev'},
 querySelector(s){
  if(s==='form')return {reset(){for(const r of rows)for(const f of Object.values(r.fields))f.value=f.initial}};
  if(s==='.ev-rows')return {insertAdjacentHTML(){rows.push(row(0,0,'New outcome'))}};
  if(s==='.result-unit')return unit;if(s==='.ev-breakdown')return breakdown;if(s==='.status')return status;
  const o=s.match(/data-result="(.+)"/);if(o)return outputs[o[1]];return buttons[s.slice(1)];
 },
 querySelectorAll(s){if(s==='.ev-row')return rows;if(s==='[aria-invalid]')return rows.flatMap(r=>Object.values(r.fields)).filter(f=>f.attrs['aria-invalid']);if(s==='[name="prob"]')return rows.map(r=>r.fields.prob);assert.equal(s,'.copy,.print');return [buttons.copy,buttons.print]},
 addEventListener(k,fn){events[k]=fn}
};
const context={document:{addEventListener(_,fn){ready=fn},querySelectorAll(){return [shell]}}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../assets/js/game-math-calculators.js'),'utf8'),context);ready();
const number=k=>Number(outputs[k].textContent.replaceAll(',','').replace('%',''));
function run(values){rows=values.map(([value,prob,label])=>row(value,prob,label));events.input();cases++;return shell}
function valid(expected,spread,min,max){assert.equal(shell.dataset.invalid,'false');assert(!status.error);assert(!buttons.copy.disabled&&!buttons.print.disabled);assert(!rows.some(r=>Object.values(r.fields).some(f=>f.attrs['aria-invalid'])));for(const [key,value] of Object.entries({main:expected,b:spread,c:max,d:min})){const actual=number(key);assert(Number.isFinite(actual)&&Math.abs(actual-value)<.00051,`${key} ${actual} != ${value}`)}assert.equal(number('a'),100);assert(!/NaN|Infinity|undefined/.test(Object.values(outputs).map(o=>o.textContent).join(' ')))}
function invalid(){invalidCases++;assert.equal(shell.dataset.invalid,'true');assert(status.error);assert(buttons.copy.disabled&&buttons.print.disabled);assert.equal(outputs.main.textContent,'Check inputs');for(const k of ['a','b','c','d'])assert.equal(outputs[k].textContent,'—');assert.equal(breakdown.textContent,'');assert.match(unit.textContent,/unavailable/)}
run([[0,50],[4,50]]);valid(2,2,0,4);
run([[-4,50],[4,50]]);valid(0,4,-4,4);
run([[-2,25],[6,75]]);valid(4,Math.sqrt(12),-2,6);
run([[-2.5,20],[1.25,80]]);valid(.5,1.5,-2.5,1.25);
run([[-5,100],[9000,0]]);valid(-5,0,-5,-5);
run([[0,100]]);valid(0,0,0,0);
run([[1e16,25],[1,50],[-1e16,25]]);assert.equal(number('main'),.5);
run([[1,33.333333333333],[2,33.333333333333],[3,33.333333333334]]);valid(2,Math.sqrt(2/3),1,3);
run([[1,50.000000000001],[3,50]]);valid(2,1,1,3); // accepted arithmetic roundoff only
run([[1e155,100],[0,0]]);assert.equal(shell.dataset.invalid,'false');assert.equal(number('main'),1e155);assert.equal(number('b'),0);
// Independent 100-ticket enumeration, not the handler's weighted sum/variance formula.
let seed=20261111;const random=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n};
for(let t=0;t<600;t++){
 const count=1+random(6),weights=Array(count).fill(0);for(let j=0;j<100;j++)weights[random(count)]++;
 const values=weights.map(w=>[(random(201)-100)/10,w]),tickets=values.flatMap(([value,w])=>Array(w).fill(value));
 const mean=tickets.reduce((s,x)=>s+x,0)/100,spread=Math.sqrt(tickets.reduce((s,x)=>s+(x-mean)**2,0)/100);
 run(values);valid(mean,spread,Math.min(...tickets),Math.max(...tickets));
}
for(const key of ['value','prob'])for(const bad of ['', 'word','Infinity','1e309']){
 const s=run([[0,50],[4,50]]);rows[0].fields[key].value=bad;events.change();cases++;invalid();assert.equal(rows[0].fields[key].attrs['aria-invalid'],'true');
}
for(const bad of [-1,100.1,150]){run([[1,bad],[2,50]]);invalid();assert.equal(rows[0].fields.prob.attrs['aria-invalid'],'true')}
for(const weights of [[0,0],[25,25],[100,100],[33.33,33.33,33.33],[1e-320,100]]){run(weights.map((p,i)=>[i,p]));if(weights[0]===1e-320){assert.equal(shell.dataset.invalid,'false')}else{invalid();assert(rows.every(r=>r.fields.prob.attrs['aria-invalid']==='true'))}}
run([[1,33.333333],[2,33.333333],[3,33.333333]]);invalid();
run([[1e308,50],[-1e308,50]]);invalid();assert.match(status.textContent,/magnitudes/);
run([[1,Number.MIN_VALUE],[2,100]]);invalid();assert.match(status.textContent,/magnitudes/);
run([]);invalid();
run([[0,50,'<script>not markup</script>'],[4,50,'']]);valid(2,2,0,4);assert.match(breakdown.textContent,/<script>not markup<\/script>/);assert.match(breakdown.textContent,/Outcome: 2/);
buttons['add-row'].click();cases++;valid(2,2,0,4);assert.equal(rows.length,3);
rows[2].fields.value.value='-10';rows[2].fields.prob.value='50';events.input();cases++;invalid();
buttons.reset.click();cases++;valid(2,2,0,4);assert.equal(rows.length,3);assert.equal(rows[2].fields.value.value,'0');assert.equal(rows[2].fields.prob.value,'0');
events.change();cases++;valid(2,2,0,4);
console.log(`Expected Value production handler: ${cases} cases passed (${invalidCases} invalid states), including 600 independent ticket enumerations, signed cancellation, decimal/zero outcomes, mass/range guards, add/change/Reset recovery.`);
