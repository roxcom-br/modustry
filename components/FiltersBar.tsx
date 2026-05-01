'use client'

type FiltersBar = {
    limit: number,
    onLimitChange: (limit: number) => void
}

export default function FiltersBar({ limit, onLimitChange }: FiltersBar) {
    return (
        <div className="flex mb-4">
            <select 
                name="" 
                id="" 
                className="p-2 rounded-xl border-(--scheme-color-disabled) bg-(--scheme-color-secondary)"
                onChange={(e) => onLimitChange(Number(e.target.value))}
                value={limit}
            >
                {[5, 10, 15, 20, 50, 100].map((value) => (
                    <option key={value} value={value}>View: {value}</option>
                ))}
            </select>
        </div>
    )
}