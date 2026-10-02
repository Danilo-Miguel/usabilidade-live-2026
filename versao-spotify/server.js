// Servidor que fica entre o navegador e o Spotify.
// O secret só existe aqui (lido do .env). O navegador nunca vê o secret nem o token.

const express = require('express');

process.loadEnvFile(); // carrega o .env em process.env

const app = express();
app.use(express.static('public')); // serve o front (index.html, style.css, script.js)

// ---------- Token ----------
// O token vale 1 hora. Guardamos para não pedir um novo a cada busca.
let token = null;
let expiraEm = 0;

async function pegarToken() {
  if (token && Date.now() < expiraEm) return token;

  const credenciais = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const resposta = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credenciais}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!resposta.ok) throw new Error('Falha ao obter o token');

  const dados = await resposta.json();
  token = dados.access_token;
  expiraEm = Date.now() + (dados.expires_in - 60) * 1000; // renova 1 min antes
  return token;
}

async function spotify(caminho) {
  const resposta = await fetch(`https://api.spotify.com/v1${caminho}`, {
    headers: { Authorization: `Bearer ${await pegarToken()}` },
  });
  if (!resposta.ok) throw new Error(`Spotify respondeu ${resposta.status}`);
  return resposta.json();
}

// ---------- Rotas que o nosso front usa ----------

// GET /api/artistas?q=gil
app.get('/api/artistas', async (req, res) => {
  const termo = req.query.q;
  if (!termo) return res.status(400).json({ erro: 'Digite o nome de um artista.' });

  try {
    const dados = await spotify(`/search?type=artist&limit=10&q=${encodeURIComponent(termo)}`);

    // Devolve só o que a tela usa
    const artistas = dados.artists.items.map((a) => ({
      id: a.id,
      nome: a.name,
      imagem: a.images[0]?.url,
    }));
    res.json(artistas);
  } catch (erro) {
    console.error(erro.message);
    res.status(502).json({ erro: 'Não foi possível falar com o Spotify.' });
  }
});

// GET /api/artistas/:id/albuns
app.get('/api/artistas/:id/albuns', async (req, res) => {
  try {
    const dados = await spotify(`/artists/${encodeURIComponent(req.params.id)}/albums?limit=10`);

    const albuns = dados.items.map((a) => ({
      nome: a.name,
      ano: a.release_date.slice(0, 4),
      imagem: a.images[0]?.url,
    }));
    res.json(albuns);
  } catch (erro) {
    console.error(erro.message);
    res.status(502).json({ erro: 'Não foi possível falar com o Spotify.' });
  }
});

app.listen(3000, () => console.log('Rodando em http://localhost:3000'));
