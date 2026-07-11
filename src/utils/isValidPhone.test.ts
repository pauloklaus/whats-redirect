import { describe, expect, it } from 'vitest'
import { isValidPhone } from './isValidPhone'

describe('isValidPhone', () => {
  it('validates brazilian numbers', () => {
    expect(isValidPhone('11999998888', 'BR')).toBe(true)
    expect(isValidPhone('119999888', 'BR')).toBe(false)
  })

  it('validates international numbers with generic rules', () => {
    expect(isValidPhone('5551234567', 'US')).toBe(true)
    expect(isValidPhone('12345', 'US')).toBe(false)
    expect(isValidPhone('123456789012345', 'US')).toBe(false)
  })
})
