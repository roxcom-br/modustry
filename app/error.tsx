'use client'

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function Error({
    error
}: {
    error: Error
}) {
    return (
        <main>
            <Navbar />
            <section className="min-h-[90vh] flex flex-col justify-center items-center text-center">
                <div className="flex flex-col">
                    <span className="text-3xl font-bold">Internal Server Error</span>
                    <span className="text-sm">Something went wrong. Please try again later.</span>
                </div>
            </section>
            <Footer />
        </main>
    )
}