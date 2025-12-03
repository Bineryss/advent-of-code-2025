import { describe, it, expect, afterEach } from 'vitest';
import { isValid, getAllInvalidIds, processInput } from './index'


describe('invalid sequences tests', () => {
    it.each([
        ['55', false],
        ['6464', false],
        ['123123', false],
        ['0101', false],
        ['101', true],
        ['123456', true],
        ['123', true]
    ])('check validity for %s', (id, expected) => {
        const result = isValid(id)

        expect(result).toBe(expected)
    })

    it.each([
        ['54', '56', [55]],
        ['11', '22', [11, 22]],
        ['0', '9', [0]]
    ])('check range for %s', (start, end, expected) => {
        const result = getAllInvalidIds(start, end)

        expect(result).toStrictEqual(expected)
    })
    it('should process correctly', () => {
        const input = '10-20,56-1002'

        const result = processInput(input)

        expect(result).toStrictEqual([
            { start: '10', end: '20' },
            { start: '56', end: '1002' },
        ])
    })
});