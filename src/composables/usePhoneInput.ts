import { ref, computed } from 'vue'
import { COUNTRIES } from '@/constants/countries'
import {
  stripDigits,
  formatPhoneNumber,
  isValidPhone,
  buildWhatsAppUrl,
  findCountry,
  sortCountries,
  detectDefaultCountry,
} from '@/utils'

export function usePhoneInput() {
  const countryIso2 = ref(detectDefaultCountry())
  const phoneDisplay = ref('')
  const phoneDigits = ref('')

  const sortedCountries = computed(() => sortCountries(COUNTRIES))

  const selectedCountry = computed(() => findCountry(countryIso2.value))

  const isValid = computed(() =>
    isValidPhone(phoneDigits.value, countryIso2.value),
  )

  function updatePhone(value: string): void {
    phoneDigits.value = stripDigits(value)
    phoneDisplay.value = formatPhoneNumber(value, countryIso2.value)
  }

  function setCountry(iso2: string): void {
    countryIso2.value = iso2
    phoneDisplay.value = ''
    phoneDigits.value = ''
  }

  function redirect(): void {
    const country = selectedCountry.value
    if (!isValid.value || !country) return
    window.location.href = buildWhatsAppUrl(country.dialCode, phoneDigits.value)
  }

  return {
    countryIso2,
    sortedCountries,
    selectedCountry,
    phoneDisplay,
    phoneDigits,
    isValid,
    updatePhone,
    setCountry,
    redirect,
  }
}
