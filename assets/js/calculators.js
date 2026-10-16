(()=>{const $=(s,r=document)=>r.querySelector(s),n=(v,d=0)=>{const x=Number(v);return Number.isFinite(x)&&x>=0?x:d},mm=(v)=>`${Math.round(v*10)/10} mm`,vol=(v)=>`${Math.round(v).toLocaleString()} cm³`,set=(r,k,v)=>{const e=$(`[data-result="${k}"]`,r);if(e)e.textContent=v},copy=(r)=>navigator.clipboard?.writeText($('.result-panel',r).innerText).then(()=>status(r,'Results copied.')).catch(()=>status(r,'Copy is unavailable in this browser.',true)),status=(r,t,b=false)=>{const e=$('.status',r);e.textContent=t;e.classList.toggle('error',b)},read=(r,k)=>n($(`[name="${k}"]`,r)?.value),calc={
box(r){const cw=read(r,'card-w'),ch=read(r,'card-h'),count=read(r,'card-count'),ct=read(r,'card-t')+(r.querySelector('[name="sleeved"]').checked?read(r,'sleeve-t')*2:0),cardH=count*ct,dice=read(r,'dice-count')*read(r,'dice-w')*read(r,'dice-h')*read(r,'dice-d')/1000,tokens=read(r,'token-count')*read(r,'token-w')*read(r,'token-h')*read(r,'token-d')/1000,board=read(r,'board-w')*read(r,'board-h')*read(r,'board-d')/1000,allow=read(r,'allowance'),total=(cw*ch*cardH/1000+dice+tokens+board)*(1+allow/100),side=Math.ceil(Math.cbrt(total)*10)/10;set(r,'main',`${side} × ${side} × ${side}`);set(r,'unit','minimum internal cube, cm');set(r,'a',mm(cardH));set(r,'b',vol(total));set(r,'c',`${Math.round(allow)}% planning allowance`);set(r,'d',`${side} cm internal side`);status(r,'Estimate updated from your component assumptions.');},
stack(r){const c=read(r,'card-count'),card=read(r,'card-t'),sleeve=read(r,'sleeve-t'),layers=read(r,'layers'),compress=read(r,'compression'),bare=c*card,full=Math.max(0,c*(card+sleeve*layers)-compress),extra=full-bare,clear=full+read(r,'clearance');set(r,'main',mm(full));set(r,'unit','expected sleeved stack');set(r,'a',mm(bare));set(r,'b',mm(extra));set(r,'c',mm(clear));set(r,'d',`${layers===2?'double':'single'} sleeve model`);status(r,'Add the deck-well clearance to your insert specification.');},
volume(r){const q=read(r,'qty'),shape=$('[name="shape"]',r).value,w=read(r,'w'),h=read(r,'h'),d=read(r,'d'),allow=read(r,'allowance'),one=shape==='cylinder'?Math.PI*(w/2)**2*h/1000:w*h*d/1000,total=one*q,planned=total*(1+allow/100);set(r,'main',vol(planned));set(r,'unit','recommended planning volume');set(r,'a',vol(one));set(r,'b',vol(total));set(r,'c',`${allow}% packing allowance`);set(r,'d',shape==='cylinder'?'cylinder/disc':'cuboid component');status(r,'This is packing volume, not a finished insert layout.');},
punch(r){const bw=read(r,'board-w'),bh=read(r,'board-h'),m=read(r,'margin'),g=read(r,'gutter'),tw=read(r,'token-w'),th=$('[name="shape"]',r).value==='circle'?tw:read(r,'token-h'),boards=read(r,'boards'),cols=Math.max(0,Math.floor((bw-2*m+g)/(tw+g))),rows=Math.max(0,Math.floor((bh-2*m+g)/(th+g))),per=cols*rows,total=per*boards,used=per*tw*th,area=Math.max(0,bw*bh-used);set(r,'main',`${per.toLocaleString()} tokens`);set(r,'unit','per punchboard planning yield');set(r,'a',`${cols} columns × ${rows} rows`);set(r,'b',`${total.toLocaleString()} total tokens`);set(r,'c',`${Math.round(used/(bw*bh)*100)}% face coverage`);set(r,'d',`${Math.round(area).toLocaleString()} mm² unused face area`);status(r,'A die-cut supplier may nest shapes differently; treat this as a planning estimate.');},
sheet(r){
 const fields=[['sheet-w','Sheet width',true],['sheet-h','Sheet height',true],['card-w','Card width',true],['card-h','Card height',true],['bleed','Bleed per edge'],['gutter','Gutter'],['margin','Outer margin'],['need','Cards needed']],values={};
 const actions=(disabled)=>r.querySelectorAll('.copy, .print').forEach(button=>{button.disabled=disabled;});
 const invalid=(message,control)=>{
  r.dataset.sheetState='invalid';
  set(r,'main','Check inputs');set(r,'unit','Sheet estimate unavailable');
  ['a','b','c','d'].forEach(key=>set(r,key,'—'));
  if(control)control.setAttribute('aria-invalid','true');
  actions(true);status(r,message,true);
 };
 fields.forEach(([key])=>$(`[name="${key}"]`,r).removeAttribute('aria-invalid'));
 for(const [key,label,positive] of fields){
  const control=$(`[name="${key}"]`,r),raw=control.value.trim(),value=Number(raw);
  if(!raw||!Number.isFinite(value)||value<0||(positive&&value===0))return invalid(`${label} must be ${positive?'greater than zero':'a finite, non-negative number'}.`,control);
  if(key==='need'&&!Number.isSafeInteger(value))return invalid('Cards needed must be a whole number within the supported numeric range.',control);
  values[key]=value;
 }
 const sw=values['sheet-w'],sh=values['sheet-h'],cw=values['card-w']+values.bleed*2,ch=values['card-h']+values.bleed*2,m=values.margin,g=values.gutter,need=values.need;
 const usableW=sw-2*m,usableH=sh-2*m,area=sw*sh;
 if(![cw,ch,cw+g,ch+g,usableW,usableH,area].every(Number.isFinite)||area<=0)return invalid('Measurements exceed the supported numeric range. Use values closer in scale.');
 // One card needs no following gutter. Check its footprint before dividing.
 const fit=(w,h)=>w>usableW||h>usableH?0:(1+Math.floor((usableW-w)/(w+g)))*(1+Math.floor((usableH-h)/(h+g)));
 const normal=fit(cw,ch),rot=fit(ch,cw),best=Math.max(normal,rot),sheets=best?Math.ceil(need/best):0,used=best*cw*ch,waste=Math.max(0,100-used/area*100);
 if(![normal,rot,sheets].every(Number.isSafeInteger)||![used,waste].every(Number.isFinite))return invalid('Measurements exceed the supported numeric range. Use values closer in scale.');
 r.dataset.sheetState='valid';actions(false);
 set(r,'main',`${best} cards`);set(r,'unit',best?(normal>=rot?'per sheet, normal orientation':'per sheet, rotated orientation'):'no cards fit this layout');
 set(r,'a',`${normal} normal / ${rot} rotated`);
 set(r,'b',best||need===0?`${sheets} sheet${sheets===1?'':'s'} for ${need} cards`:`Not possible for ${need} cards`);
 set(r,'c',`${Math.round(waste)}% estimated unused area`);set(r,'d','bleed is included in footprint');
 status(r,best?'Commercial imposition and finishing requirements can change final yield.':'Neither orientation fits. Increase sheet size or reduce card size, bleed, gutters, or margins.');
}};
document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('[data-calc]').forEach(r=>{const run=()=>calc[r.dataset.calc](r);r.addEventListener('input',run);r.addEventListener('change',run);$('.reset',r)?.addEventListener('click',()=>{r.querySelector('form').reset();run();status(r,'Defaults restored.')});$('.copy',r)?.addEventListener('click',()=>copy(r));$('.print',r)?.addEventListener('click',()=>{window.print()});run()}));})();
