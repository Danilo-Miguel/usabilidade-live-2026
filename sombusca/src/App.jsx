// src/App.jsx — o "maestro" da tela: guarda o estado principal e distribui via props.
import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { SearchForm } from './components/SearchForm'
import { ResultadoBusca } from './components/ResultadoBusca'
import { TrackList } from './components/TrackList'
import { StatusMessage } from './components/StatusMessage'
import { Card } from './components/Card'
import { ContadorClasse } from './components/ContadorClasse'
import { useItunesSearch } from './hooks/useItunesSearch'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  // ----- state -----
  // Regra dos hooks: sempre no nível superior, nunca dentro de if/for.
  const [aba, setAba] = useState('buscar')
  const [busca, setBusca] = useState({ termo: '', limite: 24 })
  // Mesma "cara" do useState, mas o valor sobrevive ao F5.
  // "Lifting state up": favoritos mora aqui porque a Navbar e os cards precisam dele.
  const [favoritos, setFavoritos] = useLocalStorage('sombusca:favoritos', [])

  // ----- custom hook de dados -----
  // Toda vez que o usuário envia o formulário, busca vira um objeto novo e o hook faz
  // uma nova requisição (inclusive repetindo o mesmo termo depois de um erro).
  const { resultados, carregando, erro } = useItunesSearch(busca)

  // ----- efeito simples -----
  // Mexer no título da aba está FORA do React, então é um efeito colateral.
  useEffect(() => {
    document.title = `SomBusca · ${favoritos.length} favoritos`
  }, [favoritos.length])

  // ----- valores derivados (calculados, NÃO são state) -----
  // Dá para calcular a partir de favoritos; um state aqui criaria duas fontes da verdade.
  const idsFavoritos = favoritos.map((f) => f.id)

  // ----- handlers -----
  function alternarFavorito(faixa) {
    // Forma funcional do set: "atuais" é sempre o valor mais recente.
    setFavoritos((atuais) =>
      atuais.some((f) => f.id === faixa.id)
        ? atuais.filter((f) => f.id !== faixa.id) // remove
        : [...atuais, faixa] // adiciona (novo array! com push o React não perceberia)
    )
  }

  return (
    <Layout abaAtiva={aba} onTrocarAba={setAba} totalFavoritos={favoritos.length}>
      {aba === 'buscar' ? (
        // Fragment: agrupa os dois componentes sem criar uma <div> extra no HTML.
        <>
          {/* setBusca vai como prop: o submit do form atualiza o state daqui. */}
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
      ) : aba === 'classe' ? (
        // Bloco 7 da aula: class component funcionando dentro de um app com hooks.
        <Card className="p-6">
          <ContadorClasse inicial={0} rotulo="Contador feito com class component" />
        </Card>
      ) : favoritos.length === 0 ? (
        <StatusMessage icone="💔" titulo="Nenhum favorito ainda">
          Toque no 🤍 de uma música para salvá-la aqui.
        </StatusMessage>
      ) : (
        // O mesmo TrackList da busca, reutilizado com outros dados.
        <TrackList faixas={favoritos} idsFavoritos={idsFavoritos} onToggleFavorito={alternarFavorito} />
      )}
    </Layout>
  )
}
