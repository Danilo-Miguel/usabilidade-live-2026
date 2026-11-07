import {Navbar} from './Navbar'


export function Layout({ children, abativa, onTrocarAba, TotalFavoritos }) {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800">
                <div className = "max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">Sombusca</h1>
                <Navbar abativa={abativa} onTrocarAba={onTrocarAba} TotalFavoritos={TotalFavoritos} />
                </div>
            </header>
            <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                {children}
            </main>
        </div>
    )
}