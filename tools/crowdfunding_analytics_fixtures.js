"use strict";
const assert=require("assert");
const api=require("../assets/js/crowdfunding-analytics.js");

const parsed=api.parseCsv('source,note\n"Email, warm","said ""go"""\n');
assert.strictEqual(parsed[0].source,"Email, warm");
assert.strictEqual(parsed[0].note,'said "go"');
assert.throws(()=>api.parseCsv("a,b\n1\n"),/fields/);
assert.throws(()=>api.parseCsv('a,b\n"open,2\n'),/unclosed/);

const audience=api.planAudience(api.parseCsv("source,audience,low_conversion,high_conversion\nFollowers,1000,10,20\nEmail,500,5,10"),{goal:20000,launchShare:50,avgPledge:50,currency:"USD"});
assert.strictEqual(audience.rows.length,2);
assert.strictEqual(audience.stats.flags,1);
assert.throws(()=>api.planAudience(api.parseCsv("source,audience,low_conversion,high_conversion\nFollowers,100,30,20"),{goal:1000,launchShare:50,avgPledge:50}),/cannot exceed/);

const growth=api.analyzeGrowth(api.parseCsv("date,source,new_followers,spend\n2026-09-01,Ads,20,40\n2026-09-02,Email,30,0"),{target:100,launchDate:"2026-09-07",currency:"USD"});
assert.strictEqual(growth.stats.records,2);
assert.strictEqual(growth.rows.length,2);
assert.throws(()=>api.analyzeGrowth(api.parseCsv("date,source,new_followers,spend\n2026-09-01,Ads,-1,0"),{target:10,launchDate:"2026-09-07"}),/whole number/);

const funnel=api.analyzeFunnel(api.parseCsv("channel,impressions,visits,leads,followers,backers\nAds,1000,100,30,20,5"),{visitRate:5,leadRate:20,followRate:50,backerRate:20});
assert.strictEqual(funnel.stats.flags,0);
assert.throws(()=>api.analyzeFunnel(api.parseCsv("channel,impressions,visits,leads,followers,backers\nAds,100,101,30,20,5"),{visitRate:5,leadRate:20,followRate:50,backerRate:20}),/cannot exceed/);

const referrals=api.compareReferrals(api.parseCsv("source,spend,clicks,backers,pledged,delivery_cost\nEmail,100,100,10,1000,300\nAds,500,50,5,400,100"),{currency:"USD"});
assert.strictEqual(referrals.stats.flags,1);
assert.strictEqual(referrals.rows.length,2);

const pace=api.analyzePace(api.parseCsv("date,cumulative_pledged,cumulative_backers\n2026-09-01,1000,10\n2026-09-03,3000,30"),{goal:10000,endDate:"2026-09-10",windowDays:3,currency:"USD"});
assert.strictEqual(pace.stats.records,2);
assert.strictEqual(pace.rows[1][2],"$2,000.00");
assert.throws(()=>api.analyzePace(api.parseCsv("date,cumulative_pledged,cumulative_backers\n2026-09-01,1000,10\n2026-09-02,900,11"),{goal:10000,endDate:"2026-09-10",windowDays:3}),/cannot decrease/);

console.log("crowdfunding_analytics_fixtures: all assertions passed");
