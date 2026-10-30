// Exercise the production handler against independent physical-face enumeration.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const defaults={faces:'0, 0, 1, 1, 2, 3',dice:'2',target:'3',mode:'atleast'};
const fields=Object.fromEntries(Object.entries(defaults).map(([k,value])=>[k,{value,attrs:{},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]}}]));
const outputs=Object.fromEntries(['main','a','b','c','d','scenario'].map(k=>[k,{textContent:''}]));
const status={textContent:'',error:false,classList:{toggle(_,x){status.error=x}}};
const buttons=Object.fromEntries(['copy','print','reset'].map(k=>[k,{disabled:false,addEventListener(_,fn){this.click=fn}}]));
const events={},shell={dataset:{mathCalc:'custom'},
 querySelector(s){
  const field=s.match(/^\[name="(.+)"\]$/);if(field)return fields[field[1]];
  const output=s.match(/^\[data-result="(.+)"\]$/);if(output)return outputs[output[1]];
  if(s==='.status')return status;
  if(s==='form')return {reset(){for(const [k,v] of Object.entries(defaults))fields[k].value=v}};
  return buttons[s.slice(1)];
 },
 querySelectorAll(s){if(s==='[aria-invalid]')return Object.values(fields).filter(f=>f.attrs['aria-invalid']);assert.equal(s,'.copy,.print');return [buttons.copy,buttons.print]},
 addEventListener(k,fn){events[k]=fn}
};
let ready,cases=0;
const document={addEventListener(_,fn){ready=fn},querySelectorAll(){return [shell]}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../assets/js/game-math-calculators.js'),'utf8'),{document});ready();
function run(overrides={}){for(const [k,v] of Object.entries({...defaults,...overrides}))fields[k].value=String(v);events.input();cases++;assert(!Object.values(outputs).some(o=>/NaN|Infinity|undefined/.test(o.textContent)))}
function valid(){assert.equal(shell.dataset.invalid,'false');assert(!status.error);assert(!buttons.copy.disabled&&!buttons.print.disabled)}
function invalid(key){assert.equal(shell.dataset.invalid,'true');assert(status.error);assert(buttons.copy.disabled&&buttons.print.disabled);assert.equal(outputs.main.textContent,'Check inputs');for(const k of ['a','b','c','d'])assert.equal(outputs[k].textContent,'—');assert.equal(fields[key].attrs['aria-invalid'],'true')}
function value(k){return Number(outputs[k].textContent.replaceAll(',',''))}
function enumerate(faces,dice,target,mode){let wins=0,total=0,sum=0;function roll(left,score){if(!left){total++;sum+=score;if(mode==='exact'?score===target:score>=target)wins++;return}for(const face of faces)roll(left-1,score+face)}roll(dice,0);return {wins,total,mean:sum/total}}
for(const faces of [[0,0,1,1,2,3],[1,1,2],[1,2,3,4,5,6],[0,0,0],[2],[0,10,20],[-2,0,2]]){
 for(const dice of [1,2,3])for(const mode of ['exact','atleast'])for(const target of [0,1,3,7,30]){
  run({faces:faces.join(','),dice,mode,target});valid();const ref=enumerate(faces,dice,target,mode);
  assert.equal(value('c'),ref.wins);assert.equal(value('d'),ref.total);
  assert.equal(outputs.main.textContent,(100*ref.wins/ref.total).toFixed(2)+'%');
  assert(Math.abs(value('b')-ref.mean)<=.00051);
 }
}
run({faces:'1,1,2',dice:1,target:1,mode:'exact'});valid();assert.equal(outputs.main.textContent,'66.67%');assert.equal(value('c'),2);
run({faces:'1,2,3,4,5,6',dice:2,target:7,mode:'exact'});valid();assert.equal(outputs.main.textContent,'16.67%');assert.equal(value('c'),6);
run({mode:'exact'});valid();assert.equal(outputs.main.textContent,'22.22%');assert.equal(value('c'),8);
run();valid();assert.equal(outputs.main.textContent,'44.44%');assert.equal(value('c'),16);
run({faces:'0,1',dice:20,target:10,mode:'exact'});valid();assert.equal(value('c'),184756);assert.equal(value('d'),1048576);
run({faces:'0',dice:20,target:0,mode:'exact'});valid();assert.equal(outputs.main.textContent,'100.00%');
run({faces:' 1, 1 , 2 ',dice:1,target:1,mode:'exact'});valid();assert.equal(value('c'),2);
run({faces:'9007199254740991',dice:1,target:'9007199254740991',mode:'exact'});valid();assert.equal(outputs.main.textContent,'100.00%');
for(const faces of ['',',','1,','1,,2','1,word,2','NaN','Infinity','1e309','.5','9007199254740992',Array(31).fill(1).join(',')]){run({faces});invalid('faces')}
for(const dice of ['',0,-1,.5,21,'Infinity','1e309','9007199254740992']){run({dice});invalid('dice')}
for(const target of ['',-1,.5,'Infinity','1e309','9007199254740992']){run({target});invalid('target')}
run({mode:'bad'});invalid('mode');
run({faces:Array(30).fill(0).join(','),dice:20});invalid('dice');assert.match(status.textContent,/safe integer range/);
run({faces:'9007199254740991',dice:2});invalid('faces');assert.match(status.textContent,/pool total/);
run({faces:Array.from({length:24},(_,i)=>2**i).join(','),dice:6});invalid('faces');assert.match(status.textContent,/50,000/);
run({faces:Array.from({length:30},(_,i)=>80*i+i*i).join(','),dice:10});invalid('dice');assert.match(status.textContent,/2,000,000/);
run();valid();events.change();valid();
run({faces:''});invalid('faces');buttons.reset.click();valid();assert.equal(outputs.main.textContent,'44.44%');assert(Object.values(fields).every(f=>!f.attrs['aria-invalid']));
console.log(`Custom Dice production handler: ${cases} cases passed, including physical-face enumeration, count/work bounds, change and Reset recovery.`);
