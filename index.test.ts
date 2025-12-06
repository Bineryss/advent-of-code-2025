import { describe, it, expect, afterEach } from 'vitest';
import { findMax } from './index'

describe('03', () => {
    it.each([
        ['1111111', 11],
        ['51', 51],
        ['9000001', 91],
        ['5000009', 59],
        ['987654321111111', 98],
        ['811111111111119', 89],
        ['234234234234278', 78],
        ['818181911112111', 92],
        ['1252442221213212222222222222211212142351224112221222212213421221422124234123226223512212112521243121', 65],
    ])('should return largest possible number for %s', (input, expected) => {
        const result = findMax(input)

        expect(result).toBe(expected)
    })
    it.each([
        ['1111111', 3, 111],
        ['51', 2, 51],
        ['9111181', 3, 981],
        ['12345', 5, 12345],
        ['12345', 3, 345],
    ])('should return largest possible number for %s', (input, count, expected) => {
        const result = findMax(input, count)

        expect(result).toBe(expected)
    })
})