// src/components/TrackList.jsx — lista + key. Usado na busca e nos favoritos (reutilização).
import { TrackCard } from './TrackCard'

export function TrackList({ faixas, idsFavoritos, onToggleFavorito }) {
  return (
    // Grid responsivo: 1 coluna no celular, 2 em telas sm e 4 em telas lg.
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {faixas.map((faixa) => (
        <TrackCard
          // A key vai no componente dentro do .map() e NÃO chega como prop no filho.
          key={faixa.id}
          faixa={faixa}
          favorito={idsFavoritos.includes(faixa.id)}
          onToggleFavorito={onToggleFavorito}
        />
      ))}
    </div>
  )
}
