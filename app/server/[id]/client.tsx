'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import ServerSidebarInfo from "@/components/servers/ServerSidebarInfo"
import { Server } from "@/types/server"

type ServerClient = {
    data: Server
}

export default function ServerClient({ data }: ServerClient) {
    return (
        <main>
            <Navbar />
            <section className="container mx-auto p-0">
                <ServerSidebarInfo data={data} />
            </section>
            <Footer />
        </main>
    )
}