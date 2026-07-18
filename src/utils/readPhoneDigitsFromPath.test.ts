import { describe, expect, it } from 'vitest'
import { readPhoneDigitsFromPath } from './readPhoneDigitsFromPath'

describe('readPhoneDigitsFromPath', () => {
  it('reads digits from a phone path', () => {
    expect(readPhoneDigitsFromPath('/5549999999999')).toBe('5549999999999')
    expect(readPhoneDigitsFromPath('/5549999999999/')).toBe('5549999999999')
  })

  it('returns empty string for non-phone paths', () => {
    expect(readPhoneDigitsFromPath('/')).toBe('')
    expect(readPhoneDigitsFromPath('/icons/app.png')).toBe('')
    expect(readPhoneDigitsFromPath('/abc123')).toBe('')
    expect(readPhoneDigitsFromPath('/12345')).toBe('')
  })
})
