import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { nextTick } from 'vue'
import { AUDIENCES } from '../data/audiences'
import { SOLUTIONS } from '../data/solutions'
import { CAPABILITIES } from '../data/capabilities'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.path === from.path && to.hash === from.hash) return false
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' as const : 'smooth' as const
    if (to.hash) return { el: to.hash, behavior, top: 124 }
    return { top: 0, behavior }
  },
  routes: [
    ...SOLUTIONS.filter(solution => solution.id !== 'intelibilge').map(solution => ({
      path: `/${solution.id}`,
      name: `solution-${solution.id}`,
      component: () => import('../views/SolutionView.vue'),
      props: { solutionId: solution.id },
      meta: { title: solution.label, description: solution.summary },
    })),
    ...AUDIENCES.map(audience => ({
      path: `/for/${audience.id}`,
      name: `audience-${audience.id}`,
      component: () => import('../views/AudienceView.vue'),
      props: { audienceId: audience.id },
      meta: { audience: audience.id, title: audience.short, description: audience.intro },
    })),
    ...CAPABILITIES.filter(c => c.id !== 'marina-pms').map(feature => ({
      path: `/capabilities/${feature.id}`,
      name: `capability-${feature.id}`,
      component: () => import('../views/CapabilityView.vue'),
      props: { featureId: feature.id },
      meta: { title: feature.label, description: feature.summary },
    })),
    { path: '/capabilities/marina-pms', redirect: '/marinas' },
    {
      path: '/',
      name: 'home',
      meta: { title: 'Your day on the water, connected', description: 'InteliMARIS connects navigation, vessel monitoring and marina operations through WaterWayz. Find the guide for your role on the water or on shore.' },
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
    },
    {
      path: '/products/categories',
      name: 'product-categories',
      component: () => import('../views/CategoriesView.vue'),
    },
    {
      path: '/products/category/:category',
      name: 'product-category',
      component: () => import('../views/CategoryView.vue'),
      props: true,
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue'),
      props: true,
    },
    {
      path: '/intelibilge',
      name: 'intelibilge',
      meta: { title: 'InteliBilge — Water-ingress monitoring', description: SOLUTIONS.find(s => s.id === 'intelibilge')!.summary },
      component: () => import('../views/InteliBilgeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/marinas',
      name: 'marinas',
      meta: { title: 'InteliMarina + Dock Pass / Marina management', description: CAPABILITIES.find(c => c.id === 'marina-pms')!.summary },
      component: () => import('../views/MarinasView.vue'),
    },
    {
      path: '/capabilities',
      name: 'capabilities',
      component: () => import('../views/CapabilitiesView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/waterwayz',
      name: 'waterwayz',
      component: () => import('../views/WaterWayzView.vue'),
    },
    {
      path: '/inteliwaterwayz',
      redirect: { name: 'waterwayz' },
    },
    {
      path: '/software',
      name: 'software',
      component: () => import('../views/SoftwareView.vue'),
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/DemoView.vue'),
    },
    {
      path: '/demo/marina/bahia-mar',
      name: 'demo-marina',
      component: () => import('../views/DemoMarinaView.vue'),
    },
    {
      path: '/home-alt',
      name: 'home-alt',
      component: () => import('../views/HomeAltView.vue'),
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: 'Page not found' } },
  ],
})

// Preserve old campaign anchors after the homepage stops being a feature inventory.
router.beforeEach(to => {
  if (to.path !== '/') return
  const legacy: Record<string, string> = { '#contact': '/contact', '#why-us': '/capabilities', '#waterwayz': '/waterwayz' }
  if (legacy[to.hash]) return { path: legacy[to.hash], query: to.query }
})

router.afterEach(async (to, from, failure) => {
  if (failure) return
  const titles: Record<string, string> = { waterwayz: 'WaterWayz — Your connected boating experience', capabilities: 'Explore the platform', software: 'Connected maritime software', contact: 'Talk to the team', about: 'Our story', products: 'Marine hardware' }
  const title = `${String(to.meta.title || titles[String(to.name)] || 'Marine technology')} | InteliMARIS`
  const description = String(to.meta.description || 'Navigation, monitoring, dockage and marina operations. Find the tools and workflows for your place on the water.')
  document.title = title
  for (const [selector, value] of [
    ['meta[name="description"]', description], ['meta[property="og:title"]', title],
    ['meta[property="og:description"]', description], ['meta[name="twitter:title"]', title],
    ['meta[name="twitter:description"]', description], ['meta[property="og:url"]', `https://www.intelimaris.com${to.path}`],
  ]) document.querySelector(selector!)?.setAttribute('content', value!)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://www.intelimaris.com${to.path}`)
  // Move screen-reader and keyboard users to the new page, not on preference changes.
  if (to.path !== from.path && from.matched.length && !to.hash) {
    await nextTick()
    const heading = document.querySelector<HTMLElement>('main h1')
    heading?.setAttribute('tabindex', '-1')
    heading?.focus({ preventScroll: true })
  }
})

export default router
