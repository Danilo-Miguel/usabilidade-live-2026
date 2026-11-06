// src/services/itunesApi.js — ÚNICO lugar do app que conhece o contrato da API.
// Se a Apple mudar algo, só este arquivo muda. Componentes e hooks nem ficam sabendo.
const BASE_URL = 'https://itunes.apple.com/search'

// "signal" permite cancelar a requisição (quem cancela é o useEffect do hook).
export async function buscarMusicas(termo, limite, signal) {
  // URLSearchParams monta a query string e faz o encoding:
  // "legião urbana" vira "legi%C3%A3o+urbana". Nunca concatene texto do usuário na URL.
  const params = new URLSearchParams({
    term: termo,
    media: 'music',
    entity: 'song',
    country: 'BR',
    limit: String(limite),
  })

  // fetch é nativo do navegador e retorna uma Promise; await espera a resposta.
  const resposta = await fetch(`${BASE_URL}?${params}`, { signal })

  // ATENÇÃO: fetch só lança erro em falha de rede. Em 404/500 precisamos checar na mão.
  if (!resposta.ok) {
    throw new Error(`A API respondeu com erro ${resposta.status}`)
  }

  // .json() também é assíncrono: lê o corpo e converte o texto em objeto.
  const dados = await resposta.json()
  return dados.results.map(converterFaixa)
}

// "Adapter": traduz o formato da Apple para o formato do NOSSO app.
function converterFaixa(item) {
  return {
    id: item.trackId,
    titulo: item.trackName,
    artista: item.artistName,
    album: item.collectionName,
    // ?. (optional chaining): se a capa vier undefined, não quebra.
    // Trocar 100x100 por 300x300 na URL traz uma imagem maior.
    capa: item.artworkUrl100?.replace('100x100', '300x300'),
    preview: item.previewUrl,
    genero: item.primaryGenreName,
    ano: item.releaseDate ? new Date(item.releaseDate).getFullYear() : null,
    duracao: formatarDuracao(item.trackTimeMillis),
  }
}

// Converte milissegundos para "m:ss" (302000 → "5:02").
function formatarDuracao(ms) {
  if (!ms) return '--:--'
  const totalSegundos = Math.round(ms / 1000)
  const minutos = Math.floor(totalSegundos / 60)
  const segundos = String(totalSegundos % 60).padStart(2, '0') // 2 → "02"
  return `${minutos}:${segundos}`
}

/*
  A mesma função com axios, para comparar (exige: npm install axios).
  O axios já converte o JSON e já lança erro em 4xx/5xx:

  import axios from 'axios'

  export async function buscarMusicas(termo, limite, signal) {
    const { data } = await axios.get(BASE_URL, {
      params: { term: termo, media: 'music', entity: 'song', country: 'BR', limit: limite },
      signal,
    })
    return data.results.map(converterFaixa)
  }
*/
