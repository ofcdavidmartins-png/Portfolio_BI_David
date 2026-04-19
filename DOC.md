# DOC · Documentação Técnica do Portfólio

Este documento descreve **tudo que foi feito** na reestruturação do projeto: arquitetura, arquivos, comentários do script, interações, ligações entre páginas e decisões de design.

---

## 1. Visão geral

O projeto saiu de um único `index.html` monolítico para uma **estrutura modular multi-página**, organizada por responsabilidades e pronta para deploy.

```
Portfolio-David/
├── index.html        # Home — hero, categorias, últimos, melhores, contato
├── powerbi.html      # Projetos em Power BI (profissionais + pessoais)
├── python.html       # Projetos em Python (profissionais + pessoais)
├── outros.html       # Projetos diversos (profissionais + pessoais)
├── css/
│   ├── reset.css     # Normalização entre browsers
│   ├── style.css     # Layout geral, tipografia, tokens
│   └── components.css# Navbar, cards, botões, footer, toast, reveal
├── js/
│   └── script.js     # Comportamentos interativos
├── assets/
│   ├── favicon.ico
│   └── images/       # Imagens SVG dos projetos
├── README.md
└── DOC.md
```

---

## 2. Arquivos HTML

Todas as páginas compartilham a mesma **shell**:

1. `<head>` com:
   - `meta charset`, `meta viewport`.
   - Título e description únicos por página.
   - Favicon em `assets/favicon.ico`.
   - Preconnect + import das fontes do Google.
   - Três links de CSS na ordem `reset → style → components`.

2. `<header class="navbar">` idêntico em todas as páginas.
3. `<main>` com o conteúdo específico.
4. `<footer class="footer">` idêntico em todas as páginas.
5. `<div class="toast">` para mensagens de feedback.
6. `<script src="js/script.js" defer>` ao final.

### 2.1 `index.html` — Home
- **Hero** com título fluido (`clamp`) e dois CTAs (`primary` e `ghost`).
- **Categorias** — três cards (`.cat-card`) que linkam para as subpáginas.
- **Últimos projetos** — grid de 3 cards com badge "Novo".
- **Melhores projetos** — grid de 3 cards com badge "Top".
- **Contato** — bloco com CTA de e-mail.

### 2.2 `powerbi.html`, `python.html`, `outros.html`
Cada subpágina possui:
- `page-header` com categoria, título e descrição.
- Seção **Projetos profissionais** (fundo padrão).
- Seção **Projetos pessoais** (fundo alternado `section--alt`).
- Grid de cards com imagem, título, descrição, tags e botão "Ver projeto".

### 2.3 Ligações entre páginas
| De | Para | Elemento |
|---|---|---|
| Todas | `index.html` | `.navbar__brand`, `.navbar__link "Início"`, `.footer` |
| `index.html` | `powerbi.html` | Card de categoria, cards de destaque, links "Ver todos" |
| `index.html` | `python.html` | Card de categoria, cards de destaque |
| `index.html` | `outros.html` | Card de categoria, cards de destaque |
| Subpáginas | `index.html#contato` | `.navbar__link "Contato"` |

---

## 3. CSS

### 3.1 `reset.css`
Normalização: `box-sizing: border-box`, remoção de margens/paddings, imagens `display: block`, foco visível (`:focus-visible`).

### 3.2 `style.css`
- **Tokens CSS** (`:root`): cores, bordas, textos, tipografia fluida, espaçamentos, transições.
- **Tipografia fluida** com `clamp()` para `--fs-hero`, `--fs-section`, `--fs-body`.
- **Background** com dois radial-gradients sutis.
- **Container** com `max-width: 1320px` e padding lateral responsivo.
- **Hero, Section, Page-header, Grid** com regras de layout.
- **Media queries** em 768px e `prefers-reduced-motion`.

### 3.3 `components.css`
- **Navbar** fixa com blur, classe `.is-scrolled` aplicada via JS após 32px de scroll, menu mobile (`.navbar__toggle` + `.navbar__menu.is-open`).
- **Botões** (`.btn`, `.btn--primary`, `.btn--ghost`, `.btn--sm`) com seta animada `.btn__arrow`.
- **Cards de projeto** com hover elevado, badge, tags, footer com link.
- **Category cards** para a home.
- **Footer** em grid com 3 colunas + bottom-bar com copyright.
- **Toast** fixo bottom-center para feedback.
- **`.reveal`** — classe de animação de entrada ativada por IntersectionObserver.

### 3.4 Nomenclatura
Adotado **BEM simplificado**: `bloco`, `bloco__elemento`, `bloco--modificador`.

---

## 4. JavaScript (`js/script.js`)

O script é autoexecutável (IIFE) e está dividido em blocos comentados:

```js
(() => {
  'use strict';

  // Utilitários de seleção
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // 1. Menu responsivo
  // Alterna a classe .is-open no menu e no botão hamburguer.
  // Trava o scroll do body enquanto o menu mobile está aberto.
  // Fecha automaticamente ao clicar em qualquer link interno.

  // 2. Navbar scroll state
  // Adiciona a classe .is-scrolled quando window.scrollY > 32,
  // engatilhando maior contraste e sombra na navbar.

  // 3. Link ativo por página
  // Lê location.pathname e marca o <a> correspondente com .is-active.

  // 4. Reveal on scroll
  // IntersectionObserver observa elementos .reveal e, ao entrarem no viewport,
  // adiciona .is-visible — disparando a animação definida em components.css.
  // Inclui fallback: sem IO, aplica .is-visible imediatamente.

  // 5. Toast de feedback
  // Qualquer elemento com [data-feedback="mensagem"] dispara showToast()
  // no clique. O toast aparece por 2.4s e recolhe automaticamente.

  // 6. Ano dinâmico
  // Preenche #currentYear no footer com o ano corrente.

  // 7. Smooth scroll de âncoras
  // Captura cliques em <a href="#id"> e desliza até o alvo via scrollIntoView.
})();
```

