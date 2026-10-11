(function () {
  'use strict';
  document.documentElement.classList.add('js');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menu = document.getElementById('mobile-menu');
  const toggle = document.querySelector('.menu-toggle');
  function closeMenu() { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); document.body.classList.remove('menu-open'); }
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; menu.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); document.body.classList.toggle('menu-open', open); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 701px)').addEventListener('change', e => { if(e.matches) closeMenu(); });
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { entry.target.classList.toggle('visible', entry.isIntersecting); }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  const roles = ['Graphic Designer', 'Web Designer', 'UI / UX Designer', 'Document Analyst'];
  let role = 0;
  const roleText = document.getElementById('role-text');
  if(!reduced) setInterval(() => { if(document.hidden) return; roleText.classList.add('changing'); setTimeout(() => { role = (role + 1) % roles.length; roleText.textContent = roles[role]; roleText.classList.remove('changing'); }, 300); }, 3300);
  const topButton = document.querySelector('.back-to-top');
  topButton.addEventListener('click', () => window.scrollTo({top:0, behavior:reduced ? 'instant' : 'smooth'}));
  function onScroll() { topButton.hidden = window.scrollY < 500; let current = ''; document.querySelectorAll('section[id]').forEach(section => { if(section.getBoundingClientRect().top <= 160) current = section.id; }); document.querySelectorAll('.desktop-nav a').forEach(a => a.classList.toggle('active', a.hash === '#' + current)); }
  addEventListener('scroll', onScroll, { passive:true }); onScroll();
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.filter').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); }); document.querySelectorAll('.project').forEach(project => { project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter; }); }));
  const dialog = document.getElementById('project-dialog');
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => { const project = button.closest('.project'); const img = project.querySelector('img'); document.getElementById('dialog-image').src = img.src; document.getElementById('dialog-image').alt = img.alt; document.getElementById('dialog-title').textContent = project.querySelector('h3').textContent; document.getElementById('dialog-description').textContent = project.querySelector('.project-info p').textContent; dialog.showModal(); }));
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  document.getElementById('project-contact').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { const box = dialog.getBoundingClientRect(); if(e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.close(); });
  const slides = [...document.querySelectorAll('.quote-slide')]; let quote = 0;
  function showQuote(n) { quote = (n + slides.length) % slides.length; slides.forEach((slide, i) => { slide.hidden = i !== quote; slide.setAttribute('aria-hidden', String(i !== quote)); }); document.querySelector('.quote-count').textContent = String(quote + 1).padStart(2,'0') + ' / 03'; }
  document.getElementById('next-quote').addEventListener('click', () => showQuote(quote + 1));
  document.getElementById('previous-quote').addEventListener('click', () => showQuote(quote - 1));
  if(!reduced) setInterval(() => { const carousel = document.querySelector('.quote-carousel'); if(!document.hidden && !carousel.matches(':hover') && !carousel.contains(document.activeElement)) showQuote(quote + 1); }, 7000);
  const form = document.getElementById('contact-form'); const status = document.getElementById('form-status'); const copy = document.getElementById('copy-message'); let prepared = '';
  form.addEventListener('submit', e => { e.preventDefault(); copy.hidden = true; try { const data = Object.fromEntries(new FormData(form)); prepared = PortfolioContact.formatMessage(data); copy.hidden = false; const url = PortfolioContact.whatsappUrl(window.PORTFOLIO_CONFIG?.whatsappNumber, data); const popup = window.open(url, '_blank', 'noopener,noreferrer'); status.textContent = 'Your message is ready in WhatsApp. Review it there and press Send.'; } catch(error) { status.textContent = error.message; } });
  form.addEventListener('input', () => { prepared = ''; copy.hidden = true; status.textContent = ''; });
  copy.addEventListener('click', async () => { if(!prepared) return; try { await navigator.clipboard.writeText(prepared); status.textContent = 'Message copied. You can paste it into WhatsApp or an email.'; } catch { status.textContent = 'Copy is unavailable in this browser. Please email julferkhan93@gmail.com.'; } });
})();