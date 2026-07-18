import { COUNTRIES } from '@/constants/countries'

export function parseInternationalPhoneDigits(
  digits: string,
  preferredIso2?: string,
): { iso2: string; localDigits: string } | null {
  if (!digits) return null

  const matches = COUNTRIES.filter((country) =>
    digits.startsWith(country.dialCode),
  ).sort((a, b) => b.dialCode.length - a.dialCode.length)

  if (matches.length === 0) return null

  const longestLen = matches[0].dialCode.length
  const longest = matches.filter(
    (country) => country.dialCode.length === longestLen,
  )
  const preferred = preferredIso2
    ? longest.find((country) => country.iso2 === preferredIso2)
    : undefined
  const country = preferred ?? longest[0]

  return {
    iso2: country.iso2,
    localDigits: digits.slice(country.dialCode.length),
  }
}
