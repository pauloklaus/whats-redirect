import { describe, expect, it, vi } from 'vitest'
import { buildWhatsAppUrl } from './buildWhatsAppUrl'

vi.mock('@/constants', () => ({
  WHATSAPP_URL_PREFIX: 'https://wa.me/',
}))

describe('buildWhatsAppUrl', () => {
  it('builds wa.me url with dial code and local digits', () => {
    expect(buildWhatsAppUrl('55', '11999998888')).toBe(
      'https://wa.me/5511999998888',
    )
    expect(buildWhatsAppUrl('1', '5551234567')).toBe(
      'https://wa.me/15551234567',
    )
  })
})
