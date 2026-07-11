import { describe, expect, it } from 'vitest'
import { stripDigits } from './stripDigits'

describe('stripDigits', () => {
  it('removes non-digit characters', () => {
    expect(stripDigits('(11) 99999-8888')).toBe('11999998888')
    expect(stripDigits('+55 11 98888-7777')).toBe('5511988887777')
    expect(stripDigits('abc123')).toBe('123')
  })

  it('returns empty string for input without digits', () => {
    expect(stripDigits('')).toBe('')
    expect(stripDigits('abc')).toBe('')
  })
})
