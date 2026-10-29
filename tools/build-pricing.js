// Builds the pricing page in English and Arabic from tools/pricing-data.js:
//   pricing/index.html      (/pricing/)
//   ar/pricing/index.html   (/ar/pricing/)
// Static HTML, so the prices are visible to search engines; assets/js/pricing.js only switches
// Monthly/Yearly and the nav style. Run from the website folder:  node tools/build-pricing.js
'use strict';
const fs = require('fs');
const path = require('path');
const { PLANS, COPY, WHATSAPP, SYSTEMS, UNLIMITED, CUSTOM } = require('./pricing-data');

const root = path.resolve(__dirname, '..');
const SITE = 'https://stacko-lb.com';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const num = (n) => Number(n).toLocaleString('en-US');
const money = (n) => `$${num(n)}`;

// The logo mark is defined once, in the homepage.
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const markSymbol = /<filter id="mkGlow"[\s\S]*?<\/filter>\s*<symbol id="mark"[\s\S]*?<\/symbol>/.exec(home);
if (!markSymbol) throw new Error('Logo mark not found in index.html');

const ICONS = `
<symbol id="p-warehouse" viewBox="0 0 48 48"><path d="M6 20 24 9l18 11v19H6z"/><path d="M13 39V26h22v13M13 31h22M13 35h22"/></symbol>
<symbol id="p-shop" viewBox="0 0 48 48"><path d="M8 19h32l-3-9H11z"/><path d="M10 19v20h28V19M20 39v-10h8v10"/><path d="M8 19c0 3 2.5 5 5.3 5s5.3-2 5.3-5c0 3 2.5 5 5.4 5s5.3-2 5.3-5c0 3 2.5 5 5.4 5S40 22 40 19"/></symbol>
<symbol id="p-branch" viewBox="0 0 48 48"><rect x="10" y="9" width="28" height="30" rx="2"/><path d="M16 16h4M22 16h4M28 16h4M16 22h4M22 22h4M28 22h4M16 28h4M28 28h4M21 39v-7h6v7"/></symbol>
<symbol id="p-check" viewBox="0 0 16 16"><path d="M6.2 11.6 2.6 8l1.2-1.2 2.4 2.4 6-6L13.4 4.4z"/></symbol>
<symbol id="p-wa" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.4 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.2-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.3.7-.2l2 .9c.3.1.5.2.5.4.1.1.1.6-.1 1.3z"/></symbol>`;

