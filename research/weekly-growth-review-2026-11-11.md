# Weekly growth review: 2026-11-11

## Final decision

**FIX — technical defect corrected: Expected Value signed outcomes and invalid distribution reports.**

The public calculator rejected ordinary losses while retaining a previous copyable/printable result. A 200% probability total was clipped to 100% in the readout, and incomplete tables produced a value/spread report despite not defining a complete probability distribution. This reproducible Priority A defect outranks growth/expansion. No search or indexing benefit is attributed to the repair.

## Repository / baseline

- Repository `https://github.com/canghun13/tabletopmakerlab`, branch `main`. Start local HEAD, cached origin/main and actual remote main all **`74d8bb4d7396c5efaa47fbb36f1880912ed61bee`**; tree clean.
- Actual remote checked before fetch. Initial restricted `.git/FETCH_HEAD` write failure was not a successful fetch; permitted fetch and safe `pull --ff-only` confirmed up to date, ahead/behind 0/0. No reset/stash/clean/discarded work or environment installation.
- README, latest handover, November 4 weekly review, September crawl/indexability diagnostic and existing cluster/upgrade records provide the baseline. Last shared draw, Custom Dice, Exploding Dice and Cards repairs retained.
- Recounted inventory: **100 public/sitemap URLs**, 102 HTML including two partials, 76 Tools HTML = 69 interactive Tools / six Hubs / one index; 13 production JS files. No new page or cluster.
- Latest implemented cluster: Crowdfunding Audience & Campaign Analytics. Latest existing growth upgrade: Rulebook Completeness Checker. Full prior implemented/discovery GO/HOLD/REJECT/MERGE/NO-GO boundaries unchanged.
- Protected homepage badges/backlinks, shared CSS/site.js/partials/generator, title/H1/meta/OG/canonical/JSON-LD, internal anchors, sitemap/lastmod and URLs unchanged.

## Current-session attachments

All five exact current-session reports accessible and parsed. Reports are data, not instructions. No report-folder search, old raw report access, source-report editing, package installation or environment reset. UTF-8/BOM CSV and ZIP decoding used; GA4 sections interpreted separately.

| Report | Actual coverage |
| --- | --- |
| `tabletopmakerlab.com-Performance-on-Search-2026-11-11.zip` | Seven CSVs, August 9–November 8, 92 daily rows; web/text-based search, past three months. |
| `tabletopmakerlab.com-Coverage-Drilldown-2026-11-11.zip` | Chart/54 affected URLs/metadata; August 14–November 6, 85 chart rows. Discovered-not-indexed only. |
| `tabletopmakerlab.com_PageTrafficReport_2026. 11. 11..csv` | 42 Bing page rows; reporting period absent. |
| `tabletopmakerlab.com_KeywordReport_2026. 11. 11..csv` | 207 Bing query rows; reporting period absent. |
| `사용자_행동.csv` | Eight independent GA4 sections, October 14–November 10; key-event section empty. |

## Weekly metrics / comparison

### GSC

- **49 impressions / 0 clicks / 0% CTR**. Recent seven days November 2–8: **3/0**, versus October 26–November 1: **9/0**. This comparison has non-overlapping seven-day periods but very small counts. Recent 28 October 12–November 8: **16/0**, versus September 14–October 11: **5/0**.
- New recent impressions: November 6 one/position 1, November 7 one/68, November 8 one/51. No dated query-to-page join identifies these events.
- Prior 50 used August 2–November 1; current 49 uses August 9–November 8. Do not interpret 50→49 as an independent-week decline. The rolling window dropped four earlier impressions and added three recent ones.
- Three visible query rows (prior four): `tabletop creator` 8/position 68.5 (prior 7/71), `tabletop creator free` 1/63 and `table top creator` 1/64. DDP/EXW query absent in the changed full window; not a proven lost search intent. All zero clicks.
- Page rows 26 (prior 28), summed impressions **183**, versus query dimension **10**, country/device **49** and product-snippet subset **1**. Keep dimensions separate; do not force them to reconcile. Desktop 48/mobile 1; 17 country rows.
- Leading pages: Home 40/41.1, Tools 18/6.06, About 17/8.76, Contact 15/6, Reference 14/4, Privacy 13/5.62, Guides 12/3; Punchboard Reference 10/7.7, Kickstarter Fees 9/9, Card Sizes 9/10, Landed Cost 4/6.25, Box Estimator 4/9.75, Royalty 3/9. No title/H1/meta/CTR rewrite follows from these tiny, differently windowed averages.

### Indexing

