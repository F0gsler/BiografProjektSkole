import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/getMovies': {
        target: 'https://localhost:7123',
        changeOrigin: true,
        secure: false
      }
    }
  }
})