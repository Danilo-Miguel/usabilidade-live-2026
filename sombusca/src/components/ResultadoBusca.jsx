// src/components/ResultadoBusca.jsx — renderização condicional (ocioso/loading/erro/vazio/sucesso).
// Tem vários return antecipados e não usa hooks, por isso não fere as regras dos hooks.
// Se usasse, os hooks teriam que vir ANTES do primeiro if.
import { StatusMessage } from './StatusMessage'
import { TrackList } from './TrackList'

export function ResultadoBusca({ termo, carregando, erro, faixas, idsFavoritos, onToggleFavorito }) {
  // Ocioso: o usuário ainda não buscou nada.
  if (!termo) {
    return <StatusMessage icone="🎧" titulo="O que vamos ouvir hoje?">Busque por um artista ou música.</StatusMessage>
  }

  // Carregando: skeleton com 8 cards "falsos" pulsando.
  if (carregando) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          // Índice como key é aceitável aqui: lista fixa, sem reordenar e sem dados.
          <div key={i} className="aspect-[3/4] rounded-2xl bg-zinc-900 animate-pulse" />
        ))}
      </div>
    )
  }

  // Erro: falha de rede ou resposta 4xx/5xx.
  if (erro) {
    return <StatusMessage tipo="erro" icone="⚠️" titulo="Não foi possível buscar">{erro}</StatusMessage>
  }

  // Sucesso, mas a API não encontrou nada.
  if (faixas.length === 0) {
    return <StatusMessage icone="🔍" titulo={`Nada encontrado para "${termo}"`}>Tente outro termo.</StatusMessage>
  }

  // Sucesso com resultados.
  return (
    <section className="space-y-4">
      <p className="text-zinc-400">{faixas.length} resultados para <strong className="text-zinc-100">"{termo}"</strong></p>
      <TrackList faixas={faixas} idsFavoritos={idsFavoritos} onToggleFavorito={onToggleFavorito} />
    </section>
  )
}
