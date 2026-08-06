# Tabletop Maker Lab ??Project Handover

## Project overview

- **Site:** <https://tabletopmakerlab.com>
- **Positioning:** Free tools for board game designers, creators & publishers.
- **Audience:** Board game designers, tabletop creators, indie publishers, crowdfunding creators, and prototype makers.
- **Hosting:** GitHub Pages with Cloudflare DNS/CDN and HTTPS.
- **Analytics:** GA4 `G-V25YKRCX01`.
- **Source of truth:** This GitHub repository. Always pull it before working.

This is a practical creator workbench?遊춐t a generic board-game playing site. Its five work areas are Game Math, Components, Production, Crowdfunding, and Publishing.

## Technical and content rules

- Use only static HTML, CSS, and vanilla JavaScript; no database, backend, or framework.
- Mobile-first, responsive, accessible HTML.
- Every public page must have its own title, meta description, canonical, robots meta, viewport, Open Graph tags, favicon, and GA4 snippet in `<head>`.
- Reuse `/partials/header.html` and `/partials/footer.html` via `assets/js/site.js`; do not put SEO head tags in partials.
- Do not create thin placeholder pages in bulk. Build a small number of useful anchor tools first.
- Do not claim real-time manufacturer data or invent production pricing. Inputs and assumptions should be explicit.
- Keep the visual direction a professional prototype lab / production-planning desk. Avoid generic player-site or copied-template design.

## Anchor tool roadmap

1. Board Game Box Size Estimator
2. Sleeved Card Stack Calculator
3. Component Volume Calculator
4. Punchboard Token Yield Calculator
5. Cards per Sheet Calculator
6. Custom Dice Probability Calculator
7. Bag / Token Draw Probability Calculator
8. Landed Cost Calculator
9. Manufacturer Quote Comparison
10. Board Game Royalty Calculator
11. Pledge Tier Margin Calculator
12. Backer Break-even Calculator

## Standard workflow

1. Check status and pull latest `main`.
2. Read all of `README.md` and this file.
3. Review existing structure, design conventions, and active work.
4. Implement only the requested scope.
5. Run automated checks and browser rendering checks.
6. Add a dated work log here, then commit and push.

## 2026-07-23 ??Phase 1 foundation

### Completed

- Replaced the unreadable, incorrectly encoded handover file with UTF-8 project documentation.
- Built the static, mobile-first foundation: homepage, Tools hub, Guides hub, Reference hub, About, Contact, and Privacy.
- Added independent Tabletop Maker Lab design system, SVG favicon, reusable header/footer partials, and shared vanilla JS navigation loader.
- Created required `/assets/css`, `/assets/js`, `/assets/icons`, `/partials`, `/tools`, `/guides`, and `/reference` structure.
- Added SEO and GA4 baseline to every public page, plus `robots.txt`, `sitemap.xml`, and `llms.txt`.

### Changed files

- `README.md`, `handover.md`, `index.html`, `about.html`, `contact.html`, `privacy.html`
- `tools/index.html`, `guides/index.html`, `reference/index.html`
- `assets/css/site.css`, `assets/js/site.js`, `assets/icons/favicon.svg`
- `partials/header.html`, `partials/footer.html`, `robots.txt`, `sitemap.xml`, `llms.txt`

### QA

- `git diff --check`: passed.
- Public-page checks passed for 7 pages: title, description, canonical, robots, viewport, Open Graph, GA4, and one H1.
- Internal absolute-link targets, duplicate IDs, and `sitemap.xml` XML parsing: passed.
- `assets/js/site.js` syntax parsing: passed.
- In-app browser could not reach this isolated local preview server or the deployed domain because its connection policy blocked navigation. Run a rendered desktop/mobile check against the deployed domain from an unrestricted browser; do not consider that check complete until then.

### Remaining issues

- Anchor calculator pages and their calculation logic are intentionally not implemented in Phase 1.
- Contact uses a mailto link because the project has no backend or form service.

### Recommended next work

1. Build the Board Game Box Size Estimator as the first substantive calculator page, including methodology, examples, limits, and related links.
2. Add the Sleeved Card Stack Calculator and Component Volume Calculator using the same reusable calculator UI patterns.
3. Turn the most relevant Guides and Reference entries into substantive supporting content as each tool launches.

### Commit

- `9b72d62` ??`Build Tabletop Maker Lab phase one foundation` (pushed to `main`)

## 2026-07-23 - Deployed browser rendering verification

### Completed

- Verified the deployed GitHub Pages domain directly in the in-app browser: `https://tabletopmakerlab.com`.
- Rendered and checked Homepage, Tools, Guides, Reference, About, Contact, and Privacy at desktop `1440x1000` and mobile `390x844` viewports.
- Confirmed Header/Footer partial injection, stylesheet application, shared JavaScript execution, favicon link, GA4 ID, canonical URL, one visible H1, and no `.html">` markup leak on every checked page.
- Confirmed the deployed `/tools/` category anchors (`game-math`, `components`, `production`, `crowdfunding`, and `publishing`) exist. Root-relative navigation works from the GitHub Pages deployment paths.
- Confirmed no horizontal scroll, offscreen visible text, or non-nested text-box overlap on the seven pages at both viewports. Mobile menu opens correctly without overflow.
- Browser console error log was empty after the full page sweep.

### Verification method

- Used the deployed domain rather than a local server. The browser session was initialized with `https://tabletopmakerlab.com/`, which allowed direct rendering and avoided the prior isolated-localhost connection policy problem.
- Visually inspected the desktop homepage and mobile homepage/menu and Tools hub. The remaining pages were rendered directly and checked with DOM geometry, CSS state, and runtime-console inspection at both target viewports.

### Changed files

- `handover.md` only. No product features, calculators, design, or site content were changed.

### QA

- Desktop: all 7 pages passed partial, CSS/JS, favicon link, GA4, canonical, visible content, internal root-link shape, no horizontal overflow, and no text-box overlap checks.
- Mobile: all 7 pages passed partial presence, card-width, visible-text bounds, no horizontal overflow, and no text-box overlap checks.
- Console: no errors.

### Remaining issues

- None found in the Phase 1 public-page rendering verification scope.

### Recommended next work

1. Begin the first substantive anchor calculator only after preserving this browser verification procedure.
2. Re-run this deployed-domain sweep whenever shared CSS, header/footer partials, routing, or analytics code changes.

### Commit

- Pending this browser-verification handover commit and push.

## 2026-07-23 - Phase 2 Components & Box Planning calculators

### Completed

