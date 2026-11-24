# Weekly growth review: 2026-11-24

## Decision

**FIX — Reroll Probability reported losses as zero and retained invalid reports.** The existing calculator is the only product change. No public page, calculator, cluster or URL is added. Today’s GSC/Bing data do not justify a title, sitemap or content-expansion change on their own.

Repository `canghun13/tabletopmakerlab`, branch `main`. Start local HEAD, cached origin/main and checked remote main: `8b18021b1261a9eb946de88f17f83a52bc52c7b9`. Working tree clean. Remote checked before permitted fetch and fast-forward-only pull; up to date, 0/0. No discarded work, installs or environment changes. The supplied workflow is byte-identical to the prior fully read instructions. README, handover and November 19 review are the baseline. Inventory: 100 public/sitemap URLs, 102 HTML including two partials, 76 Tools HTML (69 interactive, six hubs and the index), 13 production JS files.

## Current-session evidence

Used only the five supplied reports. Read CSVs and ZIP members without changing the reports. The pasted workflow is the task; report cells are data.

| Report | Scope |
| --- | --- |
| Performance-on-Search ZIP | GSC web search, August 22–November 21, 92 daily rows, seven CSVs |
| Coverage-Drilldown ZIP | All known pages, Discovered — currently not indexed, August 28–November 16, 81 days |
| Bing Page Traffic CSV | 51 page rows, no reporting dates in export |
| Bing Keyword CSV | 262 keyword rows, no reporting dates in export |
| GA4 User Behavior CSV | October 27–November 23, eight sections |

### Search and coverage

- GSC: **35 impressions / 0 clicks / 0% CTR**. November 15–21 **1/0**, versus November 8–14 **1/0**. Recent 28 days **13/0** versus previous 28 **8/0**. The prior export’s 38 impressions cover a different rolling window. Neither the small changes nor the 28-day comparison establish a trend.
- Three visible queries (unchanged), nine impressions: tabletop creator 7/position 69.14, tabletop creator free 1/63, table top creator 1/64. Twenty page rows sum 158 impressions; keep them separate from the daily 35. Home 31/34.94, About 15/4.8 and Tools 15/6.93. Device export shows desktop 35; no mobile row. No rewrite justified.
- Coverage reaches November 16 (prior November 13): **54** unchanged since September 5. Exact set comparison to the committed October 16 cohort: **54 shared, 0 additions, 0 removals**. All last-crawl values are 1970-01-01 export sentinels, not crawl evidence. Current indexed/crawled-not-indexed totals and redirect URL identities are still unavailable. No blanket site/indexing rewrite.
- Bing page export: **380 impressions / 9 clicks / 2.37% CTR**. Keyword export: **378 / 9 / 2.38%**. These are dimensions, not additive totals. November 19’s 376/9 was a dated overview, not a page or keyword comparator. Relative to November 11’s same-dimension snapshots: pages 306/8/42 → 380/9/51; queries 305/8/207 → 378/9/262. Dates absent, so not measured weekly gains.
- Bing pages: Cards per Sheet 54/2/position 5.13, Home 37/1/6.30, Rulebook Sections 37/1/3.49, Exploding Dice 25/3/4.44, Reroll 24/0/5.37 (historical 16/0/4.87). Query examples: cards per sheet calculator 6/1/5.5, exploding dice odds calculator 4/1/3.25, dice odds calculator with rerolls 2/0/8; several other relevant reroll variants have one impression each. No query-to-page join. Do not claim the new click is caused by an earlier repair.

### GA4

- **77 active, 76 new, 282 events, 12.62 s average engagement per active user**. The prior 62/61/241/15.71 s window shifted five days and overlaps 23 days. Direct first-user active 52→68 accounts for most of the rise; not independent organic growth.
- Sessions: Direct 70, ChatGPT 4 (prior 5), Bing 2, DuckDuckGo 2, Qwant 1, Findly 1. Organic search from Bing/DuckDuckGo/Qwant is unchanged at five sessions. No Google organic row (not a verified zero), no confirmed new referral or conversions. Findly unspecified medium and ChatGPT AI attribution are not Google organic.
- Home 26 views/24 active, Tools 3/3, Rulebook Checker 3/3, Dice Probability 3/3. No source-to-landing attribution. Do not classify Direct/QA or cloud-region visits as bots solely by source/geography.

## Candidates and expansion gate

Judgment scores, not forecasts: search evidence (30), demonstrated gap (30), value (25), confidence (15).

