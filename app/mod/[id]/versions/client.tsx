'use client'

import Footer from "@/components/Footer"
import ModSidebarInfo from "@/components/mods/ModSidebarInfo"
import ModsNavbar from "@/components/mods/ModsNavbar"
import Navbar from "@/components/Navbar"
import { formatNumber } from "@/lib/utils"
import { Mod } from "@/types/mod"
import moment from "moment"

type ModVersionsClient = {
    data: Mod,
    versions: {
        name: string,
        version: string,
        download_count: number,
        download_url: string,
        created_at: string
    }[]
}

export default function ModVersionsClient({ data, versions }: ModVersionsClient) {
    return (
        <main>
            <Navbar />
            <section className="container mx-auto p-0 flex gap-4 min-h-[90vh]">
                <ModSidebarInfo data={data} />
                <div className="w-full">
                    <ModsNavbar />
                    <div className="bg-(--scheme-color-secondary) p-6 rounded-xl">
                        <table className="w-full">
                            <thead className="border-b-2 border-(--scheme-color-disabled)">
                                <tr>
                                    <th className="pb-2 text-start">Name</th>
                                    <th className="text-start">Game version</th>
                                    <th className="text-start">Published</th>
                                    <th className="text-start">Downloads</th>
                                </tr>
                            </thead>
                            <tbody>
                                {versions.map((item) => (
                                    <tr key={item.version} className="border-b-2 border-(--scheme-color-disabled)">
                                        <td className="py-6">{item.name} <br /> <span className="text-(--scheme-color-disabled)">{item.version}</span></td>
                                        <td>{}</td>
                                        <td>{moment(item.created_at).fromNow()}</td>
                                        <td>{formatNumber(item.download_count)}</td>
                                        <td><a href={item.download_url}><i className="fa-solid fa-download text-xl text-(--scheme-color-001)"></i></a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>  
            </section>
            <Footer />
        </main>
    )
}