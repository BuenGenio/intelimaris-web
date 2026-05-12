/// <reference types="vitest/config" />
import { existsSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Production is served from the apex domain intelimaris.com, so assets live at /.
// When public/CNAME exists we force base '/' regardless of VITE_DEPLOY_BASE — the
// workflow still sets that env var for non-custom-domain repos, but the CNAME takes priority.
const hasCustomDomain = existsSync(fileURLToPath(new URL('./public/CNAME', import.meta.url)))
const base = hasCustomDomain ? '/' : (process.env.VITE_DEPLOY_BASE || '/')

// https://vite.dev/config/
export default defineConfig({
  base,
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
