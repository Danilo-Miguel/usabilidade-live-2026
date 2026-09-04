# Explicação linha a linha — `index.html`

Material de apoio para a aula de 3 horas. A página [`index.html`](./index.html) **não tem
nenhuma tag `<style>`, nenhum atributo `style=""` e nenhum CSS externo**. Isso é proposital:
o objetivo desta primeira etapa é olhar para o HTML "pelado" e entender que ele já tem
significado antes de qualquer estilização. Depois desta aula, numa próxima etapa, vamos
introduzir a tag `<style>` na mesma página.

Cada seção abaixo corresponde a um trecho do arquivo. Os números entre colchetes, tipo
`[L13]`, indicam a linha correspondente em `index.html` para você ir e voltar entre os dois
arquivos durante a explicação.

> Regra de ouro que vai se repetir a aula inteira: **a tag deve descrever o que o
> conteúdo *é* ou *significa*, nunca como ele deve parecer.** Aparência é problema do CSS,
> que ainda nem existe nesta página.

---

## 1. Antes do `<html>`: o `DOCTYPE`

```html
<!DOCTYPE html>                          [L1]
```

- Não é uma tag HTML, é uma **declaração de tipo de documento**. Ela diz ao navegador
  "renderize isto seguindo as regras do HTML5 (o padrão atual)".
- Sem ela, o navegador entra em **"quirks mode"** (modo de compatibilidade com páginas
  antigas dos anos 90), que muda até cálculos de layout. Por isso ela é obrigatória e
  sempre a primeira linha do arquivo.
- Não tem tag de fechamento porque não é um elemento — é uma instrução única.

---

## 2. `<html lang="pt-BR">` [L2] / `</html>` [L199]

- `<html>` é o elemento raiz: **todo o resto da página vive dentro dele**. Só pode existir
  um `<html>` por documento.
- **Atributo `lang="pt-BR"`**: declara o idioma principal do documento.
  - Efeito de acessibilidade: leitores de tela (NVDA, JAWS, VoiceOver, TalkBack) usam o
    `lang` para escolher a **voz e a pronúncia** corretas. Sem ele, um leitor de tela em
    inglês pode ler um texto em português com pronúncia de inglês, o que vira ruído
    incompreensível.
  - Também é usado por tradutores automáticos e verificadores ortográficos do navegador.
  - Se o texto muda de idioma no meio da página (uma citação em inglês, por exemplo), o
    correto é colocar `lang="en"` só naquele trecho, num `<span lang="en">`, não mudar o
    `lang` do `<html>` inteiro.
- Por que não usar só `lang="pt"`? Funcionaria, mas `pt-BR` é mais preciso porque diferencia
  do português europeu (`pt-PT`), o que importa para pronúncia e para corretores.

---

## 3. `<head>` [L3] … `</head>` [L8]

- Contêiner de **metadados**: informações sobre a página que não aparecem renderizadas no
  corpo visível, mas que o navegador, os motores de busca e leitores de tela usam.
- Nada dentro do `<head>` é conteúdo visual da página.

### 3.1 `<meta charset="UTF-8">` [L4]

- Declara a **codificação de caracteres** do arquivo. UTF-8 suporta acentos, `ç`, emojis e
  praticamente qualquer caractere de qualquer idioma.
- Sem essa linha (ou com a codificação errada), acentos aparecem quebrados
  (`Ã§Ã£o` em vez de `ção`) — um problema de acessibilidade e de credibilidade também.
- Deve ser a **primeira coisa dentro do `<head>`**, porque o navegador precisa saber a
  codificação antes de interpretar qualquer outro caractere acentuado no restante do
  arquivo, inclusive no `<title>`.

### 3.2 `<meta name="viewport" content="width=device-width, initial-scale=1.0">` [L5]

- Controla como a página se comporta em telas pequenas (celular).
- `width=device-width`: a largura da página acompanha a largura real do aparelho, em vez de
  simular uma tela de desktop reduzida.
- `initial-scale=1.0`: o zoom inicial é 100%, sem a página vir "encolhida".
- Relevância de acessibilidade: sem essa meta tag, o navegador mobile finge que a tela é
  larga (geralmente 980px) e depois reduz tudo, forçando o usuário a dar zoom para ler —
  péssimo para baixa visão. **Nunca** se deve usar `user-scalable=no` ou
  `maximum-scale=1` aqui, porque isso impede o usuário de dar zoom manualmente, o que é uma
  barreira de acessibilidade grave.

### 3.3 `<meta name="description" content="...">` [L6]

- Um resumo da página usado por buscadores (Google, Bing) no resultado de busca, e por
  redes sociais quando alguém compartilha o link.
- Não tem efeito visual na própria página e não é lido de forma especial por leitores de
  tela ao abrir a página — é metadado para **fora** da página.

### 3.4 `<title>Aula de HTML Semântico e Acessível</title>` [L7]

- É o único texto do `<head>` que o usuário "vê", só que fora da página: na aba do
  navegador, nos favoritos e no histórico.
