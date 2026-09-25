# Tela de Login — HTML + CSS puro (explicação linha a linha)

Arquivos explicados:

- [login.html](login.html): a estrutura da página
- [login-style.css](login-style.css): a aparência da página

A versão feita com Tailwind CSS está em [tailwind/](tailwind/) e tem a sua própria explicação em [tailwind/EXPLICACAO-TAILWIND.md](tailwind/EXPLICACAO-TAILWIND.md).

---

## Parte 1: o HTML linha a linha

```html
<!DOCTYPE html>
```
**Linha 1: declaração de tipo do documento.** Diz ao navegador: "isto é HTML5". Sem ela, o navegador entra no *quirks mode* (modo de compatibilidade com páginas dos anos 90), e várias regras de CSS passam a funcionar de forma diferente, como o cálculo de largura, altura e alinhamento. **Sempre coloque na primeira linha.**

```html
<html lang="en">
```
**Linha 2: elemento raiz.** Tudo na página fica dentro dele.
- **`lang="en"`**: informa o idioma do conteúdo. Leitores de tela usam esse valor para escolher a pronúncia, o Google usa para indexar e o navegador usa para oferecer tradução.
  - ⚠️ **Problema de usabilidade/acessibilidade:** o texto da página está em português, mas o `lang` diz inglês. Um leitor de tela vai ler "Entrar" com sotaque inglês. O correto seria **`lang="pt-BR"`** (na versão Tailwind isso já foi corrigido).

```html
<head>
```
**Linha 3: cabeçalho do documento.** Guarda informações **sobre** a página (metadados, título, CSS). Nada aqui aparece no corpo da página.

```html
<meta charset="UTF-8">
```
**Linha 4: codificação de caracteres.**
- **`charset="UTF-8"`**: define como os bytes do arquivo viram letras. O UTF-8 suporta acentos (é, ç, ã) e símbolos (como os `••••` do placeholder). Sem essa linha, "Esqueci" continuaria certo, mas "Acesse sua conta" poderia aparecer com caracteres estranhos em algumas palavras acentuadas.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
**Linha 5: configuração para celular.**
- **`name="viewport"`**: diz que essa meta tag trata da "janela" de visualização.
- **`content="width=device-width, initial-scale=1.0"`**:
  - `width=device-width`: a largura da página é a largura real da tela do aparelho. Sem isso, o celular finge ter cerca de 980px de largura e mostra tudo minúsculo.
  - `initial-scale=1.0`: começa sem zoom (100%).
- **Sem essa linha, nenhum layout responsivo funciona no celular.**

```html
<link rel="stylesheet" href="login-style.css">
```
**Linha 6: liga o arquivo CSS ao HTML.**
- **`rel="stylesheet"`**: *relationship* (relação). Diz que o arquivo ligado é uma folha de estilos.
- **`href="login-style.css"`**: o caminho do arquivo. É um **caminho relativo**, ou seja, o navegador procura na mesma pasta do HTML. Se o CSS estivesse em uma pasta `css/`, seria `href="css/login-style.css"`.

```html
<title>Document</title>
```
**Linha 7: título da aba do navegador.** Também aparece nos favoritos e no resultado do Google.
- ⚠️ "Document" é o texto padrão do VS Code. O ideal é algo descritivo, como `Entrar | Nome do Sistema`. Leitores de tela anunciam o título ao abrir a página.

```html
</head>
<body>
```
**Linhas 8–9:** fecha o cabeçalho e abre o **corpo**, que é tudo o que aparece na tela.

```html
<form class="login-card">
```
**Linha 10: formulário.** Agrupa campos que serão enviados juntos.
- **`class="login-card"`**: dá um "nome" ao elemento para o CSS encontrar ele (`.login-card { ... }`). Uma classe pode ser usada em **vários** elementos. Se fosse único, poderia ser um `id`.
- Atributos que o `<form>` normalmente teria (e que ainda não estão aqui):
  - `action="/login"`: para onde os dados vão.
  - `method="post"`: como são enviados. Senha **sempre** vai com `post`, porque `get` coloca a senha na URL.
  - Sem `action`, o formulário envia para a própria página.

