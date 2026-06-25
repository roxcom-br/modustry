"use client"

import Footer from "@/components/Footer";
import ListElement from "@/components/mods/ModsListElement";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import UserProfileNavbar from "@/components/user/UserProfileNavbar";
import UserProfileSidebar from "@/components/user/UserProfileSidebar";
import { User } from "@/types/user";
import { UserProjects } from "@/types/userProjects";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function UserProjectsClient({ user, userProjects }: { user: User, userProjects: UserProjects }) {
    const totalStars = userProjects.data.reduce((acc, crr) => acc + crr.stars, 0)

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
            <section className="container mx-auto flex flex-col gap-4 md:flex-row px-4 md:p-0">
                <UserProfileSidebar user={user} totalStars={totalStars} />
                <div className="w-full">
                    <UserProfileNavbar />
                    <div>
                        {userProjects.data.map(x => (
                            <ListElement key={x.repo} data={x} />
                        ))}
                    </div>
                    <Pagination page={userProjects.pagination.page} totalPages={userProjects.pagination.totalPages} onPageChange={handlePageChange} />
                </div>
            </section>
            <Footer />
        </main>
    )
}