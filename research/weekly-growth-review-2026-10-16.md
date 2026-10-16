# Weekly growth review: 2026-10-16

## Decision

**FIX — technical defect corrected: Cards per Sheet invalid-input and impossible-layout results.**

Actual production Edge reproduced `NaN%`, `Infinity cards`, and `0 sheets for 360 cards` when no cards can fit. The current Bing-leading Tool has a demonstrable calculation/state defect. Priority A takes precedence; no new cluster discovery or content/SEO expansion is selected.

The repair is scoped to this Tool's handler and HTML. It does not claim to resolve Google's indexing backlog or explain search performance.

## Repository and prior state

- Repository `https://github.com/canghun13/tabletopmakerlab`, branch `main`.
- Start local HEAD/cached origin: `a6df5ef79480d5015d4a1fa1369abaa66bf282b9`; actual remote checked before fetch: `42809dd03298d6d68e00c623a4679a8b975b70ba`.
- Starting tree clean. Actual remote/fetch and safe fast-forward restored the October 9 weekly review and Reroll repair; synchronized HEAD/origin/actual remote `42809dd03298d6d68e00c623a4679a8b975b70ba`, ahead/behind 0/0, clean tree. No reset/stash/forced update or discarded work.
- README, handover history, October 1/9 reviews and the crawl-architecture baseline informed this review. Reroll's two corrupted possessives were already fixed and were not reopened.
- Public inventory remains 100 unique HTML/sitemap URLs: 76 Tools-directory HTML files (69 interactive Tools, six Hubs, one index), plus core/Guide/Reference pages. Repository HTML including partials: 102; production JS: 13.
- Latest cluster remains Crowdfunding Audience & Campaign Analytics (September 8); latest growth upgrade remains Rulebook Completeness Checker (August 20). Latest technical fix becomes this release after production verification.
- Homepage, shared Header/Footer and user-managed badges/backlinks are protected and unchanged.

## Current-session attachments and observation dates

Only the five exact user-attached reports were opened; no report-directory search, source-file edits, installation or account access. All were accessible. Report content was treated as data, not instructions. CSV/ZIP contents were decoded as UTF-8 with BOM handling; GA4's separate tables were parsed independently. Filename dates do not establish report periods.

| Report | Contents | Actual range / limitation |
| --- | --- | --- |
| `tabletopmakerlab.com-Performance-on-Search-2026-10-16.zip` | Daily chart, queries, pages, countries, devices, appearance, filters | July 22–October 13; web/text-based, past three months |
| `tabletopmakerlab.com-Coverage-Drilldown-2026-10-16.zip` | Discovered-not-indexed chart, affected URLs, metadata | July 24–October 12; 54 URL rows |
| `tabletopmakerlab.com_PageTrafficReport_2026. 10. 16..csv` | Page impressions/clicks/CTR/position | 35 pages; reporting period absent |
| `tabletopmakerlab.com_KeywordReport_2026. 10. 16..csv` | Keyword impressions/clicks/CTR/position | 134 keywords; reporting period absent |
| `사용자_행동.csv` | User totals, pages, first-user/session sources, retention, platform, city, audience | September 18–October 15; platform event table empty |

## Weekly metrics and comparison

### Google Search Console

- Daily chart: **198 impressions, 0 clicks, 0% CTR**, 84 daily rows.
- Recent seven days October 7–13: **1 impression/0 clicks**, versus September 30–October 6: **3/0**. Delta -2 impressions (-66.7%) on a tiny sample. The only new impression is October 10, position 73.
- Recent 28 days September 16–October 13: **5 impressions/0 clicks**, versus August 19–September 15: **15/0**. Delta -10 (-66.7%); no strong recent growth signal.
- Compared with the October 9 export: headline 197→198, queries remain 45. Query impression sum 108→109; page dimension 237→238. These are separate aggregation dimensions, not additive totals; the chart supplies the headline.
- Top queries: Kickstarter fees 14 impressions/position 51.86; Kickstarter pricing 13/47.92; Kickstarter costs 13/56; tabletop creator 7/71; card draw and dice probability queries 4 each. All zero clicks.
- Top full-period pages: Kickstarter Fees 53/51.15; Card Draw 28/47.11; Home 27/56.56; Dice Probability 19/64.21; Incoterms 18/55.22; Reroll 13/23.92. Home was 26/55.92 in the prior export. Full-window averages are not current weekly rank changes.
- Country and device tables each sum to 198. Desktop 153, mobile 23, tablet 22; product-snippet appearance is a four-impression subset. No current query-to-page or source-to-engagement join is supplied.

### Indexing

