(function(){
"use strict";
const z95=1.959963984540054;
const clean=v=>String(v==null?"":v).trim();
const key=v=>clean(v).toLowerCase().replace(/[\s-]+/g,"_");
const num=v=>{const n=Number(v);return Number.isFinite(n)?n:null};
const pct=v=>`${(v*100).toFixed(1)}%`;
const round=(v,d=1)=>Number(v).toFixed(d);
const esc=v=>String(v==null?"":v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function parseCsv(text){
  const source=String(text||"").replace(/^\uFEFF/,"");
  if(!source.trim()) throw new Error("The CSV is empty.");
  const rows=[];let row=[],field="",quoted=false;
  for(let i=0;i<source.length;i++){
    const ch=source[i];
    if(quoted){
      if(ch==='"'&&source[i+1]==='"'){field+='"';i++}
      else if(ch==='"') quoted=false;
      else field+=ch;
    }else if(ch==='"'&&!field) quoted=true;
    else if(ch===","){row.push(field);field=""}
    else if(ch==="\n"){row.push(field.replace(/\r$/,"") );rows.push(row);row=[];field=""}
    else field+=ch;
  }
  if(quoted) throw new Error("The CSV has an unclosed quoted field.");
  if(field!==""||row.length){row.push(field.replace(/\r$/,"") );rows.push(row)}
  const nonblank=rows.filter(r=>r.some(cell=>clean(cell)!==""));
  if(nonblank.length<2) throw new Error("The CSV needs a header and at least one data row.");
  const headers=nonblank[0].map(key);
  if(headers.some(h=>!h)) throw new Error("Every CSV column needs a header.");
  if(new Set(headers).size!==headers.length) throw new Error("CSV headers must be unique.");
  return nonblank.slice(1).map((cells,index)=>{
    if(cells.length!==headers.length) throw new Error(`Row ${index+2} has ${cells.length} fields; expected ${headers.length}.`);
    const item={_row:index+2};headers.forEach((h,j)=>item[h]=clean(cells[j]));return item;
  });
}

function requireColumns(rows,required){
  const headers=Object.keys(rows[0]||{});
  const missing=required.filter(h=>!headers.includes(h));
  if(missing.length) throw new Error(`Missing required column${missing.length===1?"":"s"}: ${missing.join(", ")}.`);
}
function positive(value,label,allowZero=false){const n=num(value);if(n===null||(allowZero?n<0:n<=0))throw new Error(`${label} must be ${allowZero?"zero or greater":"greater than zero"}.`);return n}
function integer(value,label,min=0){const n=num(value);if(n===null||!Number.isInteger(n)||n<min)throw new Error(`${label} must be a whole number of at least ${min}.`);return n}
function wilson(wins,games){
  const w=integer(wins,"Wins",0),n=integer(games,"Games",1);if(w>n)throw new Error("Wins cannot exceed games.");
  const p=w/n,z2=z95*z95,den=1+z2/n,center=(p+z2/(2*n))/den,margin=z95*Math.sqrt((p*(1-p)+z2/(4*n))/n)/den;
  return {rate:p,low:Math.max(0,center-margin),high:Math.min(1,center+margin)};
}
const mean=values=>values.length?values.reduce((a,b)=>a+b,0)/values.length:0;
const median=values=>{if(!values.length)return 0;const s=[...values].sort((a,b)=>a-b),m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2};
const bool=v=>["1","true","yes","y","win","won","winner"].includes(key(v));
const result=(main,unit,rows,stats,headers,caution)=>({main,unit,rows,stats,headers,caution});

function analyzeWin(input){
  const wins=integer(input.wins,"Wins",0),games=integer(input.games,"Games",1);if(wins>games)throw new Error("Wins cannot exceed games.");
  const target=positive(input.target,"Target win rate",true)/100,tolerance=positive(input.tolerance,"Review tolerance",true)/100;
  if(target>1||tolerance>1)throw new Error("Rates and tolerances cannot exceed 100%.");
  const ci=wilson(wins,games),low=Math.max(0,target-tolerance),high=Math.min(1,target+tolerance);
  let signal="Inside configured band";
  if(ci.high<low)signal="Below configured band";else if(ci.low>high)signal="Above configured band";else if(ci.rate<low||ci.rate>high)signal="Observed rate outside; interval overlaps";
  const next=ci.low>=low&&ci.high<=high?"The whole 95% interval is inside your review band.":"Collect more comparable games or inspect the conditions behind this result; interval overlap is not proof of balance.";
  return result(signal,`${wins} wins in ${games} games`,[
    ["Observed win rate",pct(ci.rate),"—"],
    ["95% Wilson interval",`${pct(ci.low)}–${pct(ci.high)}`,ci.high-ci.low>.25?"Wide interval":""],
    ["Configured review band",`${pct(low)}–${pct(high)}`,"Creator-entered"],
    ["Interpretation",next,"Decision aid"]
  ],{games,groups:1,flags:signal==="Inside configured band"?0:1},["Measure","Result","Note"],"A confidence interval describes uncertainty in this sample. It does not remove version, player-experience, matchup, or recruitment bias.");
}

function analyzeSeat(rows,options={}){
  requireColumns(rows,["game_id","version","player_count","winning_seat","duration_minutes"]);
  const allowed=positive(options.allowed??10,"Allowed deviation",true)/100,minGames=integer(options.minGames??10,"Minimum games per seat",1),groups=new Map();
  rows.forEach(r=>{
    const pc=integer(r.player_count,`Row ${r._row} player_count`,2),seat=integer(r.winning_seat,`Row ${r._row} winning_seat`,1);positive(r.duration_minutes,`Row ${r._row} duration_minutes`);
    if(seat>pc)throw new Error(`Row ${r._row} winning_seat cannot exceed player_count.`);
    const groupKey=`${r.version||"(blank)"}|${pc}`;if(!groups.has(groupKey))groups.set(groupKey,{version:r.version||"(blank)",pc,games:0,wins:Array(pc).fill(0)});const g=groups.get(groupKey);g.games++;g.wins[seat-1]++;
  });
  const output=[];let flags=0;
  groups.forEach(g=>{const expected=1/g.pc;g.wins.forEach((wins,i)=>{const ci=wilson(wins,g.games),enough=g.games>=minGames,out=ci.high<expected-allowed||ci.low>expected+allowed;const status=!enough?"More evidence needed":out?"Review signal":"Interval overlaps review band";if(!enough||out)flags++;output.push([g.version,String(g.pc),`Seat ${i+1}`,String(wins),String(g.games),pct(ci.rate),`${pct(ci.low)}–${pct(ci.high)}`,status])})});
  return result(flags?"Review the flagged seat groups":"No configured seat signal",`${rows.length} recorded games across ${groups.size} version / player-count groups`,output,{games:rows.length,groups:groups.size,flags},["Version","Players","Seat","Wins","Games","Rate","95% interval","Status"],"Each seat is compared with an equal-seat baseline for that player count. Use the minimum-game and deviation settings as review rules, not universal balance standards.");
}

function analyzeMatchups(rows,options={}){
  requireColumns(rows,["game_id","version","faction_a","faction_b","winner","duration_minutes"]);
  const allowed=positive(options.allowed??10,"Allowed deviation",true)/100,minGames=integer(options.minGames??8,"Minimum decisive games",1),groups=new Map();
  rows.forEach(r=>{
    positive(r.duration_minutes,`Row ${r._row} duration_minutes`);const a=clean(r.faction_a),b=clean(r.faction_b),winner=clean(r.winner);if(!a||!b)throw new Error(`Row ${r._row} needs both faction names.`);if(key(a)===key(b))throw new Error(`Row ${r._row} must compare two different factions.`);
    const ordered=[a,b].sort((x,y)=>x.localeCompare(y,undefined,{sensitivity:"base"})),k=`${r.version||"(blank)"}|${key(ordered[0])}|${key(ordered[1])}`;if(!groups.has(k))groups.set(k,{version:r.version||"(blank)",left:ordered[0],right:ordered[1],leftWins:0,rightWins:0,draws:0});const g=groups.get(k);
    if(["draw","tie","tied"].includes(key(winner)))g.draws++;else if(key(winner)===key(g.left))g.leftWins++;else if(key(winner)===key(g.right))g.rightWins++;else throw new Error(`Row ${r._row} winner must match a faction name or be draw.`);
  });
  const output=[];let flags=0;
  groups.forEach(g=>{const decisive=g.leftWins+g.rightWins,ci=decisive?wilson(g.leftWins,decisive):null,enough=decisive>=minGames,out=ci&&(ci.high<.5-allowed||ci.low>.5+allowed),status=!enough?"More evidence needed":out?"Review signal":"Interval overlaps review band";if(!enough||out)flags++;output.push([g.version,`${g.left} vs ${g.right}`,String(decisive),String(g.draws),decisive?pct(ci.rate):"—",ci?`${pct(ci.low)}–${pct(ci.high)}`:"—",status])});
  return result(flags?"Review the flagged matchups":"No configured matchup signal",`${groups.size} normalized matchups from ${rows.length} games`,output,{games:rows.length,groups:groups.size,flags},["Version","Matchup","Decisive","Draws",`First-listed win rate`,"95% interval","Status"],"Faction order is normalized so reversed CSV rows join the same matchup. Confidence intervals use decisive games; draws remain visible and should be interpreted separately.");
}

function analyzePlayerCounts(rows,options={}){
  requireColumns(rows,["game_id","version","player_count","duration_minutes","score_spread"]);
  const threshold=positive(options.threshold??20,"Review threshold",true)/100,minGames=integer(options.minGames??5,"Minimum games per count",1),groups=new Map();
  rows.forEach(r=>{const pc=integer(r.player_count,`Row ${r._row} player_count`,1),duration=positive(r.duration_minutes,`Row ${r._row} duration_minutes`),spread=positive(r.score_spread,`Row ${r._row} score_spread`,true),k=`${r.version||"(blank)"}|${pc}`;if(!groups.has(k))groups.set(k,{version:r.version||"(blank)",pc,durations:[],spreads:[]});groups.get(k).durations.push(duration);groups.get(k).spreads.push(spread)});
  const byVersion=new Map();groups.forEach(g=>{if(!byVersion.has(g.version))byVersion.set(g.version,[]);byVersion.get(g.version).push(g)});const output=[];let flags=0;
  byVersion.forEach(list=>{list.sort((a,b)=>a.pc-b.pc);const requested=integer(options.baseline??list[0].pc,"Baseline player count",1),base=list.find(g=>g.pc===requested)||list[0],baseDuration=mean(base.durations),baseSpread=mean(base.spreads);list.forEach(g=>{const durationDelta=baseDuration?mean(g.durations)/baseDuration-1:0,spreadDelta=baseSpread?mean(g.spreads)/baseSpread-1:0,enough=g.durations.length>=minGames,out=Math.abs(durationDelta)>threshold||Math.abs(spreadDelta)>threshold,status=!enough?"More evidence needed":out?"Review signal":"Within configured change band";if(!enough||out)flags++;output.push([g.version,String(g.pc),String(g.durations.length),round(mean(g.durations)),round(median(g.durations)),round(mean(g.spreads)),`${durationDelta>=0?"+":""}${round(durationDelta*100)}%`,`${spreadDelta>=0?"+":""}${round(spreadDelta*100)}%`,status])})});
  return result(flags?"Review the flagged player counts":"No configured player-count signal",`${groups.size} version / player-count groups from ${rows.length} games`,output,{games:rows.length,groups:groups.size,flags},["Version","Players","Games","Avg min","Median min","Avg spread","Time vs base","Spread vs base","Status"],"Relative changes are descriptive, not causal. If the requested baseline is absent for a version, that version uses its lowest recorded player count and shows the actual comparison in the table.");
}

function analyzeScorePaths(rows,options={}){
  requireColumns(rows,["game_id","player_id","won","total_score","category","points"]);
  const shareThreshold=positive(options.shareThreshold??40,"Category share threshold",true)/100,liftThreshold=positive(options.liftThreshold??25,"Winner lift threshold",true)/100,minPlayers=integer(options.minPlayers??8,"Minimum players",1),players=new Map();
  rows.forEach(r=>{const id=`${r.game_id}|${r.player_id}`,total=positive(r.total_score,`Row ${r._row} total_score`,true),points=positive(r.points,`Row ${r._row} points`,true),category=clean(r.category);if(!category)throw new Error(`Row ${r._row} category is blank.`);if(!players.has(id))players.set(id,{game:r.game_id,player:r.player_id,won:bool(r.won),total,categories:new Map()});const p=players.get(id);if(Math.abs(p.total-total)>.0001)throw new Error(`Rows for ${id} disagree on total_score.`);p.won=p.won||bool(r.won);p.categories.set(category,(p.categories.get(category)||0)+points)});
  const cats=new Map();players.forEach(p=>p.categories.forEach((points,category)=>{if(!cats.has(category))cats.set(category,{points:0,all:[],winners:[]});const c=cats.get(category);c.points+=points;c.all.push(points);if(p.won)c.winners.push(points)}));const allCategoryPoints=[...cats.values()].reduce((s,c)=>s+c.points,0);const enough=players.size>=minPlayers,output=[];let flags=0;
  cats.forEach((c,category)=>{const share=allCategoryPoints?c.points/allCategoryPoints:0,allAvg=mean(c.all),winnerAvg=mean(c.winners),lift=allAvg?winnerAvg/allAvg-1:0,out=share>shareThreshold||Math.abs(lift)>liftThreshold,status=!enough?"More evidence needed":out?"Review signal":"Within configured review bands";if(!enough||out)flags++;output.push([category,pct(share),round(allAvg),c.winners.length?round(winnerAvg):"—",c.winners.length?`${lift>=0?"+":""}${round(lift*100)}%`:"—",status])});output.sort((a,b)=>parseFloat(b[1])-parseFloat(a[1]));
  const games=new Set([...players.values()].map(p=>p.game)).size;
  return result(flags?"Review the flagged score paths":"No configured score-path signal",`${players.size} player results across ${games} games`,output,{games,groups:cats.size,flags},["Category","Point share","Avg / player","Avg / winner","Winner lift","Status"],"Category share uses the category-point rows supplied. Winner lift is association, not proof that a category causes winning; game version, player skill, and correlated strategies can explain the same pattern.");
}

const samples={
  seat:`game_id,version,player_count,winning_seat,duration_minutes\nG01,0.8,2,1,42\nG02,0.8,2,1,38\nG03,0.8,2,2,44\nG04,0.8,2,1,40\nG05,0.8,2,2,46\nG06,0.8,2,1,41\nG07,0.8,2,1,39\nG08,0.8,2,2,43\nG09,0.8,2,1,37\nG10,0.8,2,2,45\nG11,0.8,2,1,42\nG12,0.8,2,1,40`,
  matchup:`game_id,version,faction_a,faction_b,winner,duration_minutes\nG01,0.8,Ember,Tide,Ember,55\nG02,0.8,Tide,Ember,Tide,51\nG03,0.8,Ember,Tide,Ember,57\nG04,0.8,Tide,Ember,draw,54\nG05,0.8,Ember,Tide,Ember,52\nG06,0.8,Tide,Ember,Ember,56\nG07,0.8,Ember,Tide,Tide,49\nG08,0.8,Tide,Ember,Ember,58\nG09,0.8,Ember,Tide,Ember,53\nG10,0.8,Tide,Ember,Tide,50`,
  count:`game_id,version,player_count,duration_minutes,score_spread\nG01,0.8,2,42,8\nG02,0.8,2,46,10\nG03,0.8,2,44,9\nG04,0.8,3,58,12\nG05,0.8,3,62,15\nG06,0.8,3,60,14\nG07,0.8,4,79,18\nG08,0.8,4,83,20\nG09,0.8,4,81,19`,
  score:`game_id,player_id,won,total_score,category,points\nG01,P1,yes,62,Objectives,32\nG01,P1,yes,62,Engine,20\nG01,P1,yes,62,Bonuses,10\nG01,P2,no,51,Objectives,22\nG01,P2,no,51,Engine,21\nG01,P2,no,51,Bonuses,8\nG02,P3,no,48,Objectives,19\nG02,P3,no,48,Engine,20\nG02,P3,no,48,Bonuses,9\nG02,P4,yes,66,Objectives,35\nG02,P4,yes,66,Engine,21\nG02,P4,yes,66,Bonuses,10\nG03,P5,no,55,Objectives,24\nG03,P5,no,55,Engine,22\nG03,P5,no,55,Bonuses,9\nG03,P6,yes,64,Objectives,34\nG03,P6,yes,64,Engine,19\nG03,P6,yes,64,Bonuses,11\nG04,P7,no,50,Objectives,21\nG04,P7,no,50,Engine,20\nG04,P7,no,50,Bonuses,9\nG04,P8,yes,68,Objectives,37\nG04,P8,yes,68,Engine,20\nG04,P8,yes,68,Bonuses,11`
};

function reportHtml(data){
  const head=data.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join("");
  const body=data.rows.map(row=>`<tr>${row.map((cell,i)=>`<td${i===row.length-1?` class="${String(cell).includes("Review")?"signal-review":String(cell).includes("evidence")?"signal-evidence":"signal-clear"}"`:""}>${esc(cell)}</td>`).join("")}</tr>`).join("");
  return `<section class="report-section"><h3>Analysis table</h3><div class="report-table-wrap"><table class="report-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div><p class="analysis-caution">${esc(data.caution)}</p></section>`;
}
function reportText(data){return [data.main,data.unit,"",data.headers.join("\t"),...data.rows.map(r=>r.join("\t")),"",data.caution].join("\n")}
function setup(){
  document.querySelectorAll("form[data-balance-tool]").forEach(form=>{
    const tool=form.dataset.balanceTool,file=form.querySelector('input[type="file"]'),name=form.querySelector(".file-name"),panel=form.closest(".calc-shell").querySelector(".result-panel"),copy=panel.querySelector(".copy-report"),print=panel.querySelector(".print-report");let loaded="",last="";
    const setFile=(text,label)=>{loaded=text;if(name)name.textContent=label};
    if(file){file.addEventListener("change",async()=>{const chosen=file.files[0];if(!chosen){setFile("","No file selected.");return}setFile(await chosen.text(),chosen.name)});const zone=file.closest(".file-zone");["dragenter","dragover"].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();zone.classList.add("is-dragging")}));["dragleave","drop"].forEach(type=>zone.addEventListener(type,e=>{e.preventDefault();zone.classList.remove("is-dragging")}));zone.addEventListener("drop",async e=>{const chosen=e.dataTransfer.files[0];if(chosen){setFile(await chosen.text(),chosen.name)}})}
    form.querySelector(".sample-button")?.addEventListener("click",()=>setFile(samples[tool],"Loaded built-in sample.csv"));
    form.querySelector(".clear-file")?.addEventListener("click",()=>{if(file)file.value="";setFile("","No file selected.")});
    const render=data=>{panel.querySelector('[data-result="main"]').textContent=data.main;panel.querySelector('[data-result="unit"]').textContent=data.unit;panel.querySelector('[data-stat="games"]').textContent=data.stats.games;panel.querySelector('[data-stat="groups"]').textContent=data.stats.groups;panel.querySelector('[data-stat="flags"]').textContent=data.stats.flags;panel.querySelector("[data-report]").innerHTML=reportHtml(data);last=reportText(data);copy.disabled=false};
    const fail=error=>{panel.querySelector('[data-result="main"]').textContent="Check the inputs";panel.querySelector('[data-result="unit"]').textContent=error.message;panel.querySelector("[data-report]").innerHTML="";["games","groups","flags"].forEach(k=>panel.querySelector(`[data-stat="${k}"]`).textContent="0");last="";copy.disabled=true};
    form.addEventListener("submit",e=>{e.preventDefault();try{const fd=new FormData(form);let data;if(tool==="win")data=analyzeWin({wins:fd.get("wins"),games:fd.get("games"),target:fd.get("target"),tolerance:fd.get("tolerance")});else{if(!loaded)throw new Error("Choose a CSV file or load the built-in sample first.");const rows=parseCsv(loaded);if(tool==="seat")data=analyzeSeat(rows,{allowed:fd.get("allowed"),minGames:fd.get("min_games")});if(tool==="matchup")data=analyzeMatchups(rows,{allowed:fd.get("allowed"),minGames:fd.get("min_games")});if(tool==="count")data=analyzePlayerCounts(rows,{baseline:fd.get("baseline"),threshold:fd.get("threshold"),minGames:fd.get("min_games")});if(tool==="score")data=analyzeScorePaths(rows,{shareThreshold:fd.get("share_threshold"),liftThreshold:fd.get("lift_threshold"),minPlayers:fd.get("min_players")})}render(data)}catch(error){fail(error)}});
    form.querySelector(".reset")?.addEventListener("click",()=>{form.reset();if(file)file.value="";setFile("","No file selected.");panel.querySelector('[data-result="main"]').textContent="Ready";panel.querySelector('[data-result="unit"]').textContent="Enter results or load a local CSV to begin.";panel.querySelector("[data-report]").innerHTML="";["games","groups","flags"].forEach(k=>panel.querySelector(`[data-stat="${k}"]`).textContent="0");last="";copy.disabled=true});
    copy.addEventListener("click",async()=>{if(!last)return;await navigator.clipboard.writeText(last);copy.textContent="Copied";setTimeout(()=>copy.textContent="Copy report",1200)});print.addEventListener("click",()=>window.print());
    if(tool==="win")form.requestSubmit();
  });
}
const API={parseCsv,wilson,analyzeWin,analyzeSeat,analyzeMatchups,analyzePlayerCounts,analyzeScorePaths};
if(typeof module!=="undefined"&&module.exports)module.exports=API;
if(typeof window!=="undefined")window.TMLBalanceAnalysis=API;
if(typeof document!=="undefined"){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup);else setup()}
})();
