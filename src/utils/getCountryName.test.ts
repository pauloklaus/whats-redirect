import { describe, expect, it } from 'vitest'
import { getCountryName } from './getCountryName'

describe('getCountryName', () => {
  it('returns localized country name', () => {
    expect(getCountryName('BR', 'pt-BR')).toBe('Brasil')
    expect(getCountryName('US', 'en')).toBe('United States')
  })

  it('returns unknown region label for invalid iso2', () => {
    expect(getCountryName('ZZ', 'en')).toBe('Unknown Region')
  })
})
