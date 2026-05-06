'use client'

import Footer from "@/components/Footer"
import ModSidebarInfo from "@/components/mods/ModSidebarInfo"
import ModsNavbar from "@/components/mods/ModsNavbar"
import Navbar from "@/components/Navbar"
import Pagination from "@/components/Pagination"
import Markdown from "@/components/utils/Markdown"
import { Mod } from "@/types/mod"
import { ModChangelog } from "@/types/mod-changelog"
import { useParams, useRouter, useSearchParams } from "next/navigation"

type ModChangelogClient = {
    data: Mod,
    changelogs: ModChangelog[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    }
}

export default function ModChangelogClient({ data, changelogs, pagination }: ModChangelogClient) {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()

    function handlePageChange(page: number) {
        const usp = new URLSearchParams(searchParams.toString())
        usp.set('page', String(page))
        router.push(`/mod/${params['id']}/changelog?${usp.toString()}`)
    }

    return (
        <main>
            <Navbar />
            <section className="container mx-auto flex flex-col gap-4 min-h-[90vh] md:flex-row px-4 md:p-0">
                <ModSidebarInfo data={data} />
                <div className="w-full">
                    <ModsNavbar />
                    <div className="flex flex-col gap-2">
                        {changelogs.map((value) => (
                            <div key={value.version} className="bg-(--scheme-color-secondary) p-6 rounded-xl">
                                <h2 className="text-3xl font-semibold mb-4">{value.name}</h2>
                                <Markdown key={value.name} body={value.body} repo={data.repo} branch={data.branch} />
                            </div>
                        ))}
                        <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange}/>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}