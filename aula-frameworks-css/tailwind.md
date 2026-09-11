# Tailwind CSS — Apostila da Aula

Material de apoio para o arquivo [`tailwind.html`](./tailwind.html). Ele
reconstrói os **mesmos exemplos** do `bootstrap.html` para comparar as duas
abordagens lado a lado.

## 1. O que é o Tailwind CSS?

Tailwind é um framework CSS **utility-first** (utilitário-primeiro). A
diferença fundamental para o Bootstrap:

- **Bootstrap** te dá componentes prontos com nome semântico:
  `class="card"`, `class="btn btn-primary"` — o CSS por trás já decide como
  um "card" ou um "botão primário" devem parecer.
- **Tailwind** te dá **peças pequenas e genéricas** (utilitários), uma para
  cada propriedade CSS: `flex`, `p-4`, `rounded-lg`, `bg-blue-600`,
  `text-white`. Você **combina várias peças** para montar visualmente um
  card ou um botão do zero, diretamente no HTML.

Ou seja: no Bootstrap você "usa componentes"; no Tailwind você "escreve CSS
via nomes de classe", só que sem sair do HTML e sem inventar nomes.

## 2. Como instalar: Play CDN (aula) x instalação local (produção)

### 2.1 Play CDN — o que usamos hoje

Para efeito de aula, sem build tool, usamos o **Play CDN**: um único
`<script>` que baixa um **compilador JavaScript** e o roda **dentro do
próprio navegador do visitante**. Esse compilador lê o HTML da página em
tempo real, descobre quais classes Tailwind você usou (`px-4`,
`bg-blue-600`...) e **injeta** um `<style>` com o CSS correspondente na
hora, a cada carregamento de página.

```html
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
```

**Isso NÃO é o que se usa em produção** — o próprio Tailwind recomenda não
usar o Play CDN em um site publicado de verdade. Motivos:

- O visitante baixa e executa um compilador inteiro, não só um `.css`.
- O CSS é recalculado a cada carregamento (não aproveita cache de arquivo
  estático).
- A customização (cores/fontes próprias) é limitada.

### 2.2 Instalação local — o que se usa em produção

