interface AppEnv {
  appName: string
  siteUrl: string
  whatsappUrlPrefix: string
}

let cached: AppEnv | undefined

function normalizeWhatsAppUrlPrefix(prefix: string): string {
  const trimmed = prefix.trim()
  if (!trimmed) {
    return 'https://wa.me/'
  }

  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`
}

export function readEnv(): AppEnv {
  if (!cached) {
    cached = {
      appName: import.meta.env.VITE_APP_NAME || 'WhatsRedirect',
      siteUrl: (
        import.meta.env.VITE_SITE_URL || 'https://whats.pauloklaus.com.br'
      ).replace(/\/$/, ''),
      whatsappUrlPrefix: normalizeWhatsAppUrlPrefix(
        import.meta.env.VITE_WHATSAPP_URL_PREFIX || 'https://wa.me/',
      ),
    }
  }

  return cached
}
