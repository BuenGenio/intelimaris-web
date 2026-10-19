import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import FleetOperations from './FleetOperations.vue'
let wrapper: VueWrapper | undefined
afterEach(() => { wrapper?.unmount(); vi.useRealTimers(); vi.restoreAllMocks() })

describe('fleet operations desk', () => {
  it('counts movement separately from an advisory after a vessel arrives', async () => {
    vi.useFakeTimers()
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false)
    wrapper = mount(FleetOperations)
    await nextTick()
    const control = wrapper.findAll('.fleet-control')[0]!
    if (control.text() === 'Play demo') await control.trigger('click')
    const underway = () => wrapper!.findAll('.fleet-metrics strong')[1]!.text()
    expect(underway()).toBe('04')
    await vi.advanceTimersByTimeAsync(180000)
    expect(wrapper.get('[aria-label^="Sentinel,"]').attributes('aria-label')).toBe('Sentinel, Attention, 0.0 knots')
    expect(underway()).toBe('00')
    expect(wrapper.get('.fleet-map-source').text()).toContain('Imagery Esri, Maxar')
  })
  it('selects the same vessel from map and register and identifies stale speed as historical', async () => {
    wrapper = mount(FleetOperations)
    await wrapper.get('[aria-label="Rental 12, Stale, 3.8 knots, last reported"]').trigger('keydown', { key: 'Enter' })
    expect(wrapper.get('.fleet-detail h3').text()).toBe('Rental 12')
    expect(wrapper.get('.fleet-detail').text()).toContain('Last reported speed')
    expect(wrapper.get('.fleet-row.selected').text()).toContain('Rental 12')
    const atlas = wrapper.findAll('.fleet-row').find(row => row.text().includes('Atlas'))!
    await atlas.trigger('click')
    expect(wrapper.get('.fleet-detail h3').text()).toBe('Atlas')
    expect(wrapper.get('[aria-label^="Atlas,"]').attributes('aria-pressed')).toBe('true')
  })
  it('keeps map, register and selected detail aligned through filters and empty recovery', async () => {
    wrapper = mount(FleetOperations)
    await wrapper.get('select').setValue('rental')
    expect(wrapper.findAll('.fleet-row')).toHaveLength(2)
    expect(wrapper.findAll('.fleet-marker')).toHaveLength(2)
    await wrapper.get('input[type="checkbox"]').setValue(true)
    expect(wrapper.get('.fleet-detail h3').text()).toBe('Rental 12')
    await wrapper.get('input[type="search"]').setValue('missing')
    expect(wrapper.find('.fleet-detail').exists()).toBe(false)
    expect(wrapper.findAll('.fleet-marker')).toHaveLength(0)
    await wrapper.get('.fleet-empty button').trigger('click')
    expect(wrapper.findAll('.fleet-row')).toHaveLength(6)
  })
  it('pauses movement, resumes the demo and resets to the first vessel', async () => {
    vi.useFakeTimers()
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(false)
    wrapper = mount(FleetOperations)
    await nextTick()
    const control = wrapper.findAll('.fleet-control')[0]!
    if (control.text() === 'Play demo') await control.trigger('click')
    const marker = () => wrapper!.get('[aria-label^="Meridian,"]').attributes('transform')
    const initial = marker()
    await vi.advanceTimersByTimeAsync(1000)
    expect(marker()).not.toBe(initial)
    await control.trigger('click')
    const paused = marker()
    await vi.advanceTimersByTimeAsync(2000)
    expect(marker()).toBe(paused)
    await wrapper.findAll('.fleet-control')[1]!.trigger('click')
    expect(marker()).toBe(initial)
    expect(wrapper.get('.fleet-source').text()).toContain('Fictional vessels')
  })
})