```html
<h1>Entrar</h1>
```
**Linha 12: título principal (heading nível 1).** Deve existir **um `h1` por página**. Leitores de tela permitem pular de título em título, então a hierarquia `h1 > h2 > h3` importa para a acessibilidade, não só para o visual.

```html
<p>Acesse sua conta para continuar.</p>
```
**Linha 13: parágrafo.** Texto de apoio. O navegador aplica margem em cima e embaixo por padrão (`1em`).

```html
<label for="email">E-mail</label>
```
**Linha 15: rótulo do campo.**
- **`for="email"`**: liga o rótulo ao campo que tem `id="email"`. Isso faz duas coisas:
  1. **Clicar no texto "E-mail" coloca o cursor no campo.** A área de clique fica maior, o que é ótimo no celular (isso é usabilidade).
  2. O leitor de tela lê "E-mail, campo de edição" quando o usuário entra no campo (isso é acessibilidade).
- O valor de `for` **tem que ser igual** ao `id` do input, letra por letra.

```html
<input
  type="email"
  id="email"
  placeholder="voce@email.com"
  required>
```
**Linhas 16–20: campo de texto.** A tag `<input>` não tem fechamento (é um *void element*). Os atributos podem ficar em linhas separadas para facilitar a leitura.
- **`type="email"`**: o tipo muda **tudo**:
  - No celular, abre o teclado com `@` e `.com`.
  - O navegador valida o formato (`abc` sem `@` é recusado no envio).
  - Outros tipos úteis: `text`, `password`, `number`, `tel`, `date`, `search`.
- **`id="email"`**: identificador **único** na página. Serve para o `label for`, para o JavaScript (`document.getElementById('email')`) e para links âncora (`#email`).
- **`placeholder="voce@email.com"`**: texto de exemplo, em cinza, que some quando o usuário digita.
  - ⚠️ **O placeholder não substitui o label.** Ele desaparece ao digitar, então o usuário esquece o que era o campo, e o contraste costuma ser baixo. Use-o só como **exemplo** de formato, como está sendo feito aqui.
- **`required`**: atributo **booleano**. Basta existir, não precisa de valor. O navegador bloqueia o envio se o campo estiver vazio e mostra uma mensagem.
- Atributo recomendado que falta: **`name="email"`**. Sem `name`, **o valor não é enviado** pelo formulário. O `id` serve para o HTML e o CSS; o `name` serve para o servidor.
- Também seria bom `autocomplete="email"`, para o navegador sugerir o e-mail salvo.

```html
<label for="senha">Senha</label>
```
**Linha 22:** mesmo papel do label anterior, agora ligado ao `id="senha"`.

```html
<input
  type="password"
  id="senha"
  placeholder="••••••••"
  required>
```
**Linhas 23–27: campo de senha.**
- **`type="password"`**: esconde os caracteres digitados (mostra bolinhas) e avisa gerenciadores de senha que esse campo é uma senha.
- **`id="senha"`**: liga o campo ao label.
- **`placeholder="••••••••"`**: só decorativo, indica que ali vai algo escondido.
- **`required`**: campo obrigatório.
- Recomendados: `name="senha"` e `autocomplete="current-password"`.

```html
<button type="submit">Entrar</button>
```
**Linha 29: botão.**
- **`type="submit"`**: ao clicar (ou apertar **Enter** em qualquer campo), o formulário é validado (`required`, `type="email"`) e enviado.
  - Outros valores: `type="button"` (não faz nada sozinho, usado com JavaScript) e `type="reset"` (limpa o formulário, e quase nunca é uma boa ideia).
  - Dentro de um `<form>`, um `<button>` sem `type` vira `submit` por padrão. Escrever o tipo deixa a intenção clara.

