'use client'

import FiltersBar from "@/components/FiltersBar"
import ModsListElement from "@/components/mods/ModsListElement"
import Navbar from "@/components/Navbar"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/SearchBar"
import { Mod } from "@/types/mod"
import { useRouter, useSearchParams } from "next/navigation"

type TexturesClient = {
    data: Mod[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    },
    query: string,
    sort: string
}

export default function TexturesClient({ data, pagination, query, sort }: TexturesClient) {
    const router = useRouter()
    const searchParams = useSearchParams()

    function handlePageChange(page: number) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(page))
        router.push(`/textures?${params.toString()}`)
    }

    function handleQueryChange(query: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('q', String(query))
        router.push(`/textures?${params.toString()}`)
    }

    function handleSortChange(sort: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', String(sort))
        router.push(`/textures?${params.toString()}`)
    }

    function handleLimitChange(limit: number) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('limit', String(limit))
        router.push(`/textures?${params.toString()}`)
    }

    return (
        <main>
            <Navbar />
            <section className="container mx-auto p-0">
                <SearchBar query={query} onQueryChange={handleQueryChange} />
                <FiltersBar sort={sort} onSortChange={handleSortChange} limit={pagination.limit} onLimitChange={handleLimitChange} />
                {data.map((mod: Mod) => (
                    <ModsListElement data={mod} key={mod.repo} />
                ))}
                <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
            </section>
        </main>
    )
}