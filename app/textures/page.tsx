import { Metadata } from "next";
import TexturesClient from "./client";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Modustry | Textures"
};

async function getData(params: URLSearchParams) {
    const res = await fetch(`${process.env.API_URL}/api/v1/textures?${params.toString()}`, {
        next: { revalidate: 300 }
    })

    if (res.status == 404) notFound()
    if (!res.ok) throw new Error('Erro')
    
    return await res.json()
}

async function getVersions() {
    const res = await fetch(`${process.env.API_URL}/api/v1/versions?limit=100`, {
        next: { revalidate: 300 }
    })

    if (!res.ok) throw new Error('Erro')

    return await res.json()
}

export default async function Textures({ searchParams }: { searchParams: Promise<{ page: string, q: string, sort: string, limit: string, version: string }> }) {
    const { page, q, sort, limit, version } = await searchParams

    const params = new URLSearchParams()

    if (page) params.set('page', String(page))
    if (q) params.set('q', q)
    if (sort) params.set('sort', sort)
    if (limit) params.set('limit', limit)
    if (version) params.set('version', version)

    const data = await getData(params)
    const versions = await getVersions()

    return (
        <TexturesClient data={data['data']} pagination={data['pagination']} query={q} sort={sort} version={version} versions={versions.data} />
    )
}