(() => {
  const root = document.documentElement;
  const partial = async (slot, url) => {
    const host = document.querySelector(slot);
    if (!host) return;
    try { const response = await fetch(url); if (!response.ok) throw new Error(); host.innerHTML = await response.text(); }
    catch { host.innerHTML = ""; }
  };
  const start = async () => {
    await Promise.all([partial('[data-partial="header"]', '/partials/header.html'), partial('[data-partial="footer"]', '/partials/footer.html')]);
    document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
    const toggle = document.querySelector('[data-nav-toggle]'); const nav = document.querySelector('[data-site-nav]');
    if (toggle && nav) toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', String(open)); root.classList.toggle('nav-open', open); });
    const current = location.pathname.replace(/index\.html$/, '');
    document.querySelectorAll('.site-nav a').forEach((link) => { if (link.getAttribute('href') === current || (current.startsWith('/tools/') && link.getAttribute('href') === '/tools/')) link.classList.add('is-current'); });
  };
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})();
