# DOC · Documentação Técnica — Portfólio David Martins

---

## 1. Arquitetura geral

```
Portfolio-David/
├── index.html        # Home — hero, sobre, stack, categorias, projetos, contato
├── powerbi.html      # Power BI com filtros dinâmicos
├── python.html       # Python com filtros dinâmicos
├── outros.html       # Outros com filtros dinâmicos
├── projeto.html      # Template de página de detalhe (case study)
├── sitemap.xml       # SEO
├── robots.txt        # SEO
├── css/
│   ├── reset.css     # Normalização cross-browser
│   ├── style.css     # Tokens CSS, tema dark/light, tipografia, hero, about, stack, ticker
│   └── components.css# Navbar, botões, cards, filtros, formulário, footer, toast, reveal
├── js/
│   ├── i18n.js       # Dicionário PT/EN e funções window.t, window.setLang, window.applyI18n
│   ├── projects.js   # Array window.PROJECTS com todos os projetos
│   └── script.js     # Todos os comportamentos (12 módulos comentados)
└── assets/
    ├── favicon.ico
    └── images/       # david.jpg + SVGs por categoria (pbi-*, py-*, out-*, project-*)
```

---

## 2. Paleta de cores (design system)

| Nome          | Hex       | Uso no CSS               |
|---------------|-----------|--------------------------|
| Carvão        | `#1A1814` | `--bg-deep` (dark)       |
| Fuligem       | `#2C2720` | `--bg-main` (dark)       |
| Terra queimada| `#3D352C` | `--bg-surface`, `--bg-card` (dark) |
| Barro escuro  | `#524840` | `--divider`              |
| Sombra        | `#6B6259` | `--text-faint`           |
| Pedra         | `#9C9085` | `--text-muted`           |
| Cinza areia   | `#C4BAB0` | ícones, tags             |
| Linho         | `#D9D2C5` | `--text-secondary`       |
| Areia clara   | `#E8E0D0` | badges/chips             |
| Pergaminho    | `#F0EBE0` | `--bg-surface` (light)   |
| Bege quente   | `#F5F0E8` | `--text-primary`, `--bg-main` (light) |
| Creme         | `#FAF8F4` | `--bg-deep`, `--bg-card` (light) |
| Barro         | `#8C7B68` | `--accent-dim`           |
| Caramelo      | `#A8967F` | `--accent` (dark)        |
| Mogno         | `#6B5C4E` | `--accent` (light), `--accent-deep` |

---

## 3. Tema dark/light

- Variáveis CSS redefinidas sob `[data-theme="light"]` em `style.css`.
- JS lê `localStorage('portfolio:theme')` e `prefers-color-scheme` na inicialização.
- `applyTheme(t)` adiciona/remove `data-theme="light"` no `<html>`.
- Ícone do botão: ☼ (escuro) / ☾ (claro).

---

## 4. i18n PT/EN

**`js/i18n.js`**
- `window.I18N = { pt: {...}, en: {...} }` — dicionário completo.
- `window.t(key)` — retorna a tradução do idioma atual.
- `window.applyI18n()` — percorre `[data-i18n]` e `[data-i18n-placeholder]` e atualiza `textContent`/`placeholder`.
- `window.setLang(lang)` — persiste no `localStorage('portfolio:lang')` e chama `applyI18n`.
- `window.getLang()` — retorna idioma atual (`'pt'` padrão).

---

## 5. Projetos dinâmicos

**`js/projects.js`**

Cada entrada:
```js
{
  id: 'slug-unico',
  title: 'Título do projeto',
  desc: 'Descrição curta.',
  img: 'assets/images/img.svg',
  category: 'powerbi' | 'python' | 'outros',
  kind: 'profissional' | 'pessoal',
  tags: ['tag1', 'tag2'],
  year: 2026,
  novo: true,       // aparece na home "Últimos projetos"
  featured: true,   // aparece na home "Melhores projetos"
  href: 'projeto.html' | '#'
}
```

**`js/script.js` — renderProjects()**
- `[data-render="latest"]` → filtra `p.novo`, pega 3 primeiros → home.
- `[data-render="best"]` → filtra `p.featured`, pega 3 primeiros → home.
- `[data-render-category="powerbi"]` → filtra por categoria → subpágina.
- `mount.dataset.filter` → `'all'` | `'profissional'` | `'pessoal'` → filtro ativo.

---

## 6. Filtros nas subpáginas

```html
<div class="filters" data-target="#pbi-mount">
  <button class="filter is-active" data-filter="all">Todos</button>
  <button class="filter" data-filter="profissional">Profissionais</button>
  <button class="filter" data-filter="pessoal">Pessoais</button>
</div>
<div class="grid" id="pbi-mount" data-render-category="powerbi" data-filter="all"></div>
```

- Clique no `.filter` → JS atualiza `.is-active`, seta `mount.dataset.filter`, chama `renderProjects()`.
- `data-target` aponta para o CSS selector do mount com `#`.

---

## 7. Formulário de contato

- Validação client-side: nome não vazio, e-mail com regex, mensagem ≥ 10 chars.
- Mensagens de erro em `[data-error="campo"]` dentro do `<form>`.
- Submissão: monta `mailto:` com subject e body codificados → `window.location.href`.
- Toast de confirmação via `window.showToast()`.

