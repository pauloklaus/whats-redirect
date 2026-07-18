import { describe, expect, it, vi } from 'vitest'
import { buildShareUrl } from './buildShareUrl'

vi.mock('@/constants', () => ({
  SITE_URL: 'https://whats.example.com',
}))

describe('buildShareUrl', () => {
  it('builds site url with dial code and local digits', () => {
    expect(buildShareUrl('55', '49999999999')).toBe(
      'https://whats.example.com/5549999999999',
    )
    expect(buildShareUrl('1', '5551234567')).toBe(
      'https://whats.example.com/15551234567',
    )
  })
})