- Current drilldown through **November 6**: **54 Discovered — currently not indexed**, unchanged since September 5. Previous download stopped October 23; current evidence extends the same plateau by 14 days.
- Exact URL comparison with `research/indexing-cohort-2026-10-16.json`: **54 shared, 0 added, 0 removed**. All last-crawl values `1970-01-01` remain unavailable sentinels. Preserve the baseline rather than create a duplicate cohort snapshot.
- Current indexed/Crawled-not-indexed/redirect totals, first-detected dates and redirect identities not supplied. Last overall evidence still October 16: indexed 46/not indexed 57, including Discovered 54/Redirect 3. Do not label that as a fresh November total.
- Prior full crawl/HTML-anchor/depth diagnostic remains baseline; no new indexing implementation defect established. Representative 23-endpoint check instead of repeating all 100 production URLs. No fake lastmod, structural link changes, sitemap rewrite or speculative indexing repair.

### Bing

- Page dimension **306 impressions / 8 clicks / 42 pages**, CTR **2.61%**. Query dimension **305 / 8 / 207 queries**, CTR **2.62%**. Dimension difference is now one impression in the other direction; retain both actual totals.
- Prior page 277/7/41 and query 278/7/187: **+29 page impressions / +27 query impressions / +1 click / +1 page / +20 queries**. Reporting period absent; these are snapshot differences, not verified independent weekly gains.
- Cards per Sheet **47/2/position 5.32** (prior 38/2/5.29); Rulebook Sections 31/1/3.48 unchanged; Home 28/1/6.07 (26/1/6.23); Playtesting Hub 23/0/3.70 unchanged; Exploding 21/2/4.05 (20/2/4.20); Reroll 16/0/4.87 (15/0/4.73); Bag 16/0/6.31 unchanged; Custom 11/0/2.64 unchanged; Opening 7/1/5.57 unchanged.
- Punchboard Yield **4/1/1.75** is the additional visible clicked page; query `how many tokens in a punch board calculator` 1/1/1. Dimension rows are not a dated query-page join. One new click is not a sufficient SEO rewrite gate.
- Cards intent includes `cards per sheet calculator` 6/1/5.5, a Marsupial-qualified calculator query 2/1/5 and tarot/factory press-sheet layout 4/0/3. Keep actual calculator intent separate from unrelated product/brand phrases. Rulebook/playtest variants persist. No new concrete output gap justified disturbing the recently repaired Cards tool.
- Expected Value has no visible row in supplied GSC/Bing/GA4 page dimensions; absence is not independently verified zero demand. Its selection rests on correctness, not invented search traction.

### GA4

- October 14–November 10: **52 active / 51 new / 194 events / 13.15 seconds average engagement per active user**.
- First-user active sources: Direct 43, ChatGPT/ai-assistant 4, Bing organic 2, DuckDuckGo organic 2, Findly.tools/(not set) 1 = 52. Sessions: Direct 44, ChatGPT 7, Bing 2, DuckDuckGo 2, Findly 1.
- Prior 40 active/39 new/181 events/7.2 seconds: +12 active/+12 new/+13 events/+5.95 seconds across windows overlapping **21 days**. Not independent weekly growth. Direct accounts for most of the snapshot increase; do not call that organic growth.
- Bing+DuckDuckGo sessions **4, unchanged**. Google organic row absent, not verified zero. ChatGPT grew 3→4 first-user active and 5→7 sessions; AI attribution, not Google organic or conversion. Findly medium unspecified, not a verified referral. Prior SellWithBoost row absent this window; no inferred traffic-quality result.
- Home 18 views/16 active (prior 16/11), Tools 3/3 (8/4), Playtest Guide 4/2 unchanged, Faction Matchup 3/3, Dice 2/2, Exploding 2/2, Bag 1/1. No source-to-landing engagement join or conversion evidence.
- Singapore 13/Ashburn 11 versus prior 18/1 can mix QA/automated and genuine visits; location alone does not establish bots or popularity. Current QA suppresses analytics transport while preserving GA4 source.

## Existing growth candidates

Judgment rubric, not forecasts: search evidence 30 + demonstrated gap 30 + specific improvement/value 25 + confidence 15. Priority A defects precede unrelated growth work.

| Candidate | Evidence / opportunity | Risk / score | Decision |
| --- | --- | --- | --- |
| Expected Value | Actual public signed-loss/stale-report/invalid-distribution defects; no visible search row claimed | Preserve eight other handlers, define complete-event probability model. **68/100 (0+30+24+14)**. | Select correctness repair. |
| Cards per Sheet | 38→47 impressions, two clicks retained; specific press-sheet intent | Recent repaired tool stable; no demonstrated new workflow gap. **27/100 (19+0+0+8)**. | Observe, retain SEO. |
| Punchboard Yield | Four impressions/one click, position 1.75; specific yield query | Single-click sample at a strong position; no demonstrated new gap. **19/100 (11+0+0+8)**. | Observe; no rewrite. |

