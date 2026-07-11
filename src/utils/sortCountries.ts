import { DEFAULT_COUNTRY_ISO2 } from '@/constants/defaultCountryIso2'
import type { Country } from '@/types/country'

export function sortCountries(
  countries: readonly Country[],
  preferredIso2: string = DEFAULT_COUNTRY_ISO2,
): Country[] {
  const preferred = countries.find((country) => country.iso2 === preferredIso2)
  const rest = countries
    .filter((country) => country.iso2 !== preferredIso2)
    .sort((left, right) => left.iso2.localeCompare(right.iso2))

  return preferred ? [preferred, ...rest] : rest
}