```html
<a href="#">Esqueci minha senha</a>
```
**Linha 30: link.**
- **`href="#"`**: destino do link. `#` significa "topo desta mesma página", ou seja, é um link provisório. Em produção seria `href="/recuperar-senha"`.
- Regra: **`<a>` leva para outro lugar e `<button>` executa uma ação.** "Esqueci minha senha" leva para outra página, então `<a>` é a tag certa.

```html
</form>
</body>
</html>
```
**Linhas 32–34:** fecham formulário, corpo e documento.

---

## Parte 2: o CSS linha a linha

### Anatomia de uma regra CSS

```css
.login-card input:focus {   /* ← SELETOR: "quem" vai receber o estilo */
  border-color: #1E4B41;    /* ← DECLARAÇÃO = propriedade: valor; */
}
```
- **`.algo`** seleciona uma classe, **`#algo`** seleciona um id e **`algo`** seleciona uma tag.
- **`A B`** (com espaço) é o **seletor descendente**: "B que está dentro de A".
- **`:focus`, `:hover`** são **pseudo-classes**, ou seja, um *estado* do elemento.

---

### Bloco 1: `.login-card` (o cartão / formulário)

```css
.login-card {
```
Seleciona todo elemento com `class="login-card"`, que aqui é o `<form>`.

```css
  max-width: 340px;
```
**Largura máxima.** O cartão pode ser **menor** que 340px (no celular estreito ele encolhe), mas **nunca maior**.
- **Por que `max-width` e não `width`?**
  - `width: 340px` é **fixo**. Em uma tela de 320px, o cartão estoura e aparece uma barra de rolagem horizontal.
  - `max-width: 340px` é **flexível até um limite**. Ele ocupa 100% do espaço disponível até chegar a 340px.
  - **Regra prática:** para contêineres de conteúdo, use `max-width`. Use `width` fixo só para coisas que **não podem** mudar de tamanho, como um ícone de 24px ou um avatar.
- **Por que `px` aqui?** Um formulário de login tem um tamanho "confortável" conhecido. Alternativas:
  - `max-width: 22rem`: acompanha o tamanho de fonte que o usuário configurou no navegador. É melhor para acessibilidade.
  - `max-width: 90%`: relativo ao elemento pai.

```css
  margin: 40px auto;
```
**Margem externa** (espaço **fora** da borda, entre o cartão e os vizinhos).
- Com dois valores, o formato é `margin: [cima e baixo] [esquerda e direita]`.
  - `40px` em cima e embaixo afasta o cartão do topo da tela.
  - `auto` nas laterais faz o navegador dividir o espaço sobrando igualmente entre esquerda e direita, o que **centraliza horizontalmente**.
- ⚠️ `margin: auto` só centraliza se o elemento for bloco **e tiver largura menor que o pai** (por isso o `max-width` é necessário).
- ⚠️ `margin: auto` **não** centraliza na vertical em um bloco normal. Para centralizar na vertical, use flexbox/grid no pai (veja a Parte 3).
- Formatos de margem:
  - `margin: 10px` → os 4 lados
  - `margin: 10px 20px` → vertical | horizontal
  - `margin: 10px 20px 30px` → cima | laterais | baixo
  - `margin: 10px 20px 30px 40px` → cima | direita | baixo | esquerda (sentido horário)

```css
  padding: 28px;
```
**Espaçamento interno** (espaço **dentro** da borda, entre a borda e o conteúdo). Os 4 lados recebem 28px.
- **Margin vs padding:**
  - `padding` fica **dentro** do elemento: pega a cor de fundo e é clicável.
  - `margin` fica **fora**: é transparente e separa um elemento do outro.
  - Quer "respiro" dentro do cartão branco? Use `padding`. Quer afastar o cartão de outra coisa? Use `margin`.

```css
  background: #fff;
```
**Cor de fundo** branca. `#fff` é a forma curta de `#ffffff` (vermelho=ff, verde=ff, azul=ff, tudo no máximo, ou seja, branco).
- `background` é um *atalho* (shorthand) que também aceita imagem, posição e repetição. Para definir só a cor, `background-color` é mais explícito.

