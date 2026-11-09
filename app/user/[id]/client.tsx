"use client"

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import UserProfileNavbar from "@/components/user/UserProfileNavbar";
import UserProfileSidebar from "@/components/user/UserProfileSidebar";
import Markdown from "@/components/utils/Markdown";
import { User } from "@/types/user";
import { UserProjects } from "@/types/userProjects";

export default function UserPageClient({ user, userProjects, userBody }: { user: User, userProjects: UserProjects, userBody: string }) {
    const totalStars = userProjects.data.reduce((acc, crr) => acc + crr.stars, 0)

    return (
        <main>
            <Navbar />
            <section className="container mx-auto flex flex-col gap-4 md:flex-row px-4 md:p-0">
                    <UserProfileSidebar user={user} totalStars={totalStars} />
                    <div className="w-full">
                        <UserProfileNavbar />
                        <div className="bg-(--scheme-color-secondary) p-6 rounded-xl">
                            <Markdown body={userBody} repo="" branch="" />
                        </div>
                    </div>
            </section>
            <Footer />
        </main>
    )
}