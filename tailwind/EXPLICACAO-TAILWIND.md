# Tela de Login — versão Tailwind CSS (explicação linha a linha)

Arquivo explicado: [login.html](login.html). **Não existe arquivo `.css`**: todo o estilo está nas classes dentro do HTML.

A versão com CSS puro está em [../login.html](../login.html) + [../login-style.css](../login-style.css) e é explicada em [../EXPLICACAO-CSS-PURO.md](../EXPLICACAO-CSS-PURO.md). As explicações detalhadas de cada **propriedade CSS** (o que é `margin`, `padding`, `flex`, `position`, `px` vs `rem`...) estão lá. Aqui o foco é **como o Tailwind escreve essas mesmas propriedades** e **no que ele é diferente**.

---

## O que é o Tailwind CSS?

Um framework **utility-first** ("utilitário primeiro"). Em vez de você escrever:

```css
.login-card { padding: 28px; }
```

e depois usar `class="login-card"`, você aplica **classes prontas, cada uma com uma única propriedade CSS**, direto no HTML:

```html
<form class="p-7">   <!-- p-7 = padding: 1.75rem (28px) -->
```

Cada classe é uma "peça de Lego" e o visual é montado combinando as peças.

---

## Parte 1: o HTML linha a linha (o que mudou)

A estrutura é **a mesma** da versão CSS puro, com as mesmas tags e os mesmos atributos (`for`, `id`, `type`, `placeholder`, `required`, `href`). A explicação de cada um desses atributos está no outro MD. Abaixo estão só as **diferenças**.