- Added five working, static calculator pages: Board Game Box Size Estimator, Sleeved Card Stack Calculator, Component Volume Calculator, Punchboard Token Yield Calculator, and Cards per Sheet Calculator.
- Added reusable calculator UI styles and vanilla JavaScript for live updates, validation-safe numeric handling, Reset, Copy Results, Print, ARIA live results, and WebApplication JSON-LD.
- Updated the Tools hub Components section and sitemap with the five released tools.

### Calculation methods

- Box estimator: sums simple card, dice, token, and folded-board volumes, then applies a user-controlled planning allowance and reports an equivalent internal cube.
- Sleeved stack: calculates card thickness plus selected sleeve layers, optional compression, and deck-well clearance.
- Component volume: calculates cuboid or cylinder/disc volume by quantity, then applies packing allowance.
- Punchboard yield: calculates a conservative rectangular row/column grid after margins and gutters; circle mode uses diameter as the planning footprint.
- Cards per sheet: compares simple normal and 90-degree rotated rectangular grids after bleed, gutter, and margins.

### Changed files

- `assets/css/calculators.css`
- `assets/js/calculators.js`
- `tools/index.html`
- `tools/board-game-box-size-estimator.html`
- `tools/sleeved-card-stack-calculator.html`
- `tools/component-volume-calculator.html`
- `tools/punchboard-token-yield-calculator.html`
- `tools/cards-per-sheet-calculator.html`
- `sitemap.xml`, `handover.md`

### QA

- Static checks: calculator-page SEO essentials, canonical, GA4, H1, calculator CSS/JS references, duplicate IDs, sitemap XML, and JavaScript syntax passed.
- Deployed browser checks: all five pages loaded Header/Footer partials, canonical, GA4, initial finite results, and no horizontal overflow.
- Interaction checks: one changed-input and Reset cycle passed for each calculator. Initial -> changed results: Box `9.6` to `6.9 cm` equivalent side; Stack `64.6` to `20.2 mm`; Volume `97` to `1 cm3`; Punchboard `234` to `144 tokens`; Cards per Sheet `42` to `24 cards`.
- Mobile `390x844`: all five pages passed input/button bounds, visible results, partial loading, and no horizontal overflow. Browser console error log was empty.

### Browser verification

- Used the deployed domain directly at desktop and mobile widths. A mobile screenshot call timed out in the browser automation layer, but DOM geometry and runtime checks completed successfully; do not treat that screenshot timeout as a site console error.

### Remaining issues

- Results intentionally remain planning estimates. Final print imposition, die-cut nesting, sleeve behavior, and box/insert specifications must be confirmed with physical samples and suppliers.
- The deployed browser did not expose the dynamically injected JSON-LD after the final calculator-script deployment, despite the source implementation. Treat deployed JSON-LD verification as pending; replace it with static per-page JSON-LD or cache-bust the shared script before claiming completion in a future SEO pass.

### Recommended next work

1. Add substantive Components guides/reference material and link it from each calculator as those pages are written.
2. Consider multi-component rows for Component Volume Calculator only after a clear creator workflow and QA plan are defined.
3. Re-run deployed browser verification after any shared calculator CSS/JS change.

### Commit

- `70087ec` - `Add components planning calculators`
- `20e2080` - `Document phase two calculator QA`
- `36de454` - `Ensure calculator schema markup loads`
- Pending final note about deployed JSON-LD verification.

## 2026-07-23 - Static calculator JSON-LD stabilization

### Completed

- Removed both dynamic JSON-LD injection blocks from `assets/js/calculators.js`; calculator logic and UI were not changed.
- Added one static `application/ld+json` block directly inside the `<head>` of each of the five calculator pages.
- Each schema contains a page-specific `WebApplication` and `BreadcrumbList` in an `@graph`; no price, rating, author, FAQ, or unsupported feature data was added.

### Changed files

- `assets/js/calculators.js`
- `tools/board-game-box-size-estimator.html`
- `tools/sleeved-card-stack-calculator.html`
- `tools/component-volume-calculator.html`
- `tools/punchboard-token-yield-calculator.html`
- `tools/cards-per-sheet-calculator.html`
- `handover.md`

### Validation

- Local source validation parsed the static JSON-LD for all five pages successfully.
- Each page has exactly one static JSON-LD block with a `WebApplication`, a three-item `BreadcrumbList`, a tool-specific name/description, and a schema URL equal to its canonical URL.
- HTML SEO essentials, duplicate IDs, dynamic JSON-LD removal, sitemap XML, and JavaScript syntax checks passed.
- Google Rich Results Test / Schema.org Validator was not used because this environment did not provide a reliable external validator connection.

### Deployment verification

- After pushing `ca1fd0d`, the deployed custom domain continued to serve the previously cached calculator HTML and dynamic JSON-LD, including on query-string cache-bypass attempts. Therefore, the deployed static JSON-LD existence check is **not passed** yet.
- This is a deployment/cache propagation observation, not a source JSON parsing failure. Recheck the five deployed URLs after the GitHub Pages/Cloudflare cache refresh; expected result is one JSON-LD block per page with `@graph`, `WebApplication`, and `BreadcrumbList`.

### Remaining issues

- Pending only the deployed-domain cache refresh and final five-page static JSON-LD confirmation. Do not describe deployed static JSON-LD as verified until that check is complete.

### Recommended next work

1. Re-run the five deployed JSON-LD checks after cache refresh, then update this handover with the final result.
2. After SEO verification closes, begin the Production calculator cluster in this order: Manufacturer Quote Comparison, Landed Cost Calculator, Freight Cost per Game, Production Overage Calculator, then Defect / Replacement Copy Reserve.

### Commit

- `ca1fd0d` - `Embed static calculator schema markup`
- Pending documentation commit for this verification result.

## 2026-07-23 - Deployed static JSON-LD root-cause verification

### Actual cause

- GitHub Pages was not serving a different branch, directory, build artifact, or duplicate calculator file. The apparent mismatch came from a persistent in-app browser document that continued to expose an older DOM with the former dynamic schema marker.
- Direct HTTP retrieval of the deployed custom-domain HTML shows the current static source. This conclusion is based on response-body comparison, not a cache assumption.

### Repository and deployment trace

- All five calculator HTML files on `main` contain one direct `<script type="application/ld+json">` block in `<head>`.
- The repository has no GitHub Actions workflow, alternate Pages build configuration, `_config.yml`, or `docs/` deployment root. Root `CNAME` contains `tabletopmakerlab.com`.
- No duplicate file names were found for the five calculator targets.
- GitHub Pages responded from `Server: GitHub.com`; no HTML build or overwrite process is present in this repository.

### Deployed verification

