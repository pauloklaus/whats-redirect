import { DEFAULT_COUNTRY_ISO2 } from '@/constants/defaultCountryIso2'

export function detectDefaultCountry(): string {
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  for (const candidate of candidates) {
    const lower = candidate.toLowerCase()

    if (lower.startsWith('pt')) {
      return 'BR'
    }

    if (lower.startsWith('es')) {
      return 'ES'
    }

    if (lower.startsWith('en')) {
      return 'US'
    }
  }

  return DEFAULT_COUNTRY_ISO2
}
