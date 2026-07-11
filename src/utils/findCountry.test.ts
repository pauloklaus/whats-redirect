import { describe, expect, it } from 'vitest'
import { findCountry } from './findCountry'

describe('findCountry', () => {
  it('finds country by iso2', () => {
    expect(findCountry('BR')).toEqual({ iso2: 'BR', dialCode: '55' })
    expect(findCountry('US')).toEqual({ iso2: 'US', dialCode: '1' })
  })

  it('returns undefined for unknown iso2', () => {
    expect(findCountry('ZZ')).toBeUndefined()
  })
})