- Compared the raw `main` file from GitHub with the deployed `https://tabletopmakerlab.com/tools/...` response for all five tools. Each raw/deployed pair was byte-for-byte identical by SHA-256.
- Each deployed page has exactly one `application/ld+json` block, includes an `@graph` containing its page-specific `WebApplication` and three-item `BreadcrumbList`, has no `data-calculator-schema` dynamic marker, and has schema URLs equal to the canonical URL.
- Verified targets: Board Game Box Size Estimator, Sleeved Card Stack Calculator, Component Volume Calculator, Punchboard Token Yield Calculator, and Cards per Sheet Calculator.
- No calculator logic, design, routes, or production tools changed during this verification-only pass.

### Changed files

- `handover.md`

### Remaining issues

- None in the static JSON-LD deployment scope. If a browser inspection disagrees again, fetch the response body directly before diagnosing Pages configuration or cache behavior.

### Recommended next work

1. When authorized, begin the Production calculator cluster with Manufacturer Quote Comparison, followed by Landed Cost Calculator, Freight Cost per Game, Production Overage Calculator, and Defect / Replacement Copy Reserve.
2. Keep the direct raw-vs-deployed response comparison in the release QA checklist for future schema changes.

### Commit

- Pending this root-cause verification handover commit and push.

## 2026-07-23 - Phase 3 Production calculator cluster

### Completed

- Added five working static Production tools: Manufacturer Quote Comparison, Landed Cost Calculator, Freight Cost per Game Calculator, Production Overage Calculator, and Defect & Replacement Copy Reserve Calculator.
- Added `assets/js/production-calculators.js` for shared input validation, live calculation, Reset, Copy Results, and Print behavior without changing the existing Components calculator script.
- Added `assets/css/production-calculators.css` for the quote table and reserve/freight scenario layouts, while retaining the established calculator design system.
- Updated the Tools hub Production section and `sitemap.xml`. Homepage Production navigation already targets `/tools/#production` and now reaches released tools.
- Added direct, page-specific static JSON-LD to all five pages. Each contains a `WebApplication` and a three-item `BreadcrumbList`; no dynamic schema insertion, supplier data, real-time rate, price, rating, or author claim was added.

### Calculation methods

- Manufacturer Quote Comparison: totals manufacturing, tooling/QC/other fixed costs, freight/duty/customs/inbound logistics, and quantity times other per-unit costs for three entered quotes; exposes total and per-game comparisons and warns when quantities differ.
- Landed Cost: combines entered manufacturing, logistics/import, and other costs; divides by entered production quantity and reports category shares.
- Freight Cost per Game: divides entered total shipment logistics costs by shipment quantity; 80% and 120% quantity scenarios only change allocation and do not estimate shipping rates.
- Production Overage: adds target sellable copies, replacement reserve, and non-sale copies, protects that post-defect requirement with the entered defect allowance, then applies an optional rounding increment. Defect allowance, customer-service reserve, and non-sale copies remain separate.
- Defect & Replacement Reserve: derives expected defects from the entered quantity, applies claims to expected sellable copies, then adds spare-component and fixed service reserves. Lean/Base/Conservative outputs are stated planning multipliers, not defect forecasts.

### Changed files

- `assets/css/production-calculators.css`
- `assets/js/production-calculators.js`
- `tools/manufacturer-quote-comparison.html`
- `tools/landed-cost-calculator.html`
- `tools/freight-cost-per-game-calculator.html`
- `tools/production-overage-calculator.html`
- `tools/defect-replacement-copy-reserve-calculator.html`
- `index.html`, `tools/index.html`, `sitemap.xml`, `handover.md`

### QA

- JavaScript syntax passed for `production-calculators.js` and `site.js`; `sitemap.xml` parsed successfully; `git diff --check` passed.
- Local browser DOM checks confirmed one H1, Header/Footer partials, GA4 ID, canonical URL, static JSON-LD with `WebApplication` and `BreadcrumbList`, finite default output, no `.html">` leak, and no horizontal overflow on all five new tools.
- Calculation/Reset checks: Quote winner `Quote 3 ??Quote 1 ??Quote 3`; Landed Cost `$25,850.00 ??$30,050.00 ??$25,850.00`; Freight `$1.87 ??$3.73 ??$1.87`; Overage `3,300 ??3,500 ??3,300`; Reserve `115 ??232 ??115`.
- Negative input checks on each tool displayed the validation message and preserved finite output (no `NaN` or `Infinity`).
- Browser rendering at desktop `1440x1000` and mobile `390x844` passed for all five Production tools and the Tools hub: Header/Footer present, controls inside viewport, and no horizontal overflow. Homepage Production link and one existing Components calculator were also checked. Browser console error log was empty.
- Corrected the Homepage category links for unreleased Game Math, Crowdfunding, and Publishing workstations to the Tools hub rather than nonexistent fragment targets; the Components and Production cards retain their released-section anchors.

### Remaining issues

- The calculations intentionally use only creator-entered assumptions. Final supplier specifications, Incoterms, tax treatment, freight, QC results, and customer-service outcomes must be confirmed outside the tools.
- Production pages were browser-tested from the local static server before this commit. Direct custom-domain verification immediately after push is **not passed yet**: `https://tabletopmakerlab.com/tools/landed-cost-calculator.html` returned HTTP `404`, while the matching `raw.githubusercontent.com` `main` file returned HTTP `200`. The deployed `/tools/` response also reports the older `Last-Modified` time. Do not interpret this as a calculator fault or claim deployed Production rendering until Pages serves the new files. Re-run the direct deployed-domain browser and raw-response comparison after Pages publishes; do not rely on an old persistent browser document.

### Recommended next work

1. Perform the post-publish deployed-domain sweep for the five Production pages using fresh HTTP response bodies and desktop/mobile rendering.
2. Add substantive Production guides or reference material only where it can explain inputs, assumptions, and supplier questions without inventing market data.
3. Then choose the next cluster deliberately: Game Math, Crowdfunding, or Publishing; do not create thin calculators in bulk.

### Commit

- Pending Phase 3 Production calculator commit and push.

## 2026-07-23 - Phase 4 Crowdfunding calculator cluster

### Completed

- Added five static Crowdfunding tools: Backer Break-even Calculator, Pledge Tier Margin Calculator, Stretch Goal Cost Calculator, Add-on Profit Calculator, and Shipping Subsidy Calculator.
- Added `assets/js/crowdfunding-calculators.js` for independent live calculation, validation, Reset, Copy Results, and Print behavior; existing Components and Production scripts were not modified.
- Added a Crowdfunding section to the Tools hub and all five URLs to `sitemap.xml`.
- Every new page contains direct static `WebApplication` and `BreadcrumbList` JSON-LD, canonical, GA4, Open Graph, robots meta, favicon, and page-specific SEO content.

### Calculation methods

