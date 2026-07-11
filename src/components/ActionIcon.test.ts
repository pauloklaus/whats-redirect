import { describe, expect, it } from 'vitest'
import { mountWithI18n } from '@/test/mountWithI18n'
import ActionIcon from './ActionIcon.vue'

describe('ActionIcon', () => {
  it('renders image with src and default size', () => {
    const wrapper = mountWithI18n(ActionIcon, {
      props: { src: '/icons/chat.svg' },
    })

    const image = wrapper.find('img.action-icon')
    expect(image.attributes('src')).toBe('/icons/chat.svg')
    expect(image.attributes('style')).toContain('width: 1em')
    expect(image.attributes('style')).toContain('height: 1em')
    expect(image.attributes('aria-hidden')).toBe('true')
  })

  it('applies custom size', () => {
    const wrapper = mountWithI18n(ActionIcon, {
      props: { src: '/icons/chat.svg', size: '2rem' },
    })

    const image = wrapper.find('img.action-icon')
    expect(image.attributes('style')).toContain('width: 2rem')
    expect(image.attributes('style')).toContain('height: 2rem')
  })
})
