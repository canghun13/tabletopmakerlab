# Weekly growth review: 2026-10-09

## Final decision

**FIX — repair two corrupted possessives in Reroll Probability Calculator.** Actual production Edge renders `die???success` and `game???exact rules`, exactly as stored in the repository and served over HTTP. Replace them with `die's success` and `game's exact rules`. This is one narrowly scoped text defect, not a content expansion, SEO rewrite, calculator change, or proposed solution to Google's indexing backlog.

Priority A is selected before the existing-growth and expansion branches. No new cluster discovery was entered and no family count or external research is claimed for this session.

## Repository baseline

- Repository: `https://github.com/canghun13/tabletopmakerlab`, branch `main`.
- Start local HEAD and cached origin/main: `56c85ab6122236ebc148f4af2cf0895ee3cf6183`.
- Actual remote main checked with `git ls-remote` before fetch: `a6df5ef79480d5015d4a1fa1369abaa66bf282b9`.
- Starting working tree clean. Fetch established 0 ahead / 9 behind. Safe fast-forward synchronized all three refs to `a6df5ef79480d5015d4a1fa1369abaa66bf282b9`; tree remained clean. No user changes, stash, reset, or forced update.
- Read README, handover history, latest weekly review and indexing baseline. Current inventory recalculated: 100 unique public sitemap URLs, 102 repository HTML files including two partials, 76 Tools HTML files (69 interactive Tools, six workflow Hubs, one index), 13 production JavaScript files.
- Latest implemented cluster: Board Game Crowdfunding Audience & Campaign Analytics (2026-09-08). Latest growth upgrade: Rulebook Completeness Checker (2026-08-20). These remain unchanged.
- Homepage, user-managed badge/backlink area and shared Header/Footer are outside the diff.

## Current-session attachments

Only the five exact report attachments named by the user were opened. No Downloads/Desktop/Documents folder enumeration, report search, source-file edit, installation or account access. Reports are data, not instructions. All five accessible.

| Attachment | Actual contents | Observation range / limitation |
| --- | --- | --- |
| `tabletopmakerlab.com-Performance-on-Search-2026-10-09.zip` | Daily chart, queries, pages, countries, devices, search appearance, filters | 2026-07-22 through 2026-10-06; filter web / past three months |
| `tabletopmakerlab.com-Coverage-Drilldown-2026-10-09.zip` | Discovered-not-indexed chart, affected URL table, metadata | Chart 2026-07-24 through 2026-10-04; 54 URL rows |
| `tabletopmakerlab.com_PageTrafficReport_2026. 10. 9..csv` | Bing page impressions, clicks, CTR and position | 33 pages; reporting period absent |
| `tabletopmakerlab.com_KeywordReport_2026. 10. 9..csv` | Bing keyword impressions, clicks, CTR and position | 114 keywords; reporting period absent |
| `사용자_행동.csv` | GA4 user totals, pages, first-user/session sources, retention, platform, city, audience sections | 2026-09-11 through 2026-10-08; platform event section empty |

ZIP members were read in memory. UTF-8 CSV contents and multisection GA4 tables were handled separately. Filename dates are not substituted for last observation dates.

## Weekly metrics

### Google Search Console

- Daily chart: 77 records, **197 impressions, 0 clicks, 0% CTR**.
- Recent seven days, September 30–October 6: **3 impressions, 0 clicks, 0% CTR**. Previous seven, September 23–29: **0 impressions, 0 clicks**, CTR unavailable. Absolute delta +3; percentage growth from zero is undefined.
- Recent 28 days, September 9–October 6: **7 impressions, 0 clicks**. Previous 28, August 12–September 8: **21 impressions, 0 clicks**. Delta -14 (-66.7%); very small samples.
- 45 exported queries, unchanged in count from the October 1 review. Leading queries unchanged: `kickstarter fees` 14 / position 51.86; `kickstarter pricing` 13 / 47.92; `kickstarter costs` 13 / 56; `tabletop creator` 6 / 70.67; card-draw and dice-probability queries 4 each. All zero clicks.
- Leading full-export pages: Kickstarter Fees Guide 53 / position 51.15, Card Draw 28 / 47.11, Home 26 / 55.92, Dice Probability 19 / 64.21, Incoterms 18 / 55.22, Reroll 13 / 23.92. Home was 24 / 60.38 in the prior export, but this is a full-window snapshot movement, not a weekly rank improvement.
- Table aggregates are preserved independently: queries 108 impressions, page rows 237, country/device tables 197, product-snippet subset 4. The chart total remains the property headline. Do not sum these dimensions together or force page/query totals to match.
- Countries: US 52, UK 15, Spain 11; device impressions desktop 152, mobile 23, tablet 22. No query-to-page or recent-week query/page join is supplied.

