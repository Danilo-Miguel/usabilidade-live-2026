import {TrackCard} from './TrackCard'

export function TrackList({ faixas, idFavoritos, onToggleFavorito }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
            {faixas.map(faixa => (
                <TrackCard
                    key={faixa.id}
                    faixa={faixa}
                    favorito={idFavoritos.includes(faixa.id)}
                    onToggleFavorito={onToggleFavorito}
                />
            ))}
        </div>
    )
}