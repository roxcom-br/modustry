'use client'

type FiltersBar = {
    sort: string,
    onSortChange: (sort: string) => void,
    limit: number,
    onLimitChange: (limit: number) => void
}

export default function FiltersBar({ sort, onSortChange, limit, onLimitChange }: FiltersBar) {
    return (
        <div className="flex gap-2 mb-4">
            <select 
                name="" 
                id="" 
                className="p-2 rounded-xl border-(--scheme-color-disabled) bg-(--scheme-color-secondary)"
                onChange={(e) => onSortChange(e.target.value)}
                value={sort}
            >
                {["Relevance", "Downloads", "Followers", "Date published", "Date updated"].map((value) => (
                    <option key={value} value={value.toLowerCase()}>Sort by: {value}</option>
                ))}
            </select>
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