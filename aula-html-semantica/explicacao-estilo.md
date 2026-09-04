# Explicação linha a linha — `index-com-estilo.html` (o CSS)

Continuação de [`explicacao.md`](./explicacao.md). O HTML de
[`index-com-estilo.html`](./index-com-estilo.html) é **idêntico** ao de `index.html` —
mesmas tags, mesmos atributos, mesma ordem. A única diferença é o bloco `<style>` dentro do
`<head>` [L8–L157]. Este arquivo explica **só o que mudou**: a tag `<style>` em si e cada
seletor/propriedade CSS, sempre respondendo à mesma pergunta da aula anterior — "isso
reforça ou atrapalha a semântica e a acessibilidade que o HTML já tinha sozinho?"

> Regra de ouro desta etapa: **CSS pode mudar a aparência à vontade, mas nunca pode
> apagar informação nem tirar algo do alcance do teclado.** Toda regra abaixo foi escolhida
> para ilustrar isso na prática.

---

## 1. A tag `<style>` em si [L8] / `</style>` [L157]

- `<style>` é o elemento que carrega **CSS embutido** (interno) na própria página, dentro
  do `<head>`. É diferente de um arquivo `.css` separado, que seria carregado com
  `<link rel="stylesheet" href="estilo.css">` — usamos `<style>` embutido aqui só para
  facilitar o estudo em um único arquivo; num projeto real, o mais comum é usar um arquivo
  `.css` externo, para poder reaproveitar o mesmo estilo em várias páginas.
- **Não tem nenhum atributo obrigatório.** Em HTML antigo (HTML4) era comum ver
  `<style type="text/css">`, mas o atributo `type` é **obsoleto** em HTML5 — o navegador já
  assume `text/css` por padrão, então escrevê-lo hoje é só ruído.
- Só existe um atributo opcional relevante hoje: `media="..."` (por exemplo,
  `media="print"`, para regras que valem só na impressão). Não usamos aqui porque todo o
  CSS desta página vale para tela (`screen`), que é o padrão implícito.
- Onde colocar: sempre dentro do `<head>`, para que o navegador conheça o estilo **antes**
  de desenhar o corpo da página na tela — evitando que a pessoa veja a página "sem estilo"
  por uma fração de segundo e depois "pule" para a versão estilizada (fenômeno chamado
  FOUC, *flash of unstyled content*).

### 1.1 Como ler cada regra CSS

Cada bloco tem o formato:

```css
seletor {
  propriedade: valor;
}
```

- **Seletor**: "em quais elementos esta regra se aplica" (uma tag, uma classe com `.`, um
  estado com `:`...).
- **Propriedade**: "o que muda" (cor, espaçamento, tamanho...).
- **Valor**: "para quanto/qual".

A partir daqui, cada seção segue essa leitura.

---

## 2. Reset universal — `*, *::before, *::after { box-sizing: border-box; }` [L9–13]

- `*` é o **seletor universal**: "todo elemento da página". `*::before` e `*::after` alcançam
  também os pseudo-elementos gerados por CSS (não usados nesta página ainda, mas é prática
  padrão incluir por segurança).
- `box-sizing: border-box`: muda a forma como o navegador **calcula a largura** de um
  elemento. Por padrão (`content-box`), `width` conta só o conteúdo, e bordas/preenchimento
  (`padding`) somam por fora, aumentando o tamanho final de forma imprevisível. Com
  `border-box`, `width` já inclui borda e `padding` — o elemento nunca fica maior do que o
  `width` definido.
- Não é uma propriedade "de acessibilidade" diretamente, mas evita um problema comum: campos
  de formulário e caixas que "estouram" o layout e quebram em telas estreitas ou com zoom
  alto — o que **é** um problema de acessibilidade (reflow de conteúdo, WCAG 1.4.10).

---

## 3. `body { ... }` [L15–25]

