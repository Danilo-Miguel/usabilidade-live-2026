# Bootstrap 5 — Apostila da Aula

Material de apoio para o arquivo [`bootstrap.html`](./bootstrap.html). Abra os
dois lado a lado: o `.html` no navegador (para ver o resultado) e este `.md`
para entender **por que** cada classe existe.

## 1. O que é o Bootstrap?

Bootstrap é o framework CSS mais usado do mundo, criado originalmente no
Twitter (2011). Ele entrega:

- Um arquivo CSS (`bootstrap.min.css`) com **componentes prontos**: botões,
  cards, navbar, formulários, alerts, badges, modais, etc.
- Um arquivo JavaScript (`bootstrap.bundle.min.js`) que dá **interatividade**
  a alguns desses componentes (abrir/fechar modal, menu mobile, carousel,
  accordion, dropdown).
- Um **sistema de grid** de 12 colunas para montar layouts responsivos sem
  precisar escrever `display: flex` ou media queries manualmente.

Filosofia: você escreve HTML e **cola nomes de classe já prontos** nas tags.
O CSS por trás dessas classes já existe — você não o escreve.

## 2. Como instalar (via CDN)

Para aula, não instalamos nada (sem npm, sem build). Só colamos duas tags no
HTML: uma `<link>` no `<head>` (o CSS) e um `<script>` antes de fechar o
`<body>` (o JS, opcional, só se for usar componente interativo).

```html
<head>
  <!-- ... -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
  >
</head>
<body>
  <!-- todo o conteúdo da página -->

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

- `rel="stylesheet"`: diz ao navegador que aquele link é uma folha de estilos
  CSS (mesma tag que usaríamos para um CSS próprio).
- O `<script>` do Bootstrap fica **no fim do body** por convenção de
  performance: assim a página (HTML) já carregou visualmente antes de baixar
  o JS, e o JS já encontra todos os elementos do DOM prontos para manipular.
- Em produção (fora da aula), o ideal é instalar via `npm install bootstrap`
  e usar um bundler, para ter controle de versão e poder customizar via Sass.
  Para uma aula introdutória, o CDN é suficiente e mais simples.

## 3. Estrutura base: `container`, `row`, `col`

Toda página Bootstrap segue este esqueleto:

```html
<div class="container">
  <div class="row">
    <div class="col">Coluna 1</div>
    <div class="col">Coluna 2</div>
  </div>
</div>
```

- **`.container`**: cria uma "moldura" central com largura máxima e margens
  automáticas nas laterais (conteúdo não gruda na borda da tela). Existe
  também `.container-fluid`, que ocupa **100% da largura** da tela em
  qualquer tamanho (sem limite máximo).
- **`.row`**: uma linha do grid. É um `flex` por baixo dos panos — organiza
  as colunas lado a lado.
- **`.col`**: uma coluna dentro da row. Sem número, todas as `.col` de uma
  mesma `.row` dividem o espaço **igualmente**.

**Regra de ouro do grid Bootstrap:** `.col-*` só funciona dentro de `.row`, e
`.row` só deve conter `.col-*` como filhos diretos (não dá pra encaixar
qualquer coisa direto ali).

## 4. Sistema de Grid (12 colunas)

O grid do Bootstrap sempre soma **12** por linha. Você diz quantas dessas 12
"fatias" cada coluna ocupa:

```html
<div class="row">
  <div class="col-8">Ocupa 8/12 (~66%)</div>
  <div class="col-4">Ocupa 4/12 (~33%)</div>
