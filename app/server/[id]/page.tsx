import ServerClient from "./client";

async function getData(id: string) {
    const res = await fetch(`http://localhost:3001/api/v1/servers/${id}`, {
        next: { revalidate: 300 }
    })

    if (!res.ok) throw new Error('Erro')

    return await res.json()
}

export default async function Server({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const data = await getData(id)

    return (
        <ServerClient data={data} />
    )
}