```css
  border-radius: 10px;
```
**Arredonda os cantos** com raio de 10px. `50%` transforma um quadrado em círculo (útil para avatares).

```css
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
```
**Sombra.** Formato: `deslocamento-X deslocamento-Y desfoque cor`.
- `0`: não desloca para os lados.
- `8px`: desloca 8px para baixo, como se a luz viesse de cima.
- `24px`: desfoque grande, o que deixa a sombra suave.
- `rgba(0,0,0,.12)`: preto com **12% de opacidade**. O `a` de `rgba` é *alpha* (transparência, de 0 a 1).
- Resultado: o cartão parece "flutuar" sobre a página. Sombras sutis (opacidade baixa e desfoque alto) parecem mais modernas do que sombras escuras e duras.

```css
  display: flex;
```
**Transforma o cartão em um contêiner flexbox.** Os filhos diretos (h1, p, labels, inputs, botão, link) viram *flex items* e passam a ser organizados pelas regras do flex.
- Valores comuns de `display`:
  - `block`: ocupa a linha inteira e empilha (div, p, h1, form).
  - `inline`: fica no meio do texto e **ignora** width/height e margem vertical (a, span, label).
  - `inline-block`: fica em linha, mas aceita width/height.
  - `flex`: organiza os filhos em **uma direção** (linha **ou** coluna).
  - `grid`: organiza os filhos em **duas direções** (linhas **e** colunas).
  - `none`: esconde o elemento, que deixa de ocupar espaço.

```css
  flex-direction: column;
```
**Direção do eixo principal**: coluna, então os itens ficam **um embaixo do outro**.
- Padrão: `row` (um ao lado do outro).
- **Efeito importante aqui:** em coluna, o padrão `align-items: stretch` faz cada filho **esticar até a largura toda do cartão**. É por isso que os inputs e o botão ocupam 100% da largura **sem precisar de `width: 100%`**. O `<label>` e o `<a>`, que normalmente são inline, também viram itens de linha inteira.

```css
  gap: 10px;
```
**Espaço entre os itens** do flex (ou grid). Coloca 10px **entre** cada filho, mas não antes do primeiro nem depois do último.
- **Por que `gap` e não `margin-bottom` em cada item?** Com margem, o último item ficaria com espaço sobrando, e seria preciso lembrar de colocar margem em cada novo elemento. O `gap` é responsabilidade do **pai**, então fica em um lugar só.

```css
}
```

---

### Bloco 2: `.login-card label`

```css
.login-card label {
```
Seletor descendente: **todo `<label>` que está dentro de `.login-card`.** Labels fora do cartão não são afetados. Isso evita "vazar" estilo para outras partes do site.

```css
  font-size: 13px;
```
**Tamanho da fonte** do rótulo: menor que o texto normal (16px no padrão do navegador), para ficar como um texto de apoio.
- **px vs rem vs em:**
  - `px` é **absoluto**. Se o usuário aumentar a fonte padrão do navegador (comum para quem tem baixa visão), o texto **não** cresce.
  - `rem` é relativo à fonte do `<html>` (normalmente 16px). `13px ≈ 0.8125rem`. Esse texto **cresce** junto com a preferência do usuário, então é **recomendado para textos**.
  - `em` é relativo à fonte do **elemento pai**. Útil para componentes que escalam juntos, mas pode "acumular" em elementos aninhados.

```css
  font-weight: 600;
```
**Espessura da fonte.** Vai de `100` (fina) a `900` (preta). `400` = normal, `700` = bold. `600` (semi-bold) destaca o rótulo sem ficar pesado.
- Só funciona se a fonte tiver esse peso. Senão, o navegador arredonda para o mais próximo.

```css
  margin-top: 8px;
```
**Margem só em cima.** Junto com o `gap: 10px`, o rótulo fica com 18px de distância do elemento de cima. Isso **agrupa visualmente** cada label com o input **de baixo** (lei da proximidade, da Gestalt): o usuário entende na hora que "E-mail" pertence ao campo abaixo e não ao de cima.
- Existe `margin-top`, `margin-right`, `margin-bottom` e `margin-left`. O mesmo vale para `padding-*`.

