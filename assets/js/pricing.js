// Pricing page: Monthly / Yearly switch and the solid nav on scroll. Prices are in the HTML;
// html[data-billing] decides which one shows (see pricing.css).
(() => {
  'use strict';
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll('.bill button')];
  const set = (period) => {
    root.dataset.billing = period;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.billing === period)));
    try { localStorage.setItem('stacko-billing', period); } catch (e) {}
  };
  buttons.forEach((b) => b.addEventListener('click', () => set(b.dataset.billing)));
  try { if (localStorage.getItem('stacko-billing') === 'yearly') set('yearly'); } catch (e) {}

  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('solid', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