</div>
```

### Breakpoints (responsividade)

O nome da classe muda conforme o tamanho de tela a partir do qual a regra
vale. Isso é o que faz o layout **responsivo** sem escrever media query:

| Classe | A partir de (largura de tela) | Uso típico |
|---|---|---|
| `.col-` (sem sufixo) | sempre (mobile first) | celular |
| `.col-sm-` | ≥ 576px | celular grande / tablet retrato |
| `.col-md-` | ≥ 768px | tablet |
| `.col-lg-` | ≥ 992px | notebook |
| `.col-xl-` | ≥ 1200px | desktop |
| `.col-xxl-` | ≥ 1400px | tela grande |

Exemplo clássico: coluna que ocupa a tela inteira no celular e metade no
notebook:

```html
<div class="col-12 col-lg-6">Cheia no mobile, metade no desktop</div>
```

Leia `col-12 col-lg-6` assim: "por padrão (mobile) ocupe 12/12; quando a tela
atingir `lg` (≥992px), ocupe 6/12". Essa é a filosofia **mobile first** do
Bootstrap: você define o comportamento pequeno primeiro, e vai
"sobrescrevendo" para telas maiores.

## 5. Tipografia

| Classe | Efeito |
|---|---|
| `.display-1` até `.display-6` | Títulos gigantes de destaque (hero), do maior (`1`) ao menor (`6`) |
| `.lead` | Parágrafo de destaque (fonte um pouco maior, aparência de "chamada") |
| `.text-center` / `.text-start` / `.text-end` | Alinhamento de texto |
| `.text-uppercase` / `.text-lowercase` / `.text-capitalize` | Transformação de caixa do texto |
| `.fw-bold` / `.fw-normal` / `.fw-light` | Peso da fonte (bold, normal, fina) |
| `.fst-italic` | Itálico |
| `.text-truncate` | Corta o texto com "..." se não couber na linha |
| `.small` | Texto menor |

## 6. Cores e fundo (utilities)

Bootstrap tem uma paleta de cores "semânticas" (nome indica a intenção, não a
cor exata):

| Nome | Intenção |
|---|---|
| `primary` | Cor principal da marca/tema |
| `secondary` | Cor secundária, neutra |
| `success` | Sucesso, positivo (verde por padrão) |
| `danger` | Erro, perigo (vermelho por padrão) |
| `warning` | Atenção (amarelo por padrão) |
| `info` | Informativo (azul claro por padrão) |
| `light` / `dark` | Tons claro/escuro neutros |

Essas cores viram classes com prefixos diferentes:

- `.text-primary`, `.text-danger`... → cor do **texto**.
- `.bg-primary`, `.bg-danger`... → cor de **fundo**.
- `.border-primary`, `.border-danger`... → cor da **borda** (precisa também
  da classe `.border` para a borda aparecer).

## 7. Espaçamento (`margin` e `padding` utilities)

Em vez de escrever `style="margin: 16px"`, o Bootstrap tem uma escala pronta
de 0 a 5. O padrão do nome é: `{propriedade}{lado}-{tamanho}`.

- **Propriedade:** `m` (margin) ou `p` (padding).
- **Lado:** `t` (top), `b` (bottom), `s` (start = esquerda), `e` (end =
  direita), `x` (horizontal, esquerda+direita), `y` (vertical, cima+baixo),
  ou nada (todos os lados).
- **Tamanho:** `0`, `1`, `2`, `3`, `4`, `5` (cada número é um múltiplo de
  `0.25rem`, ou seja, `1`≈4px, `2`≈8px, `3`≈16px, `4`≈24px, `5`≈48px), ou
  `auto` (só para margin, útil para centralizar: `mx-auto`).

Exemplos:

| Classe | Significado |
|---|---|
| `.m-3` | margin de 1rem em **todos** os lados |
| `.mt-4` | margin-**t**op grande |
| `.px-2` | padding horizontal (esquerda **e** direita) pequeno |
| `.mb-0` | margin-bottom **zero** (remove espaçamento padrão de baixo) |
| `.mx-auto` | margens laterais automáticas → centraliza um bloco com largura definida |

## 8. Componentes prontos

### 8.1 Botões

```html
<button class="btn btn-primary">Salvar</button>
<button class="btn btn-outline-danger">Excluir</button>
```

- `.btn`: classe **base**, obrigatória — dá o formato/padding/cursor de
  botão. Sozinha ela não tem cor.
- `.btn-primary`, `.btn-danger`, etc.: aplicam a cor de fundo semântica.
- `.btn-outline-*`: mesma cor, mas só na borda/texto, fundo transparente até
  passar o mouse.
- `.btn-sm` / `.btn-lg`: tamanho pequeno/grande.

### 8.2 Cards

```html
<div class="card" style="width: 18rem;">
  <img src="foto.jpg" class="card-img-top" alt="Descrição da imagem">
  <div class="card-body">
    <h5 class="card-title">Título do card</h5>
    <p class="card-text">Texto de apoio do card.</p>
    <a href="#" class="btn btn-primary">Ação</a>
  </div>
