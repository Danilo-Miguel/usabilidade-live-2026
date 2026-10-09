// Pega o formulário de busca do HTML (o elemento com id="form") e guarda na constante "form"
const form = document.getElementById('form');
// Pega o campo de texto onde o usuário digita a busca (id="busca")
const campo = document.getElementById('busca');
// Pega o elemento onde vamos mostrar mensagens de status (carregando, erro, quantidade...)
const status = document.getElementById('status');
// Pega a lista (<ul>/<ol>) onde os cards das músicas serão colocados
const lista = document.getElementById('lista');

// Registra uma função que roda toda vez que o formulário for enviado (Enter ou botão)
// "async" permite usar "await" dentro da função; "evento" traz informações sobre o envio
form.addEventListener('submit', async (evento) => {
  // Cancela o comportamento padrão do formulário, que seria recarregar a página
  evento.preventDefault();           // não recarrega a página
  // Lê o texto digitado no campo e remove espaços do começo e do fim
  const termo = campo.value.trim();

  // Mostra a mensagem "Carregando…" para o usuário saber que a busca começou
  status.textContent = 'Carregando…'; // estado 1: carregando
  // Apaga os resultados da busca anterior, deixando a lista vazia
  lista.innerHTML = '';

  // Tenta executar o bloco abaixo; se algo der errado, pula para o "catch"
  try {
    // 1. Requisição HTTP GET para a API (pública, sem chave)
    // Monta a URL da API do iTunes:
    //   term=...   → o texto buscado (encodeURIComponent troca espaços/acentos por códigos seguros de URL)
    //   entity=song → só músicas
    //   limit=50   → no máximo 50 resultados
    //   country=BR → catálogo do Brasil
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(termo)}&entity=song&limit=50&country=BR`;
    // Faz a requisição para a API e espera (await) a resposta chegar
    const resposta = await fetch(url);

    // Se o servidor respondeu com erro (ex.: 404, 500), lança um erro e vai para o "catch"
    if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);

    // 2. Texto JSON → objeto JavaScript
    // Converte o corpo da resposta (texto JSON) em um objeto JavaScript e espera terminar
    const dados = await resposta.json();

    // estado 2: vazio
    // Se a API não encontrou nenhuma música...
    if (dados.resultCount === 0) {
      // ...mostra uma mensagem dizendo que nada foi encontrado para o termo buscado
      status.textContent = `Nenhuma música encontrada para “${termo}”.`;
      // Encerra a função aqui, pois não há nada para exibir
      return;
    }

    // estado 3: sucesso → transforma cada item do JSON em um card
    // Percorre cada música do array "results"; a cada volta, "musica" é uma música
    for (const musica of dados.results) {
      // Cria um item de lista <li> novo (ainda só na memória, não aparece na tela)
      const item = document.createElement('li');

      // Cria um elemento de imagem <img> para a capa do álbum
      const img = document.createElement('img');
      // Define a imagem da capa, trocando o tamanho 100x100 por 300x300 (melhor qualidade)
      img.src = musica.artworkUrl100.replace('100x100', '300x300');
      // Alt vazio: imagem decorativa, o leitor de tela ignora (o nome já aparece no título)
      img.alt = '';                   // decorativa: o nome já aparece no título

      // Cria um título <h2> para o nome da música
      const titulo = document.createElement('h2');
      // Coloca o nome da música como texto puro (textContent não executa HTML/scripts)
      titulo.textContent = musica.trackName; // textContent evita XSS

      // Cria um parágrafo <p> para as informações extras
      const info = document.createElement('p');
      // Escreve "Artista · Álbum" dentro do parágrafo
      info.textContent = `${musica.artistName} · ${musica.collectionName}`;

      // trecho de 30 segundos; os controles nativos já funcionam com teclado
      // Cria um player de áudio <audio>
      const audio = document.createElement('audio');
      // Define o endereço do trecho de 30 segundos da música
      audio.src = musica.previewUrl;
      // Mostra os controles do player (play, pause, volume)
      audio.controls = true;
      // Não baixa o áudio antes da hora; só baixa quando o usuário clicar em play
      audio.preload = 'none';         // só baixa o áudio quando clicar em play
      // Dá um nome acessível ao player para leitores de tela
      audio.setAttribute('aria-label', `Ouvir trecho de ${musica.trackName}`);

      // Coloca a imagem, o título, as informações e o áudio dentro do <li> (monta o card)
      item.append(img, titulo, info, audio);
      // Coloca o card dentro da lista; só agora ele aparece na página
      lista.append(item);
    } // fim do for: repete para a próxima música
    // Depois de montar todos os cards, mostra quantas músicas foram encontradas
    status.textContent = `${dados.resultCount} músicas encontradas.`;

  // Se qualquer coisa dentro do "try" falhar, o código vem para cá; "erro" tem os detalhes
  } catch (erro) {
    // estado 4: erro (sem internet, API fora do ar…)
    // Mostra uma mensagem amigável, sem termos técnicos, dizendo o que fazer
    status.textContent = 'Não foi possível buscar agora. Tente novamente.';
  } // fim do catch
}); // fecha a função do evento e o addEventListener
