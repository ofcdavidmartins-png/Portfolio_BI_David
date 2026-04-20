/* ============================================================
   i18n.js — Dicionário e helper de internacionalização PT/EN
   Uso no HTML: <span data-i18n="chave">texto padrão</span>
   - Chave ausente mantém o texto original.
   - Idioma persiste em localStorage (portfolio:lang).
   ============================================================ */

window.I18N = {
  pt: {
    'nav.home':       'Início',
    'nav.powerbi':    'Power BI',
    'nav.python':     'Python',
    'nav.outros':     'Outros',
    'nav.contact':    'Contato',

    'hero.kicker':    'Dados e processos',
    'hero.lead':      'Trabalho com otimização e automação de processos na FUNCEF. Estou migrando para a área de dados. Aqui registro o que vou estudando e os projetos que termino.',
    'hero.cta.see':   'Ver projetos',
    'hero.cta.reach': 'Entrar em contato',

    'photo.badge':    'Brasília',
    'id.work':        'Trabalho',
    'id.work.val':    'FUNCEF',
    'id.work.sub':    'Otimização e automação',
    'id.study':       'Formação',
    'id.study.val':   'Administração',
    'id.study.sub':   '5º período',
    'id.city':        'Cidade',
    'id.city.val':    'Brasília',
    'id.city.sub':    'DF',
    'id.focus':       'Foco',
    'id.focus.val':   'Dados, processos e automação',

    'cats.title':     'Explore por categoria',
    'cats.desc':      'Selecione uma stack para ver os projetos profissionais e pessoais.',

    'latest.title':   'Últimos projetos',
    'latest.desc':    'Entregas mais recentes em produção e estudos pessoais.',
    'best.title':     'Melhores projetos',
    'best.desc':      'Casos com maior impacto técnico e de negócio.',
    'seeAll':         'Ver todos',

    'about.kicker':   'Como cheguei aqui',
    'about.title':    'Dos processos aos',
    'about.title.em': 'dados',
    'about.desc':     'Um resumo de onde venho e o que estou fazendo agora.',

    'stack.kicker':   'Ferramentas',
    'stack.title':    'O que estou',
    'stack.title.em': 'usando',
    'stack.desc':     'Uma foto do momento. O que já uso no trabalho e o que ainda estou estudando.',

    'contact.kicker': 'Contato',
    'contact.title':  'Vamos conversar?',
    'contact.desc':   'Disponível para oportunidades e colaborações em análise de dados e automação.',
    'contact.name':   'Nome',
    'contact.email':  'E-mail',
    'contact.subject':'Assunto',
    'contact.message':'Mensagem',
    'contact.send':   'Enviar mensagem',
    'contact.sent':   'Obrigado! Abri seu cliente de e-mail com a mensagem preenchida.',
    'contact.err.name':   'Informe seu nome.',
    'contact.err.email':  'Informe um e-mail válido.',
    'contact.err.message':'A mensagem precisa ter pelo menos 10 caracteres.',

    'filters.all':         'Todos',
    'filters.profissional':'Profissionais',
    'filters.pessoal':     'Pessoais',

    'footer.rights':  'Todos os direitos reservados.',
    'footer.made':    'Feito com HTML, CSS e JS.'
  },
  en: {
    'nav.home':       'Home',
    'nav.powerbi':    'Power BI',
    'nav.python':     'Python',
    'nav.outros':     'Others',
    'nav.contact':    'Contact',

    'hero.kicker':    'Data & processes',
    'hero.lead':      'I work on process optimization and automation at FUNCEF. I am moving into data. Here I log what I study and the projects I ship.',
    'hero.cta.see':   'See projects',
    'hero.cta.reach': 'Get in touch',

    'photo.badge':    'Brasília',
    'id.work':        'Work',
    'id.work.val':    'FUNCEF',
    'id.work.sub':    'Optimization & automation',
    'id.study':       'Studying',
    'id.study.val':   'Business Admin',
    'id.study.sub':   '5th semester',
    'id.city':        'City',
    'id.city.val':    'Brasília',
    'id.city.sub':    'BR',
    'id.focus':       'Focus',
    'id.focus.val':   'Data, processes and automation',

    'cats.title':     'Explore by stack',
    'cats.desc':      'Pick a stack to see both professional and personal projects.',

    'latest.title':   'Latest projects',
    'latest.desc':    'Most recent work in production and personal studies.',
    'best.title':     'Best projects',
    'best.desc':      'Cases with the highest technical and business impact.',
    'seeAll':         'See all',

    'about.kicker':   'How I got here',
    'about.title':    'From processes to',
    'about.title.em': 'data',
    'about.desc':     'A quick summary of where I come from and what I do today.',

    'stack.kicker':   'Tools',
    'stack.title':    'What I am',
    'stack.title.em': 'using',
    'stack.desc':     'A snapshot of the moment. What I use at work and what I am still studying.',

    'contact.kicker': 'Contact',
    'contact.title':  'Let\u2019s talk?',
    'contact.desc':   'Open to opportunities and collaborations in data analysis and automation.',
    'contact.name':   'Name',
    'contact.email':  'Email',
    'contact.subject':'Subject',
    'contact.message':'Message',
    'contact.send':   'Send message',
    'contact.sent':   'Thanks! Your email client was opened with the message pre-filled.',
    'contact.err.name':   'Please enter your name.',
    'contact.err.email':  'Please enter a valid email.',
    'contact.err.message':'Your message needs at least 10 characters.',

    'filters.all':         'All',
    'filters.profissional':'Professional',
    'filters.pessoal':     'Personal',

    'footer.rights':  'All rights reserved.',
    'footer.made':    'Built with HTML, CSS and JS.'
  }
};

(function () {
  const STORAGE_KEY = 'portfolio:lang';
  const dict = () => window.I18N[localStorage.getItem(STORAGE_KEY) || 'pt'];

  window.t = (key) => {
    const d = dict();
    return (d && d[key]) || key;
  };

  window.applyI18n = function applyI18n() {
    const d = dict();
    document.documentElement.lang = (localStorage.getItem(STORAGE_KEY) || 'pt') === 'en' ? 'en' : 'pt-BR';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (d[key]) el.textContent = d[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (d[key]) el.placeholder = d[key];
    });
  };

  window.setLang = function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    window.applyI18n();
  };

  window.getLang = () => localStorage.getItem(STORAGE_KEY) || 'pt';
})();
