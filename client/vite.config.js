import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://cv-cswb.onrender.com/', // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Rewrite ensures /api is kept
      },
    },
  },
})