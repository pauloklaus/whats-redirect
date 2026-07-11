import { DEFAULT_COUNTRY_ISO2 } from '@/constants/defaultCountryIso2'

const LOCALE_COUNTRY_PREFIXES: readonly [string, string][] = [
  ['pt', 'BR'],
  ['zh', 'CN'],
  ['es', 'ES'],
  ['en', 'US'],
  ['fr', 'FR'],
  ['de', 'DE'],
  ['it', 'IT'],
  ['et', 'EE'],
  ['ru', 'RU'],
]

export function detectDefaultCountry(): string {
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  for (const candidate of candidates) {
    const lower = candidate.toLowerCase()

    for (const [prefix, countryIso2] of LOCALE_COUNTRY_PREFIXES) {
      if (lower.startsWith(prefix)) {
        return countryIso2
      }
    }
  }

  return DEFAULT_COUNTRY_ISO2
}
