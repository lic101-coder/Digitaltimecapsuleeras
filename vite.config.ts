import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
    preserveSymlinks: true,
  },
  optimizeDeps: {
    include: [
      'sonner',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-slot',
      'lucide-react',
      '@radix-ui/react-dialog',
      'class-variance-authority',
      '@radix-ui/react-visually-hidden',
      'date-fns',
      '@radix-ui/react-label',
      '@radix-ui/react-separator',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-slider',
      'react-easy-crop',
      '@radix-ui/react-progress',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-tabs',
      '@radix-ui/react-select',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-popover',
      'react-day-picker',
    ],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});
