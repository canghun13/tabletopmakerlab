# Weekly growth review: 2026-10-01

## Decision

**FIX — technical defect corrected:** repair the corrupted millimetre separator in the five original Components & Box Planning input-panel headings. One HTML text node per page changes. No growth expansion is selected this week because the priority-A defect branch takes precedence.

This repair improves readable units; it does not claim to resolve Google's crawl backlog or improve ranking.

## Repository baseline

- Repository: `https://github.com/canghun13/tabletopmakerlab`.
- Branch: `main`.
- Start local HEAD, cached origin/main, and actual remote main: `ad9cfc20524125a26f8528b95154f1bddd156134`.
- Actual remote was checked before fetch. Fetch and safe `git pull --ff-only origin main` confirmed already up to date; ahead/behind `0/0`; working tree clean.
- README and handover were read; the unchanged 2026-09-11 audit remains the technical baseline. No research directory existed at the start.
- Public inventory: 100 HTML/sitemap URLs; 76 public files in the Tools directory, comprising its index, six workflow Hubs, and 69 interactive Tools. Two reusable partials are outside the public inventory.
- Latest implemented cluster remains Board Game Crowdfunding Audience & Campaign Analytics (2026-09-08); latest growth upgrade remains Rulebook Completeness Checker (2026-08-20).
- Homepage and user-managed badge/backlink area are protected and outside the change.

## Current-session report inventory and dates

Only the five reports explicitly attached to this session were read. No report-folder search was performed. All attachments were accessible and source files were not changed.

| Attachment | Actual contents | Data range or limit |
| --- | --- | --- |
| `tabletopmakerlab.com-Performance-on-Search-2026-10-01.zip` | Daily chart, queries, pages, countries, devices, search appearance, filters | Daily rows 2026-07-22 through 2026-09-28; filter says web / past three months |
| `tabletopmakerlab.com-Coverage-Drilldown-2026-10-01.zip` | Discovered-not-indexed chart, 54-URL table, status metadata | Chart 2026-07-24 through 2026-09-21; table has no first-detected field |
| `tabletopmakerlab.com_PageTrafficReport_2026. 10. 1..csv` | Bing page impressions/clicks/CTR/position, 28 rows | Export filename dated 2026-10-01; report period is absent |
| `tabletopmakerlab.com_KeywordReport_2026. 10. 1..csv` | Bing keyword impressions/clicks/CTR/position, 84 rows | Export filename dated 2026-10-01; report period is absent |
| `사용자_행동.csv` | GA4 multisection user, page, source, session, retention, city and audience tables | 2026-09-03 through 2026-09-30 |

The ZIP member names were recovered from their legacy filename encoding, and CSV bodies decoded as UTF-8 with BOM handling. GA4 was parsed as separate tables rather than one rectangular dataset. Download dates were not substituted for the last observation date.

## Search metrics

### Google Search Console

- Chart totals: **0 clicks / 194 impressions / 0% CTR** across 69 daily records.
- Recent seven days, 2026-09-22 through 2026-09-28: **0 impressions / 0 clicks**. CTR is unavailable with zero impressions.
- Previous seven days, 2026-09-15 through 2026-09-21: **1 impression / 0 clicks**.
- Recent 28 days, 2026-09-01 through 2026-09-28: **8 impressions / 0 clicks**.
- Previous 28 days, 2026-08-04 through 2026-08-31: **23 impressions / 0 clicks**. Impression change is -15 (-65.2%), on a very small sample.
- Query table contains 45 distinct exported queries; there is no prior query export in the repository for a comparable query-diversity change.
- Leading queries: `kickstarter fees` 14 impressions / position 51.86; `kickstarter pricing` 13 / 47.92; `kickstarter costs` 13 / 56; `tabletop creator` 6 / 70.67; `probability of drawing cards` 4 / 42.5; `dice probability calculator` 4 / 62.5. All have zero clicks.
- Leading pages: Kickstarter Fees Guide 53 / position 51.15; Card Draw Probability 28 / 47.11; Home 24 / 60.38; Dice Probability 19 / 64.21; Incoterms Guide 18 / 55.22; Reroll Probability 13 / 23.92; Custom Dice 8 / 45.62; Exploding Dice 6 / 34.67.
- Aggregate query/page positions cover the entire export; they are not weekly rank movement. The report cannot join queries to individual pages or establish current repeated demand from those lifetime totals.

### Coverage: new evidence relative to the previous diagnostic

