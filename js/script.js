/* ============================================================
   script.js — Comportamentos do portfólio
   - Menu responsivo (toggle mobile)
   - Navbar com efeito de scroll
   - Revelação de elementos no viewport
   - Feedback visual (toast) em ações
   - Marcação de link ativo por página
   ============================================================ */

(() => {
  'use strict';

  /* ---------- Utilidades ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- Menu responsivo ---------- */
  const toggle = $('.navbar__toggle');
  const menu = $('.navbar__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Fecha o menu ao clicar em um link (mobile)
    $$('.navbar__link', menu).forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Navbar scroll state ---------- */
  const navbar = $('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('is-scrolled', window.scrollY > 32);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Link ativo por página ---------- */
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  $$('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) link.classList.add('is-active');
  });

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Toast (feedback visual em clique) ---------- */
  const toast = $('.toast');
  let toastTimer;

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  };

  // Feedback em botões/cards com [data-feedback]
  $$('[data-feedback]').forEach(el => {
    el.addEventListener('click', (e) => {
      const msg = el.dataset.feedback || 'Ação registrada';
      showToast(msg);
    });
  });

  /* ---------- Ano dinâmico no footer ---------- */
  const yearEl = $('#currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Smooth scroll para âncoras internas ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();
