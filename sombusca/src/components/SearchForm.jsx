// src/components/SearchForm.jsx
import { useState } from 'react'
import { Button } from './Button'

export function SearchForm({ onBuscar, carregando }) {
  const [termo, setTermo] = useState('')
  const [limite, setLimite] = useState(24)
  const [erro, setErro] = useState('')

  function handleSubmit(evento) {
    evento.preventDefault() // impede o recarregamento da página (comportamento padrão do form)

    const termoLimpo = termo.trim()
    if (termoLimpo.length < 2) {
      setErro('Digite pelo menos 2 caracteres.')
      return
    }

    setErro('')
    onBuscar({ termo: termoLimpo, limite }) // avisa o pai: "o usuário quer buscar isso"
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-2">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Artista, música ou álbum..."
          className={`flex-1 bg-zinc-950 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500 ${
            erro ? 'border-red-500' : 'border-zinc-700'
          }`}
        />
        <select
          value={limite}
          onChange={(e) => setLimite(Number(e.target.value))}
          className="bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2"
        >
          <option value={12}>12 resultados</option>
          <option value={24}>24 resultados</option>
          <option value={48}>48 resultados</option>
        </select>
        <Button type="submit" disabled={carregando}>
          {carregando ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
      {erro && <p className="text-sm text-red-400">{erro}</p>}
      <p className="text-xs text-zinc-500">{termo.length} caracteres digitados</p>
    </form>
  )
}