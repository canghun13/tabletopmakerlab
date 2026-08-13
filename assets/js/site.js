(() => {
  const root = document.documentElement;
  const text = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const labelFor = (control) => {
    const label = control.closest('label') || (control.id && document.querySelector(`label[for="${control.id}"]`));
    if (!label) return control.name || 'Input';
    const copy = label.cloneNode(true);
    copy.querySelectorAll('input, select, textarea, button').forEach((element) => element.remove());
    return text(copy.textContent) || control.name || 'Input';
  };
  const valueFor = (control) => {
    if (control.matches('select')) return text(control.options[control.selectedIndex]?.textContent || '');
    if (control.matches('[type="checkbox"]')) return control.checked ? 'Yes' : 'No';
    if (control.matches('[type="radio"]')) return control.checked ? control.value || 'Selected' : '';
    return control.value || 'Not entered';
  };
  const printSummary = (shell) => {
    const form = shell.querySelector('form');
    if (!form) return;
    let summary = shell.querySelector('.print-summary');
    if (!summary) {
      summary = document.createElement('section');
      summary.className = 'print-summary';
      summary.setAttribute('aria-label', 'Printed input summary');
      shell.insertBefore(summary, shell.firstChild);
    }
    const append = (parent, tag, content, className) => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      element.textContent = content;
      parent.append(element);
      return element;
    };
    const title = document.querySelector('h1')?.textContent || 'Tool summary';
    const lede = document.querySelector('.calc-hero .lede')?.textContent || '';
    const groups = [...form.querySelectorAll('fieldset')];
    const sections = groups.length ? groups : [form];
    summary.replaceChildren();
    append(summary, 'p', 'Tabletop Maker Lab — Print summary', 'print-kicker');
    append(summary, 'h2', title);
    if (lede) append(summary, 'p', lede, 'print-lede');
    append(summary, 'h3', 'Input conditions', 'print-input-title');
    sections.forEach((section, index) => {
      const controls = [...section.querySelectorAll('input, select, textarea')]
        .filter((control) => control.type !== 'hidden' && (!control.matches('[type="radio"]') || control.checked));
      if (!controls.length) return;
      const heading = text(section.querySelector('legend')?.textContent || (sections.length > 1 ? `Inputs ${index + 1}` : 'Input conditions'));
      const group = document.createElement('section');
      append(group, 'h3', heading || 'Input conditions');
      const list = document.createElement('dl');
      controls.forEach((control) => {
        const row = document.createElement('div');
        append(row, 'dt', labelFor(control));
        append(row, 'dd', valueFor(control));
        list.append(row);
      });
      group.append(list);
      summary.append(group);
    });
  };
  const refreshPrintSummaries = () => document.querySelectorAll('.calc-shell').forEach(printSummary);
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
    refreshPrintSummaries();
  };
  document.addEventListener('click', (event) => {
    if (event.target.closest('.print')) refreshPrintSummaries();
  }, true);
  window.addEventListener('beforeprint', refreshPrintSummaries);
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
})();
