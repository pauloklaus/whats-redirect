<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  usePhoneInput,
  usePhonePathRedirect,
  usePwaInstall,
  useShareChat,
} from '@/composables'
import { APP_NAME } from '@/config'
import { buildShareUrl, countryFlag, getCountryName } from '@/utils'
import AppFooter from './AppFooter.vue'
import ActionIcon from './ActionIcon.vue'
import installIcon from '../assets/icons/install.svg'
import chatIcon from '../assets/icons/chat.svg'
import shareIcon from '../assets/icons/share.svg'

const { t, locale } = useI18n()
const {
  countryIso2,
  sortedCountries,
  selectedCountry,
  phoneDisplay,
  phoneDigits,
  isValid,
  updatePhone,
  setCountry,
  redirect,
} = usePhoneInput()
const { canInstall, install } = usePwaInstall()
const { canShare, share } = useShareChat()
usePhonePathRedirect()

const countryKeyBuffer = ref('')
let countryKeyTimeout: ReturnType<typeof setTimeout> | undefined

function onPhoneInput(event: Event): void {
  const input = event.target as HTMLInputElement
  updatePhone(input.value)
}

function onCountryChange(event: Event): void {
  const select = event.target as HTMLSelectElement
  setCountry(select.value)
}

function onCountryKeydown(event: KeyboardEvent): void {
  if (event.ctrlKey || event.metaKey || event.altKey) return
  if (event.key.length !== 1 || !/^[a-z]$/i.test(event.key)) return

  event.preventDefault()

  countryKeyBuffer.value += event.key.toUpperCase()
  clearTimeout(countryKeyTimeout)
  countryKeyTimeout = setTimeout(() => {
    countryKeyBuffer.value = ''
  }, 800)

  const match = sortedCountries.value.find((country) =>
    country.iso2.startsWith(countryKeyBuffer.value),
  )

  if (match) {
    setCountry(match.iso2)
  }
}

function onStartChat(): void {
  if (isValid.value) {
    redirect()
  }
}

async function onShare(): Promise<void> {
  const country = selectedCountry.value
  if (!isValid.value || !country) return

  await share(
    t('home.shareText', { phone: phoneDisplay.value }),
    buildShareUrl(country.dialCode, phoneDigits.value),
  )
}
</script>

<template>
  <div class="redirect-panel">
    <button
      v-if="canInstall"
      class="redirect-panel__install redirect-panel__action-btn"
      type="button"
      :aria-label="t('install.ariaLabel')"
      @click="install"
    >
      <ActionIcon :src="installIcon" />
      <span>{{ t('install.button') }}</span>
    </button>

    <main class="redirect-panel__content">
      <img
        class="redirect-panel__logo"
        src="/icons/apple-touch-icon.png"
        width="72"
        height="72"
        :alt="APP_NAME"
      />
      <h1 class="redirect-panel__title">{{ t('home.title') }}</h1>
      <p class="redirect-panel__description">{{ t('home.description') }}</p>

      <label class="redirect-panel__field">
        <span class="redirect-panel__label">{{ t('home.phoneLabel') }}</span>
        <div class="redirect-panel__phone-group">
          <select
            class="redirect-panel__country-select"
            :value="countryIso2"
            :aria-label="t('aria.countrySelect')"
            @change="onCountryChange"
            @keydown="onCountryKeydown"
          >
            <option
              v-for="country in sortedCountries"
              :key="country.iso2"
              :value="country.iso2"
              :title="getCountryName(country.iso2, locale)"
            >
              {{ countryFlag(country.iso2) }} +{{ country.dialCode }}
              {{ country.iso2 }}
            </option>
          </select>
          <input
            :value="phoneDisplay"
            type="tel"
            class="redirect-panel__phone-input"
            :placeholder="t('home.phonePlaceholder')"
            maxlength="15"
            autofocus
            :aria-label="t('aria.phoneNumber')"
            @input="onPhoneInput"
            @keyup.enter="onStartChat"
          />
        </div>
      </label>

      <button
        class="redirect-panel__start redirect-panel__action-btn"
        type="button"
        :disabled="!isValid"
        @click="onStartChat"
      >
        <ActionIcon :src="chatIcon" />
        <span>{{ t('home.startChat') }}</span>
      </button>

      <button
        v-if="canShare"
        class="redirect-panel__share redirect-panel__action-btn"
        type="button"
        :disabled="!isValid"
        :aria-label="t('home.shareAriaLabel')"
        @click="onShare"
      >
        <ActionIcon :src="shareIcon" />
        <span>{{ t('home.share') }}</span>
      </button>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.redirect-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 100%;
  min-height: 100dvh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 3.5rem 1.5rem 3.5rem;
  background: #f5f5f5;
  color: #1a1a1a;
}

.redirect-panel__install {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 100;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: #25d366;
  border-radius: 0.375rem;
  transition: background 0.15s;
}

.redirect-panel__action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.redirect-panel__action-btn :deep(.action-icon) {
  filter: brightness(0) invert(1);
}

.redirect-panel__install:hover {
  background: #1ebe57;
}

.redirect-panel__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 28rem;
  text-align: center;
}

.redirect-panel__logo {
  display: block;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 1rem;
}

.redirect-panel__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
}

.redirect-panel__description {
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
}

.redirect-panel__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.redirect-panel__label {
  font-size: 0.875rem;
  color: #757575;
  text-align: left;
}

.redirect-panel__phone-group {
  display: flex;
  align-items: stretch;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #ffffff;
  transition: border-color 0.15s;
  box-shadow: 0 1px 2px rgb(0 0 0 / 6%);
}

.redirect-panel__phone-group:focus-within {
  border-color: #25d366;
}

.redirect-panel__country-select {
  flex: 0 1 auto;
  max-width: 38%;
  min-width: 6.75rem;
  padding: 0.875rem 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #128c7e;
  background: #e8f5e9;
  border: none;
  border-right: 1px solid #e0e0e0;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23128c7e' d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  padding-right: 1.75rem;
}

.redirect-panel__phone-input {
  flex: 1;
  min-width: 0;
  padding: 0.875rem 1rem;
  font-size: 1.25rem;
  color: #1a1a1a;
  background: transparent;
  border: none;
  outline: none;
}

.redirect-panel__phone-input::placeholder {
  color: #9e9e9e;
}

.redirect-panel__start {
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: #25d366;
  border-radius: 0.5rem;
  transition: background 0.15s;
}

.redirect-panel__start:hover:not(:disabled) {
  background: #1ebe57;
}

.redirect-panel__start:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.redirect-panel__share {
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #128c7e;
  background: #ffffff;
  border: 2px solid #25d366;
  border-radius: 0.5rem;
  transition:
    background 0.15s,
    color 0.15s;
}

.redirect-panel__share :deep(.action-icon) {
  filter: none;
}

.redirect-panel__share:hover:not(:disabled) {
  background: #e8f5e9;
}

.redirect-panel__share:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