---

### Bloco 3: `.login-card input`

```css
.login-card input {
  padding: 10px 12px;
```
10px em cima/embaixo e 12px nas laterais. Aumenta a **área de toque**. Recomendação de usabilidade: alvos de toque com pelo menos cerca de **44px** de altura no celular.

```css
  border: 1px solid #d8d0be;
```
**Borda**, no formato `espessura estilo cor`.
- `1px`: fina.
- `solid`: linha contínua (outros estilos: `dashed` tracejada, `dotted` pontilhada, `none`).
- `#d8d0be`: bege acinzentado claro. É visível sem chamar atenção.

```css
  border-radius: 6px;
```
Cantos levemente arredondados, menos que o cartão (10px). Os elementos internos costumam ter raio **menor** que o contêiner, o que dá harmonia visual.

```css
  font-size: 14px;
}
```
Tamanho do texto digitado.
- 💡 **Dica de celular:** no iPhone, se o input tiver fonte **menor que 16px**, o Safari **dá zoom automático** quando o campo recebe o foco. Para evitar, use `font-size: 16px` (ou `1rem`) nos inputs.

---

### Bloco 4: `.login-card input:focus`

```css
.login-card input:focus {
```
**Pseudo-classe `:focus`**: aplica o estilo **só enquanto o campo está selecionado** (clicado ou alcançado com Tab).

```css
  outline: none;
```
Remove o **contorno padrão de foco** do navegador (geralmente um anel azul).
- ⚠️ **Cuidado com acessibilidade:** quem navega pelo teclado depende desse indicador para saber onde está. **Só remova o `outline` se colocar outro indicador visível no lugar**, como a linha abaixo faz.
- Melhor ainda: use **`:focus-visible`**, que mostra o foco só quando o usuário usa o teclado.
- O `outline` é diferente da `border`: ele **não ocupa espaço** no layout, então não "empurra" nada.

```css
  border-color: #1E4B41;
}
```
Troca **só a cor** da borda para o verde-escuro da marca. A espessura (1px) e o estilo (solid) continuam os da regra anterior. É a **cascata**: regras mais específicas sobrescrevem só o que redefinem.
- ⚠️ Uma borda de 1px mudando de cor é um indicador **fraco**. Para cumprir bem a acessibilidade (WCAG 2.4.7), algo como `box-shadow: 0 0 0 3px rgba(30,75,65,.25)` deixaria o foco mais evidente.

---

### Bloco 5: `.login-card button`

```css
.login-card button {
  background: #1E4B41;
```
Fundo verde-escuro. O botão principal (ação primária) deve ser o elemento de **maior destaque** visual da tela.

```css
  color: #fff;
```
**Cor do texto**: branco. Contraste de branco sobre `#1E4B41` ≈ 10:1, bem acima do mínimo de 4.5:1 da WCAG.

```css
  border: none;
```
Remove a borda cinza em relevo que o navegador coloca em botões por padrão.

```css
  padding: 12px;
```
12px em todos os lados. Deixa o botão alto e fácil de clicar.

```css
  border-radius: 6px;
```
O mesmo raio dos inputs, para consistência visual.

```css
  font-weight: 600;
```
Texto semi-negrito, que reforça que é uma ação.

```css
  cursor: pointer;
```
**Muda o cursor para a "mãozinha"** quando o mouse passa por cima. Por padrão, botões mostram a seta comum. A mãozinha é um *affordance*: sinaliza "isto é clicável".
- Outros valores: `default` (seta), `text` (barra de texto), `not-allowed` (bloqueado, bom para botões desabilitados), `grab` (arrastar).

```css
  transition: background 0.2s ease;
}
```
**Animação suave** da cor quando o estado muda (ao passar o mouse). Formato: `propriedade duração curva`.
- `background`: só anima a mudança de fundo.
- `0.2s`: 200 milissegundos. Rápido o bastante para não atrasar e lento o bastante para ser percebido. O ideal para microinterações fica entre 150ms e 300ms.
- `ease`: começa devagar, acelera e termina devagar, o que é natural. Outros: `linear`, `ease-in`, `ease-out`.
- A `transition` fica no estado **normal**, não no `:hover`, para animar tanto a **entrada** quanto a **saída** do hover.

