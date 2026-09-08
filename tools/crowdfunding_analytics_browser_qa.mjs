import fs from "node:fs";

const base=process.argv[2]||"http://127.0.0.1:48951";
const debug=process.argv[3]||"http://127.0.0.1:48952";
const target=await (await fetch(`${debug}/json/new?${encodeURIComponent("about:blank")}`,{method:"PUT"})).json();
const socket=new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{socket.addEventListener("open",resolve,{once:true});socket.addEventListener("error",reject,{once:true})});
let nextId=0;const pending=new Map();const events=[];
socket.addEventListener("message",event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const {resolve,reject}=pending.get(message.id);pending.delete(message.id);message.error?reject(new Error(message.error.message)):resolve(message.result)}else events.push(message)});
function send(method,params={}){return new Promise((resolve,reject)=>{const id=++nextId;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})}
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function value(expression){const response=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});if(response.exceptionDetails)throw new Error(response.exceptionDetails.text||"Runtime evaluation failed");return response.result.value}
async function until(expression,timeout=5000){const start=Date.now();while(Date.now()-start<timeout){const found=await value(expression);if(found)return found;await wait(50)}throw new Error(`Timed out: ${expression}`)}
await send("Page.enable");await send("Runtime.enable");await send("Network.enable");
try{await send("Browser.grantPermissions",{origin:base,permissions:["clipboardReadWrite","clipboardSanitizedWrite"]})}catch(_error){}

const widths=[390,768,900,1024,1280,1440];
const pages=[
  "/tools/board-game-crowdfunding-marketing-analytics.html",
  "/tools/kickstarter-prelaunch-audience-planner.html",
  "/tools/kickstarter-follower-growth-tracker.html",
  "/tools/crowdfunding-conversion-funnel-analyzer.html",
  "/tools/kickstarter-referral-performance-comparator.html",
  "/tools/crowdfunding-funding-pace-calculator.html"
];
const regressions=["/","/tools/","/tools/board-game-balance-test-analysis.html","/tools/campaign-profit-scenario-calculator.html"];
const results=[];let consoleErrors=0,consoleWarnings=0,pageErrors=0,internalFailures=0;
function drain(){for(const event of events.splice(0)){if(event.method==="Runtime.exceptionThrown")pageErrors++;if(event.method==="Runtime.consoleAPICalled"){if(event.params.type==="error")consoleErrors++;if(event.params.type==="warning")consoleWarnings++}if(event.method==="Network.loadingFailed"&&String(event.params.canceled)!=="true")internalFailures++}}
async function load(path,width){events.length=0;await send("Emulation.setDeviceMetricsOverride",{width,height:900,deviceScaleFactor:1,mobile:width<=520});await send("Page.navigate",{url:`${base}${path}`});await until("document.readyState==='complete'");await until("document.querySelector('header') && document.querySelector('footer')");await wait(80);drain();return value(`(()=>({path:location.pathname,width:innerWidth,h1:document.querySelectorAll('h1').length,header:document.querySelectorAll('header').length,footer:document.querySelectorAll('footer').length,overflow:Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-document.documentElement.clientWidth,leak:document.body.innerText.includes('.html">'),main:document.querySelector('[data-result="main"]')?.textContent||'',rows:document.querySelectorAll('[data-report] tbody tr').length,canonical:document.querySelector('link[rel="canonical"]')?.href||'',ga:document.documentElement.innerHTML.includes('G-V25YKRCX01'),schema:document.querySelectorAll('script[type="application/ld+json"]').length}))()`) }
for(const path of pages)for(const width of widths){const item=await load(path,width);if(item.width!==width||item.h1!==1||item.header!==1||item.footer!==1||item.overflow>1||item.leak||!item.canonical.startsWith("https://tabletopmakerlab.com/")||!item.ga||item.schema!==1)throw new Error(`Layout failure ${JSON.stringify(item)}`);if(path!==pages[0]&&(!item.main||item.rows<1))throw new Error(`Result not open ${JSON.stringify(item)}`);results.push(item)}
for(const path of regressions)for(const width of [390,1440]){const item=await load(path,width);if(item.h1!==1||item.header!==1||item.footer!==1||item.overflow>1||item.leak)throw new Error(`Regression failure ${JSON.stringify(item)}`);results.push(item)}

