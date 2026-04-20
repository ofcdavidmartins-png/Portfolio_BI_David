# Portfólio · David Martins

Portfólio pessoal de **David Martins** — analista focado em **análise de dados, automação de processos e visualização**. Aplicação **estática multi-página** construída com HTML, CSS e JavaScript puros, pronta para deploy em qualquer hospedagem estática.

---

## Sumário

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como rodar localmente](#como-rodar-localmente)
- [Deploy](#deploy)
- [Funcionalidades](#funcionalidades)

---

## Sobre

Portfólio organizado em **três categorias** — Power BI, Python e Outros — com separação entre projetos **Profissionais** e **Pessoais**. A home apresenta hero com foto, identidade, timeline de carreira, categorias, projetos em destaque, stack e formulário de contato.

---

## Tecnologias

- **HTML5** semântico com landmarks e ARIA
- **CSS3** modular com variáveis, `clamp()` fluido, tema dark/light
- **JavaScript ES2022** vanilla (sem frameworks)
- **Google Fonts** — Syne, DM Sans, Instrument Serif
- **SVG** para imagens de projetos

---

## Estrutura de pastas

```
Portfolio-David/
├── index.html              # Home (hero, sobre, stack, categorias, projetos, contato)
├── powerbi.html            # Projetos Power BI com filtros
├── python.html             # Projetos Python com filtros
├── outros.html             # Projetos diversos com filtros
├── projeto.html            # Template de página de detalhe de projeto
├── sitemap.xml
├── robots.txt
├── README.md
├── DOC.md                  # Documentação técnica completa
├── css/
│   ├── reset.css           # Normalização cross-browser
│   ├── style.css           # Tokens, layout, tipografia, tema dark/light
│   └── components.css      # Navbar, cards, botões, filtros, formulário, footer
├── js/
│   ├── i18n.js             # Dicionário PT/EN e helper de tradução
│   ├── projects.js         # Base de dados dos projetos (array window.PROJECTS)
│   └── script.js           # Todos os comportamentos interativos
└── assets/
    ├── favicon.ico
    └── images/             # Foto de perfil (david.jpg) + SVGs de projetos
```

---

## Como rodar localmente

### Python
```bash
python3 -m http.server 8080
# Acesse http://localhost:8080
```

### Node.js
```bash
npx serve .
```

### VS Code
Extensão **Live Server** → *Go Live*.

---

## Deploy

Site 100% estático, sem build step:

- **GitHub Pages** — ative Pages no branch `main`.
- **Netlify** — arraste a pasta no Netlify Drop.
- **Vercel** — `vercel --prod`.
- **Cloudflare Pages** — conecte o repositório.

---

## Funcionalidades

| Feature | Descrição |
|---|---|
| Tema dark/light | Toggle com persistência em `localStorage`, respeita `prefers-color-scheme` |
| Idioma PT/EN | Toggle com `localStorage`, dicionário em `js/i18n.js` |
| Filtros de projetos | Botões Todos / Profissionais / Pessoais nas subpáginas |
| Renderização dinâmica | Projetos gerados a partir de `js/projects.js` |
| Formulário de contato | Validação client-side + abertura de cliente de e-mail |
| Reveal on scroll | IntersectionObserver com fallback |
| Back to top | Botão flutuante visível após 400px de scroll |
| Skip link | Link de acessibilidade para pular para o conteúdo |
| Ticker animado | Barra de identidade fixa no topo |
| SEO | Meta tags, Open Graph, `lang`, canonical, sitemap, robots.txt |

---

## Adicionar um novo projeto

1. Adicione o SVG em `assets/images/`.
2. Inclua o objeto no array `window.PROJECTS` em `js/projects.js`.
3. Se quiser página de detalhe, duplique `projeto.html` e atualize o conteúdo.

## Adicionar uma nova categoria

1. Crie `nova-categoria.html` baseado em `powerbi.html`.
2. Adicione `nav.nova` no dicionário `js/i18n.js`.
3. Adicione `<a class="navbar__link">` no menu das 4 páginas.
4. Adicione `.cat-card` na seção Categorias de `index.html`.
5. Adicione o `<li>` no footer das 4 páginas.
