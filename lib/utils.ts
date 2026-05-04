export function parsePositiveInt(value: string | null, fallback: number) {
    const n = Number(value)

    if (!Number.isInteger(n) || n < 1) return fallback
    return n
}

export function formatNumber(num: number) {
    return new Intl.NumberFormat('en-US', {
        notation: "compact",
        compactDisplay: "short"
    }).format(num).toLowerCase()
}