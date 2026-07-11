import { describe, expect, it } from 'vitest'
import { formatPhoneNumber } from './formatPhoneNumber'

describe('formatPhoneNumber', () => {
  it('formats brazilian numbers', () => {
    expect(formatPhoneNumber('11999998888', 'BR')).toBe('(11) 99999-8888')
  })

  it('returns digits only for other countries', () => {
    expect(formatPhoneNumber('555-123-4567', 'US')).toBe('5551234567')
  })
})