---

### Bloco 6: `.login-card button:hover`

```css
.login-card button:hover {
  background: #163b33;
}
```
**Pseudo-classe `:hover`**: quando o mouse está sobre o botão, o fundo fica um tom mais escuro. Isso é **feedback visual**: o sistema "responde" ao usuário (uma das heurísticas de Nielsen, *visibilidade do status do sistema*).
- ⚠️ No celular não existe hover, então **nunca esconda informação importante atrás de um `:hover`**.
- Pseudo-classes relacionadas: `:active` (enquanto está sendo clicado), `:disabled`, `:focus-visible`.

---

## Parte 3: conceitos de CSS (quando e como usar)

### 3.1 `position`: estático, relativo, absoluto, fixo e sticky

Este CSS **não usa `position`**, e isso é o correto: o layout foi resolvido com **fluxo normal + flexbox**, que é o caminho recomendado. Mesmo assim, é importante saber quando cada um entra em cena:

| Valor | O que faz | Sai do fluxo? | Referência do `top/left` | Quando usar |
|---|---|---|---|---|
| `static` (padrão) | Elemento fica onde o HTML coloca | Não | Ignora `top/left` | 95% dos casos |
| `relative` | Fica no lugar, mas pode ser **deslocado** um pouco | Não (o espaço original continua reservado) | A posição original dele | 1) Pequenos ajustes; 2) **Servir de referência para um filho `absolute`** (o uso mais comum) |
| `absolute` | Flutua sobre o conteúdo | **Sim** (os vizinhos agem como se ele não existisse) | O ancestral mais próximo com `position` diferente de `static` | Selo "Novo" no canto de um card, ícone de olho dentro do input de senha, tooltip, menu dropdown |
| `fixed` | Grudado na **tela**, não rola com a página | **Sim** | A janela do navegador (viewport) | Header fixo, botão de WhatsApp flutuante, banner de cookies, modal |
| `sticky` | Rola normal até encostar no limite e **gruda** | Não | O contêiner com rolagem | Cabeçalho de tabela, menu lateral que acompanha a leitura |

**Exemplo prático aplicado a este login: ícone de "mostrar senha" dentro do campo.**
```css
.campo-senha {
  position: relative;           /* vira a REFERÊNCIA para o filho */
}
.campo-senha .olho {
  position: absolute;           /* sai do fluxo e flutua */
  right: 12px;                  /* 12px da borda direita do .campo-senha */
  top: 50%;
  transform: translateY(-50%);  /* centraliza na vertical */
}
```
Sem o `relative` no pai, o ícone se posicionaria em relação à **página inteira** e iria parar no canto da tela. **`absolute` quase sempre precisa de um pai `relative`.**

**Por que não usar `absolute`/`fixed` para montar o layout inteiro?** Porque eles tiram o elemento do fluxo: se o texto crescer (tradução, fonte maior, tela menor), nada se reorganiza e os elementos **se sobrepõem**. Flexbox e grid se adaptam sozinhos.

**Por que não usar `fixed` para centralizar este cartão?** Daria certo em telas grandes, mas no celular com o teclado aberto o cartão ficaria preso e o botão "Entrar" poderia ficar escondido atrás do teclado, sem como rolar até ele.

### 3.2 Unidades: fixas vs relativas

