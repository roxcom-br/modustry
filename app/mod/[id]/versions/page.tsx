import { notFound } from "next/navigation";
import ModVersionsClient from "./client";

async function getData(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/v1/mods/${id}`, {
        next: { revalidate: 300 }
    })

    if (res.status == 404) notFound()
    if (!res.ok) throw new Error('Erro')

    return await res.json()
}

async function getVersionsData(id: string, params: URLSearchParams) {
    const res = await fetch(`${process.env.API_URL}/api/v1/mods/${id}/versions?${params.toString()}`, {
        next: { revalidate: 300 }
    })

    if (!res.ok) throw new Error('Erro')

    return await res.json()
}

export default async function ModVersions({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ page: string, limit: string }> }) {
    const { id } = await params
    const { page, limit } = await searchParams

    const usp = new URLSearchParams('')

    if (page) usp.set('page', page)
    if (limit) usp.set('limit', limit)

    const data = await getData(id)
    const versions = await getVersionsData(id, usp)

    return (
        <>
            <ModVersionsClient data={data} versions={versions.data} pagination={versions.pagination} />
        </>
    )
}