```html
<html lang="pt-BR">
```
**Corrigido:** agora o idioma declarado é português do Brasil, então o leitor de tela lê com a pronúncia correta.

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```
**Substitui o `<link rel="stylesheet" href="login-style.css">`.**
- **`src`**: endereço do script. Aqui é a versão **"Play CDN"** do Tailwind v4, que roda **no navegador**: ela lê as classes do HTML e gera o CSS na hora.
- ⚠️ **Só para estudo/protótipo.** Em produção, o Tailwind é instalado com npm (`npm install tailwindcss @tailwindcss/cli`) e **gera um arquivo `.css` final** com apenas as classes usadas, bem pequeno. A versão CDN deixa a página mais lenta e depende de internet.

```html
<title>Entrar</title>
```
**Corrigido:** título descritivo no lugar de "Document".

```html
<body class="m-2 font-serif">
```
**`class`** no `<body>`: na versão CSS puro, o body não tinha estilo. Aqui foi **preciso** adicionar classes por causa do **Preflight** (explicado na Parte 3). Elas recriam o visual padrão do navegador:
- `m-2` → `margin: 0.5rem` (8px), a margem padrão do body.
- `font-serif` → fonte serifada (tipo Times), a fonte padrão do navegador.

O atributo **`class`** no Tailwind recebe **várias classes separadas por espaço**. A ordem delas no atributo **não importa**.

---

## Parte 2: cada classe e o CSS equivalente

### Tabela de conversão de espaçamento do Tailwind

No Tailwind, os números de espaçamento são multiplicados por **0.25rem (4px)**:

| Classe | Cálculo | Valor |
|---|---|---|
| `2` | 2 × 4px | 8px |
| `2.5` | 2.5 × 4px | 10px |
| `3` | 3 × 4px | 12px |
| `4` | 4 × 4px | 16px |
| `7` | 7 × 4px | 28px |
| `10` | 10 × 4px | 40px |

**Colchetes `[ ]` = valor arbitrário.** Quando o valor não existe na escala, você escreve o valor exato: `max-w-[340px]`, `bg-[#1E4B41]`. Espaços dentro do valor viram `_`: `shadow-[0_8px_24px_...]`.

---

### O cartão: `<form>`

```html
<form class="box-content max-w-[340px] mx-auto my-10 p-7 bg-white rounded-[10px]
             shadow-[0_8px_24px_rgba(0,0,0,.12)] flex flex-col gap-2.5">
```

| Classe Tailwind | CSS gerado | Linha equivalente no CSS puro |
|---|---|---|
| `box-content` | `box-sizing: content-box` | *(padrão do navegador; ver Parte 3)* |
| `max-w-[340px]` | `max-width: 340px` | `max-width: 340px;` |
| `mx-auto` | `margin-left: auto; margin-right: auto` | `margin: 40px auto;` (parte lateral) |
| `my-10` | `margin-top: 2.5rem; margin-bottom: 2.5rem` (40px) | `margin: 40px auto;` (parte vertical) |
| `p-7` | `padding: 1.75rem` (28px) | `padding: 28px;` |
| `bg-white` | `background-color: #fff` | `background: #fff;` |
| `rounded-[10px]` | `border-radius: 10px` | `border-radius: 10px;` |
| `shadow-[0_8px_24px_rgba(0,0,0,.12)]` | `box-shadow: 0 8px 24px rgba(0,0,0,.12)` | `box-shadow: ...;` |
| `flex` | `display: flex` | `display: flex;` |
| `flex-col` | `flex-direction: column` | `flex-direction: column;` |
| `gap-2.5` | `gap: 0.625rem` (10px) | `gap: 10px;` |

**Prefixos de direção** (valem para `m` = margin e `p` = padding):
- `m-*`: 4 lados
- `mx-*`: esquerda + direita (eixo **x**, horizontal)
- `my-*`: cima + baixo (eixo **y**, vertical)
- `mt-*` / `mr-*` / `mb-*` / `ml-*`: top / right / bottom / left

Por isso `margin: 40px auto` virou **duas** classes: `my-10 mx-auto`.

---

### O título: `<h1>`

```html
<h1 class="text-[2em] font-bold my-[0.67em]">Entrar</h1>
```
| Classe | CSS | Por quê |
|---|---|---|
| `text-[2em]` | `font-size: 2em` | O Preflight deixa o h1 do mesmo tamanho do texto normal, então é preciso recriar o tamanho padrão (32px) |
| `font-bold` | `font-weight: 700` | O Preflight tira o negrito |
| `my-[0.67em]` | `margin-top/bottom: 0.67em` | O Preflight zera as margens |

No CSS puro, **nenhuma linha** foi escrita para o h1: o navegador fazia isso sozinho.

### O parágrafo: `<p>`

```html
<p class="my-4">
```
- `my-4` → `margin-top: 1rem; margin-bottom: 1rem`: recria a margem padrão que o Preflight removeu.

---

### Os rótulos: `<label>`

```html
<label for="email" class="text-[13px] font-semibold mt-2">
```
| Classe | CSS | Equivale a |
|---|---|---|
| `text-[13px]` | `font-size: 13px` | `font-size: 13px;` |
| `font-semibold` | `font-weight: 600` | `font-weight: 600;` |
| `mt-2` | `margin-top: 0.5rem` (8px) | `margin-top: 8px;` |

⚠️ **Diferença importante:** no CSS puro, **um único seletor** (`.login-card label`) estilizava **todos** os labels. No Tailwind, as classes são **repetidas em cada label**. Se tivéssemos 10 campos, seriam 10 cópias (veja a Parte 4 para saber como resolver isso).

---

### Os campos: `<input>`

```html
<input ... class="font-sans py-2.5 px-3 border border-[#d8d0be] rounded-md
                 text-[14px] focus:outline-none focus:border-[#1E4B41]">
```
| Classe | CSS | Equivale a |
|---|---|---|
| `font-sans` | `font-family: ui-sans-serif, system-ui, ...` | *(padrão do navegador para inputs)* |
| `py-2.5` | `padding-top/bottom: 0.625rem` (10px) | `padding: 10px 12px;` (parte vertical) |
| `px-3` | `padding-left/right: 0.75rem` (12px) | `padding: 10px 12px;` (parte horizontal) |
| `border` | `border-width: 1px` (o estilo `solid` vem do Preflight) | `border: 1px solid ...` |
| `border-[#d8d0be]` | `border-color: #d8d0be` | `... #d8d0be;` |
| `rounded-md` | `border-radius: 0.375rem` (6px) | `border-radius: 6px;` |
| `text-[14px]` | `font-size: 14px` | `font-size: 14px;` |
| `focus:outline-none` | **dentro de** `:focus { outline: none }` | `input:focus { outline: none; }` |
| `focus:border-[#1E4B41]` | **dentro de** `:focus { border-color: #1E4B41 }` | `input:focus { border-color: #1E4B41; }` |

**Variantes (`focus:`, `hover:`...):** um prefixo antes da classe significa "aplique **só nesse estado**". É o equivalente das pseudo-classes do CSS:

| Tailwind | CSS |
|---|---|
| `hover:bg-x` | `:hover { background: x }` |
| `focus:border-x` | `:focus { border-color: x }` |
| `focus-visible:ring-2` | `:focus-visible { ... }` |
| `active:scale-95` | `:active { transform: scale(.95) }` |
| `disabled:opacity-50` | `:disabled { opacity: .5 }` |
| `md:flex-row` | `@media (min-width: 768px) { flex-direction: row }` |

O prefixo **`md:`** mostra uma grande vantagem do Tailwind: **responsividade direto no HTML**, sem escrever `@media`. Exemplo: `class="flex-col md:flex-row"` significa "coluna no celular e linha a partir de 768px".

💡 Observação: `border` sozinha define só a **espessura** e `border-[#...]` define só a **cor**. No CSS puro, as três coisas (espessura, estilo e cor) ficavam em um único atalho `border: 1px solid #d8d0be`.

---

### O botão: `<button>`

```html
<button type="submit" class="font-sans text-[13.333px] bg-[#1E4B41] text-white border-none
        p-3 rounded-md font-semibold cursor-pointer transition-colors duration-200
        ease-[ease] hover:bg-[#163b33]">
```
| Classe | CSS | Equivale a |
|---|---|---|
| `font-sans` | `font-family: ui-sans-serif, system-ui...` | *(padrão do navegador para botões)* |
| `text-[13.333px]` | `font-size: 13.333px` | *(padrão do navegador para botões, que o Preflight muda)* |
| `bg-[#1E4B41]` | `background-color: #1E4B41` | `background: #1E4B41;` |
| `text-white` | `color: #fff` | `color: #fff;` |
| `border-none` | `border-style: none` | `border: none;` |
| `p-3` | `padding: 0.75rem` (12px) | `padding: 12px;` |
| `rounded-md` | `border-radius: 0.375rem` (6px) | `border-radius: 6px;` |
| `font-semibold` | `font-weight: 600` | `font-weight: 600;` |
| `cursor-pointer` | `cursor: pointer` | `cursor: pointer;` |
| `transition-colors` | `transition-property: color, background-color, border-color, ...` | `transition: background ...` |
| `duration-200` | `transition-duration: 200ms` | `... 0.2s ...` |
| `ease-[ease]` | `transition-timing-function: ease` | `... ease;` |
| `hover:bg-[#163b33]` | `:hover { background-color: #163b33 }` | `button:hover { background: #163b33; }` |

⚠️ **Atenção à nomenclatura confusa:** no Tailwind, **`text-*`** serve para **duas** coisas diferentes:
- `text-white`, `text-[#0000EE]` → **cor** do texto (`color`)
- `text-sm`, `text-[14px]` → **tamanho** do texto (`font-size`)

O Tailwind descobre qual é pelo valor.

⚠️ No Tailwind v4, botões **não** têm `cursor: pointer` por padrão, então o `cursor-pointer` é necessário (no navegador também não têm, então é igual nos dois).

---

### O link: `<a>`

```html
<a href="#" class="text-[#0000EE] underline">
```
- `text-[#0000EE]` → `color: #0000EE`, o azul padrão de link do navegador.
- `underline` → `text-decoration-line: underline`.

O Preflight deixa links **com a cor do texto e sem sublinhado**, ou seja, o link fica **invisível como link**. Sem essas duas classes, o usuário não saberia que "Esqueci minha senha" é clicável (é um problema sério de usabilidade).

---

## Parte 3: Preflight, a maior "pegadinha" do Tailwind

O Tailwind inclui um *reset* chamado **Preflight**, que **apaga os estilos padrão do navegador**:

| Elemento | Navegador (CSS puro) | Com Preflight |
|---|---|---|
| `body` | `margin: 8px`, fonte serifada | `margin: 0`, fonte sans-serif |
| `h1`...`h6` | Grande, negrito, com margem | **Tamanho e peso de texto normal, sem margem** |
| `p` | Margem de 1em | Sem margem |
| `a` | Azul e sublinhado | Cor herdada, sem sublinhado |
| `button`, `input` | Fonte do sistema, borda cinza | Herdam a fonte do pai, sem borda e sem fundo |
| `ul`, `ol` | Com marcadores e recuo | Sem marcadores e sem recuo |
| `*` (todos) | `box-sizing: content-box` | **`box-sizing: border-box`** |

**Por que ele faz isso?** Cada navegador tem padrões um pouco diferentes. Zerando tudo, o visual fica **igual no Chrome, Firefox e Safari**, e **nada** aparece sem você pedir.

**Consequência neste projeto:** para ficar **idêntico** ao CSS puro, foi preciso escrever classes que a versão original **nem tinha** (`m-2 font-serif` no body, `text-[2em] font-bold` no h1, `my-4` no p, `text-[#0000EE] underline` no link, `font-sans` nos inputs). Em um projeto Tailwind real, você normalmente **não quer** esses padrões antigos (Times New Roman e link azul #0000EE): você definiria o visual da sua marca. Eles foram mantidos aqui só para a comparação ser justa.

**`box-sizing: border-box`:** com esse valor, `width` e `max-width` **incluem** o padding e a borda.
- No CSS puro (`content-box`, o padrão do navegador), o cartão com `max-width: 340px` + `padding: 28px` tem na verdade **396px** de largura total (28 + 340 + 28).
- Com o Preflight (`border-box`), o mesmo cartão teria **340px** no total, ou seja, ficaria 56px mais estreito.
- Por isso o `<form>` recebeu a classe **`box-content`**, que volta para `content-box` e deixa as duas versões **com a mesma largura**.

Em projetos novos, **`border-box` é o recomendado** (inclusive no CSS puro), porque fica muito mais fácil prever o tamanho: "340px é 340px, com padding e tudo". No CSS puro, isso é feito com:
```css
*, *::before, *::after { box-sizing: border-box; }
```

---

## Parte 4: CSS puro × Tailwind (diferenças e quando usar cada um)

### Lado a lado

| | CSS puro | Tailwind |
|---|---|---|
| **Onde fica o estilo** | Arquivo `.css` separado | Classes no próprio HTML |
| **Nomes** | Você inventa (`.login-card`) | Já existem (`p-7`, `flex`) |
| **HTML** | Limpo e fácil de ler | Poluído, com classes longas |
| **Reaproveitamento** | Um seletor estiliza vários elementos | Repete as classes em cada elemento |
| **Mudar o visual** | Abre o CSS, procura a regra | Muda direto no elemento que você está vendo |
| **Risco de efeito colateral** | Alto: mudar `.login-card label` pode afetar outra tela | Baixo: a classe só afeta o elemento onde está |
| **CSS "morto"** | Acumula regras que ninguém usa mais | Só gera o CSS das classes usadas |
| **Consistência** | Depende da disciplina (um usa 13px, outro 14px...) | A escala força valores padronizados (`p-2`, `p-3`, `p-4`) |
| **Responsivo** | Precisa escrever `@media` | Prefixos `sm:` `md:` `lg:` na classe |
| **Estados** | `:hover`, `:focus` em regras separadas | `hover:`, `focus:` na mesma linha |
| **Curva de aprendizado** | Só precisa saber CSS | Precisa saber CSS **e** decorar os nomes das classes |
| **Configuração** | Nenhuma | Instalar via npm + processo de build (em produção) |
| **Estilos padrão** | Mantém os do navegador | Preflight zera tudo |

### ⚠️ Ponto essencial

**Tailwind não substitui saber CSS.** Cada classe é **uma propriedade CSS**. Quem não sabe o que `flex-col`, `mx-auto` ou `relative` fazem em CSS não vai saber usar o Tailwind. Por isso o outro MD explica as propriedades em detalhe: **o conceito é o mesmo, só muda a forma de escrever**.

### Quando usar CSS puro
- **Aprendendo** HTML/CSS (entenda a base primeiro).
- Projetos **pequenos** (uma landing page, um trabalho da faculdade, este login).
- Quando o HTML precisa ficar **limpo** (e-mails em HTML, conteúdo gerado por CMS, documentação).
- Animações e efeitos **complexos** (keyframes elaborados, seletores avançados como `:has()` e `:nth-child()`), que ficam mais legíveis em CSS.
- Quando você **não pode** ter um processo de build.

### Quando usar Tailwind
- Projetos **com componentes** (React, Vue, Angular, Svelte). O "problema" da repetição some, porque o `<Input />` é escrito **uma vez** e reaproveitado.
- **Equipes**: todo mundo usa a mesma escala de espaçamento e cores, então o visual fica consistente.
- **Prototipar rápido**: você não sai do HTML.
- Projetos **grandes e duradouros**, onde o CSS tradicional tende a virar um "cemitério" de regras que ninguém tem coragem de apagar.

### Como resolver a repetição no Tailwind

1. **Componentes** (melhor opção, em React/Vue): o input com suas classes é escrito uma vez só.
2. **`@apply`**, para criar uma classe própria a partir das classes do Tailwind (só com a instalação via npm):
   ```css
   .campo {
     @apply py-2.5 px-3 border border-[#d8d0be] rounded-md text-[14px]
            focus:outline-none focus:border-[#1E4B41];
   }
   ```
   Use com moderação: se tudo virar `@apply`, você está escrevendo CSS puro com passos extras.
3. **Tema** (`@theme`), para registrar a cor da marca e usar `bg-marca` em vez de repetir `bg-[#1E4B41]`:
   ```css
   @theme {
     --color-marca: #1E4B41;
     --color-marca-escura: #163b33;
   }
   ```
   Depois basta usar `bg-marca hover:bg-marca-escura focus:border-marca`.

### E o `position` no Tailwind?

É o mesmo conceito explicado no outro MD, só com outros nomes:

| CSS | Tailwind |
|---|---|
| `position: static` | `static` |
| `position: relative` | `relative` |
| `position: absolute` | `absolute` |
| `position: fixed` | `fixed` |
| `position: sticky` | `sticky` |
| `top: 0` / `right: 12px` | `top-0` / `right-3` |
| `top: 50%; transform: translateY(-50%)` | `top-1/2 -translate-y-1/2` |
| `inset: 0` (os 4 lados = 0) | `inset-0` |
| `z-index: 10` | `z-10` |

Exemplo do ícone de "mostrar senha" dentro do campo:
```html
<div class="relative">                               <!-- referência -->
  <input type="password" class="w-full pr-10 ...">  <!-- pr-10: espaço para o ícone -->
  <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2">👁</button>
</div>
```
A regra continua a mesma: **o `absolute` precisa de um pai `relative`**.
