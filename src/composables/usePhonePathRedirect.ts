import { onMounted } from 'vue'
import { WHATSAPP_URL_PREFIX } from '@/constants'
import { readPhoneDigitsFromPath } from '@/utils'

export function usePhonePathRedirect(): void {
  onMounted(() => {
    const digits = readPhoneDigitsFromPath(window.location.pathname)
    if (!digits) return
    window.location.replace(`${WHATSAPP_URL_PREFIX}${digits}`)
  })
}
