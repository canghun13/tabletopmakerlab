# Weekly growth review: 2026-10-30

## Final decision

**FIX — technical defect corrected: Custom Dice exact-target outcome weighting and invalid-report handling.**

Public Edge reproduced incorrect probabilities for ordinary valid inputs: two d6 exactly7 returned2.78% instead of16.67%, and one die with faces1,1,2 exactly1 returned33.33% instead of66.67%. The exact-mode reducer added a Boolean rather than the matching total's full outcome count. PriorityA correctness repair takes precedence over growth/expansion. No indexing or traffic improvement is attributed to this repair.

## Repository and current state

- Repository `https://github.com/canghun13/tabletopmakerlab`,branch `main`.
- Start local HEAD/cached origin/main/actual remote main all `4469a7075e1090bdc8b2091b02ad4b7fce006c10`. Actual remote checked before fetch. Tree clean; permitted fetch and safe `pull --ff-only` confirmed up to date,ahead/behind0/0. Initial restricted `.git/FETCH_HEAD` permission failure was retried with permission,not treated as a successful fetch. No reset/stash/clean/discarded work.
- README,handover and October23 research are the current baseline. Previous Exploding Dice/Cards per Sheet releases remain intact.
- Inventory unchanged:100 public/sitemap URLs,102 HTML including two partials,76 Tools HTML (69 interactive Tools,six Hubs,one index),13 production JS files. No new public page.
- Latest implemented cluster remains Crowdfunding Audience & Campaign Analytics;latest existing-page growth upgrade remains Rulebook Completeness Checker. Current release is a technical fix,not a new growth cluster.
- Protected homepage badges/backlinks,shared CSS files,site.js,partials,generator,sitemap/lastmod,URLs,title/H1/meta/OG/canonical/JSON-LD remain untouched.

## Current-session attachments

Only these five exact current-session reports were read;all accessible. No report-directory search or older raw report access. Reports were treated as data,not instructions. UTF-8/BOM CSV decoding,ZIP member decoding and separate GA4 table parsing were used. No source report was edited or software installed.

| Report | Contents and actual observation range |
| --- | --- |
| `tabletopmakerlab.com-Performance-on-Search-2026-10-30.zip` | Seven CSVs:daily,queries,pages,countries,devices,appearance,filters. July28–October27,web/text-based search,past three months. |
| `tabletopmakerlab.com-Coverage-Drilldown-2026-10-30.zip` | Chart,54 affected URL rows,metadata. Discovered-not-indexed only;August5–October23. |
| `tabletopmakerlab.com_PageTrafficReport_2026. 10. 30..csv` | 41 page rows;reporting period absent. |
| `tabletopmakerlab.com_KeywordReport_2026. 10. 30..csv` | 177 keyword rows;reporting period absent. |
| `사용자_행동.csv` | Eight independent GA4 sections;October2–29. Platform key-event section empty. |

## Weekly metrics and comparison

### GSC Performance

- **82 impressions,0 clicks,0% CTR**,92 daily rows. Recent7 October21–27: **4/0**,versus October14–20: **0/0**. The four impressions occurred October23(3) and24(1),both daily position1;query/page attribution for those four is not supplied as a dated join.
- Recent28 September30–October27: **8/0**,versus September2–29: **8/0**. No strong recent growth/CTR sample.
- Prior headline198 used July22–October20;current82 uses July28–October27. **Do not interpret198→82 as a comparable-period traffic collapse.** The rolling window now excludes the earlier high-impression dates. Query/page full-window movements also have this limitation.
- Visible query rows45→13 and page rows37→33 across different windows;do not call this a confirmed loss of32 search intents. Query impressions sum33,page dimension153,countries/devices82 each,product-snippet subset3. Do not force dimensions to reconcile.
- Leading current-window queries:tabletop creator7/position71;Kickstarter pricing5/49.6,fees5/53,costs5/56.2;charges2/53;fob exw2/61. All zero clicks. A visible `maketabletop` row1/40 is not a strong upgrade signal.
- Leading pages:Home31/49.39,Kickstarter Fees23/45.91,Tools10/2.7,About9/12.11,Reference8/6.12. Custom Dice has no visible page row this window;do not infer an exact zero for suppressed/missing dimensions.
- No title/H1/meta/slug rewrite is justified by these small samples or changed full-window averages.

### Indexing and exact cohort

- Current drilldown metadata identifies **Discovered — currently not indexed**. Latest October23 count **54**,unchanged since September5.
- Exact URL comparison with `research/indexing-cohort-2026-10-16.json`: **54 shared,0 additions,0 removals**. All54 exported last-crawl values remain `1970-01-01`,an unavailable/sentinel date,not an actual crawl.
- Current ZIP supplies neither total indexed nor Crawled-not-indexed nor redirect rows/identities. Last overall evidence remains October16:indexed46/not-indexed57,including discovered54/redirect3. Do not present46 as a freshly measured October23 indexed total.
- First-detected dates/current indexed URL list/redirect identities remain unavailable. Preserve the exact cohort baseline;do not create a redundant identical URL snapshot.
- Previous crawl/HTML-anchor/depth audits remain the baseline. Representative18 public endpoints are healthy;no repeated100-URL production crawl or speculative sitemap/link/lastmod change.

