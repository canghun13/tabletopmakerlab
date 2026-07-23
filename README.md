# Tabletop Maker Lab

Free tools for board game designers, creators & publishers.

Live site: <https://tabletopmakerlab.com>

## Purpose

Tabletop Maker Lab is a creator-first planning workbench—not a board-game playing site. It helps tabletop designers, prototype makers, crowdfunding creators, and indie publishers work through game math, physical components, production, crowdfunding, and publishing economics.

The project deliberately avoids invented manufacturer quotes, real-time price claims, accounts, databases, and backend services. Tools should make their assumptions visible and let creators enter project-specific inputs.

## Stack and deployment

- Static HTML, CSS, and vanilla JavaScript only
- GitHub Pages hosting, Cloudflare DNS/CDN
- No framework, build process, database, or backend
- GA4 measurement ID: `G-V25YKRCX01`

The GitHub repository is the single source of truth. Work must remain portable: on any machine, pull this repository and read this file plus `handover.md` before starting.

## Repository map

```text
/
├── index.html              Homepage
├── about.html, contact.html, privacy.html
├── tools/                  Tool hub and future calculator pages
├── guides/                 Guide hub and future long-form guides
├── reference/              Reference hub and future reference sheets
├── assets/css/site.css     Shared design system
├── assets/js/site.js       Shared partial loader and navigation behavior
├── assets/icons/           Brand icons and favicon
├── partials/               Reusable header and footer markup
├── robots.txt, sitemap.xml, llms.txt
└── handover.md             Current state, QA, and next work
```

## Working rules

Before work: check repository status, run `git pull` when needed, read this file and all of `handover.md`, then inspect the existing structure and conventions.

For every public page, include directly in its `<head>`: unique title, meta description, canonical URL, robots meta, viewport, Open Graph basics, favicon, stylesheet, and GA4. Header and footer are loaded from `/partials/` by `assets/js/site.js`; SEO head content must never be moved into a partial.

Keep the visual language independent: a professional tabletop creator workshop / prototype lab / publishing workbench, without copying another project or using generic board-game-player imagery. Preserve mobile-first behavior and accessible semantic HTML.

Before handoff: check internal links, HTML validity, duplicate IDs, JavaScript errors, canonical/meta/GA4 coverage, sitemap/robots, and rendered mobile/desktop layouts. Update `handover.md`, commit, and push to `main`.

## Local preview

Use a basic local static server from the repository root (for example, `python -m http.server 8000`) so fetched header/footer partials load correctly. Do not rely on opening HTML files directly from disk.
