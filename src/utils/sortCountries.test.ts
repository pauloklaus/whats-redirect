import { describe, expect, it } from 'vitest'
import { sortCountries } from './sortCountries'

describe('sortCountries', () => {
  it('pins preferred country first and sorts the rest by iso2', () => {
    const countries = [
      { iso2: 'US', dialCode: '1' },
      { iso2: 'BR', dialCode: '55' },
      { iso2: 'AR', dialCode: '54' },
    ]

    expect(sortCountries(countries).map((country) => country.iso2)).toEqual([
      'BR',
      'AR',
      'US',
    ])
  })

  it('sorts all countries by iso2 when preferred country is missing', () => {
    const countries = [
      { iso2: 'US', dialCode: '1' },
      { iso2: 'AR', dialCode: '54' },
    ]

    expect(sortCountries(countries, 'ZZ').map((country) => country.iso2)).toEqual(
      ['AR', 'US'],
    )
  })
})
