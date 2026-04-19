# Portfólio · David Martins

Portfólio pessoal de **David Martins** — analista focado em **análise de dados, automação de processos e visualização**. O projeto é uma aplicação **estática multi-página** construída com HTML, CSS e JavaScript puros, pronta para deploy em qualquer hospedagem estática (GitHub Pages, Netlify, Vercel, etc.).

---

## Sumário

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como rodar localmente](#como-rodar-localmente)
- [Deploy](#deploy)
- [Padrões adotados](#padrões-adotados)

---

## Sobre

O portfólio organiza os projetos em **três categorias** — Power BI, Python e Outros — e em cada categoria separa os trabalhos entre **Profissionais** (realizados no ambiente corporativo) e **Pessoais** (estudos e experimentos).

A home (`index.html`) apresenta:

- Hero com apresentação pessoal.
- Acesso rápido às categorias.
- Carrossel de **últimos projetos** e **melhores projetos**.
- Bloco de contato.

As subpáginas mantêm o mesmo header, footer e linguagem visual, variando apenas o conteúdo listado.

---

## Tecnologias

- **HTML5** semântico
- **CSS3** modular (reset, layout, componentes) com variáveis CSS e tipografia fluida via `clamp()`
- **JavaScript (ES2022)** vanilla, sem frameworks
- **Google Fonts** — Syne, DM Sans, Instrument Serif
- **SVG** para imagens de projetos (leves e escaláveis)

---

## Estrutura de pastas

```
Portfolio-David/
├── index.html              # Home
├── powerbi.html            # Projetos em Power BI
├── python.html             # Projetos em Python
├── outros.html             # Projetos diversos
├── README.md               # Este arquivo
├── DOC.md                  # Documentação técnica detalhada
├── css/
│   ├── reset.css           # Normalização entre navegadores
│   ├── style.css           # Layout, tipografia, tokens
│   └── components.css      # Navbar, cards, botões, footer, toast
├── js/
│   └── script.js           # Menu mobile, reveal on scroll, feedback visual
└── assets/
    ├── favicon.ico
    └── images/             # Imagens SVG dos projetos
```

---

## Como rodar localmente

O projeto é 100% estático — basta abrir o `index.html` no navegador. Para uma experiência mais próxima de produção (com caminhos absolutos, cache, etc.), use um servidor local:

### Opção 1 — Python

```bash
python3 -m http.server 8080
```

Abra em: `http://localhost:8080`

### Opção 2 — Node.js

```bash
npx serve .
```

### Opção 3 — VS Code

Use a extensão **Live Server** e clique em *Go Live*.

---

## Deploy

Por ser um site estático, o deploy é direto em qualquer um dos seguintes serviços:

- **GitHub Pages** — ative Pages no branch `main` / pasta `/`.
- **Netlify** — arraste a pasta no Netlify Drop.
- **Vercel** — `vercel --prod`.
- **Cloudflare Pages** — conecte o repositório.

Não há build step — os arquivos já são o artefato final.

---

## Padrões adotados

- **Mobile-first** com breakpoint principal em 860px.
- **BEM** simplificado para nomenclatura de classes (`.card__body`, `.navbar__link`).
- **Variáveis CSS** para cores, espaçamentos, tipografia e transições — garantindo consistência.
- **Acessibilidade** — landmarks (`header`, `main`, `footer`), `aria-*`, foco visível, `prefers-reduced-motion`.
- **Performance** — fontes com `preconnect`, imagens SVG, `loading="lazy"` em imagens, JS com `defer`.
- **SEO básico** — meta description, Open Graph, `theme-color`, `lang="pt-BR"`.

---

## Licença

Uso pessoal. Livre para estudo.
