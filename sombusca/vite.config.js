// vite.config.js — configuração do Vite (servidor de desenvolvimento e build).
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // transforma JSX em JS e habilita o hot reload (HMR)
import tailwindcss from '@tailwindcss/vite' // varre os .jsx e gera só o CSS das classes usadas

export default defineConfig({
  // Plugins são extensões que adicionam capacidades ao Vite.
  plugins: [react(), tailwindcss()],
})