- Metadata identifies **Discovered — currently not indexed**, not Crawled-not-indexed.
- Latest chart count: **54 at 2026-09-21**, unchanged from 2026-09-05 in the supplied chart. Table has 54 distinct URLs, all present in the current sitemap.
- Chart transition dates: 22 from July 25, 29 from August 11, 35 from August 18, 41 from August 22, 48 from August 29, 54 from September 5. The previous handover's user-reported 48 is superseded by this export for the supplied dates.
- All table last-crawl fields say `1970-01-01`. Treat these as unavailable/sentinel values, not real crawls. Oldest backlog/first detected cannot be established from this export.
- Current Crawled-not-indexed and total indexed counts are **not supplied**. The previous user observation near zero is historical, not a confirmed current value.
- Backlog includes all six newer workflow families and some older Tools/Guides/Reference pages. All six newest Crowdfunding Analytics URLs occur in the URL table. The table is not individually dated, so it cannot attribute a September 5 count change to a September 8 deployment.
- With the newly supplied URL list, performed a focused join to the unchanged source-anchor graph: 53 backlog URLs at Home depth 2, one at depth 3; mean depth **2.0185**; average unique inbound public pages **4.2963**; orphan/unreachable backlog URLs **0**. All 49 backlog Tool/Hub URLs are direct HTML anchors from the Tools index.
- The remaining 46 sitemap URLs are merely **not in this export**, not a known-indexed control group. Their reachable average depth is 2.0698 and average inbound is 5.5870, skewed by highly linked core/Hubs; this is not evidence of a causal crawl-priority difference.
- Five backlog URLs have only one unique source inbound page: Crowdfunding Cost Checklist, Gamefound Fees, Publisher/Self-publishing Guide, Convention Break-even, Opening Hand Probability. They are existing pages and do not describe the 54-URL cohort as a whole. No speculative link changes were made.

### Bing

- Page report: **131 impressions / 4 clicks / 28 distinct pages**, aggregate CTR 3.05%.
- Keyword report: **133 impressions / 4 clicks / 84 distinct keywords**, aggregate CTR 3.01%.
- These are distinct report totals; the two-impression difference is retained rather than forced to reconcile.
- Leading pages: Playtesting Hub 19 impressions / 0 clicks / position 3.79; Cards per Sheet 17 / 1 / 5.18; Rulebook Sections Reference 12 / 0 / 3.42; Custom Dice 9 / 0 / 2.44; Home 8 / 1 / 5.50; Playtest Session Planner 8 / 0 / 5.13; Reroll 7 / 0 / 4.14; Exploding Dice 6 / 2 / 5.33.
- `cards per sheet calculator`: 5 impressions, 1 click, position 5.4. `exploding dice calculator` and `exploding dice odds calculator`: one impression and one click each. The dominant query families also include playtesting/rulebook and royalty methodology, with very small individual samples.
- Bing time range and prior-period data are unavailable; no weekly growth or rank improvement is claimed.

### GA4: supporting evidence only

- 26 active users; 24 new users; 125 events; average engagement per active user **13.27 seconds**.
- First-user source rows: direct 21 active users, DuckDuckGo organic 2, ChatGPT 1, twelve.tools directory 1. Rows do not fully reconcile to all 26 users; do not invent the missing source.
- Session source rows: direct 20 sessions, ChatGPT 3, DuckDuckGo organic 2, twelve.tools directory 2.
- Google organic and Bing organic do not occur in the exported source rows; this is **not a measured proof of zero traffic outside the export's coverage**.
- Referral/assistant signals are small but observable: twelve.tools 2 sessions and ChatGPT 3 sessions. Their engagement and landing pages are not cross-tabulated here.
- Singapore accounts for 13 active users; Ashburn and Boardman also occur. These and direct/new-tool page views are compatible with QA or automated traffic. City alone does not identify a bot, and no subtraction or popularity inference is made.
- The QA in this session suppresses GA4 transport while checking the committed snippet remains present, avoiding additional QA traffic in the report.

## Comparison and existing growth candidates

Previous repository records had no actual export metrics, so exact week-over-week comparisons are limited to adjacent daily windows in the current GSC chart. Query diversity, page positions, Bing and GA4 period movement are unavailable. The current Coverage export replaces a provisional historical count rather than proving a clean week-over-week cohort delta.

The readiness scores below are editorial prioritization judgments, not traffic forecasts. Rubric: current search evidence 30, demonstrated workflow gap 30, specific improvement/value 25, evidence confidence 15.

| Page/workflow | Evidence and opportunity | Risk / readiness score | Decision |
| --- | --- | --- | --- |
| Cards per Sheet | Bing 17 page impressions/1 click; calculator query 5/1; readable input units are objectively broken | Small search sample; 22/100 growth-upgrade readiness (15+0+0+7). A content/function upgrade is not justified, but the separate reproducible display defect is priority A | Select technical repair for this and four pages sharing the identical defect |
| Playtesting/Rulebook | Bing Hub 19 impressions and Reference 12, related low-volume queries; existing Rulebook upgrade already shipped | Results rank well in small samples, and no new actionable output gap was demonstrated; 15/100 (10+0+0+5) | Observe; preserve current intent |
| Reroll Probability | GSC 13 impressions/position 23.92 over the full period; Bing 7/position 4.14 | No recent repeat-demand signal; some legacy copy has corrupted apostrophes, but changing reroll behavior or SEO is unsupported; 25/100 (10+5+5+5) | Record residual copy issue; defer a separate cleanup beyond this Components repair |

