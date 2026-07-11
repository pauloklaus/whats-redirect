import { formatPhoneNumberBr } from './formatPhoneNumberBr'
import { stripDigits } from './stripDigits'

export function formatPhoneNumber(value: string, countryIso2: string): string {
  if (countryIso2 === 'BR') {
    return formatPhoneNumberBr(value)
  }

  return stripDigits(value)
}
