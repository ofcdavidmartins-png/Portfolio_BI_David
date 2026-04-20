/* ============================================================
   projects.js — Base de dados dos projetos do portfólio
   Cada projeto segue o shape:
     { id, title, desc, img, category, kind, tags, year, featured, href }
   - category: 'powerbi' | 'python' | 'outros'
   - kind:     'profissional' | 'pessoal'
   - featured: true aparece na home ("melhores")
   - novo:     true aparece na home ("últimos")
   ============================================================ */

window.PROJECTS = [
  {
    id: 'pbi-primeiro-dashboard',
    title: 'Meu Primeiro Dashboard',
    desc: 'Primeiro dashboard que montei em Power BI. Usei pra fixar o básico: importação, relacionamentos, KPIs e primeiras medidas em DAX.',
    img: 'assets/images/pbi-1.svg',
    category: 'powerbi',
    kind: 'pessoal',
    tags: ['DAX', 'KPIs', 'Interativo'],
    year: 2026,
    novo: true,
    featured: true,
    href: 'projeto.html'
  },
  {
    id: 'pbi-indicadores-operacionais',
    title: 'Indicadores Operacionais',
    desc: 'Painel para acompanhar processos e identificar gargalos, inspirado no meu dia a dia na FUNCEF.',
    img: 'assets/images/pbi-2.svg',
    category: 'powerbi',
    kind: 'profissional',
    tags: ['Power Query', 'Processos'],
    year: 2026,
    novo: true,
    href: '#'
  },
  {
    id: 'pbi-dax-avancado',
    title: 'Análise avançada com DAX',
    desc: 'Próxima etapa do estudo: medidas DAX mais elaboradas e modelagem dimensional.',
    img: 'assets/images/pbi-3.svg',
    category: 'powerbi',
    kind: 'pessoal',
    tags: ['DAX', 'Modelagem'],
    year: 2026,
    href: '#'
  },
  {
    id: 'pbi-financas-pessoais',
    title: 'Finanças Pessoais',
    desc: 'Controle mensal com categorização automática e orçamento planejado vs. real.',
    img: 'assets/images/pbi-4.svg',
    category: 'powerbi',
    kind: 'pessoal',
    tags: ['DAX', 'Excel'],
    year: 2025,
    href: '#'
  },
  {
    id: 'pbi-esportivo',
    title: 'Dashboard Esportivo',
    desc: 'Estatísticas de campeonatos com filtros dinâmicos por clube e temporada.',
    img: 'assets/images/pbi-5.svg',
    category: 'powerbi',
    kind: 'pessoal',
    tags: ['Power Query', 'APIs'],
    year: 2025,
    href: '#'
  },
  {
    id: 'py-automacao-relatorios',
    title: 'Automação de Relatórios',
    desc: 'Consolida planilhas, aplica regras de negócio e distribui PDFs por e-mail.',
    img: 'assets/images/py-1.svg',
    category: 'python',
    kind: 'profissional',
    tags: ['Pandas', 'OpenPyXL', 'SMTP'],
    year: 2025,
    featured: true,
    href: '#'
  },
  {
    id: 'py-etl',
    title: 'Pipeline de ETL',
    desc: 'Ingestão, transformação e carga em data warehouse com agendamento.',
    img: 'assets/images/py-2.svg',
    category: 'python',
    kind: 'profissional',
    tags: ['Pandas', 'SQLAlchemy', 'Cron'],
    year: 2025,
    href: '#'
  },
  {
    id: 'py-previsao-demanda',
    title: 'Previsão de Demanda',
    desc: 'Modelo de séries temporais para planejamento de compras mensais.',
    img: 'assets/images/py-3.svg',
    category: 'python',
    kind: 'profissional',
    tags: ['Prophet', 'Scikit-learn'],
    year: 2024,
    featured: true,
    href: '#'
  },
  {
    id: 'py-bot-lembretes',
    title: 'Bot de Lembretes',
    desc: 'Bot no Telegram que envia lembretes e resumos diários de tarefas.',
    img: 'assets/images/py-4.svg',
    category: 'python',
    kind: 'pessoal',
    tags: ['python-telegram-bot', 'APScheduler'],
    year: 2024,
    href: '#'
  },
  {
    id: 'py-eda',
    title: 'EDA · Dados Públicos',
    desc: 'Análise exploratória e visualização de bases abertas do governo.',
    img: 'assets/images/py-5.svg',
    category: 'python',
    kind: 'pessoal',
    tags: ['Pandas', 'Matplotlib'],
    year: 2024,
    href: '#'
  },
  {
    id: 'out-data-mart',
    title: 'Modelagem de Data Mart',
    desc: 'Esquema estrela para consumo em Power BI com views e índices otimizados.',
    img: 'assets/images/out-1.svg',
    category: 'outros',
    kind: 'profissional',
    tags: ['SQL Server', 'Modelagem'],
    year: 2025,
    href: '#'
  },
  {
    id: 'out-excel',
    title: 'Planilha de Controle',
    desc: 'Dashboard em Excel com Power Query, fórmulas dinâmicas e macros em VBA.',
    img: 'assets/images/out-2.svg',
    category: 'outros',
    kind: 'profissional',
    tags: ['Power Query', 'VBA'],
    year: 2024,
    href: '#'
  },
  {
    id: 'out-landing',
    title: 'Landing Page Responsiva',
    desc: 'Página estática focada em performance, SEO e acessibilidade.',
    img: 'assets/images/out-3.svg',
    category: 'outros',
    kind: 'pessoal',
    tags: ['HTML', 'CSS', 'JS'],
    year: 2024,
    href: '#'
  },
  {
    id: 'out-scraper',
    title: 'Scraper de Dados Públicos',
    desc: 'Coletor resiliente com retry, cache local e exportação para Parquet.',
    img: 'assets/images/out-4.svg',
    category: 'outros',
    kind: 'pessoal',
    tags: ['Requests', 'Parquet'],
    year: 2024,
    featured: true,
    href: '#'
  },
  {
    id: 'out-api-node',
    title: 'API em Node.js',
    desc: 'API REST simples com Express para consumo de dados locais.',
    img: 'assets/images/out-5.svg',
    category: 'outros',
    kind: 'pessoal',
    tags: ['Node', 'Express'],
    year: 2024,
    href: '#'
  }
];
