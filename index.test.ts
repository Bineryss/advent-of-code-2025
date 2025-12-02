import { describe, expect, it } from 'vitest';
import { executeMovement, processInstructions } from './index';

describe('dial test', () => {
    it.each([
        { start: 50, movement: 10, direction: 'L', expected: 40 },
        { start: 50, movement: 60, direction: 'R', expected: 10 },
        { start: 11, movement: 8, direction: 'R', expected: 19 },
        { start: 19, movement: 19, direction: 'L', expected: 0 },
        { start: 0, movement: 1, direction: 'L', expected: 99 },
        { start: 99, movement: 1, direction: 'R', expected: 0 },
        { start: 5, movement: 10, direction: 'L', expected: 95 },
        { start: 0, movement: 180, direction: 'L', expected: 20 },
        { start: 0, movement: 180, direction: 'R', expected: 80 },
    ])('should execute movements correctly', ({ start, movement, direction, expected }) => {
        const result = executeMovement(start, movement, direction as 'L' | 'R');

        expect(result).toBe(expected);
    });

    it('process instructions correctly counts zero occurrences', () => {
        const instructions = [
            "L68",
            "L30",
            "R48",
            "L5",
            "R60",
            "L55",
            "L1",
            "L99",
            "R14",
            "L82"
        ];
        const result = processInstructions(instructions);

        expect(result).toBe(3);
    });
})
