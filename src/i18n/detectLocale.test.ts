import { afterEach, describe, expect, it, vi } from 'vitest'
import { detectLocale } from './detectLocale'

function mockNavigatorLanguages(languages: string[]): void {
  vi.stubGlobal('navigator', {
    languages,
    language: languages[0],
  })
}

describe('detectLocale', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('maps portuguese candidates to pt-BR', () => {
    mockNavigatorLanguages(['pt-BR', 'en'])
    expect(detectLocale()).toBe('pt-BR')

    mockNavigatorLanguages(['pt-PT'])
    expect(detectLocale()).toBe('pt-BR')
  })

  it('maps spanish candidates to es', () => {
    mockNavigatorLanguages(['es-ES'])
    expect(detectLocale()).toBe('es')
  })

  it('maps english candidates to en', () => {
    mockNavigatorLanguages(['en-US'])
    expect(detectLocale()).toBe('en')
  })

  it('maps french candidates to fr', () => {
    mockNavigatorLanguages(['fr-FR'])
    expect(detectLocale()).toBe('fr')
  })

  it('maps german candidates to de', () => {
    mockNavigatorLanguages(['de-DE'])
    expect(detectLocale()).toBe('de')
  })

  it('maps chinese candidates to zh-CN', () => {
    mockNavigatorLanguages(['zh-CN'])
    expect(detectLocale()).toBe('zh-CN')

    mockNavigatorLanguages(['zh-TW'])
    expect(detectLocale()).toBe('zh-CN')
  })

  it('falls back to english when no candidate matches', () => {
    mockNavigatorLanguages(['ja-JP'])
    expect(detectLocale()).toBe('en')
  })

  it('uses navigator.language when languages is empty', () => {
    vi.stubGlobal('navigator', {
      languages: [],
      language: 'es-MX',
    })

    expect(detectLocale()).toBe('es')
  })
})
