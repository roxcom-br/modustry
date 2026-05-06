import { notFound } from "next/navigation";
import ModChangelogClient from "./client";

async function getData(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/v1/mods/${id}`, {
        next: { revalidate: 300 }
    })

    if (res.status == 404) notFound()
    if (!res.ok) throw new Error('Erro')

    return await res.json()
}

async function getChangelogData(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/v1/mods/${id}/changelog`, {
        next: { revalidate: 300 }
    })

    if (!res.ok) throw new Error('Erro')

    return await res.json()
}

export default async function ModChangelog({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const data = await getData(id)
    let changelog = await getChangelogData(id)

    return (
        <>
            <ModChangelogClient data={data} changelog={changelog} />
        </>
    )
}