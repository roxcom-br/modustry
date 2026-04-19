export function parsePositiveInt(value: string | null, fallback: number) {
    const n = Number(value)

    if (!Number.isInteger(n) || n < 1) return fallback
    return n
}