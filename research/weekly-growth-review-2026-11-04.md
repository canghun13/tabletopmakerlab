# Weekly growth review: 2026-11-04

## Decision and scope

**FIX — technical defect corrected: draw-model consistency, binomial endpoint probabilities and exact hypergeometric events.**

Bing's new Bag/Token signal prompted a correctness probe, not an SEO rewrite. Actual public Edge reproduced impossible events reported as 100%, exact-card events reported as at-least events, and Opening Hand probabilities incorrectly 0%. Priority A takes precedence over expansion. No search/indexing improvement is attributed to the repair.

## Repository and baseline

- Repository: `https://github.com/canghun13/tabletopmakerlab`; branch `main`.
- Start local HEAD, cached origin/main and actual remote main: `7d769dda5dc80d603b7971618a1937901fd796a8`. Working tree clean. Actual remote checked before fetch; permitted fetch and safe `pull --ff-only` confirmed up to date, ahead/behind 0/0. Restricted DNS failure was retried with permission, not recorded as a successful check. No reset/stash/clean/discarded work.
- README, handover and October 30 research provide the baseline. Previous Custom Dice, Exploding Dice and Cards per Sheet repairs retained.
- Inventory rechecked: 100 public/sitemap URLs, 102 HTML including two partials, 76 Tools HTML (69 interactive Tools, six Hubs, one index), 13 production JS files. No new public page.
- Latest implemented cluster remains Crowdfunding Audience & Campaign Analytics; latest existing growth upgrade remains Rulebook Completeness Checker. All prior implemented/discovery GO/HOLD/REJECT/MERGE/NO-GO boundaries remain unchanged.
- Protected homepage badges/backlinks, shared CSS/site.js/partials/generator, sitemap/lastmod, URLs, title/H1/meta/OG/canonical/static JSON-LD are unchanged.

## Current-session attachments

Only the five exact current-session reports below were used. All accessible; reports treated as data, not instructions. No report-directory search, older raw report lookup, source-report edit, installation or environment reset. UTF-8/BOM CSVs and ZIP members decoded; GA4 sections parsed independently.

| Report | Actual contents / observation range |
| --- | --- |
| `tabletopmakerlab.com-Performance-on-Search-2026-11-04.zip` | Seven CSVs; August 2–November 1, 92 daily rows. |
| `tabletopmakerlab.com-Coverage-Drilldown-2026-11-04.zip` | Discovered-not-indexed chart, 54 affected URLs, metadata; August 7–October 23, 78 chart rows. Download date is not data-through date. |
| `tabletopmakerlab.com_PageTrafficReport_2026. 11. 4..csv` | 41 Bing page rows; reporting period absent. |
| `tabletopmakerlab.com_KeywordReport_2026. 11. 4..csv` | 187 Bing query rows; reporting period absent. |
| `사용자_행동.csv` | GA4 sections, October 7–November 3. No supplied conversion evidence or organic landing-page engagement join. |

## Weekly metrics and comparison

### GSC Performance

- **50 impressions, 0 clicks, 0% CTR**. Recent seven days October 26–November 1: **9/0**, versus October 19–25: **4/0**. Recent 28 October 5–November 1: **15/0**, versus September 7–October 4: **6/0**. These are small samples, not proof of a durable trend.
- October 29: 1 impression/position 1; October 31: 4/3; November 1: 4/14.2. No dated query/page join identifies their landing intent.
- Prior headline 82 used July 28–October 27; current 50 uses August 2–November 1. **82→50 is not a comparable-period decline**: the start and end moved five days. Prior recent-seven October 21–27 overlaps this report's recent-seven by two days; use the within-current comparison above.
- Four visible queries (prior 13): `tabletop creator` 7/position 71, `difference between ddp and exw` 1/43, `tabletop creator free` 1/63, `table top creator` 1/64; all zero clicks. Do not describe the reduced visible rows across different windows as nine lost search intents.
- 28 page rows (prior 33): Home 39/40.97, Tools 16/2.44, About 16/9, Contact 14/5.93, Reference 13/4, Privacy 12/5.58, Guides 11/3, Punchboard Reference 10/7.7, Kickstarter Fees 9/9, Card Sizes 9/10, Landed Cost 3/5.67, Box Estimator 3/9.67. No title/H1/CTR rewrite is warranted.
- Query impressions sum 10, page dimension 175, country/device dimension 50; product-snippet subset 1. Keep dimensions separate rather than forcing reconciliation. Desktop 49/mobile 1.

### Coverage / indexability