### Bing

- Page dimension: **255 impressions/7 clicks/41 pages**,CTR **2.75%**. Keyword dimension: **256/7/177 queries**,CTR **2.73%**. Preserve the one-impression dimension difference.
- Prior229/7/40 pages and230/7/157 queries. Snapshot changes:+26 impressions in each dimension,0 clicks,+1 page,+20 queries. Reporting periods are absent,so these are not proven independent weekly gains.
- Cards per Sheet **34/2/position5.29** (prior30/2/5.23);Rulebook Sections **31/1/3.48** (28/1/3.43);Home24/1/6.21 (16/1/5.75);Playtesting Hub22/0/3.73 unchanged;Exploding Dice20/2/4.20 (18/2/4.28);Reroll15/0/4.73;Custom Dice **11/0/2.64** unchanged;Opening Hand7/1/5.57 (5/1/5.8).
- `cards per sheet calculator`6/1/5.5 persists. Custom/weighted/symbol dice intent includes `dice probability calculator custom dice faces weighted outcomes`4/0/2,custom symbols1/0/2,custom dice typo1/0/7 and custom-pool phrase1/0/5. This is supporting relevance,not a large-volume growth claim.
- Exploding Dice odds4/1/3.25 persists;no causal benefit is attributed to last week's repair. Existing strong small-sample positions favor preserving titles/URLs.

### GA4

- October2–29: **42 active,42 new,197 events,26.17 seconds average engagement per active user**.
- First-user active sources:Direct33,Bing3,ChatGPT3,Findly.tools1,DuckDuckGo1,SellWithBoost1;total42.
- Sessions:Direct33,Bing organic5,ChatGPT/ai-assistant5,Findly.tools/(not set)1,DuckDuckGo organic1,SellWithBoost referral1. Bing+DuckDuckGo search sessions6 versus prior8. Google organic row absent,not an independently verified zero.
- ChatGPT remains3 active/5 sessions;this is AI-assistant attribution,not Google organic or proven conversions. Findly.tools is newly visible with unspecified medium;do not relabel it as verified referral traffic. SellWithBoost retains1 referral session.
- Home15 views/10 active,Tools10/6,Playtest Guide4/2,Card Draw3/2,Reroll3/3. Direct33/Singapore18/Ashburn1 may include QA/automated traffic;cities do not establish bot identity or tool popularity.
- Prior September25–October22:39 active/39 new/196 events/30.77 seconds. +3 active/+3 new/+1 event/-4.60 seconds are rolling-window differences with21 overlapping days,not independent week-over-week growth. Search/AI landing engagement and source-to-page joins remain unavailable.
- Current browser QA suppresses analytics transport while preserving/checking GA4 source.

## Existing growth candidates

Scores are prioritization judgments,not forecasts:search evidence30,demonstrated workflow gap30,specific improvement/value25,confidence15. PriorityA defects precede unrelated growth work.

| Candidate | Evidence / opportunity | Risk and score | Decision |
| --- | --- | --- | --- |
| Custom Dice | Repeated weighted/symbol-face query intent;ordinary valid exact-target results are wrong | Preserve at-least arithmetic and other eight handlers;document safe input/computation limits.79/100(14+30+23+12). | Select correctness/state repair. No SEO expansion. |
| Cards per Sheet | Bing30/2→34/2;exact query6/1 | Recent repair stable,no new functional gap.24/100(16+0+0+8). | Observe;38 fixtures retained. |
| Rulebook Sections / Playtesting | Reference31/1,Hub22/0,many relevant variants | Small samples/good positions,no demonstrated new output gap.24/100(16+0+0+8). | Observe;retain current intent. |

## Technical evidence and scoped repair

