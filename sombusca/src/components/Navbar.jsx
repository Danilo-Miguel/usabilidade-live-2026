// src/components/Navbar.jsx — lista com key + evento que "sobe" para o pai.

// Menu gerado por array: para criar uma aba nova, basta adicionar um item aqui.
const abas = [
  { id: 'buscar', rotulo: '🔎 Buscar' },
  { id: 'favoritos', rotulo: '❤️ Favoritos' },
  { id: 'classe', rotulo: '🏛️ Classe' }, // demonstração do bloco 7
]

// A Navbar não troca a aba sozinha: o estado mora no pai, ela só chama onTrocarAba.
// Convenção: props de evento começam com "on".
export function Navbar({ abaAtiva, onTrocarAba, totalFavoritos }) {
  return (
    <nav className="flex gap-2">
      {abas.map((aba) => (
        <button
          // key única e estável: por isso o id, e não o índice do array.
          key={aba.id}
          // Passamos uma FUNÇÃO. onClick={onTrocarAba(aba.id)} executaria na renderização!
          onClick={() => onTrocarAba(aba.id)}
          // className dinâmico: template string + ternário para destacar a aba ativa.
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            abaAtiva === aba.id ? 'bg-pink-500 text-white' : 'text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          {aba.rotulo}
          {/* condição && JSX. Usamos "> 0" porque "0 && ..." desenharia o 0 na tela. */}
          {aba.id === 'favoritos' && totalFavoritos > 0 && (
            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">{totalFavoritos}</span>
          )}
        </button>
      ))}
    </nav>
  )
}