```css
body {
  margin: 0;
  padding: 0 1rem 3rem;
  max-width: 70ch;
  margin-inline: auto;
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #1a1a1a;
  background-color: #ffffff;
}
```

- `margin: 0`: remove a margem padrão que o navegador aplica ao `<body>` (geralmente 8px),
  para controlarmos o espaçamento explicitamente com `padding` logo abaixo.
- `padding: 0 1rem 3rem`: notação abreviada (topo, direita+esquerda, baixo) — aqui na
  verdade é (topo, laterais, baixo) porque só 3 valores foram passados: `0` no topo,
  `1rem` nas laterais, `3rem` embaixo, para o conteúdo nunca colar na borda da tela.
- **`max-width: 70ch`**: limita a largura do texto a aproximadamente 70 caracteres por
  linha. `ch` é uma unidade baseada na largura do caractere "0" da fonte atual.
  - Isso é uma recomendação direta de acessibilidade (WCAG 1.4.8, e boas práticas de
    legibilidade em geral): linhas **muito longas** (texto esticado numa tela ultrawide,
    por exemplo) fazem o olho se perder ao pular para a linha seguinte — especialmente
    difícil para pessoas com dislexia ou baixa visão. A faixa recomendada é de 45 a 80
    caracteres por linha.
- `margin-inline: auto`: centraliza o bloco horizontalmente (equivalente moderno de
  `margin-left: auto; margin-right: auto`, mas já preparado para idiomas escritos da
  direita para a esquerda, onde "início/fim" não é sempre "esquerda/direita").
- `font-family: system-ui, sans-serif`: usa a fonte padrão do sistema operacional da pessoa
  (a mesma dos aplicativos nativos dela), com `sans-serif` como alternativa genérica caso
  `system-ui` não seja suportado. Vantagem de acessibilidade: a pessoa já está acostumada a
  ler naquela fonte, e sistemas operacionais configurados para fontes maiores/mais legíveis
  (acessibilidade do sistema) refletem aqui automaticamente.
- **`font-size: 1rem`**: `rem` é relativo ao tamanho de fonte configurado na **raiz** do
  documento (`<html>`), que por sua vez respeita o tamanho de fonte definido nas
  preferências do navegador/sistema operacional da pessoa (geralmente 16px, mas pode ser
  maior se a pessoa configurou fonte maior por baixa visão).
  - **Nunca usar `px` para tamanho de fonte** é uma regra de acessibilidade importante:
    valores fixos em pixels ignoram a preferência de tamanho de fonte do usuário em alguns
    navegadores/configurações, dificultando a leitura para quem precisa de fonte maior.
    `rem` (ou `em`, `%`) sempre escala junto.
- `line-height: 1.6`: espaçamento entre linhas, 1.6 vezes o tamanho da fonte. Também é uma
  recomendação direta da WCAG 1.4.12 (Espaçamento de Texto): pelo menos 1.5 de
  entrelinha ajuda pessoas com dislexia ou baixa visão a não "perder a linha" durante a
  leitura.
- `color: #1a1a1a` sobre `background-color: #ffffff`: texto quase preto sobre fundo branco.
  - Contraste calculado entre essas duas cores é de aproximadamente **17:1** — muito acima
    do mínimo da WCAG AA para texto normal, que é **4.5:1** (ou 3:1 para texto grande, a
    partir de 24px/18.66px em negrito).
  - Por que não `#000000` puro sobre `#ffffff` puro? Contraste máximo (21:1) pode causar
    um efeito de "vibração"/fadiga visual em blocos grandes de texto para algumas pessoas
    (especialmente com astigmatismo); um preto levemente suavizado como `#1a1a1a` mantém
    contraste excelente com um pouco mais de conforto de leitura. Ainda assim, declarar
    a cor **explicitamente**, mesmo repetindo o que já seria o padrão do navegador, é
    importante, porque impede que a página herde uma cor de fundo diferente vinda de
    algum outro CSS ou de configurações do próprio navegador.

