import { WHATSAPP_URL_PREFIX } from '@/constants'

export function buildWhatsAppUrl(
  dialCode: string,
  localDigits: string,
): string {
  return `${WHATSAPP_URL_PREFIX}${dialCode}${localDigits}`
}
