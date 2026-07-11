import { describe, expect, it } from 'vitest'
import { readLoadedAppVersion } from './readLoadedAppVersion'

describe('readLoadedAppVersion', () => {
  it('reads version from meta tag', () => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'app-version')
    meta.setAttribute('content', '1.2.3')
    document.head.appendChild(meta)

    expect(readLoadedAppVersion()).toBe('1.2.3')

    meta.remove()
  })

  it('returns undefined when meta tag is missing', () => {
    expect(readLoadedAppVersion()).toBeUndefined()
  })
})
