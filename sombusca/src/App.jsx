// src/App.jsx
import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { SearchForm } from './components/SearchForm'
import { ResultadoBusca } from './components/ResultadoBusca'
import { TrackList } from './components/TrackList'
import { StatusMessage } from './components/StatusMessage'
import { useItunesSearch } from './hooks/useItunesSearch'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  // ----- state -----
  const [aba, setAba] = useState('buscar')
  const [busca, setBusca] = useState({ termo: '', limite: 24 })
  const [favoritos, setFavoritos] = useLocalStorage('sombusca:favoritos', [])

  // ----- custom hook de dados -----
  const { resultados, carregando, erro } = useItunesSearch(busca.termo, busca.limite)

  // ----- efeito simples -----
  useEffect(() => {
    document.title = `SomBusca · ${favoritos.length} favoritos`
  }, [favoritos.length])

  // ----- valores derivados (calculados, NÃO são state) -----
  const idsFavoritos = favoritos.map((f) => f.id)

  // ----- handlers -----
  function alternarFavorito(faixa) {
    setFavoritos((atuais) =>
      atuais.some((f) => f.id === faixa.id)
        ? atuais.filter((f) => f.id !== faixa.id) // remove
        : [...atuais, faixa]                        // adiciona (novo array!)
    )
  }

  return (
    <Layout abaAtiva={aba} onTrocarAba={setAba} totalFavoritos={favoritos.length}>
      {aba === 'buscar' ? (
        <>
          <SearchForm onBuscar={setBusca} carregando={carregando} />
          <ResultadoBusca
            termo={busca.termo}
            carregando={carregando}
            erro={erro}
            faixas={resultados}
            idsFavoritos={idsFavoritos}
            onToggleFavorito={alternarFavorito}
          />
        </>
      ) : favoritos.length === 0 ? (
        <StatusMessage icone="💔" titulo="Nenhum favorito ainda">
          Toque no 🤍 de uma música para salvá-la aqui.
        </StatusMessage>
      ) : (
        <TrackList faixas={favoritos} idsFavoritos={idsFavoritos} onToggleFavorito={alternarFavorito} />
      )}
    </Layout>
  )
}