- Backer Break-even: divides fixed campaign costs by positive per-backer contribution margin after entered product, packaging, fulfillment, subsidy, other variable costs, and editable percentage fees. It explicitly warns when contribution is zero or negative.
- Pledge Tier Margin: compares three tiers by per-backer variable cost, fees, contribution, margin rate, expected-backers contribution, and highlights the highest margin rate.
- Stretch Goal Cost: keeps fixed tooling/other cost separate from per-backer incremental product, packaging, freight, fulfillment, reserve, and other cost; it reports current and expected-final scenarios without treating an unlock value as cost.
- Add-on Profit: separates unit contribution from one-time setup cost and reports net expected contribution and break-even units.
- Shipping Subsidy: calculates each region???actual shipping plus handling less shipping charged after entered fees, then reports weighted total subsidy across Domestic, Nearby International, and Rest of World inputs.

### Changed files

- `assets/js/crowdfunding-calculators.js`
- `tools/backer-break-even-calculator.html`
- `tools/pledge-tier-margin-calculator.html`
- `tools/stretch-goal-cost-calculator.html`
- `tools/add-on-profit-calculator.html`
- `tools/shipping-subsidy-calculator.html`
- `tools/index.html`, `sitemap.xml`, `handover.md`

### QA

- `crowdfunding-calculators.js` syntax, sitemap XML parsing, and `git diff --check` passed.
- Local browser checks confirmed Header/Footer, one H1, GA4, canonical, one static JSON-LD `@graph` with `WebApplication` and `BreadcrumbList`, finite results, and no horizontal overflow on all five tools.
- Changed-input / Reset checks passed: Break-even `544 ??????544`; Stretch Goal `$6,482.50 ??$11,965.00 ??$6,482.50`; Add-on `$8.40 ??-$5.40 ??$8.40`; Shipping Subsidy `$3.62 ??-$3.01 ??$3.62`. Tier ranking changed from `Core pledge` to `Deluxe pledge` when the Core price was reduced.
- Desktop `1440x1000` and mobile `390x844` checks passed for all five Crowdfunding tools and Tools hub: controls remained in bounds, no horizontal overflow, Header/Footer present. Homepage and an existing Production calculator were also rendered. Console error log was empty.
- Negative-input checks on every Crowdfunding tool showed the validation message and retained finite output without `NaN` or `Infinity`.

### Remaining issues

- As with Phase 3, the new pages were verified against the local static server only. The custom domain had not yet published the Phase 3 new files at the last direct HTTP check, so do not claim deployed Crowdfunding rendering or deployed static JSON-LD until fresh responses return these URLs.
- All fees, shipping, and costs are editable creator assumptions; no platform fee, tax, shipping rate, exchange rate, supplier quote, or outcome is predicted.

### Recommended next work

1. First verify that GitHub Pages has published the Phase 3 and Phase 4 new URLs through direct HTTP response checks, then perform a fresh deployed browser sweep.
2. Build substantive campaign economics guides/reference material only where it explains assumptions and questions to ask.
3. Choose the next cluster between Game Math and Publishing after deployed verification is closed.

### Commit

- Pending Phase 4 Crowdfunding calculator commit and push.

## 2026-07-23 - Phase 5 Publishing calculator cluster

### Completed

- Added seven working Publishing tools: Board Game Royalty, Royalty Method Comparison, Advance Recoupment, Licensing Deal Comparison, Publisher Profit per Copy, Direct vs Distribution Margin, and Convention Break-even.
- Added `assets/js/publishing-calculators.js` with live calculations, validation-safe numeric handling, Reset, Copy Results, and Print behavior.
- Updated the Tools hub, homepage Publishing entry points, footer workstation links, and `sitemap.xml`.
- Added page-specific SEO, GA4, canonical, Open Graph, static `WebApplication`, and `BreadcrumbList` JSON-LD to each calculator.

### Calculation methods

- Royalty tools preserve the distinction between MSRP, wholesale/selling price, net receipts, royalty base, earned royalty, recouped advance, and payable royalty.
- Deal comparison ranks entered expected compensation as advance plus royalty payable after recoupment; it does not judge contractual terms.
- Publisher/channel tools keep actual publisher revenue distinct from MSRP and use creator-entered costs and receipts.
- Convention break-even divides entered fixed event cost by contribution per sale and provides editable sales scenarios.

### QA

- `publishing-calculators.js` syntax and sitemap XML parsing passed; all seven pages contain H1, canonical, GA4, static JSON-LD, and BreadcrumbList.
- Browser interaction checks passed: net-receipts royalty `$0.70` per copy, advance recoupment `2,500` copies, direct contribution `$19.50`, and convention break-even `87` copies.
- Mobile `390x844` geometry checks passed for all seven Publishing pages: visible H1 and result panel, with no document horizontal overflow. Licensing comparison table was made responsive after its initial overflow check.

### Remaining issues

- Calculations are planning scenarios only. Actual royalty definitions, recoupment, licensing scope, channel terms, fees, taxes, and event outcomes must be confirmed with the relevant agreement or quote.

### Recommended next work

1. Verify the newly published URLs and static JSON-LD against fresh custom-domain response bodies after GitHub Pages propagation.
2. Add substantive Publishing guide/reference content only where it helps creators interpret their actual deal terms and inputs.

### Commit

- Pending Phase 5 Publishing calculator commit and push.

## 2026-07-23 - Phase 6 Game Math calculator cluster

### Completed

- Added nine static Game Math tools: Dice Probability, Dice Pool, Custom Dice, Exploding Dice, Reroll Probability, Card Draw, Opening Hand, Bag / Token Draw, and Expected Outcome / Expected Value.
- Added `assets/js/game-math-calculators.js` for live calculations, safe validation, Reset, Copy Results, Print, dynamic expected-outcome rows, and finite result handling.
- Added a Game Math section to the Tools hub, linked the homepage and footer, and added all nine pages to `sitemap.xml`.
- Every tool has page-specific canonical, GA4, Open Graph, static `WebApplication`, and `BreadcrumbList` JSON-LD.

### Calculation methods

- Dice totals use exact dynamic-programming outcome counts; success pools use binomial probabilities.
- Custom dice count repeated face entries as physical weighted faces. Card, opening-hand, and no-replacement bag draws use exact hypergeometric probabilities.
- Exploding dice exposes exact expected-value/extra-die treatment and explicitly labels its threshold result as a bounded simulation for safe unlimited-chain handling.
- Expected Outcome validates probability totals and shows expected value, spread, best/worst outcome, and weighted row contributions.

### QA

- JavaScript syntax, page SEO/schema essentials, and sitemap XML passed.
- Browser checks: 2d6 exact 7 = `16.67%`, default 40-card / 4-target / 7-card draw = `55.22%`, and default 50/50 expected outcome = `2`.
- Mobile `390x844` checks passed for all nine pages: H1 and results present, no document horizontal overflow.

