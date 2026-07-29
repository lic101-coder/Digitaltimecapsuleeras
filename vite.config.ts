import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// Figma Make exports imports with a version suffix, e.g.
// `@radix-ui/react-slot@1.1.2` or `lucide-react@0.487.0`. Strip the version
// so these resolve to the actually-installed package.
function stripPackageVersionSuffix() {
  return {
    name: 'strip-package-version-suffix',
    enforce: 'pre' as const,
    async resolveId(source: string, importer: string | undefined) {
      // Only touch bare package specifiers (not relative/absolute/alias paths)
      if (source.startsWith('.') || source.startsWith('/') || source.startsWith('@/')) {
        return null
      }
      // Match an `@<version>` segment that comes right after the package name
      // (handles both scoped and unscoped packages, preserving any subpath).
      const stripped = source.replace(
        /^(@[^/]+\/[^@/]+|[^@/][^/]*)@\d[^/]*(\/.*)?$/,
        '$1$2',
      )
      if (stripped === source) {
        return null
      }
      const resolved = await this.resolve(stripped, importer, { skipSelf: true })
      return resolved
    },
  }
}

export default defineConfig({
  server: {
    headers: {
      'Permissions-Policy': 'camera=(self), microphone=(self)',
    },
  },
  plugins: [
    stripPackageVersionSuffix(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
