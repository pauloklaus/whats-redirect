import { defineComponent, nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { usePwaInstall } from './usePwaInstall'

const TestHost = defineComponent({
  setup() {
    return usePwaInstall()
  },
  template: '<div />',
})

function createBeforeInstallPromptEvent(): BeforeInstallPromptEvent {
  const event = new Event('beforeinstallprompt', {
    cancelable: true,
  }) as BeforeInstallPromptEvent
  event.prompt = vi.fn().mockResolvedValue(undefined)
  event.userChoice = Promise.resolve({ outcome: 'accepted' })
  return event
}

describe('usePwaInstall', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: false })),
    )
    Object.defineProperty(navigator, 'standalone', {
      value: false,
      configurable: true,
    })
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Linux; Android 14)',
      configurable: true,
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('enables install on android after beforeinstallprompt', async () => {
    const wrapper = mount(TestHost)
    await nextTick()

    window.dispatchEvent(createBeforeInstallPromptEvent())
    await nextTick()

    expect(wrapper.vm.canInstall).toBe(true)
    wrapper.unmount()
  })

  it('calls deferred prompt on install', async () => {
    const wrapper = mount(TestHost)
    await nextTick()

    const event = createBeforeInstallPromptEvent()
    window.dispatchEvent(event)
    await nextTick()

    await wrapper.vm.install()

    expect(event.prompt).toHaveBeenCalled()
    expect(wrapper.vm.canInstall).toBe(false)
    wrapper.unmount()
  })

  it('skips listeners when already standalone', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: true })),
    )

    const addSpy = vi.spyOn(window, 'addEventListener')
    const wrapper = mount(TestHost)
    await nextTick()

    expect(addSpy).not.toHaveBeenCalledWith(
      'beforeinstallprompt',
      expect.any(Function),
    )
    wrapper.unmount()
    addSpy.mockRestore()
  })
})
