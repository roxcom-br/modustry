import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <Navbar />
            <section className="min-h-[90vh] flex flex-col justify-center items-center text-center">
                <h1 className="text-6xl md:text-8xl font-bold mb-4">The place for Mindustry <br /> <span className="text-(--scheme-color-001)">Mods</span></h1>
                <h2 className='text-2xl md:text-4xl mb-8'> Discover, play, and share Mindustry content through our <br />
                open-source platform built for the community. </h2>
                <Link className='bg-(--scheme-color-001)/75 border-2 border-(--scheme-color-001) px-6 py-3 rounded-xl transition hover:scale-105' href='/mods/'>Discover Mods</Link>
            </section>
            <Footer />
        </main>
    )
}