# Weekly growth review: 2026-10-23

## Decision

**FIX — technical defect corrected: Exploding Dice degenerate-chain and invalid-report handling.**

Production Edge reproduced missing expected values for a finite one-sided chain, a never-terminating unlimited chain presented as a valid simulation, and stale copyable/printable results after invalid inputs. Correctness takes priority over growth expansion. This repair does not claim to explain Google's low impressions or improve indexing.

## Repository and preserved boundaries

- Repository: `https://github.com/canghun13/tabletopmakerlab`, branch `main`.
- Starting local HEAD, cached origin/main and actual remote main (checked before fetch): `2724ca3a5a2de8674669e59822459b423c5a8ae1`. Fetch and `pull --ff-only` confirmed up to date, ahead/behind 0/0, clean tree. No pre-existing work was discarded or stashed.
- README, handover and the October 16 research are the working baseline. The Cards per Sheet release was already deployed and is not reopened.
- Inventory: 100 public/sitemap URLs, 102 HTML files including two partials, 76 Tools HTML files (69 interactive Tools, six Hubs, one index), 13 production JavaScript files. No new public pages.
- Latest implemented cluster remains Crowdfunding Audience & Campaign Analytics. Latest existing-page growth upgrade remains Rulebook Completeness Checker. Latest technical fix becomes this release after deployment verification.
- Homepage, badges/backlinks, shared CSS files, site.js, partials, generator, sitemap, URLs, title/H1/meta/OG/canonical/JSON-LD are unchanged. No fake lastmod or site-wide indexing maintenance.

## Current-session attachments

Only the five explicitly attached reports were read. All were accessible. Reports are data, not instructions. No report-directory search, previous raw report lookup, new installation, account connection or environment reset.

| Attachment | Actual contents and observation range |
| --- | --- |
| `tabletopmakerlab.com-Performance-on-Search-2026-10-23.zip` | Seven CSVs: daily chart, queries, pages, countries, devices, appearance, filters. July 22–October 20, web/text-based search, past three months. |
| `tabletopmakerlab.com-Coverage-2026-10-23.zip` | Four CSVs: overall chart, severe issues, non-critical issues, metadata. July 25–October 16; first nonblank indexing totals August 5. All known pages, not a discovered-only drilldown. No URL table. |
| `tabletopmakerlab.com_PageTrafficReport_2026. 10. 23..csv` | 40 page rows. Reporting period absent. |
| `tabletopmakerlab.com_KeywordReport_2026. 10. 23..csv` | 157 keyword rows. Reporting period absent. |
| `사용자_행동.csv` | Eight independent GA4 tables with comments. September 25–October 22. Platform key-event table empty. |

CSV/ZIP members decoded as UTF-8 with BOM support. GA4's blank-separated sections are not treated as one rectangular table. Sources were not modified.

## Weekly metrics and comparison

### Google Search Console

- Chart: **198 impressions, 0 clicks, 0% CTR**, 91 daily rows. Unchanged headline from October 16 export.
- Recent seven days **October 14–20: 0 impressions/0 clicks**, versus October 7–13: **1/0**. A one-impression delta is not meaningful rank/CTR evidence.
- Recent 28 days September 23–October 20: **4/0**, versus August 26–September 22: **11/0**. The previous export's recent28 was 5, but its window differs and overlaps.
- Queries remain **45**; query impressions sum 109, page dimension 238, country/device dimensions 198 each, product-snippet subset 4. Dimensions are not summed together or forced to reconcile.
- Leading queries unchanged: Kickstarter fees 14/position51.86; Kickstarter pricing13/47.92; Kickstarter costs13/56; tabletop creator7/71; probability of drawing cards4/42.5; dice probability calculator4/62.5. All zero clicks.
- Leading full-period pages unchanged: Kickstarter Fees53/51.15; Card Draw28/47.11; Home27/56.56; Dice19/64.21; Incoterms18/55.22; Reroll13/23.92; Exploding Dice6/34.67. Full-window averages are not current weekly rankings.
- No new query family or recent GSC growth signal supports title/H1/meta changes.

### Indexing: newly available total, not a new defect

