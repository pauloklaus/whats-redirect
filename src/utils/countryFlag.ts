export function countryFlag(iso2: string): string {
  return [...iso2.toUpperCase()]
    .map((char) => String.fromCodePoint(0x1f1e6 - 65 + char.charCodeAt(0)))
    .join('')
}
