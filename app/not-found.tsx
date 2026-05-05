import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
    return (
        <main>
            <Navbar />
            <section className="min-h-[90vh] flex flex-col justify-center items-center text-center">
                <div className="flex flex-col">
                    <span className="text-3xl font-bold">Resource Not Found</span>
                    <span className="text-sm">The requested resource cannot be found</span>
                </div>
            </section>
            <Footer />
        </main>
    )
}