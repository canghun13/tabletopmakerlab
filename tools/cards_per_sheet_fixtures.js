// Exercise the production handler with independent grid expectations.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const defaults = {'sheet-w':'700','sheet-h':'500','card-w':'63','card-h':'88',bleed:'3',gutter:'3',margin:'10',need:'360'};
const controls = Object.fromEntries(Object.entries(defaults).map(([key,value])=>[key,{value,attrs:{},setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];}}]));
const result = Object.fromEntries(['main','unit','a','b','c','d'].map(key=>[key,{textContent:''}]));
const status = {textContent:'',error:false,classList:{toggle(_,flag){status.error=flag;}}};
const buttons = Object.fromEntries(['copy','print','reset'].map(name=>[name,{disabled:false,addEventListener(_,fn){this.click=fn;}}]));
const events = {};
const shell = {
  dataset:{calc:'sheet'},
  querySelector(selector){
    const field=selector.match(/^\[name="(.+)"\]$/);
    if(field)return controls[field[1]];
    const output=selector.match(/^\[data-result="(.+)"\]$/);
    if(output)return result[output[1]];
    if(selector==='.status')return status;
    if(selector==='form')return {reset(){Object.entries(defaults).forEach(([k,v])=>{controls[k].value=v;});}};
    return buttons[selector.slice(1)];
  },
  querySelectorAll(selector){assert.equal(selector,'.copy, .print');return [buttons.copy,buttons.print];},
  addEventListener(type,fn){events[type]=fn;}
};
let initialize;
const document={addEventListener(type,fn){assert.equal(type,'DOMContentLoaded');initialize=fn;},querySelectorAll(){return [shell];}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../assets/js/calculators.js'),'utf8'),{document});
initialize();
let cases=0;
const run=(overrides={})=>{Object.entries({...defaults,...overrides}).forEach(([k,v])=>{controls[k].value=String(v);});events.input();cases++;assert(!Object.values(result).some(x=>/NaN|Infinity|undefined/.test(x.textContent)));};
const valid=()=>{assert.equal(shell.dataset.sheetState,'valid');assert(!status.error);assert(!buttons.copy.disabled&&!buttons.print.disabled);};
const invalid=()=>{assert.equal(shell.dataset.sheetState,'invalid');assert(status.error);assert(buttons.copy.disabled&&buttons.print.disabled);assert.equal(result.main.textContent,'Check inputs');for(const k of ['a','b','c','d'])assert.equal(result[k].textContent,'—');};

run();valid();assert.equal(result.main.textContent,'42 cards');assert.equal(result.a.textContent,'36 normal / 42 rotated');assert.equal(result.b.textContent,'9 sheets for 360 cards');assert.equal(result.c.textContent,'22% estimated unused area');
run({'sheet-w':210,'sheet-h':297,bleed:0,gutter:0,margin:0});valid();assert.equal(result.main.textContent,'9 cards');assert.equal(result.a.textContent,'9 normal / 8 rotated');assert.equal(result.b.textContent,'40 sheets for 360 cards');
run({'sheet-w':63,'sheet-h':88,bleed:0,gutter:1000,margin:0,need:1});valid();assert.equal(result.main.textContent,'1 cards');assert.equal(result.b.textContent,'1 sheet for 1 cards');
run({'sheet-w':63,'sheet-h':88.5,'card-h':88.5,bleed:0,gutter:0,margin:0});valid();assert.equal(result.main.textContent,'1 cards');
run({need:0});valid();assert.equal(result.b.textContent,'0 sheets for 0 cards');
run({'card-w':1000});valid();assert.equal(result.main.textContent,'0 cards');assert.equal(result.b.textContent,'Not possible for 360 cards');assert.match(status.textContent,/Neither orientation fits/);
run({margin:1000});valid();assert.equal(result.b.textContent,'Not possible for 360 cards');
run({'card-w':1000,gutter:1e300});valid();assert.equal(result.main.textContent,'0 cards');
run({'card-w':0.00001,'card-h':0.00001,bleed:0,gutter:0,margin:0});valid();assert.equal(result.main.textContent,'3500000000000000 cards');
for(const key of Object.keys(defaults)){
  run({[key]:''});invalid();assert.equal(controls[key].attrs['aria-invalid'],'true');
  run({[key]:-1});invalid();
}
for(const key of ['sheet-w','sheet-h','card-w','card-h']){run({[key]:0});invalid();}
run({'card-w':0,'card-h':0,bleed:0,gutter:0});invalid();
for(const overrides of [{need:0.5},{need:'9007199254740992'},{'sheet-w':'1e309'},{'sheet-w':'1e308'},{'sheet-w':'1e-300','sheet-h':'1e-300'},{'card-w':'1e-200','card-h':'1e-200',bleed:0,gutter:0}]){run(overrides);invalid();}
run();valid();events.change();assert.equal(result.main.textContent,'42 cards');
run({'sheet-w':''});invalid();buttons.reset.click();valid();assert.equal(result.main.textContent,'42 cards');assert(Object.values(controls).every(c=>!c.attrs['aria-invalid']));
console.log(`Cards per Sheet production handler: ${cases} cases passed, plus repeat/change/Reset recovery.`);
