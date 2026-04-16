/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
// Set VITE_DEPLOY_BASE for GitHub project pages (e.g. /intelimaris-web/). User sites (*.github.io repo) use /.
export default defineConfig({
  base: process.env.VITE_DEPLOY_BASE || '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
})