### 4.1 Interações observáveis pelo usuário
| Gatilho | Resultado |
|---|---|
| Scroll da página | Navbar ganha fundo mais sólido e sombra. |
| Scroll até uma seção `.reveal` | Conteúdo aparece com fade + slide up. |
| Clique no hamburguer (≤860px) | Menu mobile desce e trava o scroll. |
| Clique em link do menu mobile | Menu fecha e navega para a página. |
| Clique em `[data-feedback]` | Toast aparece 2.4s com a mensagem. |
| Clique em link `#ancora` | Scroll suave até o destino. |
| Tab / foco | Outline visível (acessibilidade). |

### 4.2 Gatilhos no HTML
- `data-feedback="..."` em cards e CTAs — reutilizável sem tocar no JS.
- `id="currentYear"` no footer — preenchido automaticamente.
- `aria-expanded` no botão hamburguer — atualizado via JS para acessibilidade.

---

## 5. Assets

### 5.1 Favicon
`assets/favicon.ico` — já existente no repositório, movido da raiz para dentro de `assets/`.

### 5.2 Imagens dos projetos
Todas as imagens são **SVGs gerados proceduralmente**, com:
- Gradiente diagonal em paleta consistente com o tema (terrosos/amber).
- Padrão de hachuras diagonais sutis.
- Linha de série temporal (polyline).
- Barras verticais simulando um gráfico de colunas.
- Títulos estilizados por projeto.

Benefícios: leves (<2 KB cada), escaláveis, sem dependências externas.

---

## 6. SEO & Acessibilidade

- `lang="pt-BR"` na raiz.
- Meta `description`, `keywords`, `author`, `theme-color` em cada página.
- Open Graph em `index.html`.
- Estrutura com landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`).
- Títulos hierárquicos (`h1` → `h2` → `h3`).
- `aria-label` no brand, toggle e regiões de navegação.
- `role="status"` + `aria-live="polite"` no toast.
- Foco visível via `:focus-visible`.
- Suporte a `prefers-reduced-motion`.

---

## 7. Performance

- Fontes com `preconnect` e `display=swap`.
- `loading="lazy"` em todas as imagens do grid.
- `script` com `defer` — não bloqueia o parse do HTML.
- CSS crítico dividido em três arquivos pequenos (reset / layout / componentes).
- SVGs no lugar de PNG/JPG.
- Zero dependências de JS.

---

## 8. Escalabilidade

Para adicionar um novo projeto:

1. Crie o SVG em `assets/images/`.
2. Copie um `<article class="card">` existente na subpágina adequada.
3. Ajuste `src`, `alt`, `card__category`, `card__title`, `card__desc`, `card__tags` e `data-feedback`.

Para adicionar uma **nova categoria**:

1. Crie `nova-categoria.html` reutilizando o shell das existentes.
2. Adicione um `<a class="navbar__link">` no menu das 4 páginas.
3. Adicione uma `.cat-card` nova na seção **Categorias** de `index.html`.
4. Adicione um `<li>` no `footer__list` das 4 páginas.

---

## 9. Revisão crítica — pontos de atenção e melhorias

### Pontos falhos / de atenção
- **Navegação em subpáginas** repete marcação (navbar/footer). Em produção, um template engine (Eleventy, Astro, PHP includes) evitaria duplicação.
- **Os botões "Ver projeto"** nos cards ainda apontam para `#` — precisam de URLs reais quando as páginas de detalhe forem criadas.
- **Imagens de projeto** são ilustrativas. Substituir por screenshots reais aumenta credibilidade.
- **Formulário de contato** não foi implementado — hoje o contato é só por e-mail direto.
- **Dark/light theme** não tem toggle; o tema é exclusivamente escuro.

### Melhorias sugeridas (roadmap)
1. **Páginas de detalhe** (`powerbi/projeto-slug.html`) com case study completo.
2. **JSON de projetos** + renderização dinâmica via `fetch` — elimina repetição de HTML.
3. **Formulário de contato** com Formspree / Netlify Forms.
4. **Modo claro** alternável + preferência salva em `localStorage`.
5. **Sitemap.xml** e **robots.txt** para SEO.
6. **Testes de Lighthouse** no CI e `.github/workflows/pages.yml` para auto-deploy.
7. **i18n** (PT/EN) — já que a stack é usada internacionalmente.
8. **Filtros** nas subpáginas (por tag/tecnologia).

### Pontos fortes
- Estrutura limpa e escalável.
- CSS modular, tokenizado, com BEM.
- JS leve e autoexplicativo, sem dependências.
- Acessibilidade e performance pensadas desde o início.
- Design consistente entre todas as páginas.
- Pronto para deploy estático imediato.

---

## 10. Changelog da reestruturação

| Ação | Detalhe |
|---|---|
| Criado | `css/reset.css`, `css/style.css`, `css/components.css` |
| Criado | `js/script.js` |
| Reescrito | `index.html` (home com hero, categorias, últimos, melhores, contato) |
| Criado | `powerbi.html`, `python.html`, `outros.html` |
| Movido | `favicon.ico` → `assets/favicon.ico` |
| Criado | `assets/images/*.svg` (placeholders procedurais) |
| Criado | `README.md`, `DOC.md` |
