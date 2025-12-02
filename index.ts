import fs from "fs";

const max: number = 99;

const actionMap: Record<'L' | 'R', number> = {
    'L': -1,
    'R': 1,
};

export function executeMovement(pointer: number, movement: number, direction: 'L' | 'R'): number {
    const boundary = max + 1;
    const actualChange = movement % boundary;
    const changeWithDirection = actualChange * actionMap[direction];

    return (Math.abs(pointer + boundary + changeWithDirection)) % boundary;
}

export function processInstructions(instructions: string[], start: number = 50): number {
    let zeroCounter = 0;
    let pointer = start;

    for (const instruction of instructions) {

        const direction = instruction.charAt(0);
        if (direction !== 'L' && direction !== 'R') {
            return -1;
        }
        const movement = parseInt(instruction.slice(1), 10);
        console.log(`moving ${direction} for ${movement} from ${pointer}`);

        pointer = executeMovement(pointer, movement, direction);
        if (pointer === 0) {
            zeroCounter++;
        }
    }
    return zeroCounter;
}


function main() {
    const data = fs.readFileSync('input.txt', 'utf-8');
    const zeroCounter = processInstructions(data.trim().split('\n'));
    console.log(`Number of times pointer reached zero: ${zeroCounter}`);
}

main();