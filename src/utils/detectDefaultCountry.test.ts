import { afterEach, describe, expect, it, vi } from 'vitest'
import { detectDefaultCountry } from './detectDefaultCountry'

function mockNavigatorLanguages(languages: string[]): void {
  vi.stubGlobal('navigator', {
    languages,
    language: languages[0],
  })
}

describe('detectDefaultCountry', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('maps portuguese locale to BR', () => {
    mockNavigatorLanguages(['pt-BR'])
    expect(detectDefaultCountry()).toBe('BR')
  })

  it('maps english locale to US', () => {
    mockNavigatorLanguages(['en-US'])
    expect(detectDefaultCountry()).toBe('US')
  })

  it('maps spanish locale to ES', () => {
    mockNavigatorLanguages(['es-ES'])
    expect(detectDefaultCountry()).toBe('ES')
  })

  it('maps french locale to FR', () => {
    mockNavigatorLanguages(['fr-FR'])
    expect(detectDefaultCountry()).toBe('FR')
  })

  it('maps chinese locale to CN', () => {
    mockNavigatorLanguages(['zh-CN'])
    expect(detectDefaultCountry()).toBe('CN')
  })

  it('falls back to BR for other locales', () => {
    mockNavigatorLanguages(['ja-JP'])
    expect(detectDefaultCountry()).toBe('BR')
  })
})