function build(lang) {
  const t = COPY[lang];
  const ar = lang === 'ar';
  const base = ar ? '/ar/' : '/';
  const self = ar ? '/ar/pricing/' : '/pricing/';
  const other = ar ? '/pricing/' : '/ar/pricing/';
  // Plan buttons open the homepage demo form with the plan noted in the message (saved to the CRM).
  const contact = (planName) => `${base}${planName ? `?plan=${encodeURIComponent(planName)}` : ''}#contact`;
  const wa = (planName) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.whatsappText(planName))}`;
  const per = (p, period) => `<span class="per">${period === 'm' ? t.perMonth : t.perYear}</span>`;

  // ---- plan cards ----
  const cards = PLANS.map((p) => {
    const name = t.plans[p.id].name;
    const price = p.monthly === CUSTOM
      ? `<p class="pc-price"><span class="amt quote">${t.customQuote}</span></p>`
      : `<p class="pc-price"><span class="m"><span class="amt">${money(p.monthly)}</span>${per(p, 'm')}</span><span class="y"><span class="amt">${money(p.yearly)}</span>${per(p, 'y')}<span class="save">${t.hero.badge}</span></span></p>`;
    const limits = [
      t.limits.locations(p.locations),
      t.limits.extraLocation(p.extraLocation),
      t.limits.appUsers(p.appUsers),
      t.limits.telegram,
      t.limits.connections(p.connections),
      t.limits.aiCredits(p.aiCredits, p.aiAdjustable),
    ];
    return `
      <article class="pc${p.popular ? ' popular' : ''}" aria-labelledby="pc-${p.id}">
        ${p.popular ? `<span class="pc-badge">${t.popular}</span>` : ''}
        <h3 id="pc-${p.id}">${name}</h3>
        <p class="pc-line">${t.plans[p.id].line}</p>
        ${price}
        <a class="btn ${p.popular ? 'btn-primary' : 'btn-line'} pc-cta" href="${contact(name)}">${t.cta[p.cta]}</a>
        <ul class="pc-limits">${limits.map((l) => `<li><svg aria-hidden="true"><use href="#p-check"/></svg><span>${esc(l)}</span></li>`).join('')}</ul>
      </article>`;
  }).join('');

  // ---- comparison table ----
  const v = t.compare.v;
  const cell = (val, kind) => {
    if (val === UNLIMITED) return v.unlimited;
    if (val === 'unlimitedCustom') return v.unlimitedCustom;
    if (val === CUSTOM) return kind === 'price' ? v.customQuote : v.custom;
    if (kind === 'price-m') return `${money(val)} <small>${v.perMonth}</small>`;
    if (kind === 'price-y') return `${money(val)} <small>${v.perYear}</small>`;
    if (kind === 'extra') return `${money(val)} <small>${v.perMonth}</small>`;
    return num(val);
  };
  const rows = [
    ['monthly', (p) => p.monthly === CUSTOM ? v.customQuote : cell(p.monthly, 'price-m')],
    ['yearly', (p) => p.yearly === CUSTOM ? v.customQuote : cell(p.yearly, 'price-y')],
    ['locations', (p) => cell(p.locations)],
    ['extraLocation', (p) => cell(p.extraLocation, 'extra')],
    ['appUsers', (p) => cell(p.appUsers)],
    ['telegram', () => v.unlimited],
    ['connections', (p) => cell(p.connections)],
    ['aiCredits', (p) => `${num(p.aiCredits)}${p.aiAdjustable ? ` <small>${v.adjustable}</small>` : ''}`],
    ['trial', () => v.days],
    ['selfServe', () => v.free],
    ['guided', () => v.onQuote],
  ];
  const table = `
      <div class="cmp-scroll" tabindex="0" role="region" aria-labelledby="cmpH">
        <table class="cmp">
          <thead><tr><th scope="col"><span class="sr">${t.compare.plan}</span></th>${PLANS.map((p) => `<th scope="col" class="${p.popular ? 'hl' : ''}">${t.plans[p.id].name}${p.popular ? `<small>${t.popular}</small>` : ''}</th>`).join('')}</tr></thead>
          <tbody>${rows.map(([key, fn]) => `<tr><th scope="row">${t.compare.rows[key]}</th>${PLANS.map((p) => `<td class="num${p.popular ? ' hl' : ''}">${fn(p)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`;

  // ---- structured data ----
  const offers = PLANS.filter((p) => p.monthly !== CUSTOM).flatMap((p) => [
    { '@type': 'Offer', name: `${COPY.en.plans[p.id].name} (monthly)`, price: String(p.monthly), priceCurrency: 'USD', url: `${SITE}${self}`,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: p.monthly, priceCurrency: 'USD', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' } } },
    { '@type': 'Offer', name: `${COPY.en.plans[p.id].name} (yearly)`, price: String(p.yearly), priceCurrency: 'USD', url: `${SITE}${self}`,
      priceSpecification: { '@type': 'UnitPriceSpecification', price: p.yearly, priceCurrency: 'USD', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'ANN' } } },
  ]);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${SITE}${self}#webpage`, url: `${SITE}${self}`, name: t.title, inLanguage: lang, isPartOf: { '@id': `${SITE}/#website` } },
      { '@type': 'SoftwareApplication', '@id': `${SITE}/#app`, name: 'Stacko', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: `${SITE}/`, offers },
      { '@type': 'FAQPage', inLanguage: lang, mainEntity: t.faq.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    ],
  };

  return `<!doctype html>
<html lang="${lang}" dir="${ar ? 'rtl' : 'ltr'}" data-billing="monthly">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- Generated by tools/build-pricing.js from tools/pricing-data.js. Do not edit by hand. -->
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${SITE}${self}">
<link rel="alternate" hreflang="en" href="${SITE}/pricing/">
<link rel="alternate" hreflang="ar" href="${SITE}/ar/pricing/">
<link rel="alternate" hreflang="x-default" href="${SITE}/pricing/">
<meta name="theme-color" content="#0E2440">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Stacko">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:url" content="${SITE}${self}">
<meta property="og:image" content="${SITE}/assets/images/og-image.jpg">
<meta property="og:locale" content="${ar ? 'ar_LB' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Audiowide&family=Noto+Kufi+Arabic:wght@500;600;700&family=Readex+Pro:wght@300;400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/pricing.css">
<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>
</head>
<body class="pricing-page">

<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
${markSymbol[0]}
${ICONS}
</defs></svg>

<nav class="nav" id="nav" aria-label="Main">
  <div class="wrap">
    <a class="lockup" href="${base}" aria-label="Stacko home">
      <svg aria-hidden="true"><use href="#mark"/></svg>
      <span class="wm">stack<i>o</i></span><span class="wm-ar">ستاك<i>و</i></span>
    </a>
    <div class="nav-links">
      <a href="${base}#how">${t.nav.how}</a>
      <a href="${base}#product">${t.nav.product}</a>
      <a href="${base}#setup">${t.nav.setup}</a>
      <a href="${base}#roles">${t.nav.roles}</a>
      <a href="${self}" aria-current="page">${t.navPricing}</a>
      <a href="${base}#faq">${t.nav.faq}</a>
    </div>
    <div class="nav-r">
      <a class="lang-btn" href="${other}" hreflang="${ar ? 'en' : 'ar'}" lang="${ar ? 'en' : 'ar'}">${ar ? 'English' : 'العربية'}</a>
      <a class="btn btn-primary" href="${contact()}">${t.nav.demo}</a>
    </div>
  </div>
</nav>

<main>
<!-- ============ HERO + PLANS ============ -->
<section class="p-hero on-dark" aria-labelledby="pH">
  <div class="wrap">
    <p class="eyebrow">${t.hero.eyebrow}</p>
    <h1 class="p-h1" id="pH">${t.hero.h1}</h1>
    <p class="lede">${t.hero.sub}</p>
    <div class="bill" role="group" aria-label="${t.hero.billing}">
      <button type="button" data-billing="monthly" aria-pressed="true">${t.hero.monthly}</button>
      <button type="button" data-billing="yearly" aria-pressed="false">${t.hero.yearly}<span class="bill-badge">${t.hero.badge}</span></button>
    </div>
  </div>
</section>

<section class="p-plans" aria-label="${t.hero.eyebrow}">
  <div class="wrap">
    <div class="pc-grid">${cards}
    </div>
    <ul class="p-notes">${t.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
    <div class="incl">
      <h2 class="incl-h">${t.included.title}</h2>
      <ul>${t.included.items.map((i) => `<li><svg aria-hidden="true"><use href="#p-check"/></svg><span>${esc(i)}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>

<!-- ============ WHAT COUNTS AS A LOCATION ============ -->
<section class="p-loc" aria-labelledby="locH">
  <div class="wrap">
    <div class="p-head">
      <p class="eyebrow">${t.location.eyebrow}</p>
      <h2 class="h2" id="locH">${t.location.h2}</h2>
      <p class="lede">${t.location.p}</p>
    </div>
    <div class="loc-strip">
      ${['warehouse', 'shop', 'branch'].map((k) => `<div class="loc-k"><svg aria-hidden="true"><use href="#p-${k}"/></svg><b>${t.location.kinds[k]}</b><span>${t.location.equals}</span></div>`).join('')}
    </div>
    <div class="loc-never"><b>${t.location.never}</b><ul>${t.location.neverItems.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>
  </div>
</section>

<!-- ============ COMPARISON ============ -->
<section class="p-cmp" aria-labelledby="cmpH">
  <div class="wrap">
    <h2 class="h2" id="cmpH">${t.compare.h2}</h2>
    ${table}
  </div>
</section>

<!-- ============ EXISTING SYSTEMS ============ -->
<section class="p-sys" aria-labelledby="sysH">
  <div class="wrap sys-grid">
    <div>
      <p class="eyebrow">${t.existing.eyebrow}</p>
      <h2 class="h2" id="sysH">${t.existing.h2}</h2>
      <p class="lede">${t.existing.p}</p>
      <ul class="sys-chips">${SYSTEMS.map((s) => `<li dir="ltr">${esc(s)}</li>`).join('')}</ul>
    </div>
    <div class="sys-card">
      <h3>${t.existing.setupTitle}</h3>
      <p><svg aria-hidden="true"><use href="#p-check"/></svg><span>${t.existing.selfServe}</span></p>
      <p><svg aria-hidden="true"><use href="#p-check"/></svg><span>${t.existing.guided}</span></p>
    </div>
  </div>
</section>

<!-- ============ AI CREDITS ============ -->
<section class="p-ai" aria-labelledby="aiH">
  <div class="wrap">
    <div class="p-head">
      <p class="eyebrow">${t.ai.eyebrow}</p>
      <h2 class="h2" id="aiH">${t.ai.h2}</h2>
      <p class="lede">${t.ai.p}</p>
    </div>
    <div class="ai-grid">
      ${t.ai.examples.map((e) => `<div class="ai-ex"><span class="ai-kind">${e.kind}</span><p class="ai-q">${esc(e.q)}</p><span class="ai-eq">= <b class="num">${t.ai.credit(e.credits)}</b></span></div>`).join('')}
    </div>
    <div class="ai-notes">
      <p><b>${t.ai.ownKeyT}</b> ${t.ai.ownKey}</p>
      <p><b>${t.ai.topUpT}</b> ${t.ai.topUp}</p>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="faq p-faq" aria-labelledby="fqH">
  <div class="wrap fq-grid">
    <div class="fq-head"><h2 class="h2" id="fqH">${t.faq.h2}</h2></div>
    <div class="fq-list">
      ${t.faq.items.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- ============ FINAL CTA ============ -->
<section class="p-final on-dark" aria-labelledby="finH">
  <div class="wrap">
    <h2 class="h2" id="finH">${t.final.h2}</h2>
    <p class="lede">${t.final.p}</p>
    <div class="fin-cta">
      <a class="btn btn-primary" href="${contact()}">${t.final.demo}</a>
      <a class="btn btn-ghost" href="${wa()}" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#p-wa"/></svg>${t.final.whatsapp}</a>
    </div>
  </div>
</section>
</main>

<footer>
  <div class="wrap">
    <div class="ft-strip">
      <a class="lockup" href="${base}" aria-label="Stacko home"><svg aria-hidden="true"><use href="#mark"/></svg><span class="wm">stack<i>o</i></span><span class="wm-ar">ستاك<i>و</i></span></a>
      <p>${t.footer.strip}</p>
      <a class="btn btn-primary" href="${contact()}">${t.nav.demo}</a>
    </div>
    <div class="ft">
      <p class="ft-tag">${t.footer.tagline}</p>
      <div>
        <a class="aiphin" href="https://aiphin.me" target="_blank" rel="noopener"><span>${t.footer.by}</span> <b><span>AI</span>PHIN</b></a>
        <small>${t.footer.rights}</small>
      </div>
    </div>
  </div>
</footer>

<script src="/assets/js/pricing.js" defer></script>
</body>
</html>
`;
}

for (const [lang, dir] of [['en', 'pricing'], ['ar', 'ar/pricing']]) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
  fs.writeFileSync(path.join(root, dir, 'index.html'), build(lang));
  console.log(`${dir}/index.html written`);
}
