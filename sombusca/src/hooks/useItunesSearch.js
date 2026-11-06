// src/hooks/useItunesSearch.js — custom hook: busca + loading/erro/sucesso.
// Custom hook é só uma função que usa outros hooks e cujo nome começa com "use".
// Componente reutiliza VISUAL; custom hook reutiliza LÓGICA com estado.
import { useEffect, useState } from 'react'
import { buscarMusicas } from '../services/itunesApi'

// Recebe o OBJETO da busca, e não termo e limite separados. Cada submit cria um
// objeto novo, então clicar em Buscar sempre dispara o efeito, mesmo repetindo o
// mesmo termo (é o que permite tentar de novo depois de um erro de rede).
export function useItunesSearch(busca) {
  // Cada estado da requisição vira um state. Cada componente que chama
  // este hook tem o seu próprio: hooks compartilham lógica, não dados.
  const [resultados, setResultados] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const { termo, limite } = busca
    if (!termo) return // ainda não buscou nada → não faz requisição

    const controller = new AbortController() // permite cancelar este fetch
    setCarregando(true)
    setErro(null) // limpa o erro da busca anterior

    buscarMusicas(termo, limite, controller.signal)
      .then(setResultados) // o mesmo que .then((faixas) => setResultados(faixas))
      .catch((e) => {
        // Cancelar lança AbortError. Não é erro de verdade, então ignoramos.
        if (e.name !== 'AbortError') setErro(e.message)
      })
      .finally(() => {
        // Se foi cancelada, já existe uma busca mais nova cuidando do loading.
        if (!controller.signal.aborted) setCarregando(false)
      })

    // Limpeza: roda antes do próximo efeito e quando o componente sai da tela.
    // Evita a race condition: "rock" responder depois de "jazz" e sobrescrever a tela.
    return () => controller.abort()
  }, [busca]) // roda de novo a cada busca enviada (cada submit gera um objeto novo)

  // Objeto em vez de array: mais legível quando são mais de 2 valores.
  return { resultados, carregando, erro }
}
