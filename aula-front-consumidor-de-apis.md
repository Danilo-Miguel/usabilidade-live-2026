# O Front-end como Consumidor de APIs: Token, JSON e Acessibilidade

## O papel do front-end em um sistema distribuído

Até aqui olhamos o sistema pelo lado do servidor: monolito, microsserviços, REST. Mas todo back-end existe para alguém consumir. Na maioria das vezes, esse alguém é um **front-end**: um site, um app mobile ou um jogo.

Do ponto de vista do front, uma API é:

- **Um endereço** (URL) para onde ele envia requisições HTTP
- **Um contrato**: quais rotas existem, o que enviar e qual JSON volta
- **Uma fonte de incerteza**: ela pode demorar, falhar, vir vazia ou recusar o acesso

O trabalho do front é transformar esse JSON em uma interface que **qualquer pessoa** consiga usar, inclusive quem usa teclado, leitor de tela ou celular com internet lenta.

```
[ Navegador / App ]  ──HTTP + JSON──▶  [ Nosso back-end ]  ──HTTP + token──▶  [ API externa (Spotify) ]
```

## O que é o "contrato" de uma API

Quando usamos uma API de terceiros, existe um contrato em dois sentidos:

**1. Contrato jurídico (termos de uso)**
Para usar a API do Spotify é preciso criar uma conta de desenvolvedor, **aceitar os Termos de Uso** e registrar um app. Em troca, o Spotify entrega credenciais que identificam o seu app. A partir daí, tudo o que for feito com elas é sua responsabilidade.

**2. Contrato técnico (o formato dos dados)**
A documentação diz exatamente quais rotas existem, quais parâmetros aceitam e qual JSON retornam. O front depende desse formato: se o campo `name` virar `title`, a tela quebra.

| Credencial | O que é | Onde pode ficar |
| --- | --- | --- |
| Client ID | Identifica o app (como um "usuário") | Pode ser público |
| Client Secret | Prova que é o seu app (como uma "senha") | **Somente no servidor** |
| Access Token | Passe temporário (1 hora) para chamar a API | No servidor, enviado a cada requisição |

> ⚠️ Desde fevereiro de 2026, o dono de um app em modo de desenvolvimento precisa ter **Spotify Premium**, e cada app aceita até 5 usuários. Por isso, nesta aula o app é criado pelo professor e a demonstração é feita ao vivo.

## Autenticação com token (OAuth 2.0 Client Credentials)

O fluxo usado aqui serve para acessar dados públicos (artistas, álbuns), sem login de um usuário:

1. O servidor envia `client_id:client_secret` (em base64) para `accounts.spotify.com/api/token`
2. O Spotify devolve um **access token** válido por 3600 segundos
3. Toda chamada à API leva o header `Authorization: Bearer <token>`
4. Quando o token expira, a API responde **401 Unauthorized** e é preciso pedir outro

Pedindo o token:

```javascript
const credenciais = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

const resposta = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    Authorization: `Basic ${credenciais}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'grant_type=client_credentials',
});

const { access_token, expires_in } = await resposta.json();
// { "access_token": "BQD...", "token_type": "Bearer", "expires_in": 3600 }
```

Usando o token:

```javascript
const resposta = await fetch('https://api.spotify.com/v1/search?q=gilberto%20gil&type=artist&limit=10', {
  headers: { Authorization: `Bearer ${access_token}` },
});
```

| Status | Significado para o front |
| --- | --- |
| 200 | Deu certo: mostrar os dados |
| 400 | Requisição mal formada (ex.: busca vazia) |
| 401 | Token ausente, inválido ou expirado |
| 404 | Recurso não existe |
| 429 | Muitas requisições: esperar e tentar de novo |
| 5xx | Problema no servidor: avisar e permitir tentar de novo |

## Por que o secret não pode ir para o front

A tentação é chamar o Spotify direto do JavaScript do navegador. **Tudo o que vai para o navegador é público.** Qualquer pessoa pode apertar F12 e ver.

**Demonstração (versão 1, insegura):**

1. Abrir `http://localhost:3000/inseguro/` e fazer uma busca
2. DevTools → **Sources**: o client secret aparece em texto puro
3. DevTools → **Network**: a requisição ao `/api/token` mostra o header `Authorization: Basic ...`. Basta decodificar em base64 (`atob(...)` no console) para recuperar o secret
4. Com o secret, qualquer pessoa usa a sua cota e age em seu nome perante os termos de uso