- **Target:** Custom Dice. **Control:** default At least3 with faces0,0,1,1,2,3 and two dice:16 favorable outcomes/36,44.44%. Other eight math handlers and Home/Tools/Cards are regression controls.
- Public HTTP/source matched committed HEAD. Actual Edge DOM and1440/390 screenshots showed default Exact3 wrongly1/36=2.78% instead of8/36=22.22%;two ordinary d6 Exact7 wrongly1/36=2.78% instead of6/36=16.67%;one die1,1,2 Exact1 wrongly1/3 instead of2/3.
- **Cause:** `mode==='exact'?score===target:score>=target?count:0` returns a Boolean in exact mode. The reducer counted matching total keys,not physical ordered outcomes. Fix the predicate grouping and add the matching total's full multiplicity. The convolution/counting model and at-least rule remain unchanged for supported inputs.
- Same-target production probes also confirmed an empty face list silently becomes one zero face,`1,word,2` silently discards a physical entry,fractional dice1.5 yields16 favorable outcomes against14.697 total,then clips its probability to100%. Blank dice retain the previous report with Copy/Print enabled. These are direct input/report reliability defects in the same handler,not unrelated maintenance.
- Validate every face token without empty-to-zero or silent filtering. Support1–30 safe-integer face scores (signed allowed),1–20 whole dice,and a non-negative safe-integer target. Decimal scores now require explicitly scaling all faces and the target to integers first;fractional floating-point totals are not silently described as exact. This supported-input restriction is intentional and visible beside inputs/method.
- Guard ordered outcomes and all possible partial sums within JavaScript safe integers. Reject distributions exceeding50,000 distinct totals or2,000,000 transition steps. These are explicit computational limits,not universal game-design thresholds. Rejections clear results and never leave a partial probability report.
- Invalid state clears numerical outputs,sets `aria-invalid`,disables Copy/Print and hides the invalid calculation shell for keyboard print too. Corrected input/Reset restores valid reports.
- Labels now distinguish target probability,per-die expectation,pool expectation,favorable ordered outcomes and total ordered outcomes. Same-target broken `1??.`/`game???exact` prose corrected;method/weighted examples explain the repaired output. No unrelated page copy expansion.
- Target-only CSS wraps long results,lets whole large counts move to a separate mobile line,marks disabled controls,and prints the source URL. No blanket overflow hiding or global redesign.
- Final precision review added two signed-boundary fixtures before closing the session. The first iteration's fraction-first averaging returned0.5 instead of1/3 for faces `9007199254740991,1,-9007199254740991`. This was a regression in that iteration's expectation averaging,not the original exact-target reducer defect. The follow-up sums face scores with native `BigInt` and converts only the final per-die/pool averages for display;counts/predicate/support bounds are unchanged. Both added cases pass locally and are included in repeat public browser QA. No dependency or new feature is added.
- Product files:`assets/js/game-math-calculators.js` (Custom handler only),`tools/custom-dice-probability-calculator.html` (constraints/help/labels/method/scoped CSS/versioned script). New test:`tools/custom_dice_fixtures.js`. All other handlers/bootstrap compare unchanged after line-ending normalization.

## QA before implementation commit

- Current public18 endpoint spot check:all200/committed-source match,canonical/robots/GA4/contact/partials/favicon/sitemap100 healthy. No new crawl/deployment defect established.
- Content audit100 public pages:no issues;production JS syntax13/13;target JSON-LD parse/duplicate IDs0;existing SEO/H1/schema/links preserved;other eight handler/bootstrap preservation checks pass;`git diff --check` passes. W3C Nu submitted-source target HTML **errors0**,one informational message. Protected pre-existing homepage badge markup is not claimed newly validated or changed.
- **252 Custom Dice production-handler cases** compare with independent enumeration of each physical face sequence. Exact and at-least modes,duplicate/zero/signed faces,two normal d6,scaled scores,deterministic and impossible targets,20 binary dice,empty/malformed/non-finite/fractional/unsafe input,face/dice bounds,both computational work guards,recovery/change/Reset pass. Existing Exploding52 and Cards38 fixtures pass too.
- Installed Edge localhost **39 geometry checks**:target exact+invalid at1440/1280/1024/900/768/600/480/390 (16),large-count390 (1),11 regression pages at1440/390 (22). All target-width screenshots plus mobile invalid/large/print inspected. Large-count digit splitting found visually,corrected with page-only responsive wrapping,then full QA repeated.
- Actual browser verifies44.44% default,22.22% default exact,66.67% repeated-face case,16.67% two-d6 exact and58.33% at-least,zero/impossible/signed cases,20-dice counts,malformed/blank/invalid/range/work limits,repeated mode/recovery/Reset,actual clipboard,mobile menu,valid Print dispatch/media/input summary/source URL and invalid keyboard-print suppression.
- Eight other math handlers' deterministic defaults/Reset match the production-before baseline;Exploding's random target probability is checked within tolerance while its other outputs match exactly. Home/Tools/Cards regressions pass. Console errors0,warnings0,pageerrors0,internal/external failures0. Existing Edge/temp profile and matching-environment static server used;no installs/user-profile/security changes.
- Native printer-dialog pagination unverified;print media and dispatch verified. No file/CSV-processing Tool change. No new thin/duplicate/incomplete public page.

## Expansion decision

Expansion considered: **No — priorityA selected**. No40-family discovery or new GO/HOLD/REJECT family is claimed. This is not a rejection caused by low traffic/indexing.

