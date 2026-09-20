import { computed } from 'vue'
import { useRoute, type RouteLocationRaw, type RouteLocationNormalizedLoaded, type RouteLocationResolved } from 'vue-router'
import { findAudience } from '@/data/audiences'
import { findCapability } from '@/data/capabilities'
import { findSolution } from '@/data/solutions'
import { CATEGORY_ORDER, findProduct, type ProductCategory } from '@/data/productCatalog'
import { translations } from '@/i18n/translations'
import { useI18n } from './useI18n'

export interface BreadcrumbItem { label: string; to?: RouteLocationRaw }

export function useBreadcrumbs() {
  const route = useRoute()
  const { t } = useI18n()
  return computed(() => getBreadcrumbs(route, t))
}

export function getBreadcrumbs(route: RouteLocationNormalizedLoaded | RouteLocationResolved, t: (key: string) => string = key => translations.en[key] || key): BreadcrumbItem[] {

    const platform = { label: 'Platform & software', to: '/capabilities' }
    const hardware = { label: 'Hardware', to: '/products' }
    const categories = { label: 'Categories', to: '/products/categories' }
    const audience = findAudience(route.meta.audience)
    if (audience) return [{ label: 'For you', to: '/?choose=1#choose' }, { label: audience.short }]
    const feature = findCapability(route.meta.capability)
    if (feature) return [platform, { label: feature.label }]
    const solution = findSolution(route.meta.solution)
    if (solution) return [platform, { label: solution.label }]
    if (route.meta.press) return [{ label: 'Our story', to: '/about' }, { label: 'Press' }]
    const name = String(route.name)
    if (name === 'product-detail') {
      const product = typeof route.params.id === 'string' ? findProduct(route.params.id) : undefined
      if (!product) return [hardware, { label: 'Product not found' }]
      return [hardware, { label: t(`products.category.${product.category}`), to: `/products/category/${product.category}` }, { label: product.model }]
    }
    if (name === 'product-category') {
      const category = route.params.category as ProductCategory
      return [hardware, categories, { label: CATEGORY_ORDER.includes(category) ? t(`products.category.${category}`) : 'Category not found' }]
    }
    const pages: Record<string, BreadcrumbItem[]> = {
      home: [], products: [hardware], 'product-categories': [hardware, categories],
      capabilities: [platform], waterwayz: [platform, { label: 'WaterWayz™' }],
      software: [platform, { label: 'Software & connections' }],
      about: [{ label: 'Our story' }], contact: [{ label: 'Talk to us' }],
      demo: [{ label: 'Interactive demos' }],
      'demo-marina': [{ label: 'Interactive demos', to: '/demo' }, { label: 'Bahia Mar · Survey demo' }],
      'not-found': [{ label: 'Page not found' }],
    }
    return pages[name] || []
}
