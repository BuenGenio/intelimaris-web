import { describe, expect, it } from 'vitest'
import { createSiteRouter } from '@/router'
import { canonicalUrl, getSeo, renderHead, structuredData, INDEXABLE_PATHS } from './index'
const router = createSiteRouter(true)

describe('page metadata', () => {
  it('consolidates tracking/preferences, legacy aliases and static directory URLs', () => {
    expect(canonicalUrl('/products?audience=crew#im501')).toBe('https://intelimaris.com/products/')
    expect(canonicalUrl('/inteliwaterwayz/')).toBe('https://intelimaris.com/waterwayz/')
    expect(canonicalUrl('/capabilities/marina-pms')).toBe('https://intelimaris.com/marinas/')
    expect(new Set(INDEXABLE_PATHS).size).toBe(INDEXABLE_PATHS.length)
    for (const path of INDEXABLE_PATHS) expect(router.resolve(path).name).not.toBe('not-found')
    const staticPaths = router.getRoutes().filter(route => !route.path.includes(':') && !route.redirect && route.name !== 'home-alt').map(route => route.path)
    for (const path of staticPaths) expect(INDEXABLE_PATHS).toContain(path)
  })
  it('marks unknown products, categories, routes and design previews noindex', () => {
    for (const path of ['/products/missing', '/products/category/missing', '/missing', '/home-alt']) {
      expect(getSeo(router.resolve(path)).indexable).toBe(false)
      expect(renderHead(router.resolve(path))).toContain('noindex, follow')
    }
  })
  it('describes the actual selected product without inventing prices or reviews', () => {
    const route = router.resolve('/products/im501')
    const seo = getSeo(route)
    expect(seo.title).toContain('IM501')
    expect(seo.canonical).toBe('https://intelimaris.com/products/im501/')
    const graph = structuredData(route)['@graph']
    const product = graph.find(item => item['@type'] === 'Product')!
    expect(product.model).toBe('IM501')
    expect(product).not.toHaveProperty('offers')
    expect(product).not.toHaveProperty('aggregateRating')
    expect(graph.find(item => item['@type'] === 'BreadcrumbList')).toBeDefined()
  })
})