- **É o primeiro elemento que um leitor de tela anuncia** ao abrir a página ("Aula de HTML
  Semântico e Acessível, página"). Um título vago como "Documento" ou "Página 1" deixa a
  pessoa sem saber onde está.
- Cada página do site deveria ter um `<title>` diferente e descritivo — nunca copie o mesmo
  título em todas as páginas.

---

## 4. Início do `<body>` [L9] — o link de pular navegação

```html
<a href="#conteudo-principal" class="pular-link">Pular para o conteúdo principal</a>   [L11]
```

- `<body>` é o contêiner de **tudo que é visível/audível** na página. Só existe um por
  documento, logo depois do `</head>`.
- Este `<a>` é o famoso **"skip link"** (link de pular bloco). É o primeiro elemento
  focável da página.
  - `href="#conteudo-principal"`: aponta para o `id="conteudo-principal"` do `<main>`
    [L29]. Ao ativar o link (Enter/toque), o foco do teclado pula direto para o conteúdo
    principal.
  - Por que isso importa: quem navega só com teclado (pessoas com deficiência motora) ou
    com leitor de tela, sem o skip link, precisaria passar por todos os links do menu de
    navegação **toda vez** que muda de página, antes de chegar ao conteúdo. Com o link,
    isso é resolvido em um Tab + Enter.
  - `class="pular-link"`: aqui `class` **não é estilo** — é só um "rótulo" que identificaria
    o elemento para CSS ou JavaScript no futuro. Sem `<style>` na página, ela não tem
    nenhum efeito visual hoje; é comum, na prática, esse link ficar escondido visualmente
    (mas acessível ao teclado) só quando o CSS entrar. Repare que colocar uma `class` não
    quebra a regra de "página sem estilo": `class` é apenas um identificador, quem aplica
    aparência é o `<style>`, que ainda não existe aqui.
  - Normalmente este link ficaria visível apenas quando recebe foco de teclado — isso é
    coisa de CSS (`:focus`), então nesta página, sem estilo, ele aparece sempre visível
    como um link comum. É um efeito colateral esperado da "página branca".

---

## 5. `<header>` [L13] … `</header>` [L27] — cabeçalho da página

- `<header>` é uma tag **semântica de estrutura** (HTML5). Ela diz: "isto é o cabeçalho
  deste contexto" — pode ser o cabeçalho da página inteira (quando é filho direto do
  `<body>`, como aqui) ou o cabeçalho de um `<article>`/`<section>` específico (veremos um
  exemplo em [L47]).
- Diferença para `<div>`: um `<div>` não comunica nada ao navegador ou ao leitor de tela
  além de "existe uma caixa aqui". `<header>` é anunciado como **landmark "banner"** pelos
  leitores de tela, permitindo que a pessoa pule direto para ele com um atalho (por
  exemplo, "próximo marco" no NVDA/JAWS). Um `<div>` não tem esse atalho.
- Pode conter qualquer coisa: título, subtítulo, logo, menu de navegação — como está
  acontecendo aqui.

### 5.1 `<h1>Aula de HTML Semântico e Acessível</h1>` [L14]

- `<h1>` a `<h6>` são **títulos hierárquicos**. `<h1>` é o título mais importante da
  página.
- Regra de acessibilidade: **deve existir só um `<h1>` por página**, representando o
  assunto principal — equivalente ao título de um livro.
- Leitores de tela permitem navegar **pulando de título em título** (tecla `H`, no NVDA/
  JAWS). Se os níveis pularem (de `<h1>` direto para `<h4>`, por exemplo) ou se forem
  usados só por causa do tamanho da fonte, essa navegação vira uma bagunça sem lógica.
  Nesta página a hierarquia é: `h1` (L14) → `h2` (L32, L48, L79, L112, L155, L181, e o
  `h2` do aside em L187) → `h3` (L157, L164, L171) — sem pular nível.
- **Nunca** se deve escolher `<h1>`...`<h6>` pelo tamanho da letra que "ficaria bonito". Sem
  `<style>`, aliás, dá para ver isso na prática: o navegador já aplica um tamanho padrão
  decrescente para cada nível, mas isso é consequência da hierarquia, não o motivo dela.

### 5.2 `<p>Uma página sem nenhum estilo...</p>` [L15]

- `<p>` = parágrafo. Marca um bloco de texto corrido.
- Leitores de tela fazem uma pequena pausa entre parágrafos e permitem pular parágrafo por
  parágrafo (tecla `P` no NVDA). Se o texto fosse solto sem `<p>`, ou dentro de `<div>`,
  essa navegação por parágrafo não funcionaria.

### 5.3 `<nav aria-label="Navegação principal">` [L17] … `</nav>` [L26]

- `<nav>` marca um bloco de **links de navegação principal** (menu do site, sumário,
  paginação). Não deve ser usado para qualquer grupo de links (por exemplo, os links dentro
  do corpo de um texto não precisam de `<nav>`).
- É anunciado como **landmark "navigation"**. Quem usa leitor de tela pode pular direto
  para "navegação" sem precisar ouvir o cabeçalho inteiro primeiro.
- **Atributo `aria-label="Navegação principal"`**: dá um **nome acessível** a este `<nav>`.
  - Por que é necessário aqui: uma página pode ter mais de um `<nav>` (menu principal,
    menu de rodapé, sumário lateral...). Se todos se chamam apenas "navegação", a pessoa
    não sabe diferenciá-los ao navegar por landmarks. Com `aria-label`, o leitor de tela
    anuncia "Navegação principal, região de navegação", diferente de, por exemplo, um
    futuro `<nav aria-label="Rodapé">`.
  - Se houvesse só **um** `<nav>` na página inteira, o `aria-label` seria opcional (ainda
    assim recomendado, pela clareza).

#### `<ul>` [L18] e `<li><a href="#sobre">...</a></li>` [L19–24]

- `<ul>` = lista **não ordenada**: um menu é, semanticamente, uma lista de links, e por
  isso deve ficar dentro de `<ul>`/`<li>`, mesmo que visualmente (com CSS, depois) vire uma
  barra horizontal sem marcadores. O leitor de tela anuncia "lista com 6 itens", ajudando a
  pessoa a saber quantas opções de menu existem antes mesmo de navegar por elas.
- Cada `<li>` (item de lista) contém um `<a href="#sobre">`, um **link âncora interno**:
  - `href="#sobre"` aponta para o `id="sobre"` da `<section>` em [L31]. Clicar rola a
    página até lá.
  - Isso só funciona porque os `id`s (`sobre`, `artigo`, `tabela`, `formulario`, `listas`,
    `midia`) existem exatamente com esse nome nas respectivas seções — `id` tem que ser
    **único** na página inteira, nunca repetido.

