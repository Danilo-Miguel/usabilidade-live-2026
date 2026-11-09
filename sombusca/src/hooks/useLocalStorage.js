// src/hooks/useLocalStorage.js
import { useEffect, useState } from 'react'

export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const salvo = localStorage.getItem(chave)
    return salvo ? JSON.parse(salvo) : valorInicial
  })

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(valor))
  }, [chave, valor])

  return [valor, setValor]
}