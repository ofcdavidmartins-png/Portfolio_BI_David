/* ============================================================
   script.js — Comportamentos do portfólio
   Responsabilidades:
     1. Menu responsivo (toggle mobile)
     2. Navbar com efeito de scroll
     3. Marcação do link ativo
     4. Reveal on scroll (IntersectionObserver)
     5. Toast de feedback
     6. Ano dinâmico no footer
     7. Smooth scroll para âncoras internas
     8. Theme toggle (dark/light) com localStorage + prefers-color-scheme
     9. Language toggle PT/EN (via js/i18n.js)
    10. Renderização dinâmica de projetos a partir de window.PROJECTS
    11. Filtros de projetos (categoria e tipo)
    12. Formulário de contato com validação e abertura de cliente de e-mail
   ============================================================ */

(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- 8. Theme toggle ---------- */
  const THEME_KEY = 'portfolio:theme';
  const getInitialTheme = () => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };
  const applyTheme = (t) => {
    if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else document.documentElement.removeAttribute('data-theme');
    const icon = $('#theme-icon');
    if (icon) icon.textContent = t === 'light' ? '\u263E' : '\u263C'; // lua / sol
    const btn = $('#theme-toggle');
    if (btn) btn.setAttribute('aria-label', t === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro');
  };
  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  document.addEventListener('click', (e) => {
    if (e.target.closest('#theme-toggle')) {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, currentTheme);
      applyTheme(currentTheme);
    }
  });

  /* ---------- 9. Language toggle ---------- */
  const applyLangUI = () => {
    const btn = $('#lang-toggle');
    if (btn && typeof window.getLang === 'function') {
      btn.textContent = window.getLang() === 'en' ? 'PT' : 'EN';
      btn.setAttribute('aria-label', window.getLang() === 'en' ? 'Mudar para Português' : 'Switch to English');
    }
  };
  if (typeof window.applyI18n === 'function') window.applyI18n();
  applyLangUI();

  document.addEventListener('click', (e) => {
    if (e.target.closest('#lang-toggle') && typeof window.setLang === 'function') {
      window.setLang(window.getLang() === 'en' ? 'pt' : 'en');
      applyLangUI();
      // Re-renderiza projetos para atualizar filtros traduzidos
      renderProjects();
    }
  });

  /* ---------- 1. Menu responsivo ---------- */
  const toggle = $('.navbar__toggle');
  const menu = $('.navbar__menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('.navbar__link', menu).forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- 2. Navbar scroll state ---------- */
  const navbar = $('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 3. Link ativo por página ---------- */
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  $$('.navbar__link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if (href === currentPath) link.classList.add('is-active');
  });

  /* ---------- 4. Reveal on scroll ---------- */
  const setupReveal = () => {
    const revealEls = $$('.reveal:not(.is-visible)');
    if (!revealEls.length) return;
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  };

  /* ---------- 5. Toast ---------- */
  const toast = $('.toast');
  let toastTimer;
  window.showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
  };
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-feedback]');
    if (el) window.showToast(el.dataset.feedback);
  });

  /* ---------- 6. Ano dinâmico ---------- */
  const yearEl = $('#currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Back to top ---------- */
  const btt = $('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- 7. Smooth scroll em âncoras ---------- */
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

  /* ---------- 10 & 11. Renderização + filtros de projetos ---------- */
  function cardHTML(p) {
    const isEn = typeof window.getLang === 'function' && window.getLang() === 'en';
    const badge = p.novo
      ? `<span class="card__badge">${isEn ? 'New' : 'Novo'}</span>`
      : p.featured ? `<span class="card__badge">Top</span>` : '';
    const kindLabel = isEn
      ? {profissional: 'Professional', pessoal: 'Personal'}[p.kind] || p.kind
      : {profissional: 'Profissional', pessoal: 'Pessoal'}[p.kind] || p.kind;
    const tags = (p.tags || []).map(tag => `<span class="card__tag">${tag}</span>`).join('');
    const categoryLabel = {powerbi:'Power BI', python:'Python', outros:'Outros'}[p.category] || p.category;
    const linkLabel = isEn ? 'View project' : 'Ver projeto';
    const feedbackMsg = p.href === '#'
      ? (isEn ? 'Coming soon…' : 'Em breve…')
      : (isEn ? 'Opening project…' : 'Abrindo projeto…');
    return `
      <article class="card" data-category="${p.category}" data-kind="${p.kind}">
        <div class="card__media">
          <img src="${p.img}" alt="${p.title}" loading="lazy" width="800" height="500" />
          ${badge}
        </div>
        <div class="card__body">
          <span class="card__category">${categoryLabel} · ${kindLabel}</span>
          <h3 class="card__title">${p.title}</h3>
          <p class="card__desc">${p.desc}</p>
          <div class="card__tags">${tags}</div>
          <div class="card__footer">
            <a href="${p.href}" class="card__link" data-feedback="${feedbackMsg}">
              ${linkLabel} →
            </a>
            <span class="card__tag">${p.year}</span>
          </div>
        </div>
      </article>`;
  }

  function renderInto(selector, list) {
    const mount = $(selector);
    if (!mount) return;
    mount.innerHTML = list.map(cardHTML).join('');
    mount.querySelectorAll('.card').forEach(c => c.classList.add('reveal'));
    setupReveal();
  }

  function renderProjects() {
    const list = window.PROJECTS || [];
    // Home
    const latest = [...list].filter(p => p.novo).slice(0, 3);
    const best = [...list].filter(p => p.featured).slice(0, 3);
    renderInto('[data-render="latest"]', latest);
    renderInto('[data-render="best"]', best);

    // Subpáginas
    $$('[data-render-category]').forEach(mount => {
      const cat = mount.dataset.renderCategory;
      const kind = mount.dataset.renderKind; // profissional | pessoal | all
      let filtered = list.filter(p => p.category === cat);
      if (kind && kind !== 'all') filtered = filtered.filter(p => p.kind === kind);
      const currentFilter = mount.dataset.filter || 'all';
      if (currentFilter !== 'all') filtered = filtered.filter(p => p.kind === currentFilter);
      mount.innerHTML = filtered.map(cardHTML).join('') ||
        `<p style="color:var(--text-muted)">Nenhum projeto nesta categoria.</p>`;
      mount.querySelectorAll('.card').forEach(c => c.classList.add('reveal'));
    });
    setupReveal();
  }

  // Filtros (botões com [data-filter])
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    const group = btn.closest('.filters');
    const target = group?.dataset.target; // CSS selector do mount
    if (!target) return;
    group.querySelectorAll('.filter').forEach(b => b.classList.toggle('is-active', b === btn));
    const mount = $(target);
    if (mount) {
      mount.dataset.filter = btn.dataset.filter;
      renderProjects();
    }
  });

  renderProjects();
  setupReveal();

  /* ---------- 12. Formulário de contato ---------- */
  const form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();

      const errName = $('[data-error="name"]', form);
      const errEmail = $('[data-error="email"]', form);
      const errMsg = $('[data-error="message"]', form);
      errName.textContent = errEmail.textContent = errMsg.textContent = '';

      const tr = (key) => (typeof window.t === 'function' ? window.t(key) : key);
      let ok = true;
      if (!name) { errName.textContent = tr('contact.err.name'); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errEmail.textContent = tr('contact.err.email'); ok = false; }
      if (message.length < 10) { errMsg.textContent = tr('contact.err.message'); ok = false; }
      if (!ok) return;

      const body = `${message}\n\n---\n${name} <${email}>`;
      const mailto = `mailto:ofcdavidmartins@gmail.com?subject=${encodeURIComponent(subject || 'Contato pelo portfólio')}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      window.showToast(tr('contact.sent'));
      form.reset();
    });
  }
})();
