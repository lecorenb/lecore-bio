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

// Meta Pixel: track package selection
document.querySelectorAll('input[name="hb"]').forEach(r => {
  r.addEventListener('change', () => {
    const label = document.querySelector('label[for="' + r.id + '"] b');
    if (typeof fbq === 'function') fbq('trackCustom', 'SelectPackage', { package: label ? label.textContent : r.id });
  });
});

// Sticky booking bar: show after the hero scrolls away
const hero = document.querySelector('.hero2');
if (hero && document.body.classList.contains('lp') && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => {
    document.body.classList.toggle('show-bar', !e.isIntersecting);
  }, { threshold: 0.15 }).observe(hero);
}

// Videos: autoplay the first one silently in view, update dots on swipe
document.querySelectorAll('video.autoplay').forEach(v => {
  if (!('IntersectionObserver' in window)) return;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { v.play().catch(() => {}); } else { v.pause(); }
  }, { threshold: 0.6 }).observe(v);
  v.addEventListener('click', () => { v.muted = !v.muted; v.controls = true; });
});
const track = document.getElementById('vids');
const dots = document.querySelectorAll('.dots span');
if (track && dots.length) {
  track.addEventListener('scroll', () => {
    const items = track.querySelectorAll('.vid');
    let idx = 0, best = Infinity;
    const mid = track.scrollLeft + track.clientWidth / 2;
    items.forEach((it, i) => {
      const c = it.offsetLeft + it.offsetWidth / 2;
      if (Math.abs(c - mid) < best) { best = Math.abs(c - mid); idx = i; }
    });
    dots.forEach((d, i) => d.classList.toggle('on', i === idx));
    items.forEach((it, i) => { if (i !== idx) it.querySelector('video')?.pause(); });
  }, { passive: true });
}

// Offer deadline: show days left
document.querySelectorAll('[data-deadline]').forEach(el => {
  const end = new Date(el.dataset.deadline + 'T23:59:59-08:00');
  const days = Math.ceil((end - new Date()) / 86400000);
  if (days > 1) el.textContent = 'Ends Nov 30 · ' + days + ' days left';
  else if (days === 1) el.textContent = 'Ends tonight';
});
