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
  readPhoneDigitsFromPath,
  parseInternationalPhoneDigits,
} from '@/utils'

function readInitialPhoneFromPath(preferredIso2: string): {
  iso2: string
  localDigits: string
} | null {
  const digits = readPhoneDigitsFromPath(window.location.pathname)
  if (!digits) return null
  return parseInternationalPhoneDigits(digits, preferredIso2)
}

export function usePhoneInput() {
  const defaultIso2 = detectDefaultCountry()
  const initial = readInitialPhoneFromPath(defaultIso2)

  const countryIso2 = ref(initial?.iso2 ?? defaultIso2)
  const phoneDigits = ref(initial?.localDigits ?? '')
  const phoneDisplay = ref(
    initial ? formatPhoneNumber(initial.localDigits, initial.iso2) : '',
  )

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