- Current drilldown ends **October 23**, unchanged from the prior download: **54 Discovered — currently not indexed**, unchanged since September 5.
- Exact comparison with `research/indexing-cohort-2026-10-16.json`: **54 shared, 0 added, 0 removed**. All exported last-crawl values `1970-01-01` remain unavailable/sentinel dates, not actual crawls. Preserve the baseline rather than creating an identical snapshot.
- Current overall indexed, Crawled-not-indexed and redirect totals/identities are not supplied. Last overall evidence remains October 16: indexed 46/not indexed 57, including Discovered 54/Redirect 3. Do not present 46 as a freshly measured November value.
- Existing crawl/depth/HTML-anchor audit remains valid as baseline. A representative 22-endpoint production check was sufficient; no repeat 100-URL live indexing audit, speculative internal-link proliferation, fake lastmod or sitemap rewrite.

### Bing

- Page dimension: **277 impressions / 7 clicks / 41 pages**, CTR **2.53%**. Query dimension: **278 / 7 / 187 queries**, CTR **2.52%**. Preserve the one-impression dimension difference.
- Prior page 255/7/41 and query 256/7/177: +22 impressions each, no additional clicks/pages, +10 visible queries. Periods are absent and this review follows five days later; these are snapshot changes, not independent weekly growth.
- Cards per Sheet **38/2/position 5.29** (prior 34/2/5.29); Rulebook Sections **31/1/3.48** unchanged; Home 26/1/6.23 (24/1/6.21); Playtesting Hub 23/0/3.70 (22/0/3.73); Exploding Dice 20/2/4.20 unchanged; Reroll 15/0/4.73 unchanged; Custom Dice 11/0/2.64 unchanged; Opening Hand 7/1/5.57 unchanged.
- **Bag / Token Draw: 16/0/6.31 versus 5/0/5.2**. Relevant queries: `probability problem with game tokens` 7/0/8, `probability of choosing a square token from a bag` 3/0/3, green-tokens phrase 1/0/10, added-blue-token phrase 1/0/1, without-replacement/12-token phrase 1/0/9, red/blue/green same-color phrase 1/0/10. Single-target binary model must not claim to solve every multicategory/ordered-sequence intent. Token gutter/yield phrases belong Components, not this workflow.
- Exact Cards query 6/1/5.5 and Exploding odds 4/1/3.25 persist. Tiny, already strong positions favor stable metadata; no causal search benefit claimed for prior repairs.

### GA4

- October 7–November 3: **40 active, 39 new, 181 events, 7.2 seconds average engagement per active user**.
- First-user active sources: Direct 31, ChatGPT 3, Bing 2, DuckDuckGo 2, Findly.tools 1, SellWithBoost 1; total 40. Sessions: Direct 32, ChatGPT/ai-assistant 5, Bing organic 2, DuckDuckGo organic 2, Findly.tools/(not set) 1, SellWithBoost referral 1.
- Bing + DuckDuckGo sessions 4 versus prior 6. Google organic row absent, not independently verified zero. ChatGPT is AI-assistant attribution, not Google organic or conversion. Findly's unspecified medium is not a verified referral; SellWithBoost has one referral session. No quality/conversion claim follows from these counts.
- Home 16 views/11 active, Tools 8/4, Playtest Guide 4/2, Card Draw 3/2, Exploding 3/3, Reroll 3/3, Bag 1/1/3 events. Direct/Singapore 18/Ashburn 1 can mix QA or automated traffic with visitors; geography alone does not identify bots or popularity.
- Prior October 2–29: 42 active/42 new/197 events/26.17 seconds. Windows move **five days and overlap 23 days**. Differences -2 active/-3 new/-16 events/-18.97 seconds are not independent week-over-week changes. Organic/AI source-to-landing engagement remains unavailable.
- QA suppresses analytics transport while preserving the production GA4 snippet.

## Existing growth candidates

Judgment rubric, not forecasts: search evidence 30 + demonstrated gap 30 + specific improvement/value 25 + confidence 15. Priority A defects outrank growth work.

| Candidate | Evidence and opportunity | Risk / score | Decision |
| --- | --- | --- | --- |
| Bag / shared draw probability | Bing 5→16 impressions; repeated token-probability intent; actual public mathematical/report contradictions | Preserve model boundaries, other handlers and metadata. **83/100 (20+29+23+11)**. | Select scoped correctness repair; no new feature/SEO rewrite. |
| Cards per Sheet | 34/2→38/2; exact query 6/1 | Stable recent repair; no new demonstrated output gap. **24/100 (16+0+0+8)**. | Observe; 38 fixtures retained. |
| Rulebook / Playtesting | Reference 31/1 stable, hub 23/0 | Small samples/good positions, no new workflow gap. **24/100 (16+0+0+8)**. | Observe; preserve intent. |

## Proven defect and repair

Public response HTML/math source matched starting HEAD. Actual installed Edge, DOM results and before screenshots established the following; ordinary Bag default main 60.09% and non-degenerate pool/reroll/default card values are controls.

