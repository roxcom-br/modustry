'use client'

import Footer from "@/components/Footer"
import Markdown from "@/components/Markdown"
import ModSidebarInfo from "@/components/mods/ModSidebarInfo"
import ModsNavbar from "@/components/mods/ModsNavbar"
import Navbar from "@/components/Navbar"
import { Mod } from "@/types/mod"

type ModChangelogClient = {
    data: Mod,
    changelog: {
        name: string,
        version: string,
        body: string
    }[]
}

export default function ModChangelogClient({ data, changelog }: ModChangelogClient) {
    return (
        <main>
            <Navbar />
            <section className="container mx-auto flex flex-col gap-4 min-h-[90vh] md:flex-row px-4 md:p-0">
                <ModSidebarInfo data={data} />
                <div className="w-full">
                    <ModsNavbar />
                    <div className="flex flex-col gap-2">
                        {changelog.map((value) => (
                            <div key={value.version} className="bg-(--scheme-color-secondary) p-6 rounded-xl">
                                <h2 className="text-3xl font-semibold mb-4">{value.name}</h2>
                                <Markdown key={value.name} content={value.body} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}