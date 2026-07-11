import { DEFAULT_LOCALE } from '@/constants'
import type { SupportedLocale } from '@/types'

export function detectLocale(): SupportedLocale {
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  for (const candidate of candidates) {
    const lower = candidate.toLowerCase()

    if (lower.startsWith('pt')) {
      return 'pt-BR'
    }

    if (lower.startsWith('es')) {
      return 'es'
    }

    if (lower.startsWith('en')) {
      return 'en'
    }
  }

  return DEFAULT_LOCALE
}
