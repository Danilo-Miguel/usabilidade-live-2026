// src/components/Card.jsx — children puro.
// O Card não sabe o que vai dentro dele: só define a "moldura". Quem usa decide o conteúdo.
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg ${className}`}>
      {children}
    </div>
  )
}
