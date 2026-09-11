# Aula: Frameworks CSS (Bootstrap e Tailwind CSS)

> Aula complementar à de **CSS puro** (ministrada pelo outro professor). Aqui o
> foco é mostrar **frameworks CSS**: o que são, por que existem, e como usar os
> dois mais populares do mercado — **Bootstrap** e **Tailwind CSS**.

- **Duração prevista:** 3 horas (180 minutos)
- **Pré-requisitos:** HTML básico (tags, atributos) e CSS básico (seletores,
  `class`, `id`, box model — assunto da aula anterior/paralela de CSS puro)
- **Formato:** aula expositiva + live coding, usando os arquivos desta pasta

## Arquivos desta aula

| Arquivo | O que é |
|---|---|
| [`bootstrap.html`](./bootstrap.html) | Página de demonstração ao vivo do Bootstrap 5, com comentários no código explicando cada tag/classe usada. É o que você abre no navegador durante a aula. |
| [`bootstrap.md`](./bootstrap.md) | Apostila/texto de apoio do Bootstrap: conceitos, tabelas de referência de classes, exercícios. |
| [`tailwind.html`](./tailwind.html) | Página de demonstração ao vivo do Tailwind CSS, comentada, reconstruindo os **mesmos componentes** do arquivo do Bootstrap para permitir comparação direta. |
| [`tailwind.md`](./tailwind.md) | Apostila/texto de apoio do Tailwind: conceitos, tabelas de referência de classes, exercícios. |

Abra os `.html` direto no navegador (duplo clique ou "Abrir com o navegador").
Não precisa de servidor nem de instalação — os dois exemplos usam **CDN**.

## Objetivos de aprendizagem

Ao final da aula, o aluno deve ser capaz de:

1. Explicar o que é um framework CSS e por que ele existe (produtividade,
   padronização, responsividade pronta).
2. Diferenciar a abordagem do **Bootstrap** (componentes prontos, classes
   semânticas como `card`, `btn`, `navbar`) da abordagem do **Tailwind**
   (utility-first, classes de baixo nível como `flex`, `p-4`, `text-center`).
3. Montar um layout responsivo com o **grid de 12 colunas** do Bootstrap.
4. Montar o mesmo layout usando **utilitários de flexbox/grid** do Tailwind.
5. Usar componentes prontos do Bootstrap (navbar, card, botão, modal,
   accordion) sabendo o que cada classe faz.
6. Usar variantes de estado e responsividade do Tailwind (`hover:`, `md:`,
   `dark:`).
7. Justificar, num projeto real, quando faria mais sentido usar Bootstrap,
   Tailwind, ou CSS puro.

## Revisão rápida antes de começar (10 min) — `class` vs `id`

Como a turma já viu CSS puro, isso é só uma ponte rápida, não uma aula nova:

- **`id`**: identifica **um único** elemento na página. Não pode se repetir.
  Serve para: âncoras de link (`#topo`), alvo de JavaScript, ou (em CSS puro)
  seletor de alta especificidade `#meuId { ... }`.
  ```html
  <h1 id="topo">Título único da página</h1>
  ```
- **`class`**: identifica um **grupo** de elementos que compartilham estilo.
  Pode se repetir quantas vezes quiser, e um elemento pode ter **várias**
  classes ao mesmo tempo, separadas por espaço.
  ```html
  <p class="destaque texto-vermelho">Este parágrafo tem 2 classes.</p>
  ```
- **Por que isso importa para frameworks?** Bootstrap e Tailwind funcionam
  **quase inteiramente via `class`**. Eles trazem um arquivo `.css` gigante,
  cheio de regras já escritas (ex.: `.btn { padding: ...; border-radius: ...; }`),
  e tudo que você faz é **colar o nome da classe certa na tag certa**. Você
  quase não escreve `id` nem `<style>` próprio — a "programação" vira escolher
  as classes certas e combiná-las.

## O que é um framework CSS?

Um framework CSS é uma **biblioteca pronta de estilos e (às vezes) componentes
JavaScript** que você importa no seu projeto (via CDN ou instalação) para não
precisar escrever CSS do zero.

**Vantagens**
- Produtividade: componentes prontos (botão, navbar, modal, card...).
- Responsividade já resolvida (grid, breakpoints).
- Consistência visual entre páginas/projetos e entre desenvolvedores de um
  mesmo time.
- Compatibilidade entre navegadores já testada.

**Desvantagens**
- Peso extra (CSS/JS que talvez você não use inteiro).
- "Cara de framework" se não for customizado (sites parecidos entre si).
- Curva de aprendizado das convenções de nomes de classe.
- Menos controle fino do que escrever CSS puro.

## Cronograma da aula (3h / 180 min)

| Tempo | Bloco |
|---|---|
| 0:00 – 0:15 | Abertura: o que é framework CSS, revisão `class`/`id`, contexto (CSS puro x frameworks) |
| 0:15 – 0:30 | Setup do Bootstrap: CDN, boilerplate HTML, `container`/`row`/`col` |
| 0:30 – 1:00 | Grid system do Bootstrap (12 colunas, breakpoints `sm/md/lg/xl`) + utilitários de espaçamento (`m-*`, `p-*`) |
| 1:00 – 1:30 | Componentes Bootstrap: botões, cards, alerts, badges, formulário, navbar |
| 1:30 – 1:40 | **Intervalo** |
| 1:40 – 1:55 | Componentes Bootstrap com JavaScript: navbar responsiva, accordion, modal, carousel |
| 1:55 – 2:10 | Introdução ao Tailwind: filosofia utility-first x Bootstrap, setup via CDN |
| 2:10 – 2:40 | Utilitários Tailwind: spacing, flexbox, grid, tipografia, cores |
| 2:40 – 3:00 | Estados e responsividade no Tailwind (`hover:`, `focus:`, `md:`, `dark:`) + comparação final Bootstrap x Tailwind + exercício para casa |

## Comparativo final (para fechar a aula)

| | Bootstrap | Tailwind CSS |
|---|---|---|
| Abordagem | Componentes prontos (`.btn`, `.card`, `.navbar`) | Utilitários de baixo nível (`flex`, `p-4`, `rounded`) |
| CSS que você escreve | Pouco ou nenhum | Nenhum (você compõe classes utilitárias no HTML) |
| Visual "fora da caixa" | Já parece um site pronto | Neutro, você desenha o visual |
| Customização profunda | Precisa sobrescrever CSS ou usar Sass | Muito flexível via `tailwind.config.js` |
| Curva de aprendizado | Baixa (decorar poucos nomes de componente) | Média/alta no início (muitas classes, mas previsíveis) |
| JS incluso | Sim (modal, carousel, dropdown, accordion...) | Não (é só CSS; JS de interação fica por sua conta) |
| Tamanho do HTML | Mais enxuto | HTML fica "poluído" de classes |
| Uso comum no mercado | Protótipos rápidos, admin/dashboards, MVPs | Produtos com identidade visual própria, design systems |

## Exercício proposto (pós-aula)

Peça para o aluno recriar a mesma página (um "cartão de perfil" com foto,
nome, bio e um botão) **duas vezes**: uma usando só classes do Bootstrap, e
outra usando só utilitários do Tailwind. Objetivo: sentir na prática a
diferença de abordagem.
