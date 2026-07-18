import { defineComponent, nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { useShareChat } from './useShareChat'

const TestHost = defineComponent({
  setup() {
    return useShareChat()
  },
  template: '<div />',
})

describe('useShareChat', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('sets canShare when navigator.share exists', async () => {
    vi.stubGlobal('navigator', {
      share: vi.fn().mockResolvedValue(undefined),
    })

    const wrapper = mount(TestHost)
    await nextTick()

    expect(wrapper.vm.canShare).toBe(true)
    wrapper.unmount()
  })

  it('keeps canShare false when navigator.share is missing', async () => {
    vi.stubGlobal('navigator', {})

    const wrapper = mount(TestHost)
    await nextTick()

    expect(wrapper.vm.canShare).toBe(false)
    wrapper.unmount()
  })

  it('calls navigator.share with text', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { share: shareMock })

    const wrapper = mount(TestHost)
    await nextTick()

    await wrapper.vm.share(
      'Chat with 49999\n\nUse the link below:\nhttps://whats.example.com/5549',
    )

    expect(shareMock).toHaveBeenCalledWith({
      text: 'Chat with 49999\n\nUse the link below:\nhttps://whats.example.com/5549',
    })
    wrapper.unmount()
  })

  it('ignores AbortError when user cancels share', async () => {
    const shareMock = vi
      .fn()
      .mockRejectedValue(new DOMException('cancelled', 'AbortError'))
    vi.stubGlobal('navigator', { share: shareMock })

    const wrapper = mount(TestHost)
    await nextTick()

    await expect(
      wrapper.vm.share(
        'Chat with 49999\n\nUse the link below:\nhttps://whats.example.com/5549',
      ),
    ).resolves.toBeUndefined()
    wrapper.unmount()
  })
})