---

## 6. `<main id="conteudo-principal">` [L29] … `</main>` [L192]

- `<main>` marca o **conteúdo principal e único** da página — o que realmente diferencia
  esta página de qualquer outra do site (exclui cabeçalho, menu, rodapé, barra lateral
  repetida em todas as páginas).
- Regra: **só pode haver um `<main>` visível por página.**
- É anunciado como landmark "main" — normalmente o próprio destino do skip link (como é o
  caso aqui, veja [L11]).
- **Atributo `id="conteudo-principal"`**: é o alvo do skip link em [L11]. Um `id` não tem
  significado semântico por si só, ele apenas cria um "endereço" (`#conteudo-principal`) que
  outro elemento pode referenciar via `href` ou via atributos ARIA (`aria-labelledby`,
  `aria-describedby`, como veremos a seguir).

---

## 7. `<section id="sobre" aria-labelledby="sobre-titulo">` [L31] … `</section>` [L44]

- `<section>` agrupa um **bloco temático de conteúdo**, geralmente com um título próprio.
  É diferente de `<div>`: `<section>` diz "isto é uma parte identificável e com sentido
  próprio do documento"; `<div>` diz apenas "isto é uma caixa, sem significado".
  - Teste prático para saber se deve ser `<section>` ou `<div>`: se o bloco tem (ou deveria
    ter) um título (`h2`, `h3`...) que descreve do que se trata, é `<section>`. Se é só um
    agrupamento visual/estrutural sem assunto próprio (por exemplo, um wrapper para
    centralizar conteúdo), é `<div>`.
- **Atributo `aria-labelledby="sobre-titulo"`**: em vez de repetir um texto num
  `aria-label`, este atributo diz "o nome acessível desta seção é o **texto de um outro
  elemento** que tem `id="sobre-titulo"`" — que é exatamente o `<h2 id="sobre-titulo">` em
  [L32].
  - Resultado: leitores de tela anunciam a seção como "Sobre esta página, região", usando o
    próprio `h2` como nome, sem duplicar o texto em um `aria-label` separado (o que criaria
    risco de os dois textos ficarem diferentes/desatualizados um dia).
  - Isso transforma `<section>` num **landmark de região nomeada**, o que só acontece
    quando ela tem um nome acessível (via `aria-label` ou `aria-labelledby`). Uma
    `<section>` sem nome ainda é válida, mas não vira uma "região" navegável separadamente
    pelo leitor de tela — funciona mais como um agrupador estrutural silencioso.

### 7.1 `<h2 id="sobre-titulo">Sobre esta página</h2>` [L32]

- Título de segundo nível, um degrau abaixo do `<h1>` [L14]. Descreve o assunto desta
  `<section>`.
- O `id="sobre-titulo"` existe só para ser referenciado pelo `aria-labelledby` do
  `<section>` pai [L31] — não é usado para nenhum link `href` nesta página.

### 7.2 Elementos de texto em linha (inline), dentro do `<p>` [L33–40]

```html
<strong>importância forte</strong>                                          [L35]
<em>ênfase</em>                                                              [L35–36]
<abbr title="Linguagem de Marcação de Hipertexto">HTML</abbr>                [L36]
<mark>marcado como destaque de busca</mark>                                 [L37]
<time datetime="2026-09-04">4 de setembro de 2026</time>                    [L38]
<code>&lt;p&gt;</code>                                                       [L39]
```

- **`<strong>`**: importância **séria** do conteúdo (um aviso, uma palavra-chave crítica).
  Leitores de tela podem alterar o tom de voz ao ler. Diferente de `<b>` (que só deixa
  negrito, sem significado) — `<strong>` carrega significado; `<b>` seria puramente visual,
  por isso não é usado nesta página sem estilo.
- **`<em>`**: **ênfase** de entonação — o tipo de destaque que, se você lesse em voz alta,
  mudaria a forma de falar aquela palavra. Diferente de `<i>` (itálico sem significado).
- **`<abbr title="...">`**: marca uma **abreviação ou sigla**. O atributo `title` fornece o
  texto por extenso.
  - Em leitores de tela configurados para expandir abreviações, "HTML" pode ser lido como
    "Linguagem de Marcação de Hipertexto". Em navegadores visuais, passar o mouse sobre a
    sigla mostra uma dica (tooltip) com o `title` — mas isso **não deve ser a única forma**
    de dar essa informação, porque tooltips de `title` não aparecem em toque (celular) nem
    são sempre lidas por leitores de tela. Ideal: usar `<abbr>` como reforço, não como única
    fonte da explicação.
- **`<mark>`**: destaque de **relevância**, tipicamente usado para simular um marca-texto —
  o caso de uso mais comum é destacar um termo buscado dentro de um resultado de busca.
  Sem `<style>`, o navegador já aplica um fundo amarelo padrão a ele (é um dos poucos
  elementos com estilo nativo visível mesmo "sem CSS nosso").
- **`<time datetime="2026-09-04">`**: marca uma **data/hora legível por máquina**.
  - O conteúdo visível ("4 de setembro de 2026") pode estar em qualquer formato amigável
    para humanos, mas o atributo `datetime` precisa seguir o formato padrão
    (`AAAA-MM-DD`, ou com hora `AAAA-MM-DDTHH:MM`), para que buscadores, agregadores de
    eventos/calendário e leitores de tela mais modernos interpretem a data corretamente,
    mesmo que o texto visível esteja escrito por extenso ou abreviado.