---

## 4. O skip link ganha comportamento — `.pular-link` [L27–40]

```css
.pular-link {
  position: absolute;
  top: -40px;
  left: 0;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 0.5rem 1rem;
  text-decoration: none;
  z-index: 100;
}

.pular-link:focus {
  top: 0;
}
```

- Isto responde exatamente à observação feita na aula anterior sobre a `class="pular-link"`
  do `<a>` em `index.html` [L11]: agora que existe `<style>`, o link de pular navegação
  pode ficar **escondido visualmente até receber foco de teclado** — o comportamento
  correto de um skip link em produção.
- **Por que `position: absolute; top: -40px` e não `display: none` ou `visibility:
  hidden`?** Esse é um dos pontos mais importantes da aula.
  - `display: none` ou `visibility: hidden` removem o elemento tanto da tela quanto da
    **árvore de acessibilidade e da ordem de tabulação** — o link ficaria completamente
    inacessível, nem por teclado nem por leitor de tela. Isso destruiria exatamente o
    recurso de acessibilidade que ele deveria oferecer.
  - Com `position: absolute` e um `top` negativo, o link continua **tecnicamente presente
    e alcançável por Tab** (só está posicionado fora da área visível da tela). Assim que
    ele recebe foco, a regra `.pular-link:focus { top: 0; }` o traz de volta para dentro da
    tela, visível, exatamente na hora em que alguém navegando por teclado precisa vê-lo.
  - Essa é a técnica padrão de mercado para "esconder até focar" — vale mostrar em aula
    como contraponto direto ao erro mais comum de acessibilidade em CSS.
- `background-color: #1a1a1a` + `color: #ffffff`: mesma lógica de contraste da seção 3,
  invertida (fundo escuro, texto claro) — contraste também altíssimo.
- `z-index: 100`: garante que o link fique **por cima** de qualquer outro elemento quando
  aparecer (por exemplo, do próprio `<header>`), para não ficar coberto/cortado.
- `text-decoration: none`: remove o sublinhado padrão de link só neste caso específico, já
  que o alto contraste de cor de fundo/texto já deixa claro que é um elemento interativo.

---

## 5. `:focus-visible { ... }` [L42–45]

```css
:focus-visible {
  outline: 3px solid #d4380d;
  outline-offset: 2px;
}
```

- Este é o ponto mais importante de toda a etapa de CSS: **em nenhum lugar desta página o
  contorno de foco (`outline`) é removido.** Pelo contrário, aqui ele é reforçado.
- `:focus-visible` é um seletor de estado que aplica o estilo quando um elemento está em
  foco **e** o navegador entende que esse foco veio de navegação por teclado (Tab) — ele
  evita mostrar o contorno grosso em cliques de mouse, quando visualmente não é tão
  necessário, mas sempre garante o contorno para quem navega por teclado.
- `outline: 3px solid #d4380d`: contorno de 3px, sólido, numa cor com contraste forte
  contra fundo branco e contra os azuis usados nos links — importante para ser perceptível
  também por pessoas com daltonismo (não depende só da cor: o contorno tem espessura e
  forma próprias, não é "a única pista").
- `outline-offset: 2px`: afasta o contorno 2px da borda do próprio elemento, para não ficar
  colado/cortando o texto ou ícone de dentro do botão/campo/link.
- **O erro clássico que este bloco evita**: é extremamente comum encontrar por aí CSS com
  `*:focus { outline: none; }` só porque "o contorno azul padrão do navegador é feio". Isso
  torna a página **completamente inutilizável por teclado**, porque ninguém consegue saber
  onde está o foco. Se algum dia quiserem remover o contorno **padrão** do navegador, a
  regra obrigatória é: só fazer isso substituindo por outro estilo de foco igualmente (ou
  mais) visível — nunca removendo sem repor.

---

## 6. Links — `a`, `a:visited`, `a:hover`/`a:focus` [L47–58]

