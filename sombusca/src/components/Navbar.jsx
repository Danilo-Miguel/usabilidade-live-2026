const abas =[
    {id: 'buscar', rotulo: 'Buscar'},
    {id: 'favoritos', rotulo: ' ❤️ Favoritos'}
]

export function Navbar({ abativa, onTrocarAba, TotalFavoritos }) {
    return (
        <nav className="flex gap-2">
                {abas.map(aba => (
                        <button 
                            key={aba.id}
                            onClick={() => onTrocarAba(aba.id)}
                            className={`pc-4 py-2 rounded-full  text-sm font-medium transition-colors ${abativa === aba.id ? 'bg-pink-500 text-white' : 'text-zinc-300 hover:bg-zinc-800'}`}
                        >
                            {aba.rotulo}
                            {aba.id === 'favoritos' && TotalFavoritos > 0 && (
                                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                    {TotalFavoritos}
                                </span>
                            )}
                        </button>
                ))}
        </nav>
    )
}