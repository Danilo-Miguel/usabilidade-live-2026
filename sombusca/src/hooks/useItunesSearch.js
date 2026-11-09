// src/hooks/useItunesSearch.js
import { useEffect, useState } from 'react'
import { buscarMusicas } from '../services/itunesApi'

export function useItunesSearch(termo, limite) {
  const [resultados, setResultados] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    if (!termo) return

    const controller = new AbortController()
    setCarregando(true)
    setErro(null)

    buscarMusicas(termo, limite, controller.signal)
      .then(setResultados)
      .catch((e) => {
        if (e.name !== 'AbortError') setErro(e.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setCarregando(false)
      })

    return () => controller.abort()
  }, [termo, limite])

  return { resultados, carregando, erro }
}