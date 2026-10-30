# Stacko website

Marketing site for **Stacko**, live inventory and warehouse management for Lebanon and the GCC. A product by [AIPHIN](https://aiphin.me).

Static site: plain HTML, CSS and JavaScript. Two small build scripts generate the Arabic homepage and the
pricing pages; their output is committed (Vercel serves the files as they are).

## Structure

```
index.html              English home page (served at /); also holds the site footer
ar/index.html           Arabic home page (/ar/), GENERATED
pricing/index.html      Pricing page (/pricing/), GENERATED
ar/pricing/index.html   Arabic pricing page (/ar/pricing/), GENERATED
tools/build-ar.js       Builds ar/index.html from index.html + the Arabic copy in main.js
tools/pricing-data.js   Plans, prices, limits and all pricing-page copy (EN + AR): the one place to change prices
tools/build-pricing.js  Builds both pricing pages from pricing-data.js (footer copied from the homepages)
home/index.html         /home → redirects to /
404.html                Not-found page
assets/
  css/style.css         Shared styles (nav, buttons, sections, footer)
  css/pricing.css       Pricing page styles
  js/main.js            Homepage: map engine, interactions, English + Arabic copy (const AR / const T)
  js/pricing.js         Pricing page: Monthly / Yearly switch, nav on scroll
  images/               Hero map, footer photo (BG-04 from the background library), social preview, icons
robots.txt, sitemap.xml, site.webmanifest
vercel.json             Redirects, trailing slashes, caching and security headers
```

## Editing copy

- English copy lives in `index.html` (elements with `data-i="key"`).
- Arabic copy lives in `const AR` in `assets/js/main.js`, under the same keys.
- Prices and pricing-page copy live in `tools/pricing-data.js`.
- After changing any of them, rebuild in this order and commit the output:

```
node tools/build-ar.js        # Arabic homepage
node tools/build-pricing.js   # pricing pages (uses both homepages' footer)
```

`build-ar.js` fails if any `data-i` key has no Arabic copy.

## Pricing buttons

No checkout: every plan button opens the homepage demo form with `?plan=<plan name>`, which notes the plan in the
message, so the request reaches the CRM with the plan. The final call to action also offers WhatsApp.

## SEO

- Each language has its own URL with `hreflang` links between them (`/` and `/ar/`).
- Canonical, Open Graph, sitemap and structured data all use `https://stacko-lb.com`. If the production domain changes, replace it in `index.html`, `tools/build-ar.js`, `robots.txt` and `sitemap.xml`, then rebuild the Arabic page.
- Update `<lastmod>` in `sitemap.xml` when page content changes.

## Run locally

```
npx serve .
```

Asset paths are root-relative (`/assets/...`), so serve the folder from the site root.

## Deploy

Hosted on Vercel. Every push to `main` deploys. The production domain `stacko-lb.com` must be added under the Vercel project's Settings → Domains.
