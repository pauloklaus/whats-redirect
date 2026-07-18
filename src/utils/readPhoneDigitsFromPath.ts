export function readPhoneDigitsFromPath(pathname: string): string {
  const match = pathname.match(/^\/(\d{6,15})\/?$/)
  return match?.[1] ?? ''
}
