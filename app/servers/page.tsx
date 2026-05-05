import { Metadata } from "next";
import ServersClient from "./client";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Modustry | Servers"
};

async function getData(params: URLSearchParams) {
    const res = await fetch(`${process.env.API_URL}/api/v1/servers?${params.toString()}`, {
        next: { revalidate: 300 }
    })

    if (res.status == 404) notFound()
    if (!res.ok) throw new Error('Erro')

    return await res.json()
}

export default async function Servers({ searchParams }: { searchParams: Promise<{ page: string, q: string }> }) {
    const { page, q } = await searchParams

    const params = new URLSearchParams()

    if (page) params.set('page', String(page))
    if (q) params.set('q', q)

    const data = await getData(params)

    return (
        <ServersClient data={data['data']} pagination={data['pagination']} query={q} />
    )
}