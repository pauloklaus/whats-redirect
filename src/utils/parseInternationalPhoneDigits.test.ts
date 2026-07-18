import { describe, expect, it } from 'vitest'
import { parseInternationalPhoneDigits } from './parseInternationalPhoneDigits'

describe('parseInternationalPhoneDigits', () => {
  it('parses brazil dial code and local digits', () => {
    expect(parseInternationalPhoneDigits('5549999999999')).toEqual({
      iso2: 'BR',
      localDigits: '49999999999',
    })
  })

  it('prefers longer dial codes over shorter prefixes', () => {
    expect(parseInternationalPhoneDigits('16845551234')).toEqual({
      iso2: 'AS',
      localDigits: '5551234',
    })
  })

  it('prefers preferred country when dial codes tie', () => {
    expect(parseInternationalPhoneDigits('15551234567', 'US')).toEqual({
      iso2: 'US',
      localDigits: '5551234567',
    })
    expect(parseInternationalPhoneDigits('15551234567', 'CA')).toEqual({
      iso2: 'CA',
      localDigits: '5551234567',
    })
  })

  it('returns null for empty or unmatched digits', () => {
    expect(parseInternationalPhoneDigits('')).toBeNull()
    expect(parseInternationalPhoneDigits('000000')).toBeNull()
  })
})
