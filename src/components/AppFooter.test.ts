import { describe, expect, it, vi } from 'vitest'
import { mountWithI18n } from '@/test/mountWithI18n'
import AppFooter from './AppFooter.vue'

vi.mock('@/config', () => ({
  APP_NAME: 'WhatsRedirect',
}))

vi.mock('@/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/utils')>()
  return {
    ...actual,
    readLoadedAppVersion: vi.fn(() => '0.1.0'),
  }
})

describe('AppFooter', () => {
  it('renders app name and version', () => {
    const wrapper = mountWithI18n(AppFooter)

    expect(wrapper.text()).toContain('WhatsRedirect')
    expect(wrapper.text()).toContain('v0.1.0')
    expect(wrapper.find('a').exists()).toBe(false)
  })
})