</div>
```

- `.card`: a "moldura" (borda arredondada + sombra leve).
- `.card-img-top`: imagem que ocupa a largura toda, encaixada no topo do
  card, com os cantos superiores arredondados junto com o card.
- `.card-body`: área de conteúdo com padding interno.
- `.card-title` / `.card-text`: tipografia já ajustada para o contexto do
  card (espaçamento entre título e texto, por exemplo).

### 8.3 Alerts

```html
<div class="alert alert-success" role="alert">
  Operação concluída com sucesso!
</div>
```

- `.alert`: caixa de aviso com padding e borda arredondada.
- `.alert-success` / `.alert-danger` / `.alert-warning` / `.alert-info`:
  cor semântica de fundo, borda e texto, todas já combinando entre si.
- `role="alert"`: atributo de **acessibilidade** (ARIA) — não é do
  Bootstrap, é HTML/ARIA puro, mas o Bootstrap recomenda usá-lo aqui para
  leitores de tela anunciarem a mensagem automaticamente.

### 8.4 Badges

```html
<span class="badge bg-secondary">Novo</span>
```

- `.badge`: selo pequeno, geralmente ao lado de um título, para indicar
  contagem ou status (ex.: "3 mensagens novas").

### 8.5 Formulários

```html
<div class="mb-3">
  <label for="email" class="form-label">E-mail</label>
  <input type="email" class="form-control" id="email" placeholder="voce@exemplo.com">
</div>
```

- `.form-label`: estilo de rótulo (espaçamento, peso da fonte).
- `.form-control`: estilo padrão de campo de formulário (borda, padding,
  foco azul ao clicar).
- `for="email"` / `id="email"`: **isso não é Bootstrap, é HTML puro** — o
  `for` do `<label>` precisa bater com o `id` do `<input>` para que clicar no
  texto do rótulo foque automaticamente o campo (acessibilidade).

### 8.6 Navbar

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Minha Marca</a>
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="menu">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">Início</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Contato</a></li>
      </ul>
    </div>
  </div>
</nav>
```

- `.navbar`: base do menu de navegação.
- `.navbar-expand-lg`: a partir do breakpoint `lg`, mostra o menu **sempre
  aberto** e horizontal; abaixo de `lg`, ele vira um menu retrátil
  (hambúrguer). É o que torna a navbar responsiva.
- `.navbar-dark` + `.bg-dark`: tema escuro — texto claro sobre fundo escuro
  (precisam andar juntas, senão o texto fica ilegível).
- `.navbar-brand`: o "logo"/nome do site.
- `.navbar-toggler`: o botão hambúrguer, só visível abaixo do breakpoint do
  `-expand-`.
- `data-bs-toggle="collapse"` e `data-bs-target="#menu"`: **atributos de
  dados (`data-*`)** que o **JavaScript do Bootstrap** lê para saber "ao
  clicar aqui, mostre/esconda o elemento com `id="menu"`". Sem o
  `bootstrap.bundle.min.js` carregado, clicar no botão não faz nada.
- `.navbar-nav`: lista de links do menu.
- `.ms-auto` (margin-**s**tart auto): empurra os itens seguintes para a
  **direita** — é um utilitário de espaçamento, o mesmo grupo do item 7.

## 9. Utilitários de Flexbox e Display

Bootstrap expõe boa parte do flexbox como classes:

