// src/components/Layout.jsx — children como "slot" da página.
import { Navbar } from './Navbar'

export function Layout({ children, abaAtiva, onTrocarAba, totalFavoritos }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            SomBusca
          </h1>
          {/* Prop drilling: o Layout só repassa estas props para a Navbar. */}
          <Navbar abaAtiva={abaAtiva} onTrocarAba={onTrocarAba} totalFavoritos={totalFavoritos} />
        </div>
      </header>
      {/* O conteúdo de cada aba entra aqui. */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">{children}</main>
    </div>
  )
}
