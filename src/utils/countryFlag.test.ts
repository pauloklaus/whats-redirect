import { describe, expect, it } from 'vitest'
import { countryFlag } from './countryFlag'

describe('countryFlag', () => {
  it('returns flag emoji from iso2 code', () => {
    expect(countryFlag('BR')).toBe('🇧🇷')
    expect(countryFlag('US')).toBe('🇺🇸')
    expect(countryFlag('pt')).toBe('🇵🇹')
  })
})