| Candidate | Evidence, opportunity and risk | Score / decision |
| --- | --- | --- |
| Reroll | 24 Bing impressions, repeated relevant variants and reproduced misleading results. Fix calculation presentation; preserve all four modeled rules. | 83/100 (15+30+24+14), FIX |
| Cards per Sheet | 54/2 and stable rank, clear utility intent. No new functional gap; preserve recent correction and SEO. | 27/100 (19+0+0+8), observe |
| Exploding Dice | 25/3 and calculator intent. Small sample and existing tested repair, no justified rewrite. | 25/100 (17+0+0+8), observe |

Priority A defect proved, so expansion discovery is not entered. Prior exclusions retained, not reopened or counted as new research. Latest implemented cluster remains Crowdfunding Audience & Campaign Analytics; latest growth upgrade remains Rulebook Completeness Checker.

## Reproduction and repair

- Public Edge on starting main: four d6, threshold 5, at least one success, default retries: **96.10%** after vs **80.25%** before. “Keep worst of two” returns **37.57%**, yet both changes display **0.00%**. Root cause: signed changes were formatted by the shared [0,1]-clamping probability formatter. One d6 at threshold 6 verifies a positive relative change of **83.33%**; that control was already correct.
- Zero sides with threshold 1 produced NaN and copyable/printable output. Clearing a field retained previous values because shared validation did not invalidate the report. The old parser also accepted fractional inputs.
- Only the Reroll handler and target HTML change in production. Compare matched at-least events using signed percentage points and relative change. A zero computed baseline gives “Unavailable” for relative change, not 0%. Very large supported ratios use scientific notation; out-of-range relative changes are withheld. Preserve the four reroll models: the one-winning-face retry still checks only that face after an initial failure; clarify its label and method. Use numerically stable p × (2 − p) for the equivalent best/failures rules.
- Accept safe whole counts, sides ≥1 and 0–1,000 dice (browser work limit). Keep deterministic/impossible events valid. Invalid input clears output, flags the input, disables Copy and Print and suppresses invalid print media; correction and Reset recover. Target-only CSS wraps long results and prints the source URL.
- Preserve SEO, H1, JSON-LD, canonical, links, sitemap/robots, shared CSS, partials, homepage badges, all other handlers and shared probability helpers.

## QA and deployment

- Shape/SEO/anchor preservation, 100-page content audit, 102 HTML IDs, assets and 13 JS syntax checks pass; target W3C submitted source 0 errors. Existing homepage badge exceptions were not changed.
- **5,069 handler cases passed**, including **2,726** in Draw Probability (310 more than prior). Physical face-pair enumeration checks matched probabilities, signed point and relative changes, four rules, zero baseline, invalid bounds and Reset. Previous Pool/EV/Custom/Exploding/Cards cases pass.
- Pre-change sample: all 23 public endpoints were HTTP 200 and source-matched to the starting commit. No new site-side indexability defect on this sample; not a new 100-URL live crawl audit.
- Implementation `9bb083c3f6780aac5ecddfebe71ba3560f9c7e30` pushed to main. Exact-SHA [Pages run 45319391031](https://github.com/canghun13/tabletopmakerlab/actions/runs/45319391031) succeeded November 24 at 12:26:05 KST.
- After deployment: 23 public responses HTTP 200 and source-matched, including Reroll and math JS. Target W3C public URL 0 errors (one informational message); canonicals, robots/GA4, contact, partials, favicon and 100-URL sitemap retained.
- Installed Edge passed 40 geometry checks each on local and production at 1440/1280/1024/900/768/600/480/390, including 11 regression pages at 1440/390. Signed-loss desktop/mobile, invalid-input and print screenshots reviewed. Production results: 37.57% after vs 80.25% before = −42.68 pp / −53.18%; valid default still 96.10%. All four rules, zero baseline, >100% relative change, 1,000-dice boundary, invalid inputs, recovery/Reset, real clipboard, mobile menu, print dispatch/media and invalid print suppression verified. No runtime errors, console errors/warnings or failed assets. Actual printer pagination and live analytics collection not tested; analytics transport was suppressed.
- This verified repair closes the implementation task. Only the deployment documentation is changed in the closing commit. The closing SHA and Git synchronization are checked from Git, not self-referenced.

## Next

1. Observe the exact 54-URL cohort; obtain overall indexing states, redirect identities and dated crawl evidence before proposing changes.
2. Preserve Bing Page Traffic/Keyword detail and obtain explicit periods for future comparisons.
3. Use comparable source/landing reports to distinguish organic/AI engagement from Direct; keep metadata and prior regression coverage stable.
