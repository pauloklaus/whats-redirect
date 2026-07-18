import { defineComponent, nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { usePhonePathRedirect } from './usePhonePathRedirect'

vi.mock('@/constants', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/constants')>()
  return {
    ...actual,
    WHATSAPP_URL_PREFIX: 'https://wa.me/',
  }
})

const TestHost = defineComponent({
  setup() {
    usePhonePathRedirect()
    return {}
  },
  template: '<div />',
})

describe('usePhonePathRedirect', () => {
  beforeEach(() => {
    vi.stubGlobal('location', {
      pathname: '/',
      replace: vi.fn(),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('redirects to whatsapp when path has phone digits', async () => {
    vi.stubGlobal('location', {
      pathname: '/5549999999999',
      replace: vi.fn(),
    })

    const wrapper = mount(TestHost)
    await nextTick()

    expect(window.location.replace).toHaveBeenCalledWith(
      'https://wa.me/5549999999999',
    )
    wrapper.unmount()
  })

  it('does not redirect when path has no phone digits', async () => {
    const replace = vi.fn()
    vi.stubGlobal('location', {
      pathname: '/',
      replace,
    })

    const wrapper = mount(TestHost)
    await nextTick()

    expect(replace).not.toHaveBeenCalled()
    wrapper.unmount()
  })
})