Em um projeto real, instala-se o Tailwind como dependência de
desenvolvimento e ele gera, **em tempo de build** (antes de publicar o
site), **um único arquivo `.css` estático e enxuto**, contendo só as
classes que você realmente usou no projeto (isso se chama *content
scanning*/*purge*). O visitante final baixa **só CSS puro — nenhum
JavaScript de compilação roda no navegador dele**.

Passo a passo (não executamos isso na aula, é só para os alunos verem como
seria em um projeto de verdade):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Isso cria um `tailwind.config.js`. O campo `content` diz ao Tailwind **quais
arquivos escanear** para saber quais classes existem no seu projeto:

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: { extend: {} },
  plugins: [],
}
```

Um arquivo CSS de entrada com 3 diretivas especiais que o Tailwind substitui
pelo CSS de verdade durante o build:

```css
/* src/input.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

E o comando que efetivamente gera o CSS final:

```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

O resultado (`dist/output.css`) é referenciado com uma `<link>` normal, como
qualquer CSS puro — sem `<script>` nenhum do Tailwind no HTML final:

```html
<link rel="stylesheet" href="dist/output.css">
```

### 2.3 Comparação lado a lado

| Aspecto | Play CDN (esta aula) | Instalação local (produção) |
|---|---|---|
| Setup | 1 linha de `<script>` | `npm install` + arquivos de config |
| O que o visitante baixa | Um compilador JS que roda no navegador dele | Só um `.css` estático já pronto |
| Tamanho final | Maior | Menor (só as classes usadas) |
| Customização (cores, fontes) | Limitada | Total, via `tailwind.config.js` |
| Cache do navegador | Ruim (recompila toda vez) | Ótimo (arquivo estático) |
| Indicado para | Aula, prototipagem rápida | Sites e produtos publicados de verdade |

## 3. Filosofia utility-first — por que classes tão "picadas"?

Em vez de:

```css
/* CSS que você escreveria à mão */
.botao {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.375rem;
}
```

Com Tailwind, cada uma dessas propriedades já tem uma classe pronta, e você
só as junta no `class`:

```html
<button class="px-4 py-2 bg-blue-600 text-white rounded-md">Botão</button>
```

**Vantagem:** você nunca sai do HTML, nunca inventa nome de classe (`.botao`,
`.botao-azul`, `.botao-azul-grande`...), e o visual fica visível linha a
linha, sem precisar abrir um arquivo `.css` separado para entender o estilo.

**Desvantagem:** o `class` fica longo. É a troca consciente que o Tailwind
propõe.

## 4. A unidade `rem` (antes de falar de espaçamento)

Toda a escala de espaçamento, e boa parte da tipografia, do Tailwind é
medida em **`rem`** ("root em"): uma unidade **relativa** ao tamanho de
fonte do elemento raiz da página (a tag `<html>`). Nos navegadores, esse
tamanho raiz é **16px por padrão** — a menos que o usuário tenha mudado essa
configuração (ex.: alguém com baixa visão que aumenta a fonte padrão nas
configurações de acessibilidade).

- `1rem` = 16px (assumindo o padrão do navegador)
- `0.5rem` = 8px
- `2rem` = 32px

**Por que `rem` e não `px`?** Porque `rem` **respeita** a preferência de
tamanho de fonte do usuário: se alguém aumenta a fonte padrão do navegador,
todo o site cresce proporcionalmente. Um valor fixo em `px` ignoraria essa
preferência de acessibilidade. Existe também o `em`, parecido, mas relativo
ao elemento **pai** (não à raiz) — o que pode compor de forma imprevisível
em elementos aninhados, por isso o Tailwind usa `rem` como padrão.

## 5. Espaçamento (padding e margin)

Assim como o Bootstrap tem uma escala de `0` a `5`, o Tailwind tem uma escala
numérica mais granular. **O número depois do hífen é um ÍNDICE dessa escala,
não é literalmente a quantidade de pixels ou de rem** — ele é convertido
seguindo esta tabela (valores padrão do Tailwind):

| Índice | Valor em `rem` | Em pixels (padrão) |
|---|---|---|
| `0` | `0rem` | 0px |
| `0.5` | `0.125rem` | 2px |
| `1` | `0.25rem` | 4px |
| `2` | `0.5rem` | 8px |
| `3` | `0.75rem` | 12px |
| `4` | `1rem` | 16px |
| `6` | `1.5rem` | 24px |
| `8` | `2rem` | 32px |
| `12` | `3rem` | 48px |
| `16` | `4rem` | 64px |

O padrão de nome é igual em espírito ao Bootstrap: `{propriedade}{lado}-{índice}`.

- **Propriedade:** `p` (padding, espaço **dentro** do elemento) ou `m`
  (margin, espaço **fora** do elemento, entre ele e os vizinhos).
- **Lado:** `t` topo, `b` embaixo, `l` esquerda, `r` direita, `x` horizontal
  (esquerda **e** direita ao mesmo tempo), `y` vertical (topo **e** embaixo
  ao mesmo tempo), ou nenhuma letra = todos os 4 lados.
- Exemplos: `mt-4` (margin-top de 1rem), `px-6` (padding-left **e**
  padding-right de 1.5rem), `mx-auto` (margem horizontal automática →
  centraliza um bloco com largura definida, igual ao `.mx-auto` do
  Bootstrap).

> **Atenção à ambiguidade do "px":** aqui, `px`/`py` significam
> **p**adding + eixo **x**/**y** — NÃO têm relação com a unidade CSS `px`
> (pixel)! É só uma coincidência de abreviação. Para complicar mais um
> pouco: o Tailwind também tem, na escala de tamanho (`w-*`, `h-*`), uma
> chave literalmente chamada `px` que significa "exatamente 1 pixel" (ex.:
> `w-px` = `width: 1px`) — usada **sozinha**, sem vir logo depois de `p`/`m`.
> O contexto (se vem colado em `p`/`m`, ou sozinha) resolve a ambiguidade.

## 6. Flexbox e Grid

Tailwind expõe quase 1:1 as propriedades de flexbox/grid do CSS:

| Classe | Equivale a (CSS puro) |
|---|---|
| `flex` | `display: flex;` |
| `grid` | `display: grid;` |
| `flex-col` | `flex-direction: column;` |
| `justify-between` | `justify-content: space-between;` |
| `items-center` | `align-items: center;` |
| `gap-4` | `gap: 1rem;` |
| `grid-cols-3` | `grid-template-columns: repeat(3, minmax(0, 1fr));` |

Note que o Tailwind **não tem um "sistema de grid de 12 colunas com nomes
prontos"** como o Bootstrap (`col-8`). Em vez disso, você monta o grid
literalmente com CSS Grid (`grid grid-cols-12` + `col-span-8`) ou com Flexbox
(`flex` + larguras via `w-*` ou `basis-*`). É mais manual, porém mais
flexível.

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>Coluna 1</div>
  <div>Coluna 2</div>
  <div>Coluna 3</div>
</div>
```

- `grid-cols-1`: por padrão (mobile), 1 coluna.
- `md:grid-cols-3`: a partir do breakpoint `md`, 3 colunas.

## 7. Cores — o que o número (50 a 900) realmente significa

Tailwind usa uma paleta bem maior que o Bootstrap: cada cor tem **tons
numerados de 50 (quase branco) a 900 (quase preto)**. Esse número é a
**intensidade/escuridão** daquele tom — **não tem nenhuma relação com peso
de fonte** (essa é uma escala completamente diferente, ver Seção 8). Quanto
maior o número, mais escura/saturada fica a cor; `500` costuma ser
considerado o tom "padrão/vívido" daquela cor.

```
bg-blue-50   bg-blue-100  bg-blue-200 ... bg-blue-500 ... bg-blue-900
(quase branco) ------------------------- (padrão) ------- (quase preto)
```

- `bg-{cor}-{tom}` → cor de fundo.
- `text-{cor}-{tom}` → cor do texto.
- `border-{cor}-{tom}` → cor da borda.

Exemplo: `bg-blue-600` (azul "principal", equivalente em uso ao
`bg-primary` do Bootstrap, mas você escolhe o tom exato ao invés de um nome
semântico fixo). Cada família de cor (`blue`, `red`, `green`, `gray`...) tem
sua própria escala de 50 a 900.

## 8. Tipografia

| Classe | Efeito |
|---|---|
| `text-xs` ... `text-sm`, `text-base`, `text-lg`, `text-xl` ... `text-6xl` | Tamanho da fonte, do menor ao maior ("tamanho de camiseta", não é número) |
| `font-normal` / `font-medium` / `font-bold` | Peso da fonte |
| `italic` | Itálico |
| `text-center` / `text-left` / `text-right` | Alinhamento |
| `uppercase` / `lowercase` / `capitalize` | Transformação de caixa |
| `truncate` | Corta texto com "..." se não couber |
| `leading-tight` / `leading-relaxed` | Altura da linha (`line-height`) |

### 8.1 Peso da fonte: outra escala numérica (0 a 900), mas expressa em NOMES

No CSS puro, `font-weight` é numérico (100 a 900). O Tailwind expõe isso via
**nomes**, exatamente para não se confundir com o número de tom de cor da
Seção 7 — mesmo eles usando, por trás dos panos, a mesma faixa de múltiplos
de 100:

| Classe Tailwind | `font-weight` no CSS puro |
|---|---|
| `font-thin` | 100 |
| `font-light` | 300 |
| `font-normal` | 400 (padrão) |
| `font-medium` | 500 |
| `font-semibold` | 600 |
| `font-bold` | 700 |
| `font-extrabold` | 800 |
| `font-black` | 900 |

Ou seja: `font-extrabold` usa por baixo dos panos o mesmo número "800" que
`text-gray-800` usa para tom de cor — mas são **duas escalas
independentes** que só coincidem em usar múltiplos de 100. No `class` você
nunca escreve `font-800`; sempre usa o nome (`font-extrabold`).

## 9. Bordas, sombra e arredondamento

| Classe | Efeito |
|---|---|
| `rounded` | Cantos levemente arredondados |
| `rounded-md` / `rounded-lg` / `rounded-full` | Mais arredondado (`rounded-full` = círculo/pílula) |
| `border` | Borda de 1px sólida (cor padrão cinza) |
| `border-2` | Borda mais grossa |
| `shadow` / `shadow-md` / `shadow-lg` | Sombra leve, média, grande |

## 10. Estados: `hover:`, `focus:`, `active:`, `disabled:`

Esta é uma das ideias mais importantes do Tailwind: **variantes de estado
como prefixo da classe**. Em vez de escrever `:hover { }` em um arquivo CSS
separado, você prefixa a própria classe utilitária:

```html
<button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
  Passe o mouse aqui
</button>
```

- `bg-blue-600`: cor normal.
- `hover:bg-blue-700`: **só quando o mouse está em cima**, troca para um tom
  mais escuro. É exatamente o que seria `.botao:hover { background: ...; }`
  em CSS puro — só que embutido no nome da classe.
- Outros prefixos comuns: `focus:` (quando o campo está focado),
  `active:` (enquanto está sendo clicado), `disabled:` (quando desabilitado).

## 11. Responsividade: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

Mesmo princípio de prefixo, mas para tamanho de tela — e também **mobile
first**, igual ao Bootstrap:

| Prefixo | A partir de |
|---|---|
| (nenhum) | sempre (mobile) |
| `sm:` | ≥ 640px |
| `md:` | ≥ 768px |
| `lg:` | ≥ 1024px |
| `xl:` | ≥ 1280px |
| `2xl:` | ≥ 1536px |

```html
<div class="text-center md:text-left">
  Centralizado no celular, alinhado à esquerda a partir do tablet
</div>
```

Você pode **empilhar** prefixos: `md:hover:bg-blue-700` = "a partir do
tablet, quando passar o mouse".

## 12. Dark mode: `dark:`

```html
<div class="bg-white text-black dark:bg-gray-900 dark:text-white">
  Fundo branco/texto preto no modo claro; invertido no modo escuro
</div>
```

- `dark:` aplica a classe seguinte apenas quando o modo escuro está ativo
  (por padrão, segue a preferência do sistema operacional do usuário).
- É um recurso que o Bootstrap também tem (`data-bs-theme="dark"`), mas no
  Tailwind ele é resolvido classe a classe, o que dá mais controle fino.

## 13. Construindo um "card" do zero (comparação direta com o Bootstrap)

No Bootstrap bastava `class="card"`. No Tailwind, o "card" **não existe como
componente** — você o monta combinando utilitários:

```html
<div class="max-w-sm rounded-lg shadow-md overflow-hidden bg-white">
  <img class="w-full h-40 object-cover" src="foto.jpg" alt="Descrição">
  <div class="p-4">
    <h3 class="text-lg font-bold mb-2">Título do card</h3>
    <p class="text-gray-600 mb-4">Texto de apoio do card.</p>
    <a href="#" class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
      Ver mais
    </a>
  </div>
</div>
```

- `max-w-sm`: largura máxima pequena (substitui o `style="width:18rem"` que
  usamos no Bootstrap).
- `overflow-hidden`: garante que a imagem respeite os cantos arredondados do
  card (senão a imagem "vaza" por cima do `rounded-lg`).
- `object-cover`: a imagem preenche a área definida sem distorcer (equivale
  a `object-fit: cover;` em CSS puro).

## 14. Customização (fora do escopo prático da aula, mas importante citar)

Em um projeto real, o Tailwind é configurado por um arquivo
`tailwind.config.js`, onde você pode:

- Definir sua própria paleta de cores (`primary`, `secondary`...).
- Adicionar tamanhos de fonte, espaçamentos e breakpoints customizados.
- Ativar plugins (formulários, tipografia, etc).

O Play CDN usado nesta aula **não lê esse arquivo de configuração** por
padrão (ele aceita uma configuração inline via `tailwind.config = {...}`
dentro de um `<script>`, mas isso é avançado demais para a introdução de
hoje).

## 15. Tabela de referência — todas as classes usadas em `tailwind.html`

| Classe | Categoria | O que faz |
|---|---|---|
| `container`, `mx-auto`, `px-4` | Layout | Centraliza conteúdo com largura máxima e respiro lateral |
| `grid`, `grid-cols-1`, `md:grid-cols-3`, `gap-4` | Grid | Colunas responsivas |
| `flex`, `flex-col`, `justify-between`, `items-center` | Flexbox | Alinhamento e distribuição |
| `text-*`, `font-*`, `uppercase`, `text-center` | Tipografia | Tamanho, peso, alinhamento, transformação |
| `bg-*-*`, `text-*-*`, `border-*-*` | Cor | Fundo, texto e borda em tons numerados |
| `p-*`, `m-*`, `px-*`, `mt-*` | Espaçamento | Padding e margin em escala |
| `rounded*`, `shadow*`, `border` | Visual | Cantos arredondados, sombra, borda |
| `hover:*`, `focus:*` | Estado | Estilo aplicado só em hover/foco |
| `sm: md: lg:` (prefixos) | Responsividade | Aplica a classe a partir daquele breakpoint |
| `dark:*` | Tema | Estilo aplicado no modo escuro |
| `hidden`, `md:block` | Responsividade | Mostrar/esconder por tamanho de tela |

## 16. Exercícios de fixação

1. Troque `bg-blue-600` por `bg-green-600` em um botão e ajuste o `hover:`
   correspondente.
2. Transforme a grid de 3 colunas em 2 colunas no tablet e 4 no desktop
   (dica: `md:grid-cols-2 lg:grid-cols-4`).
3. Adicione `dark:` a algum bloco e teste trocando o tema do sistema
   operacional (ou usando as ferramentas de desenvolvedor do navegador).
4. Recrie o card de "produto" do exercício do Bootstrap, mas só com
   utilitários Tailwind, sem usar nenhuma classe chamada `card`.
