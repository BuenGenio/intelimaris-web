import { describe, it, expect } from 'vitest'
import router from './index'

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

  it('has exactly 4 routes', () => {
    expect(router.getRoutes().length).toBe(4)
  })
})