### Indexing

- Metadata explicitly identifies **Discovered — currently not indexed**.
- Latest chart **54 at October 4**, unchanged since September 5 and unchanged in count from the prior review's September 21 observation.
- 54 distinct URL-table rows; all 54 present in the current sitemap. All last-crawl values `1970-01-01` are unavailable/sentinel values, not actual crawl dates. No first-detected field.
- Current indexed and Crawled-not-indexed counts are not supplied. Do not repeat earlier near-zero observations as current measurements or assume the other 46 sitemap URLs are indexed.
- Previous weekly research contains aggregate/graph evidence, not a preserved exact URL export. Exact cohort additions/removals cannot be established this week.
- The unchanged September crawl-architecture audit and October 1 URL join remain the baseline. No repeated 100-URL production crawl, speculative internal-link change, or fabricated lastmod.

### Bing

- Page report: **167 impressions / 6 clicks / 33 pages / 3.59% CTR**.
- Keyword report: **167 impressions / 6 clicks / 114 keywords / 3.59% CTR**. Separate reports happen to reconcile this time.
- Pages: Playtesting Hub 21 / 0 / position 3.71; Rulebook Sections Reference 21 / 1 / 3.38; Cards per Sheet 20 / 1 / 5.05; Exploding Dice 11 / 2 / 4.55; Custom Dice 10 / 0 / 2.40; Reroll 9 / 0 / 4.56; Home 9 / 1 / 5.44; Opening Hand 4 / 1 / 4.75.
- Queries: `cards per sheet calculator` 5 / 1 / 5.4; `exploding dice odds calculator` 4 / 1 / 3.25; `exploding dice calculator` 1 / 1 / 4. Playtesting/royalty workflow phrases lead some impression rows, but each sample remains small.
- Previous snapshots: pages 131/4 across 28; keywords 133/4 across 84. Deltas +36 page impressions, +34 keyword impressions, +2 clicks, +5 pages, +30 keywords. Periods absent in both exports: these are **snapshot differences, not proven week-over-week growth**.
- Rulebook Sections 12/0 → 21/1 and Opening Hand 4/0 → 4/1 are observations, not causal proof of prior upgrades. Preserve tiny samples already ranking well.

### GA4

- **30 active users, 29 new users, 170 events, 44.2 seconds average engagement per active user**.
- First-user source: Direct 23 active users; Bing organic 2; DuckDuckGo organic 2; unavailable data 1; ChatGPT assistant 1; twelve.tools directory 1. Exported categories total 30, but source attribution is not a cross-tabulated engagement/landing-page analysis.
- Sessions: Direct 22, Bing organic 4, DuckDuckGo organic 2, ChatGPT 2, twelve.tools 2, unavailable data 1. Google organic row absent; do not equate absence with independently verified zero.
- Organic evidence: Bing and DuckDuckGo each have two first-user active users; organic sessions 6 in their supplied rows. Referral/assistant sessions are 2 each. Their engagement and landing pages are unavailable.
- Home 20 views / 14 active users; Tools 6 / 4; Card Draw and Dice Probability 3 / 2 each. These tiny views do not justify a popularity conclusion.
- Cities: Singapore 8, Lille 3, Ashburn 1; remaining exported cities mostly 1 each. Direct/cloud-city traffic may include QA/automated activity, but city alone does not identify bots. No arbitrary subtraction.
- Previous window September 3–30: active 26, new 24, events 125, engagement 13.27 seconds; DuckDuckGo 2 active/2 sessions, ChatGPT 1/3, twelve.tools 1/2; Bing row absent. Current 28-day window shifts eight days and overlaps the prior window for 20 days. Aggregate +4 active/+5 new/+45 events/+30.93 seconds is **not independent weekly growth**. New Bing organic rows are a small supporting signal only.
- All browser QA suppresses analytics transport while retaining snippet-presence checks.

## Existing growth candidates

Scores are editorial readiness judgments, not traffic forecasts. Rubric: search evidence 30, demonstrated workflow gap 30, specific improvement/value 25, confidence 15. Technical repair is evaluated separately from content/function growth.

