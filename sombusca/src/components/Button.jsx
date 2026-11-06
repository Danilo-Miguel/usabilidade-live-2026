// src/components/Button.jsx — props com valor padrão + rest/spread.
const variantes = {
  primary: 'bg-pink-500 hover:bg-pink-400 text-white',
  ghost: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100',
}

// variant = 'primary' → valor padrão, usado se o pai não mandar a prop.
// ...rest → coleta "o resto" das props (type, onClick, disabled, aria-label...).
export function Button({ children, variant = 'primary', className = '', ...rest }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${variantes[variant]} ${className}`}
      // Espalha o resto no <button>: <Button type="submit"> funciona sem o Button conhecer "type".
      {...rest}
    >
      {children}
    </button>
  )
}