const cases={
  "/tools/kickstarter-prelaunch-audience-planner.html":{
    normal:`document.querySelector('[name="goal"]').value='20000';document.querySelector('form').requestSubmit()`,
    boundary:`document.querySelector('[name="goal"]').value='1';document.querySelector('[name="launch_share"]').value='0';document.querySelector('[name="data"]').value='source,audience,low_conversion,high_conversion\\nOwned,0,0,0';document.querySelector('form').requestSubmit()`,
    invalid:`document.querySelector('[name="data"]').value='source,audience,low_conversion,high_conversion\\nOwned,100,30,20';document.querySelector('form').requestSubmit()`},
  "/tools/kickstarter-follower-growth-tracker.html":{
    normal:`document.querySelector('[name="target"]').value='200';document.querySelector('form').requestSubmit()`,
    boundary:`document.querySelector('[name="target"]').value='50';document.querySelector('[name="launch_date"]').value='2026-09-02';document.querySelector('[name="data"]').value='date,source,new_followers,spend\\n2026-09-01,Ads,20,0\\n2026-09-02,Email,30,0';document.querySelector('form').requestSubmit()`,
    invalid:`document.querySelector('[name="data"]').value='date,source,new_followers,spend\\n2026-09-01,Ads,-1,0';document.querySelector('form').requestSubmit()`},
  "/tools/crowdfunding-conversion-funnel-analyzer.html":{
    normal:`document.querySelector('[name="visit_rate"]').value='10';document.querySelector('form').requestSubmit()`,
    boundary:`for(const n of ['visit_rate','lead_rate','follow_rate','backer_rate'])document.querySelector('[name="'+n+'"]').value='0';document.querySelector('[name="data"]').value='channel,impressions,visits,leads,followers,backers\\nOrganic,0,0,0,0,0';document.querySelector('form').requestSubmit()`,
    invalid:`document.querySelector('[name="data"]').value='channel,impressions,visits,leads,followers,backers\\nAds,100,101,20,10,2';document.querySelector('form').requestSubmit()`},
  "/tools/kickstarter-referral-performance-comparator.html":{
    normal:`document.querySelector('[name="currency"]').value='EUR';document.querySelector('form').requestSubmit()`,
    boundary:`document.querySelector('[name="data"]').value='source,spend,clicks,backers,pledged,delivery_cost\\nOrganic,0,0,0,0,0';document.querySelector('form').requestSubmit()`,
    invalid:`document.querySelector('[name="data"]').value='source,spend,clicks,backers,pledged,delivery_cost\\nAds,10,5,6,100,20';document.querySelector('form').requestSubmit()`},
  "/tools/crowdfunding-funding-pace-calculator.html":{
    normal:`document.querySelector('[name="goal"]').value='40000';document.querySelector('form').requestSubmit()`,
    boundary:`document.querySelector('[name="goal"]').value='3000';document.querySelector('[name="end_date"]').value='2026-09-03';document.querySelector('[name="data"]').value='date,cumulative_pledged,cumulative_backers\\n2026-09-01,1000,10\\n2026-09-03,3000,30';document.querySelector('form').requestSubmit()`,
    invalid:`document.querySelector('[name="data"]').value='date,cumulative_pledged,cumulative_backers\\n2026-09-01,1000,10\\n2026-09-02,900,11';document.querySelector('form').requestSubmit()`}
};
const functional=[];
for(const [path,test] of Object.entries(cases)){
  await load(path,1024);const defaultMain=await value("document.querySelector('[data-result=\"main\"]').textContent");
  await value(`(()=>{${test.normal};return true})()`);await wait(50);const normalMain=await value("document.querySelector('[data-result=\"main\"]').textContent");if(!normalMain||normalMain==="Check the inputs")throw new Error(`${path} normal 2 failed`);
  await value(`(()=>{${test.boundary};return true})()`);await wait(50);const boundaryMain=await value("document.querySelector('[data-result=\"main\"]').textContent");if(!boundaryMain||boundaryMain==="Check the inputs")throw new Error(`${path} boundary failed`);
  await value(`(()=>{${test.invalid};return true})()`);await wait(50);if(await value("document.querySelector('[data-result=\"main\"]').textContent")!=="Check the inputs")throw new Error(`${path} invalid failed`);
  await value("document.querySelector('[name=data]').value='';document.querySelector('form').requestSubmit();true");await wait(50);if(await value("document.querySelector('[data-result=\"main\"]').textContent")!=="Check the inputs")throw new Error(`${path} empty failed`);
  await value("document.querySelector('.reset').click();document.querySelector('.sample-button').click();document.querySelector('form').requestSubmit();document.querySelector('form').requestSubmit();true");await wait(50);if(await value("document.querySelectorAll('[data-report] .report-section').length")!==1)throw new Error(`${path} repeat failed`);
  if(await value("document.querySelector('.copy-report').disabled"))throw new Error(`${path} copy stayed disabled`);await value("document.querySelector('.copy-report').click();true");await wait(80);const copyState=await value("document.querySelector('.copy-report').textContent");if(copyState!=="Copied")throw new Error(`${path} copy failed: ${copyState}`);await value("document.querySelector('.print-report').click();true");await wait(30);
  await value("document.querySelector('.reset').click();true");await wait(30);if(await value("document.querySelector('[data-result=\"main\"]').textContent")!=="Ready")throw new Error(`${path} reset failed`);
  functional.push({path,defaultMain,normalMain,boundaryMain,copyState});drain();
}
await load(pages[0],390);const menu=await value(`(()=>{const b=document.querySelector('[data-nav-toggle]');if(!b)return null;b.click();return {expanded:b.getAttribute('aria-expanded'),visible:getComputedStyle(document.querySelector('[data-site-nav]')).display!=='none',overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}})()`);if(!menu||menu.expanded!=="true"||!menu.visible||menu.overflow>1)throw new Error(`Mobile menu failed ${JSON.stringify(menu)}`);
await load(pages[0],390);const shot1=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});fs.writeFileSync("C:/Users/song/AppData/Local/Temp/tml-crowdfunding-hub-390.png",Buffer.from(shot1.data,"base64"));
await load("/tools/crowdfunding-funding-pace-calculator.html",1440);const shot2=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});fs.writeFileSync("C:/Users/song/AppData/Local/Temp/tml-crowdfunding-pace-1440.png",Buffer.from(shot2.data,"base64"));
drain();console.log(JSON.stringify({base,layoutChecks:results.length,functional,menu,consoleErrors,consoleWarnings,pageErrors,internalFailures,screenshots:["C:/Users/song/AppData/Local/Temp/tml-crowdfunding-hub-390.png","C:/Users/song/AppData/Local/Temp/tml-crowdfunding-pace-1440.png"]},null,2));
socket.close();
