import { describe, expect, it, vi } from 'vitest'
import { mountWithI18n } from '@/test/mountWithI18n'
import AppFooter from './AppFooter.vue'

vi.mock('@/config', () => ({
  APP_NAME: 'WhatsRedirect',
  GITHUB_REPO_URL: 'https://github.com/test/repo',
}))

vi.mock('@/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/utils')>()
  return {
    ...actual,
    readLoadedAppVersion: vi.fn(() => '0.1.0'),
  }
})

describe('AppFooter', () => {
  it('renders app name, version, and github link', () => {
    const wrapper = mountWithI18n(AppFooter)

    expect(wrapper.text()).toContain('WhatsRedirect')
    expect(wrapper.text()).toContain('v0.1.0')
    expect(wrapper.text()).toContain('GitHub')

    const link = wrapper.find('a.app-footer__link')
    expect(link.attributes('href')).toBe('https://github.com/test/repo')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener noreferrer')
  })
})
