'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Pagination from "@/components/Pagination"
import SearchBar from "@/components/SearchBar"
import ServerSidebarFilters from "@/components/servers/ServerSidebarFilters"
import ServersListElement from "@/components/servers/ServersListElement"
import { Server } from "@/types/server"
import { useRouter, useSearchParams } from "next/navigation"

type ServersClient = {
    data: Server[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number,
    },
    query: string,
    version: string
}

export default function ServersClient({ data, pagination, query, version }: ServersClient) {
    const router = useRouter()
    const searchParams = useSearchParams()

    function handlePageChange(page: number) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(page))
        router.push(`/servers?${params.toString()}`)
    }

    function handleQueryChange(query: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('q', String(query))
        router.push(`/servers?${params.toString()}`)
    }

    function handleVersionChange(version: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('version', String(version))
        router.push(`/servers?${params.toString()}`)
    }

    return (
        <main>
            <Navbar />
            <section className="container mx-auto px-4 md:p-0">
                <div className="flex flex-col md:flex-row gap-4">
                    <ServerSidebarFilters version={version} setVersion={handleVersionChange} />
                    <div className="w-full">
                        <SearchBar query={query} onQueryChange={handleQueryChange} />
                        {data.map((server: Server) => (
                            <ServersListElement data={server} key={`${server.name}-${server.version}-${server.address.length}`} />
                        ))}
                        <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}