- **`<code>&lt;p&gt;</code>`**: marca um **trecho de código** (nome de tag, comando,
  variável). Usa fonte monoespaçada por padrão do navegador (de novo, estilo nativo, não
  nosso `<style>`).
  - `&lt;` e `&gt;` são **entidades HTML** para `<` e `>`. Precisam ser escritas assim
    porque `<` e `>` sozinhos seriam interpretados como início de uma tag — é assim que se
    escreve "o caractere menor-que" sem o navegador confundir com marcação.

### 7.3 Link externo — `<a href="https://www.w3.org/" target="_blank" rel="noopener noreferrer">` [L42]

- `href="https://www.w3.org/"`: endereço completo (absoluto) de destino, por ser um site
  externo — diferente dos links internos como `href="#sobre"` [L19], que são âncoras
  (relativas) dentro da própria página.
- `target="_blank"`: abre o link em **nova aba**.
  - Cuidado de acessibilidade: abrir em nova aba sem avisar pode confundir quem usa leitor
    de tela ou tem dificuldade cognitiva, porque o botão "voltar" do navegador para de
    funcionar como esperado. O ideal (numa página real) é avisar no próprio texto do link
    ou com um `aria-label` complementar, algo como "site do W3C (abre em nova aba)". Aqui
    deixamos simples, mas é um ponto importante para discutir em aula.
- `rel="noopener noreferrer"`: atributo de **segurança**, não de acessibilidade.
  - `noopener` impede que a nova aba aberta tenha acesso via JavaScript à aba de origem
    (evita um ataque conhecido como "reverse tabnabbing").
  - `noreferrer` evita que o site de destino receba informação de qual página o usuário
    veio.
  - Regra prática: **sempre que usar `target="_blank"`, usar também
    `rel="noopener noreferrer"`.**

---

## 8. `<article id="artigo" aria-labelledby="artigo-titulo">` [L46] … `</article>` [L76]

- `<article>` marca um conteúdo **independente e autocontido**, que faria sentido sozinho
  se fosse retirado da página e publicado em outro lugar (um post de blog, uma notícia, um
  comentário, um card de produto).
- Diferença para `<section>`: `<section>` é "uma parte temática **desta** página";
  `<article>` é "um conteúdo que se sustenta **por si só**", mesmo fora do contexto da
  página. Na dúvida, pergunte: "isso faria sentido dentro de um feed RSS ou compartilhado
  isoladamente?" Se sim, é `<article>`.
- Mesma lógica de nomeação com `aria-labelledby="artigo-titulo"` apontando para o
  `<h2 id="artigo-titulo">` [L48], igual explicado na seção 7.

### 8.1 `<header>` dentro do artigo [L47–53]

- Este é o segundo `<header>` da página (o primeiro foi o da página inteira, [L13]).
  Como está **dentro de um `<article>`**, ele não é mais o cabeçalho "da página", e sim o
  **cabeçalho deste artigo específico** — pode conter título, autor e data do artigo, como
  acontece aqui.
- Pode existir mais de um `<header>` na mesma página, desde que cada um pertença a um
  contêiner diferente (`<body>`, `<article>`, `<section>`).

#### `<address>Professor(a) da disciplina</address>` [L50]

- Marca informação de **contato do autor** do documento ou artigo (pode envolver nome,
  e-mail, link, endereço físico). Não é para endereços postais genéricos dentro de um texto
  qualquer — é especificamente para "quem é o responsável por este conteúdo, e como
  contatá-lo".
- Por padrão, navegadores renderizam `<address>` em itálico (de novo, estilo nativo).

### 8.2 `<figure>` [L60] … `</figure>` [L63]

```html
<img src="grafico-exemplo.png" alt="Gráfico de barras mostrando o aumento do uso de HTML semântico entre 2015 e 2025" width="400" height="250">   [L61]
<figcaption>Figura 1: exemplo de uso de imagem com legenda.</figcaption>                                                                            [L62]
```

- `<figure>` agrupa uma **mídia (imagem, gráfico, código, vídeo...) e sua legenda**, de
  forma que os dois sejam entendidos como uma unidade — inclusive podendo ser movida de
  lugar no texto sem quebrar o sentido (como uma figura de livro didático).
- `<figcaption>` é a legenda oficial dessa mídia — deve ficar **dentro** de `<figure>`,
  como primeiro ou último filho.
- **`<img>`** é um elemento vazio (sem tag de fechamento nem conteúdo interno).
  - `src="grafico-exemplo.png"`: caminho do arquivo de imagem.
  - `alt="Gráfico de barras mostrando..."`: **o atributo de acessibilidade mais importante
    de toda a página.** É o texto que substitui a imagem para quem não pode vê-la (leitor
    de tela, imagem que falha ao carregar, buscadores).
    - Boa prática usada aqui: o `alt` descreve **o conteúdo/informação** da imagem
      (o que o gráfico mostra), não apenas "gráfico" ou o nome do arquivo.
    - Nunca começar o `alt` com "imagem de..." ou "foto de..." — o leitor de tela já
      anuncia "imagem" antes de ler o `alt`, isso duplicaria a informação.
  - `width="400" height="250"`: dimensões **intrínsecas** da imagem, em pixels.
    - Não são estilo (não forçam o tamanho final na tela — quem faz isso é o CSS), mas
      ajudam o navegador a **reservar o espaço correto** antes da imagem carregar,
      evitando que o texto da página "pule" (mude de posição) quando a imagem termina de
      carregar. Isso é importante inclusive para quem usa zoom alto ou tem dificuldade
      motora, porque o conteúdo não se desloca embaixo do dedo/cursor no meio da leitura.

### 8.3 `<blockquote cite="...">` [L65] … `</blockquote>` [L69]

```html
<blockquote cite="https://www.w3.org/WAI/fundamentals/accessibility-intro/">   [L65]
  <p>Acessibilidade na web significa que...</p>                                [L66–67]
  <footer>— <cite>W3C Web Accessibility Initiative</cite></footer>             [L68]
</blockquote>
```

