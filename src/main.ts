import { createApp } from 'vue'
// @ts-expect-error - vue-matomo has no bundled types
import VueMatomo from 'vue-matomo'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(VueMatomo, {
  host: 'https://matomo.matumi.anthill.hk/',
  siteId: 9,
  router,
})

app.mount('#app')

window._paq?.push(['trackPageView'])
