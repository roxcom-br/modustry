import ModsClient from "./client";

async function getData(params: URLSearchParams) {
    const res = await fetch(`http://localhost:3001/api/v1/mods?${params.toString()}`, {
        next: { revalidate: 300 }
    })

    if (!res.ok) throw new Error('Erro')

    return await res.json()
}

export default async function Mods({ searchParams }: { searchParams: Promise<{ page: string, q: string, limit: string, sort: string }> }) {
    const { page, q, limit, sort } = await searchParams

    const params = new URLSearchParams()

    if (page) params.set('page', page)
    if (q) params.set('q', q)
    if (limit) params.set('limit', limit)
    if (sort) params.set('sort', sort)

    const data = await getData(params);

    return (
        <ModsClient data={data['data']} pagination={data['pagination']} query={q} sort={sort} />
    )
}