import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { APP_NAME, SITE_URL } from '@/config'

function setMeta(attr: string, key: string, content: string): void {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

export function useDocumentMeta(): void {
  const { t, locale } = useI18n()

  function update(): void {
    const title = APP_NAME
    const description = t('meta.description')
    const ogImage = `${SITE_URL}${t('meta.ogImage')}`

    document.title = title
    document.documentElement.lang = locale.value

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${SITE_URL}/`)
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:locale', t('meta.ogLocale'))
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)
  }

  onMounted(update)
  watch(locale, update)
}
