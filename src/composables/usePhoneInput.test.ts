import { defineComponent, nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { mountWithI18n } from '@/test/mountWithI18n'
import { usePhoneInput } from './usePhoneInput'

vi.mock('@/constants', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/constants')>()
  return {
    ...actual,
    WHATSAPP_URL_PREFIX: 'https://wa.me/',
  }
})

const TestHost = defineComponent({
  setup() {
    return usePhoneInput()
  },
  template: '<div />',
})

describe('usePhoneInput', () => {
  it('updates display and digits on input for brazil', async () => {
    const wrapper = mountWithI18n(TestHost)
    await nextTick()
    const vm = wrapper.vm as unknown as ReturnType<typeof usePhoneInput>

    vm.setCountry('BR')
    vm.updatePhone('(11) 99999-8888')
    await nextTick()

    expect(vm.phoneDigits).toBe('11999998888')
    expect(vm.phoneDisplay).toBe('(11) 99999-8888')
    expect(vm.isValid).toBe(true)
    wrapper.unmount()
  })

  it('marks invalid numbers', async () => {
    const wrapper = mountWithI18n(TestHost)
    await nextTick()
    const vm = wrapper.vm as unknown as ReturnType<typeof usePhoneInput>

    vm.setCountry('BR')
    vm.updatePhone('11999')
    await nextTick()

    expect(vm.isValid).toBe(false)
    wrapper.unmount()
  })

  it('clears phone when country changes', async () => {
    const wrapper = mountWithI18n(TestHost)
    await nextTick()
    const vm = wrapper.vm as unknown as ReturnType<typeof usePhoneInput>

    vm.setCountry('BR')
    vm.updatePhone('11999998888')
    await nextTick()
    vm.setCountry('US')
    await nextTick()

    expect(vm.phoneDigits).toBe('')
    expect(vm.phoneDisplay).toBe('')
    wrapper.unmount()
  })

  it('redirects to whatsapp url when valid', async () => {
    const wrapper = mountWithI18n(TestHost)
    await nextTick()
    const vm = wrapper.vm as unknown as ReturnType<typeof usePhoneInput>

    const locationSpy = vi
      .spyOn(window, 'location', 'get')
      .mockReturnValue({ href: '' } as Location)

    vm.setCountry('BR')
    vm.updatePhone('11999998888')
    await nextTick()
    vm.redirect()

    expect(window.location.href).toBe('https://wa.me/5511999998888')
    wrapper.unmount()
    locationSpy.mockRestore()
  })

  it('does not redirect when invalid', async () => {
    const wrapper = mountWithI18n(TestHost)
    await nextTick()
    const vm = wrapper.vm as unknown as ReturnType<typeof usePhoneInput>

    const locationSpy = vi
      .spyOn(window, 'location', 'get')
      .mockReturnValue({ href: '' } as Location)

    vm.setCountry('BR')
    vm.updatePhone('119')
    await nextTick()
    vm.redirect()

    expect(window.location.href).toBe('')
    wrapper.unmount()
    locationSpy.mockRestore()
  })
})
