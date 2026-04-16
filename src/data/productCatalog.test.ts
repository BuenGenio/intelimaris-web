import { describe, it, expect } from 'vitest'
import { productCatalog, isSystem } from './productCatalog'

describe('productCatalog', () => {
  it('has products defined', () => {
    expect(productCatalog.length).toBeGreaterThan(0)
  })

  it('every product has required fields', () => {
    for (const product of productCatalog) {
      expect(product.id).toBeTruthy()
      expect(product.model).toBeTruthy()
      expect(product.name).toBeTruthy()
      expect(product.overview).toBeTruthy()
      expect(product.features.length).toBeGreaterThan(0)
      expect(product.specs.length).toBeGreaterThan(0)
      expect(product.category).toBeTruthy()
    }
  })

  it('has unique product IDs', () => {
    const ids = productCatalog.map(p => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has unique model numbers', () => {
    const models = productCatalog.map(p => p.model)
    expect(new Set(models).size).toBe(models.length)
  })

  it('identifies InteliBilge as a system', () => {
    const intelibilge = productCatalog.find(p => p.id === 'intelibilge')
    expect(intelibilge).toBeDefined()
    expect(isSystem(intelibilge!)).toBe(true)
  })

  it('identifies sensors as non-systems', () => {
    const sensor = productCatalog.find(p => p.id === 'im101')
    expect(sensor).toBeDefined()
    expect(isSystem(sensor!)).toBe(false)
  })

  it('covers expected categories', () => {
    const categories = new Set(productCatalog.map(p => p.category))
    expect(categories).toContain('safety')
    expect(categories).toContain('water')
    expect(categories).toContain('environment')
    expect(categories).toContain('electrical')
    expect(categories).toContain('system')
  })
})
