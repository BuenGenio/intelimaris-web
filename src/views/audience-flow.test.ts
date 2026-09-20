import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount, flushPromises, type VueWrapper } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import { nextTick } from 'vue'
import HomeView from './HomeView.vue'
import AudienceView from './AudienceView.vue'
import CapabilityView from './CapabilityView.vue'
import ContactView from './ContactView.vue'
import { saveAudience } from '@/composables/useAudience'
import { AUDIENCES } from '@/data/audiences'
import { CAPABILITIES } from '@/data/capabilities'

// These tests exercise audience navigation. Canvas demos have their own model
// tests and browser checks; lazy imports must not outlive this test environment.
vi.mock('@/components/audience/JourneyStage.vue', () => ({
  default: { props: ['id', 'initialScreen'], template: '<div class="test-journey" :data-journey="id" :data-initial-screen="initialScreen"></div>' },
}))

let wrapper: VueWrapper | undefined
beforeEach(() => { saveAudience(null); localStorage.clear() })
afterEach(() => { wrapper?.unmount(); wrapper = undefined; vi.restoreAllMocks() })
async function setup(path = '/') {
  const router = createRouter({ history: createMemoryHistory(), routes: [
    { path: '/', component: HomeView },
    { path: '/for/:audience', component: AudienceView, props: route => ({ audienceId: route.params.audience }) },
    { path: '/contact', component: ContactView },
    { path: '/:pathMatch(.*)*', component: HomeView },
  ] })
  await router.push(path)
  await router.isReady()
  return router
}