- `<blockquote>` marca uma **citação longa**, em bloco (diferente de `<q>`, que seria uma
  citação curta em linha, dentro de uma frase).
  - `cite="URL"`: atributo (não visível) que indica **de onde** veio a citação. Não deve
    ser confundido com a tag `<cite>` usada logo abaixo — são conceitos parecidos, mas um é
    atributo (a fonte, como URL, invisível) e o outro é elemento (o nome da obra/autor,
    visível).
- `<footer>` aqui, **dentro do `<blockquote>`**, não é o rodapé da página (que veremos em
  [L194]) — é o rodapé **daquele bloco de citação**, contendo a atribuição de quem disse a
  frase. Mesmo princípio do `<header>` explicado na seção 8.1: o significado de `<header>`/
  `<footer>` depende do contêiner em que estão.
- `<cite>W3C Web Accessibility Initiative</cite>`: marca o **título da obra ou o nome da
  fonte** referenciada (um livro, um artigo, uma organização citada) — diferente de
  `<address>`, que seria para quem é o autor/contato deste documento atual.

### 8.4 `<details>` [L71] … `</details>` [L75]

```html
<details>
  <summary>Clique para ver uma observação extra</summary>   [L72]
  <p>O elemento <code>details</code> cria um widget...</p>  [L73–74]
</details>
```

- `<details>` cria um widget nativo de **expandir/recolher** (um "acordeão" simples), sem
  precisar de nenhum JavaScript.
- `<summary>` é o **único filho obrigatório e sempre visível**: o texto/rótulo clicável que
  controla a abertura e o fechamento. Se `<summary>` for omitido, o navegador cria um texto
  padrão genérico ("Details"/"Detalhes").
- Acessibilidade "de fábrica": o navegador já cuida do papel ARIA (`role="group"` no
  conteúdo, `aria-expanded` no `<summary>`), do foco por teclado e da tecla Enter/Espaço
  para abrir/fechar — é um ótimo exemplo de como escolher a tag certa **evita** ter que
  recriar comportamento de acessibilidade na mão com JavaScript e ARIA manual.

---

## 9. Tabela — `<table>` [L80] … `</table>` [L108]

```html
<table>
  <caption>Uso de tags semânticas por turma (dado fictício)</caption>   [L81]
  <thead>                                                               [L82]
    <tr>
      <th scope="col">Turma</th>                                        [L84]
      <th scope="col">Alunos</th>                                       [L85]
      <th scope="col">Usa tags semânticas?</th>                         [L86]
    </tr>
  </thead>
  <tbody>                                                                [L89]
    <tr>
      <th scope="row">Turma A</th>                                      [L91]
      <td>32</td>                                                       [L92]
      <td>Sim</td>                                                      [L93]
    </tr>
    ...
  </tbody>
  <tfoot>                                                                [L101]
    <tr><td>Total</td><td>60</td><td>—</td></tr>                        [L102–106]
  </tfoot>
</table>
```

- `<table>` deve ser usado **só para dados tabulares de verdade** (linhas e colunas com
  relação entre si), nunca para "organizar o layout da página" como se fazia nos anos 2000
  — isso quebra completamente a navegação por leitor de tela, que passa a anunciar
  "tabela", "linha 1 de 40", etc. para o que deveria ser um layout comum.
- `<caption>`: o **título da tabela**. Deve ser o primeiro filho de `<table>`. É lido pelo
  leitor de tela assim que entra na tabela, e ajuda a pessoa a decidir se vale a pena
  continuar explorando aquela tabela.
- `<thead>`, `<tbody>`, `<tfoot>`: dividem a tabela em **cabeçalho**, **corpo** e **rodapé**
  de dados. Isso não é obrigatório para a tabela funcionar, mas ajuda leitores de tela e
  navegadores a diferenciar "isto é o título das colunas" de "isto são os dados", e permite
  ao CSS (no futuro) estilizar essas partes separadamente (por exemplo, congelar o
  cabeçalho ao rolar uma tabela longa).
- `<tr>` = linha da tabela (table row).
- `<th scope="col">` vs `<td>`:
  - `<th>` = célula de **cabeçalho** (title/header) de linha ou coluna — carrega
    significado, não é só "célula em negrito".
  - `<td>` = célula de **dado** comum (table data).
  - **`scope="col"`** [L84–86]: diz que este `<th>` é o cabeçalho de **toda a coluna**
    abaixo dele. **`scope="row"`** [L91, L96]: diz que este `<th>` é o cabeçalho de **toda
    a linha** à direita dele (aqui, o nome da turma é o cabeçalho da linha).
  - Por que isso importa: um leitor de tela navegando célula por célula anuncia, por
    exemplo, "32, Alunos, Turma A" — relacionando automaticamente cada dado com o
    cabeçalho da coluna **e** com o cabeçalho da linha (`scope="row"`), graças a esses
    atributos. Sem `scope`, numa tabela grande, a pessoa perde a relação entre a célula e
    o que ela representa depois de rolar a tela.
  - Se toda a tabela fosse só `<td>`, ela seria visualmente parecida (mesmo sem estilo,
    aliás — repare que o navegador já deixa `<th>` em negrito e centralizado por padrão),
    mas semanticamente cega: um leitor de tela não teria como saber quais células são
    cabeçalho.

---

## 10. Formulário — `<form action="/enviar" method="post" novalidate>` [L113] … `</form>` [L151]

