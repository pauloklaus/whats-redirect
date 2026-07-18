import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mountWithI18n } from '@/test/mountWithI18n'
import RedirectPanel from './RedirectPanel.vue'

vi.mock('@/config', () => ({
  APP_NAME: 'WhatsRedirect',
}))

vi.mock('@/constants', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/constants')>()
  return {
    ...actual,
    WHATSAPP_URL_PREFIX: 'https://wa.me/',
    SITE_URL: 'https://whats.example.com',
  }
})

vi.mock('@/utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/utils')>()
  return {
    ...actual,
    readLoadedAppVersion: vi.fn(() => '0.1.0'),
  }
})

describe('RedirectPanel', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'share')
  })

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
      .mockReturnValue({ href: '', pathname: '/' } as Location)

    const wrapper = mountWithI18n(RedirectPanel)

    await wrapper.find('.redirect-panel__country-select').setValue('BR')
    const input = wrapper.find('.redirect-panel__phone-input')
    await input.setValue('11999998888')
    await wrapper.find('.redirect-panel__start').trigger('click')

    expect(window.location.href).toBe('https://wa.me/5511999998888')
    locationSpy.mockRestore()
  })

  it('shows share button when navigator.share is available', async () => {
    Object.defineProperty(navigator, 'share', {
      value: vi.fn().mockResolvedValue(undefined),
      configurable: true,
      writable: true,
    })

    const wrapper = mountWithI18n(RedirectPanel)
    await nextTick()

    expect(wrapper.find('.redirect-panel__share').exists()).toBe(true)
  })

  it('shares chat link when share button is clicked', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'share', {
      value: shareMock,
      configurable: true,
      writable: true,
    })

    const wrapper = mountWithI18n(RedirectPanel)
    await nextTick()

    await wrapper.find('.redirect-panel__country-select').setValue('BR')
    await wrapper.find('.redirect-panel__phone-input').setValue('49999999999')
    await wrapper.find('.redirect-panel__share').trigger('click')

    expect(shareMock).toHaveBeenCalledWith({
      text: 'Chat with (49) 99999-9999\n\nUse the link below:\nhttps://whats.example.com/5549999999999',
    })
  })

  it('renders country select with options', () => {
    const wrapper = mountWithI18n(RedirectPanel)

    const select = wrapper.find('.redirect-panel__country-select')
    expect(select.exists()).toBe(true)
    expect(select.findAll('option').length).toBeGreaterThan(100)
    expect(select.find('option').text()).toContain('BR')
  })

  it('selects country by iso2 letter shortcut', async () => {
    const wrapper = mountWithI18n(RedirectPanel)
    const select = wrapper.find('.redirect-panel__country-select')

    await select.trigger('keydown', { key: 'B' })
    await nextTick()

    expect((select.element as HTMLSelectElement).value).toBe('BR')
  })

  it('selects country by two-letter iso2 shortcut', async () => {
    const wrapper = mountWithI18n(RedirectPanel)
    const select = wrapper.find('.redirect-panel__country-select')

    await select.trigger('keydown', { key: 'U' })
    await select.trigger('keydown', { key: 'S' })
    await nextTick()

    expect((select.element as HTMLSelectElement).value).toBe('US')
  })
})
