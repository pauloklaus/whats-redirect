interface AppEnv {
  appName: string
  githubRepoUrl: string
  siteUrl: string
  whatsappUrlPrefix: string
}

let cached: AppEnv | undefined

export function readEnv(): AppEnv {
  if (!cached) {
    cached = {
      appName: import.meta.env.VITE_APP_NAME || 'WhatsRedirect',
      githubRepoUrl: import.meta.env.VITE_GITHUB_REPO_URL || '',
      siteUrl: (
        import.meta.env.VITE_SITE_URL || 'https://whats.pauloklaus.com.br'
      ).replace(/\/$/, ''),
      whatsappUrlPrefix:
        import.meta.env.VITE_WHATSAPP_URL_PREFIX ||
        'https://wa.me/55',
    }
  }

  return cached
}