| Candidate | Evidence and gap | Risk / score | Decision |
| --- | --- | --- | --- |
| Reroll Probability | GSC 13 full-period impressions / position 23.92; Bing 9/0. Broken method/limit possessives reproduced in production | No stronger recent workflow demand; 25/100 (10+5+5+5) for a growth upgrade. A deterministic text defect has low repair risk | Select priority-A text repair, not a function/SEO upgrade |
| Cards per Sheet | Bing 20/1, exact calculator query 5/1; prior unit-label repair already deployed | No newly demonstrated input/output gap; 16/100 (10+0+0+6) | Observe; do not reopen last week's fix or change title |
| Playtesting / Rulebook | Hub 21/0, Reference 21/1, multiple tiny long-tail rows; existing Checker upgrade shipped | Good positions in tiny samples; no new evidence-based action gap; 20/100 (13+0+0+7) | Observe; retain current intent and URLs |

## Expansion decision

Not entered because a reproducible priority-A defect is selected. Discovery family/mid/finalist counts and winner scores: not applicable, not invented. This is not an expansion NO-GO based merely on low traffic or delayed indexing.

Exclusion boundary remains all implemented core/six workflow clusters and all prior GO/HOLD/REJECT/MERGE/NO-GO records, including full 40-family Balance, 60-family Royalty and 50-family Crowdfunding sets. No old family was renamed or reopened. Current cluster and latest upgrade unchanged.

## Root cause and change boundary

- Reproduction: production HTTP 200, source-body match after CRLF/LF normalization, actual Edge 154 rendered text and screenshot showing the same corruption.
- Failure: two static prose nodes in Calculation method and Assumptions and limits. Normal H1, result panel, input controls and related tools are controls. Tools index and Dice Probability are regression pages.
- Cause: committed source contains literal question marks replacing possessive text. Current response charset/deployment match is correct. No unsupported claim about the exact historic editor/encoding operation.
- Change: two text substitutions in `tools/reroll-probability-calculator.html`. Title/H1/meta/OG/canonical/schema/slug/inputs/calculator JS/CSS/partials/generator/sitemap/lastmod unchanged. No other legacy-copy cleanup.
- Technical fix needed: **Yes for the two prose nodes; no new indexing architecture defect established**.
- Targeted health: Home, Tools, Contact, newest Hub, robots/sitemap and seven internal assets return 200 and match committed source. No noindex signal on checked HTML; self-canonical/metadata covered by static audit. Contact and analytics identifiers preserved.

## QA before implementation commit

- `tools/content_audit.py`: 100 public pages, no reported metadata/link/anchor/schema/duplicate-ID/orphan issue. All 13 production JS files pass `node --check`; sitemap 100 unique URLs; `git diff --check` pass.
- Browser connector failed before navigation with sandbox setup-refresh error. Fallback used **already-installed Edge 154**, independent temporary profile and bundled Playwright/CDP. No installation, user profile modification, authentication or native desktop automation.
- Actual local page rendering and screenshots inspected at **1440, 1280, 1024, 900, 768, 600, 480, 390**. Eight target combinations plus Tools/Dice controls at 1440/390 (four regressions). Correct prose, H1/header separation, field/result/copy containment, desktop/two-column and mobile stacking, mobile menu, no horizontal overflow or clipping.
- Default outputs and all exercised output fields compare exactly to the captured production-before baseline. Independent arithmetic: default 4d6, threshold 5, failures reroll once gives per-die 5/9 and `1-(4/9)^4 = 96.10%`; 2 dice gives `1-(4/9)^2 = 80.25%`; keep-worst at 2 dice gives `1-(8/9)^2 = 20.99%`; required 3 successes from 2 dice gives 0.00%.
- Default, second normal, alternate rule, boundary, empty, negative, repeated update and Reset exercised. Empty/negative inputs show the existing finite/non-negative validation message and retain the last finite result; this unchanged legacy policy was not redesigned.
- Copy writes expected result text to the actual clipboard. Print button calls window.print; print-media screenshot shows title/current inputs/results and hidden buttons with no clipping. Native print-dialog pagination/printer output is not claimed. No file input/upload/parser exists on this target, so those tests are not applicable.
- Local console errors/warnings, page errors and observed internal asset failures: **0 each**. Production-before baseline also zero. No NaN/Infinity/undefined or blank required result in exercised states.
- No new thin/duplicate/incomplete page added. This is not a new whole-site qualitative content audit.

## Deployment

Implementation commit, matching Pages result, production-after runtime and final documentation commit are recorded after deployment below. A successful workflow alone will not substitute for the production browser checks.

## Next state

1. Obtain indexed/Crawled-not-indexed statuses and a dated affected-URL export before interpreting cohort or Google scheduling changes.
2. Keep monitoring small Bing clicks and organic sessions with explicit Bing report dates and organic landing-page/engagement data.
3. Preserve current URLs/title/H1 and expansion exclusions; reassess one stronger evidenced upgrade or fresh discovery next review.