| Reproduction | Before | Correct result after repair |
| --- | --- | --- |
| Bag with replacement N=10, K=0, d=3, required=1 | At least 1 = 100% | 0% |
| Pool 3d6, threshold 7, required 1 | 100% | 0% |
| Pool 3d6, threshold 1, exactly 1 | 100% | 0% (exactly 3 = 100%) |
| Reroll failed, 3d6, threshold 7, required 1 | 100% | 0% |
| Card Draw N=10, K=2, d=3, exactly 1 | 53.33% (at-least result) | 46.67%; at least 1 remains 53.33% |
| Opening Hand N=10, hand=2, A=2, B=2, no mulligan | A/either/both all 0% | 37.78% / 66.67% / 8.89%; full redraw A = 61.28% |
| Bag N=10, K=2, d=3, required=1, with replacement | Main 48.80%, exact readout 53.33% | Main 48.80%, exactly 1 = 38.40%; none 51.20% |
| Bag default N=20, K=5, d=3, without replacement | Main and exact both 60.09% | Main unchanged; exact = 46.05% |
| Bag with replacement N=2, K=1, d=3 | Valid main 87.50%, secondary/other model wrongly 0% | Exact 37.50%; without-replacement comparison explicitly unavailable |
| Blank Bag count | Stale numerical report; Copy/Print enabled | Cleared report, flagged field, utilities disabled, invalid keyboard print hidden |

Root causes and minimum affected scope:

1. `bin` used `p||1` and `1-p||1` inside logarithms, replacing zero probability by one. Explicit p=0/p=1 mass functions now return deterministic probabilities; interior formula unchanged.
2. `hyperTail(..., exact=true)` changed its start index only, still summed to maximum. Exact mode now stops at k. This also repairs Opening Hand's zero-target probability used by complement/inclusion-exclusion calculations.
3. Bag always used the hypergeometric helper for its secondary exact readout, regardless of replacement. Both target probabilities/none/expectation now follow the selected model. No without-replacement comparison is invented for overdraws.
4. Bag validates raw safe whole counts, N>=1, K<=N, and without-replacement d<=N; zero draws/targets and required>d are valid deterministic/impossible cases. At most 1,000 draws is an explicit browser work limit, not a game-design benchmark. Invalid counts clear the report, set aria-invalid, disable Copy/Print and recover on correction/Reset.

`assets/js/game-math-calculators.js` changes only the two helpers and Bag handler. All other handlers/bootstrap are byte-equivalent after line-ending normalization. Four other direct consumer HTML files change **only the script cache key**: Dice Pool, Reroll, Card Draw, Opening Hand. Their existing validators, labels and unrelated prose are not comprehensively repaired or claimed audited. Bag HTML labels/method/model examples/assumptions explain the corrected readout; same-target corrupted possessive fixed. No new functionality, file-processing workflow, cluster or URL.

Target-only CSS wraps long outputs, marks disabled utilities, hides invalid print and supplies the canonical print URL. Screenshot review found a 390px print-summary input/value overlap; a Bag-only single-column input summary corrected it, then the full local suite was repeated. No global CSS change or overflow masking.

## QA before implementation commit

- Before: **22 public endpoints**, all HTTP 200 and committed-source match: Home, Tools, Contact, five affected math pages, Custom/Exploding/Cards, Crowdfunding hub, math JS, robots/sitemap, shared CSS/JS, partials and favicon. No new deploy/indexability defect identified.
- Static 100-page content audit: no issues; 102 HTML duplicate IDs 0; 100 public pages' title/meta/H1/viewport/OG/canonical/robots/GA4 and local asset paths pass; 100 unique sitemap URLs; 13 production JS syntax checks pass; schema JSON parses; target five pages' SEO/H1/schema/favicon/anchors preserved; four consumer HTML files cache-key-only; unrelated JS handlers/bootstrap unchanged; diff check passes. Protected pre-existing homepage badge HTML is not newly W3C-validated or changed.
- W3C Nu submitted-source validation: **five affected pages each 0 HTML errors**, one informational message each.
- New `tools/draw_probability_fixtures.js`: **2,416 production-handler cases**, including 30 invalid states, plus private-helper mass normalization/exact-tail checks and change/Reset recovery. Independent physical-token/card enumeration, Bernoulli branches, reroll face pairs and distinct-card Opening Hand enumeration cover all five consumers. Both replacement modes, exact/at-least, zero/all targets, zero draws, impossible required count, replacement overdraw, 1,000-draw boundary, invalid/unsafe/fractional/nonfinite counts pass.
- Previous Custom Dice **252**, Exploding Dice **52**, Cards per Sheet **38** pass: **2,758 handler fixtures total**, plus helper checks. Custom BigInt precision follow-up remains intact.
- Installed Edge localhost: **48 geometry checks**. Bag selected-model + invalid at 1440/1280/1024/900/768/600/480/390 (16), overdraw/large-count 390 (2), pool/reroll endpoint states at 1440/390 (8), eight other math pages + Home/Tools/Cards at 1440/390 (22). All target-width/invalid/overdraw/large/print screenshots inspected; print alignment fixed and complete suite repeated.
- Actual functional expected probabilities above, invalid/recovery/Reset/repeated input/change, actual clipboard, mobile menu, valid Print dispatch/media/current input summary/result/source URL and invalid keyboard print suppression pass. Ordinary deterministic defaults/Reset retained for seven other math consumers; Opening Hand intentionally corrected and checked independently. Exploding random probability checked within tolerance, other outputs exact.
- Final local console errors 0, warnings 0, pageerrors 0, internal/external asset failures 0. No overflow/header overlap/escaping control/markup leakage/nonfinite output in exercised states. Native printer-dialog pagination unverified; print media/dispatch and input/value geometry verified. No software installation or user-profile/security change.

