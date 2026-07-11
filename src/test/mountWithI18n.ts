import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import type { Component } from 'vue'
import en from '@/i18n/locales/en.json'
import ptBR from '@/i18n/locales/pt-BR.json'
import es from '@/i18n/locales/es.json'
import fr from '@/i18n/locales/fr.json'
import de from '@/i18n/locales/de.json'
import it from '@/i18n/locales/it.json'
import et from '@/i18n/locales/et.json'
import ru from '@/i18n/locales/ru.json'
import zhCN from '@/i18n/locales/zh-CN.json'
import { DEFAULT_LOCALE } from '@/constants'

export function mountWithI18n(
  component: Component,
  options: MountingOptions<Record<string, unknown>> = {},
): VueWrapper {
  const i18n = createI18n({
    legacy: false,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    messages: {
      en,
      'pt-BR': ptBR,
      es,
      fr,
      de,
      it,
      et,
      ru,
      'zh-CN': zhCN,
    },
  })

  return mount(component, {
    ...options,
    global: {
      ...options.global,
      plugins: [i18n, ...(options.global?.plugins ?? [])],
    },
  })
}
