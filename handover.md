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

- 메인 페이지 푸터 아래의 디렉토리 뱃지 영역은 사용자가 직접 관리하는 영역이므로 수정·삭제·리팩터링하지 않는다.- https://launchbuff.com/, https://boostdomainrating.com/ 에 등록 (내가 직접함)
## 2026-08-08 - New domain opportunity gate (NO-GO)

### Starting state

- Start commit: `7838b09`; repository root and `origin` both point to `https://github.com/canghun13/tabletopmakerlab.git`; branch: `main`; local HEAD matched `origin/main` before this review.
- Existing public scope: 60 pages, 37 calculators, and 16 Guides/Reference pages. This review did not modify any user-managed backlink, badge, or footer-placement area.

### Candidates researched

| Candidate | Need signal | Direct competition / overlap | Decision |
| --- | --- | --- | --- |
| Playtest feedback analysis | Survey templates and playtest platforms show persistent demand for structured feedback. | Existing Playtesting & Rulebook Validation scope is already the designated cluster; Boardssey also supplies form and result workflows. | NO-GO: duplicate scope. |
| Tabletop accessibility checks | Accessibility checklists and color-vision testing are recurring creator concerns. | Boardssey provides an image-upload color-blindness simulator; a meaningful equivalent needs image processing rather than a small static calculator. | HOLD: not suitable for this static, no-upload architecture today. |
| Board-game localization planning | Board-game localization specialists emphasize word count, languages, DTP, glossary, and LQA planning. | The Geeky Pen offers a quote calculator; Wordarch offers a localization calculation spreadsheet; broad game-localization calculators already cover cost/time. | NO-GO: a generic estimator would not be distinct enough. |
| Product safety / compliance | Creators need compliance information before manufacture. | Requirements are jurisdiction- and product-specific, with high legal/safety risk; a static checklist could be misleading. | NO-GO: needs authoritative, maintained legal review. |

### Sources and reasoning

- Jotform and SuperSurvey expose generic playtest-feedback templates, while Boardssey documents dedicated feedback collection and review workflows (researched 2026-08-08).
- Boardssey documents an image-upload color-blindness simulator; BoardGames.News publishes an accessibility checklist. The best user value needs visual asset analysis, which this static site intentionally does not accept or upload.
- The Geeky Pen publishes a board-game localization quote calculator; Wordarch offers a localization calculation spreadsheet; Alconost and Glodom describe the broader localization workflow. These validate the need but also show an existing tool/service market rather than a clear unserved static-tool gap.

### Outcome

- GO: none. HOLD: accessibility asset review. NO-GO: playtest feedback, localization estimator, and safety/compliance.
- No new Hub, Tool, Guide, Reference, URL, SEO metadata, JavaScript, calculator logic, sitemap entry, or user-managed area was created or changed.
- Residual risk: low. Revisit only if an upload-free, decision-changing tabletop accessibility workflow is identified with distinct creator demand.

## 2026-08-10 - Print binding and mobile Footer browser QA

### Scope and fixes

- Started from `69609fd`; preserved and completed the six pre-existing calculator metadata corrections: Board Fold Size, Campaign Profit Scenario, Component Weight, Insert Clearance, Inventory Runway & Reprint Point, and Print-and-Play Sheet. Their public titles, H1s, canonical URLs, OG URLs, and JSON-LD URLs remain page-specific; the two prior malformed Board Fold/Component Weight URL cases are corrected.
- Reproduced the Print defect as an event-listener receiver issue: passing the browser `print` function directly to `addEventListener` invokes it with the button rather than the Window receiver, producing `Illegal invocation` in affected Chromium contexts.
- Updated all seven shared calculator script families (`calculators`, `game-math`, `production`, `crowdfunding`, `publishing`, `reinforcement`, and `playtesting`) so every `.print` handler calls `window.print()` inside an arrow callback. No calculator formulas or UI content changed.
- Added a mobile-only (`max-width:720px`) footer rule: `.footer-top .brand` becomes a block and gains the existing-scale 12px bottom gap. Desktop footer layout and the user-managed homepage badge/backlink area were not changed.

### Verification

- Static QA: `tools/content_audit.py` (68 public pages, zero reported issues), all shared JavaScript syntax checks, sitemap XML parse, and `git diff --check` passed.
- Public-browser QA before the final all-script normalization: 42/42 Print pages were loaded and Print controls clicked at 390px; no observed `Illegal invocation`, console errors, page errors, overflow, `NaN`, or `Infinity`. Six corrected calculators additionally passed 1440px, 1024px, 768px, and 390px layout/control checks (24/24); all six H1s wrap cleanly at 390px.
- Footer QA passed on Home, Tools, a Guide, a Reference, the Playtesting Hub, and a Playtesting Tool at 390px and 768px, plus Home desktop 1440px. At 390px the measured logo-to-tagline gap was 12px on all six pages; mobile navigation opened normally and no horizontal overflow occurred. The desktop footer retained its row layout.
- The initial code commit was `6d6549e` (`Fix calculator print binding and mobile footer spacing`). The complete all-script Print fix was pushed as `5d0a757` (`Bind all calculator print actions to window`). GitHub Pages propagation should be reconfirmed from the public script responses before any later unrelated release; no feature work remains in this scope.

## 2026-08-10 - New search-cluster opportunity gate (NO-GO)

- Start commit: `2b9e988`; `main` was clean and matched `origin/main`. This was a targeted discovery pass only: no whole-site audit, content refresh, or change to the user-managed homepage badge/backlink area.
- Reviewed prior rejected/held scope first (playtest feedback, accessibility, localization, compliance) and did not reopen it without new evidence.
- Candidate: **Crowdfunding fulfillment and carton planning**. Need signal is clear: current fulfillment guidance repeatedly calls out packed dimensions, actual versus dimensional weight, add-ons, outer cartons, void fill, and pledge shipping. It fails GO because Hero Time, PledgeBox, eFulfillment Service, PackCalc, and fulfillment providers already expose direct calculators or integrated quote tools, while Tabletop Maker Lab already covers Box Size, Component Weight, Freight Cost, Landed Cost, Shipping Subsidy, and replacement reserves. Adding four tools would fragment an existing Production/Crowdfunding workflow rather than create a distinct cluster.
- Candidate: **Publisher pitch readiness and submission operations**. Publisher submission pages demonstrate a real preparation need, but Tabletop Publishers, PITCH2TABLE, Pitch.Games, and Pubblo make the valuable part dependent on current publisher availability, matching, outreach tracking, and account-backed data. A static readiness score would duplicate the existing Playtesting/Rulebook validation work and cannot safely represent live submission rules. REJECT.
- Candidate: **Convention sales operations**. There is a real event-planning problem, but a direct no-sign-up convention-profit tool already exists and Tabletop Maker Lab already has Convention Break-even. Inventory, staffing, and point-of-sale extensions do not form a sufficiently distinct low-competition long-tail cluster. REJECT.
- Candidate: **Manufacturing timeline and approval gates**. Manufacturer documentation confirms that pre-production, samples, production, assembly, and shipping affect delivery timing, but lead times, approvals, and capacity are supplier- and route-specific. Search intent is largely guide-led, not a repeat-use calculator cluster with four independent, evidence-stable tools. HOLD, not suitable for a static release now.
- Decision: **NO-GO**. No Hub, Tool, Guide, Reference, public URL, sitemap, metadata, JavaScript, or calculator change was added; public page change count: 0. Remaining opportunity risk is low: revisit only with evidence of an upload-free, stable-input decision workflow that has four independent tools and does not overlap the existing Production/Crowdfunding/Pitch-validation coverage.

