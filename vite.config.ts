import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    pool: 'forks',  // ← Changer 'threads' en 'forks' (résout les conflits ESM)
    server: {
      deps: {
        inline: [
          /@mui\/material/,
          /@emotion/,
          /@csstools/,          // ← élargir le pattern pour couvrir tous les sous-packages
          /@asamuzakjp/,        // ← idem
          /css-tree/,
          /nth-check/,
        ],
      },
    },
  },
})