import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { mountWithI18n } from '@/test/mountWithI18n'
import { useDocumentMeta } from './useDocumentMeta'

vi.mock('@/config', () => ({
  APP_NAME: 'WhatsRedirect',
  SITE_URL: 'https://example.com',
}))

const TestHost = defineComponent({
  setup() {
    useDocumentMeta()
    return {}
  },
  template: '<div />',
})

describe('useDocumentMeta', () => {
  it('updates document title and meta tags', () => {
    mountWithI18n(TestHost)

    expect(document.title).toBe('WhatsRedirect')
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content'),
    ).toBeTruthy()
  })
})
