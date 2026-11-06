// src/main.jsx — ponto de entrada: monta o <App /> dentro do <div id="root">.
// Faz o mesmo que o antigo <script type="text/babel">, mas agora com import,
// porque cada arquivo é um módulo (e não há mais a variável global React).
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' // sem chaves: App usa "export default"
import { ErrorBoundary } from './components/ErrorBoundary' // com chaves: export nomeado

createRoot(document.getElementById('root')).render(
  // StrictMode só age em desenvolvimento: monta, desmonta e monta de novo cada
  // componente para revelar bugs. Por isso os efeitos parecem rodar 2× em dev.
  <StrictMode>
    {/* Se algo quebrar ao renderizar, o ErrorBoundary mostra uma tela amigável. */}
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
