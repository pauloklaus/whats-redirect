import { SITE_URL } from '@/constants'

export function buildShareUrl(dialCode: string, localDigits: string): string {
  return `${SITE_URL}/${dialCode}${localDigits}`
}