```css
a {
  color: #0b4f9c;
}

a:visited {
  color: #5a3d8a;
}

a:hover,
a:focus {
  text-decoration: underline;
}
```

- `a { color: #0b4f9c; }`: azul escuro. Contraste contra o fundo branco fica em torno de
  5.5:1, acima do mínimo de 4.5:1 da WCAG AA.
- `a:visited { color: #5a3d8a; }`: cor diferente para links **já visitados** (roxo escuro).
  Isso não é estético apenas — ajuda qualquer pessoa (não só quem usa tecnologia
  assistiva) a lembrar quais links do menu ela já abriu antes, o que é especialmente útil
  em páginas de navegação/estudo como esta.
- `a:hover, a:focus { text-decoration: underline; }`: sublinha o link ao passar o mouse
  **ou** ao chegar nele por teclado (`:focus`) — repare que aqui usamos `:focus` "normal",
  não `:focus-visible`, então este sublinhado aparece em qualquer tipo de foco, reforçando
  (e não substituindo) o contorno vermelho de `:focus-visible` da seção 5.
- Note que **por padrão os links de todo o corpo do texto já ficam sublinhados** pelo
  navegador (comportamento nativo do `<a>`, que não removemos com `text-decoration: none`
  em nenhum lugar do texto corrido). Isso é proposital: cor sozinha não deveria ser o único
  jeito de identificar um link no meio de um parágrafo (WCAG 1.4.1, "não depender só de
  cor"), então o sublinhado permanente ajuda quem tem daltonismo a diferenciar link de
  texto comum mesmo sem interagir.

---

## 7. Títulos — `h1, h2, h3 { line-height: 1.25; }` [L60–64]

- Ajusta só o espaçamento entre linhas dos títulos (que, sendo maiores, ficam
  proporcionalmente melhores com uma entrelinha um pouco mais apertada que o `1.6` do
  corpo de texto definido em `body` [L22]).
- Repare que **nenhuma regra aqui muda o `font-size` de `h1`/`h2`/`h3`** — os tamanhos
  continuam sendo os padrões que o próprio navegador já aplica com base na hierarquia
  semântica (a mesma que vimos em `explicacao.md`, seção 5.1). Isso reforça, de novo, que
  a hierarquia de título é uma decisão de **estrutura**, não de estilo — o CSS aqui só
  refina o espaçamento, não decide "qual título é mais importante".

---

## 8. Menu de navegação — `header nav ul { ... }` [L66–73]

```css
header nav ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  margin: 1rem 0;
}
```

- **Seletor `header nav ul`**: um seletor **descendente** — só aplica a um `<ul>` que esteja
  dentro de um `<nav>` que esteja dentro de um `<header>`. Isso evita afetar por engano
  outras listas da página (por exemplo, as de `<section id="listas">`, [L157–177] do HTML),
  que devem continuar como listas normais, com marcadores.
- `list-style: none`: remove os marcadores (bolinhas) da lista, para o menu virar uma barra
  de links horizontal.
  - **Ponto importante de acessibilidade**: em navegadores/leitores de tela modernos,
    `<ul>`/`<li>` continuam sendo anunciados como lista mesmo com `list-style: none`
    (o papel semântico `list`/`listitem` continua na árvore de acessibilidade). Só em
    versões antigas do Safari + VoiceOver havia um bug conhecido em que isso fazia o
    papel de lista "sumir". A correção, se for preciso dar suporte a esses casos, é
    adicionar `role="list"` no `<ul>` e `role="listitem"` em cada `<li>` — não fizemos
    isso aqui porque é uma exceção rara hoje em dia, mas é importante que a turma saiba
    que existe.
- `display: flex; flex-wrap: wrap; gap: 1rem;`: organiza os `<li>` em **linha**, um ao lado
  do outro, com 1rem de espaço entre eles, e permite quebrar para a linha de baixo
  (`flex-wrap: wrap`) se não couberem todos na largura da tela — importante para telas
  estreitas, evitando que os itens do menu "estourem" para fora da tela ou fiquem
  espremidos ilegíveis.
- `padding: 0; margin: 1rem 0;`: remove o recuo padrão de lista (`padding-left` que o
  navegador aplica de fábrica) e define um espaçamento vertical de 1rem acima/abaixo do
  menu inteiro.

---

## 9. Tabela — `table`, `caption`, `th`/`td`, `tbody tr:nth-child(even)` [L75–97]

```css
table {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
}

caption {
  caption-side: top;
  text-align: left;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

th,
td {
  border: 1px solid #767676;
  padding: 0.5rem 0.75rem;
  text-align: left;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

- `border-collapse: collapse`: funde as bordas de células vizinhas numa linha só, em vez de
  cada célula ter sua própria borda separada com um espacinho entre elas (visual mais
  "encaixado", como uma tabela de planilha).
- `width: 100%`: a tabela ocupa toda a largura disponível dentro do `max-width: 70ch` do
  `<body>` — evita uma tabela "espremida" numa coluna estreita quando ela tem várias
  colunas de dados.
- `caption-side: top`: garante explicitamente que o `<caption>` apareça **acima** da
  tabela (é o padrão do navegador, mas declarar deixa claro que essa é uma escolha
  deliberada — poderia ser `bottom`, mas para leitura o título antes do conteúdo é mais
  previsível).
- `th, td { border: ...; padding: ...; text-align: left; }`: aplica a mesma borda e
  espaçamento interno para célula de cabeçalho e célula de dado. `text-align: left`
  alinhamento à esquerda (mais fácil de ler para texto, diferente do centralizado que
  alguns navegadores aplicam por padrão só ao `<th>` — aqui deixamos os dois com o mesmo
  alinhamento para dar consistência visual à leitura em linha).
  - Repare: a diferença entre `<th>` e `<td>` continua existindo (negrito no `<th>` é o
    padrão nativo do navegador, mantido aqui), mas agora é reforçada visualmente também
    pelo espaçamento e borda idênticos, deixando a tabela mais fácil de escanear com os
    olhos — sem que isso mude o papel semântico de cada um (o `scope="col"`/`scope="row"`
    explicado na aula anterior continua fazendo o trabalho pesado para quem usa leitor de
    tela).
- `tbody tr:nth-child(even) { background-color: #f2f2f2; }`: pinta de cinza claro as linhas
  pares do **corpo** da tabela (por isso o seletor começa com `tbody`, para não afetar a
  linha do `<thead>` nem do `<tfoot>`).
  - Esse padrão chamado "zebra striping" (listras) ajuda o olho a não "pular" de linha ao
    ler uma tabela larga com muitas colunas — um ganho de legibilidade, especialmente para
    quem tem dificuldade de rastreamento visual. O contraste do cinza claro contra o texto
    escuro continua muito acima do mínimo necessário.

---

## 10. Formulário — `fieldset`, `form div`, `label`, campos, `button` [L99–144]

```css
fieldset {
  border: 1px solid #767676;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
}

form div {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

input,
select,
textarea {
  font: inherit;
  padding: 0.5rem;
  border: 1px solid #767676;
  border-radius: 4px;
  width: 100%;
  max-width: 30rem;
}

input[type="checkbox"] {
  width: auto;
  margin-right: 0.5rem;
}

button {
  font: inherit;
  padding: 0.6rem 1.2rem;
  background-color: #0b4f9c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #083a73;
}
```

- `fieldset { border: ...; border-radius: 4px; padding: 1rem; margin: 1rem 0; }`: mantém a
  borda que o navegador já desenha em torno de um `<fieldset>` por padrão, só trocando a
  cor/espessura para combinar com o resto da página, e arredondando levemente os cantos
  (`border-radius`, puramente estético, sem efeito de acessibilidade). Continua deixando
  visualmente claro onde começa e termina o grupo "Dados pessoais" — reforçando o que o
  `<legend>` [L115 de `index-com-estilo.html`] já comunica por leitura de tela.
- **`form div { margin-bottom: 1rem; }`**: aqui vale reforçar o que já foi dito na aula
  anterior: cada `<div>` dentro do `<form>` [L117, L122, L128, L138, L143] agrupa um par
  `<label>` + campo. Este seletor CSS é a razão prática de esses `<div>`s existirem —
  eles não têm papel semântico, mas dão um "gancho" para o CSS aplicar espaçamento entre
  cada campo do formulário sem afetar mais nada na página (repare que o seletor é
  `form div`, então só afeta `<div>`s dentro de um `<form>`, não qualquer `<div>` da
  página).
- `label { display: block; font-weight: bold; margin-bottom: 0.25rem; }`: força o rótulo a
  ocupar a linha inteira (`display: block`), ficando sempre **acima** do campo
  correspondente — um padrão visual de formulário mais fácil de escanear do que rótulo e
  campo lado a lado, especialmente em telas estreitas. O negrito (`font-weight: bold`)
  reforça visualmente a mesma associação rótulo → campo que o atributo `for`/`id` já
  garante de forma programática (explicado na aula anterior).
- `input, select, textarea { font: inherit; ... }`:
  - `font: inherit`: por padrão, campos de formulário **não herdam** a fonte do resto da
    página (é um comportamento antigo e estranho do HTML/CSS, mantido por compatibilidade).
    Sem essa linha, os campos apareceriam com a fonte "de sistema operacional" genérica,
    visualmente destoante do restante do texto. `inherit` corrige isso, puxando a mesma
    `font-family`/`font-size`/`line-height` definidas em `body` [L15–25].
  - `padding: 0.5rem`, `border: 1px solid #767676`, `border-radius: 4px`: espaçamento
    interno e borda visível — um campo de formulário **precisa** ter uma borda claramente
    perceptível (contraste mínimo de 3:1 contra o fundo, pela WCAG 1.4.11), para que a
    pessoa identifique visualmente que ali é uma área editável, mesmo antes de clicar.
  - `width: 100%; max-width: 30rem;`: o campo ocupa toda a largura disponível do seu
    contêiner (bom em telas estreitas de celular), mas nunca passa de `30rem` em telas
    largas — evita um campo de texto absurdamente esticado e difícil de escanear com os
    olhos numa tela grande.
- **`input[type="checkbox"] { width: auto; margin-right: 0.5rem; }`**: seletor de
  **atributo**: aplica só a `<input>` cujo atributo `type` vale exatamente `"checkbox"`
  [L144 de `index-com-estilo.html`] — sem esse seletor mais específico, a checkbox herdaria
  `width: 100%` da regra geral acima e viraria uma barra esticada gigante em vez de uma
  caixinha pequena. `margin-right: 0.5rem` cria um respiro entre a caixinha e o texto do
  `<label>` ao lado.
- `button { ... }`:
  - `font: inherit`: mesma razão do `input`/`select`/`textarea` acima — botões também não
    herdam fonte por padrão.
  - `padding: 0.6rem 1.2rem`: aumenta a área clicável do botão. Isso não é só estética —
    é um requisito prático de acessibilidade motora (a orientação da WCAG 2.5.8 pede
    alvos de toque de pelo menos 24×24px; este padding deixa o botão bem acima disso),
    ajudando quem tem tremor de mão, usa o dedo num celular, ou tem dificuldade de mirar
    com precisão.
  - `background-color: #0b4f9c; color: #ffffff;`: mesmo azul usado nos links [L48],
    reforçando visualmente uma identidade de cor "clicável" consistente pela página
    inteira. Contraste do branco sobre esse azul passa de 5:1, acima do mínimo.
  - `border: none; border-radius: 4px;`: remove a borda 3D antiga que navegadores aplicam
    por padrão a `<button>`, trocando por cantos levemente arredondados — puramente
    estético.
  - `cursor: pointer`: em telas com mouse, muda o cursor para a "mãozinha" ao passar por
    cima, reforçando visualmente que é clicável (não afeta toque em celular nem leitores
    de tela, é só uma pista a mais para quem usa mouse).
- `button:hover { background-color: #083a73; }`: escurece o azul ao passar o mouse — dá
  feedback visual (**estado de interação**) de que o botão reagiu à presença do cursor.
  Note que isso é **complementar**, não substituto, ao `:focus-visible` da seção 5: o
  contorno vermelho de foco continua aparecendo por cima quando o botão é alcançado por
  teclado, independentemente deste `:hover`.

---

## 11. `small { display: block; color: #4d4d4d; }` [L146–149]

- `display: block`: o texto de ajuda do e-mail (`<small id="email-ajuda">`, visto na aula
  anterior) passa a ocupar sua própria linha, abaixo do campo, em vez de ficar colado ao
  lado dele na mesma linha (comportamento padrão de `<small>`, que é `inline`).
- `color: #4d4d4d`: cinza escuro, mais claro que o `#1a1a1a` do texto principal, para
  comunicar visualmente "isto é informação secundária" — reforçando o que a tag `<small>`
  já significa semanticamente (explicado na aula anterior). Mesmo sendo mais claro,
  `#4d4d4d` sobre fundo branco ainda mantém contraste acima de 4.5:1, então continua
  perfeitamente legível — **"secundário" não pode virar desculpa para um cinza claro
  demais que ninguém consegue ler**, um erro comum de design que prejudica
  desproporcionalmente pessoas com baixa visão.

---

## 12. Responsivo — `@media (max-width: 600px) { ... }` [L151–156]

```css
@media (max-width: 600px) {
  header nav ul {
    flex-direction: column;
    gap: 0.5rem;
  }
}
```

- `@media (max-width: 600px)` é uma **media query**: as regras dentro dela só se aplicam
  quando a largura da janela/tela é de 600px ou menos (celulares, principalmente).
- Dentro dela, o mesmo seletor `header nav ul` da seção 8 ganha `flex-direction: column`,
  empilhando os itens do menu **verticalmente** em vez de em linha, com um `gap` (espaço)
  menor entre eles.
- Por que isso importa para acessibilidade: em telas estreitas, um menu horizontal muito
  apertado gera itens de menu minúsculos, difíceis de tocar com precisão (de novo, o
  critério de alvo de toque mínimo). Empilhar verticalmente dá mais espaço/altura para cada
  link, além de evitar quebra de linha confusa no meio de uma palavra. Isso é reflow de
  conteúdo (WCAG 1.4.10): a página se reorganiza para caber na tela sem exigir rolagem
  horizontal nem perder informação.

---

## 13. O que este CSS **não** fez (de propósito)

Vale destacar em aula o que foi **evitado**, porque a ausência também ensina:

- Nenhum `outline: none` sem substituição — foco de teclado nunca fica invisível
  (seção 5).
- Nenhum `display: none`/`visibility: hidden` no skip link — ele fica fora da tela, não
  fora do fluxo de acessibilidade (seção 4).
- Nenhum tamanho de fonte em `px` — tudo respeita a preferência de tamanho da pessoa
  (seção 3).
- Nenhuma cor de texto abaixo do contraste mínimo de 4.5:1 — inclusive o texto
  "secundário" em cinza (seção 11).
- Nenhuma alteração na ordem do DOM/HTML — o CSS aqui só reorganiza a **aparência**
  (`flex`, cores, espaçamento); a ordem de leitura para quem usa leitor de tela continua
  sendo exatamente a ordem em que as tags aparecem no HTML, que é a mesma da aula
  anterior.

Esse último ponto é o resumo da etapa inteira: **o HTML define o que existe e em que
ordem; o CSS só decide como isso aparece — nunca o contrário.**