**A solução (versão 2): um proxy no back-end (BFF, Backend For Frontend)**

```
Navegador ──GET /api/artistas?q=gil──▶ server.js (guarda o secret, obtém e reaproveita o token)
                                            └──Bearer token──▶ api.spotify.com
```

O secret fica no arquivo `.env`, que **nunca vai para o GitHub** (está no `.gitignore`). O front só conhece as rotas do nosso servidor.

Isso conecta com o resto do semestre: o proxy é um pequeno serviço com uma responsabilidade única, que pode ser trocado sem que o front perceba.

## O contrato entre o nosso back e o nosso front

O JSON do Spotify é enorme. O proxy devolve só o que a tela usa, com `map()` sobre a coleção:

```javascript
// server.js
const artistas = dados.artists.items.map((a) => ({
  id: a.id,
  nome: a.name,
  imagem: a.images?.[1]?.url || a.images?.[0]?.url || null,
  generos: a.genres || [],
  link: a.external_urls?.spotify,
}));
res.json({ artistas });
```

| Rota | Resposta |
| --- | --- |
| GET /api/artistas?q=texto | { artistas: [{ id, nome, imagem, generos, link }] } |
| GET /api/artistas/:id/albuns | { albuns: [{ id, nome, tipo, lancamento, faixas, imagem, link }] } |
| (qualquer erro) | { erro: "mensagem" } com status 400, 404 ou 502 |

Por que isso é bom para o front?

- **Menos dados trafegando** (importante no mobile)
- **Nomes em português** e estáveis: se o Spotify mudar, só o proxy muda
- **Erros padronizados**: o front sempre sabe onde está a mensagem

## Do JSON para a tela

Uma função genérica para consumir a API, tratando o caso de erro:

```javascript
async function buscarJSON(url) {
  const resposta = await fetch(url);       // requisição HTTP GET
  const dados = await resposta.json();     // texto JSON → objeto JS
  if (!resposta.ok) {                      // status fora de 200–299
    throw new Error(dados.erro || `Erro HTTP ${resposta.status}`);
  }
  return dados;
}
```

Toda tela que consome API tem **quatro estados**, e o front precisa desenhar todos eles:

| Estado | O que mostrar |
| --- | --- |
| Carregando | Mensagem "Carregando…" e botão desabilitado |
| Sucesso | Os cards com os dados |
| Vazio | "Nenhum artista encontrado para X. Confira a grafia." |
| Erro | Mensagem clara e possibilidade de tentar de novo |

```javascript
async function buscarArtistas(termo) {
  carregando(true);
  mostrarStatus('Carregando artistas…');
  try {
    const { artistas } = await buscarJSON(`/api/artistas?q=${encodeURIComponent(termo)}`);
    if (artistas.length === 0) {
      mostrarStatus(`Nenhum artista encontrado para “${termo}”.`);
      return;
    }
    renderizarArtistas(artistas);
    mostrarStatus(`${artistas.length} artistas encontrados.`);
  } catch (erro) {
    mostrarStatus(`${erro.message} Tente novamente.`, 'erro');
  } finally {
    carregando(false); // roda com sucesso OU com erro
  }
}
```

Atenção à segurança no front também: usamos `textContent` em vez de `innerHTML` para mostrar dados da API. Se um nome vier com `<script>`, ele aparece como texto e não é executado (proteção contra **XSS**).

## Acessibilidade e usabilidade

Consumir a API é metade do trabalho. A outra metade é garantir que a interface funcione para todo mundo.

