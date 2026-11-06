// src/components/StatusMessage.jsx — feedback na UI.
// Um único componente para os estados "não-sucesso": vazio, erro e nenhum resultado.
const estilos = {
  info: 'text-zinc-400',
  erro: 'text-red-400 bg-red-950/40 border border-red-900',
}

export function StatusMessage({ icone, titulo, children, tipo = 'info' }) {
  return (
    <div className={`text-center py-16 rounded-2xl ${estilos[tipo]}`}>
      <div className="text-5xl mb-3">{icone}</div>
      <p className="text-lg font-semibold">{titulo}</p>
      {/* O texto de apoio é opcional: só aparece se vier algo entre as tags. */}
      {children && <p className="text-sm mt-1 opacity-80">{children}</p>}
    </div>
  )
}