| Unidade | Tipo | Relativa a | Bom para |
|---|---|---|---|
| `px` | Fixa | Nada (pixel CSS) | Bordas (`1px`), sombras, raios, detalhes pequenos |
| `rem` | Relativa | Fonte do `<html>` (16px padrão) | **Tamanho de fonte**, espaçamentos, larguras máximas (respeita a configuração do usuário) |
| `em` | Relativa | Fonte do próprio elemento/pai | Padding de botões que acompanha o tamanho do texto |
| `%` | Relativa | Tamanho do **pai** | Larguras fluidas (`width: 100%`) |
| `vw` / `vh` | Relativa | 1% da largura/altura da **tela** | Seções de tela cheia (`min-height: 100vh`) |
| `dvh` | Relativa | Altura da tela **descontando as barras do celular** | Substitui `100vh` no mobile |
| `fr` | Relativa (grid) | Fração do espaço livre | Colunas de grid |

**Regra geral:** tamanhos que devem **crescer com a preferência do usuário** (texto) usam `rem`. Tamanhos que **não fazem sentido crescer** (espessura de borda) usam `px`. Larguras **de contêiner** usam `max-width` + `%`/`rem`.

### 3.3 Largura fixa vs fluida

```css
width: 340px;       /* FIXO: quebra em telas menores que 340px          */
width: 100%;        /* FLUIDO: sempre do tamanho do pai, gigante no desktop */
max-width: 340px;   /* FLUIDO COM LIMITE: o melhor dos dois (usado aqui) */
```

### 3.4 Flexbox vs Grid

- **Flexbox:** uma dimensão. "Coloque esses itens em fila (ou coluna) e distribua o espaço." Serve para formulários, barras de navegação e alinhar ícone + texto. **Foi a escolha certa para este formulário.**
- **Grid:** duas dimensões. "Monte uma tabela de linhas **e** colunas." Serve para galerias, dashboards e o layout geral da página.

### 3.5 Como centralizar o cartão também na vertical

Hoje o cartão só é centralizado na **horizontal** (`margin: 40px auto`). Para centralizar no meio da tela:
```css
body {
  min-height: 100dvh;       /* body ocupa a altura toda da tela */
  display: flex;
  align-items: center;      /* centro vertical   */
  justify-content: center;  /* centro horizontal */
  margin: 0;
}
```
Isso centraliza na vertical **sem `position`**, e o conteúdo continua rolável se não couber.

### 3.6 Especificidade: quem ganha quando duas regras conflitam

Da mais fraca para a mais forte: **tag** (`input`) < **classe/pseudo-classe** (`.login-card`, `:focus`) < **id** (`#email`) < **estilo inline** (`style="..."`) < **`!important`**.
- `.login-card input:focus` (1 classe + 1 pseudo-classe + 1 tag) vence `.login-card input` (1 classe + 1 tag). Por isso a cor da borda muda no foco.
- Evite `id` e `!important` para estilizar: eles são tão fortes que, depois, fica difícil sobrescrever.

### 3.7 Estilos padrão do navegador

Tudo o que **não** foi estilizado usa o CSS padrão do navegador (*user-agent stylesheet*):
- o `<body>` tem `margin: 8px`;
- o `<h1>` tem 2em (32px), negrito e margens;
- o `<p>` tem margem de 1em em cima e embaixo;
- a fonte padrão é **serifada** (Times New Roman), porque nenhuma `font-family` foi definida;
- o `<a>` é azul e sublinhado.

Isso é importante para entender a versão Tailwind: **o Tailwind apaga todos esses padrões** (veja o outro MD).

---

## Resumo das boas práticas de usabilidade presentes (e faltando)

✅ Presentes
- `label` ligado ao `input` com `for`/`id` (clicar no texto foca o campo)
- `type="email"` e `type="password"` (teclado certo e validação nativa)
- `required` (validação sem JavaScript)
- `max-width` + `margin: auto` (responsivo sem media query)
- Indicador de foco customizado e hover com transição (feedback)
- Contraste alto no botão

⚠️ Podem melhorar
- `lang="en"` → `lang="pt-BR"`
- `<title>Document</title>` → título descritivo
- Faltam `name` nos inputs (sem eles os dados **não são enviados**)
- Faltam `autocomplete="email"` e `autocomplete="current-password"`
- Inputs com fonte de 14px causam zoom no iPhone (use 16px)
- Indicador de foco fraco (só muda a cor da borda de 1px)