| Prática | No projeto | Por quê |
| --- | --- | --- |
| HTML semântico | header, main, section, ul, article, h1–h3 | O leitor de tela navega por títulos e regiões |
| lang="pt-BR" | No <html> | Pronúncia correta no leitor de tela |
| label ligado ao input | <label for="campo-busca"> | O campo é anunciado com nome; clicar no texto foca o campo |
| role="search" | No <form> | Cria um atalho de navegação para a busca |
| aria-live="polite" | No parágrafo de status | "Carregando…" e "8 artistas encontrados" são lidos automaticamente |
| button, não div | "Ver álbuns" é <button> | Funciona com Enter/Espaço e é anunciado como botão |
| Gestão de foco | Ao abrir os álbuns, o foco vai para o título; ao voltar, retorna ao botão de origem | Quem usa teclado não se perde |
| alt nas imagens | alt="" porque o nome já está no card | Evita o leitor repetir o nome duas vezes |
| Links com contexto | "Abrir no Spotify" + texto oculto com o nome e "(abre em nova aba)" | Vários links iguais ficam distinguíveis |
| Foco visível | :focus-visible com contorno de 3px | Nunca usar outline: none sem substituto |
| Contraste | Mínimo de 4.5:1 (WCAG AA), também no modo escuro | Leitura com baixa visão ou sol na tela |
| Área de toque | Botões e campo com 48px de altura | Uso confortável no celular |
| Layout fluido | grid com auto-fill e minmax(190px, 1fr) | Funciona do celular ao desktop sem rolagem lateral |
| Menos movimento | Animações só com prefers-reduced-motion: no-preference | Respeita quem desativou animações no sistema |
| Validação acessível | aria-invalid="true" e mensagem quando a busca está vazia | O erro é visto e ouvido |

O projeto foi validado com o **axe** (o mesmo motor da extensão axe DevTools): zero violações nos modos claro e escuro.

## Roteiro da demonstração ao vivo

1. **Contrato:** abrir o Spotify for Developers, mostrar os Termos de Uso e criar o app (Web API; Redirect URI `http://127.0.0.1:3000/callback`)
2. **Credenciais:** mostrar o Client ID e o Client Secret. Perguntar à turma: "onde guardamos isso?"
3. **Versão 1 (insegura):** colar as credenciais em `versao-1-insegura/index.html`, abrir `/inseguro/` e expor o secret no DevTools
4. **Versão 2 (proxy):** mostrar o `.env`, o `.gitignore` e o `server.js`. Rodar `npm start`
5. **Front:** buscar um artista, abrir os álbuns e mostrar na aba Network que o navegador só fala com `localhost`
6. **Estados:** buscar algo inexistente (vazio), buscar com o campo vazio (validação), derrubar a internet (erro)
7. **Acessibilidade:** navegar só com Tab/Enter; ligar o leitor de tela (NVDA ou VoiceOver); rodar o axe
8. **Depois da aula:** apagar o secret da versão 1 e clicar em **Rotate client secret** no dashboard

## Limites atuais da API do Spotify

- Busca e álbuns retornam **no máximo 10 itens** por página (use `offset` para paginar)
- Removidos em fev/2026: top tracks do artista, lançamentos, categorias e os campos `popularity` e `followers`
- Guia oficial: https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide

## Exercícios

1. **Paginação:** adicione um botão "Carregar mais" que use o parâmetro `offset`. Anuncie no `aria-live` quantos itens novos chegaram.
2. **Nova rota no contrato:** crie `GET /api/albuns/:id/faixas` no proxy e uma tela com a lista de faixas e suas durações (converta milissegundos para mm:ss).
3. **Cache:** guarde no proxy, por 5 minutos, o resultado de buscas repetidas. Qual o ganho para o usuário? E para a cota da API?
4. **Erro 429:** quando o Spotify responder 429, leia o header `Retry-After` e mostre ao usuário quanto tempo esperar.
5. **Auditoria:** rode o axe e o Lighthouse (aba Acessibilidade) em um site que você usa todo dia. Liste 3 problemas e como corrigi-los.

📦 **Código completo do projeto:** disponibilizado pelo professor. O passo a passo para rodar está no README.
