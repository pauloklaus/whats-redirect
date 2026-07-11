import { describe, expect, it } from 'vitest'
import { formatPhoneNumberBr } from './formatPhoneNumberBr'

describe('formatPhoneNumberBr', () => {
  it('formats 10-digit numbers', () => {
    expect(formatPhoneNumberBr('1199998888')).toBe('(11) 9999-8888')
  })

  it('formats 11-digit numbers', () => {
    expect(formatPhoneNumberBr('11999998888')).toBe('(11) 99999-8888')
  })

  it('returns raw digits for other lengths', () => {
    expect(formatPhoneNumberBr('11999')).toBe('11999')
    expect(formatPhoneNumberBr('119999988889')).toBe('119999988889')
  })

  it('strips non-digits before formatting', () => {
    expect(formatPhoneNumberBr('(11) 99999-8888')).toBe('(11) 99999-8888')
  })
})