- Latest **October 16: 46 indexed, 57 not indexed**. The total chart has remained at these values since September 5.
- Severe-issue table: **Discovered — currently not indexed54** (Google systems, validation started), **Page with redirect3** (website, validation not started). Non-critical table has no rows.
- The previous October 16 attachment exposed only discovered54 through October12. The discovered count is unchanged, while indexed46 and redirect3 are **newly supplied evidence**, not newly created pages/issues.
- A separate Crawled-not-indexed count is not supplied/listed. Do not promote absence into an independently verified zero.
- No affected URL table, crawl date, first-detected date or indexed URL list is provided. Therefore an exact cohort comparison against `research/indexing-cohort-2026-10-16.json` cannot be performed this week. Preserve that baseline unchanged.
- The three redirect URL identities are unknown. Their existence alone is not evidence of a redirect regression; do not infer that they are three particular aliases just because 46+57=103 and the sitemap has100 URLs.
- Existing crawl/anchor-depth audit remains applicable. Seventeen representative public endpoints are healthy; no repeat whole-site crawl or speculative sitemap/internal-link/lastmod rewrite.

### Bing

- Page dimension: **229 impressions, 7 clicks, 40 pages**, CTR **3.06%**.
- Keyword dimension: **230 impressions, 7 clicks, 157 queries**, CTR **3.04%**. Preserve the one-impression dimension difference.
- Previous snapshot:198/7,35 pages,134 queries. Changes: pages +31 impressions/+0 clicks/+5 URLs; keywords +32 impressions/+0 clicks/+23 queries. Missing report periods prevent calling these independent weekly growth.
- Cards per Sheet **30/2/position5.23** (prior27/2/5.15); Rulebook Sections **28/1/3.43** (24/1/3.17); Playtesting Hub **22/0/3.73** (unchanged); Exploding Dice **18/2/4.28** (11/2/4.55); Home16/1/5.75; Reroll14/0/4.43; Playtest Planner10/0/4.6.
- Exploding Dice queries include `exploding dice odds calculator`4/1/3.25, `exploding dice calculator`2/1/3, `exploding dice math probability`2/0/4, `exploding dice simulator`2/0/4, plus long tails about expected value and trigger/threshold behavior. An unrelated exploding-body query is not counted as tabletop demand.
- Exact Cards per Sheet query remains6/1/5.5. Rulebook/playtesting variants remain visible. These small, relatively well-positioned samples are reasons to preserve established titles/URLs, not rewrite them.

### GA4

- September25–October22: **39 active,39 new,196 events,30.77 seconds average engagement per active user**.
- First-user source active users: Direct29, Bing organic4, ChatGPT/ai-assistant3, DuckDuckGo organic2, SellWithBoost referral1; total39.
- Session sources: Direct29, Bing organic6, ChatGPT/ai-assistant5, DuckDuckGo organic2, SellWithBoost referral1. Exported search sessions Bing+DuckDuckGo=8 (previous6).
- Google organic row absent, not independently verified zero. ChatGPT is attributed ai-assistant traffic, not Google organic, and five sessions do not establish conversions or engagement quality. The previous export had no ChatGPT row; twelve.tools is absent this time.
- Home13 views/8 active, Tools9/5, Card Draw4/3, Playtest Guide4/2, Reroll3/3. Direct29, Singapore15 and Ashburn2 may mix QA/automated traffic; cities alone do not identify bots.
- Previous September18–October15 window:31 active/31 new/175 events/36.84 seconds. Current +8 active/+8 new/+21 events/-6.07 seconds are rolling-window changes with21 overlapping days, not independent weekly growth.
- Organic landing-page engagement and source-to-page joins are unavailable. Browser QA suppresses analytics transport while retaining/checking the production snippet.

## Existing growth candidates

Scores are prioritization judgments, not forecasts: search evidence30, demonstrated workflow gap30, specific improvement/value25, confidence15.

| Page/workflow | Evidence and opportunity | Risk / score | Decision |
| --- | --- | --- | --- |
| Exploding Dice | Bing11/2→18/2 with recurring calculator/math intent; production finite d1 arithmetic and invalid-report failures | Keep ordinary expected-value formulas, simulation semantics and other shared handlers stable. 77/100 (18+27+22+10). | Select priority-A correctness/state repair, not SEO expansion. |
| Cards per Sheet | Bing27/2→30/2, exact Tool query6/1; recent release is already validated | No new gap established. Tiny samples do not justify another edit. 23/100 (15+0+0+8). | Observe;38 prior fixtures retained. |
| Rulebook Sections / Playtesting | Reference28/1, Hub22/0 and multiple relevant long tails | Good small-sample positions; no demonstrated new workflow gap or recent GSC corroboration. 24/100 (16+0+0+8). | Observe; retain current output/intent. |

