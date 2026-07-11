import { describe, expect, it } from 'vitest'
import { isValidBrazilPhone } from './isValidBrazilPhone'

describe('isValidBrazilPhone', () => {
  it('accepts 10 and 11 digit numbers', () => {
    expect(isValidBrazilPhone('1199998888')).toBe(true)
    expect(isValidBrazilPhone('11999998888')).toBe(true)
  })

  it('rejects numbers outside the valid range', () => {
    expect(isValidBrazilPhone('119999888')).toBe(false)
    expect(isValidBrazilPhone('119999988889')).toBe(false)
    expect(isValidBrazilPhone('')).toBe(false)
  })
})