## Technical branch: exact reproduction and minimal repair

- Target: the first `.calc-panel .panel-label` on the five original Components pages.
- Control: the same pages' H1, result panel, canonical, GA4 and calculator output remained intact; Tools and Rulebook are regression controls.
- Before: raw source and production response both contained `inputs 夷?millimetres` (Component Volume uses `One component type`). Installed Edge visibly rendered the same garbled characters on all five pages at 1440px; screenshot inspected for Cards per Sheet.
- Production returned 200 and matched committed HTML after line-ending normalization on all five targets. Therefore this is stored text corruption, not a server charset or stale deployment mismatch.
- Git history confirms `b60b8d72fac6af6737e000cee1bf52faa64aff18` on 2026-08-13 replaced the prior already-garbled separator with `夷?`. No reliable original character is needed; use ASCII parentheses around the existing unit.
- Repair: `Project inputs (millimetres)`, `Deck inputs (millimetres)`, `One component type (millimetres)`, `Punchboard inputs (millimetres)`, `Sheet inputs (millimetres)`.
- Files: `tools/board-game-box-size-estimator.html`, `tools/sleeved-card-stack-calculator.html`, `tools/component-volume-calculator.html`, `tools/punchboard-token-yield-calculator.html`, `tools/cards-per-sheet-calculator.html`.
- Production diff: exactly five text-line substitutions. Title/H1/meta/canonical/OG/schema/URLs/calculation scripts/CSS/partial/generator/sitemap/lastmod unchanged. New pages: 0.
- Representative production spot checks: Home, Tools, Contact, newest Crowdfunding Hub, robots and sitemap returned 200 without a noindex signal; Contact has `canghun13@naver.com`. The existing full crawl audit was not repeated. Its protected badge validation limitations remain recorded in handover.

## Expansion decision and exclusion boundary

- Expansion considered: **No — priority A selected**. New-family discovery was not entered; family/mid-list/finalist counts are not fabricated.
- Existing exclusion records were reviewed in handover. No prior HOLD/REJECT/MERGE family was reopened, and no current cluster was altered.
- Current boundary remains all implemented core and six workflow clusters plus the full previous 40-family Balance, 60-family Royalty, and 50-family Crowdfunding discovery sets and earlier HOLD/REJECT/NO-GO families. The complete named lists remain in handover; this session adds no expansion candidate.

## QA before implementation commit

- Repository `tools/content_audit.py`: all 100 public HTML files, no reported issue; checks cover metadata, H1, script recognition, internal targets/anchors, duplicate IDs, and partial-aware orphan detection.
- All 13 production JavaScript files passed `node --check`. Each affected page retains one parseable static JSON-LD block and zero duplicate IDs; sitemap XML has 100 unique URLs. `git diff --check` passed.
- Local actual-browser rendering: five targets at 1440, 1280, 1024, 900, 768, 600, 480 and 390px: **40 combinations**, plus Tools/Rulebook at 1440/390: **4 regression combinations**.
- Corrected label visible and inside panel; Header/Footer present; H1/header overlap, document overflow, off-screen controls, markup leakage and non-finite default output: all zero. Cards per Sheet mobile/desktop screenshots visually inspected.
- Representative arithmetic independently checked: 700x500 sheet, 63x88 cards, 3mm bleed/gutter, 10mm margins gives 36 normal / 42 rotated / 42 selected, 9 sheets for 360 cards. A4 210x297 with zero bleed/gutter/margin gives 9 normal / 8 rotated / 9 selected. Zero demand gives zero required sheets.
- Representative repeat, Reset, Copy clipboard contents/status, Print handler invocation, and 390px mobile menu pass. Default outputs on all five pages remain the same as before repair.
- No logic was changed; no new fixture suite or comprehensive invalid-input redesign was introduced. Print dispatch was tested, not a printer-driver/PDF print dialog.
- Exercised local console errors 0; warnings 0; page errors 0; internal asset failures 0.
- Production verification and exact deployment SHA/run are recorded after push below.

## Deployment

Pending implementation commit, main push, matching Pages run and production repetition. Do not call this repair shipped until the production section is completed.

## Next state

1. Next comparable GSC export: measure recent 7/28-day impressions and the exact 54-URL backlog cohort; include other indexing statuses before claiming indexed/crawled counts.
2. Monitor Cards per Sheet and Exploding Dice Bing queries/clicks with an explicit report period, preserving URL/title/H1 while samples remain small.
3. Reproduce and scope the separately observed legacy Reroll copy corruption if a future maintenance action takes priority; preserve the user-managed badge/backlink area.