- `<form>` agrupa **campos de entrada de dados** que serão enviados juntos.
  - `action="/enviar"`: endereço para onde os dados seriam enviados ao submeter (aqui é só
    ilustrativo, não existe de verdade nesta página de estudo).
  - `method="post"`: verbo HTTP usado no envio. `post` é o padrão para formulários que
    criam/alteram dados no servidor (diferente de `get`, que exporia os dados na URL — não
    apropriado para um e-mail, por exemplo).
  - `novalidate`: desliga a validação automática do navegador (aquelas mensagens padrão
    tipo "Preencha este campo"). Colocado aqui de propósito para deixar claro que os
    atributos `required` [L119] continuam existindo no HTML e continuam sendo lidos por
    tecnologia assistiva, mesmo que o **navegador** não bloqueie mais o envio sozinho —
    numa aplicação real, `novalidate` normalmente vem acompanhado de validação
    personalizada via JavaScript, que não existe aqui.

### 10.1 `<fieldset>` [L114] e `<legend>Dados pessoais</legend>` [L115]

- `<fieldset>` agrupa **campos relacionados** de um formulário (aqui, todos os dados
  pessoais). `<legend>` é o **título obrigatório** desse grupo, deve ser o primeiro filho.
- Acessibilidade: quando um leitor de tela entra em qualquer campo dentro do `<fieldset>`,
  ele anuncia o texto do `<legend>` junto com o rótulo do campo — por exemplo, ao focar o
  campo "Nome completo", pode anunciar algo como "Dados pessoais, Nome completo, editar
  texto". Isso dá contexto extra em formulários longos com vários grupos.

### 10.2 Padrão repetido: `<div>` + `<label for="...">` + `<input id="...">` [L117–120]

```html
<div>
  <label for="nome">Nome completo</label>
  <input type="text" id="nome" name="nome" autocomplete="name" required aria-required="true">
</div>
```

- **`<div>` aqui é o uso correto de `<div>`**: é só um agrupador visual/estrutural sem
  nenhum significado próprio (não é uma seção do documento, não é um artigo, não é nada
  "temático") — serve para juntar rótulo + campo como uma unidade, útil principalmente
  quando `<style>` entrar em cena. Isso reforça a diferença já vista na seção 7: quando não
  há um "assunto" a nomear, `<div>` é a escolha certa, não `<section>`.
- **`<label for="nome">`**: rótulo do campo. O atributo `for="nome"` precisa bater
  exatamente com o `id="nome"` do `<input>` correspondente [L119].
  - Esse vínculo é o que faz o leitor de tela anunciar "Nome completo, editar texto" ao
    focar o campo, em vez de anunciar só "editar texto" sem dizer do que se trata.
  - Também aumenta a **área clicável**: clicar no próprio texto "Nome completo" já foca o
    campo — bom para quem tem dificuldade motora de mirar num alvo pequeno.
  - Sem `<label>` associado (por exemplo, usando só um `<p>` ou texto solto antes do
    `<input>`), o campo fica "mudo" para quem usa leitor de tela.
- **`<input type="text">`**: campo de texto simples de uma linha.
  - `id="nome"`: âncora para o `<label for="nome">`.
  - `name="nome"`: nome da variável que seria enviada ao servidor no `action` do `<form>`
    — diferente do `id`, que serve para relações dentro da própria página (label, ARIA,
    links).
  - `autocomplete="name"`: diz ao navegador **que tipo de informação** é esse campo, para
    ele oferecer autopreenchimento (nome salvo do usuário). Isso também ajuda pessoas com
    deficiência cognitiva ou motora, que digitam com mais dificuldade e se beneficiam de
    preencher menos campos manualmente.
  - `required`: atributo HTML nativo que marca o campo como **obrigatório**.
  - `aria-required="true"`: reforço para tecnologia assistiva mais antiga, que podia não
    reconhecer bem o `required` nativo sozinho. Hoje em navegadores modernos o `required`
    já é suficiente e já expõe `aria-required` automaticamente na árvore de acessibilidade,
    mas é comum (e não prejudica) ver os dois juntos, principalmente em formulários que
    precisam ter compatibilidade ampla.

### 10.3 Campo de e-mail com ajuda — [L122–126]

```html
<label for="email">E-mail</label>
<input type="email" id="email" name="email" autocomplete="email" required aria-describedby="email-ajuda">
<small id="email-ajuda">Usaremos o e-mail só para responder sua dúvida.</small>
```

- `type="email"`: além de ativar validação básica de formato (precisa ter `@`), em
  celulares faz o teclado virtual mostrar `@` e `.com` com mais destaque — um ganho de
  usabilidade para todo mundo, não só para quem usa tecnologia assistiva.
- **`aria-describedby="email-ajuda"`**: diferente de `aria-labelledby` (que **nomeia** o
  elemento, visto em [L31]), `aria-describedby` associa uma **descrição/ajuda adicional**
  que é lida **depois** do nome e do tipo do campo. Aqui aponta para o
  `<small id="email-ajuda">`.
  - Resultado: o leitor de tela anuncia algo como "E-mail, editar texto, obrigatório,
    Usaremos o e-mail só para responder sua dúvida." — a pessoa ouve a instrução de ajuda
    sem precisar procurar por ela na tela.
  - Sem esse atributo, o texto de ajuda em `<small>` existiria visualmente, mas ficaria
    "solto", sem garantia de ser associado ao campo certo por quem não vê a proximidade
    visual entre os dois elementos.
- **`<small id="email-ajuda">`**: `<small>` marca um texto de natureza secundária — letras
  miúdas, avisos legais, ajuda complementar. Não é "deixar a fonte menor" (isso seria
  estilo); é dizer "este texto tem peso menor de importância que o texto principal ao
  redor" — o tamanho reduzido que o navegador aplica por padrão é só uma consequência
  visual comum dessa semântica.

### 10.4 `<select>` [L130] e `<option>` [L131–134]

