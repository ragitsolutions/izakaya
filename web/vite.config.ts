import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootDir = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  // Si se despliega en un subdirectorio de Hostinger (p. ej. midominio.com/izakaya/),
  // cambia base a '/izakaya/'. Para un dominio o subdominio propio, deja '/'.
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
