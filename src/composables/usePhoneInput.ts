import { ref, computed } from 'vue'
import {
  stripDigits,
  formatPhoneNumberBr,
  isValidBrazilPhone,
  buildWhatsAppUrl,
} from '@/utils'

export function usePhoneInput() {
  const phoneDisplay = ref('')
  const phoneDigits = ref('')

  const isValid = computed(() => isValidBrazilPhone(phoneDigits.value))

  function updatePhone(value: string): void {
    phoneDigits.value = stripDigits(value)
    phoneDisplay.value = formatPhoneNumberBr(value)
  }

  function redirect(): void {
    if (!isValid.value) return
    window.location.href = buildWhatsAppUrl(phoneDigits.value)
  }

  return {
    phoneDisplay,
    phoneDigits,
    isValid,
    updatePhone,
    redirect,
  }
}
