import { notFound } from "next/navigation";
import UserProjectsClient from "./client";

async function getUser(user: string) {
    const res = await fetch(`${process.env.API_URL}/api/v1/users/${user}`, {
        next: { revalidate: 300 }
    })

    if (res.status == 404) notFound()
    if(!res.ok) throw new Error('Erro')

    return await res.json()
}

async function getUserProjects(user: string, params: URLSearchParams) {
    const res = await fetch(`${process.env.API_URL}/api/v1/users/${user}/projects?${params.toString()}`, {
        next: { revalidate: 300 }
    })

    if (res.status == 404) notFound()
    if(!res.ok) throw new Error('Erro')

    return await res.json()
}

export default async function UserProjects({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ page: string, limit: string }> }) {
    const { id } = await params
    const { page, limit } = await searchParams

    const url = new URLSearchParams()

    if (page) url.set('page', page)
    if (limit) url.set('limit', limit)

    const user = await getUser(id)
    const userProjects = await getUserProjects(id, url)

    return (
        <UserProjectsClient user={user} userProjects={userProjects} />
    )
}