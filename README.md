# Stacko website

Marketing site for **Stacko**, live inventory and warehouse management for Lebanon and the GCC. A product by [AIPHIN](https://aiphin.me).

Static site: plain HTML, CSS and JavaScript. The only build step generates the Arabic page.

## Structure

```
index.html            English home page (served at /)
ar/index.html         Arabic home page (served at /ar/), GENERATED, do not edit by hand
tools/build-ar.js     Builds ar/index.html from index.html + the Arabic copy in main.js
home/index.html       /home → redirects to /
404.html              Not-found page
assets/
  css/style.css       All styles
  js/main.js          Map engine, interactions, English + Arabic copy (const AR / const T)
  images/             Hero map, social preview, favicon and app icons
robots.txt, sitemap.xml, site.webmanifest
vercel.json           Redirects, trailing slashes, caching and security headers
```

## Editing copy

- English copy lives in `index.html` (elements with `data-i="key"`).
- Arabic copy lives in `const AR` in `assets/js/main.js`, under the same keys.
- After changing either, regenerate the Arabic page and commit it:

```
node tools/build-ar.js
```

The script fails if any `data-i` key has no Arabic copy.

## SEO

- Each language has its own URL with `hreflang` links between them (`/` and `/ar/`).
- Canonical, Open Graph, sitemap and structured data all use `https://stacko.aiphin.me`. If the production domain changes, replace it in `index.html`, `tools/build-ar.js`, `robots.txt` and `sitemap.xml`, then rebuild the Arabic page.
- Update `<lastmod>` in `sitemap.xml` when page content changes.

## Run locally

```
npx serve .
```

Asset paths are root-relative (`/assets/...`), so serve the folder from the site root.

## Deploy

Hosted on Vercel. Every push to `main` deploys. The production domain `stacko.aiphin.me` must be added under the Vercel project's Settings → Domains.
