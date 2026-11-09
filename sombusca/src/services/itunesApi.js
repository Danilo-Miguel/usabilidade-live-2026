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