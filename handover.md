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
- In-app browser could not reach this isolated local preview server. Run a rendered desktop/mobile check against the deployed domain after GitHub Pages publishes this commit; do not consider that check complete until then.

### Remaining issues

- Anchor calculator pages and their calculation logic are intentionally not implemented in Phase 1.
- Contact uses a mailto link because the project has no backend or form service.

### Recommended next work

1. Build the Board Game Box Size Estimator as the first substantive calculator page, including methodology, examples, limits, and related links.
2. Add the Sleeved Card Stack Calculator and Component Volume Calculator using the same reusable calculator UI patterns.
3. Turn the most relevant Guides and Reference entries into substantive supporting content as each tool launches.

### Commit

- Pending Phase 1 final validation and push.