### Remaining issues

- Exploding-die target chance is intentionally a labeled simulation; all other stated exact distributions use their appropriate exact model within input limits.

### Recommended next work

1. Verify newly published Game Math URLs and JSON-LD from fresh custom-domain response bodies after GitHub Pages propagation.
2. Add only substantive Game Math guides where they help designers interpret distributions and player-facing risk.

### Commit

- Pending Phase 6 Game Math calculator commit and push.


## 2026-07-23 - Phase 7 targeted reinforcement

### Candidate review

- Excluded Card Stack Thickness: duplicates Sleeved Card Stack Calculator.
- Excluded Box Fill Percentage: overlaps Box Size and Component Volume; adding it would split one physical-packout decision across thin pages.
- Excluded Fulfillment Reserve: overlaps Defect & Replacement Copy Reserve.
- Selected six independent tools: Print-and-Play Sheet, Board Fold Size, Component Weight, Insert Clearance, Inventory Runway & Reprint Point, and Campaign Profit Scenario.

### Completed

- Added the six selected static tools and shared reinforcement calculator script with live calculation, validation, Reset, Copy Results, and Print.
- Updated the Tools hub and sitemap. No unrelated guide/reference pages were created.
- Each new page includes direct SEO metadata, GA4, canonical, static WebApplication JSON-LD, and BreadcrumbList.

### Methods

- PnP sheet covers home-prototype layout rather than commercial imposition; board fold computes entered panel geometry; weight only totals creator-entered unit weights.
- Insert clearance tests three compartment axes; inventory combines runway and reorder point to avoid a duplicate reprint page; campaign profit combines explicitly entered campaign economics.

### QA

- JavaScript syntax, static SEO/schema essentials, sitemap XML, and diff whitespace checks passed.
- Browser calculation checks: PnP default yield `8` items per page; inventory runway `9.09 months`; campaign-profit scenario `$15,900.00`.
- Mobile `390x844` horizontal-overflow checks passed for all six new tools.


## 2026-07-23 - Phase 8 Guides and Reference cluster

### Completed

- Published 16 evergreen Guides/Reference pages: 5 physical/manufacturing reference pages and 11 creator guides across production, crowdfunding, and publishing.
- Replaced the two placeholder hubs with published resource cards, added all pages to sitemap and documented the learning library in llms.txt.
- Current-data pages cite official Kickstarter, Gamefound, and ICC sources and show a 2026-07-23 review date.

### Consolidation

- Card stock and sleeve fit are combined to avoid near-duplicate search intent; distribution and royalty models are combined, while publisher versus self-publishing remains a separate decision guide.
- No new calculators were added.

### QA

- Static validation passed for all 16 pages: H1, canonical, GA4, JSON-LD, BreadcrumbList, related-calculator links, sitemap XML, and whitespace checks.
- Browser rendering sweep remains pending; browser automation setup returned a script parse error before navigation, so it is not recorded as passed.

## 2026-07-23 - Phase 9 final QA

### Defect fixed

- Corrected the canonical URL, Open Graph URL, WebApplication URL, and final Breadcrumb item URL in four Phase 7 pages: Print-and-Play Sheet, Insert Clearance, Inventory Runway, and Campaign Profit Scenario. The page-generation call had used its description as the URL slug, creating malformed encoded canonical URLs.

### QA results

- Static audit: all 60 public HTML pages have one H1, title, meta description, and canonical; all JavaScript files pass Node syntax validation; `git diff --check` passes.
- Browser automation: the previous parse error was a malformed browser-control snippet, not a repository test or runtime failure. A fresh custom-domain browser document was used for the corrected direct sweep.
- Desktop browser sweep: 29 representative public pages across hubs, legal pages, calculator clusters, Guides, and Reference loaded with header, footer, a single H1, and no horizontal overflow.
- Mobile `390x844`: the same 29-page sweep passed with no horizontal overflow and all primary landmarks present.
- Calculator checks: 2d6 target 7 = `16.67%` (6/36); 40-card 4-target 7-card draw = `55.22%`; duplicate-face custom die result = `44.44%`; royalty, advance recoupment, campaign cost/profit, inventory trigger, PnP orientation/page yield, and insert fit/no-fit/reset all updated correctly. Default reference outputs included campaign profit `$15,900.00`, inventory runway `9.09 months`, and PnP yield `8`.

### Release status

- Published page count: 60 public HTML pages.
- Calculator count: 37.
- Guides + Reference count: 16.
- Browser status: pass (fresh-document desktop and mobile checks).
- Automated test status: no repository browser-test framework exists; direct browser QA now passes. The prior setup error is resolved.
- Deployment status: pass. After commit `ea623ee` reached `main`, cache-bypassed custom-domain requests returned HTTP 200 and the corrected canonical URL for all four repaired pages.
- Residual risk: low. No Phase 1 blocker remains.

## 2026-07-23 - Final UI / design polish

### Completed

- Added reusable `input-with-unit`, suffix, and prefix visual primitives without changing calculator input names, values, IDs, or JavaScript selectors.
- Moved explicit `%`, `mm`, `g`, `days`, and `months` units out of 12 calculator labels into non-wrapping input suffixes.
- Refined calculator panel proportions, form-grid spacing, label tracking, result-panel contrast, and Reset / Copy / Print grouping.
- Refined Tools, Guides, and Reference card grids with responsive `minmax()` sizing, calmer card-title scale, and consistent metadata/title/description rhythm.

### Validation

- All shared JavaScript files pass Node syntax checks and `git diff --check` passes.
- The UI-only update preserves the existing calculator names and calculation scripts; no formula, SEO, GA4, JSON-LD, sitemap, or URL change was made.

### Remaining QA

- Run the final deployed visual sweep at 1440, 1280, 1024, 768, and 390 after GitHub Pages propagation; this change is intentionally limited to presentation and explicit unit markup.

## 2026-07-23 - Post-deployment visual QA

### Findings and fix

- Fresh custom-domain checks at 1440, 1280, 1024, 768, and 390 confirmed the deployed calculator unit wrappers and responsive shared CSS.
- Repaired pre-existing malformed homepage arrow markup and three visible encoding artifacts in the Homepage, Guides hub, and Reference hub. The malformed homepage markup caused the only observed mobile horizontal overflow.

### QA

- A 90-render responsive sweep (18 representative pages × 5 breakpoints) found no suffix collision, offscreen result panel, clipped button, missing partial, or horizontal overflow after the homepage correction.
- Representative calculator outputs and existing selector-driven behavior remain unchanged; this fix does not modify calculator logic, identifiers, or SEO metadata.
- Final custom-domain cache-bypassed response checks returned HTTP 200 and showed the deployed unit wrapper markup.

