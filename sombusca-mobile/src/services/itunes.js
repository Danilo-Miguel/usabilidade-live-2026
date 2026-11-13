// services/itunes.js — toda a comunicação com a API do iTunes fica neste arquivo.
// As telas não sabem montar URL nem tratar HTTP: só chamam estas funções.
// Isso separa responsabilidades e permite reutilizar a busca em qualquer tela.

// Endereço base da API pública do iTunes (não precisa de chave)
const BASE_URL = 'https://itunes.apple.com';

// Busca músicas pelo termo digitado. "async" = a função devolve uma Promise.
export async function buscarMusicas(termo) {
  // Monta a URL; encodeURIComponent troca espaços e acentos por códigos seguros
  const url = `${BASE_URL}/search?term=${encodeURIComponent(termo)}&media=music&entity=song&country=BR&limit=25`;
  // Faz a requisição HTTP GET e espera a resposta chegar
  const resposta = await fetch(url);
  // fetch só falha sozinho sem internet; erro do servidor (404, 500) precisa ser checado aqui
  if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
  // Converte o texto JSON da resposta em objeto JavaScript
  const dados = await resposta.json();
  // Devolve só a lista de músicas (array "results")
  return dados.results;
}

// Busca os detalhes de UMA música pelo id dela (trackId)
export async function buscarMusicaPorId(id) {
  // O endpoint "lookup" devolve o item com aquele id
  const url = `${BASE_URL}/lookup?id=${encodeURIComponent(id)}&country=BR`;
  // Faz a requisição e espera
  const resposta = await fetch(url);
  // Trata erro HTTP do mesmo jeito que na busca
  if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
  // Converte JSON em objeto
  const dados = await resposta.json();
  // Devolve o primeiro (e único) resultado, ou null se a música não existir
  return dados.results[0] ?? null;
}

// Troca a capa de 100x100 por uma versão maior (a API aceita outros tamanhos na URL)
export function capaGrande(musica, tamanho = 600) {
  // Substitui o trecho "100x100" da URL pelo tamanho pedido, ex.: "600x600"
  return musica.artworkUrl100.replace('100x100', `${tamanho}x${tamanho}`);
}
