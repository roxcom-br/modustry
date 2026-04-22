import TexturesClient from "./client";

async function getData(params: URLSearchParams) {
    const res = await fetch(`http://localhost:3001/api/v1/textures?${params.toString()}`, {
        next: { revalidate: 300 }
    })

    if (!res.ok) throw new Error('Erro')
    
    return await res.json()
}

export default async function Textures({ searchParams }: { searchParams: Promise<{ page: string, q: string }> }) {
    const { page, q } = await searchParams

    const params = new URLSearchParams()

    if (page) params.set('page', String(page))
    if (q) params.set('q', q)

    const data = await getData(params)

    return (
        <TexturesClient data={data['data']} pagination={data['pagination']} query={q} />
    )
}