const form = document.getElementById('form');
const campo = document.getElementById('busca');
const status = document.getElementById('status');
const lista = document.getElementById('lista');

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();           // não recarrega a página
  const termo = campo.value.trim();

  status.textContent = 'Carregando…'; // estado 1: carregando
  lista.innerHTML = '';

  try {
    // 1. Requisição HTTP GET para a API (pública, sem chave)
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(termo)}&entity=song&limit=50&country=BR`;
    const resposta = await fetch(url);

    if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);

    // 2. Texto JSON → objeto JavaScript
    const dados = await resposta.json();

    // estado 2: vazio
    if (dados.resultCount === 0) {
      status.textContent = `Nenhuma música encontrada para “${termo}”.`;
      return;
    }

    // estado 3: sucesso → transforma cada item do JSON em um card
    for (const musica of dados.results) {
      const item = document.createElement('li');

      const img = document.createElement('img');
      img.src = musica.artworkUrl100.replace('100x100', '300x300');
      img.alt = '';                   // decorativa: o nome já aparece no título

      const titulo = document.createElement('h2');
      titulo.textContent = musica.trackName; // textContent evita XSS

      const info = document.createElement('p');
      info.textContent = `${musica.artistName} · ${musica.collectionName}`;

      // trecho de 30 segundos; os controles nativos já funcionam com teclado
      const audio = document.createElement('audio');
      audio.src = musica.previewUrl;
      audio.controls = true;
      audio.preload = 'none';         // só baixa o áudio quando clicar em play
      audio.setAttribute('aria-label', `Ouvir trecho de ${musica.trackName}`);

      item.append(img, titulo, info, audio);
      lista.append(item);
    }
    status.textContent = `${dados.resultCount} músicas encontradas.`;

  } catch (erro) {
    // estado 4: erro (sem internet, API fora do ar…)
    status.textContent = 'Não foi possível buscar agora. Tente novamente.';
  }
});