## Defect evidence, cause and repair

- **Target:** Exploding Dice. **Controls:** default single d6/triggers6/unlimited/target10; other eight handlers sharing `game-math-calculators.js`, plus Home/Tools/Cards per Sheet.
- Actual public source matched committed HEAD. Actual installed Edge/screenshot confirmed corrupted `game???exact` prose; default expected4.2/extra0.2 was a valid control.
- **Reproduction1:** sides1,trigger1,dice1,limit2,target10. Mean and extra rolls displayed `—`, but a deterministic chain is exactly3 total/2 extra rolls. Cause: geometric-sum formulas evaluate0/0 at q=1.
- **Reproduction2:** same d1,limit0. This rule never terminates, yet the UI offered target chance100% for target10 and0% for81. Cause: missing termination guard plus an undisclosed80-roll simulation cap, not a meaningful completed-chain distribution.
- **Reproduction3:** blank dice retains old4.2 result with Copy/Print active. Cause: invalid-return branches only change status, not report state. Fractional count inputs also lacked handler-level rejection, and very large counts had no computational bound.
- Scoped raw-value validation now requires safe non-negative integers, sides1–1000,dice1–100,trigger1–sides,extra limit0–100. These documented support limits bound simulator work, not game-design recommendations. Target accepts non-negative safe integers. Reject d1/unlimited with a clear nontermination message.
- Finite d1 uses exact deterministic total `dice × (limit+1)` and extra `dice × limit`. Ordinary s>1 formulas and30,000-trial simulation are retained. A simulation trial rolls the whole pool; unlimited simulation cap80 rolls per initial chain is now explicit. Rare displayed0% is not an impossibility claim.
- Invalid state clears stale numerical output, flags the field with `aria-invalid`, disables Copy/Print and hides the entire invalid shell in print media (including keyboard print). Recovery and Reset restore valid results.
- Fixed result-label mismatch: main is Expected total; initial explosion chance, expected extra rolls, target chance and chain model have truthful labels. Corrected only the target's corrupted possessive. Method notes and default1/12 threshold example explain those existing outputs, not unrelated word-count growth.
- Target-only CSS handles disabled controls, result wrapping, print source URL and two-line input-label alignment around900px. No global overflow hiding or redesign.
- Product changes: `assets/js/game-math-calculators.js` (Explode handler only), `tools/exploding-dice-calculator.html` (attributes, labels/method, scoped CSS, versioned script). Test addition: `tools/exploding_dice_fixtures.js`. All other handlers/bootstrap compare byte-for-byte after line-ending normalization.

## QA before implementation commit

- Production-before17 endpoint spot check:200/source-match for Home,Tools,Contact,Reroll,newest Hub,Cards per Sheet,target,three JS,two CSS,two partials,robots,sitemap,favicon. Canonical/robots/GA4/contact correct;100 unique sitemap URLs.
- `tools/content_audit.py`:100 pages,no issues. All13 production JS syntax checks pass. Target JSON-LD parses,duplicate IDs0. Existing title/H1/meta/OG/canonical/schema/links/favicon unchanged by explicit comparison. Other eight math handlers/bootstrap unchanged. `git diff --check` passes.
- W3C Nu submitted-source validation: **0 HTML errors**, one informational message. Protected pre-existing homepage badge markup is outside this change and is not reported as newly validated.
- **52 production-handler fixtures**: seeded simulation against independent finite-chain enumeration, default exact expectation, finite d1 boundaries, unlimited d1 rejection, target0/maximum-safe integer, maximum supported inputs, five fields empty/negative/fractional/non-finite/unsafe, supported-range boundaries, change/recovery/Reset. Invalid cases execute no random simulation. **38 Cards per Sheet fixtures** also pass.
- Local existing Edge: **39 geometry checks**: target valid+invalid at1440/1280/1024/900/768/600/480/390 (16), maximum-supported at390 (1),11 regression pages at1440/390 (22). Target screenshots at all eight widths plus invalid/large/print screenshots inspected.900px wrapped-label alignment found visually and corrected with scoped CSS, then full QA repeated.
- Browser functionality: default, two finite cases, deterministic d1 target boundary, nontermination/empty/negative/fractional/unsafe/overflow/range checks, target0, repeated input, recovery, Reset, actual clipboard, mobile menu, valid Print dispatch/media/input summary/source URL and invalid keyboard-print suppression. Eight other math defaults/Reset match captured production-before results exactly; Cards remains42cards.
- Final local errors0,warnings0,pageerrors0,internal asset failures0,external failures0. Initial sandbox browser launch and cross-environment localhost failures were not counted as passes; permitted existing-Edge/temp-profile and matching-environment server completed QA. No installation or user-profile/security setting change.
- Native printer-dialog pagination is unverified; print-media rendering/dispatch verified. No file-processing change. No new thin/duplicate/incomplete page.