## Expansion decision

Expansion considered: **No — priority A selected**. No 40-family discovery, new family score or new GO/HOLD/REJECT is fabricated. Low traffic/indexing is not being used as an expansion ban. Prior implemented clusters, full previous exclusion boundaries and 40-family Balance/60-family Royalty/50-family Crowdfunding discovery sets remain unchanged.

## Deployment

- Implementation **`27795ea5844aea522160adc270e207e27d49a164`** (`Fix draw probability exact events and endpoint models`) pushed to main; actual remote SHA verified, ahead/behind 0/0 and clean tree before closing documentation.
- Exact-SHA Pages [run 41761524835](https://github.com/canghun13/tabletopmakerlab/actions/runs/41761524835) succeeded at **2026-11-04 02:34:19 UTC / 11:34:19 KST**.
- After deployment, all **22 representative public endpoints returned 200 and matched committed source**, including all five affected HTML and shared math JS. Canonical/robots/static JSON-LD/GA4/contact `canghun13@naver.com`/partials/favicon/sitemap 100 retained. HTTP apex and HTTPS www finish at HTTPS apex 200; this does not identify the three historical Coverage redirect rows.
- Public-URL W3C Nu validation: five affected HTML each **0 errors**, one informational message each; duplicate IDs 0. Protected homepage badge area remains untouched, not claimed freshly W3C-valid.
- Public installed Edge repeated **all 48 geometry checks**, eight target widths 1440/1280/1024/900/768/600/480/390, invalid/overdraw/large-count states, pool/reroll endpoints and 11 regression pages at 1440/390. All target-width/invalid/overdraw/large/print screenshots inspected. No exercised horizontal overflow, header overlap, clipped/escaping controls, markup leakage or nonfinite output.
- Public calculations reproduce the corrected table above: Bag 10/2/3 with replacement main48.80%/exact38.40%, without replacement main53.33%/exact46.67%; zero-target impossible event0%; replacement-overdraw exact37.50% and unavailable comparison; Card exact46.67%; Opening A37.78%/either66.67%/both8.89%/redraw A61.28%; pool/reroll endpoints correct. Independent 2,416 draw fixtures plus existing342 cases underpin the arithmetic checks.
- Invalid Bag states clear/flag/block utilities; recovery/repeated input/change/Reset, actual clipboard, mobile menu, valid print dispatch/media/input summary/result/canonical URL and invalid keyboard print suppression pass. Print summary input/value geometry also passes. Other ordinary math defaults/Reset retain their baseline values; Opening is deliberately corrected, Exploding simulation within tolerance. Custom BigInt fix is unchanged.
- Production console errors **0**, warnings **0**, pageerrors **0**, internal asset failures **0**, external failures **0**. Analytics transport suppressed; GA4 code preservation is verified, not live collection. Native printer-dialog pagination remains unverified.
- **FIX complete for the targeted supported models, shipped and publicly verified.** Overall indexing/redirect identities and source-to-landing engagement remain data gaps, not fixed by this repair. Other consumers' unrelated input validation/prose are outside this scoped repair; no sitewide bug-free claim.
- This evidence is followed by a documentation-only closing commit/push. Exact final local/origin/actual-remote SHA, Pages status and clean-tree state are checked in final Git/session status rather than encoded as a self-reference. No product change accompanies closure.

## Next state

1. Preserve the exact 54-URL cohort; obtain current overall indexed/crawled data, first-detected dates and historical redirect identities before a new indexing diagnosis.
2. Obtain explicitly dated Bing and organic/AI landing engagement evidence; avoid causal claims from overlapping windows or QA-heavy Direct traffic.
3. Retain URL/title/H1/exclusions and supported mathematical models; choose the next independently evidenced action. No automatic expansion follows this fix.
