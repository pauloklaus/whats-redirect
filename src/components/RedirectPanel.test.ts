import { describe, expect, it, vi } from 'vitest'
import { mountWithI18n } from '@/test/mountWithI18n'
import RedirectPanel from './RedirectPanel.vue'

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

describe('RedirectPanel', () => {
  it('renders title and description', () => {
    const wrapper = mountWithI18n(RedirectPanel)

    expect(wrapper.text()).toContain('WhatsApp Redirect')
    expect(wrapper.text()).toContain('Start WhatsApp chats')
  })

  it('disables start button when phone is invalid', () => {
    const wrapper = mountWithI18n(RedirectPanel)

    const button = wrapper.find('.redirect-panel__start')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('enables start button when phone is valid', async () => {
    const wrapper = mountWithI18n(RedirectPanel)

    const input = wrapper.find('.redirect-panel__phone-input')
    await input.setValue('11999998888')

    const button = wrapper.find('.redirect-panel__start')
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('redirects on start button click', async () => {
    const locationSpy = vi
      .spyOn(window, 'location', 'get')
      .mockReturnValue({ href: '' } as Location)

    const wrapper = mountWithI18n(RedirectPanel)

    const input = wrapper.find('.redirect-panel__phone-input')
    await input.setValue('11999998888')
    await wrapper.find('.redirect-panel__start').trigger('click')

    expect(window.location.href).toContain('11999998888')
    locationSpy.mockRestore()
  })
})
