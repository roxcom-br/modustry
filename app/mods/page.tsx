import { Metadata } from "next";
import ModsClient from "./client";

export const metadata: Metadata = {
    title: "Modustry | Mods"
};

async function getData(params: URLSearchParams) {
    const res = await fetch(`${process.env.API_URL}/api/v1/mods?${params.toString()}`, {
        next: { revalidate: 300 }
    })

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

export default async function Mods({ searchParams }: { searchParams: Promise<{ page: string, q: string, limit: string, sort: string, loader: string, version: string }> }) {
    const { page, q, limit, sort, loader, version } = await searchParams

    const params = new URLSearchParams()

    if (page) params.set('page', page)
    if (q) params.set('q', q)
    if (limit) params.set('limit', limit)
    if (sort) params.set('sort', sort)
    if (loader) params.set('loader', loader)
    if (version) params.set('version', version)

    const data = await getData(params);
    const versions = await getVersions()

    return (
        <ModsClient data={data['data']} pagination={data['pagination']} query={q} sort={sort} loader={loader} version={version} versions={versions.data} />
    )
}