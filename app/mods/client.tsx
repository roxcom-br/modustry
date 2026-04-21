'use client'

import ModsListElement from "@/components/mods/ModsListElement";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { Mod } from "@/types/mod";
import { useRouter, useSearchParams } from "next/navigation";

type ModsClient = {
    data: Mod[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    },
    query: string
}

export default function ModsClient({ data, pagination, query }: ModsClient) {
    const router = useRouter()
    const searchParams = useSearchParams()

    function handlePageChange(page: number) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(page))
        router.push(`/mods?${params.toString()}`)
    }

    function handleQueryChange(query: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('q', String(query))
        router.push(`/mods?${params.toString()}`)
    }

    return (
        <main>
            <Navbar />
            <section className="container mx-auto p-0">
                <SearchBar query={query} onQueryChange={handleQueryChange} />
                {data.map((mod: Mod) => (
                    <ModsListElement data={mod} key={mod.repo} />
                ))}
                <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
            </section>
        </main>
    )
}