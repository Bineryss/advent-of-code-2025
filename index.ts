import fs from "fs";

export function isSequence(sequence: string, input: string): boolean {
    if (input.length % sequence.length !== 0) return false
    if (input.length === sequence.length) return false

    for (let i = 0; i < input.length; i += sequence.length) {
        if (sequence !== input.slice(i, i + sequence.length)) return false
    }
    return true
}

export function isValid(id: string): boolean {
    if (id.startsWith('0')) return false //kinda makes no sense, considering the rest of the assignemnt, but oh well

    let sequence = ''
    for (let index = 0; index < id.length; index++) {
        sequence += id.charAt(index)
        if (isSequence(sequence, id)) {
            return false;
        }
    }

    return true;
}

export function getAllInvalidIds(start: string, end: string): number[] {
    const startNumber = Number.parseInt(start)
    const endNumber = Number.parseInt(end)

    const results: number[] = []

    for (let i = startNumber; i <= endNumber; i++) {
        if (!isValid(i + '')) {
            results.push(i)
        }
    }

    return results;
}

export function processInput(input: string): { start: string, end: string }[] {
    const sections = input.split(',')
    const result = []

    for (const section of sections) {
        const numbers = section.split('-');
        result.push({
            start: numbers[0],
            end: numbers[1],
        })
    }

    return result
}

function main() {
    const data = fs.readFileSync('input.txt', 'utf-8')
    const processdInput = processInput(data)
    const invalidIds = processdInput.flatMap(({ start, end }) => getAllInvalidIds(start, end))
    const sum = invalidIds.reduce((acu, current) => acu + current)
    console.log('The sum of all invalid ids is: ', sum)
}

main();