'use client'

import Footer from "@/components/Footer"
import ModSidebarInfo from "@/components/mods/ModSidebarInfo"
import ModsNavbar from "@/components/mods/ModsNavbar"
import Navbar from "@/components/Navbar"
import Pagination from "@/components/Pagination"
import { formatNumber } from "@/lib/utils"
import { Mod } from "@/types/mod"
import { ModVersion } from "@/types/mod-version"
import moment from "moment"
import { useParams, useRouter, useSearchParams } from "next/navigation"

type ModVersionsClient = {
    data: Mod,
    versions: ModVersion[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    }
}

export default function ModVersionsClient({ data, versions, pagination }: ModVersionsClient) {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()

    function handlePageChange(page: number) {
        const usp = new URLSearchParams(searchParams.toString())
        usp.set('page', String(page))
        router.push(`/mod/${params['id']}/versions?${usp.toString()}`)
    }

    return (
        <main>
            <Navbar />
            <section className="container mx-auto flex flex-col gap-4 min-h-[90vh] md:flex-row px-4 md:p-0">
                <ModSidebarInfo data={data} />
                <div className="w-full">
                    <ModsNavbar />
                    <div className="bg-(--scheme-color-secondary) p-6 rounded-xl">
                        <table className="w-full">
                            <thead className="border-b-2 border-(--scheme-color-disabled)">
                                <tr>
                                    <th className="pb-2 text-start">Name</th>
                                    <th className="text-start hidden md:block">Game version</th>
                                    <th className="text-start">Published</th>
                                    <th className="text-start">Downloads</th>
                                </tr>
                            </thead>
                            <tbody>
                                {versions.map((item) => (
                                    <tr key={item.version} className="border-b-2 border-(--scheme-color-disabled)">
                                        <td className="py-6">{item.name} <br /> <span className="text-(--scheme-color-disabled)">{item.version}</span></td>
                                        <td className="hidden md:block">{ }</td>
                                        <td>{moment(item.created_at).fromNow()}</td>
                                        <td>{formatNumber(item.download_count)}</td>
                                        <td><a href={item.download_url}><i className="fa-solid fa-download text-xl text-(--scheme-color-001)"></i></a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}