```html
<label for="assunto">Assunto</label>
<select id="assunto" name="assunto">
  <option value="">Selecione uma opção</option>
  <option value="duvida">Dúvida</option>
  <option value="elogio">Elogio</option>
  <option value="problema">Problema técnico</option>
</select>
```

- `<select>` cria uma **lista suspensa** nativa, totalmente acessível por teclado (setas
  para navegar, digitar a primeira letra para pular até uma opção) sem nenhum código
  extra.
- Cada `<option value="...">` é uma opção.
  - `value=""` na primeira opção ("Selecione uma opção"): um valor vazio de propósito, para
    representar "nenhuma opção real escolhida ainda" — evita que o formulário seja enviado
    com "Dúvida" selecionado por padrão sem o usuário ter escolhido conscientemente.
  - O `value` de cada opção (`duvida`, `elogio`, `problema`) é o que seria enviado ao
    servidor; o **texto entre as tags** (`Dúvida`, `Elogio`...) é o que a pessoa vê e o
    leitor de tela lê.

### 10.5 `<textarea rows="4" cols="30">` [L140]

- Campo de texto de **múltiplas linhas** (mensagem longa).
  - `rows="4"`: altura inicial visível, em número de linhas de texto.
  - `cols="30"`: largura inicial, em número aproximado de caracteres por linha.
  - Repare: mesmo sem `<style>`, o `<textarea>` já nasce com essas dimensões — não é CSS,
    são atributos HTML nativos do próprio elemento.

### 10.6 Checkbox — [L143–146]

```html
<div>
  <input type="checkbox" id="termos" name="termos" required aria-required="true">
  <label for="termos">Li e aceito os termos de uso</label>
</div>
```

- `type="checkbox"`: caixa de marcação (verdadeiro/falso), diferente de `type="radio"`
  (escolha única dentro de um grupo, não usado nesta página, mas vale mencionar em aula por
  contraste).
- Mesmo padrão de `<label for="termos">` ligado ao `id="termos"` — aqui inclusive é
  especialmente importante, porque o **alvo de clique** de uma checkbox costuma ser
  pequeno; com o `<label>` associado, clicar no texto "Li e aceito os termos de uso"
  também marca a caixa, ajudando qualquer pessoa com precisão motora reduzida.
- Note que aqui o `<label>` vem **depois** do `<input>`, diferente dos campos anteriores
  onde vem **antes** — os dois formatos são válidos, o vínculo é feito pelo par
  `for`/`id`, não pela ordem.

### 10.7 `<button type="submit">Enviar mensagem</button>` [L150]

- `<button>` é o elemento correto para ações clicáveis — diferente de usar um `<div>` ou um
  `<a>` sem `href` "fingindo" ser botão (erro comum). Só `<button>` (ou `<input
  type="submit">`) recebe automaticamente: foco por Tab, ativação por Enter **e** por
  Espaço, e o papel ARIA `button` — tudo de graça, sem escrever nenhum atributo ARIA.
- `type="submit"`: diz que este botão **envia o formulário** em que está inserido. Existe
  também `type="button"` (não envia nada, usado com JavaScript) e `type="reset"` (limpa o
  formulário) — em botões dentro de `<form>`, é uma boa prática **sempre** declarar o
  `type` explicitamente, porque o padrão de `<button>` sem `type` dentro de um `<form>` é
  `submit`, o que já pode gerar envios acidentais em botões que deveriam só abrir um menu,
  por exemplo.

---

## 11. Listas — `<section id="listas">` [L154] … `</section>` [L178]

### 11.1 `<h3>` [L157, L164, L171]

- Um nível abaixo do `<h2 id="listas-titulo">` [L155], usado para os subtítulos "Lista não
  ordenada", "Lista ordenada", "Lista de definição" — mantendo a hierarquia sem pular
  nível (h1 → h2 → h3).

### 11.2 `<ul>` [L158] — lista não ordenada

- Usada quando a **ordem dos itens não importa** para o sentido (aqui: Semântica,
  Acessibilidade, Estrutura — poderia estar em qualquer ordem sem mudar o significado).
  Cada `<li>` é um item.

### 11.3 `<ol>` [L165] — lista ordenada

- Usada quando a **ordem importa** (aqui: um passo a passo — "Planejar", depois "Testar",
  depois "Só então pensar em estilo"). O navegador numera automaticamente (1, 2, 3...),
  sem precisar digitar os números manualmente no texto — o que também garante que a
  numeração fique sempre correta se um item for adicionado ou removido depois.

### 11.4 `<dl>` [L172] — lista de definição

```html
<dl>
  <dt>Tag semântica</dt>
  <dd>Elemento HTML que descreve o significado do conteúdo, não sua aparência.</dd>
  <dt>ARIA</dt>
  <dd>Conjunto de atributos que reforça a acessibilidade quando o HTML puro não é suficiente.</dd>
</dl>
```

- `<dl>` (description list) agrupa pares de **termo e definição/descrição**.
  - `<dt>` = termo (description term).
  - `<dd>` = definição/descrição daquele termo (description details).
- Uso típico: glossários, listas de perguntas e respostas, pares chave-valor (como um
  cartão de especificações técnicas). Diferente de `<ul>`/`<ol>`, aqui cada item **não** é
  independente — tem uma relação de "isto define/descreve aquilo".

---

## 12. Imagem decorativa vs. imagem informativa — `<section id="midia">` [L180] … `</section>` [L184]

```html
<img src="logo-escola.png" alt="Logotipo da escola" width="120" height="120">   [L182]
<img src="linha-decorativa.png" alt="" role="presentation">                     [L183]
```

- A primeira imagem [L182] é **informativa**: o logotipo representa a identidade da escola,
  por isso tem um `alt` descritivo curto ("Logotipo da escola").