- Metadata identifies **Discovered — currently not indexed**. Latest chart is **54 on October 12**, unchanged since September 5 and unchanged from the prior October 4 count.
- All 54 table values for last crawl are `1970-01-01`; treat as unavailable/sentinel, not real crawls. First detected, total indexed and Crawled-not-indexed are not supplied. Do not assume the other 46 sitemap URLs are indexed.
- Earlier repository research did not preserve an exact URL cohort, so a formal prior-cohort addition/removal comparison cannot be established from repository records alone.
- This session saves the exact current public URL set and export SHA-256 in `research/indexing-cohort-2026-10-16.json`, allowing the next review to compare URLs rather than counts alone. Chart-through date and unavailable-crawl semantics are explicit.
- Existing September crawl audit and October source-anchor join remain the baseline. Representative checks are healthy; no repeat all-URL production crawl, speculative link rewrite or fake lastmod.

### Bing

- Page report: **198 impressions/7 clicks/35 pages**, aggregate CTR **3.54%**.
- Keyword report: **198 impressions/7 clicks/134 queries**, aggregate CTR **3.54%**. Keep the two dimensions separate even when totals agree.
- Prior snapshot: 167/6 with 33 pages and 114 queries. Deltas +31 impressions/+1 click/+2 pages/+20 queries are snapshot changes, not proven weekly growth, because both reporting periods are absent.
- Cards per Sheet **27/2/position 5.15**, previously 20/1/5.05; Rulebook Sections **24/1/3.17**, previously 21/1/3.38; Playtesting Hub **22/0/3.73**, previously 21/0/3.71; Home **14/1/5.43**; Reroll **12/0/4.50**; Custom Dice **11/0/2.64**; Exploding Dice **11/2/4.55**; Opening Hand **5/1/5.8**.
- Exact `cards per sheet calculator` 6 impressions/1 click/position 5.5; `exploding dice odds calculator` 4/1/3.25. A new small stack-height phrase, `calculate 31 400gsm cards deck heightt`, has three impressions at position 6. Neither tiny samples nor good existing positions justify title/H1 changes.
- No causal ranking/click benefit is attributed to previous copy fixes.

### GA4

- September 18–October 15: **31 active users, 31 new users, 175 events, 36.84 seconds average engagement per active user**.
- First-user sources: Direct 25 active, Bing organic 3, DuckDuckGo organic 1, SellWithBoost referral 1, twelve.tools directory 1. These source rows total 31.
- Session sources: Direct 25, Bing organic 5, DuckDuckGo organic 1, twelve.tools 2, SellWithBoost 1. Google organic and ChatGPT rows are absent, not independently verified zeros.
- Search-driven supporting signal is six exported Bing/DuckDuckGo sessions, unchanged in total from the previous export's 4+2, with distribution now 5+1. Their landing-page engagement is unavailable.
- Meaningful small referrals: twelve.tools two sessions and SellWithBoost one session. No quality/retention conclusion from one or two sessions.
- Home 16 views/10 active, Tools 10/6, Card Draw 4/3, Reroll 3/3. Direct 25 active and Singapore 12 (Ashburn 1) may include QA/automated traffic; do not equate QA views with product demand or identify bots from city alone.
- Previous window September 11–October 8: 30 active/29 new/170 events/44.2 seconds. Current window shifts seven days and overlaps for 21 days; +1 active/+2 new/+5 events/-7.36 seconds is not independent week-over-week growth.
- This session suppresses analytics transport in actual browser QA while retaining GA4 snippet checks.

## Existing growth candidates

Scores are prioritization judgments, not forecasts. Rubric: search evidence 30, demonstrated workflow gap 30, specific improvement/value 25, confidence 15. A technical defect is resolved before unrelated growth work.

| Page/workflow | Evidence / opportunity | Risk and score | Decision |
| --- | --- | --- | --- |
| Cards per Sheet | Three export snapshots show 17/1 → 20/1 → 27/2; exact Tool query persists; invalid/impossible output is reproducible | Search volume remains small; fix must preserve ordinary grid arithmetic and shared calculators. 72/100 (18+25+20+9) | Select priority-A validation/result repair; no title/intent expansion |
| Rulebook Sections / Playtesting | Reference 24/1, Hub 22/0, good average positions in small samples | No new output/workflow gap and no recent GSC corroboration. 22/100 (14+0+0+8) | Observe, keep current intent |
| Sleeved Card Stack | New GSM-to-height phrase, three impressions/position 6 | GSM does not identify actual stock thickness without material evidence; do not fabricate a universal conversion. 13/100 (7+0+0+6) | Observe; no new GSM estimator |

## Technical root cause and change scope