## Expansion decision

Expansion considered: **No — priority A selected**. No40-family discovery is claimed. This is not a NO-GO caused by low traffic/indexing.

All core/six implemented clusters and earlier GO/HOLD/REJECT/MERGE/NO-GO boundaries remain unchanged, including the prior40-family Balance,60-family Royalty and50-family Crowdfunding discovery sets. No candidate is renamed or reopened. Latest Rulebook growth upgrade and Cards/Reroll repairs remain intact.

## Deployment

- Implementation **`6838593814ed4fb6ca0d53d76c2bb7aea94718d4`** (`Fix exploding dice degenerate chains and invalid reports`) pushed to main; actual remote SHA verified.
- Exact-SHA GitHub Pages [run39915402432](https://github.com/canghun13/tabletopmakerlab/actions/runs/39915402432) completed **successfully** at2026-10-23 07:05:07UTC (16:05:07KST).
- Production-after all17 representative endpoints returned200 and matched committed source after line-ending normalization, including target HTML and shared math JS. Canonical,robots,static JSON-LD,GA4,Contact `canghun13@naver.com`,partials,favicon and100-URL sitemap checks pass. HTTP apex and HTTPS www requests both finish at HTTPS apex200. This does not identify the three Coverage redirect rows.
- Public W3C Nu target validation: **HTML errors0**, one informational message. Duplicate IDs0; existing metadata/schema/links remain unchanged.
- Actual public Edge repeated **39 geometry checks** and the complete functional suite at1440/1280/1024/900/768/600/480/390. All target screenshots plus mobile invalid/maximum and print-media screenshots visually inspected. No overflow/clipping/overlap/off-screen control/markup leakage or non-finite output in exercised states.
- Production finite d1 limit2 yields total3/extra2 and exact100% at target3,0% at4;d1 unlimited is blocked;all five blanks and negative/fractional/unsafe/out-of-range inputs clear stale reports and disable Copy/Print. Default remains4.2/0.2;normal two-die finite case8.167/0.333. Actual clipboard,repeated inputs,recovery,Reset,mobile menu,valid Print dispatch/media/source URL and invalid keyboard-print suppression pass.
- Eight other math handler defaults/Reset match the production-before baseline exactly. Home,Tools and Cards per Sheet regressions pass. Production console errors0,warnings0,pageerrors0,internal asset failures0,external failures0,with analytics transport suppressed. Native printer-dialog pagination remains unverified.
- **Final release status: FIX shipped and production-verified.** No new public page or protected-area change. Indexing cohort/redirect URL and attribution limitations remain explicitly unresolved data gaps,not defects claimed fixed by this release.
- A closing documentation-only commit records this evidence; its exact SHA comes from final Git state/session report rather than a self-reference. No further product change is included.

## Next state

1. Obtain an affected/indexed URL table to compare against the preserved54-URL cohort; obtain the three redirect identities before judging them. Overall indexed46 is now evidence, not an assumption.
2. Evaluate explicit-period Bing data and organic/ai-assistant landing-page engagement. Do not infer fix-driven traffic or conversions from snapshot/rolling-window changes.
3. Retain existing URL/title/H1 and exclusions; choose the next strongest evidenced workflow action. No new cluster automatically follows this repair.