describe('audience journey', () => {
  it('lets every audience select a tailored guide, with one selection at a time', async () => {
    const router = await setup()
    wrapper = mount(HomeView, { global: { plugins: [router] } })
    expect(wrapper.findAll('button[aria-pressed="true"]')).toHaveLength(0)
    for (const audience of AUDIENCES) {
      const button = wrapper.findAll('.audience-chip').find(b => b.text() === audience.label.split(' / ')[0])!
      await button.trigger('click')
      await flushPromises()
      expect(router.currentRoute.value.query.audience).toBe(audience.id)
      expect(wrapper.findAll('button[aria-pressed="true"]')).toHaveLength(1)
      expect(wrapper.get('#audience-preview h2').text()).toBe(audience.headline)
      expect(wrapper.get('#audience-preview a').attributes('href')).toContain(`/for/${audience.id}`)
      expect(localStorage.getItem('intelimaris-audience')).toBe(audience.id)
      expect(wrapper.findAll('.feature-link')).toHaveLength(audience.features.length)
    }
  })

  it('gives a shared URL precedence over a remembered preference and responds to history', async () => {
    saveAudience('crew')
    const router = await setup('/?audience=passengers')
    wrapper = mount(HomeView, { global: { plugins: [router] } })
    expect(wrapper.get('#audience-preview h2').text()).toContain('Feel part of the journey')
    await router.push('/?audience=marina-owners')
    await nextTick()
    expect(wrapper.get('#audience-preview h2').text()).toContain('The whole basin')
    router.back()
    await flushPromises()
    expect(wrapper.get('#audience-preview h2').text()).toContain('Feel part of the journey')
  })

  it('supports browsing without a role, invalid input and an explicit fresh choice', async () => {
    const router = await setup('/?audience=not-a-real-role')
    wrapper = mount(HomeView, { global: { plugins: [router] } })
    expect(wrapper.get('#audience-preview a').attributes('href')).toBe('/capabilities')
    saveAudience('crew')
    await router.push('/?choose=1')
    await nextTick()
    expect(wrapper.findAll('button[aria-pressed="true"]')).toHaveLength(0)
    expect(wrapper.findAll('.feature-link')).toHaveLength(4)
  })

  it('keeps the chooser usable when local storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    const router = await setup()
    wrapper = mount(HomeView, { global: { plugins: [router] } })
    await wrapper.get('.audience-chip').trigger('click')
    await flushPromises()
    expect(wrapper.get('#audience-preview a').attributes('href')).toBe('/for/captains')
  })

  it('carries audience and capability context into the editable contact form without sending it', async () => {
    const send = vi.spyOn(globalThis, 'fetch')
    const router = await setup('/contact?audience=maintenance&topic=monitoring')
    wrapper = mount(ContactView, { global: { plugins: [router] } })
    expect((wrapper.get('select[aria-label="Your role"]').element as HTMLSelectElement).value).toBe('maintenance')
    const message = wrapper.get('textarea')
    expect((message.element as HTMLTextAreaElement).value).toContain('service companies & technicians')
    expect((message.element as HTMLTextAreaElement).value).toContain('Vessel monitoring')
    await message.setValue('I need help with three vessels.')
    expect((message.element as HTMLTextAreaElement).value).toBe('I need help with three vessels.')
    expect(send).not.toHaveBeenCalled()
  })

  it('prefills a product-family enquiry without losing the audience context', async () => {
    const router = await setup('/contact?audience=fleet-owners&topic=intelibms')
    wrapper = mount(ContactView, { global: { plugins: [router] } })
    expect((wrapper.get('select[aria-label="Your role"]').element as HTMLSelectElement).value).toBe('fleet-owners')
    expect((wrapper.get('textarea').element as HTMLTextAreaElement).value).toContain('InteliBMS')
    expect(wrapper.get('.contact-topic').text()).toContain('InteliBMS')
  })

  it('updates copy and the journey when navigating between guides using the same view', async () => {
    const router = await setup('/for/captains')
    wrapper = mount(AudienceView, { props: { audienceId: 'captains' }, global: { plugins: [router] } })
    expect(wrapper.find('#try-passage-planner').exists()).toBe(true)
    await wrapper.setProps({ audienceId: 'marina-owners' })
    expect(wrapper.get('h1').text()).toContain('The whole basin')
    expect(wrapper.find('#try-draw-your-water').exists()).toBe(true)
  })

  it('changes the starting product screen when switching between service and business guides', async () => {
    const router = await setup('/for/maintenance')
    wrapper = mount(AudienceView, { props: { audienceId: 'maintenance' }, global: { plugins: [router] } })
    expect(wrapper.get('.test-journey').attributes('data-initial-screen')).toBe('yard-work')
    expect(wrapper.get('.guide-heading a').attributes('href')).toBe('#try-app-screens')
    await wrapper.setProps({ audienceId: 'waterfront-businesses' })
    expect(wrapper.get('.test-journey').attributes('data-initial-screen')).toBe('business-listing')
    expect(wrapper.get('.guide-heading a').attributes('href')).toBe('#try-app-screens')
  })

  it('distinguishes hazard reading from unfinished reporting actions', async () => {
    const router = await setup('/capabilities/hazard-reporting')
    wrapper = mount(CapabilityView, { props: { featureId: 'hazard-reporting' }, global: { plugins: [router] } })
    const availability = wrapper.get('#availability')
    expect(wrapper.get('.release-note').text()).toContain('Hazard viewing is implemented')
    expect(availability.text()).toContain('In development')
    expect(availability.text()).toContain('Place and submit a new report')
    expect(wrapper.find('button[type="submit"]').exists()).toBe(false)
  })
  it('puts the LiDAR demo one click away from either marina role and its homepage preview', async () => {
    for (const id of ['marina-owners', 'marina-teams']) {
      const router = await setup(`/?audience=${id}`)
      wrapper = mount(HomeView, { global: { plugins: [router] } })
      expect(wrapper.get('#audience-preview .marina-demo-link').attributes('href')).toBe(`/demo/marina/bahia-mar?audience=${id}`)
      wrapper.unmount()
      await router.push(`/for/${id}`)
      wrapper = mount(AudienceView, { props: { audienceId: id }, global: { plugins: [router] } })
      expect(wrapper.get('.guide-hero .marina-demo-link').attributes('href')).toBe(`/demo/marina/bahia-mar?audience=${id}`)
      wrapper.unmount(); wrapper = undefined
    }
  })

})
