export function Card({ children, className = ''}) {

return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg ${className}`}>
        {children}
    </div>
)
}