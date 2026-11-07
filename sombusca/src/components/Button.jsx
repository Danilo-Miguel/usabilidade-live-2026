const variantes = {
    primary:  'bg-pink-500 hover:bg-pink-400 text-white',
    ghost: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100',
}

export function Button({ children, variant = 'primary', className = '', ...rest }) {
    return (
        <button className={`px-4 py-2 rounded-lg font-medium  transition-colors  disabled:opacity-50 ${variantes[variant]} ${className}`} 
            {...rest}
            >
            {children}

        </button>
    )
}