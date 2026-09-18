import { createApp, createSSRApp } from 'vue'
// @ts-expect-error - vue-matomo has no bundled types
import VueMatomo from 'vue-matomo'

import App from './App.vue'
import { createSiteRouter } from './router'
const router = createSiteRouter()

// Hydrate canonical HTML. Preference/hash URLs can have intentionally different first content.
const container = document.getElementById('app')!
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const prerendered = container.dataset.prerenderPath === path && !window.location.search && !window.location.hash
const app = (prerendered ? createSSRApp : createApp)(App)

app.use(router)
app.use(VueMatomo, {
  host: 'https://matomo.matumi.anthill.hk/',
  siteId: 9,
  router,
})

router.isReady().then(() => { app.mount('#app') })