---

## 8. Comportamentos do script.js (12 módulos)

| # | Módulo | Descrição |
|---|--------|-----------|
| 1 | Menu responsivo | Toggle mobile, fecha ao clicar em link, trava scroll do body |
| 2 | Navbar scroll | Adiciona `.is-scrolled` após 32px |
| 3 | Link ativo | Lê `location.pathname` e marca `.is-active` |
| 4 | Reveal on scroll | IntersectionObserver, fallback sem IO |
| 5 | Toast | `window.showToast(msg)`, 2.8s, `[data-feedback]` |
| 6 | Ano dinâmico | `#currentYear` → `new Date().getFullYear()` |
| 7 | Smooth scroll | `a[href^="#"]` → `scrollIntoView` |
| 8 | Theme toggle | dark/light com localStorage + prefers-color-scheme |
| 9 | Lang toggle | PT/EN com i18n.js |
| 10 | Render projetos | `cardHTML()` → grid home e subpáginas |
| 11 | Filtros | `.filter` click → `dataset.filter` → `renderProjects()` |
| 12 | Formulário | Validação + mailto |
| + | Back to top | `.back-to-top` visível após 400px scroll |

---

## 9. Acessibilidade

- Skip link (`<a class="skip-link" href="#main">`) — visível no foco.
- Landmarks: `<header>`, `<nav>`, `<main id="main">`, `<footer>`.
- `aria-label` em navbar brand, toggle, nav, filtros, back-to-top.
- `aria-expanded` no hamburguer, atualizado via JS.
- `role="status" aria-live="polite"` no toast.
- `:focus-visible` com outline visível (reset.css).
- `prefers-reduced-motion` desabilita animações e ticker.

---

## 10. SEO

- `<title>` único por página.
- `<meta name="description">` por página.
- `<meta name="theme-color">`.
- Open Graph em `index.html`.
- `<link rel="canonical">` em todas as páginas.
- `lang` no `<html>` atualizado pelo i18n.js.
- `sitemap.xml` e `robots.txt`.
- `loading="lazy"` em imagens, `width`/`height` explícitos nos cards.

---

## 11. Performance

- Fontes com `preconnect` + `display=swap`.
- `<script defer>` em todos os scripts.
- SVGs leves como imagens de projeto.
- CSS dividido em 3 arquivos coesos, sem CSS-in-JS.
- `will-change: transform` apenas no ticker.
- `{ passive: true }` nos event listeners de scroll.

---

## 12. Página de detalhe (`projeto.html`)

Template com:
- Breadcrumb navegável.
- Hero com título, descrição, tabela de metadados (stack, tipo, ano, status).
- Imagem de capa `16:7`.
- Grid 2 colunas: conteúdo (contexto, feito, aprendizados, próximos passos) + sidebar sticky (tags, links, botão voltar).
- Navegação entre projetos (anterior / próximo).

Para criar nova página de detalhe: duplicar `projeto.html` e atualizar conteúdo + `href` no objeto em `projects.js`.

---

## 13. Changelog completo

| Versão | O que mudou |
|--------|-------------|
| v1 | Estrutura multi-página criada do zero a partir do `index.html` monolítico |
| v2 | Paleta da referência aplicada; foto de perfil restaurada; identidade preservada |
| v2 | Tema dark/light com localStorage; toggle PT/EN; formulário de contato |
| v2 | Projetos dinâmicos (JSON → DOM); filtros nas subpáginas |
| v2 | Ticker, timeline, stack bar, profile card — identidade original mantida |
| v3 | Bugs corrigidos: cardHTML feedback, window.t guard, hero__left/right CSS |
| v3 | Skip link, back-to-top adicionados em todas as páginas |
| v3 | light-theme section--alt e profile-photo overlay corrigidos |
| v3 | sitemap.xml, robots.txt, página de detalhe (`projeto.html`) |
| v3 | README e DOC atualizados |

---

## 14. Análise crítica (pontos de atenção e roadmap)

### Pontos resolvidos nesta versão
- ✅ Identidade visual original preservada (foto, textos, ticker, timeline)
- ✅ Paleta do design system aplicada em todos os arquivos
- ✅ Tema dark/light funcional
- ✅ i18n PT/EN funcional
- ✅ Filtros de projetos nas subpáginas
- ✅ Formulário de contato validado
- ✅ Back to top e skip link
- ✅ sitemap + robots.txt
- ✅ Página de detalhe template

### Pontos pendentes para próximas versões
1. **Links reais** — botões "Ver projeto" ainda apontam para `#` nos projetos sem detalhe; criar páginas de detalhe para cada projeto.
2. **Imagens reais** — substituir SVGs procedurais por screenshots dos dashboards reais.
3. **CI/CD** — GitHub Actions para deploy automático no GitHub Pages (`pages.yml`).
4. **Filtro por tag** — além de profissional/pessoal, filtrar por tecnologia (DAX, Python etc.).
5. **Open Graph por projeto** — meta imagem específica em cada página de detalhe.
6. **Analytics** — Plausible ou Umami (sem cookies) para medir tráfego.
