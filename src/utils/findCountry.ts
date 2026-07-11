import { COUNTRIES } from '@/constants/countries'
import type { Country } from '@/types/country'

export function findCountry(iso2: string): Country | undefined {
  return COUNTRIES.find((country) => country.iso2 === iso2)
}
