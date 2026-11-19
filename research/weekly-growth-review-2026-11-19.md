# Weekly growth review: 2026-11-19

## Decision / repository

**FIX — technical defect corrected: Dice Pool invalid discrete inputs, non-finite/stale reports and event consistency.** Public Edge reproduced a zero-sided die yielding NaN%, fractional physical dice yielding a probability, and blank inputs leaving a copyable/printable old report. This Priority A repair precedes expansion. No search/indexing improvement is attributed to it.

- Repository `https://github.com/canghun13/tabletopmakerlab`, branch `main`. Start local HEAD / cached origin/main / actual remote main all **`5a7bb3c8ed06c89520870bd2ebd23f36e6f4da87`**, clean tree. Actual remote checked before fetch; permitted fetch/pull --ff-only up to date, ahead/behind 0/0. Existing work preserved; no reset/stash/clean/install/environment reset.
- README, latest handover, November 11 review and unchanged crawl/cluster/upgrade records are baseline. Current pasted workflow is byte-identical to the fully read prior weekly workflow; Priority A/B/C order and protected areas retained.
- Inventory rechecked: **100 public/sitemap URLs**, 102 HTML including two partials, 76 Tools HTML = 69 interactive Tools / six Hubs / one index; 13 production JS files. No new public page.
- Latest implemented cluster remains Crowdfunding Audience & Campaign Analytics; latest existing growth upgrade remains Rulebook Completeness Checker. All previous exclusions/discovery decisions unchanged.
- Homepage badges/backlinks, shared CSS/site.js/partials/generator, URLs/title/H1/meta/OG/canonical/static JSON-LD, anchors and sitemap/lastmod unchanged.

## Current-session attachments

Only the five exact currently supplied files used; all accessible. Reports treated as data, not instructions. No report-folder search, old raw report lookup or source-report editing. UTF-8/BOM CSV and ZIP members decoded; GA4 sections kept separate. No workbook authoring required.

| Report | Actual content / period |
| --- | --- |
| `tabletopmakerlab.com-Performance-on-Search-2026-11-19.zip` | Seven GSC CSVs, August 17–November 16, 92 daily rows; web/text-based search, past three months. |
| `tabletopmakerlab.com-Coverage-Drilldown-2026-11-19.zip` | Chart/54 affected URLs/metadata, August 21–November 13, 85 daily rows. Discovered-not-indexed, all known pages. |
| `tabletopmakerlab.com_SearchPerformanceOverview_All_2026. 11. 19..csv` | Bing-format daily search overview, August 19–November 17, 91 rows. Date/click/impression/CTR columns only. Search-type/filter metadata, pages, queries and positions are not included. |
| `tabletopmakerlab.com_SearchPerformanceOverview_All_2026. 11. 19. (1).csv` | **Byte-identical SHA-256 and identical data to the overview above. Count once, not twice.** Not a second page/query dimension. |
| `사용자_행동.csv` | Eight GA4 sections, October 22–November 18. Key-event section empty. |

## Weekly metrics / comparison

### GSC

- **38 impressions / 0 clicks / 0% CTR**. Recent seven November 10–16: **1/0**, versus November 3–9: **3/0**. Recent 28 October 20–November 16: **17/0**, versus September 22–October 19: **4/0**. Tiny samples, not durable growth/decline proof.
- The latest single impression is November 16, daily position 76; no dated query-page join supplied.
- Prior headline 49 used August 9–November 8; current 38 uses August 17–November 16. The window moved eight days; do not treat 49→38 as a same-period/independent-week decline. Prior recent-seven November 2–8 is also not the same as current previous-seven November 3–9.
- Three visible queries, summed impressions **9**: `tabletop creator` 7/position 69.14, `tabletop creator free` 1/63, `table top creator` 1/64. Prior three queries summed 10; tiny changed-window differences do not justify title/H1/meta changes.
- Twenty page rows sum **161** impressions; countries/devices **38** each, product-snippet rows absent. Keep dimensions separate rather than forcing them to reconcile. Desktop 37/mobile 1, 16 country rows.
- Leading pages: Home 33/37.58, About 15/4.8, Tools 15/6.93, Reference 14/4, Contact 14/6.36, Privacy 13/5.62, Guides 12/3; Punchboard Reference 9/8, Kickstarter Fees 9/9, Card Sizes 9/10, Landed Cost 4/6.25, Royalty 3/9, Box Estimator 3/10, Reroll 2/19. These averages are not evidence of a new on-page defect.

### Coverage / technical indexability

