const displayNamesCache = new Map<string, Intl.DisplayNames>()

function getDisplayNames(locale: string): Intl.DisplayNames {
  let names = displayNamesCache.get(locale)

  if (!names) {
    names = new Intl.DisplayNames([locale], { type: 'region' })
    displayNamesCache.set(locale, names)
  }

  return names
}

export function getCountryName(iso2: string, locale: string): string {
  return getDisplayNames(locale).of(iso2) ?? iso2
}
