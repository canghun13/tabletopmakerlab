(function(){
"use strict";
const clean=value=>String(value==null?"":value).trim();
const key=value=>clean(value).toLowerCase().replace(/[\s-]+/g,"_");
const number=value=>{const parsed=Number(value);return Number.isFinite(parsed)?parsed:null};
const integer=(value,label,min=0)=>{const parsed=number(value);if(parsed===null||!Number.isInteger(parsed)||parsed<min)throw new Error(`${label} must be a whole number of at least ${min}.`);return parsed};
const positive=(value,label,allowZero=true)=>{const parsed=number(value);if(parsed===null||(allowZero?parsed<0:parsed<=0))throw new Error(`${label} must be ${allowZero?"zero or greater":"greater than zero"}.`);return parsed};
const percent=(value,label)=>{const parsed=positive(value,label);if(parsed>100)throw new Error(`${label} cannot exceed 100%.`);return parsed};
const escapeHtml=value=>String(value==null?"":value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const currencyCode=value=>{const code=clean(value||"USD").toUpperCase();if(!/^[A-Z]{3}$/.test(code))throw new Error("Currency must be a three-letter code such as USD, EUR, GBP, CAD, or AUD.");return code};
const money=(value,currency="USD")=>{try{return new Intl.NumberFormat(undefined,{style:"currency",currency,minimumFractionDigits:2,maximumFractionDigits:2}).format(value)}catch{return `${currency} ${Number(value).toFixed(2)}`}};
const fixed=(value,digits=2)=>Number(value).toFixed(digits);

function parseCsv(text){
  const source=String(text||"").replace(/^\uFEFF/,"");
  if(!source.trim())throw new Error("The CSV is empty.");
  const raw=[];let row=[],field="",quoted=false;
  for(let index=0;index<source.length;index++){
    const char=source[index];
    if(quoted){
      if(char==='"'&&source[index+1]==='"'){field+='"';index++}
      else if(char==='"')quoted=false;
      else field+=char;
    }else if(char==='"'&&!field)quoted=true;
    else if(char===","){row.push(field);field=""}
    else if(char==="\n"){row.push(field.replace(/\r$/,"") );raw.push(row);row=[];field=""}
    else field+=char;
  }
  if(quoted)throw new Error("The CSV has an unclosed quoted field.");
  if(field!==""||row.length){row.push(field.replace(/\r$/,"") );raw.push(row)}
  const rows=raw.filter(candidate=>candidate.some(cell=>clean(cell)!==""));
  if(rows.length<2)throw new Error("The CSV needs a header and at least one data row.");
  const headers=rows[0].map(key);
  if(headers.some(header=>!header))throw new Error("Every CSV column needs a header.");
  if(new Set(headers).size!==headers.length)throw new Error("CSV headers must be unique.");
  return rows.slice(1).map((cells,index)=>{
    if(cells.length!==headers.length)throw new Error(`Row ${index+2} has ${cells.length} fields; expected ${headers.length}.`);
    const item={_row:index+2};headers.forEach((header,column)=>item[header]=clean(cells[column]));return item;
  });
}
function requireColumns(rows,required){
  const headers=Object.keys(rows[0]||{});
  const missing=required.filter(header=>!headers.includes(header));
  if(missing.length)throw new Error(`Missing required column${missing.length===1?"":"s"}: ${missing.join(", ")}.`);
}
function signed(value,label){const parsed=number(value);if(parsed===null)throw new Error(`${label} must be a number.`);return parsed}
function signedInteger(value,label){const parsed=number(value);if(parsed===null||!Number.isInteger(parsed))throw new Error(`${label} must be a whole number.`);return parsed}

function analyzeStatementBuilder(rows,options={}){
  requireColumns(rows,["description","units_sold","units_returned","royalty_base","rate_percent"]);
  const currency=currencyCode(options.currency),output=[];let sold=0,returns=0,earned=0,negativeLines=0;
  rows.forEach(item=>{
    const description=clean(item.description);if(!description)throw new Error(`Row ${item._row} description is blank.`);
    const unitsSold=integer(item.units_sold,`Row ${item._row} units_sold`),unitsReturned=integer(item.units_returned,`Row ${item._row} units_returned`),base=positive(item.royalty_base,`Row ${item._row} royalty_base`),rate=percent(item.rate_percent,`Row ${item._row} rate_percent`);
    const netUnits=unitsSold-unitsReturned,lineRoyalty=netUnits*base*rate/100;if(netUnits<0)negativeLines++;
    sold+=unitsSold;returns+=unitsReturned;earned+=lineRoyalty;
    output.push([item.channel||"—",item.sku||"—",description,String(unitsSold),String(unitsReturned),String(netUnits),money(base,currency),`${fixed(rate)}%`,money(lineRoyalty,currency)]);
  });
  return {main:money(earned,currency),unit:`earned royalty across ${rows.length} statement lines`,stats:{a:String(sold-returns),b:String(rows.length),c:String(negativeLines)},headers:["Channel","SKU","Description","Sold","Returned","Net units","Base / unit","Rate","Earned royalty"],rows:output,caution:"This statement builder applies only the bases and rates supplied in the CSV. It does not decide which sales, deductions, returns, taxes, or channels a contract permits."};
}

function analyzeStatementReconciler(rows,options={}){
  requireColumns(rows,["line_id","description","units","royalty_base","rate_percent","reported_royalty"]);
  const currency=currencyCode(options.currency),tolerance=positive(options.tolerance??0.01,"Variance tolerance"),output=[];let expectedTotal=0,reportedTotal=0,flags=0;
  rows.forEach(item=>{
    const id=clean(item.line_id),description=clean(item.description);if(!id||!description)throw new Error(`Row ${item._row} needs line_id and description.`);
    const units=signedInteger(item.units,`Row ${item._row} units`),base=positive(item.royalty_base,`Row ${item._row} royalty_base`),rate=percent(item.rate_percent,`Row ${item._row} rate_percent`),reported=signed(item.reported_royalty,`Row ${item._row} reported_royalty`);
    const expected=units*base*rate/100,variance=reported-expected,flag=Math.abs(variance)>tolerance;if(flag)flags++;
    expectedTotal+=expected;reportedTotal+=reported;
    output.push([id,description,String(units),money(base,currency),`${fixed(rate)}%`,money(expected,currency),money(reported,currency),money(variance,currency),flag?"Review":"Within tolerance"]);
  });
  const variance=reportedTotal-expectedTotal;
  return {main:flags?`${flags} review flag${flags===1?"":"s"}`:"All lines within tolerance",unit:`total variance ${money(variance,currency)}`,stats:{a:money(expectedTotal,currency),b:money(reportedTotal,currency),c:String(flags)},headers:["Line","Description","Units","Base","Rate","Expected","Reported","Variance","Status"],rows:output,caution:"A variance shows that the entered arithmetic differs. Confirm the contract definition, sales period, returns, and permitted deductions before treating it as an underpayment or overpayment."};
}

function analyzeTiered(input){
  const currency=currencyCode(input.currency),prior=integer(input.prior_units,"Prior cumulative units"),current=integer(input.current_units,"Current-period net units"),base=positive(input.royalty_base,"Royalty base per unit"),limit1=integer(input.tier1_limit,"Tier 1 upper limit",1),limit2=integer(input.tier2_limit,"Tier 2 upper limit",1),rate1=percent(input.tier1_rate,"Tier 1 rate"),rate2=percent(input.tier2_rate,"Tier 2 rate"),rate3=percent(input.tier3_rate,"Tier 3 rate");
  if(limit2<=limit1)throw new Error("Tier 2 upper limit must be greater than the Tier 1 upper limit.");
  const start=prior,end=prior+current;
  const bands=[{label:`Tier 1: units 1–${limit1}`,low:0,high:limit1,rate:rate1},{label:`Tier 2: units ${limit1+1}–${limit2}`,low:limit1,high:limit2,rate:rate2},{label:`Tier 3: units ${limit2+1}+`,low:limit2,high:Infinity,rate:rate3}];
  let total=0;const rows=bands.map(band=>{const units=Math.max(0,Math.min(end,band.high)-Math.max(start,band.low)),royalty=units*base*band.rate/100;total+=royalty;return [band.label,String(units),`${fixed(band.rate)}%`,money(base,currency),money(royalty,currency)]});
  const blended=current&&base?total/(current*base)*100:0;
  return {main:money(total,currency),unit:`earned on ${current} current-period units`,stats:{a:String(prior),b:String(end),c:`${fixed(blended)}%`},headers:["Contract band","Current units in band","Rate","Base / unit","Earned royalty"],rows,caution:"This recalculator treats thresholds as cumulative net-unit bands and allocates the current period across any crossed breakpoint. Use the threshold convention written in the agreement."};
}

function analyzeSublicense(rows,options={}){
  requireColumns(rows,["deal","territory","language","gross_receipts","allowed_deductions","share_percent","reported_royalty"]);
  const currency=currencyCode(options.currency),tolerance=positive(options.tolerance??0.01,"Variance tolerance"),output=[];let expectedTotal=0,reportedTotal=0,flags=0;
  rows.forEach(item=>{
    const deal=clean(item.deal),territory=clean(item.territory),language=clean(item.language);if(!deal||!territory||!language)throw new Error(`Row ${item._row} needs deal, territory, and language.`);
    const gross=positive(item.gross_receipts,`Row ${item._row} gross_receipts`),deductions=positive(item.allowed_deductions,`Row ${item._row} allowed_deductions`),share=percent(item.share_percent,`Row ${item._row} share_percent`),reported=signed(item.reported_royalty,`Row ${item._row} reported_royalty`);
    if(deductions>gross)throw new Error(`Row ${item._row} allowed_deductions cannot exceed gross_receipts.`);
    const net=gross-deductions,expected=net*share/100,variance=reported-expected,flag=Math.abs(variance)>tolerance;if(flag)flags++;
    expectedTotal+=expected;reportedTotal+=reported;
    output.push([deal,territory,language,money(gross,currency),money(deductions,currency),money(net,currency),`${fixed(share)}%`,money(expected,currency),money(reported,currency),money(variance,currency),flag?"Review":"Within tolerance"]);
  });
  return {main:flags?`${flags} review flag${flags===1?"":"s"}`:"All deals within tolerance",unit:`expected share ${money(expectedTotal,currency)} · reported ${money(reportedTotal,currency)}`,stats:{a:String(rows.length),b:money(expectedTotal,currency),c:String(flags)},headers:["Deal","Territory","Language","Gross receipts","Deductions","Entered net","Share","Expected","Reported","Variance","Status"],rows:output,caution:"The tool does not determine whether a deduction or percentage is contractually allowed. It only applies the values entered for each sublicense receipt."};
}

function analyzeReserve(input){
  const currency=currencyCode(input.currency),opening=positive(input.opening_reserve,"Opening reserve"),earned=positive(input.current_earned,"Current-period earned royalty"),holdbackRate=percent(input.holdback_rate,"Current holdback rate"),reversals=positive(input.return_reversals,"Royalty reversals from actual returns"),release=positive(input.reserve_release,"Additional reserve release");
  const applied=Math.min(opening,reversals),uncovered=reversals-applied,available=opening-applied;
  if(release>available)throw new Error(`Additional reserve release cannot exceed the ${money(available,currency)} remaining after return reversals.`);
  const currentHoldback=earned*holdbackRate/100,settlement=earned-currentHoldback-uncovered+release,closing=opening-applied-release+currentHoldback;
  const rows=[
    ["Opening reserve","Balance brought into the period",money(opening,currency)],
    ["Return reversals applied","Covered from opening reserve",money(-applied,currency)],
    ["Additional release","Released into this period's settlement",money(-release,currency)],
    ["Current holdback",`${fixed(holdbackRate)}% of current earned royalty`,money(currentHoldback,currency)],
    ["Closing reserve","Opening − applied − released + new holdback",money(closing,currency)]
  ];
  return {main:money(settlement,currency),unit:"period settlement before contract-specific carry or payment rules",stats:{a:money(opening,currency),b:money(applied,currency),c:money(closing,currency)},headers:["Movement","Method","Reserve effect"],rows,caution:`Uncovered return reversals are ${money(uncovered,currency)}. A negative settlement may be carried forward rather than collected; follow the agreement and accounting policy.`};
}

function parseDate(value,label,allowBlank=false){
  const text=clean(value);if(!text&&allowBlank)return null;if(!/^\d{4}-\d{2}-\d{2}$/.test(text))throw new Error(`${label} must use YYYY-MM-DD.`);
  const date=new Date(`${text}T00:00:00Z`);if(Number.isNaN(date.getTime())||date.toISOString().slice(0,10)!==text)throw new Error(`${label} is not a valid date.`);return date;
}
const dateText=date=>date?date.toISOString().slice(0,10):"—";
const daysBetween=(from,to)=>Math.round((to-from)/86400000);
function timingStatus(due,received,asOf){
  if(received){const difference=daysBetween(due,received);return {label:difference>0?`Late by ${difference} day${difference===1?"":"s"}`:difference<0?`${Math.abs(difference)} day${Math.abs(difference)===1?"":"s"} early`:"On due date",flag:difference>0}}
  const difference=daysBetween(due,asOf);return difference>0?{label:`Missing · ${difference} day${difference===1?"":"s"} overdue`,flag:true}:{label:"Pending",flag:false};
}
function analyzeSchedule(rows,options={}){
  requireColumns(rows,["period","statement_due","statement_received","payment_due","payment_received"]);
  const asOf=parseDate(options.asOf||new Date().toISOString().slice(0,10),"As-of date"),output=[];let lateStatements=0,latePayments=0,missing=0;
  rows.forEach(item=>{
    const period=clean(item.period);if(!period)throw new Error(`Row ${item._row} period is blank.`);
    const statementDue=parseDate(item.statement_due,`Row ${item._row} statement_due`),statementReceived=parseDate(item.statement_received,`Row ${item._row} statement_received`,true),paymentDue=parseDate(item.payment_due,`Row ${item._row} payment_due`),paymentReceived=parseDate(item.payment_received,`Row ${item._row} payment_received`,true);
    const statement=timingStatus(statementDue,statementReceived,asOf),payment=timingStatus(paymentDue,paymentReceived,asOf);if(statement.flag)lateStatements++;if(payment.flag)latePayments++;if((!statementReceived&&asOf>statementDue)||(!paymentReceived&&asOf>paymentDue))missing++;
    output.push([period,dateText(statementDue),dateText(statementReceived),statement.label,dateText(paymentDue),dateText(paymentReceived),payment.label,statement.flag||payment.flag?"Review":"Current"]);
  });
  const flags=lateStatements+latePayments;
  return {main:flags?`${flags} timing flag${flags===1?"":"s"}`:"No late items",unit:`checked as of ${dateText(asOf)}`,stats:{a:String(rows.length),b:String(lateStatements),c:String(latePayments)},headers:["Period","Statement due","Received","Statement status","Payment due","Paid","Payment status","Review"],rows:output,caution:`Dates and deadlines come entirely from the CSV. “Missing” counts overdue blank receipts or payments (${missing} in this run); the tool does not infer any legal reporting deadline.`};
}

const samples={
  builder:`channel,sku,description,units_sold,units_returned,royalty_base,rate_percent\nDistributor,TL-BASE,Base game wholesale sales,820,24,18.00,6\nDirect,TL-BASE,Base game direct sales,115,3,40.00,3\nDistributor,TL-DELUXE,Deluxe edition wholesale sales,210,6,29.00,6\nConvention,TL-BASE,Convention sales,46,0,40.00,3`,
  reconcile:`line_id,description,units,royalty_base,rate_percent,reported_royalty\nL001,Base game wholesale sales,796,18.00,6,859.68\nL002,Base game direct sales,112,40.00,3,134.40\nL003,Deluxe wholesale sales,204,29.00,6,354.00\nL004,Prior-period return adjustment,-10,18.00,6,-10.80`,
  sublicense:`deal,territory,language,gross_receipts,allowed_deductions,share_percent,reported_royalty\nNorthstar DE,Germany,German,12500,500,35,4200\nMaple Edition,Canada,French,8200,200,30,2350\nIberia License,Spain,Spanish,6100,100,33,1980`,
  schedule:`period,statement_due,statement_received,payment_due,payment_received\n2026 Q1,2026-04-30,2026-04-28,2026-05-15,2026-05-15\n2026 Q2,2026-07-31,2026-08-04,2026-08-15,2026-08-18\n2026 Q3,2026-10-31,,2026-11-15,\n2026 Q4,2027-01-31,,2027-02-15,`
};

function reportHtml(data){
  const head=data.headers.map(header=>`<th scope="col">${escapeHtml(header)}</th>`).join("");
  const body=data.rows.map(row=>`<tr>${row.map((cell,index)=>`<td${index===row.length-1?` class="${/Review|Late|Missing/.test(String(cell))?"signal-review":/tolerance|Current/.test(String(cell))?"signal-clear":""}"`:""}>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("");
  return `<section class="report-section"><h3>Working table</h3><div class="report-table-wrap"><table class="report-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div><p class="analysis-caution">${escapeHtml(data.caution)}</p></section>`;
}
function reportText(data){return [data.main,data.unit,"",data.headers.join("\t"),...data.rows.map(row=>row.join("\t")),"",data.caution].join("\n")}
function setup(){
  document.querySelectorAll("form[data-royalty-tool]").forEach(form=>{
    const tool=form.dataset.royaltyTool,file=form.querySelector('input[type="file"]'),fileName=form.querySelector(".file-name"),shell=form.closest(".calc-shell"),panel=shell.querySelector(".result-panel"),copy=panel.querySelector(".copy-report"),print=panel.querySelector(".print-report");let loaded="",last="";
    const setFile=(content,label)=>{loaded=content;if(fileName)fileName.textContent=label};
    if(file){
      file.addEventListener("change",async()=>{const chosen=file.files[0];if(!chosen){setFile("","No file selected.");return}setFile(await chosen.text(),chosen.name)});
      const zone=file.closest(".file-zone");["dragenter","dragover"].forEach(type=>zone.addEventListener(type,event=>{event.preventDefault();zone.classList.add("is-dragging")}));["dragleave","drop"].forEach(type=>zone.addEventListener(type,event=>{event.preventDefault();zone.classList.remove("is-dragging")}));zone.addEventListener("drop",async event=>{const chosen=event.dataTransfer.files[0];if(chosen)setFile(await chosen.text(),chosen.name)});
    }
    form.querySelector(".sample-button")?.addEventListener("click",()=>setFile(samples[tool],"Loaded built-in sample.csv"));
    form.querySelector(".clear-file")?.addEventListener("click",()=>{if(file)file.value="";setFile("","No file selected.")});
    const render=data=>{panel.querySelector('[data-result="main"]').textContent=data.main;panel.querySelector('[data-result="unit"]').textContent=data.unit;panel.querySelector('[data-stat="a"]').textContent=data.stats.a;panel.querySelector('[data-stat="b"]').textContent=data.stats.b;panel.querySelector('[data-stat="c"]').textContent=data.stats.c;panel.querySelector("[data-report]").innerHTML=reportHtml(data);last=reportText(data);copy.disabled=false};
    const fail=error=>{panel.querySelector('[data-result="main"]').textContent="Check the inputs";panel.querySelector('[data-result="unit"]').textContent=error.message;panel.querySelector("[data-report]").innerHTML="";["a","b","c"].forEach(stat=>panel.querySelector(`[data-stat="${stat}"]`).textContent="—");last="";copy.disabled=true};
    form.addEventListener("submit",event=>{event.preventDefault();try{const values=Object.fromEntries(new FormData(form));let data;if(["builder","reconcile","sublicense","schedule"].includes(tool)){if(!loaded)throw new Error("Choose a CSV file or load the built-in sample first.");const rows=parseCsv(loaded);if(tool==="builder")data=analyzeStatementBuilder(rows,values);if(tool==="reconcile")data=analyzeStatementReconciler(rows,values);if(tool==="sublicense")data=analyzeSublicense(rows,values);if(tool==="schedule")data=analyzeSchedule(rows,values)}else if(tool==="tiered")data=analyzeTiered(values);else if(tool==="reserve")data=analyzeReserve(values);render(data)}catch(error){fail(error)}});
    form.querySelector(".reset")?.addEventListener("click",()=>{form.reset();if(file)file.value="";setFile("","No file selected.");panel.querySelector('[data-result="main"]').textContent="Ready";panel.querySelector('[data-result="unit"]').textContent="Enter values or load a local CSV to begin.";panel.querySelector("[data-report]").innerHTML="";["a","b","c"].forEach(stat=>panel.querySelector(`[data-stat="${stat}"]`).textContent="—");last="";copy.disabled=true});
    copy.addEventListener("click",async()=>{if(!last)return;try{await navigator.clipboard.writeText(last);copy.textContent="Copied";setTimeout(()=>copy.textContent="Copy report",1200)}catch{copy.textContent="Copy unavailable"}});print.addEventListener("click",()=>window.print());
    if(["tiered","reserve"].includes(tool))form.requestSubmit();
  });
}
const API={parseCsv,analyzeStatementBuilder,analyzeStatementReconciler,analyzeTiered,analyzeSublicense,analyzeReserve,analyzeSchedule};
if(typeof module!=="undefined"&&module.exports)module.exports=API;
if(typeof window!=="undefined")window.TMLRoyaltyClose=API;
if(typeof document!=="undefined"){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup);else setup()}
})();