### Release status

- Source-level Phase 1 work is complete. At the final check, the cache-bypassed custom domain still returned the prior homepage HTML, so recheck the deployed `a618b59` response before declaring operations monitoring active.

## 2026-07-23 - Tool-card containment repair

- Root cause: Tools hub rows used an internal label/title two-column layout inside a two-column list, allowing adjacent item content to appear visually connected.
- Rebuilt the shared layout in CSS as independent grid items: every tool row now stacks `LIVE TOOL`, title, and description within its own bordered card.
- Reduced Guide/Reference card titles to `24–28px` with `1.1` line-height; their grid changes from three to two columns at `1280px` and one column at `720px`.
- No calculator logic, inputs, URLs, or SEO metadata changed.

## 2026-07-23 - Footer final polish

- Replaced the malformed footer copyright bytes with the source-safe `&copy;` entity, rendering as `©` with the existing dynamic year.
- Adjusted only footer padding, footer-column rhythm, divider spacing, and bottom-row alignment. The bottom row remains horizontal on desktop and stacks naturally below `720px`.
- No header, body, card, calculator, SEO, analytics, schema, or route was changed.

## 2026-07-23 - Tools hub density pass

- Cause: the two-column Tools grid stretched every item in a row to its tallest neighbor, compounded by 22px card padding and an 18px gap.
- Tools-only CSS now uses `align-items:start` and `align-self:start`; cards remain `height:auto`, use 20px desktop / 18px mobile padding, and use a 16px desktop / 14px mobile gap.
- Applied uniformly to Game Math, Components, Production, Crowdfunding, and Publishing. No card title, underline, calculator, guide, reference, or footer rule changed.

## 2026-07-24 - Core/legal mobile layout and contact email

- Public contact email: `canghun13@naver.com`. Do not replace it with a placeholder or business-domain address in future edits.
- Updated the Contact page mailto/text and confirmed no `hello@tabletopmakerlab.com` remains in the repository.
- Added the Core/Legal-only `.core-page` mobile hero rules: H1 changes from the global 53px mobile value to a contained 44–52px range, with reduced hero and lead spacing.
- Contact dark section uses 22px mobile padding, a 30px heading, and email-safe wrapping. About and Privacy share the same core-page hero behavior.

## 2026-07-27 - Content-depth audit and remediation

### Starting state

- Started from `7838b09` on `main`; `origin/main` was identical (`0 ahead / 0 behind`) after a read-only fetch. The initial working tree had the preserved `guides/moq-explained.html` draft and new `tools/content_audit.py` audit utility.
- Verified 60 public HTML pages: 37 calculator pages, 11 Guides, 5 Reference pages, and 7 other public/hub/legal pages. The 37-calculator count is correct; it is the current `tools/*.html` count excluding `tools/index.html`, not a duplicate calculator or a sitemap error.

### Audit result and remediation

- Pre-remediation final review: 24 sufficient, 20 needing reinforcement, and 16 Thin Content pages. The Thin group was the 10 unexpanded Guides, five Reference articles, and the original MOQ guide; the reinforcement group was 15 short Game Math/practical calculators plus five Crowdfunding calculators.
- Post-remediation review: 60 sufficient, 0 needing reinforcement, and 0 Thin Content pages. Hub and legal pages were assessed for their stated navigational/legal purpose rather than article word count.
- Rewrote all 11 Guides and five Reference articles as topic-specific static content. The duplicate `Creator workflow`, `Common mistakes`, and generic `Limits` paragraphs were removed. Each resource now addresses its own decision, a practical example or comparison, partner/supplier questions, bounded limitations, and real related links. MOQ was retained and expanded as the quality reference.
- Added topic-specific static interpretation sections to 20 low-density calculators: all five Crowdfunding tools, Bag/Token Draw, Board Fold, Campaign Profit, Card Draw, Component Weight, Custom Dice, Dice Pool, Dice Probability, Expected Value, Exploding Dice, Insert Clearance, Inventory Runway, Opening Hand, Print-and-Play Sheet, and Reroll Probability.
- No URL, filename, input/result ID, JavaScript calculator connection, calculation formula, CSS design system, SEO metadata, sitemap entry, or analytics identifier was changed. No calculation defect was found or corrected.

### QA

- `tools/content_audit.py` now validates public-page title, description, canonical, one H1, duplicate IDs, static JSON-LD on article/calculator pages, calculator-script connection, internal targets, anchors, and partial-navigation-aware orphan detection. Final public-page issue count: 0.
- All shared JavaScript files passed Node syntax checks; `sitemap.xml` parsed; `git diff --check` passed. Contact email remains `canghun13@naver.com`.
- Browser QA used a local static server and fresh documents. All 36 changed content pages rendered at 1440px and 390px (72 renders) with Header/Footer, one H1, finite calculator output where applicable, and no horizontal overflow. Six representative changed page types also passed at 1280px and 768px (12 renders).
- All 37 calculators passed default-result smoke checks at 1024px: a calculator script loaded, at least one result existed, no `NaN`/`Infinity` was visible, and no horizontal overflow occurred. Browser console errors: 0; page errors: 0; local asset failures observed: 0.

### Remaining risk

- Content and calculations remain creator-entered planning material. Supplier terms, platform fees, taxes, contracts, freight, manufacturing tolerances, and delivery terms must be confirmed with the relevant official source or partner.
- This audit did not add speculative industry benchmarks. The seven existing core/hub/legal pages deliberately do not use JSON-LD; all 53 calculator and Guide/Reference article pages retain validated static structured data.

### Git

- Commit pending this audit/remediation record. Per user direction, do not push without explicit authorization.

## 2026-07-27 - Content-depth audit deployment confirmation

### Push and GitHub Pages

- Confirmed the local branch was `main`, clean, and one commit ahead of `origin/main` with no unexpected remote commit (`1 ahead / 0 behind`) after `git fetch origin`.
- Pushed the completed content-depth audit commit `a478c1b` (`Audit and enrich site content`) to `origin/main`. The post-push comparison was `0 ahead / 0 behind`.
- GitHub Pages is serving the new source. Cache-bypassed public HTTP responses for all 12 verification pages returned HTTP `200` from `GitHub.com` and exactly matched the corresponding `a478c1b` repository file after trailing newline normalization.
- This direct response comparison confirmed the newly added static content, including the MOQ decision section, quote-comparison checklist, card-size and punchboard reference guidance, and three calculator interpretation sections. It is response-body evidence, not a screen-cache assumption.

### Public-site browser QA

