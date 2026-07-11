import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ptBR from './locales/pt-BR.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import de from './locales/de.json'
import it from './locales/it.json'
import et from './locales/et.json'
import ru from './locales/ru.json'
import zhCN from './locales/zh-CN.json'
import { DEFAULT_LOCALE } from '@/constants'
import { detectLocale } from './detectLocale'

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
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
