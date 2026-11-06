// src/components/TrackCard.jsx — props + evento subindo para o pai.
import { Card } from './Card' // composição: o TrackCard é montado em cima do Card

export function TrackCard({ faixa, favorito, onToggleFavorito }) {
  return (
    <Card className="group flex flex-col">
      <div className="relative">
        <img src={faixa.capa} alt={`Capa de ${faixa.album}`} className="w-full aspect-square object-cover" />
        <button
          // O card não altera os favoritos: avisa o pai qual faixa foi clicada.
          onClick={() => onToggleFavorito(faixa)}
          // O botão só tem emoji, então o aria-label descreve a ação para leitores de tela.
          aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-xl hover:scale-110 transition-transform"
        >
          {/* Ternário: escolhe entre duas opções. */}
          {favorito ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold leading-tight line-clamp-2">{faixa.titulo}</h3>
        <p className="text-sm text-zinc-400">{faixa.artista}</p>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300">{faixa.genero}</span>
          {/* && : mostra ou não mostra. Nem toda faixa tem ano ou preview. */}
          {faixa.ano && <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">{faixa.ano}</span>}
          <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">{faixa.duracao}</span>
        </div>
        {faixa.preview && <audio controls src={faixa.preview} className="w-full mt-auto h-9" />}
      </div>
    </Card>
  )
}