- Rendered 12 public pages at `1440x1000` and `390x844` (24 rendered checks): Home, Tools, MOQ guide, Quote Comparison Checklist guide, Card Sizes reference, Punchboard Tokens reference, Pledge Tier Margin calculator, Dice Probability calculator, Inventory Runway calculator, About, Contact, and Privacy.
- Every render had one H1, loaded Header and Footer partials, loaded shared CSS and `site.js`, showed the expected latest content marker, had no visible `.html\">` markup leak, and had no horizontal overflow or off-viewport visible content.
- The three checked calculators exposed their rendered result panels. The Contact page rendered `canghun13@naver.com`.
- Mobile navigation was tested directly at 390px: the single menu control changed to `aria-expanded="true"`, displayed all five navigation links without overflow, and its Tools link navigated successfully to `/tools/` with Header/Footer and one H1 intact.
- Browser console errors: `0`. No page errors were captured in the browser error log: `0`. Observed internal asset failures: `0`.
- Direct public HTTP checks also returned `200` for shared CSS, `site.js`, the three checked calculator scripts, Header/Footer partials, and the favicon.

### Final status

- Tabletop Maker Lab content-depth audit is fully deployed and publicly verified. No deployment or rendering blocker remains in this release scope.
- Remaining product risk is unchanged: planning tools and guides depend on creator-entered assumptions and must not replace supplier quotes, platform policies, contracts, or professional advice.

### Git

- `a478c1b` is the pushed content-depth audit commit. Commit and push this deployment-confirmation handover entry as the immediate follow-up record.

## 2026-07-29

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://kittylaunch.com에 등록 (내가 직접함)


## 2026-07-30

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://twelve.tools, https://findly.tools/에 등록 (내가 직접함)

## 2026-08-02 - Playtesting & Rulebook Validation validation and release

### Repository and protected-area check

- Started from `c727a29` (`Update handover.md`) on `main`; after connecting the initially empty local workspace to the specified repository, `origin/main` and local `HEAD` were identical (`0 ahead / 0 behind`).
- Confirmed the public-site baseline was 60 HTML pages: 37 calculator pages, 11 Guides, 5 Reference pages, and 7 common/hub/legal pages.
- Read the handover history and preserved the user-managed directory-badge area below the homepage Footer, including KittyLaunch, SellWithBoost, Twelve Tools, and Findly registrations. `index.html` was not modified.

### Search and candidate decision

- Searched: `board game playtest planner`, `board game playtesting checklist`, `blind playtest checklist board game`, `blind playtest readiness board game`, `board game playtest feedback form template`, `board game feedback form playtest`, `board game rulebook completeness checklist`, `rulebook checklist board game`, `board game player count testing matrix playtest`, `board game player count testing checklist`, `board game playtest issue tracker`, and `board game playtest session plan template`.
- Search intent showed repeated creator needs around structured session setup, blind testing, feedback, rulebook clarity, player-count coverage, and issue follow-up. Search results are dominated by guides/PDF templates and account-based platforms such as Boardssey, Playtest Exchange, Playtest Parlor, and form services; the direct no-account static-tool alternative was not found in the reviewed top results.
- Existing internal pages cover game math, components, production, crowdfunding, publishing, and supporting manufacturing content; none accepts the same inputs or produces playtest planning, packet-readiness, player-count coverage, rulebook-revision, or playtest-issue outputs.
- `PASS`: Playtest Session Planner, Player Count Test Matrix, Blind Playtest Readiness Checker, Rulebook Completeness Checker, Playtest Issue Log & Priority Tool.
- `MERGE / not released`: Playtest Feedback Form Generator. Free downloadable forms, Google/Form-builder templates, and account-based feedback tools are strong direct alternatives, so it was not added merely to fill a page count.
- Cluster decision: `PASS`. Five independent local tools, one Hub, one Guide, and one Reference page form an eight-page structure without an internal near-duplicate.

### Released structure and methods

