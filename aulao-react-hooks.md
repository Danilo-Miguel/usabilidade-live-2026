# Aulão React — Fechamento (06/11) · App "SomBusca" com a API do iTunes

**Horário:** 19:00 – 21:50 (com intervalo)

**Objetivo:** recapitular tudo o que já vimos (componentes, props, children, JSX, CSS, eventos) e introduzir o que falta: **build do projeto (CDN × Vite), Tailwind integrado ao build, state, controlled components, requisições HTTP, loading/erro/sucesso, useEffect, regras dos hooks, custom hooks e class components**. Depois disso, vamos para o mobile.

> [!TIP]
> **Como usar este tutorial:** siga as seções na ordem e digite o código de cada arquivo. Cada seção explica os conceitos logo depois do código. O resultado final, todo comentado, está na pasta [`sombusca/`](./sombusca) deste repositório. Use-a para comparar com o seu código ou para pular um passo.

### ▶️ Como rodar o projeto pronto

Com o [Node.js](https://nodejs.org) instalado, rode na pasta raiz do repositório:

```bash
cd sombusca
npm install
npm run dev
```

Depois, abra **http://localhost:5173** no navegador. Para parar o servidor, use `Ctrl + C` no terminal.

## 📚 Índice

| Seção | Bloco do roteiro | Assunto |
|---|---|---|
| [Roteiro da noite](#roteiro-da-noite) | — | Horários e conteúdo de cada bloco |
| [0. Pré-requisitos](#0-pré-requisitos-e-preparação-do-ambiente) | Antes da aula | Instalação, testes e problemas comuns |
| [1. Revisão relâmpago](#1-revisão-relâmpago-o-que-já-vimos) | Bloco 1 | React, JSX, componentes, props, children, key |
| [2. Como "buildar" o React](#2-como-buildar-o-react-cdn--vite--frameworks) | Bloco 2 | CDN × Vite × frameworks, criação do projeto, Tailwind |
| [3. O contrato da API do iTunes](#3-o-contrato-da-api-do-itunes) | Bloco 3 | URL, parâmetros e resposta JSON |
| [Estrutura final do app](#estrutura-final-do-app) | — | Pastas e responsabilidades |
| [4. Componentes base](#4-componentes-base-revisão-aplicada-props-children-composição) | Revisão aplicada | Button, Card, Navbar, Layout, StatusMessage, TrackCard, TrackList |
| [5. `useState` e controlled components](#5-usestate-e-controlled-components-primeira-vez) | Bloco 4 | State e formulário de busca |
| [☕ Intervalo](#-intervalo-2020--2035) | Intervalo | |
| [6. `useEffect` + requisições HTTP](#6-useeffect--requisições-http) | Bloco 5 | fetch, axios, loading/erro/sucesso |
| [7. Custom hooks + regras dos hooks](#7-custom-hooks--regras-dos-hooks) | Bloco 6 | `useItunesSearch`, `useLocalStorage`, `App.jsx` |
| [🐞 Correção: repetir a busca](#-correção-repetir-a-busca-depois-de-um-erro) | Bloco 6 | Como tentar de novo depois de um erro |
| [8. Class components](#8-class-components-contexto-histórico-e-manutenção) | Bloco 7 | Estrutura, binding, ciclo de vida, Error Boundary |
| [9. Fechamento](#9-fechamento-e-ponte-para-o-mobile) | Bloco 8 | Checklist, React Native e desafios |
| [Bônus: proxy em Express](#bônus-proxy-back-end-em-express-opcional) | Opcional | E se a API tivesse chave secreta? |
| [Glossário rápido](#glossário-rápido) | Consulta | Definição dos termos técnicos |

---

## Roteiro da noite

| Horário | Bloco | O que entra |
|---|---|---|
| 19:00 – 19:15 | 1. Revisão relâmpago | React, JSX, componentes, props, children, key (o que já vimos) |
| 19:15 – 19:45 | 2. Como "buildar" o React | CDN + Babel × Vite × frameworks · criar o projeto · Tailwind no build |
| 19:45 – 20:05 | 3. O contrato da API do iTunes | URL, parâmetros, resposta JSON, testar no navegador |
| 20:05 – 20:20 | 4. `useState` + controlled components | Formulário de busca com validação |
| **20:20 – 20:35** | **Intervalo** | |
| 20:35 – 21:05 | 5. `useEffect` + HTTP + listas | fetch, loading/erro/sucesso, keys, renderização condicional |
| 21:05 – 21:25 | 6. Custom hooks + regras dos hooks | `useItunesSearch`, `useLocalStorage`, favoritos |
| 21:25 – 21:40 | 7. Class components | Estrutura, state, binding, ciclo de vida × hooks, quando ainda faz sentido |
| 21:40 – 21:50 | 8. Fechamento | O que levamos para o React Native |

> [!NOTE]
> 📖 Termos técnicos marcados com **(ver Glossário)** têm uma definição de duas linhas no final do documento.

[⬆️ Voltar ao índice](#-índice)

---

## 0. Pré-requisitos e preparação do ambiente

> [!IMPORTANT]
> Ideal: pedir para a turma fazer **antes** da aula (ou nos primeiros 10 min). Se um aluno não conseguir instalar nada, ele acompanha pelo **plano B** no final desta seção.

### O que precisa estar instalado

| Ferramenta | Para quê | Obrigatório? |
|---|---|---|
| **Node.js (versão LTS, 22 ou superior)** | Roda JavaScript fora do navegador; é o que executa o Vite e o npm | ✅ |
| **npm** | Instala bibliotecas (React, Tailwind, axios). Já vem junto com o Node | ✅ (vem junto) |
| **VS Code** | Editor de código | ✅ (ou outro editor) |
| **Google Chrome** (ou Edge/Firefox) | Rodar o app e usar o DevTools | ✅ |
| **Extensão React Developer Tools** (no navegador) | Inspecionar componentes, props e state ao vivo | Recomendado |
| **Git** | Versionar o código / baixar o projeto do professor | Opcional |

**Extensões do VS Code recomendadas:**
- **ES7+ React/Redux/React-Native snippets** → atalhos como `rfce` para criar um componente.
- **Tailwind CSS IntelliSense** → autocompleta as classes do Tailwind e mostra o CSS gerado.
- **ESLint** → mostra no editor os avisos do lint (inclusive as regras dos hooks).
- **Prettier** → formata o código automaticamente ao salvar.

> [!NOTE]
> O template atual do Vite traz o **oxlint** no lugar do ESLint. Nesse caso, a extensão ESLint não mostra os avisos do projeto: rode `npm run lint` no terminal para vê-los.

### Como instalar o Node.js

1. Acessar **nodejs.org** e baixar a versão **LTS** (Long Term Support = versão estável).
2. Instalar com as opções padrão (no Windows, deixar marcada a opção que adiciona ao **PATH**).
3. **Fechar e abrir de novo o terminal** (o terminal antigo não enxerga o Node recém-instalado).

### O que checar (comandos no terminal)

```bash
node -v      # deve mostrar v22.x.x ou superior
npm -v       # deve mostrar 10.x.x ou superior
code -v      # (opcional) confirma o VS Code no PATH
git --version  # (opcional)
```

E um teste de rede: abrir no navegador  
`https://itunes.apple.com/search?term=queen&limit=1`  
→ tem que aparecer um JSON. Se não aparecer, a rede está bloqueando a API.

### Problemas comuns (e a solução)

| Sintoma | Causa provável | Solução |
|---|---|---|
| `node não é reconhecido como comando` | Terminal aberto antes da instalação, ou Node fora do PATH | Fechar/abrir o terminal; reinstalar marcando "Add to PATH" |
| Windows: `npm.ps1 não pode ser carregado... execução de scripts desabilitada` | Política de segurança do PowerShell | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` ou usar o **Prompt de Comando (cmd)** em vez do PowerShell |
| `npm install` trava ou dá `ETIMEDOUT` / `ECONNRESET` | Rede/proxy da faculdade | Testar no 4G do celular (roteador); ou configurar `npm config set proxy http://...` com o proxy do laboratório |
| `EACCES` / permissão negada | Pasta sem permissão de escrita (ex.: dentro de `C:\Program Files`) | Criar o projeto em `Documentos` ou na Área de Trabalho |
| Vite reclama da versão do Node | Node antigo | Atualizar para a LTS atual |
| Porta 5173 ocupada | Outro `npm run dev` aberto | Fechar o outro terminal ou aceitar a porta que o Vite sugerir |

### Checklist do professor (antes de começar)

- [ ] Projeto `sombusca` já criado e rodando na máquina do professor (para não depender da rede ao vivo).
- [ ] `node_modules` já instalado (se o `npm install` falhar ao vivo, a aula continua).
- [ ] URL do iTunes testada na rede da sala.
- [ ] Código final de cada bloco salvo (ex.: branches ou pastas `bloco-4`, `bloco-6`...) para "pular" caso algo dê errado.
- [ ] Fonte do VS Code aumentada e DevTools aberto na aba **Network**.

### Plano B (sem instalar nada)

- **StackBlitz** (`vite.new/react`) → roda um projeto Vite + React **inteiro no navegador**, com npm funcionando. Dá para seguir a aula toda.
- Ou usar o formato **CDN** que já conhecemos (um único `.html`) — perde-se o `import/export` entre arquivos, mas todos os hooks funcionam igual.

[⬆️ Voltar ao índice](#-índice)

---

## 1. Revisão relâmpago (o que já vimos)

Só para "ligar" a turma. Nada de código novo aqui — vamos reconhecer cada conceito **dentro do app** daqui a pouco.

- **React** é uma biblioteca para construir interfaces de forma **declarativa**: eu descrevo *como a tela deve ser* para um determinado estado dos dados, e o React cuida de atualizar o DOM (via Virtual DOM).
- **JSX** é açúcar sintático: `<h1 className="x">Oi</h1>` vira `React.createElement('h1', { className: 'x' }, 'Oi')`. Por isso usamos `className` (e não `class`) e `{}` para inserir expressões JavaScript.
- **Componente** = função que retorna JSX. Nome em **PascalCase** (`<TrackCard />`) para o React diferenciar de tag HTML (`<div>`).
- **Props** = parâmetros do componente. Fluem **de cima para baixo** (pai → filho) e são **somente leitura**.
- **children** = prop especial: tudo que vai *entre* a tag de abertura e fechamento (`<Card>…aqui…</Card>`).
- **Composição** = montar componentes grandes juntando componentes pequenos (na Agenda: `Card` com `Texto` e `Button` dentro).
- **key** = identificador único em listas renderizadas com `.map()` (usamos `key={compromisso.id}` na Agenda).

> [!TIP]
> **Gancho para a aula:** na Agenda os dados eram **fixos** ("SEM useState!", lembram do comentário no código?). Hoje os dados vão **vir da internet** e **mudar com a interação do usuário**. É exatamente para isso que existem **state** e **effects**.

[⬆️ Voltar ao índice](#-índice)

---

## 2. Como "buildar" o React (CDN × Vite × frameworks)

Até agora, usamos React assim:

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone/babel.min.js"></script>
<script type="text/babel"> ... </script>
```

> [!NOTE]
> 📌 **Notas rápidas antes de começar:**
> - **CDN** (*Content Delivery Network*): rede de servidores espalhados pelo mundo que entrega arquivos prontos (JS, CSS, imagens). O `unpkg.com` é uma CDN que serve os pacotes do npm direto por URL.
> - **Babel**: um *transpilador*, traduz código que o navegador não entende (JSX, JS muito novo) para JavaScript comum. O `babel-standalone` é a versão que roda dentro do navegador.
> - **UMD** (`react.development.js`): formato de arquivo que coloca a biblioteca numa variável global (`React`, `ReactDOM`), por isso não precisávamos de `import`.
> - **Build**: o processo de transformar o código-fonte que escrevemos nos arquivos finais, otimizados, que vão para o navegador.

### O que está acontecendo nesse modelo (CDN)

1. O navegador baixa o React e o ReactDOM prontos.
2. O **Babel Standalone** baixa **no navegador do usuário** e traduz o JSX para JavaScript **toda vez que a página abre**.
3. O Tailwind CDN lê o HTML em tempo de execução e gera o CSS na hora.

Ou seja: **o trabalho de "compilar" é feito no computador de quem acessa o site**. Funciona, é ótimo para aprender, mas não é como se entrega um projeto real.

### O modelo com build (Vite)

> [!NOTE]
> 📌 **Vite** (francês para "rápido", pronuncia-se *vit*): ferramenta de build e servidor de desenvolvimento para projetos front-end. Em dev, serve os arquivos quase instantaneamente; no build, gera os arquivos finais otimizados.
>
> **Bundler**: ferramenta que junta vários arquivos/módulos num pacote só (*bundle*). O Vite usa o **esbuild** e o **Rollup** (dois bundlers) por baixo.
>
> **Node.js / npm**: o Node roda JavaScript fora do navegador (é ele que executa o Vite); o npm é o gerenciador de pacotes que baixa as bibliotecas.

Com uma ferramenta de build, a compilação acontece **uma vez, na máquina do desenvolvedor**:

```
Código-fonte (JSX, imports, Tailwind)
        │  npm run build
        ▼
Vite (usa esbuild/Rollup por baixo)
  • transforma JSX → JS
  • junta os arquivos (bundle) e remove o que não é usado (tree-shaking — ver Glossário)
  • minifica (remove espaços/comentários e encurta nomes — ver Glossário)
  • gera só o CSS das classes Tailwind realmente usadas
        ▼
pasta dist/  →  HTML + JS + CSS estáticos, pequenos e prontos para publicar
```

> [!NOTE]
> **Atualização de versão:** o Vite 8, instalado hoje pelo `npm create vite`, usa o **Rolldown** para fazer esse trabalho, no lugar do esbuild e do Rollup. O conceito é o mesmo: transformar, juntar, minificar e gerar o `dist/`.

### Comparativo

| | CDN + Babel no navegador | Vite (build) | Frameworks (Next.js, React Router) |
|---|---|---|---|
| Setup | Zero, só um `.html` | `npm create vite` (1 min) | Mais configuração e conceitos |
| Precisa de Node/npm | Não | Sim | Sim |
| JSX compilado | No navegador do usuário (lento) | Na máquina do dev (rápido) | Na máquina do dev / servidor |
| `import`/`export` entre arquivos | Não (tudo num arquivo) | Sim, um componente por arquivo | Sim |
| Pacotes npm (axios etc.) | Só os que têm versão CDN | Qualquer um | Qualquer um |
| Hot reload (salvou, atualizou) | Não, F5 manual | Sim (HMR, ver Glossário) | Sim |
| Tailwind | Gera CSS no navegador, não recomendado em produção | Gera só o CSS usado, no build | Idem |
| Produção | Não recomendado | ✅ SPA (ver Glossário) | ✅ quando precisa de rotas, SSR, SEO (ver Glossário) |
| Quando usar | Aula, protótipo, teste rápido | **Padrão para apps React hoje** | Projetos maiores |

> [!NOTE]
> **Observação histórica:** o antigo `create-react-app` foi descontinuado pelo time do React (2025). Hoje a recomendação é Vite ou um framework.

### Mão na massa: criando o projeto

Pré-requisito: ambiente preparado conforme a **seção 0** (`node -v` e `npm -v` funcionando).

```bash
npm create vite@latest sombusca -- --template react
cd sombusca
npm install
npm run dev
```

- `npm create vite` → gera a estrutura do projeto já configurada para React.
- `npm install` → baixa as dependências listadas no `package.json` para a pasta `node_modules`.
- `npm run dev` → sobe um servidor de desenvolvimento (geralmente `http://localhost:5173`) com hot reload.

> [!NOTE]
> Versões usadas neste tutorial: **Node 24, React 19, Vite 8 e Tailwind 4**. Dependendo da versão, o `npm create vite` pode fazer perguntas extras no terminal. As opções padrão servem.

Estrutura gerada (o que importa):

```
sombusca/
├── index.html        ← o mesmo <div id="root"> de sempre
├── package.json      ← dependências e scripts (dev, build, preview)
├── vite.config.js    ← configuração do Vite
└── src/
    ├── main.jsx      ← ponto de entrada: monta o <App /> no #root
    ├── App.jsx
    └── index.css
```

> [!IMPORTANT]
> O template também traz arquivos da tela de demonstração, como `public/`, `src/assets/` e `src/App.css`, além do `.oxlintrc.json` (configuração do lint). O `App.jsx` gerado importa `App.css` e `src/assets/`, então **só apague esses dois depois de substituir o `App.jsx`** pela versão desta aula. Se apagar antes, o Vite mostra erro de importação.

Mostrar para a turma que o `main.jsx` faz **a mesma coisa** que fazíamos no `<script type="text/babel">`:

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- Antes era `ReactDOM.createRoot(...)` com o React vindo de uma variável global; agora usamos `import`, porque cada arquivo é um **módulo**.
- `StrictMode` é um modo de desenvolvimento que faz verificações extras. **Guardem isso**: ele vai fazer os efeitos rodarem 2× em dev (explico na parte do `useEffect`).

### Tailwind integrado ao build (Tailwind v4 + Vite)

```bash
npm install tailwindcss @tailwindcss/vite
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

```css
/* src/index.css — apague o conteúdo padrão e deixe só: */
@import "tailwindcss";
```

**O que mudou em relação ao CDN:**
- O plugin do Tailwind **varre os arquivos `.jsx`** procurando classes (`bg-zinc-900`, `rounded-xl`...) e gera um CSS **apenas com o que foi usado**.
- No CDN, o navegador gerava esse CSS em tempo de execução; aqui ele já sai pronto e minúsculo no `dist/`.
- No React, as classes vão em `className` — e como é JavaScript, podemos montar classes dinamicamente: `` className={`px-4 ${ativo ? 'bg-pink-500' : 'bg-zinc-800'}`} `` (mesma técnica do `variants` do nosso `Button` da Agenda).

### Build de produção

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve o dist/ localmente para conferir
```

Mostrar a pasta `dist/`: um `index.html`, um `.js` e um `.css` com hash no nome (ex.: `index-a1b2c3.js`). O hash muda a cada build, o que força o navegador a baixar a versão nova (cache busting). **É esse `dist/` que se publica** (Vercel, Netlify, GitHub Pages, um servidor qualquer).

[⬆️ Voltar ao índice](#-índice)

---

## 3. O contrato da API do iTunes

### O que é

A **iTunes Search API** é uma API **pública** da Apple: não precisa de cadastro nem de chave (API key). Ela permite buscar músicas, álbuns, artistas, podcasts, filmes etc. do catálogo da loja.

> [!NOTE]
> 📌 **API** (*Application Programming Interface*): um conjunto de endereços e regras para um programa conversar com outro. Aqui, uma **API REST/HTTP**: pedimos dados por uma URL e recebemos a resposta em **JSON** (texto estruturado em chaves e valores, igual a objeto JS).

### O que é um "contrato"

Contrato de API é o **acordo** entre quem consome e quem fornece: *"se você me chamar neste endereço, com estes parâmetros, eu te devolvo uma resposta neste formato"*. Nosso código depende desse acordo — se a resposta mudar, o código quebra. Por isso vamos **isolar** o acesso à API em um arquivo só.

### Requisição

```
GET https://itunes.apple.com/search?term=legiao+urbana&media=music&entity=song&country=BR&limit=25
```

| Parâmetro | Obrigatório | O que faz | Exemplo |
|---|---|---|---|
| `term` | ✅ | Texto da busca (espaços viram `+` ou `%20`) | `legiao+urbana` |
| `media` | | Tipo de mídia | `music`, `podcast`, `movie`... |
| `entity` | | Tipo de resultado dentro da mídia | `song`, `album`, `musicArtist` |
| `country` | | Loja de qual país (código de 2 letras) | `BR` |
| `limit` | | Quantos resultados (1 a 200, padrão 50) | `25` |

- **Método:** `GET` (só leitura).
- **Autenticação:** nenhuma.
- **Limite de uso:** a Apple documenta algo em torno de **20 chamadas por minuto**. Por isso a busca é disparada no **submit** do formulário, não a cada tecla.

> [!TIP]
> **Demonstração:** cole a URL acima direto na barra do navegador. Ele mostra o JSON cru. Isso prova que é só HTTP — o React não tem nada de mágico aqui.

### Resposta (formato resumido)

```json
{
  "resultCount": 25,
  "results": [
    {
      "trackId": 123456789,
      "trackName": "Tempo Perdido",
      "artistName": "Legião Urbana",
      "collectionName": "Dois",
      "artworkUrl100": "https://.../100x100bb.jpg",
      "previewUrl": "https://.../preview.m4a",
      "primaryGenreName": "Rock",
      "releaseDate": "1986-01-01T08:00:00Z",
      "trackTimeMillis": 302000
    }
  ]
}
```

Campos que vamos usar:

| Campo | Uso no app |
|---|---|
| `trackId` | **key** da lista e identificador dos favoritos |
| `trackName`, `artistName`, `collectionName` | Textos do card |
| `artworkUrl100` | Capa (trocamos `100x100` por `300x300` na URL para pegar uma imagem maior) |
| `previewUrl` | Trecho de ~30s em áudio, toca com `<audio>` |
| `primaryGenreName` | Badge de gênero |
| `releaseDate` | Ano |
| `trackTimeMillis` | Duração (convertemos para `m:ss`) |

### Preciso de um back-end?

Não para este app. A API aceita chamadas direto do navegador (CORS liberado — ver Glossário) e não tem chave secreta para esconder. **Um back-end intermediário (proxy) faria sentido se:**
- a API exigisse uma **chave secreta** (nunca coloque chave no front-end: qualquer um vê no DevTools);
- quiséssemos **cache** para não estourar o limite de chamadas;
- a API **bloqueasse CORS**.

(No final do documento tem um bônus com um proxy de 15 linhas em Express, caso queira mostrar.)

[⬆️ Voltar ao índice](#-índice)

---

## Estrutura final do app

```
src/
├── main.jsx
├── App.jsx                      ← estado principal e "maestro" da tela
├── index.css                    ← @import "tailwindcss"
├── services/
│   └── itunesApi.js             ← ÚNICO lugar que conhece o contrato da API
├── hooks/
│   ├── useItunesSearch.js       ← custom hook: busca + loading/erro/sucesso
│   └── useLocalStorage.js       ← custom hook: estado que persiste no navegador
└── components/
    ├── Layout.jsx               ← children
    ├── Navbar.jsx               ← menu (lista + key + evento)
    ├── Button.jsx               ← props com valor padrão + rest/spread
    ├── Card.jsx                 ← children
    ├── SearchForm.jsx           ← controlled components + validação
    ├── ResultadoBusca.jsx       ← renderização condicional (loading/erro/vazio/sucesso)
    ├── TrackList.jsx            ← lista + key
    ├── TrackCard.jsx            ← props + evento subindo para o pai
    ├── StatusMessage.jsx        ← feedback na UI
    └── ContadorClasse.jsx       ← class component (bloco 7)
```

> [!NOTE]
> Se você também fizer o bônus da seção 8, a pasta `components/` ganha ainda o arquivo `ErrorBoundary.jsx`.

**Por que separar assim?** Cada pasta tem uma responsabilidade:
- `services/` → **fala com o mundo externo** (HTTP).
- `hooks/` → **lógica reutilizável** com estado.
- `components/` → **visual**. Componentes não sabem de onde os dados vêm; só recebem props.

Vamos construir **de baixo para cima**: primeiro os componentes simples, depois o serviço, depois os hooks, e por último o `App` juntando tudo.

[⬆️ Voltar ao índice](#-índice)

---

## 4. Componentes base (revisão aplicada: props, children, composição)

### `Button.jsx` — props com valor padrão e "resto" das props

```jsx
// src/components/Button.jsx
const variantes = {
  primary: 'bg-pink-500 hover:bg-pink-400 text-white',
  ghost: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100',
}

export function Button({ children, variant = 'primary', className = '', ...rest }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${variantes[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
```

- `variant = 'primary'` → **valor padrão** da prop: se o pai não mandar, usa `'primary'`.
- `...rest` → **"o resto" das props** (ex.: `type`, `onClick`, `disabled`, `aria-label`). Em vez de declarar uma por uma, coletamos todas...
- `{...rest}` no `<button>` → ...e **espalhamos** no elemento HTML. Assim, `<Button type="submit">` funciona sem que o `Button` precise saber o que é `type`.
- `children` → o texto/ícone do botão vem de fora: `<Button>Buscar</Button>`.
- `export function` → **export nomeado**: importamos com `import { Button } from './Button'`. (O `App` usa `export default`, importado sem chaves. Mostrar a diferença.)

### `Card.jsx` — children puro

```jsx
// src/components/Card.jsx
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg ${className}`}>
      {children}
    </div>
  )
}
```

O `Card` **não sabe** o que vai dentro dele. Ele só define a "moldura". Quem usa decide o conteúdo. Esse é o padrão de reutilização mais importante do React.

### `Navbar.jsx` — lista com key + evento que "sobe" para o pai

```jsx
// src/components/Navbar.jsx
const abas = [
  { id: 'buscar', rotulo: '🔎 Buscar' },
  { id: 'favoritos', rotulo: '❤️ Favoritos' },
]

export function Navbar({ abaAtiva, onTrocarAba, totalFavoritos }) {
  return (
    <nav className="flex gap-2">
      {abas.map((aba) => (
        <button
          key={aba.id}
          onClick={() => onTrocarAba(aba.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            abaAtiva === aba.id ? 'bg-pink-500 text-white' : 'text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          {aba.rotulo}
          {aba.id === 'favoritos' && totalFavoritos > 0 && (
            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">{totalFavoritos}</span>
          )}
        </button>
      ))}
    </nav>
  )
}
```

- **Menu gerado por array + `.map()`**: para adicionar uma aba nova, basta adicionar um item no array.
- **`key={aba.id}`**: o React usa a key para saber *qual item é qual* entre uma renderização e outra. Deve ser **única e estável** — por isso usamos `id`, não o índice do array (o índice muda se a lista for reordenada ou filtrada).
- **`onClick={() => onTrocarAba(aba.id)}`**: passamos uma **função** (arrow function), não o resultado dela. Se escrevêssemos `onClick={onTrocarAba(aba.id)}`, ela seria **executada na renderização**, não no clique. Erro clássico!
- **Comunicação filho → pai**: a `Navbar` **não troca a aba sozinha**. Ela recebe uma função do pai (`onTrocarAba`) e a chama. O estado mora no pai. Convenção: props de evento começam com `on`.
- **`&&` para renderização condicional**: `condição && <JSX />` → se a condição for falsa, não renderiza nada. (Cuidado: `0 && ...` renderiza o `0` na tela; por isso escrevemos `totalFavoritos > 0`.)
- **className dinâmico**: template string + ternário para estilizar a aba ativa.

### `Layout.jsx` — children como "slot" da página

```jsx
// src/components/Layout.jsx
import { Navbar } from './Navbar'

export function Layout({ children, abaAtiva, onTrocarAba, totalFavoritos }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            SomBusca
          </h1>
          <Navbar abaAtiva={abaAtiva} onTrocarAba={onTrocarAba} totalFavoritos={totalFavoritos} />
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">{children}</main>
    </div>
  )
}
```

- `Layout` repassa props para a `Navbar` (o `Layout` é um "intermediário"). Isso se chama **prop drilling** — em apps maiores resolvemos com Context, mas aqui é perfeitamente ok.
- O conteúdo de cada aba entra no `{children}` do `<main>`.

### `StatusMessage.jsx` — feedback na UI

```jsx
// src/components/StatusMessage.jsx
const estilos = {
  info: 'text-zinc-400',
  erro: 'text-red-400 bg-red-950/40 border border-red-900',
}

export function StatusMessage({ icone, titulo, children, tipo = 'info' }) {
  return (
    <div className={`text-center py-16 rounded-2xl ${estilos[tipo]}`}>
      <div className="text-5xl mb-3">{icone}</div>
      <p className="text-lg font-semibold">{titulo}</p>
      {children && <p className="text-sm mt-1 opacity-80">{children}</p>}
    </div>
  )
}
```

Um componente para **todos os estados "não-sucesso"** da tela (vazio, erro, nenhum resultado). Reutilizado várias vezes com props diferentes.

### `TrackCard.jsx` e `TrackList.jsx`

```jsx
// src/components/TrackCard.jsx
import { Card } from './Card'

export function TrackCard({ faixa, favorito, onToggleFavorito }) {
  return (
    <Card className="group flex flex-col">
      <div className="relative">
        <img src={faixa.capa} alt={`Capa de ${faixa.album}`} className="w-full aspect-square object-cover" />
        <button
          onClick={() => onToggleFavorito(faixa)}
          aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-xl hover:scale-110 transition-transform"
        >
          {favorito ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold leading-tight line-clamp-2">{faixa.titulo}</h3>
        <p className="text-sm text-zinc-400">{faixa.artista}</p>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300">{faixa.genero}</span>
          {faixa.ano && <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">{faixa.ano}</span>}
          <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">{faixa.duracao}</span>
        </div>
        {faixa.preview && <audio controls src={faixa.preview} className="w-full mt-auto h-9" />}
      </div>
    </Card>
  )
}
```

```jsx
// src/components/TrackList.jsx
import { TrackCard } from './TrackCard'

export function TrackList({ faixas, idsFavoritos, onToggleFavorito }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {faixas.map((faixa) => (
        <TrackCard
          key={faixa.id}
          faixa={faixa}
          favorito={idsFavoritos.includes(faixa.id)}
          onToggleFavorito={onToggleFavorito}
        />
      ))}
    </div>
  )
}
```

- `TrackCard` usa o `Card` → **composição**.
- A `key` vai **no componente dentro do `.map()`** (`<TrackCard key=...>`), não lá dentro do `TrackCard`. E a `key` **não chega como prop** no filho — é de uso interno do React.
- `TrackList` é usado **duas vezes** no app (resultados da busca e favoritos) → **reutilização**.
- Grid responsivo do Tailwind: 1 coluna no celular, 2 em `sm`, 4 em `lg`.
- `group` no Card permite estilizar filhos no hover do pai (`group-hover:...`), caso queiram explorar.

> [!TIP]
> ✅ **Checkpoint:** até aqui, **nada de novo** — é tudo o que fizemos na Agenda, só que com arquivos separados e `import/export`. Dá para testar renderizando um `TrackList` com um array fixo de 2 faixas no `App`.

[⬆️ Voltar ao índice](#-índice)

---

## 5. `useState` e controlled components (primeira vez!)

### O problema

Variável comum não funciona para dados que mudam na tela:

```jsx
function Contador() {
  let contador = 0
  return <button onClick={() => { contador++; console.log(contador) }}>{contador}</button>
}
```

O console mostra 1, 2, 3... mas a tela continua `0`. Por quê?
1. O React **não sabe** que a variável mudou, então não renderiza de novo.
2. E mesmo que renderizasse, a função rodaria do zero e `contador` voltaria a `0`.

### A solução: state

```jsx
import { useState } from 'react'

function Contador() {
  const [contador, setContador] = useState(0)
  return <button onClick={() => setContador(contador + 1)}>{contador}</button>
}
```

- `useState(0)` → cria um estado com valor inicial `0`. Retorna um **array de 2 posições** (por isso a desestruturação `[a, b]`):
  - `contador` → o **valor atual**;
  - `setContador` → a **função que atualiza** o valor **e avisa o React para renderizar de novo**.
- O React **guarda** o valor entre as renderizações (fica "fora" da função).
- **Nunca altere o state diretamente** (`contador = 5` ou `lista.push(x)`). Sempre use o `set...`, criando um **novo** valor.
- Quando o novo valor depende do anterior, prefira a **forma funcional**: `setContador(anterior => anterior + 1)`. Ela garante que você está usando o valor mais recente (vamos usar isso nos favoritos).

**Props × State:**

| | Props | State |
|---|---|---|
| Quem define | O pai | O próprio componente |
| Pode mudar? | Não (leitura) | Sim, via `set...` |
| Analogia | Argumentos de uma função | Memória do componente |

Quando o state muda, o componente **e seus filhos** renderizam de novo, recebendo props atualizadas. É assim que a tela "reage".

### Controlled component: o formulário de busca

Em HTML puro, o `<input>` guarda o próprio valor. Em React, o padrão é o **state ser a fonte da verdade**: o input **mostra** o que está no state e **avisa** quando o usuário digita.

```
usuário digita  →  onChange  →  setTermo(novo valor)  →  re-render  →  value={termo}
```

```jsx
// src/components/SearchForm.jsx
import { useState } from 'react'
import { Button } from './Button'

export function SearchForm({ onBuscar, carregando }) {
  const [termo, setTermo] = useState('')
  const [limite, setLimite] = useState(24)
  const [erro, setErro] = useState('')

  function handleSubmit(evento) {
    evento.preventDefault() // impede o recarregamento da página (comportamento padrão do form)

    const termoLimpo = termo.trim()
    if (termoLimpo.length < 2) {
      setErro('Digite pelo menos 2 caracteres.')
      return
    }

    setErro('')
    onBuscar({ termo: termoLimpo, limite }) // avisa o pai: "o usuário quer buscar isso"
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Artista, música ou álbum..."
          className={`flex-1 bg-zinc-950 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500 ${
            erro ? 'border-red-500' : 'border-zinc-700'
          }`}
        />
        <select
          value={limite}
          onChange={(e) => setLimite(Number(e.target.value))}
          className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2"
        >
          <option value={12}>12 resultados</option>
          <option value={24}>24 resultados</option>
          <option value={48}>48 resultados</option>
        </select>
        <Button type="submit" disabled={carregando}>
          {carregando ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
      {erro && <p className="text-sm text-red-400">{erro}</p>}
      <p className="text-xs text-zinc-500">{termo.length} caracteres digitados</p>
    </form>
  )
}
```

Pontos para explicar:
- **`value` + `onChange` juntos** = controlled. Se colocar só `value` sem `onChange`, o input fica "travado" (o React avisa no console).
- **`e.target.value`** → `e` é o **evento sintético** do React (vimos na Aula 6); `target` é o elemento que disparou; `value` é o texto.
- **`Number(e.target.value)`** → valores de `<select>`/`<input>` sempre chegam como **string**.
- **`onSubmit` no `<form>`** (e não `onClick` no botão) → assim o Enter também envia.
- **`preventDefault()`** → o form em HTML recarrega a página ao enviar; aqui não queremos isso.
- **Validação e feedback na UI**: o erro é *mais um state*. A borda fica vermelha e a mensagem aparece **porque o state mudou** — não manipulamos o DOM na mão.
- **Vantagem do controlled**: o valor está sempre disponível em JS (contador de caracteres ao vivo, validação, limpar o campo com `setTermo('')`).
- **Estado local × estado do pai**: o texto digitado é estado **local** do formulário (ninguém mais precisa dele a cada tecla). Só no submit avisamos o pai com `onBuscar`.

[⬆️ Voltar ao índice](#-índice)

---

## ☕ Intervalo (20:20 – 20:35)

---

## 6. `useEffect` + requisições HTTP

### O serviço da API (isolando o contrato)

```js
// src/services/itunesApi.js
const BASE_URL = 'https://itunes.apple.com/search'

export async function buscarMusicas(termo, limite, signal) {
  const params = new URLSearchParams({
    term: termo,
    media: 'music',
    entity: 'song',
    country: 'BR',
    limit: String(limite),
  })

  const resposta = await fetch(`${BASE_URL}?${params}`, { signal })

  if (!resposta.ok) {
    throw new Error(`A API respondeu com erro ${resposta.status}`)
  }

  const dados = await resposta.json()
  return dados.results.map(converterFaixa)
}

// "Adapter": traduz o formato da Apple para o formato do NOSSO app
function converterFaixa(item) {
  return {
    id: item.trackId,
    titulo: item.trackName,
    artista: item.artistName,
    album: item.collectionName,
    capa: item.artworkUrl100?.replace('100x100', '300x300'),
    preview: item.previewUrl,
    genero: item.primaryGenreName,
    ano: item.releaseDate ? new Date(item.releaseDate).getFullYear() : null,
    duracao: formatarDuracao(item.trackTimeMillis),
  }
}

function formatarDuracao(ms) {
  if (!ms) return '--:--'
  const totalSegundos = Math.round(ms / 1000)
  const minutos = Math.floor(totalSegundos / 60)
  const segundos = String(totalSegundos % 60).padStart(2, '0')
  return `${minutos}:${segundos}`
}
```

Explicar linha a linha:
- **`URLSearchParams`** monta a query string e já faz o encoding (`legião urbana` → `legi%C3%A3o+urbana`). Nunca concatene texto do usuário direto na URL.
- **`fetch`** é nativo do navegador e retorna uma **Promise**. `await` espera a resposta chegar.
- **`resposta.ok`** → `true` para status 200–299. **Atenção:** o `fetch` **não lança erro** em 404/500, só em falha de rede. Por isso conferimos na mão.
- **`resposta.json()`** → também é assíncrono: lê o corpo e converte de texto JSON para objeto.
- **`signal`** → permite **cancelar** a requisição (usaremos no `useEffect`).
- **`converterFaixa` (adapter)** → se a Apple mudar `trackName` para `name`, só mexemos **aqui**. Os componentes usam `faixa.titulo` e nunca souberam o nome original. Isso é proteger o app do contrato externo.
- **`?.`** (optional chaining) → se `artworkUrl100` vier `undefined`, não quebra.

**Mesma função com axios** (para comparar):

```bash
npm install axios
```

```js
import axios from 'axios'

export async function buscarMusicas(termo, limite, signal) {
  const { data } = await axios.get('https://itunes.apple.com/search', {
    params: { term: termo, media: 'music', entity: 'song', country: 'BR', limit: limite },
    signal,
  })
  return data.results.map(converterFaixa)
}
```

| | fetch | axios |
|---|---|---|
| Instalação | Nativo | `npm install axios` |
| JSON | `await resposta.json()` manual | Já vem em `data` |
| Erro em 4xx/5xx | Não lança, precisa checar `ok` | Lança automaticamente |
| Query string | `URLSearchParams` | Opção `params` |
| Extras | — | Interceptors, timeout, instância com baseURL |

> [!NOTE]
> Note que **só podemos usar axios porque temos build** (npm). No modelo CDN isso seria mais chato. Mais um ponto para o Vite.

### Onde chamar a API? O problema

Se chamarmos `fetch` direto no corpo do componente:

```jsx
function App() {
  const [faixas, setFaixas] = useState([])
  buscarMusicas('rock', 10).then(setFaixas) // ❌
  ...
}
```

Loop infinito: renderiza → busca → `setFaixas` → renderiza → busca → ...

O corpo do componente deve ser **puro**: só calcular e retornar JSX. Tudo que "sai" do React (HTTP, timers, `localStorage`, `document.title`) é **efeito colateral** e vai no `useEffect`.

### `useEffect`: anatomia

```jsx
useEffect(() => {
  // 1. código do efeito: roda DEPOIS que a tela foi pintada

  return () => {
    // 2. limpeza (opcional): roda antes do próximo efeito e quando o componente sai da tela
  }
}, [dependencias]) // 3. QUANDO rodar de novo
```

O array de dependências é o mais importante:

| Dependências | Quando o efeito roda | Exemplo |
|---|---|---|
| *(sem array)* | Depois de **toda** renderização | Raramente o que você quer |
| `[]` | Só **uma vez**, quando o componente aparece | Carregar dados iniciais |
| `[termo]` | Na primeira vez **e sempre que `termo` mudar** | Buscar quando o termo muda |

**Regra:** tudo que o efeito **usa** de props/state deve estar nas dependências. Se esquecer, o efeito usa um valor "velho". (O ESLint do template do Vite avisa — plugin `react-hooks`.)

> [!NOTE]
> No template atual, o lint é o **oxlint**, configurado no arquivo `.oxlintrc.json`. Para ver os avisos, rode `npm run lint`.

### Primeiro efeito, o mais simples possível

```jsx
useEffect(() => {
  document.title = `SomBusca · ${favoritos.length} favoritos`
}, [favoritos.length])
```

Mexer no título da aba está **fora** do React → efeito. Só precisa rodar quando a quantidade de favoritos mudar.

### Os 3 estados de uma requisição (loading, erro, sucesso)

Toda chamada HTTP passa por estados, e **a UI precisa mostrar cada um**:

```
 ocioso ──buscar──▶ carregando ──┬──▶ sucesso (com resultados)
                                 ├──▶ sucesso (lista vazia)
                                 └──▶ erro
```

Cada um vira um state: `resultados`, `carregando`, `erro`. Vamos colocar isso em um **custom hook** (próximo bloco), mas primeiro a lógica:

```jsx
useEffect(() => {
  if (!termo) return // ainda não buscou nada → não faz requisição

  const controller = new AbortController()
  setCarregando(true)
  setErro(null)

  buscarMusicas(termo, limite, controller.signal)
    .then((faixas) => setResultados(faixas))
    .catch((e) => {
      if (e.name !== 'AbortError') setErro(e.message)
    })
    .finally(() => {
      if (!controller.signal.aborted) setCarregando(false)
    })

  return () => controller.abort() // limpeza: cancela a requisição anterior
}, [termo, limite])
```

- **Por que a limpeza com `AbortController`?** Se o usuário busca "rock" e logo depois "jazz", pode acontecer de "rock" responder **depois** de "jazz" e sobrescrever a tela com o resultado errado (*race condition*). A limpeza cancela a requisição antiga antes de começar a nova.
- **`AbortError`** → quando cancelamos, o `fetch` lança esse erro. Não é erro de verdade, então ignoramos.
- **StrictMode em dev:** lembram dele no `main.jsx`? Em desenvolvimento, o React **monta, desmonta e monta de novo** cada componente para testar se a limpeza está certa. Por isso vocês vão ver **2 requisições na aba Network** (a primeira cancelada). **Em produção, acontece só uma.** Isso não é bug — é o React verificando nosso código.

> [!TIP]
> 💡 Mostrar no DevTools → aba **Network** → filtro "Fetch/XHR": a URL, o status 200, o JSON de resposta e a requisição "(canceled)" do StrictMode. Depois, em Network, colocar **"Offline"** e buscar para ver o estado de erro aparecendo.

> [!WARNING]
> Com o código mostrado até aqui, voltar a rede e repetir **o mesmo termo** não faz nova requisição, e o erro continua na tela. A explicação e a solução estão em [🐞 Correção: repetir a busca depois de um erro](#-correção-repetir-a-busca-depois-de-um-erro).

### Renderização condicional dos estados: `ResultadoBusca.jsx`

```jsx
// src/components/ResultadoBusca.jsx
import { StatusMessage } from './StatusMessage'
import { TrackList } from './TrackList'

export function ResultadoBusca({ termo, carregando, erro, faixas, idsFavoritos, onToggleFavorito }) {
  if (!termo) {
    return <StatusMessage icone="🎧" titulo="O que vamos ouvir hoje?">Busque por um artista ou música.</StatusMessage>
  }

  if (carregando) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] rounded-2xl bg-zinc-900 animate-pulse" />
        ))}
      </div>
    )
  }

  if (erro) {
    return <StatusMessage tipo="erro" icone="⚠️" titulo="Não foi possível buscar">{erro}</StatusMessage>
  }

  if (faixas.length === 0) {
    return <StatusMessage icone="🔍" titulo={`Nada encontrado para "${termo}"`}>Tente outro termo.</StatusMessage>
  }

  return (
    <section className="space-y-4">
      <p className="text-zinc-400">{faixas.length} resultados para <strong className="text-zinc-100">"{termo}"</strong></p>
      <TrackList faixas={faixas} idsFavoritos={idsFavoritos} onToggleFavorito={onToggleFavorito} />
    </section>
  )
}
```

As **3 formas** de renderização condicional, todas no app:

| Forma | Quando usar | Onde no app |
|---|---|---|
| `if (...) return ...` (early return) | Telas inteiramente diferentes | `ResultadoBusca` |
| `condicao ? <A/> : <B/>` (ternário) | Escolher entre duas opções | Ícone ❤️/🤍, aba ativa, texto do botão |
| `condicao && <A/>` | Mostrar ou não mostrar | Mensagem de erro do form, badge de ano |

- **Skeleton de loading**: `Array.from({ length: 8 })` cria 8 itens "falsos" + `animate-pulse` do Tailwind. Aqui usar o índice `i` como key **é aceitável**: a lista é fixa, não reordena e não tem dados.

[⬆️ Voltar ao índice](#-índice)

---

## 7. Custom hooks + regras dos hooks

### Por que extrair um hook?

A lógica de busca (3 states + 1 effect) está "poluindo" o `App`. E se outra tela precisar buscar também? Um **custom hook** é só **uma função que usa outros hooks** e cujo nome começa com `use`. Ele extrai **lógica**, não visual.

> [!IMPORTANT]
> Componente reutiliza **visual**. Custom hook reutiliza **lógica com estado**.

### `useItunesSearch.js`

```js
// src/hooks/useItunesSearch.js
import { useEffect, useState } from 'react'
import { buscarMusicas } from '../services/itunesApi'

export function useItunesSearch(termo, limite) {
  const [resultados, setResultados] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    if (!termo) return

    const controller = new AbortController()
    setCarregando(true)
    setErro(null)

    buscarMusicas(termo, limite, controller.signal)
      .then(setResultados)
      .catch((e) => {
        if (e.name !== 'AbortError') setErro(e.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setCarregando(false)
      })

    return () => controller.abort()
  }, [termo, limite])

  return { resultados, carregando, erro }
}
```

Uso no componente — **uma linha**:

```jsx
const { resultados, carregando, erro } = useItunesSearch(busca.termo, busca.limite)
```

- `.then(setResultados)` é o mesmo que `.then((faixas) => setResultados(faixas))`.
- O hook retorna um **objeto** (desestruturamos pelo nome). Poderia retornar array como o `useState` — objeto é melhor quando são mais de 2 valores.
- **Cada componente que chama o hook tem seu próprio state.** Hooks compartilham *lógica*, não *dados*.

> [!NOTE]
> ℹ️ Nota para o professor: dependendo da versão do `eslint-plugin-react-hooks` do template, o lint pode sugerir evitar `setState` síncrono dentro do effect. Para fins didáticos o padrão acima é o clássico e funciona; em projetos maiores, bibliotecas como TanStack Query resolvem busca/cache/loading.

> [!NOTE]
> No template atual, esse aviso aparece no `npm run lint` como `set-state-in-effect`, na linha do `setCarregando(true)`. Ele é esperado e o app funciona normalmente.

### `useLocalStorage.js` — state que sobrevive ao F5

```js
// src/hooks/useLocalStorage.js
import { useEffect, useState } from 'react'

export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const salvo = localStorage.getItem(chave)
    return salvo ? JSON.parse(salvo) : valorInicial
  })

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(valor))
  }, [chave, valor])

  return [valor, setValor]
}
```

- **Mesma "cara" do `useState`** (retorna `[valor, setValor]`), mas persiste no navegador. Quem usa nem percebe a diferença.
- **`useState(() => ...)` — inicialização preguiçosa (lazy)**: passando uma *função*, o React só a executa **na primeira renderização**. Sem isso, leríamos o `localStorage` a cada render à toa.
- **`localStorage` só guarda texto** → `JSON.stringify` para salvar, `JSON.parse` para ler.
- **Organização de efeitos**: um efeito = uma responsabilidade. Este só sincroniza com o `localStorage`. O de busca só busca. O do título só mexe no título. Não misture tudo num efeitão.

### Regras dos hooks (as duas regras de ouro)

1. **Só chame hooks no nível superior** do componente/hook. Nunca dentro de `if`, `for`, função interna ou depois de um `return` antecipado.
2. **Só chame hooks em componentes React ou em custom hooks** (funções `use...`). Nunca em funções JS comuns ou no `services/`.

**Por quê?** O React identifica cada hook pela **ordem** em que é chamado: "o 1º `useState` é o `aba`, o 2º é o `busca`...". Se um `if` pular um hook numa renderização, a ordem muda e o React entrega o state errado para a variável errada.

```jsx
// ❌ ERRADO
if (aba === 'buscar') {
  const [termo, setTermo] = useState('')
}

// ✅ CERTO: chama sempre, decide depois
const [termo, setTermo] = useState('')
if (aba === 'buscar') { /* usa termo */ }
```

Repare no `ResultadoBusca`: ele tem vários `return` antecipados, mas **não usa nenhum hook** — por isso pode. Se usasse, os hooks teriam que vir **antes** do primeiro `if`.

### `App.jsx` — juntando tudo

```jsx
// src/App.jsx
import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { SearchForm } from './components/SearchForm'
import { ResultadoBusca } from './components/ResultadoBusca'
import { TrackList } from './components/TrackList'
import { StatusMessage } from './components/StatusMessage'
import { useItunesSearch } from './hooks/useItunesSearch'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  // ----- state -----
  const [aba, setAba] = useState('buscar')
  const [busca, setBusca] = useState({ termo: '', limite: 24 })
  const [favoritos, setFavoritos] = useLocalStorage('sombusca:favoritos', [])

  // ----- custom hook de dados -----
  const { resultados, carregando, erro } = useItunesSearch(busca.termo, busca.limite)

  // ----- efeito simples -----
  useEffect(() => {
    document.title = `SomBusca · ${favoritos.length} favoritos`
  }, [favoritos.length])

  // ----- valores derivados (calculados, NÃO são state) -----
  const idsFavoritos = favoritos.map((f) => f.id)

  // ----- handlers -----
  function alternarFavorito(faixa) {
    setFavoritos((atuais) =>
      atuais.some((f) => f.id === faixa.id)
        ? atuais.filter((f) => f.id !== faixa.id) // remove
        : [...atuais, faixa]                        // adiciona (novo array!)
    )
  }

  return (
    <Layout abaAtiva={aba} onTrocarAba={setAba} totalFavoritos={favoritos.length}>
      {aba === 'buscar' ? (
        <>
          <SearchForm onBuscar={setBusca} carregando={carregando} />
          <ResultadoBusca
            termo={busca.termo}
            carregando={carregando}
            erro={erro}
            faixas={resultados}
            idsFavoritos={idsFavoritos}
            onToggleFavorito={alternarFavorito}
          />
        </>
      ) : favoritos.length === 0 ? (
        <StatusMessage icone="💔" titulo="Nenhum favorito ainda">
          Toque no 🤍 de uma música para salvá-la aqui.
        </StatusMessage>
      ) : (
        <TrackList faixas={favoritos} idsFavoritos={idsFavoritos} onToggleFavorito={alternarFavorito} />
      )}
    </Layout>
  )
}
```

Pontos finais para amarrar:
- **"Levantar o estado" (lifting state up)**: `favoritos` mora no `App` porque **duas partes** da tela precisam dele (o contador da Navbar e os cards). O estado fica no **ancestral comum** mais próximo.
- **`onBuscar={setBusca}`** → passamos a própria função `set` como prop. O `SearchForm` chama `onBuscar({ termo, limite })` e isso atualiza o state do `App` → o hook percebe a mudança de `termo` → dispara o effect → busca.
- **Valor derivado não é state**: `idsFavoritos` é calculado a partir de `favoritos`. Não crie um state para algo que dá para calcular — você teria duas fontes da verdade para manter sincronizadas.
- **Imutabilidade**: `[...atuais, faixa]` e `.filter()` criam **arrays novos**. Se fizéssemos `atuais.push(faixa)`, o React compararia o array com ele mesmo, acharia que nada mudou e **não renderizaria**.
- **Fragment `<>...</>`**: o ternário precisa de **um** elemento; o fragment agrupa `SearchForm` + `ResultadoBusca` sem criar uma `<div>` extra no HTML.

**O fluxo completo, para desenhar no quadro:**

```
[SearchForm] usuário digita → state local (termo)
     │ submit
     ▼
onBuscar({termo, limite}) → setBusca no [App]
     ▼
useItunesSearch percebe termo novo → useEffect
     ▼
carregando=true → skeleton   →   fetch na API do iTunes
     ▼
resultados=[...] → [ResultadoBusca] → [TrackList] → .map → [TrackCard key=id]
     ▼
clique no 🤍 → onToggleFavorito(faixa) → setFavoritos no [App]
     ▼
useLocalStorage salva  ·  Navbar atualiza contador  ·  título da aba muda
```

### 🐞 Correção: repetir a busca depois de um erro

**Sintoma:** a busca falha (por exemplo, sem internet). A rede volta, a pessoa clica em **Buscar** com o mesmo termo e nada acontece: nenhuma requisição é enviada e o erro continua na tela.

**Causa:** o efeito depende de `[termo, limite]`. O React compara cada dependência com o valor da renderização anterior e, como o texto `'queen'` é igual a `'queen'`, conclui que nada mudou e não executa o efeito.

**Solução:** fazer o efeito depender do **objeto** `busca`. A cada envio, o `SearchForm` cria um objeto novo em `onBuscar({ termo: termoLimpo, limite })`. Dois objetos diferentes nunca são considerados iguais, mesmo com o mesmo conteúdo, então cada envio dispara o efeito.

```diff
 // src/hooks/useItunesSearch.js
-export function useItunesSearch(termo, limite) {
+export function useItunesSearch(busca) {
   // ... os três useState continuam iguais ...

   useEffect(() => {
+    const { termo, limite } = busca
     if (!termo) return

     // ... o resto do efeito continua igual ...

-  }, [termo, limite])
+  }, [busca])

   return { resultados, carregando, erro }
 }
```

```diff
 // src/App.jsx
-  const { resultados, carregando, erro } = useItunesSearch(busca.termo, busca.limite)
+  const { resultados, carregando, erro } = useItunesSearch(busca)
```

**Como testar:**

1. No DevTools, abra a aba **Network** e selecione **Offline**.
2. Busque um termo e confira a mensagem de erro na tela.
3. Volte a rede para **No throttling**.
4. Clique em **Buscar** de novo, com o mesmo termo. A requisição deve aparecer na aba Network e os resultados, na tela.

> [!WARNING]
> Isso só funciona porque `busca` é um **state**: o objeto só muda quando `setBusca` é chamado. Se o objeto fosse criado direto no corpo do componente, ele seria novo a cada renderização e o efeito rodaria sem parar, causando um loop infinito.

> [!NOTE]
> **Consequência:** repetir um termo que deu certo também faz uma nova requisição, e isso conta para o limite de cerca de 20 chamadas por minuto da API. O botão fica desabilitado durante o carregamento, o que evita cliques repetidos enquanto uma busca está em andamento.

[⬆️ Voltar ao índice](#-índice)

---

## 8. Class components (contexto histórico e manutenção)

Antes de 2019 (React 16.8), **só componentes de classe podiam ter state e ciclo de vida**. Componentes funcionais eram "burros" (só props). Os hooks mudaram isso. Hoje o React recomenda funções, mas vocês **vão encontrar classes** em projetos antigos, tutoriais e em empresas.

### O mesmo contador, nas duas versões

```jsx
// src/components/ContadorClasse.jsx
import { Component } from 'react'

export class ContadorClasse extends Component {
  constructor(props) {
    super(props) // obrigatório: inicializa this.props
    this.state = { contador: props.inicial ?? 0 } // state é SEMPRE um objeto
    this.incrementar = this.incrementar.bind(this) // binding (explicação abaixo)
  }

  incrementar() {
    this.setState((anterior) => ({ contador: anterior.contador + 1 }))
  }

  // arrow function como propriedade da classe: não precisa de bind
  zerar = () => {
    this.setState({ contador: 0 })
  }

  render() {
    return (
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold">{this.state.contador}</span>
        <button onClick={this.incrementar} className="px-3 py-1 rounded bg-pink-500">+1</button>
        <button onClick={this.zerar} className="px-3 py-1 rounded bg-zinc-700">Zerar</button>
        <small className="text-zinc-400">{this.props.rotulo}</small>
      </div>
    )
  }
}
```

```jsx
// Equivalente funcional
function ContadorFuncao({ inicial = 0, rotulo }) {
  const [contador, setContador] = useState(inicial)
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl font-bold">{contador}</span>
      <button onClick={() => setContador((c) => c + 1)}>+1</button>
      <button onClick={() => setContador(0)}>Zerar</button>
      <small>{rotulo}</small>
    </div>
  )
}
```

| | Class component | Componente funcional |
|---|---|---|
| Estrutura | `class X extends Component` + `render()` | Função que retorna JSX |
| Props | `this.props.rotulo` | Parâmetro `{ rotulo }` |
| State | Um objeto: `this.state = {...}` | Vários `useState` separados |
| Atualizar | `this.setState({...})` (faz **merge** com o objeto) | `setX(valor)` (**substitui**) |
| Eventos | Precisa de `bind` ou arrow function | Funções normais |
| Ciclo de vida | Métodos `componentDidMount` etc. | `useEffect` |
| Reutilizar lógica | HOCs, render props (complexo) | Custom hooks |

### Vendo o `ContadorClasse` na tela

Para o contador aparecer no app, basta criar uma aba nova. Repare como o array da `Navbar` facilita isso: adicionamos um item na lista e o `.map()` cuida do resto.

```diff
 // src/components/Navbar.jsx
 const abas = [
   { id: 'buscar', rotulo: '🔎 Buscar' },
   { id: 'favoritos', rotulo: '❤️ Favoritos' },
+  { id: 'classe', rotulo: '🏛️ Classe' },
 ]
```

```diff
 // src/App.jsx
+import { Card } from './components/Card'
+import { ContadorClasse } from './components/ContadorClasse'

 // ... dentro do return, entre o bloco da busca e o dos favoritos:
+      ) : aba === 'classe' ? (
+        <Card className="p-6">
+          <ContadorClasse inicial={0} rotulo="Contador feito com class component" />
+        </Card>
       ) : favoritos.length === 0 ? (
```

### Event handlers e binding — por que o `bind`?

Em JavaScript, o `this` de um método depende de **como ele é chamado**, não de onde foi definido. Quando passamos `onClick={this.incrementar}`, o React chama a função "solta", e dentro dela `this` vira `undefined` → erro `Cannot read properties of undefined (reading 'setState')`.

Três soluções:
1. `this.incrementar = this.incrementar.bind(this)` no constructor (forma clássica);
2. Método como **arrow function** na classe (`zerar = () => {...}`): arrow functions não têm `this` próprio, herdam o da classe;
3. Arrow no JSX: `onClick={() => this.incrementar()}` (funciona, mas cria uma função nova a cada render).

Componentes funcionais **não têm esse problema** porque não usam `this`. Esse é um dos motivos de os hooks terem "vencido".

### Ciclo de vida × useEffect

| Class component | Equivalente com hooks |
|---|---|
| `componentDidMount()` | `useEffect(() => {...}, [])` |
| `componentDidUpdate(prevProps)` comparando `prevProps.termo !== this.props.termo` | `useEffect(() => {...}, [termo])` |
| `componentWillUnmount()` | O `return () => {...}` da limpeza |

Ou seja, nossa busca em classe ficaria espalhada em **três métodos**; com hooks, fica junta em um efeito.

### Quando ainda faz sentido usar classe?

- **Manutenção** de código legado (não reescreva só porque é classe).
- **Error Boundaries**: o componente que "captura" erros de renderização dos filhos e mostra uma tela amigável **ainda só pode ser escrito como classe** (usa `static getDerivedStateFromError` / `componentDidCatch`).

```jsx
// Bônus: Error Boundary (o uso "vivo" de classes hoje)
import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { temErro: false }

  static getDerivedStateFromError() {
    return { temErro: true }
  }

  render() {
    if (this.state.temErro) {
      return <p className="p-8 text-center text-red-400">Algo deu errado. Recarregue a página.</p>
    }
    return this.props.children
  }
}

// main.jsx: <ErrorBoundary><App /></ErrorBoundary>
```

Repare: até a classe usa `this.props.children` — o conceito é o mesmo.

Para ativar o bônus, salve o componente em `src/components/ErrorBoundary.jsx` e envolva o `<App />` no `main.jsx`:

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from './components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
```

[⬆️ Voltar ao índice](#-índice)

---

## 9. Fechamento e ponte para o mobile

Checklist do que o app cobriu:

- [x] JSX, componentes funcionais, composição
- [x] Props, valores padrão, `...rest`, `children`
- [x] Listas com `.map()` e `key`
- [x] Eventos e comunicação filho → pai (`onAlgo`)
- [x] Build com Vite × CDN, Tailwind no build, `npm run build`
- [x] `useState`, imutabilidade, forma funcional do `set`
- [x] Controlled components, validação e feedback
- [x] Requisição HTTP (fetch e axios), contrato de API, adapter
- [x] Loading / erro / vazio / sucesso + renderização condicional
- [x] `useEffect`, dependências, limpeza, StrictMode
- [x] Regras dos hooks, custom hooks (`useItunesSearch`, `useLocalStorage`)
- [x] Class components, binding, ciclo de vida, Error Boundary

**O que vai junto para o React Native:** componentes, props, children, state, `useEffect`, custom hooks, `fetch` e o `itunesApi.js` **inteiro, sem mudar uma linha**. O que muda: em vez de `<div>`, `<p>`, `<img>`, `<input>` usamos `<View>`, `<Text>`, `<Image>`, `<TextInput>`; e listas grandes usam `<FlatList>` (que também pede uma key: `keyExtractor`). Ou seja, **tudo que vimos hoje é a base do mobile**.

**Desafios para casa (opcionais):**
1. Adicionar um `<select>` de país (`BR`, `US`, `JP`) no formulário.
2. Criar um hook `useDebounce` para buscar enquanto digita, esperando 500 ms após a última tecla (usa `setTimeout` + limpeza no `useEffect`).
3. Ordenar os favoritos por artista ou por ano.

[⬆️ Voltar ao índice](#-índice)

---

## Bônus: proxy back-end em Express (opcional)

Caso queira mostrar o cenário "e se a API tivesse chave secreta":

```bash
mkdir sombusca-api && cd sombusca-api
npm init -y && npm install express cors
```

```js
// server.js  (rodar com: node server.js — Node 18+ já tem fetch nativo)
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/api/musicas', async (req, res) => {
  const params = new URLSearchParams({
    term: req.query.termo ?? '',
    media: 'music',
    entity: 'song',
    country: 'BR',
    limit: req.query.limite ?? '24',
  })
  // se a API exigisse chave, ela ficaria AQUI (process.env.API_KEY), nunca no front
  const resposta = await fetch(`https://itunes.apple.com/search?${params}`)
  const dados = await resposta.json()
  res.json(dados)
})

app.listen(3001, () => console.log('API em http://localhost:3001'))
```

No front, só muda a `BASE_URL` do `itunesApi.js` para `http://localhost:3001/api/musicas` e os nomes dos parâmetros (`termo`, `limite`). **Os componentes e hooks não mudam nada** — é a vantagem de ter isolado o contrato no `services/`.

[⬆️ Voltar ao índice](#-índice)

---

## Glossário rápido

> [!NOTE]
> Duas linhas por termo. Os conceitos já trabalhados em aula aparecem só como lembrete.

### Ferramentas e ambiente

- **Node.js** — Ambiente que executa JavaScript fora do navegador (no computador/servidor). É ele que roda o Vite, o npm e o Express.
- **npm** — Gerenciador de pacotes do Node: baixa bibliotecas (`npm install axios`) e roda scripts do `package.json` (`npm run dev`).
- **package.json** — "Ficha técnica" do projeto: nome, dependências e scripts. Quem recebe o projeto roda `npm install` e tudo é baixado a partir dele.
- **node_modules** — Pasta onde o npm coloca as bibliotecas baixadas. É enorme, não se edita e não se envia (fica no `.gitignore`).
- **LTS** — *Long Term Support*: versão do Node estável e com suporte por mais tempo. É a recomendada para estudar e trabalhar.
- **Terminal / PATH** — O terminal é onde digitamos comandos; o PATH é a lista de pastas onde o sistema procura esses comandos (`node`, `npm`).
- **VS Code** — Editor de código da Microsoft, gratuito, com extensões para React, Tailwind, ESLint etc.
- **DevTools** — Ferramentas do desenvolvedor do navegador (F12). Abas usadas hoje: **Console** (erros/logs) e **Network** (requisições HTTP).
- **React Developer Tools** — Extensão do navegador que mostra a árvore de componentes, suas props e seu state em tempo real.
- **ESLint** — Ferramenta que analisa o código e aponta erros e más práticas. O plugin `react-hooks` verifica as regras dos hooks e as dependências.
- **oxlint** — Ferramenta que analisa o código como o ESLint, porém mais rápida. É o lint que vem no template atual do Vite; roda com `npm run lint`.
- **Prettier** — Formatador automático de código (indentação, aspas, ponto e vírgula), para todo mundo escrever no mesmo padrão.
- **StackBlitz** — Ambiente de desenvolvimento que roda no navegador, com Node e npm, sem instalar nada.

### Build e entrega

- **CDN** — *Content Delivery Network*: servidores distribuídos que entregam arquivos prontos por URL. O `unpkg.com` serve pacotes npm via CDN.
- **Babel** — Transpilador: converte JSX e JavaScript moderno em JavaScript que qualquer navegador entende.
- **Transpilar** — Traduzir código de uma linguagem/versão para outra de nível parecido (JSX → JS). Diferente de compilar para código de máquina.
- **UMD** — Formato de pacote que expõe a biblioteca como variável global (`window.React`). Usado no modelo CDN.
- **Módulo / `import` / `export`** — Cada arquivo é um módulo com escopo próprio; `export` expõe algo e `import` usa em outro arquivo.
- **Build** — Processo que transforma o código-fonte nos arquivos finais otimizados (pasta `dist/`).
- **Bundler / bundle** — Ferramenta que junta vários módulos em poucos arquivos (*bundle*). Exemplos: Rollup, esbuild, Webpack.
- **Vite** — Ferramenta de build + servidor de desenvolvimento, rápida e simples. Hoje é o jeito padrão de criar um projeto React.
- **esbuild / Rollup** — Os dois motores que o Vite usa por baixo: o esbuild (muito rápido) em dev e o Rollup para gerar o bundle de produção.
- **Rolldown** — Bundler que o Vite 8 usa no lugar do esbuild e do Rollup. O papel é o mesmo: juntar e otimizar os arquivos no build.
- **Webpack** — Bundler mais antigo e mais configurável, usado pelo extinto create-react-app. Ainda presente em muitos projetos legados.
- **create-react-app (CRA)** — Antiga ferramenta oficial para criar projetos React. Foi descontinuada; hoje usamos Vite ou um framework.
- **Minificar** — Remover espaços, quebras de linha e comentários e encurtar nomes de variáveis para o arquivo ficar menor.
- **Tree-shaking** — "Sacudir a árvore": remover do bundle o código importado mas nunca usado.
- **Hash no nome do arquivo** — Código que muda a cada build (`index-a1b2c3.js`), forçando o navegador a baixar a versão nova em vez de usar a do cache.
- **HMR** — *Hot Module Replacement*: ao salvar um arquivo, só aquele módulo é trocado na página, sem recarregar e (quase sempre) sem perder o state.
- **Servidor de desenvolvimento** — O que o `npm run dev` sobe (`localhost:5173`): serve o projeto localmente enquanto programamos.
- **`dist/`** — Pasta com o resultado do build. É o que se publica em uma hospedagem (Vercel, Netlify, GitHub Pages).
- **SPA** — *Single Page Application*: um único HTML; o JavaScript troca o conteúdo da tela sem recarregar a página. Nosso app é uma SPA.
- **SSR** — *Server-Side Rendering*: o HTML é gerado no servidor antes de chegar ao navegador. Melhora SEO e o primeiro carregamento (Next.js faz isso).
- **SEO** — Otimização para buscadores (Google). Páginas com HTML pronto (SSR) são mais fáceis de indexar.
- **Framework (Next.js, React Router)** — Estrutura maior em cima do React que já traz rotas, SSR e convenções de pastas.
- **Tailwind CSS** — *(já visto)* Framework CSS de classes utilitárias (`p-4`, `bg-zinc-900`). No build, gera só o CSS das classes usadas.
- **Plugin (Vite)** — Extensão que adiciona capacidades ao Vite: `@vitejs/plugin-react` (JSX, HMR) e `@tailwindcss/vite` (Tailwind).

### Web, HTTP e API

- **API** — Conjunto de endereços e regras para um programa pedir dados/serviços a outro.
- **REST / HTTP** — Estilo de API que usa URLs e os métodos do HTTP (GET para ler, POST para criar etc.).
- **Endpoint** — Uma URL específica da API que responde a um tipo de pedido (ex.: `/search`).
- **Query string** — Parte da URL depois do `?` com parâmetros `chave=valor` separados por `&`.
- **JSON** — Formato de texto para trocar dados, com a mesma sintaxe de objetos e arrays JavaScript.
- **Status HTTP** — Código da resposta: 2xx sucesso, 4xx erro de quem pediu (404 não encontrado), 5xx erro do servidor.
- **API key** — Chave secreta que identifica quem usa uma API. Nunca deve ficar no front-end, porque qualquer um vê no DevTools.
- **Rate limit** — Limite de requisições por tempo (~20/min no iTunes). Passou disso, a API recusa as chamadas.
- **CORS** — Regra de segurança do navegador: um site só lê respostas de outro domínio se esse domínio permitir. O iTunes permite.
- **Proxy** — Servidor intermediário: o front chama o proxy e o proxy chama a API. Serve para esconder chaves, fazer cache ou contornar CORS.
- **Express** — Biblioteca minimalista do Node para criar servidores/APIs HTTP com poucas linhas.
- **fetch** — Função nativa do navegador para fazer requisições HTTP. Retorna uma Promise.
- **axios** — Biblioteca de requisições HTTP com conversão automática de JSON e erro automático em 4xx/5xx.
- **Promise / async / await** — Promise representa um valor que chega no futuro; `await` (dentro de uma função `async`) espera esse valor sem travar a página.
- **AbortController** — Objeto nativo que permite cancelar um `fetch` em andamento pelo seu `signal`.
- **Race condition** — Quando duas operações assíncronas competem e a mais lenta sobrescreve o resultado da mais nova.
- **Adapter** — Função que converte um formato externo (o da Apple) para o formato interno do app, protegendo o código de mudanças.
- **localStorage** — Armazenamento do navegador (chave/valor, só texto) que persiste mesmo fechando a aba.

### React

- **JSX / componente / props / children / key** — *(já vistos)* Sintaxe HTML-like no JS; função que retorna JSX; parâmetros do componente; conteúdo entre as tags; identificador de item em lista.
- **Virtual DOM** — *(já visto)* Cópia leve da tela em memória; o React compara versões e atualiza no DOM real só o que mudou.
- **Evento sintético** — *(já visto)* Objeto de evento do React que padroniza os eventos entre navegadores (`e.target`, `e.preventDefault()`).
- **Renderizar / re-render** — Executar a função do componente para gerar o JSX. Acontece de novo quando state ou props mudam.
- **Hook** — Função especial do React (começa com `use`) que dá "superpoderes" a componentes funcionais: estado, efeitos etc.
- **State** — Memória do componente que, ao mudar via `set...`, faz a tela renderizar de novo.
- **Efeito colateral (side effect)** — Qualquer coisa que sai do "calcular a tela": HTTP, timers, `localStorage`, `document.title`.
- **Array de dependências** — Segundo argumento do `useEffect`: lista de valores que, quando mudam, fazem o efeito rodar de novo.
- **Cleanup (limpeza)** — Função retornada pelo `useEffect`; roda antes do próximo efeito e quando o componente sai da tela.
- **StrictMode** — Modo de desenvolvimento que roda verificações extras (como montar/desmontar 2×) para revelar bugs. Não afeta produção.
- **Controlled component** — Input cujo valor vem do state (`value`) e é atualizado pelo `onChange`. O React é a fonte da verdade.
- **Lifting state up** — Mover o state para o ancestral comum quando mais de um componente precisa dele.
- **Prop drilling** — Passar props por vários níveis só para chegar num componente lá embaixo. Resolve-se com Context em apps maiores.
- **Valor derivado** — Valor calculado a partir de state/props durante a renderização; não precisa (nem deve) ser um state.
- **Imutabilidade** — Nunca alterar o array/objeto original; criar um novo (`[...lista, item]`) para o React perceber a mudança.
- **Fragment (`<>...</>`)** — Agrupa elementos sem criar uma tag extra no HTML.
- **Custom hook** — Função `use...` criada por nós que combina hooks do React para reutilizar lógica com estado.
- **Lazy initializer** — Passar uma função para o `useState(() => ...)`, executada só na primeira renderização.
- **Class component** — Componente escrito como classe (`extends Component`), com `this.state`, `setState` e métodos de ciclo de vida.
- **Binding (`bind`)** — Fixar o `this` de um método para que ele continue apontando para a instância quando passado como callback.
- **Ciclo de vida** — Fases de um componente: montar (aparecer), atualizar e desmontar (sair da tela).
- **Error Boundary** — Componente (de classe) que captura erros de renderização dos filhos e exibe uma tela alternativa.
- **React Native** — React para apps mobile nativos: mesmos componentes, props e hooks, mas com `<View>`, `<Text>` no lugar de HTML.

[⬆️ Voltar ao índice](#-índice)
