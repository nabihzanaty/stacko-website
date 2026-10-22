# Stacko website

Marketing site for **Stacko**, live inventory and warehouse management for Lebanon and the GCC. A product by [AIPHIN](https://aiphin.me).

Static site: plain HTML, CSS and JavaScript, no build step.

## Structure

```
index.html            Home page (served at /)
home/index.html       /home → redirects to /
404.html              Not-found page
assets/
  css/style.css       All styles
  js/main.js          Map engine, interactions, EN/AR language switch
  images/             Hero map, social preview, favicon and app icons
robots.txt, sitemap.xml, site.webmanifest
```

## Clean URLs

Pages live in folders as `index.html` (e.g. `about/index.html`), so URLs never show `.html`:
`/`, `/home`, `/about`. To add a page, create `<name>/index.html`, link to it as `/<name>`, and add it to `sitemap.xml`.

## Run locally

```
npx serve .
```

## Deploy (GitHub Pages)

1. Push to GitHub.
2. Settings → Pages → Deploy from branch → `main` / root.
3. For a custom domain, add it under Pages settings (this creates a `CNAME` file).

The production domain is set to `https://stacko.aiphin.me`. If it differs, replace it in
`index.html`, `home/index.html`, `robots.txt` and `sitemap.xml`.