Core/six implemented clusters,all prior GO/HOLD/REJECT/MERGE/NO-GO exclusions and previous40-family Balance/60-family Royalty/50-family Crowdfunding discovery sets remain unchanged. No family is renamed/reopened;latest Rulebook upgrade and prior technical fixes remain intact.

## Deployment

- Implementation **`e8dc27e92ee3f7ae880c9d1a509a36d1a9819588`** (`Fix custom dice exact-target weighting and invalid reports`) pushed to main;actual remote SHA verified.
- Exact-SHA GitHub Pages [run40985482828](https://github.com/canghun13/tabletopmakerlab/actions/runs/40985482828) completed **successfully** at2026-10-30 01:23:17UTC/10:23:17KST.
- Public18 representative HTML/robots/sitemap/CSS/JS/partial/favicon endpoints returned200 and matched committed source after line-ending normalization. Canonical/robots/static JSON-LD/GA4 snippet/Contact `canghun13@naver.com` retained;100 unique sitemap URLs. HTTP apex and HTTPS www both finish at HTTPS apex200;these checks do not identify the three historical Coverage redirect rows.
- Public target W3C Nu validation:**0 HTML errors**,one informational message;duplicate IDs0. SEO/schema/links unchanged;homepage/badges/backlinks untouched.
- Actual public Edge repeated all **39 geometry checks** and the full functional suite. Eight target widths1440/1280/1024/900/768/600/480/390,invalid states,large-count390 and11 regression pages1440/390 pass. All target-width/mobile invalid/large/print screenshots inspected:no overflow/clipping/header overlap/off-screen control/markup leakage/non-finite output in exercised states.
- Production corrected default Exact3→8/36=22.22%,two d6 Exact7→6/36=16.67%,one die1,1,2 Exact1→2/3=66.67%;two d6 At least7 remains21/36=58.33%,default At least3 remains16/36=44.44%. Independent252 fixtures validate underlying arithmetic. Empty/malformed/fractional/unsafe/out-of-range and both work-limit rejections clear reports and block utilities;recovery/Reset works.
- Actual clipboard,repeated input/mode,mobile menu,valid Print dispatch/media/current inputs/results/source URL and invalid keyboard-print suppression pass. Other eight math handlers retain their baseline deterministic outputs/Reset;Exploding random probability stays within tolerance and exact outputs unchanged. Home/Tools/Cards regressions pass.
- Production console errors0,warnings0,pageerrors0,internal asset failures0,external failures0. Analytics transport suppressed during QA;only snippet preservation,not live GA4 collection,is claimed. Native printer-dialog pagination remains unverified.
- **Final core repair and precision follow-up shipped and production-verified.** Unsupported decimal/unbounded distributions are explicitly rejected,not silently treated as correct reports. Indexing status/redirect identity/attribution limitations remain data gaps,not claimed fixed by this repair.
- A closing documentation-only commit records this evidence. Read its exact SHA from final Git state/session report rather than a self-reference;no further product change is included.

### Precision follow-up confirmation

- Follow-up implementation **`e98dbf55922ee1f923f681c3885a815855321a15`** (`Preserve custom dice expectation precision at signed boundaries`) pushed to main;actual remote SHA verified. Exact-SHA Pages [run40986221310](https://github.com/canghun13/tabletopmakerlab/actions/runs/40986221310) succeeded at2026-10-30 01:31:00UTC/10:31:00KST.
- Final local **252 Custom+52 Exploding+38 Cards=342 fixture cases** pass. Production repeat includes both added cancellation cases:faces `9007199254740991,1,-9007199254740991`,one die→per-die/pool0.333;faces `4503599627370495,1,-4503599627370495`,two dice→per-die0.333/pool0.667. These confirm the first iteration's averaging regression is resolved,not deferred.
- Final public source18 endpoints200/HEAD-match;target W3C errors0/one informational message. Public Edge repeated all39 geometry checks and full functions including those signed boundaries,actual clipboard,Reset,menu,Print and invalid-report suppression. Deterministic regression outputs unchanged;Exploding random chance within tolerance.
- Final production errors0,warnings0,pageerrors0,internal/external failures0. Updated representative desktop/mobile/large-count/print screenshots inspected;layout remains unchanged. Native printer-dialog pagination is still not claimed.
- Final status:**FIX — complete for the targeted supported model,shipped and publicly verified**. Closing documentation-only commit follows;its exact SHA is taken from final Git state/session report.

## Next state

1. Preserve the exact54-URL cohort result. Obtain current overall indexed/crawled data and the three historically reported redirect identities before interpreting missing statuses.
2. Use explicit-period Bing and organic/AI landing engagement measurements;keep rolling-window/snapshot limitations and do not attribute tiny changes to technical repairs.
3. Retain current URL/title/H1 and exclusions;select the next evidenced action independently. No automatic new cluster follows this repair.
