import { isValidBrazilPhone } from './isValidBrazilPhone'

export function isValidPhone(digits: string, countryIso2: string): boolean {
  if (countryIso2 === 'BR') {
    return isValidBrazilPhone(digits)
  }

  return digits.length >= 6 && digits.length <= 14
}
