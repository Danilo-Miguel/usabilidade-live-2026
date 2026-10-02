# usabilidade-live-2026-

Front-end consumindo APIs, com acessibilidade. Material da aula em [aula-front-consumidor-de-apis.md](aula-front-consumidor-de-apis.md).

```
├── versao-simples/      ← para a aula: sem cadastro, sem servidor
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── versao-spotify/      ← com token: o secret fica protegido no servidor
    ├── server.js        (lê o secret do .env e conversa com o Spotify)
    ├── .env.example     (modelo; o .env real nunca vai para o GitHub)
    ├── package.json
    └── public/          (front: só conversa com o nosso servidor)
```

## Versão simples

Abra `versao-simples/index.html` no navegador (duplo clique ou Live Server). Ela usa a API pública de busca do iTunes, que não exige chave nem conta de desenvolvedor. Mostra o essencial: `fetch`, JSON → tela, os 4 estados (carregando, vazio, sucesso, erro) e acessibilidade básica.

## Versão Spotify

Por que um servidor? Para usar a API do Spotify é preciso um **client secret** (a senha do app). Tudo o que roda no navegador é público, então o secret fica só no `server.js`, lido do arquivo `.env`. O navegador chama `/api/...` no nosso servidor, e só o servidor fala com o Spotify.

```
Navegador ──/api/artistas──▶ server.js (secret + token) ──▶ Spotify
```

1. Crie um app em https://developer.spotify.com/dashboard (Web API).
2. Dentro de `versao-spotify/`, copie `.env.example` para `.env` e preencha `SPOTIFY_CLIENT_ID` e `SPOTIFY_CLIENT_SECRET`.
3. Rode:

   ```bash
   cd versao-spotify
   npm install
   npm start
   ```

4. Acesse http://localhost:3000

| Rota | Resposta |
| --- | --- |
| `GET /api/artistas?q=texto` | `[{ id, nome, imagem }]` |
| `GET /api/artistas/:id/albuns` | `[{ nome, ano, imagem }]` |
| erro | `{ erro: "mensagem" }` com status 400 ou 502 |
