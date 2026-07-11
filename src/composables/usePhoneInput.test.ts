import { defineComponent, nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { usePhoneInput } from './usePhoneInput'

const TestHost = defineComponent({
  setup() {
    return usePhoneInput()
  },
  template: '<div />',
})

describe('usePhoneInput', () => {
  it('updates display and digits on input', async () => {
    const wrapper = mount(TestHost)
    await nextTick()

    wrapper.vm.updatePhone('(11) 99999-8888')
    await nextTick()

    expect(wrapper.vm.phoneDigits).toBe('11999998888')
    expect(wrapper.vm.phoneDisplay).toBe('(11) 99999-8888')
    expect(wrapper.vm.isValid).toBe(true)
    wrapper.unmount()
  })

  it('marks invalid numbers', async () => {
    const wrapper = mount(TestHost)
    await nextTick()

    wrapper.vm.updatePhone('11999')
    await nextTick()

    expect(wrapper.vm.isValid).toBe(false)
    wrapper.unmount()
  })

  it('redirects to whatsapp url when valid', async () => {
    const wrapper = mount(TestHost)
    await nextTick()

    const locationSpy = vi
      .spyOn(window, 'location', 'get')
      .mockReturnValue({ href: '' } as Location)

    wrapper.vm.updatePhone('11999998888')
    await nextTick()
    wrapper.vm.redirect()

    expect(window.location.href).toContain('11999998888')
    wrapper.unmount()
    locationSpy.mockRestore()
  })

  it('does not redirect when invalid', async () => {
    const wrapper = mount(TestHost)
    await nextTick()

    const locationSpy = vi
      .spyOn(window, 'location', 'get')
      .mockReturnValue({ href: '' } as Location)

    wrapper.vm.updatePhone('119')
    await nextTick()
    wrapper.vm.redirect()

    expect(window.location.href).toBe('')
    wrapper.unmount()
    locationSpy.mockRestore()
  })
})
