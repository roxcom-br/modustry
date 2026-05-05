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

async function getVersionsData(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/v1/mods/${id}/versions`, {
        next: { revalidate: 300 }
    })

    if (!res.ok) throw new Error('Erro')

    return await res.json()
}

export default async function ModVersions({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const data = await getData(id)
    const versions = await getVersionsData(id)

    return (
        <>
            <ModVersionsClient data={data} versions={versions} />
        </>
    )
}