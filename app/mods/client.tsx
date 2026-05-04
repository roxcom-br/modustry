'use client'

import FiltersBar from "@/components/FiltersBar";
import ModsListElement from "@/components/mods/ModsListElement";
import ModsSidebarFilters from "@/components/mods/ModsSidebarFilters";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { Mod } from "@/types/mod";
import { Version } from "@/types/version";
import { useRouter, useSearchParams } from "next/navigation";

type ModsClient = {
    data: Mod[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    },
    query: string,
    sort: string,
    loader: string,
    version: string,
    versions: Version[]
}

export default function ModsClient({ data, pagination, query, sort, loader, version, versions }: ModsClient) {
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

    function handleLimitChange(limit: number) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('limit', String(limit))
        router.push(`/mods?${params.toString()}`)
    }

    function handleSortChange(sort: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', sort)
        router.push(`/mods?${params.toString()}`)
    }

    function handleLoaderChange(loader: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('loader', loader)
        router.push(`/mods?${params.toString()}`)
    }

    function handleVersionChange(version: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('version', version)
        router.push(`/mods?${params.toString()}`)
    }

    return (
        <main>
            <Navbar />
            <section className="container mx-auto p-0">
                <div className="flex gap-4">
                    <ModsSidebarFilters loader={loader} setLoader={handleLoaderChange} version={version} setVersion={handleVersionChange} versions={versions} />
                    <div>
                        <SearchBar query={query} onQueryChange={handleQueryChange} />
                        <FiltersBar sort={sort} onSortChange={handleSortChange} limit={pagination.limit} onLimitChange={handleLimitChange} />
                        {data.map((mod: Mod) => (
                            <ModsListElement data={mod} key={mod.repo} />
                        ))}
                    </div>
                </div>
                <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
            </section>
        </main>
    )
}