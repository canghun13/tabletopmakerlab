# Tabletop Maker Lab — Project Handover

## Project overview

- **Site:** <https://tabletopmakerlab.com>
- **Positioning:** Free tools for board game designers, creators & publishers.
- **Audience:** Board game designers, tabletop creators, indie publishers, crowdfunding creators, and prototype makers.
- **Hosting:** GitHub Pages with Cloudflare DNS/CDN and HTTPS.
- **Analytics:** GA4 `G-V25YKRCX01`.
- **Source of truth:** This GitHub repository. Always pull it before working.

This is a practical creator workbench—not a generic board-game playing site. Its five work areas are Game Math, Components, Production, Crowdfunding, and Publishing.

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

## 2026-07-23 — Phase 1 foundation

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

- `9b72d62` — `Build Tabletop Maker Lab phase one foundation` (pushed to `main`)

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
- Calculation/Reset checks: Quote winner `Quote 3 → Quote 1 → Quote 3`; Landed Cost `$25,850.00 → $30,050.00 → $25,850.00`; Freight `$1.87 → $3.73 → $1.87`; Overage `3,300 → 3,500 → 3,300`; Reserve `115 → 232 → 115`.
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
- Shipping Subsidy: calculates each region’s actual shipping plus handling less shipping charged after entered fees, then reports weighted total subsidy across Domestic, Nearby International, and Rest of World inputs.

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
- Changed-input / Reset checks passed: Break-even `544 → — → 544`; Stretch Goal `$6,482.50 → $11,965.00 → $6,482.50`; Add-on `$8.40 → -$5.40 → $8.40`; Shipping Subsidy `$3.62 → -$3.01 → $3.62`. Tier ranking changed from `Core pledge` to `Deluxe pledge` when the Core price was reduced.
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
