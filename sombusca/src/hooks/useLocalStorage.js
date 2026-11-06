// src/hooks/useLocalStorage.js — state que sobrevive ao F5.
// Retorna [valor, setValor], igual ao useState. Quem usa nem percebe a diferença.
import { useEffect, useState } from 'react'

export function useLocalStorage(chave, valorInicial) {
  // Inicialização preguiçosa (lazy): passando uma FUNÇÃO, o React só a executa
  // na primeira renderização. Sem isso, leríamos o localStorage a cada render.
  const [valor, setValor] = useState(() => {
    const salvo = localStorage.getItem(chave)
    // localStorage só guarda texto: JSON.parse converte de volta em array/objeto.
    return salvo ? JSON.parse(salvo) : valorInicial
  })

  // Um efeito = uma responsabilidade. Este só sincroniza o state com o navegador.
  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(valor))
  }, [chave, valor])

  return [valor, setValor]
}
