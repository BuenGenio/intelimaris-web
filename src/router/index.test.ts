import { describe, it, expect } from 'vitest'
import router from './index'
import { AUDIENCES, audienceLink } from '../data/audiences'
import { CAPABILITIES, capabilityLink } from '../data/capabilities'

describe('router', () => {
  it('defines the home route', () => {
    const home = router.getRoutes().find(r => r.name === 'home')
    expect(home).toBeDefined()
    expect(home!.path).toBe('/')
  })

  it('defines the products route', () => {
    const products = router.getRoutes().find(r => r.name === 'products')
    expect(products).toBeDefined()
    expect(products!.path).toBe('/products')
  })

  it('defines the intelibilge route', () => {
    const intelibilge = router.getRoutes().find(r => r.name === 'intelibilge')
    expect(intelibilge).toBeDefined()
    expect(intelibilge!.path).toBe('/intelibilge')
  })

  it('defines the about route', () => {
    const about = router.getRoutes().find(r => r.name === 'about')
    expect(about).toBeDefined()
    expect(about!.path).toBe('/about')
  })

  it('defines the product-categories route', () => {
    const route = router.getRoutes().find(r => r.name === 'product-categories')
    expect(route).toBeDefined()
    expect(route!.path).toBe('/products/categories')
  })

  it('defines the product-category route', () => {
    const route = router.getRoutes().find(r => r.name === 'product-category')
    expect(route).toBeDefined()
    expect(route!.path).toBe('/products/category/:category')
  })

  it('defines the product-detail route', () => {
    const route = router.getRoutes().find(r => r.name === 'product-detail')
    expect(route).toBeDefined()
    expect(route!.path).toBe('/products/:id')
  })

  it('defines the marinas route', () => {
    const route = router.getRoutes().find(r => r.name === 'marinas')
    expect(route).toBeDefined()
    expect(route!.path).toBe('/marinas')
  })

  it('defines the capabilities route', () => {
    const route = router.getRoutes().find(r => r.name === 'capabilities')
    expect(route).toBeDefined()
    expect(route!.path).toBe('/capabilities')
  })

  it('defines the contact route', () => {
    const route = router.getRoutes().find(r => r.name === 'contact')
    expect(route).toBeDefined()
    expect(route!.path).toBe('/contact')
  })

  it('defines the waterwayz route', () => {
    const route = router.getRoutes().find(r => r.name === 'waterwayz')
    expect(route).toBeDefined()
    expect(route!.path).toBe('/waterwayz')
  })

  it('redirects the legacy inteliwaterwayz path', () => {
    const route = router.getRoutes().find(r => r.path === '/inteliwaterwayz')
    expect(route).toBeDefined()
    expect(route!.redirect).toEqual({ name: 'waterwayz' })
  })

  it('defines the software route', () => {
    const route = router.getRoutes().find(r => r.name === 'software')
    expect(route).toBeDefined()
    expect(route!.path).toBe('/software')
  })

  it('defines the technology demo routes', () => {
    const demo = router.getRoutes().find(r => r.name === 'demo')
    const marina = router.getRoutes().find(r => r.name === 'demo-marina')
    expect(demo?.path).toBe('/demo')
    expect(marina?.path).toBe('/demo/marina/bahia-mar')
  })

  it('resolves every audience guide and capability without falling through to 404', () => {
    for (const path of [...AUDIENCES.map(a => audienceLink(a.id)), ...CAPABILITIES.map(c => capabilityLink(c.id))]) {
      expect(router.resolve(path).name, path).not.toBe('not-found')
      expect(router.resolve(path).matched.length, path).toBeGreaterThan(0)
    }
  })

  it('gives unknown audience and capability URLs a recovery page', () => {
    expect(router.resolve('/for/unknown').name).toBe('not-found')
    expect(router.resolve('/capabilities/unknown').name).toBe('not-found')
  })

  it('keeps the marina capability URL as an alias to the existing landing page', () => {
    expect(router.getRoutes().find(r => r.path === '/capabilities/marina-pms')?.redirect).toBe('/marinas')
  })
})
