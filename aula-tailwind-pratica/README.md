# Orbit — página de prática (Tailwind)

Esta pasta é separada do material de referência em
[`../aula-frameworks-css/`](../aula-frameworks-css/) — aquele continua
intacto, é a apostila. Aqui é o **resultado final**: uma landing page real
(fictícia, produto "Orbit") construída só com utilitários Tailwind, para
mostrar como fica um site de verdade e não um exemplo isolado de componente.

Abra [`index.html`](./index.html) direto no navegador.

## O que olhar

- **Botões** (seção "Cada ação tem o peso certo" e nos cards de preço): o
  mesmo componente varia de estilo conforme a importância da ação
  (principal, secundária, neutra, destrutiva) e de tamanho
  (`px-3 py-1.5` → `px-6 py-3`), com uma etiqueta cinza pequena embaixo de
  cada um mostrando a classe e o valor em rem/px.
- **Campos de texto** (seção "Fale com o time"): larguras diferentes por
  contexto (`w-28` para cupom curto, `w-full` para nome/e-mail), e os
  estados normal, foco, erro e desabilitado lado a lado.
- As etiquetas `<p class="spec">...</p>` espalhadas pelo HTML são a única
  concessão didática desta página — no restante, o CSS é o que você
  colocaria num site publicado de verdade.

Se precisar da explicação de por que `rem`/`px`/`py` funcionam assim, ou da
tabela completa de classes, isso está em
[`../aula-frameworks-css/tailwind.md`](../aula-frameworks-css/tailwind.md).
