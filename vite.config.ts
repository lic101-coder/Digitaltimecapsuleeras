import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
    allowedHosts: ['sb-6rklqcdb9p6g.vercel.run', 'localhost', '127.0.0.1'],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
