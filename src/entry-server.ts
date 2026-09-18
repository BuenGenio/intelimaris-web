import { createSSRApp } from 'vue'
import { renderToString, type SSRContext } from 'vue/server-renderer'
import App from './App.vue'
import { createSiteRouter } from './router'
import { getSeo, renderHead } from './seo'
export { INDEXABLE_PATHS, REDIRECTS, SITE_URL, canonicalUrl, escapeHtml } from './seo'

export async function render(url: string) {
  const app = createSSRApp(App)
  const errors: unknown[] = []
  app.config.errorHandler = error => { errors.push(error) }
  const router = createSiteRouter(true)
  app.use(router)
  await router.push(url)
  await router.isReady()
  const context: SSRContext = {}
  const html = await renderToString(app, context)
  if (errors.length) throw new AggregateError(errors, `Unable to pre-render ${url}`)
  const route = router.currentRoute.value
  return { html, head: renderHead(route), seo: getSeo(route), modules: [...(context.modules || [])] as string[] }
}