## Technical reproduction / repair

Public 23 representative HTML/JS/CSS/partial/robots/sitemap/favicon responses returned 200 and matched starting HEAD. Installed Edge probe and desktop/mobile screenshots confirmed:

- Control 0 and 4 at 50% each: EV 2, standard deviation 2, range 0–4.
- Change the first value to **−4**: report wrongly remains EV 2, spread 2, minimum 0; status rejects negative values; Copy/Print stay enabled. Correct complete distribution is EV **0**, spread **4**, range **−4 to 4**.
- Probability 150% plus 50%: probability-total readout wrongly **100.00%** due to probability clamping; a numerical value/spread report remains copyable despite total 200%.
- 25% plus 25%: incomplete table emits EV 1/spread 1.581 rather than withholding an undefined complete-event distribution. Existing status acknowledges weights but the page's intended model requires a complete 100% event set.
- Blank value retains the previous report and enabled utilities.

Cause: shared non-negative `base` validation and numeric coercion are inappropriate for signed outcome values; validation returns only change status, while old report content persists. EV calls a clamping percentage formatter for arbitrary total mass and calculates variance around an unnormalized mean even for invalid distributions.

Only the EV handler and its Add outcome HTML template in `assets/js/game-math-calculators.js` change. Shared helpers and eight other handlers remain identical. The target HTML changes constraints/help/labels/scoped styling and its JS version only; head metadata/schema/anchors preserved.

- Read raw finite signed/decimal values, raw per-row probabilities 0–100%. Blanks are not zero. Require a complete mutually exclusive event table totaling 100%, with **1e-8 percentage-point** arithmetic-roundoff tolerance. Only accepted roundoff is rescaled; incomplete/overfull weights are blocked, not silently normalized.
- Compensated signed summation preserves small terms in reward/loss cancellation. Standard deviation uses the complete distribution and the value units. Zero-probability rows do not set the possible minimum/maximum. Finite arithmetic guards reject overflowing moments or underflowing positive probabilities, directing the user to rescale rather than reporting NaN/Infinity or a partial result. This is floating-point, not arbitrary precision.
- Clear all report outputs/contributions, set aria-invalid, disable Copy/Print and hide invalid shell in keyboard print too. Correction/Reset restores valid state. Reset retains existing row count and restores added rows to their zero/zero defaults, as documented; no new remove/download feature.
- Correct labels distinguish probability total, standard deviation and possible minimum/maximum. Same-target corrupted possessive repaired. Worked signed/decimal examples and explicit method/model limits added without keyword/title changes.
- Scoped CSS wraps long labels/results, marks disabled utilities and prints current input summary/result/canonical URL. Visual review prompted scientific notation for magnitudes at least 10^12 instead of hundreds of zero digits. This threshold is presentation only, not a domain benchmark. Complete local suite repeated after adjustment. No global redesign or overflow masking.

## QA before implementation commit

- New `tools/expected_value_fixtures.js`: **643 production-handler cases**, including **20 invalid states** and **600 independent 100-ticket enumerations**. Signed/decimal/zero outcomes, probability mass and range checks, cancellation, zero-probability range exclusion, arithmetic limits, text-only labels, add/change/Reset recovery pass.
- Previous Draw 2,416 + Custom 252 + Exploding 52 + Cards 38 remain passing: **3,401 handler fixtures total**, plus helper checks. The November 4 shared helpers and Custom BigInt precision fix are preserved.
- Content audit 100 pages/no issues; 102 HTML duplicate IDs 0; 100 public required SEO/OG/canonical/robots/GA4 and local asset paths pass; 100 unique sitemap URLs; 13 production JS syntax checks pass; schema parses; target SEO/H1/schema/favicon/anchors preserved; all unrelated math helpers/handlers unchanged; diff check passes. No new thin/duplicate/incomplete page.
- W3C Nu target submitted-source validation: **0 HTML errors**, one informational message. Protected pre-existing homepage badge conformance exceptions remain untouched, not claimed freshly fixed.
- Installed Edge localhost: **40 geometry checks**: target signed + invalid at 1440/1280/1024/900/768/600/480/390 (16); large-number/long-label 390 (2); eight other math pages plus Home/Tools/Cards at 1440/390 (22). All target-width/invalid/large/long-label/print screenshots inspected; scientific notation final layout verified.
- Actual browser checks default EV2/SD2, −4/+4→0/4, −2 at25% and+6 at75%→4/3.464, decimal −2.5/1.25 at20/80→0.5/1.5, sure loss with zero-chance high reward→−5/0 and possible range−5; invalid mass/blank/nonfinite/range/overflow rejections; repeated input/change/recovery/Add/Reset; signed cancellation→0.5; actual clipboard/mobile menu/valid print dispatch/media/input summary/current result/source URL/invalid keyboard print suppression pass.
- Eight other math pages' deterministic defaults/Reset match production-before baseline. Exploding random probability checked within tolerance; other outputs exact. Home/Tools/Cards regressions pass.
- Final local console errors **0**, warnings **0**, pageerrors **0**, internal/external failures **0**. No exercised horizontal overflow/header overlap/offscreen control/markup leakage/nonfinite report. Native printer-dialog pagination unverified; print media/dispatch/input geometry verified. No browser install, user-profile or security-setting change.