## 2026-08-11 - Fresh problem-space opportunity gate (NO-GO)

### Starting state and exclusions

- Start commit: `ac7172a`; repository root, local `main`, `origin/main`, and live `refs/heads/main` matched, with a clean working tree.
- Reviewed the current cluster map and the immediately prior gates before research. Did not recycle previously evaluated Fulfillment/carton planning, Publisher pitch workflow, Convention operations, Manufacturing timeline, accessibility, localization, safety, or regulatory candidates.
- Initial discovery covered eight different creator problems: prototype cutting/layout, component assembly labor, retail wholesale ordering, card collation, physical table footprint, setup/teardown, prototype material choice, and dielines/prepress.

### Shortlist comparison

| Candidate | Need / evidence | SERP and long-tail result | Tool-depth / overlap gate | Decision |
| --- | --- | --- | --- | --- |
| Prototype cutting and physical assembly | Creator discussions repeatedly describe cutting large card/token batches as a real prototyping bottleneck; manufacturer quote guidance confirms every component affects assembly and packaging. | Boardssey offers a dieline generator; Reamly offers in-browser token-sheet output. Long-tail variants depend on the user's cutter, material, and artwork, often requiring an export workflow this static site does not provide. | A cut-time estimate, sheet yield, and token layout would repeat existing Cards per Sheet/Punchboard Yield/Print-and-Play tools; four independent decision tools do not remain. | REJECT |
| Retail wholesale readiness | Retailers face order, case-pack, reorder, and margin decisions; this is a real workflow. | Generic retail reorder, markup, MOQ, and wholesale calculators are well served. The tabletop-specific results are supplier/order pages rather than an unserved creator workflow. | Existing publishing economics already covers margin, direct-vs-distribution, inventory runway, royalties, and per-copy profit. A distinct cluster would be mostly label changes around the same pricing decision. | REJECT |
| Card collation and set construction | Card designers need composition and distribution planning, and dedicated TCG set-skeleton tools exist. | Search is dominated by game-specific set builders and general player/dealing tools; no strong evergreen board-game-creator long-tail was found. | Rarity/count allocation, draw odds, and player distribution overlap the existing Game Math probability family. Four independent tools cannot be defined without turning one distribution formula into renamed variants. | REJECT |
| Physical play-surface and setup footprint | Community and current guides repeatedly flag table area, player zones, large footprints, and setup duration. | Dedicated table-size, shelf-fit, and play-time calculators already cover the consumer choice intent. A designer-tailored long-tail exists in principle but lacks a clearly separate search result space. | Table fit, player zones, reach clearance, and setup time are one geometry/planning workflow; splitting them into four pages would be artificial and would shift the site toward a player-site rather than a creator workbench. | HOLD |

### Decision

- **NO-GO.** No candidate passed all required gates: demonstrated recurring creator need, a practical long-tail SERP opening, at least four genuinely independent repeat-use static tools, non-overlap with current tools, and a creator-workbench fit.
- Closest candidate: physical play-surface and setup footprint. It fails the independent-tool and brand-positioning gates, not merely because generic competition exists. Revisit only if evidence identifies four separate prototype-design decisions (rather than player table-buying questions) with stable measured inputs.
- New production pages: `0`. No Hub, Tool, Guide, Reference, public URL, sitemap, metadata, JavaScript, CSS, homepage, Header/Footer, or user-managed badge/backlink change was made.
- Research references checked 2026-08-11: Boardssey Dieline Generator, Reamly Punchboard Token Sheet, Hero Time quote-request checklist, Iron & Blossom retail reorder calculator, Calcrux wholesale pricing calculator, MTG Set Skeleton Builder, Board Game Serial play-time estimator, Board Game Storage Lab shelf-fit calculator, Turn Order table guide, and current creator discussions on prototype cutting and setup time.

## 2026-08-13 - Tool print-document UX stabilization

### Scope and root cause

- Started from clean main at d542668; no calculator formula, tool content, navigation, footer, badge, backlink, or SEO change was made.
- Print support exists on 42 Tools. The shared calculator families already called window.print(), but the site had no shared print-document treatment: native printing exposed interactive fields, select arrows, Reset, and other control chrome instead of a readable decision record.

### Changes

- assets/js/site.js now builds a print-only summary from the live form state at startup, Print-button capture, and beforeprint. It writes values with DOM text nodes (not interpolated HTML), includes label + current value, selected option text, checkbox state, selected radios, text values, and dynamically added inputs.
- assets/css/calculators.css hides interactive application chrome only in print and presents the Tool name, lede, input conditions, and existing result panel as a compact document. Header/Footer, navigation, buttons, original form panels, input/select chrome, and action UI are excluded from print.
- Real public-browser testing found the initial generic .print-summary selector lost to an existing more-specific calculator-section rule, exposing the summary on screen. The final .calc-shell > .print-summary selector fixes this; normal-screen summaries are hidden.
- The 42 Print Tools use versioned common JS and calculator CSS references so a deployed Print fix is not masked by a previously cached shared asset. tools/content_audit.py now strips query strings before resolving local link targets, preserving meaningful broken-link checks for those valid asset URLs.

### Verification

