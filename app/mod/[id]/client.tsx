'use client'

import Footer from "@/components/Footer"
import Markdown from "@/components/Markdown"
import ModSidebarInfo from "@/components/mods/ModSidebarInfo"
import ModsNavbar from "@/components/mods/ModsNavbar"
import Navbar from "@/components/Navbar"
import { Mod } from "@/types/mod"

type ModClient = {
    data: Mod,
    body: string
}

export default function ModClient({ data, body }: ModClient) {
    return (
        <main>
            <Navbar />
            <section className="container mx-auto p-0 flex gap-4">
                <ModSidebarInfo data={data} />
                <div className="w-full">
                    <ModsNavbar />
                    <div className="bg-(--scheme-color-secondary) p-6 rounded-xl">
                        <Markdown content={body} />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}