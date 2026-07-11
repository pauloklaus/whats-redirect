import { WHATSAPP_URL_PREFIX } from '@/constants'

export function buildWhatsAppUrl(digits: string): string {
  return `${WHATSAPP_URL_PREFIX}${digits}`
}
