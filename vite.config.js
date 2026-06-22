import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/permaculture-elements/' : '/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        agroforestrySketch: resolve(__dirname, 'agroforestry-sketch/index.html'),
        elementsConnectionsReact: resolve(__dirname, 'elements-connections-react/index.html'),
        elementsConnectionsD3: resolve(__dirname, 'elements-connections-d3/index-elements.html'),
        form: resolve(__dirname, 'form/index-form.html'),
        jucaraCalculator: resolve(__dirname, 'jucara-calculator/index.html'),
      },
    },
  },
}))