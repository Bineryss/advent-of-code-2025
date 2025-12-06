import fs from "fs";

export function findMax(bank: string, batterieCount: number = 2): number {
    if (bank.length < batterieCount) return -1
    const largest: number[] = [Number.parseInt(bank[0] ?? '-1'), ...Array(batterieCount - 1).fill(-1)]

    for (let i = 1; i < bank.length; i++) {
        const current = Number.parseInt(bank[i])

        let isBigger = false
        const pointer = Math.max(0, i + batterieCount - bank.length)
        for (let k = pointer; k < largest.length; k++) {
            if (isBigger) {
                largest[k] = -1
            } else if (largest[k] < current) {
                largest[k] = current
                isBigger = true
            }
        }
    }
    const lastNumber = Number.parseInt(bank.at(-1) ?? '0')
    if (lastNumber > (largest.at(-1) ?? 0)) {
        largest[largest.length - 1] = lastNumber
    }
    const accumulatedJolts = largest.filter(el => el !== -1).reduce((acc, element) => acc + element, '')
    return Number.parseInt(accumulatedJolts)
}

function main() {
    const batterieCount = 12
    const data = fs.readFileSync('input.txt', 'utf-8')
    const processdInput = data.split('\n')
    const maxPerLine = processdInput.map((bank) => findMax(bank, batterieCount))
    const sum = maxPerLine.reduce((acu, current) => acu + current)
    console.log('The sum of all jolts is: ', sum)
}

main();