- A segunda imagem [L183] é **puramente decorativa** (uma linha decorativa, sem
  informação nenhuma). Aqui o correto é:
  - **`alt=""`** (vazio, mas presente): diz explicitamente "esta imagem não tem informação,
    pode ser ignorada" — o leitor de tela simplesmente pula essa imagem em silêncio.
  - Isso é bem diferente de **esquecer** o `alt` (não escrever o atributo). Sem `alt`
    nenhum, alguns leitores de tela leem o **nome do arquivo** (`linha-decorativa.png`) em
    voz alta, o que é confuso e inútil.
  - **`role="presentation"`**: reforça para a árvore de acessibilidade que esta imagem é
    puramente de apresentação/decoração, sem papel semântico de "imagem" — redundante com
    o `alt=""` na prática (o `alt=""` sozinho já basta na maioria dos casos), mas é comum
    ver os dois juntos, e vale mostrar em aula como exemplo de atributo ARIA (`role`) que
    **remove** um significado, em vez de adicionar.

---

## 13. `<aside aria-label="Conteúdo relacionado">` [L186] … `</aside>` [L190]

- `<aside>` marca conteúdo **relacionado, mas não essencial** ao entendimento do conteúdo
  principal — uma curiosidade, um destaque, um link relacionado, uma barra lateral. Se você
  removesse o `<aside>` inteiro, o restante da página ainda faria sentido completo.
  - Diferente de `<section>`: `<section>` é parte do assunto principal; `<aside>` é um
    "parêntese" à parte.
- `aria-label="Conteúdo relacionado"` nomeia esta região da mesma forma que
  `aria-label="Navegação principal"` nomeou o `<nav>` em [L17] — aqui usamos `aria-label`
  direto (texto fixo) em vez de `aria-labelledby` (apontando para um `h2`) só para mostrar
  as duas formas possíveis; ambas são válidas, a escolha depende se o texto do nome já
  existe visualmente em algum título (aí prefira `aria-labelledby`, como fizemos nas
  seções) ou se você precisa de um nome que não aparece na tela (aí use `aria-label`,
  como aqui).

---

## 14. `<footer>` [L194] … `</footer>` [L196] — rodapé da página

```html
<footer>
  <p>&copy; <time datetime="2026">2026</time> Aula de HTML Semântico. Todos os direitos reservados.</p>
</footer>
```

- Assim como o `<header>` da seção 5, o significado de `<footer>` depende de onde ele está:
  como filho direto do `<body>` (fora de qualquer `<article>`/`<section>`), este é o
  **rodapé da página inteira** — landmark "contentinfo" para leitores de tela, que permite
  pular direto para "informações de rodapé" (créditos, copyright, links legais).
  Compare com o `<footer>` de dentro do `<blockquote>` em [L68], que era só o rodapé
  daquela citação.
- **`&copy;`**: entidade HTML para o símbolo `©`. Usar a entidade (em vez de colar o
  caractere `©` direto no arquivo) evita problemas de codificação em editores/sistemas que
  não lidam bem com certos caracteres especiais — mesma lógica do `&lt;`/`&gt;` vistos na
  seção 7.2, embora aqui não seja estritamente necessário (o `©` funcionaria também, já que
  o arquivo é UTF-8), é uma boa prática comum.
- `<time datetime="2026">2026</time>`: mesmo elemento visto em [L38] e [L51], aqui marcando
  só o ano, com `datetime="2026"` (formato reduzido, só ano, também válido pela
  especificação).

---

## 15. Resumo — tabela de decisão rápida

Use esta tabela como cola de consulta rápida durante a aula.

| Preciso de... | Use | Nunca use só por causa de... |
|---|---|---|
| Cabeçalho da página inteira | `<header>` (filho do `<body>`) | tamanho/posição visual |
| Cabeçalho de um bloco específico | `<header>` dentro do `<article>`/`<section>` | — |
| Menu de navegação | `<nav>` + `<ul>`/`<li>` | os links "ficarem em linha" (isso é CSS) |
| Bloco temático desta página | `<section>` (com título) | precisar "dar espaço"/organizar visual |
| Conteúdo independente/publicável sozinho | `<article>` | — |
| Conteúdo relacionado, dispensável | `<aside>` | "fica bonito do lado" |
| Agrupamento sem significado próprio | `<div>` | preguiça de pensar no elemento certo |
| Destaque de peso/seriedade | `<strong>` | deixar em **negrito** (isso é `<b>`, sem significado) |
| Destaque de entonação | `<em>` | deixar em *itálico* (isso é `<i>`, sem significado) |
| Texto pequeno/secundário | `<small>` | só "diminuir a fonte" |
| Dado tabular de verdade | `<table>` + `<th scope>` | organizar layout de página |
| Ação clicável | `<button>` | `<div onclick>` ou `<a>` sem `href` |
| Rótulo de campo de formulário | `<label for="id">` | um `<p>` ou texto solto antes do campo |
| Imagem com informação | `<img alt="descrição do conteúdo">` | `alt` vazio ou ausente |
| Imagem só decorativa | `<img alt="">` (+ `role="presentation"`) | um `alt` "chutado" tipo "imagem1" |

---

## 16. O que vem depois

Esta página é o "ponto zero": puro HTML, sem nenhuma tag `<style>`, sem `style=""`, sem CSS
externo — de propósito, para fixar que **cada tag e atributo aqui já carrega significado e
acessibilidade antes de qualquer cor, fonte ou espaçamento**. Na próxima etapa da aula,
vamos abrir a tag `<style>` na mesma página e começar a estilizar, discutindo, elemento por
elemento, como uma boa estilização **reforça** a semântica em vez de escondê-la ou
contradizê-la (por exemplo: nunca remover o contorno de foco do teclado sem substituí-lo por
outro indicador visível — um erro de CSS clássico que quebra a acessibilidade que o HTML,
sozinho, já garantia).