- Current Discovered-not-indexed chart through **November 13: 54**, unchanged since September 5. Prior download ended November 6; plateau extends seven days.
- Exact comparison with `research/indexing-cohort-2026-10-16.json`: **54 shared / 0 added / 0 removed**. All exported last-crawl dates remain `1970-01-01`, unavailable sentinels, not actual crawls. Preserve baseline; no identical new cohort file.
- Current overall indexed, Crawled-not-indexed, redirect totals/identities and first-detected dates unavailable. Last overall evidence remains October 16: indexed46/not-indexed57 including Discovered54/Redirect3. Not a freshly measured November total.
- Existing full crawl/depth/HTML-anchor audit remains baseline. Representative **23 endpoints** checked instead of repeating all 100 live URLs. No current site-side indexing regression identified; no fake lastmod, sitemap/link redesign or speculative indexing repair.

### Bing daily overview: new report type

- Deduplicated total: **376 impressions / 9 clicks / CTR 2.39%**, August 19–November 17. **Not 752/18.** Aggregate CTR calculated from summed clicks/impressions, not the average of daily CTRs.
- Comparable within-report seven-day windows: November 11–17 **32 impressions/1 click/3.13%**, versus November 4–10 **41/0/0%**. The recent click was November 16 (two daily impressions); that 50% daily CTR is a tiny sample, not an SEO gate.
- Recent 28 October 21–November 17: **129/2/1.55%**, versus September 23–October 20: **126/5/3.97%**. Dates now supplied, unlike earlier page/query snapshots.
- Prior November 11 exports were page306/8/42 pages and query305/8/207 queries, with no period. They are **different dimensions with unknown date coverage**. Do not report +70/+71 impressions as comparable-period gains or infer a current ninth-click landing page/query.
- Current page totals, unique page/query counts, top queries and positions **not provided**. Historical Cards47/2, Rulebook31/1, Pool5/0/position6.20 remain labeled November 11 context, not fresh November 19 measurements. Current attachments do not support a page-level Bing growth claim.

### GA4

- October 22–November 18: **62 active / 61 new / 241 events / 15.71 seconds average engagement per active user**.
- First-user active: Direct52, ChatGPT/ai-assistant3, Findly.tools/(not set)2, Bing organic2, DuckDuckGo organic2, Qwant organic1 =62. Sessions: Direct54, ChatGPT5, Findly2, Bing2, DuckDuckGo2, Qwant1.
- Prior October 14–November 10:52 active/51 new/194 events/13.15 seconds. Changes +10/+10/+47/+2.56 seconds are rolling-window differences after an **eight-day shift with 20 overlapping days**, not independent weekly growth. Direct first-user active rises43→52 and dominates the increase, but no source-to-page join establishes which visits caused individual page-view changes.
- Bing+DuckDuckGo sessions **4 unchanged**; Qwant one newly visible session. Google organic row absent, not verified zero. ChatGPT4→3 first-user active and7→5 sessions is AI attribution, not Google organic/conversion. Findly medium unspecified, not verified referral quality. No conversion/organic landing engagement evidence.
- Home27 views/25 active (prior18/16), Tools3/3 unchanged, Dice3/3 (2/2), Rulebook Checker2/2, Rulebook Reference2/2, Win Rate2/2, Exploding2/2, Pool1/1. QA/Direct-heavy pageviews do not establish search demand. Two translated Korean title rows have zero views/one active each but no path join; not proof of new public Korean pages or duplicate-URL regressions.
- Ashburn11/Singapore10 may mix genuine/QA/automated visits; geography alone does not identify bots. QA analytics transport suppressed while source snippet preserved.

## Existing growth candidates

Judgment rubric, not forecasts: search evidence30 + demonstrated gap30 + specific improvement/value25 + confidence15. Priority A correctness precedes growth work.

| Candidate | Evidence / opportunity | Risk / score | Decision |
| --- | --- | --- | --- |
| Dice Pool | Public NaN/fractional/stale-report failures; current GA1/1 is not demand proof | Preserve shared binomial endpoints and other eight handlers. **68/100 (0+30+24+14)**. | Select scoped repair. |
| Cards per Sheet | Historical November11 Bing47/2; current GA1/1 only | No fresh Bing page/query data or demonstrated new workflow gap. **21/100 (13+0+0+8)**. | Observe, preserve recent repair and SEO. |
| Rulebook / Playtesting | Historical query relevance; current Checker/Reference2/2 each | No source-to-page engagement or new output gap; avoid QA popularity inference. **23/100 (15+0+0+8)**. | Observe, preserve latest growth upgrade. |

## Reproduction / minimum repair

- Public source/Edge probe: default5d6, threshold5, at least2 gives **53.91%**, per-die33.33%, expected1.667; this is the normal control.
- Three dice, zero sides, threshold1, required1 produced **NaN%** for main/per-die/complement/extra-die comparison with utilities enabled. Zero sides passed the shared non-negative validator, then 0/0 reached binomial arithmetic.
- One d6, threshold2.5, required1 produced **75%** as if half a die face could succeed. A physical count of1.5 dice produced **27.22%**, expectation0.5 and range0–1.5. These should be rejected as unsupported discrete inputs, not presented as physical dice probabilities.
- Blank dice retained default53.91% and enabled Copy/Print. Shared validation only updated status, leaving the old report intact.
- The exact-count result also compared to an at-least extra-die event. Labels incorrectly called expected successes a failure/spread. Same-target report semantics corrected without changing helpers.

