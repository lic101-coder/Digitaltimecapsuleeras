import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactSwc from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react(), reactSwc()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    allowedHosts: [
      'sb-anupx347ecgo.vercel.run',
      'localhost',
      '127.0.0.1'
    ]
  }
})
