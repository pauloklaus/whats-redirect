import { DEFAULT_LOCALE } from '@/constants'
import type { SupportedLocale } from '@/types'

const LOCALE_PREFIXES: readonly [string, SupportedLocale][] = [
  ['pt', 'pt-BR'],
  ['zh', 'zh-CN'],
  ['es', 'es'],
  ['en', 'en'],
  ['fr', 'fr'],
  ['de', 'de'],
  ['it', 'it'],
  ['et', 'et'],
  ['ru', 'ru'],
]

export function detectLocale(): SupportedLocale {
  const candidates = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  for (const candidate of candidates) {
    const lower = candidate.toLowerCase()

    for (const [prefix, locale] of LOCALE_PREFIXES) {
      if (lower.startsWith(prefix)) {
        return locale
      }
    }
  }

  return DEFAULT_LOCALE
}