- Hub: `/tools/playtesting-rulebook-validation.html`.
- Tools: `/tools/playtest-session-planner.html`, `/tools/player-count-test-matrix.html`, `/tools/blind-playtest-readiness-checker.html`, `/tools/rulebook-completeness-checker.html`, and `/tools/playtest-issue-log-priority-tool.html`.
- Guide: `/guides/board-game-playtest-plan.html`. Reference: `/reference/board-game-rulebook-sections.html`.
- Session Planner converts creator-entered objective, people, timing, rounds, observers, and instruction mode into an agenda, evidence prompts, and a close-out sequence.
- Player Count Matrix prioritizes a creator-entered player range around the target count, exposes untested counts, and labels low/high-count stress sessions. It does not claim balance from coverage.
- Blind Readiness separates missing packet elements (blockers) from revision items and states likely designer-intervention risk; it explicitly does not substitute for a blind test.
- Rulebook Completeness separates missing sections from ambiguity flags and sends the user to the narrowest appropriate blind-test step. A writer's clear mark is not presented as reader validation.
- Issue Log uses an explicit precedence rule: blocked progression or repeatable critical failure first, then severity, frequency, reproducibility, and impact. It provides a fix-and-retest sequence rather than a score alone.
- Sources consulted and dated at validation: [KIBAKO blind-playtest checklist](https://kibako.habitat-hub.com/en/guides/online-blind-playtest-checklist), [Boardssey playtest setup guide](https://learn.boardssey.com/en/articles/10693423-setting-up-your-first-playtest-how-to-gather-feedback), [BackerKit feedback-form guidance](https://www.backerkit.com/blog/playtest-feedback-form/), [Nerdlab feedback-form template](https://nerdlab-games.com/playtest-feedback-form-template/), and [Playtest Exchange](https://playtestexchange.com/). These sources informed workflow context only; no external rates, benchmarks, or scoring claims were added.

### Changed files

- Added `assets/js/playtesting-calculators.js` and `assets/css/playtesting.css`.
- Added the eight released Hub, Tool, Guide, and Reference pages listed above.
- Updated `tools/index.html`, `guides/index.html`, `reference/index.html`, and `sitemap.xml` for the new information architecture.
- Added this handover record. The protected homepage badge area was not touched.

### QA

- `tools/content_audit.py` passed across 68 public pages: title, description, canonical, one H1, duplicate IDs, static JSON-LD where required, calculator-script links, internal targets, anchors, and orphan detection. Reported issue count: 0.
- All shared JavaScript files, including `playtesting-calculators.js`, passed Node syntax parsing. `sitemap.xml` parsed. `git diff --check` passed.
- Local HTTP browser QA completed 80 renders: all eight released pages plus eight representative existing page types at 1440px, 1280px, 1024px, 768px, and 390px. Each had one H1, Header/Footer partials, no control crossing the viewport, no horizontal overflow, and no visible `NaN`/`Infinity`.
- New-tool interaction checks passed: normal and edge session planning; player-range clamp and coverage output; blind-test blocker path; rulebook missing-section path; issue add/remove; reset; copy; and printable controls present. Browser console errors: 0. Page errors and observed local asset failures: 0.
- Existing calculator assurance in this pass: the full audit verified all calculator script connections and one representative existing calculator (Board Game Box Size Estimator) passed the complete five-viewport rendering sweep. The 37-calculator default-result browser smoke suite should be rerun before a later shared-calculator-script release.

### Release status

- Source validation and local browser QA are complete. Commit, push, GitHub Pages propagation, and public-domain verification remain to be recorded below after the release command succeeds.
- Remaining risk: these are creator-entered planning aids. They do not run or observe real playtests, prove player enjoyment, certify a rulebook, or replace fresh testers and physical prototype checks.

## 2026-08-02 - Playtesting & Rulebook Validation deployment confirmation

- Pushed `a21b515` (`Add playtesting validation tools`) to `origin/main`; local `HEAD` and `origin/main` were identical (`0 ahead / 0 behind`) immediately after the push.
- GitHub Pages initially served the preceding build: the root returned `200` but the new Hub route returned `404`. After propagation, the cache-bypassed Hub returned `200` from `GitHub.com` with both `Playtesting &amp; Rulebook Validation` and `Playtest Session Planner` present.
- Public HTTP verification then returned `200` and expected current-page content for all eight released Hub/Tool/Guide/Reference pages and the representative existing Board Game Box Size Estimator at `https://tabletopmakerlab.com/`.
- Local browser rendering and interaction QA remains the visual/functional verification source for this release; public HTTP verification confirms the deployed response body rather than replacing that render check.
- Commit and push this deployment-confirmation record as the final follow-up handover entry.

## 2026-08-02 - Existing Calculator full runtime smoke completion

### Scope

- Started from `8d3cd76` (`Document playtesting tools deployment`) on clean `main`; `origin/main` was identical before the run.
- Confirmed the 37 existing Calculators from the Tools directory, Tools hub, sitemap, and prior handover count. Excluded the five new Playtesting Tools (`playtest-session-planner`, `player-count-test-matrix`, `blind-playtest-readiness-checker`, `rulebook-completeness-checker`, and `playtest-issue-log-priority-tool`) plus the new Hub, Guide, Reference, and all non-calculator pages.
- Tested URLs: `/tools/add-on-profit-calculator.html`, `/tools/advance-recoupment-calculator.html`, `/tools/backer-break-even-calculator.html`, `/tools/bag-token-draw-probability-calculator.html`, `/tools/board-fold-size-calculator.html`, `/tools/board-game-box-size-estimator.html`, `/tools/board-game-royalty-calculator.html`, `/tools/campaign-profit-scenario-calculator.html`, `/tools/card-draw-probability-calculator.html`, `/tools/cards-per-sheet-calculator.html`, `/tools/component-volume-calculator.html`, `/tools/component-weight-estimator.html`, `/tools/convention-break-even-calculator.html`, `/tools/custom-dice-probability-calculator.html`, `/tools/defect-replacement-copy-reserve-calculator.html`, `/tools/dice-pool-probability-calculator.html`, `/tools/dice-probability-calculator.html`, `/tools/direct-vs-distribution-margin-calculator.html`, `/tools/expected-value-calculator.html`, `/tools/exploding-dice-calculator.html`, `/tools/freight-cost-per-game-calculator.html`, `/tools/insert-clearance-calculator.html`, `/tools/inventory-runway-calculator.html`, `/tools/landed-cost-calculator.html`, `/tools/licensing-deal-comparison.html`, `/tools/manufacturer-quote-comparison.html`, `/tools/opening-hand-probability-calculator.html`, `/tools/pledge-tier-margin-calculator.html`, `/tools/print-and-play-sheet-calculator.html`, `/tools/production-overage-calculator.html`, `/tools/publisher-profit-per-copy-calculator.html`, `/tools/punchboard-token-yield-calculator.html`, `/tools/reroll-probability-calculator.html`, `/tools/royalty-method-comparison.html`, `/tools/shipping-subsidy-calculator.html`, `/tools/sleeved-card-stack-calculator.html`, and `/tools/stretch-goal-cost-calculator.html`.

### Runtime method and result

- Used a local HTTP server and an actual Chromium-based browser session. Each page was loaded individually, waited for Header/Footer partial completion, confirmed a connected calculator JavaScript asset and a non-empty default result, changed the first enabled numeric input to a valid adjacent value, confirmed a finite non-empty recalculated result, and ran Reset before confirming a finite non-empty restored result.
- Scenario count: 111 calculator interactions (37 default-result checks, 37 changed-input recalculations, 37 Reset checks), plus 37 page-load/script/result checks and per-page console inspection.
- Passed: 37/37. Initial failures: 0. Failures after retest: 0. No calculator, HTML, JavaScript, CSS, or formula change was required.
- `NaN`: 0. `Infinity`: 0. `undefined` result text: 0. Blank required result: 0. Console errors: 0. Page errors: 0. Observed internal asset failures: 0.
- Public-domain regression: cache-bypassed runtime smoke also passed for five representative existing Calculator types: Dice Probability, Board Game Box Size Estimator, Landed Cost, Pledge Tier Margin, and Board Game Royalty. Each loaded the deployed calculator script, produced a finite default result, recalculated after input change, and Reset successfully.

### Boundaries and remaining risk

- No shared Calculator CSS/JS, Header/Footer, homepage, or protected homepage badge area was changed; no extra 68-page responsive sweep was needed.
- Remaining risk is product-domain only: creator-entered assumptions and formulas remain planning aids, not supplier quotes, platform policies, contracts, or real-world test results.
- Commit and push this full-runtime-smoke record, then confirm `origin/main` alignment and GitHub Pages response status.

## 2026-08-02 - Existing Calculator runtime smoke deployment confirmation

- Pushed runtime-smoke result commit `a26e625` (`Complete calculator runtime smoke tests`) to `origin/main`; the post-push comparison was `0 ahead / 0 behind`.
- The final code-bearing Calculator release remains unchanged by this documentation-only follow-up. GitHub Pages public verification returned HTTP `200` from `GitHub.com` with expected current content for Dice Probability, Board Game Box Size Estimator, Landed Cost, Pledge Tier Margin, and Board Game Royalty.
- Those five deployed pages had already completed actual browser load, default-result, changed-input recalculation, and Reset runtime checks in this run. No deployment or Calculator regression was observed.

## 2026-08-06

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://launchbuff.com/에 등록 (내가 직접함)
