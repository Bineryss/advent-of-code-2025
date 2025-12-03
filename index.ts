import fs, { access } from "fs";

export function isValid(id: string): boolean {
    if (id.startsWith('0')) return false //kinda makes no sense, considering the rest of the assignemnt, but oh well
    if (id.length % 2 !== 0) return true

    const middle = id.length / 2
    const sequence = id.substring(0, middle)
    return sequence !== id.substring(middle)
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