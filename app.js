// Menu
document.querySelector('.burger')?.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  const open = nav.classList.toggle('open');
  document.querySelector('.burger').setAttribute('aria-expanded', open);
});

// Bottom-sheet modals
document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => {
    const d = document.getElementById(btn.dataset.open);
    if (d) d.showModal();
  });
});
document.querySelectorAll('dialog').forEach(d => {
  d.querySelector('.dlg-x')?.addEventListener('click', () => d.close());
  d.addEventListener('click', e => { if (e.target === d) d.close(); });
});

// Review "Show More"
document.querySelectorAll('.rev .more').forEach(b => {
  b.addEventListener('click', () => {
    const r = b.closest('.rev');
    const open = r.classList.toggle('open');
    b.firstChild.textContent = open ? 'Show Less' : 'Show More';
  });
});

// Meta Pixel: track booking and purchase clicks
document.querySelectorAll('a[href*="wellnessliving.com"]').forEach(a => {
  a.addEventListener('click', () => {
    if (typeof fbq === 'function') {
      fbq('track', a.href.includes('catalog-payment') ? 'InitiateCheckout' : 'Lead', { content_name: a.dataset.track || a.textContent.trim() });
    }
  });
});
