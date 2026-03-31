import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/permaculture/' : '/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
}))