| Classe | Equivale a |
|---|---|
| `.d-flex` | `display: flex;` |
| `.d-none` | `display: none;` (esconde o elemento) |
| `.justify-content-between` | `justify-content: space-between;` |
| `.align-items-center` | `align-items: center;` |
| `.flex-column` | `flex-direction: column;` |
| `.gap-3` | `gap: 1rem;` (espaço entre itens flex/grid) |

## 10. Utilitários de responsividade

As classes `.d-*` combinam com os mesmos sufixos de breakpoint do grid:

```html
<div class="d-none d-md-block">Só aparece a partir do tablet (md)</div>
<div class="d-block d-md-none">Só aparece no celular (some a partir do md)</div>
```

Leia assim: "esconda por padrão (`d-none`), mas a partir do `md`, mostre
como bloco (`d-md-block`)".

## 11. Componentes que dependem de JavaScript

Estes só funcionam com `bootstrap.bundle.min.js` carregado, porque a
interação (abrir, fechar, trocar slide) é feita em JS, não em CSS puro:

- **Collapse/Accordion** (`data-bs-toggle="collapse"`): esconder/mostrar
  conteúdo ao clicar, tipo "perguntas frequentes".
- **Modal** (`data-bs-toggle="modal"`): janela sobreposta ao conteúdo.
- **Carousel**: slideshow de imagens com botões de próximo/anterior.
- **Dropdown**: menu suspenso ao clicar num botão.

Todos seguem o mesmo padrão: um elemento com `data-bs-toggle="..."` e
`data-bs-target="#idDoElemento"` controla o elemento que tem esse `id`.

## 12. Tabela de referência — todas as classes usadas em `bootstrap.html`

| Classe | Categoria | O que faz |
|---|---|---|
| `container` / `container-fluid` | Layout | Centraliza o conteúdo com largura máxima / ocupa 100% da tela |
| `row`, `col`, `col-*`, `col-md-*`, `col-lg-*` | Grid | Organiza colunas responsivas de 12 |
| `g-3` | Grid | Gap (espaçamento) entre colunas/linhas do grid |
| `display-*`, `lead`, `fw-bold`, `text-center` | Tipografia | Tamanho, peso e alinhamento de texto |
| `text-{cor}`, `bg-{cor}` | Cor | Cor do texto / do fundo |
| `m-*`, `p-*`, `mt-*`, `mb-*`, `mx-auto` | Espaçamento | Margin e padding em escala |
| `btn`, `btn-primary`, `btn-outline-*` | Componente | Botões |
| `card`, `card-body`, `card-title`, `card-text`, `card-img-top` | Componente | Cartões |
| `alert`, `alert-*` | Componente | Avisos coloridos |
| `badge`, `bg-*` | Componente | Selos pequenos |
| `form-label`, `form-control` | Componente | Formulários |
| `navbar`, `navbar-expand-lg`, `navbar-dark`, `navbar-brand`, `navbar-toggler`, `navbar-nav`, `nav-item`, `nav-link` | Componente | Menu de navegação |
| `collapse`, `accordion*` | Componente + JS | Conteúdo retrátil |
| `modal*` | Componente + JS | Janela sobreposta |
| `d-flex`, `justify-content-*`, `align-items-*`, `gap-*` | Flexbox | Alinhamento e distribuição |
| `d-none`, `d-md-block` | Responsividade | Mostrar/esconder por tamanho de tela |

## 13. Exercícios de fixação

1. Crie uma `row` com 3 `col` iguais no desktop, que viram 1 coluna cheia no
   celular (dica: `col-12 col-md-4`).
2. Troque as cores semânticas de um alerta de `success` para `warning` e
   observe o que muda.
3. Adicione um segundo item na navbar e faça a página abrir/fechar o menu no
   celular (precisa do JS do Bootstrap carregado).
4. Construa um card de "produto" com imagem, nome, preço (`text-success` e
   `fw-bold`) e um botão `btn-primary`.