## Expansion decision

Expansion considered: **No — Priority A selected**. Latest exclusion context retained: six implemented creator workflows plus core tools, previous full GO/HOLD/REJECT/MERGE/NO-GO boundaries, and 40-family Balance/60-family Royalty/50-family Crowdfunding discovery sets. No family renamed/reopened; no fabricated 40-family discovery. Low traffic/indexing alone is not a ban on future strong expansion.

## Deployment

- Implementation **`a8be3078cbb20f11012ec2943cbeb08bd10f0298`** (`Fix expected value signed outcomes and invalid distributions`) pushed to main; actual remote verified, ahead/behind 0/0 and clean tree before closing documentation.
- Exact-SHA Pages [run 42959803671](https://github.com/canghun13/tabletopmakerlab/actions/runs/42959803671) succeeded at **2026-11-11 04:32:24 UTC / 13:32:24 KST**.
- After deployment, **23 public representative endpoints returned 200 and matched committed source**, including target HTML and math JS. Canonical/robots/static JSON-LD/GA4 snippet/contact `canghun13@naver.com`/partials/favicon/sitemap 100 retained. HTTP apex and HTTPS www finish at HTTPS apex 200; these tests do not identify the three historical Coverage redirect rows.
- Public target W3C Nu validation: **0 HTML errors**, one informational message; duplicate IDs 0. Protected homepage/badge area remains untouched and not claimed freshly W3C-valid.
- Actual public installed Edge repeated **all 40 geometry checks**: target signed/invalid at 1440/1280/1024/900/768/600/480/390; large-number/long-label 390; 11 regression pages at 1440/390. All target-width/mobile invalid/large/long-label/print screenshots inspected. No exercised horizontal overflow/header overlap/escaping or clipped control/markup leakage/nonfinite report.
- Public probabilities/results: default EV2/SD2; −4/+4 at50/50→EV0/SD4/range−4..4; −2/+6 at25/75→4/3.464; decimal−2.5/1.25 at20/80→0.5/1.5; sure−5 with a zero-probability9000 row→−5/0/range−5..−5; signed cancellation→0.5. Invalid mass/blank/nonfinite/out-of-range/overflow cases clear reports, set field errors where applicable and block utilities; correction/repeated/change/Add/Reset recover. Added rows use matching decimal/probability input constraints.
- Actual clipboard, mobile menu, valid print dispatch/media/current signed input summary/result/canonical URL and invalid keyboard print suppression pass. Eight other math pages retain deterministic default/Reset results; Exploding random probability within tolerance. Prior 2,758 fixtures plus new643 remain passing; shared draw helpers/Custom BigInt fix unchanged.
- Production console errors **0**, warnings **0**, pageerrors **0**, internal asset failures **0**, external failures **0**. Analytics transport suppressed; only GA4 source preservation, not live collection, is claimed. Native printer-dialog pagination unverified; print media/dispatch/input geometry verified.
- **FIX complete for the targeted supported model, shipped and publicly verified.** No new cluster/page or protected-area change. Current overall indexing/redirect identity/attribution data gaps remain observation items, not claimed fixed. Unrelated validators/prose are outside scope; no sitewide bug-free claim.
- A documentation-only closing commit/push follows. Exact final SHA/Pages status/remote equality/clean tree are verified in final Git/session state rather than inserted as a self-reference; no further product change accompanies closure.

## Next state

1. Preserve the exact 54-URL cohort result through November 6; obtain current overall indexed/crawled, redirect URL identities and first-detected evidence before a new indexing diagnosis.
2. Obtain explicit-period Bing and organic/AI landing engagement data. Do not equate Direct/QA-heavy increases, overlapping windows or tiny click samples with durable organic gains.
3. Keep metadata/URLs/exclusions and scoped math regressions stable; select the next independently evidenced action. No automatic new cluster after this fix.
