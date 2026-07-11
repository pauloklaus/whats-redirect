import { describe, expect, it, vi } from 'vitest'
import { buildWhatsAppUrl } from './buildWhatsAppUrl'

vi.mock('@/constants', () => ({
  WHATSAPP_URL_PREFIX: 'https://wa.me/55',
}))

describe('buildWhatsAppUrl', () => {
  it('concatenates prefix with digits', () => {
    expect(buildWhatsAppUrl('11999998888')).toBe(
      'https://wa.me/5511999998888',
    )
  })
})
