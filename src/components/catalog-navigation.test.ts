import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import ProductsView from '@/views/ProductsView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import NavigationBar from './NavigationBar.vue'
import FooterSection from './FooterSection.vue'
import { MAIN_NAVIGATION, PLATFORM_NAVIGATION } from '@/data/navigation'
import { saveAudience } from '@/composables/useAudience'

let wrapper: VueWrapper | undefined
beforeEach(() => { localStorage.clear(); saveAudience(null) })
afterEach(() => { wrapper?.unmount(); wrapper = undefined; vi.restoreAllMocks() })
async function setup(path: string, withHeader = false) {
  const router = createRouter({ history: createMemoryHistory(), routes: [
    { path: '/', name: 'home', component: ProductsView },
    { path: '/products', name: 'products', component: ProductsView },
    { path: '/products/:id', name: 'product-detail', component: ProductDetailView, props: true },
    { path: '/:pathMatch(.*)*', component: ProductsView },
  ] })
  await router.push(path)
  await router.isReady()
  const shell = defineComponent({ components: { NavigationBar, FooterSection }, template: `${withHeader ? '<NavigationBar />' : ''}<RouterView />${withHeader ? '<FooterSection />' : ''}` })
  wrapper = mount(shell, { global: { plugins: [router] } })
  return router
}

describe('catalog navigation', () => {
  it('opens legacy product anchors and restores selection through browser history', async () => {
    const router = await setup('/products#im501')
    expect(wrapper!.get('#catalog-product-title').text()).toBe('DC Shunt & Battery Monitor')
    await wrapper!.get('.catalog-product-list a[href="/products/im601"]').trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/products/im601')
    expect(wrapper!.get('#catalog-product-title').text()).toBe('Solid-State Water Level Sensor')
    expect(wrapper!.findAll('.catalog-product-list [aria-current="true"]')).toHaveLength(1)
    router.back()
    await flushPromises()
    expect(wrapper!.get('#catalog-product-title').text()).toBe('DC Shunt & Battery Monitor')
  })

  it('filters the product browser and recovers from an empty search without losing the selected specification', async () => {
    await setup('/products#im501')
    await wrapper!.get('select[aria-label="Hardware category"]').setValue('water')
    const links = wrapper!.findAll('.catalog-product-list a')
    expect(links.length).toBeGreaterThan(0)
    expect(links.every(link => !link.text().includes('IM501'))).toBe(true)
    await wrapper!.get('input[type="search"]').setValue('does not exist')
    expect(wrapper!.findAll('.catalog-product-list a')).toHaveLength(0)
    expect(wrapper!.get('#catalog-product-title').text()).toBe('DC Shunt & Battery Monitor')
    await wrapper!.get('.catalog-empty-search button').trigger('click')
    expect(wrapper!.findAll('.catalog-product-list a').length).toBeGreaterThan(links.length)
  })

  it('retains the sidebar and updates content when switching between product detail URLs', async () => {
    const router = await setup('/products/im501')
    await wrapper!.get('.catalog-product-list a[href="/products/im601"]').trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/products/im601')
    expect(wrapper!.get('#catalog-product-title').text()).toBe('Solid-State Water Level Sensor')
    expect(wrapper!.get('.catalog-specifications').text()).toContain('IM601')
  })

  it('puts a single product breadcrumb in the navbar strip', async () => {
    await setup('/products/im601', true)
    expect(wrapper!.findAll('nav[aria-label="Breadcrumb"]')).toHaveLength(1)
    expect(wrapper!.get('.breadcrumb-strip [aria-current="page"]').text()).toBe('IM601')
    expect(wrapper!.find('main nav[aria-label="Breadcrumb"]').exists()).toBe(false)
    expect(wrapper!.get('.breadcrumb-strip a[href="/products"]').text()).toBe('Hardware')
  })

  it('changes role without leaving the catalog or its selected product', async () => {
    const router = await setup('/products#im501', true)
    await wrapper!.get('.role-trigger').trigger('click')
    const crew = wrapper!.findAll('.role-options-grid button').find(button => button.text() === 'Crew member')!
    await crew.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.path).toBe('/products')
    expect(router.currentRoute.value.hash).toBe('#im501')
    expect(router.currentRoute.value.query.audience).toBe('crew')
    expect(wrapper!.find('[role="dialog"]').exists()).toBe(false)
    expect(wrapper!.get('#catalog-product-title').text()).toBe('DC Shunt & Battery Monitor')
  })
  it('uses matching navigation labels in the platform menu and footer', async () => {
    await setup('/products', true)
    await wrapper!.get('.platform-trigger').trigger('click')
    for (const link of PLATFORM_NAVIGATION) {
      expect(wrapper!.get(`.platform-popover a[href="${link.to}"]`).text()).toContain(link.label)
      expect(wrapper!.get(`.footer-links a[href="${link.to}"]`).text()).toContain(link.to === '/capabilities' ? 'Platform' : link.label)
    }
    for (const link of MAIN_NAVIGATION) expect(wrapper!.get(`.footer-links a[href="${link.to}"]`).text()).toBe(link.label)
  })

})