- Static QA: all assets/js/*.js syntax checks passed; tools/content_audit.py reported no broken targets, anchors, duplicate IDs, missing required metadata, or invalid JSON-LD; git diff --check passed.
- Public deployment: GitHub Pages workflow run 31677577390 completed successfully for final commit b60b8d7. The live Opening Hand response includes both /assets/js/site.js?v=print-20260813 and /assets/css/calculators.css?v=print-20260813b.
- Public Chromium Print regression: 42/42 Print buttons were executed in fresh browser pages. Each check changed a current numeric/text value where available, selected the final select option where present, confirmed a non-empty result panel, and confirmed the generated summary contains Input conditions with no input/select/textarea/button controls. Header/Footer loaded and no normal-screen horizontal overflow was observed at the available browser width. One Royalty Method Comparison first-field attempt was reset by its existing MSRP synchronization; a separate a-rate=6 retest confirmed the current value in its Print summary.
- Separate control checks passed for the two checkbox Tools (Board Game Box Size and Print-and-Play Sheet) and the dynamic Add Issue row in Playtest Issue Log. No radio controls exist in the current Print Tool set.
- Browser console review: 54 checked public tabs, 0 tabs with error-level console messages.

### Explicit verification limitation / next step

- The available in-app Chromium browser executed the actual Print controls but does not surface a native Print-preview window to automation. Its documented viewport override also remained at innerWidth=1280 when set to 390/768/1024/1440, and no Chrome-extension connection was available. Therefore, native preview visual inspection and exact 390/768/1024/1440 responsive checks are **not recorded as passed**.
- Recommended next step: in a connected desktop Chrome session, inspect the native Print preview for Opening Hand, Manufacturer Quote Comparison, and Playtest Issue Log at the requested widths; confirm each printed page has no controls, no horizontal clipping, and no unwanted extra page. No new Tool or calculator work is recommended until that final visual-only check is available.

### Commits and deployment

- 36d3e0f Improve calculator print summaries
- d117049 Version print tool scripts for cache refresh
- b60b8d7 Keep print summaries off screen
- Final local HEAD and origin/main matched after push. The user-managed homepage badge/backlink area remains untouched.

## 2026-08-13 - Workflow tool-cluster discovery gate (BING CHECK NEEDED)

### Starting state and exclusions

- Start commit: `29c1460`; after a clean `git fetch` and `git pull --ff-only`, local `main`, `origin/main`, and live `refs/heads/main` matched. The initial working tree was clean.
- Reviewed the current 68-page structure and the Playtesting & Rulebook Validation release before research. The user-managed homepage badge/backlink area was not modified.
- Did not recycle fulfillment/carton planning, publisher pitch, convention operations, manufacturing timeline, prototype cutting, assembly labor, retail/wholesale readiness, card collation, play-surface/setup footprint, setup/teardown, prototype materials, dieline/prepress, accessibility, localization, safety, or regulatory work.

### Discovery breadth

- Explored 12 new creator workflow areas: card/component CSV schema integrity; unique-ID and cross-reference integrity; component-manifest reconciliation; version diff/change notes; base-game/expansion compatibility; campaign/scenario dependency validation; constrained setup randomization; manufacturing defect-inspection planning; prototype-kit completeness; rulebook-to-component terminology cross-checking; reviewer/demo-copy dispatch operations; and structured game-state test-case generation.
- Repeated workflow evidence was strongest around spreadsheet-backed card/component data. Creator discussions describe spreadsheets as the source of truth, use them to find duplicates and track changes, and report merge mistakes, broken formulas, encoding problems, and manual source/layout drift. Component.Studio, Chitmunk/ShuffleKit, nanDECK, and similar products validate the spreadsheet-to-component creation market, but the reviewed SERPs emphasize design, merge, rendering, playtesting, and export rather than a small standalone local validator/release-QA workbench.
- Manufacturer documentation confirms a separate QA workflow around controlled specification sheets, approved samples, component counts, defect quantities, pre-shipment inspection, and current-version checks. The workflow is real, but a general tool must not invent AQL thresholds or replace a supplier/inspector's sampling plan.
- Scenario/campaign searches found spreadsheet-driven generators and mature narrative graph editors such as Branchy, Arcweave, Story Synth, and game-specific scenario builders. They validate structural graph problems but make a tabletop-specific static-tool gap less clear.

### Shortlist

| Cluster / workflow | Target user and actual problem | Demand / SERP competition | Long-tail gap and independent tools | Existing overlap / implementation | Decision |
| --- | --- | --- | --- | --- | --- |
| Game Data Integrity & Release QA | Designers/publishers maintaining card, token, component, and scenario data in CSV need to catch broken rows and understand exactly what changed before a prototype or production handoff. | Strong spreadsheet workflow evidence; Component.Studio, Chitmunk/ShuffleKit, and nanDECK serve creation/rendering. Generic CSV validators and spreadsheet diff tools exist, but no strong standalone tabletop-focused validator appeared in reviewed top results. | Six natural tools: CSV Schema Validator (validator), ID & Reference Integrity Checker (checker), Component Manifest Reconciler (checker), Version Diff & Release Notes Generator (generator), Expansion Compatibility Validator (validator), and Deck/Set Composition Rules Checker (validator). | Distinct from probability, component-sizing, production-cost, and playtest-readiness tools. Browser-local CSV processing is stable and privacy-preserving. Maintenance risk is low if rules are user-defined. | **HOLD — Bing demand comparison needed** |
| Board Game Manufacturing Inspection Workbench | Indie publishers need to turn a current component spec and approved sample into repeatable inspection records without losing defect locations or version context. | Eastar and other manufacturer/inspection pages show component, in-process, first-production, and pre-shipment checks. SERPs are service/document-led rather than tool-led. | Five possible tools: user-defined Inspection Plan Builder, Random Sample Selector, Component Count Reconciler, Defect Tally Analyzer, and Approved-Sample Comparison Log. | Some adjacency to Production tools, but the final decision is conformity/acceptance rather than cost. Safe only with user-entered acceptance rules and explicit non-certification language. | **HOLD — Bing demand and risk check needed** |
| Campaign & Scenario Structure QA | Campaign-game designers need to find unreachable scenarios, missing prerequisites, dead ends, component conflicts, and incomplete setup manifests. | Real graph/reference problems appear in narrative-design workflows; Branchy, Arcweave, Story Synth, Danu, and game-specific editors are capable competitors. | Five possible tools: Dependency Graph Validator, Reachability/Dead-End Checker, Unlock Conflict Checker, Scenario Component Availability Checker, and Setup Manifest Generator/Visualizer. | No direct internal duplicate, but creator search intent may resolve to video-game narrative tools or game-specific editors. Static JSON/CSV processing is feasible. | **HOLD — Bing demand comparison needed** |
| Constrained Setup & Test-Case Generation | Designers want reproducible randomized setups that obey entered constraints and expose coverage across repeated tests. | Boardssey offers variable distribution; many strong game-specific balanced-map/setup generators exist. Generic demand often shifts toward players or RPG prompt generation. | Four possible tools exist, but Seeded Setup Generator, Role/Objective Distributor, Constraint Coverage Checker, and Batch Test-Case Generator depend heavily on each game's custom semantics. | Risks becoming an abstract framework with weak immediate value or a player-site utility; some overlap with Game Math and Playtesting. | **REJECT** |
| Reviewer & Demo-Copy Operations | Small publishers track who receives a copy, what is packed, deadlines, and follow-up status in spreadsheets. | Reviewer lists and publisher policies confirm the workflow, but SERPs do not show strong tool intent; useful matching depends on current contacts, audience data, shipping, and CRM state. | Copy Allocation Planner, Kit Manifest Generator, Contact Dedupe, and Follow-up Schedule can be named, but only the manifest is a strong standalone utility. | Would drift toward account-backed outreach/CRM or reuse recently rejected publisher-pitch and fulfillment scope. | **REJECT** |

### Best candidate and Bing gate

- Best candidate: **Game Data Integrity & Release QA**.
- Demand: the underlying workflow is clearly recurring. Spreadsheet-backed card/component data, repeated exports, duplicate detection, source-of-truth maintenance, and version changes appear across creator discussions and current commercial tools.
- SERP gap: reviewed direct competitors primarily create/render components or compare generic spreadsheets. A free, no-account, browser-local tabletop validator with row/column issue locations, user-defined rules, cross-file reference checks, and release-oriented outputs was not found.
- Uncertainty: explicit search demand for `board game card data validator`, `component manifest checker`, and related validator/diff terms is not strong enough in ordinary SERPs to choose confidently between this cluster, manufacturing inspection QA, and scenario structure QA.
- Bing needed: **YES**. Use recommended-keyword, ad-impression, and trend data only as relative signals and query-discovery aids, not as exact organic search volume.
- Final decision for this pass: **BING CHECK NEEDED**. Production pages added: `0`.

### Bing Keyword Research input set

Candidate A — Game Data Integrity & Release QA:

1. `board game card data validator`
2. `card game spreadsheet checker`
3. `board game CSV validator`
4. `card database duplicate checker`
5. `board game component manifest checker`
6. `board game component list validator`
7. `card game CSV schema checker`
8. `compare board game card spreadsheet versions`
9. `board game card version diff tool`
10. `board game expansion compatibility checker`
11. `validate card IDs and references CSV`
12. `deck composition rules checker for game designers`

Candidate B — Manufacturing Inspection Workbench:

1. `board game quality control checklist`
2. `board game manufacturing inspection checklist`
3. `board game component count checker`
4. `board game pre shipment inspection tool`
5. `board game defect inspection report template`
6. `board game production sample checklist`
7. `board game component inspection plan`
8. `board game quality assurance plan template`
9. `board game missing component inspection`
10. `board game approved sample comparison checklist`

Candidate C — Campaign & Scenario Structure QA:

1. `board game scenario validator`
2. `board game campaign editor tool`
3. `board game scenario dependency graph`
4. `campaign board game scenario planner`
5. `board game campaign flowchart maker`
6. `board game scenario generator spreadsheet`
7. `board game scenario prerequisite checker`
8. `board game campaign dead end checker`
9. `board game scenario component list generator`
10. `tabletop campaign branching tool`

### Research references checked

- Creator/data workflows: current Chitmunk/ShuffleKit CSV workflow and export pages; Component.Studio dataset and pricing documentation; nanDECK features and creator support discussions; current tabletop-design community discussions about spreadsheet source-of-truth, duplicates, encoding, merge mistakes, and version control.
- Manufacturing QA: Eastar Board Game quality-control process and current board-game component-count/inspection guidance. These were used to establish workflow stages, not to copy proprietary acceptance rules or invent universal thresholds.
- Scenario tooling: Branchy, Arcweave, Story Synth, Danu Scenario Generator, and current game-specific scenario/setup generators.
- Previous rejected candidates reused: **NO**.

## 2026-08-13 - Game Data Integrity & Release QA cluster (GO and shipped)

### Decision and evidence

- Resumed from clean `main` at `06ff88b`; the implementation commit is `d733ec1` (`Add game data integrity QA tools`). The user-managed homepage badge/backlink area was not opened or changed.
- **GO:** spreadsheet-backed tabletop data is a recurring creator workflow, not a one-off content topic. Current creator discussions describe spreadsheets/CSV as the source of truth, stable IDs, duplicate detection, version history, patch notes, and manual drift between data and production files.
- Direct tabletop competitors checked: Chitmunk (spreadsheet-to-deck design/export and export validation), nanDECK (spreadsheet-linked rendering/printing), Dextrous (Google Sheets data binding), and Component Studio. These products validate the workflow but concentrate on design, merge, rendering, or export rather than a standalone release-integrity workbench.
- Generic competitors checked: DataDoctor, CSV Workbench, FileDiffs, BeanToolBox's CSV foreign-key checker, and DiffQuery. They cover generic schema, diff, or key checks, but not the combined tabletop handoff sequence or release-oriented output.
- The cluster passed the independence gate because each page answers a different release decision: source structure, cross-file references, physical manifest agreement, field-level version change, expansion dependency/replacement compatibility, and creator-defined deck/set constraints.
- Bing returned `NoDataFound` and was not used as a gate, per the request. The decision rests on observable workflow demand, SERP competition, practical static implementation, and internal non-overlap.

### Released scope

- Hub: `/tools/game-data-integrity-release-qa.html`.
- Tools: `/tools/board-game-csv-schema-validator.html`, `/tools/game-data-reference-integrity-checker.html`, `/tools/component-manifest-reconciler.html`, `/tools/board-game-version-diff-generator.html`, `/tools/expansion-compatibility-validator.html`, and `/tools/deck-set-composition-rules-checker.html`.
- Added browser-local CSV parsing and report utilities in `assets/js/data-integrity-calculators.js` plus cluster-specific responsive/report styling in `assets/css/data-integrity.css`.
- Updated the Tools index and sitemap only. No Guide or Reference page was required because every tool includes its own operational explanation, limits, and related-check path.
- All rules that could vary by game are creator-entered. Passing results explicitly do not claim balance, completeness, supplier approval, certification, or legal compliance. Files remain local to the browser tab.

### QA completed

- Static: JavaScript syntax, sitemap XML parse, `git diff --check`, and `tools/content_audit.py` passed; the audit covers 75 public pages with no reported issues.
- Parser: validated UTF-8 and BOM-marked UTF-16LE, CRLF/LF, quoted commas, escaped quotes, embedded line breaks, empty input, malformed/unclosed quotes, row-shape errors, and repeated execution.
- Functional browser QA covered both sample and passing inputs across all six tools, plus empty/malformed inputs, duplicates, missing references, total/range boundaries, clear-file, reset, and repeat-run behavior. Copy report succeeded and contained the expected issue text. The browser harness did not surface a programmatic Blob download event, but the enabled download control and Blob/CSV handler completed without console errors.
- Responsive browser QA passed at 390, 768, 1024, 1280, and 1440 px. The final result table uses contained horizontal scrolling; no page-level horizontal overflow remained at any width. Console review found no warnings or errors on the exercised local pages.

### Risks and next task

- Large CSV files are processed in the main browser thread; no arbitrary upload-size promise is made. Very large projects may need a worker or streaming parser later, but adding that now would be speculative.
- The tools intentionally do not infer proprietary schemas, game-specific expansion rules, balance rules, manufacturer acceptance thresholds, or campaign semantics. Those are user-defined inputs or out of scope.
- Generic CSV utilities remain a search competitor. Measure Search Console impressions/clicks by the seven released URLs before expanding the cluster or changing page intent.
- Next discovery should not add another cluster immediately. Revisit Manufacturing Inspection or Campaign/Scenario Structure only if new demand evidence identifies at least four independent, stable-input decisions and resolves their safety/competition concerns.

### Research references checked

- Creator workflow discussions: `https://www.reddit.com/r/tabletopgamedesign/comments/kqlzfu`, `https://www.reddit.com/r/BoardgameDesign/comments/10spb7x`, `https://www.reddit.com/r/tabletopgamedesign/comments/1rn3lro/how_do_you_keep_track_of_rules_and_playtest/`, `https://www.reddit.com/r/tabletopgamedesign/comments/1uuj52u/those_of_you_whove_actually_manufactured_your/`, `https://www.reddit.com/r/tabletopgamedesign/comments/pguist`, and `https://www.reddit.com/r/BoardgameDesign/comments/1mdnysj`.
- Tabletop/data tools: `https://chitmunk.com/`, `https://chitmunk.com/guides/export-options`, `https://nandeck.com/features`, `https://www.dextrous.com.au/`, and `https://docs.dextrous.com.au/p/iknWFBnwyHkE9i/Google-Sheets`.
- Generic integrity/diff tools: `https://datadoctor.net/`, `https://csvworkbench.com/`, `https://filediffs.com/csv-compare`, `https://beantoolbox.com/tools/csv-foreign-key-checker`, and `https://www.diffquery.com/csv-compare`.

## 2026-08-20 - New workflow discovery gate and Tabletop Art Asset Handoff cluster (GO)

### Starting state and constraints

- Began at local `main` commit `29c1460`, clean but three commits behind `origin/main`. Fetched and fast-forwarded with `git pull --ff-only origin main` to clean commit `0f052ac` before discovery or implementation.
- Read `README.md` and the full `handover.md`, then built an exclusion map covering all 37 original calculators, Playtesting & Rulebook Validation, Game Data Integrity & Release QA, and every previously explored/rejected family. No previous rejection was renamed or repackaged.
- Preserved the existing homepage, header/footer partials, calculator logic, released Guides/Reference pages, and user-managed homepage badge/backlink area. No dependency, framework, backend, IDE, Guide, or Reference page was added.

### External discovery: 13 genuinely new workflow families reviewed

| New workflow family | Need / SERP signal | Competition or fit finding | Decision |
| --- | --- | --- | --- |
| Tabletop art commissioning and asset handoff | Board-game-specific creative-brief examples and asset spreadsheets repeatedly connect gameplay context, framing, dimensions, status, and named deliverables. Manufacturer artwork guides add a real final-file handoff stage. | Generic asset managers and tabletop layout suites exist, but reviewed results did not expose a small, browser-local commission-to-delivery QA workbench. | **GO** |
| Digital tabletop prototype packaging | Tabletop Simulator documents custom-deck sheets; creators repeatedly need deck-sheet generation and import packaging. | Official TTS guidance plus ShuffleKit, Boardssey, Durdle Games, Prototable, and open-source converters make this crowded and platform-specific. | REJECT |
| Iconography system consistency and proofing | Design guidance repeatedly stresses distinct silhouettes, consistent grammar, testing, and a glossary. | Semantic correctness and confusion cannot be safely inferred from static files without game context; adjacent to prior accessibility and terminology checks. | HOLD |
| Tutorial and onboarding sequence validation | Rulebook/design guidance supports examples, staged learning, and first-turn clarity. | Closely overlaps the released playtest/rulebook cluster; meaningful judgment depends on observed player behavior. | REJECT |
| Player-aid and reference-card coverage | Creator discussions show recurring demand for turn order, action reminders, costs, and exceptions at the table. | Coverage is game-specific and mostly duplicates rulebook completeness and blind-playtest readiness. | REJECT |
| Print-and-play bundle QA | Current community tools and discussions cover card PDF assembly, duplex alignment, cut marks, and bundle preparation. | Crowded by PnP generators and overlaps the released Print-and-Play Sheet and Cards per Sheet calculators. | REJECT |
| Board game product-photography shot planning | Tabletop photography specialists and media-kit guidance establish recurring component, setup, lifestyle, box, and campaign-image deliverables. | The static value collapses toward a checklist; lighting, styling, and image quality remain human decisions. | REJECT |
| Crowdfunding media deliverables planning | BackerKit and crowdfunding guidance define campaign-page, advertising, and social asset families. | Too close to the existing Crowdfunding cluster and current campaign-management products; four independent local tools were not justified. | REJECT |
| Organized-play and tournament-kit operations | Publisher organized-play programs use event guides, kits, reporting, and store-facing materials. | Usually account-backed, game-specific, and operational/player-facing rather than a durable creator workbench. | REJECT |
| Companion-app content and data handoff | Current companion apps and scenario editors use structured scenarios, state, custom content, localization, and packaged imports. | Requires a target app schema, software integration, or game-specific state model; static generic outputs would not be trustworthy. | REJECT |
| 3D-printed prototype part preparation | Designers report repeated model revisions and reprints for physical component testing. | Generic CAD/slicer tools dominate; the remaining tabletop-specific layer overlaps earlier prototype-material and component-design work. | REJECT |
| Educational-game objective alignment | Current learning-game worksheets map instructional goals, player actions, mechanics, feedback, time, and assessment. | Real but narrower than the site's core publisher/creator audience; useful evaluation remains pedagogical and playtest-dependent. | HOLD |
| After-sales replacement-part service | Publisher support pages demonstrate recurring missing/damaged component intake and component-identification work. | Requires customer data, inventory, fulfillment, and communication; adjacent to previously rejected fulfillment operations and unsafe as a backend-free cluster. | REJECT |

### Shortlist and hard gate

1. **Tabletop Art Asset Handoff — GO.** Recurring creator-to-artist-to-production workflow; five independent outputs; stable creator-entered or local-file inputs; local processing; no current internal duplicate; no account or proprietary data required.
2. **Digital Tabletop Prototype Packaging — REJECT.** Strong need, but major current tools and platform-specific import rules already own the intent; maintenance would follow external platform changes.
3. **Iconography System QA — HOLD.** Strong design need, but the valuable decision is semantic and visual, while deterministic checks would be shallow or overlap prior accessibility/terminology work.

The selected cluster passed every implementation gate: one coherent workflow, five independent decisions, static HTML/CSS/Vanilla JS feasibility, useful non-placeholder output, browser-local privacy, editable project/supplier thresholds, and no invented universal approval rule. Search ambiguity remains, so the released URLs should be measured independently in Search Console before adding adjacent art tools.

### Released scope

- Hub: `/tools/tabletop-art-asset-handoff.html`.
- Tool 1: `/tools/board-game-art-brief-builder.html` — generates a structured brief and identifies missing commissioning/review inputs.
- Tool 2: `/tools/board-game-art-asset-tracker.html` — summarizes status and finds duplicate IDs, missing briefs, invalid dates, and overdue incomplete assets in local CSV data.
- Tool 3: `/tools/artwork-delivery-manifest-checker.html` — reconciles an expected CSV with local filenames and reports missing, extra, duplicate, and same-base/wrong-format files.
- Tool 4: `/tools/board-game-image-resolution-checker.html` — reads local image pixel dimensions and calculates effective PPI against creator-entered trim, bleed, rotation, and minimum PPI.
- Tool 5: `/tools/artwork-credits-attribution-builder.html` — validates creator/role/rights/source/credit records and generates the exact approved publication credit block.
- Added shared behavior in `assets/js/art-handoff-calculators.js` and cluster-only responsive/report styling in `assets/css/art-handoff.css`; added six Tools-hub entries and six sitemap URLs. Public HTML count is now 81.
- Every released page contains direct title, description, robots, canonical, Open Graph, favicon, GA4 `G-V25YKRCX01`, and static page-specific JSON-LD. Tools use `WebApplication`; the Hub uses `CollectionPage`; all include a three-item `BreadcrumbList`.
- All project/supplier-dependent acceptance values remain user-entered. Outputs explicitly do not claim artistic quality, ownership, license compatibility, color/prepress approval, contract sufficiency, or manufacturer acceptance.

### QA completed before commit

- Static audit: `tools/content_audit.py` passed all 81 public pages with zero reported issues, including metadata, one H1, duplicate IDs, JSON-LD parse, internal targets/anchors, calculator-script connection, and orphan detection. `sitemap.xml` parsed; `assets/js/art-handoff-calculators.js` passed Node syntax parsing; `git diff --check` passed.
- Actual local-browser render sweep: all six new pages passed at 1440 × 900 and 390 × 844 with one Header, one Footer, one H1, correct canonical, GA4, static JSON-LD, zero page-level horizontal overflow, zero escaped panel/card bounds, and no `.html">` markup leak. The Tools hub anchor `#art-handoff` exposed all six cluster links.
- Mobile menu changed from closed/`aria-expanded=false` to visible/`true` and back correctly. Desktop and mobile full-page screenshots plus a mobile result screenshot were inspected.
- Functional paths exercised: valid and missing-field Art Brief; sample, clear-file, and empty-input Asset Tracker; sample Credits plus Reset; expected-manifest plus local multi-file delivery with missing, unexpected, and same-base wrong-format results; image-resolution pass at 1 PPI and fail at 100000 PPI using the existing SVG favicon. Repeated runs updated rather than duplicated output.
- Problems found and fixed during QA: quoted the comma-containing sample credit line; collapsed a same-base wrong extension from misleading missing+extra issues into one format error; constrained report tables to internal horizontal scrolling at 390 px instead of page-level overflow.
- Final exercised-tab console errors: 0; console warnings: 0. Local server requests for pages, shared partials, CSS, JavaScript, and favicon returned 200/304; no internal 404 appeared.

### Remaining risks and next recommendation

- Browser-readable image dimensions do not inspect production-native layers, color profiles, linked fonts, vector semantics, or rights. Final preflight and legal review remain outside the tools.
- The asset tracker uses the current date for overdue decisions, and all CSV/image processing runs on the main browser thread. No large-file performance promise is made.
- After deployment, verify all six public URLs, their assets/partials, 390 px and 1440 px layout, functional representative inputs, console errors, and response/source alignment. Then record the implementation commit, deployment result, and final `origin/main` state below.
- Next task: measure Search Console impressions/clicks for the Hub and five Tool URLs before adding any adjacent art page. Do not expand this cluster merely to increase page count.

### Research references checked

- Art workflow and handoff: `https://www.deckofwondersgame.com/2020/07/board-game-art-creative-brief-template.html`, `https://sites.google.com/view/indiana-game-design-template/art-and-sound-assets`, `https://gamepiece.studio/`, `https://cartamundi.com/en/technical/`, `https://www.qinprinting.com/blog/board-game-print-file-preparation/`, and `https://pandagm.com/wp-content/uploads/2022/10/PandaGM-GraphicDesignGuidebook-V4-0922.pdf`.
- Digital prototype tools: `https://kb.tabletopsimulator.com/custom-content/custom-deck/`, `https://shufflekit.com/tools/tabletop-simulator-card-maker`, `https://learn.boardssey.com/en/articles/12754661-tts-deck-editor-tool`, `https://www.durdlegames.com/decksheet-tool/index.html`, and `https://prototable.gg/`.
- Iconography, tutorial, and player aids: `https://madegooddesigns.com/board-game-design/`, `https://www.leagueofgamemakers.com/whats-that-symbol-mean-again-building-clear-iconography-into-your-game/`, `https://mindclashgames.com/news/board-game-iconography-how-smart-symbols-enhance-ux-and-playability/`, `https://victoriafraser.ca/2023/03/01/how-to-write-the-perfect-boardgame-rulebook-with-examples/`, and `https://ocw.mit.edu/courses/cms-608-game-design-spring-2014/c2ac8e16ad060f36e9755db63310853b_MITCMS_608S14_WrittenGuide.pdf`.
- PnP, photography, and campaign media: `https://www.meeplephotography.com/blog/the-art-of-board-game-photography-capturing-components-that-sell`, `https://www.meeplemountain.com/articles/how-to-create-a-killer-board-game-media-kit/`, `https://help.backerkit.com/article/607-asset-recommendations-for-your-marketing-campaign`, and `https://www.backerkit.com/blog/tabletop-games-crowdfunding-roadmap/campaign/draft-your-kickstarter-campaign-page/`.
- Other reviewed families: `https://slugfestgames.com/store-events/op/`, `https://www.fantasyflightgames.com/ffg_content/organized-play/support/op-flyer-booklet.pdf`, `https://github.com/NPBruce/valkyrie`, `https://github.com/Lurkars/gloomhavensecretariat`, `https://www.siue.edu/faculty-center/pdf/Educational-Game-Design-Planning-Worksheet.pdf`, `https://thamesandkosmos.zendesk.com/hc/en-us/articles/360047790614-Replacement-Parts-Request-Form`, and `https://www.reddit.com/r/3Dprinting/comments/kslml6`.

## 2026-08-20 - Tabletop Art Asset Handoff deployment confirmation

- Implementation commit `b5d02113e8990a9363cedadcc90baad6b9e91ae7` (`Build tabletop art asset handoff cluster`) was pushed to `origin/main`; the post-push comparison was 0 ahead / 0 behind.
- GitHub Pages run `32348489503` (`https://github.com/canghun13/tabletopmakerlab/actions/runs/32348489503`) completed successfully for exact head SHA `b5d02113e8990a9363cedadcc90baad6b9e91ae7` at 2026-08-20 08:23:07 UTC.
- Cache-bypassed public HTTP checks returned 200 for the Hub and all five Tools. Each response contained its exact canonical URL, one static JSON-LD block, GA4 `G-V25YKRCX01`, the shared art-handoff script reference, and the expected page H1.
- The deployed response text for all six HTML files matched the committed local source exactly after CRLF/LF normalization. The deployed Tools hub contained all six cluster entries, and the deployed sitemap contained all six URLs.
- Actual public-browser render sweep passed all six pages at 1440 × 900 and 390 × 844: Header 1, Footer 1, H1 1, static JSON-LD 1, correct canonical, GA4 present, zero escaped panel/card bounds, zero page-level horizontal overflow, and no `.html">` markup leak.
- Public functional QA passed representative paths for all five Tools: default Art Brief generation; three-row Asset Tracker sample; two-row Credits sample and generated credit text; Delivery sample with the local favicon correctly reported as an unexpected file plus three missing expectations; favicon resolution check produced a finite 40.5 PPI and the expected configured-threshold blocker.
- Public mobile menu passed closed/visible state and `aria-expanded=false/true`. Final public exercised-tab console errors: 0; warnings: 0. Eight deployed internal assets (site/calculator/cluster CSS, site/cluster JS, Header/Footer partials, favicon) returned 200; internal asset failures: 0.
- Final status: **GO cluster shipped and deployment-verified.** Remaining concerns are the documented prepress/legal/performance boundaries, not known defects. Measure Search Console URL performance before any follow-on art cluster work.

## 2026-08-20 - Existing growth-page upgrade: Rulebook Completeness Checker

### Starting state and search evidence

- Restored clean `main` from `507765d28be99978e6ba3b2801dedfa86bfcd058` before analysis. The repository contained 81 public pages and the completed Art Asset Handoff deployment record.
- No current GSC, Bing Webmaster Tools, or GA4 export was available in the repository, handover, supplied attachments, common export folders, or available connectors. Search Console opened only its signed-out landing page, so no date range or performance values were inferred.
- Historical handover/request context identified several existing pages with impressions; Rulebook Completeness Checker had the clearest specific Bing long-tail signal. A live Bing exact-query check on 2026-08-20 surfaced the deployed checker as the main result.
- Current SERP review found rulebook articles, templates, and blind-test checklists, but no directly comparable browser-local board-game rulebook completeness checker in the reviewed results. Card-draw probability had strong direct calculator competition, while Kickstarter's official guidance includes its own funding calculator and fee model.

### Hard gate and selected scope

- **UPGRADE:** `/tools/rulebook-completeness-checker.html` passed all five gates: an observed existing-query signal; a concrete UX/content gap; meaningful creator value; low rank/function risk; and a change larger than cosmetic SEO.
- The previous form contained a visibly corrupted legend, did not define Clear/Unclear/Missing, and returned only section names. The upgrade preserves URL, title, H1, canonical, Open Graph, WebApplication JSON-LD, and the existing default choices.
- Added explicit rating criteria, an 11-part checklist explanation, a worked review example, result interpretation, evidence-oriented blind-test guidance, and direct linkage to the Playtesting & Rulebook Validation workflow.
- Results now put missing sections before unclear sections and generate section-specific revision actions plus a next-validation instruction. Shared CSS only adds the new instructions panel style; shared JS changes only the Rulebook handler.
- No page, sitemap entry, Tools-hub entry, Guide, Reference, dependency, or framework was added. The homepage and user-managed badge/backlink area were not changed.

### QA and deployment

- Static QA passed: Node syntax, `git diff --check`, targeted HTML/title/H1/canonical/JSON-LD/internal-target checks, and `tools/content_audit.py` across all 81 public pages with no reported issue.
- Functional browser QA passed default, all-clear, one-missing/one-unclear, all-11-missing, reset, repeated update, and Copy control status paths. Output contained no `undefined` or `NaN`. Fixed-option selects have no empty/invalid numeric state. The unchanged Print handler was not expanded.
- Responsive local QA passed the changed page at 390, 768, 900, 1024, 1280, and 1440 px with zero page-level horizontal overflow, one H1, loaded Header/Footer, and contained calculator/result panels. Mobile and desktop screenshots were visually inspected. The Blind Playtest Readiness Checker passed representative shared-asset regression at 390 and 1440 px, including its ready/reset states. Exercised local console warnings/errors: 0.
- Implementation commit `3911a1f68e146b486f64503cdab2e35559dc3347` (`Improve rulebook completeness checker`) was pushed to `origin/main`. GitHub Pages run `32366377892` completed successfully for that exact SHA.
- Cache-bypassed public HTTP checks returned 200 for the page, changed CSS/JS, Header/Footer partials, and favicon. Public HTML matched the committed local HTML exactly after CRLF/LF normalization and contained the new instructions with no corrupted legend.
- Public runtime verification passed the default and missing-Setup result paths, 390 and 1440 px layouts, Header/Footer loading, one H1, and zero horizontal overflow. Exercised public console warnings/errors: 0.

### Remaining measurement need

- This upgrade is evidence-led but current platform performance metrics remain unavailable. Do not claim traffic, click, CTR, or ranking improvement until a dated GSC/Bing/GA4 export is supplied or authenticated access becomes available.
- Measure the upgraded URL's query, impressions, clicks, CTR, average position, landing-page engagement, and outbound/internal workflow use before making another content or logic expansion.

## 2026-08-24 - New workflow discovery and Board Game Balance Test Analysis cluster (GO)

### Starting state and exclusions

- Began from a clean `main` at `f4490e6e6ffc4b95cc80b3da52d120250bdb854f`; local `HEAD`, `origin/main`, and the remote `refs/heads/main` matched after fetch, with 0 ahead / 0 behind.
- Read the full README and handover before research. The exclusion map covered all 37 original calculator workflows, Playtesting & Rulebook Validation, Game Data Integrity & Release QA, Tabletop Art Asset Handoff, the Rulebook upgrade, and every prior HOLD/REJECT family.
- In particular, this pass did not rename or recycle fulfillment/carton, publishing pitch, convention operations, manufacturing timeline, prototype cutting/materials, assembly labor, retail/wholesale, collation, footprint/setup, prepress/dielines, accessibility, localization, safety/regulatory, manufacturing inspection, campaign/scenario structure, constrained setup generation, review-copy operations, digital prototype packaging, iconography, onboarding/player aids, PnP packaging, product photography, crowdfunding media, organized play, companion apps, 3D parts, educational alignment, replacement service, or playtest-feedback collection.
- The homepage and its user-managed badge/backlink area were not opened for editing and remain byte-for-byte outside the diff. No dependency, framework, backend, system setting, Guide, or Reference page was added.

### Broad discovery: 40 genuinely new workflow/search families

1. Quantitative playtest outcome analytics.
2. First-player and seat equity analysis.
3. Faction matchup analysis.
4. Score-path contribution analysis.
5. Game-length and pacing data analysis.
6. Game-economy source/sink modeling.
7. Resource-conversion and arbitrage QA.
8. Engine growth-curve simulation.
9. Card/ability cost-value curve modeling.
10. Market-row churn modeling.
11. Map/network structural QA.
12. Starting-position fairness analysis.
13. Route bottleneck and redundancy analysis.
14. Modular-board combination coverage.
15. Scoring-system architecture QA.
16. Victory-path coverage analysis.
17. Endgame-trigger pacing analysis.
18. Equal-turn and turn-order fairness planning.
19. Action-economy capacity modeling.
20. Worker-placement space-capacity planning.
21. Asymmetric faction stat-budget analysis.
22. Cooperative difficulty scaling.
23. Solo/automa decision-deck design.
24. Draft-pool composition planning.
25. Auction-mechanism stress testing.
26. Hidden-information leakage mapping.
27. Bluff/hidden-role distribution planning.
28. Decision-space branching estimation.
29. State-space coverage planning without test-case generation.
30. Player-elimination timing analysis.
31. Runaway-leader and score-gap trajectory analysis.
32. Catch-up mechanism evaluation.
33. Action-use and dead-option analysis.
34. Component-use frequency and wear analysis.
35. Simultaneous-action conflict mapping.
36. Timing-window dependency mapping.
37. Deck exhaustion and reshuffle pacing.
38. Random-event impact distribution.
39. Team-role coverage and balance.
40. Technology-tree dependency and balance QA.

### Mid validation: 11 candidates

| Candidate | Workflow / SERP finding | Independence / static fit | Mid decision |
| --- | --- | --- | --- |
| Quantitative balance analytics | Creator discussions repeatedly describe manually tracking wins, scores, player counts, and game length in spreadsheets. Reviewed alternatives skew toward account platforms, services, simulations, or game-specific public statistics. | Five distinct post-playtest datasets and decisions; local CSV; deterministic descriptive statistics. | DEEP |
| Game-economy modeling | Repeated source/sink and conversion-spreadsheet need; Machinations and a current economy calculator confirm tool intent. | Static math is feasible, but custom resource semantics and strong digital/live-economy competition weaken the tabletop-specific gap. | DEEP |
| Map/network QA | Creators ask about adjacency, asymmetric maps, routes, and starting balance; exact generic tool SERPs were sparse. | Graph checks are feasible, but input construction is complex and the natural value may collapse into one suite rather than four independent URLs. | DEEP |
| Turn/endgame pacing | Real questions around turn-order advantage, equal turns, game length, and end triggers. | Useful pieces exist, but the strongest quantitative work belongs inside outcome analytics and does not justify four separate tools. | DEEP |
| Scoring-system QA | Real concern around point-salad concentration, alternate paths, and end scoring. | Score-path analysis is strong; the remaining proposed pages overlapped or depended on custom game semantics. | MERGE one tool into winner |
| Asymmetric faction balance | Faction budgets and matchup fairness recur in asymmetric-design discussions. | Matchup outcomes are strong; generic stat budgets require game-specific value assumptions. | MERGE one tool into winner |
| Cooperative difficulty scaling | Designers need difficulty to hold across player counts and roles. | Outcomes are measurable, but generic difficulty models require game-specific loss states, action economies, and AI rules. | HOLD |
| Solo/automa design | Current solo modes and automa decks validate a real workflow. | Decision tables and priorities are deeply game-specific; search results are often game-specific content rather than tool intent. | HOLD |
| Card/ability cost curve | Spreadsheet valuation and curve comparisons recur. | Feasible but subjective attributes require creator weighting; adjacent to economy modeling. | HOLD |
| Draft-pool planning | Pool size, copies, seats, and archetype coverage are recurring draft concerns. | Deterministic pieces exist, but direct search demand and four-tool independence were weaker. | HOLD |
| Hidden-information / role distribution | Role counts, bluff density, and information access are recurring social-deduction concerns. | Many player-facing setup generators compete; semantic safety depends on individual game rules. | REJECT |

### Deep validation: four finalists

| Finalist | Demand and long-tail | SERP / competitor gap | Independence and risk | Decision |
| --- | --- | --- | --- | --- |
| **Board Game Balance Test Analysis** | Repeated creator spreadsheet workflows and direct questions around win rate, first-player advantage, matchup cells, player counts, score paths, and sample uncertainty. | Reviewed results were game-specific stat sites, account-backed analytics/simulation platforms, consulting/services, or a generic win-rate calculator; a free browser-local post-hoc human-playtest CSV workbench was fragmented or absent. | Five truly different inputs/decisions; stable math; local files; editable review rules; explicit non-causal language; no internal duplicate. | **GO** |
| Game Economy Modeling | Strong spreadsheet/source-sink workflow and useful long-tail around conversion rates, faucets/sinks, and growth curves. | Current economy calculators and Machinations compete, especially for digital/live economies. | Four possible tools, but user-defined semantics and weighting raise interpretation risk. | HOLD |
| Map & Network Balance QA | Real adjacency, route, starting-position, and modular-map questions with sparse exact tool SERPs. | Game-specific generators exist, while a generic tabletop graph checker remains less obvious. | Input UX is costly and proposed pages naturally converge on one graph model; fails the four-independent-tool release gate. | HOLD |
| Turn Order & Endgame Pacing Lab | First-player and equal-turn questions are recurring, with real quantitative analysis examples. | Tool SERP is sparse, but the strongest parts are a seat analyzer and duration comparison. | Only two or three strong independent outputs; both integrate naturally into quantitative balance analytics. | REJECT / MERGE |

### Winner and hard-gate rationale

- **Winner: Board Game Balance Test Analysis.** It passed all release gates: at least four independent tools (five released), a recurring creator problem visible in actual spreadsheet practice, several defensible long-tail intents, a weak/fragmented exact tool SERP, stable browser-local inputs, deterministic calculations, low maintenance, and low safety risk when uncertainty and confounding are stated directly.
- This is not a duplicate of the existing Playtesting cluster, which plans sessions, prioritizes coverage/issues, and checks rulebook/readiness inputs. It also does not duplicate Data Integrity QA, which checks files and releases rather than observed game outcomes.
- The 95% interval uses the Wilson score method. Review bands, minimum samples, baselines, and flag thresholds are creator-entered. Outputs say “review signal,” “more evidence needed,” or “interval overlaps”; they do not claim that a game, faction, seat, or strategy is balanced or causal.

### Released scope

- Hub: `/tools/board-game-balance-test-analysis.html`.
- Tool 1: `/tools/board-game-win-rate-confidence-calculator.html` — observed binary win rate, 95% Wilson interval, target band, and next-evidence interpretation.
- Tool 2: `/tools/first-player-advantage-analyzer.html` — local CSV seat results grouped by version and player count against equal-seat baselines.
- Tool 3: `/tools/board-game-faction-matchup-analyzer.html` — order-normalized matchup results, decisive-game intervals, preserved draws, and low-sample flags.
- Tool 4: `/tools/player-count-balance-analyzer.html` — duration and score-spread summaries compared with a creator-selected baseline count.
- Tool 5: `/tools/board-game-score-path-analyzer.html` — long-form scoring-category share and winner association without a synthetic balance score.
- Added shared analysis/parsing/UI behavior in `assets/js/balance-analysis-calculators.js`, cluster-only styling in `assets/css/balance-analysis.css`, and deterministic Node assertions in `tools/balance_analysis_fixtures.js`. Updated only the Tools index and sitemap outside the new files. Public HTML count is now 87.
- All six pages include direct metadata, canonical, Open Graph, GA4, static page-specific JSON-LD, Header/Footer partials, and internal workflow links. CSV data remains local to the browser tab.

### Pre-commit QA completed

- Static/content: `tools/content_audit.py` passed all 87 public pages with no issue; each new page has exactly one title, description, canonical, H1, and static JSON-LD block; `git diff --check` passed apart from existing Windows line-ending notices.
- Deterministic fixtures: quoted commas/quotes, malformed row shape, unclosed quote, Wilson interval, impossible wins, seat grouping, reversed matchup normalization, draws, player-count comparisons, and score-path aggregation all passed in `tools/balance_analysis_fixtures.js`.
- Functional local browser: all five tools passed normal/sample runs, repeat runs, reset, clear/empty errors, enabled copy state, and expected row/group counts. Win-rate boundary 0/10 and impossible 11/10 paths passed. A real local CSV was selected through the visible file chooser and produced the expected four-game/two-seat report.
- Responsive local browser: all six pages passed at 390, 768, 900, 1024, 1280, and 1440 px (36 page/width combinations) with Header, Footer, H1, and zero document-level horizontal overflow. A populated score-path table also passed all six widths; its 680 px table scrolls only inside the report wrapper. Mobile and desktop screenshots were visually inspected, and the mobile navigation opened successfully.
- A real-browser check exposed a stale shared-site-CSS collision on the generic `.result-panel` name. Versioning the site CSS reference on the six new pages loaded the current stylesheet and eliminated the collision; the full responsive sweep then passed.
- Regression checks covered the homepage, Tools index, Dice Probability Calculator, and Rulebook Completeness Checker at 390 and 1440 px. Header/Footer/H1 remained present, the new Tools section exposed six links, and the homepage remained outside the diff. The persistent test browser reported a pre-existing 12 px mobile overflow on unversioned legacy pages only; new pages passed at 0 px and no shared legacy file was changed.
- Exercised local console errors: 0. No new install, dependency, system change, network-backed runtime, or upload endpoint was introduced.

### Research references checked

- Creator data workflow and balance practice: `https://www.reddit.com/r/tabletopgamedesign/comments/1c7n1av`, `https://www.reddit.com/r/tabletopgamedesign/comments/1p1afs0/how_do_you_test_game_balance_genuinely_curious/`, `https://www.reddit.com/r/tabletopgamedesign/comments/15eck82`, `https://www.reddit.com/r/tabletopgamedesign/comments/kqlzfu`, and `https://neutronium.games/blog/board-game-playtesting-guide`.
- First-player and matchup analysis: `https://boardgamegeek.com/thread/3272118/how-to-quantify-first-player-advantage`, `https://www.reddit.com/r/BoardgameDesign/comments/1rwzk4w/first_player_advantage/`, and `https://jelmata.com/blog/does-the-first-player-have-an-advantage`.
- Current competitors/alternatives: `https://absurdtools.com/win-rate-confidence/`, `https://github.com/TabletopFoundry/playtestai`, `https://playtestplaza.com/`, `https://dustinsdesignerden.com/`, `https://www.boardgamebalancelab.com/`, and `https://www.tabletoprnd.co.uk/`.
- Other finalists: `https://cuzus.games/en/tools/game-economy-balance-calculator/`, `https://machinations.io/`, `https://boardgamegeek.com/thread/3556613/asymmetrical-map-region-adjacency-and-game-balance`, `https://github.com/Qsanti/catan-forge`, and `https://hexwright.app/`.
- Statistical method: NIST Wilson/proportion interval references at `https://itl.nist.gov/div898/handbook/prc/section2/prc241.htm` and `https://itl.nist.gov/div898/software/dataplot/refman1/auxillar/propconf.htm`.

### Deployment next step

- Commit and push this one cluster only, wait for the matching GitHub Pages run, then verify all six public HTML responses, shared assets/partials, committed-vs-deployed source, representative production functionality, 390/1440 production layout, and console/runtime status. Record the exact implementation SHA and Pages run below before considering the release complete.

## 2026-08-24 - Board Game Balance Test Analysis deployment confirmation

- Implementation commit `49fdf231e53ed2b61e18085ab8ed2fb2e19a19d5` (`Build board game balance analysis tools`) was pushed to `origin/main`.
- GitHub Pages run `32725674174` (`https://github.com/canghun13/tabletopmakerlab/actions/runs/32725674174`) completed successfully for that exact implementation SHA at 2026-08-24 03:11:10 UTC.
- Cache-bypassed public HTTP checks returned 200 for the Hub and all five Tools. Each deployed HTML response matched the committed file exactly after CRLF/LF normalization and contained one H1, its canonical, one static JSON-LD block, and GA4 `G-V25YKRCX01`.
- Deployed shared assets passed HTTP checks: versioned site CSS, calculator CSS, balance-analysis CSS, versioned site JS, balance-analysis JS, Header/Footer partials, and favicon all returned 200. The public Tools index exposed all six cluster links, and the public sitemap contained all six URLs.
- Actual public-browser layout QA passed all six pages at 390 and 1440 px (12 combinations) with one Header, one Footer, one H1, one JSON-LD block, and zero page-level horizontal overflow.
- Public functional QA passed all five Tools with the committed default/sample datasets and expected game/table row counts: Win 20/4, Seat 12/2, Matchup 10/1, Player Count 9/3, and Score Path 4/3. The Score Path copy control placed the expected report text on the browser clipboard.
- Public mobile navigation opened successfully at 390 px with zero page overflow. Exercised production console errors: 0.
- Final release status: **GO cluster shipped and production-verified.** Measure Search Console impressions and clicks by URL before adding adjacent balance/economy/map tools; do not expand merely to increase page count.
