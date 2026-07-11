/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_GITHUB_REPO_URL: string
  readonly VITE_SITE_URL: string
  readonly VITE_WHATSAPP_URL_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Navigator {
  standalone?: boolean
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}