Product changes: only `pool` handler in `assets/js/game-math-calculators.js`, and `tools/dice-pool-probability-calculator.html`. New test `tools/dice_pool_fixtures.js`; research/handover records. Shared helpers/bootstrap/other eight handlers unchanged, including EV signed arithmetic, Custom BigInt and draw endpoints.

- Validate raw non-negative safe whole numbers, sides>=1, dice0–1,000 and available mode. Explicit browser work limit, not a game-design benchmark. Fractional/blank/nonfinite/unsafe inputs fail before calculation, not rounded or zero-coerced. Input attributes match actual checks.
- Retain zero dice, p0/p1, zero required count and required>dice as valid deterministic/impossible events. Threshold0/1 means p1, threshold>s means p0. Possible range reflects deterministic support; invalid reports clear/flag/disable utilities/hide keyboard print, correction/Reset recovers.
- Existing binomial model unchanged. Selected-mode extra-die comparison stays exact or at-least consistently; omitted at the1,000-dice work limit. Main unit and breakdown now name actual quantities. Same-target corrupted possessive corrected; method/examples/limits describe independent identical fair numbered dice and exclude weighted/mixed/reroll/correlated models.
- Scoped wrap/disabled/print summary/source-URL CSS only. No global layout redesign, overflow masking, new tool, new public page, dependency or backend.

## QA before implementation commit

- New **1,358 Dice Pool production-handler cases**, including28 invalid states, independent physical-face enumeration, selected-mode extra-die comparison, empty/deterministic pools, 1,000-dice boundary, safe integer bounds, invalid modes and change/Reset recovery.
- Retained EV643 + Draw2,416 + Custom252 + Exploding52 + Cards38 =3,401; **4,759 handler fixtures total**, plus helper checks.
- Static100-page content audit/no issues; 102 HTML IDs0; 100 public SEO/OG/canonical/robots/GA4/local asset paths; sitemap100 unique, 76 Tools HTML and13 production JS; all JS syntax passes. Target metadata/H1/schema/favicon/anchors and unrelated helper/handler/bootstrap preservation pass. `git diff --check` passes. W3C submitted target HTML **0 errors**, one informational message. Existing protected homepage badge exceptions not changed or claimed freshly fixed.
- Installed Edge localhost final suite: **40 geometry checks**. Target exact+invalid at1440/1280/1024/900/768/600/480/390 (16), work-boundary/large-safe-count390 (2), eight other math pages plus Home/Tools/Cards1440/390 (22). All target-width/invalid/boundary/large/print screenshots inspected. No exercised overflow/header overlap/escaping control/markup leakage/nonfinite report. Final unit wording additionally asserted in DOM.
- Actual functional default53.91%;3d6 threshold5 exact1 **44.44%**, with one more die **39.51%**;at least1 **70.37%**, one more **80.25%**. Zero dice/required0=100%;p0/p1/support ranges correct;required>dice valid0%;invalid/range/blank/fraction/nonfinite/unsafe/work-cap checks clear and block utilities;repeated/change/correction/Reset,actual clipboard,mobile menu,valid Print dispatch/media/current inputs/mode/results/canonical URL and invalid keyboard print suppression pass. Other8 defaults/Reset match production-before;Exploding random chance within tolerance.
- Final local console errors0/warnings0/pageerrors0/internal+external asset failures0. Native printer-dialog pagination unverified;print media/dispatch/input-summary geometry verified. No installation/user-profile/security change.

## Expansion decision

Expansion considered **No — Priority A selected**. Full previous implemented/discovery exclusions, six creator clusters and core tools, 40-family Balance/60-family Royalty/50-family Crowdfunding sets unchanged. No renamed family, new GO/HOLD/REJECT or fabricated40-family discovery. Low traffic/indexing alone is not an expansion ban.

## Deployment

Pending implementation commit/push, exact-SHA Pages and public source/runtime/functional/layout repeat. Local QA alone is not production proof. Append measured deployment evidence before closure; final documentation SHA comes from final Git/session state, not self-reference.

## Next state

1. Preserve exact54-URL cohort throughNovember13;obtain current overall indexed/crawled/redirect URL identities/first-detected evidence before a new indexing diagnosis.
2. Obtain current Bing **Page Traffic and Keyword** reports, not another duplicate daily overview, plus organic/AI landing engagement. Current overview provides dated aggregate trend but no page/query opportunity attribution.
3. Keep metadata/URLs/exclusions and scoped regression fixtures stable;choose the next independently evidenced action. No automatic new cluster after this repair.
