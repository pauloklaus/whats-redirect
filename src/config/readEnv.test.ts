import { afterEach, describe, expect, it, vi } from 'vitest'

describe('readEnv', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  it('ensures whatsapp url prefix ends with a slash', async () => {
    vi.stubEnv('VITE_WHATSAPP_URL_PREFIX', 'https://wa.me')
    const { readEnv } = await import('./readEnv')

    expect(readEnv().whatsappUrlPrefix).toBe('https://wa.me/')
  })
})
