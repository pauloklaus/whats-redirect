import { APP_VERSION_META_NAME } from '@/constants'

export function readLoadedAppVersion(): string | undefined {
  return (
    document
      .querySelector(`meta[name="${APP_VERSION_META_NAME}"]`)
      ?.getAttribute('content') ?? undefined
  )
}
