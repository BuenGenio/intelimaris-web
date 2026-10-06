import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import HomePlanBar from './HomePlanBar.vue'
import { useOnboarding } from '@/composables/useOnboarding'

const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }] })

describe('the front-page passage bar', () => {
  it('plans nothing until asked, then shows a labelled sample plan', async () => {
    const wrapper = mount(HomePlanBar, { global: { plugins: [router] } })
    expect(wrapper.find('.plan-result').exists()).toBe(false)
    await wrapper.get('form').trigger('submit')
    const result = wrapper.get('.plan-result')
    expect(result.text()).toContain('Sunrise Marina → Bahia Mar')
    expect(result.text()).toContain('Sample plan')
    expect(result.text()).toMatch(/\d+ min · Las Olas bridge/)
    expect(result.get('a').attributes('href')).toBe('/api?q=passage')
  })

  it('only offers destinations that have a route from the chosen start', async () => {
    const wrapper = mount(HomePlanBar, { global: { plugins: [router] } })
    const [from, to] = wrapper.findAll('select')
    await from!.setValue('Pier 66 Marina')
    expect(to!.findAll('option').map(o => o.text())).toEqual(['Bahia Mar'])
    await wrapper.get('form').trigger('submit')
    expect(wrapper.get('.plan-result').text()).toContain('Pier 66 Marina → Bahia Mar')
    expect(wrapper.get('.plan-result').text()).toContain('Waiting')
  })

  it('hands the real planning to the app', async () => {
    const wrapper = mount(HomePlanBar, { global: { plugins: [router] } })
    await wrapper.get('form').trigger('submit')
    await wrapper.get('.plan-result button').trigger('click')
    expect(useOnboarding().open.value).toBe(true)
  })
})
