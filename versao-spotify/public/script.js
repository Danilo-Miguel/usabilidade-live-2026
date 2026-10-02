// O front só conversa com o NOSSO servidor (/api/...). Nada de secret ou token aqui.

const form = document.getElementById('form');
const campo = document.getElementById('busca');
const status = document.getElementById('status');
const listaArtistas = document.getElementById('artistas');
const tituloAlbuns = document.getElementById('titulo-albuns');
const listaAlbuns = document.getElementById('albuns');

// Busca um JSON e trata o erro em um lugar só
async function buscarJSON(url) {
  const resposta = await fetch(url);
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro);
  return dados;
}

// Monta um card: imagem + título + texto opcional
function criarCard(titulo, imagem, texto) {
  const item = document.createElement('li');

  const img = document.createElement('img');
  img.src = imagem || '';
  img.alt = '';                      // decorativa: o nome já aparece no título

  const h3 = document.createElement('h3');
  h3.textContent = titulo;           // textContent evita XSS

  item.append(img, h3);
  if (texto) {
    const p = document.createElement('p');
    p.textContent = texto;
    item.append(p);
  }
  return item;
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const termo = campo.value.trim();

  status.textContent = 'Carregando…';
  listaArtistas.innerHTML = '';
  listaAlbuns.innerHTML = '';
  tituloAlbuns.hidden = true;

  try {
    const artistas = await buscarJSON(`/api/artistas?q=${encodeURIComponent(termo)}`);

    if (artistas.length === 0) {
      status.textContent = `Nenhum artista encontrado para “${termo}”.`;
      return;
    }

    for (const artista of artistas) {
      const card = criarCard(artista.nome, artista.imagem);

      const botao = document.createElement('button');
      botao.textContent = `Ver álbuns de ${artista.nome}`;
      botao.addEventListener('click', () => mostrarAlbuns(artista));

      card.append(botao);
      listaArtistas.append(card);
    }
    status.textContent = `${artistas.length} artistas encontrados.`;
  } catch (erro) {
    status.textContent = 'Não foi possível buscar agora. Tente novamente.';
  }
});

async function mostrarAlbuns(artista) {
  status.textContent = `Carregando álbuns de ${artista.nome}…`;

  try {
    const albuns = await buscarJSON(`/api/artistas/${artista.id}/albuns`);

    listaAlbuns.innerHTML = '';
    for (const album of albuns) {
      listaAlbuns.append(criarCard(album.nome, album.imagem, album.ano));
    }

    tituloAlbuns.textContent = `Álbuns de ${artista.nome}`;
    tituloAlbuns.hidden = false;
    tituloAlbuns.focus();            // leva o foco (e o leitor de tela) até os álbuns
    status.textContent = `${albuns.length} álbuns encontrados.`;
  } catch (erro) {
    status.textContent = 'Não foi possível carregar os álbuns. Tente novamente.';
  }
}