- Target: Cards per Sheet; controls: its normal default and other four handlers sharing `calculators.js`, plus Home/Tools/Reroll.
- Production reproduction before edits: HTTP 200, committed-source match, actual Edge DOM and inspected screenshot. Empty or zero sheet width gives `NaN%`; zero card dimensions with zero bleed/gutter gives `Infinity cards` and `NaN%`; oversized cards give `0 sheets for 360 cards`. Copy and Print were enabled in all cases.
- Cause: shared non-negative reader silently converts blank/invalid numbers to zero; the Sheet handler divides by sheet area and card pitch without positive-dimension/finite checks. A zero-yield branch substitutes zero required sheets even for positive demand. This is a pre-existing Tool defect, not evidence of a deployment or crawl problem.
- Sheet handler now validates actual field strings rather than the shared zero-fallback reader: four positive dimensions, all eight entered finite values, non-negative allowances, safe whole-number quantity. It rejects unsupported non-finite/unsafe intermediate counts and clears stale outputs with an explicit field error and `aria-invalid`.
- Invalid state disables Copy/Print; page-scoped print CSS hides the entire invalid calculation/summary even when print is triggered through the browser. Valid print keeps current title/input values/results plus explicit units and canonical page URL.
- Zero yield with positive demand now says **Not possible for N cards**, with a neither-orientation-fits instruction. This is a valid planning outcome, so a truthful no-fit report may still be copied/printed. Genuine zero demand remains zero sheets.
- The grid uses an algebraically equivalent first-card-plus-additional-pitches calculation and first checks the footprint fits; this avoids gutter/division edge cases while preserving normal estimates. Default remains 36 normal/42 rotated, 42 selected and nine sheets for 360; A4 with zero allowances remains 9/8 and 40 sheets.
- Dimension controls accept fractional millimetres (`step=any`); quantity is a required count. Page-scoped rules wrap large valid numbers and distinguish disabled utility controls. No blanket overflow hiding.
- Product files: `assets/js/calculators.js` (Sheet handler only) and `tools/cards-per-sheet-calculator.html` (input attributes, local styles/print note and versioned JS reference). New deterministic fixture: `tools/cards_per_sheet_fixtures.js`.
- Other handlers, shared bootstrap, CSS files, site.js, partials, generator, title/H1/meta/OG/canonical/schema/slug/links/sitemap/lastmod unchanged. No new public page. Protected homepage badges/backlinks unchanged.

## QA before implementation commit

- Current-site health spot checks: 15 public endpoints returned 200 and matched committed HEAD: Home, Tools, Contact, Reroll, newest Hub, target, robots/sitemap, two shared stylesheets, two JS files, partials and favicon. Checked canonical/robots/GA4/contact identifiers correct; sitemap remains 100 unique URLs. No repeat 100-URL crawl audit.
- `tools/content_audit.py` across 100 public pages reports no issues; production JS syntax 13/13 pass; `git diff --check` passes. Target schema parses; no title/meta/link/ID drift.
- Production-handler fixture: **38 cases**, including default, A4, exact one-card fit, decimal dimensions, zero demand, no-fit/excess margin/huge gutter, all eight blank/negative inputs, zero dimensions, fractional/unsafe quantities, numeric overflow/underflow, recovery and Reset. No non-finite output in exercised states.
- Local installed Edge: eight requested widths **1440/1280/1024/900/768/600/480/390**, both valid and invalid target states (16 combinations); no-fit and large-number states at 390 (2); seven regression pages at 1440/390 (14). **32 total geometry checks**. Default target screenshots at all eight widths, mobile invalid/large-number and print-media screenshots visually inspected.
- Functional browser tests: two independent normal arithmetic cases, zero quantity, impossible fit, eight blanks, zero/negative, fractional/unsafe quantity, overflow, decimals, repeated input, error/result/recovery, Reset, actual clipboard, mobile menu, Print button dispatch, valid print summary and invalid-state keyboard-print suppression. Other four shared-handler defaults/Reset unchanged.
- The initial restricted browser run completed layout/function checks but logged 12 `ERR_NETWORK_ACCESS_DENIED` console errors. It was not counted as a console pass. Repeating under the permitted execution environment completed all checks with errors/warnings/pageerrors/internal and external request failures **0 each**. No browser/software installation or user-profile/security change.
- Native printer-dialog pagination is not verified; print-media rendering and dispatch are verified. No file upload/CSV parser exists on the modified Tool. No new thin/duplicate/incomplete page.

## Expansion decision

Expansion considered: **No — priority A selected**. No 40-family discovery is claimed or required for this branch. This is not an expansion rejection based on low traffic/indexing.

Current exclusions remain all core/six implemented clusters and prior GO/HOLD/REJECT/MERGE/NO-GO families, including full 40-family Balance, 60-family Royalty and 50-family Crowdfunding discovery sets. Reroll/Components prose fixes remain closed. No old candidate is renamed/reopened, and no new HOLD/REJECT family is introduced.

## Deployment

Pending implementation commit, main push, matching Pages success and production repetition. Do not call this release shipped until the evidence below is completed.

## Next state

1. Compare the next Coverage URL set with the exact 54-URL JSON baseline; request other indexing statuses before interpreting indexed/crawled counts.
2. Measure Cards per Sheet search-driven use after the repair with explicit Bing dates and organic landing-page/engagement data; do not attribute tiny rank changes to this fix.
3. Keep URLs/title/H1 and exclusion boundaries; evaluate the next strongest evidenced improvement or new discovery independently of backlog count alone.
