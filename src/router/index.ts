import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
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
      path: '/home-alt',
      name: 'home-alt',
      component: () => import('../views/HomeAltView.vue'),
    },
  ],
})

export default router
