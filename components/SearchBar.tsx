'use client'

import { useEffect, useState } from "react"

type SearchBar = {
    query: string,
    onQueryChange: (query: string) => void
}

export default function SearchBar({ query, onQueryChange }: SearchBar) {
    const [input, setInput] = useState(query ?? '')

    useEffect(() => {
        setInput(query)
    }, [query])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (input !== query) {
                onQueryChange(input)
            }
        }, 300)

        return () => clearTimeout(timeout)
    }, [input, query, onQueryChange])

    return (
        <div className="flex mb-4">
            <input 
                className="w-full p-2 rounded-xl border-2 border-(--scheme-color-disabled) bg-(--scheme-color-secondary)"
                type="text"
                placeholder="Search..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    )
}