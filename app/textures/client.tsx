'use client'

import FiltersBar from "@/components/FiltersBar"
import Footer from "@/components/Footer"
import ModsListElement from "@/components/mods/ModsListElement"
import Navbar from "@/components/Navbar"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/SearchBar"
import TexturesSidebarFilters from "@/components/textures/TexturesSidebarFilters"
import { Mod } from "@/types/mod"
import { Version } from "@/types/version"
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
    sort: string,
    version: string,
    versions: Version[]
}

export default function TexturesClient({ data, pagination, query, sort, version, versions }: TexturesClient) {
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

    function handleVersionChange(version: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('version', String(version))
        router.push(`/textures?${params.toString()}`)
    }

    return (
        <main>
            <Navbar />
            <section className="container mx-auto px-4 md:p-0">
                <div className="flex flex-col md:flex-row gap-4">
                    <TexturesSidebarFilters version={version} setVersion={handleVersionChange} versions={versions} />
                    <div className="w-full">
                        <SearchBar query={query} onQueryChange={handleQueryChange} />
                        <FiltersBar sort={sort} onSortChange={handleSortChange} limit={pagination.limit} onLimitChange={handleLimitChange} />
                        {data.map((mod: Mod) => (
                            <ModsListElement data={mod} key={mod.repo} />
                        ))}
                        <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}