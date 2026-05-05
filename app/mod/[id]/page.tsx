import ModClient from "./client";
import { remark } from "remark"
import html from "remark-html"

async function getData(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/v1/mods/${id}`, {
        next: { revalidate: 300 }
    })

    if (!res.ok) throw new Error('Erro')

    return await res.json()
}

async function processMarkdown(value: string) {
    return (await remark()
        .use(html)
        .process(value)).toString()
}

export default async function Mod({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const data = await getData(id)
    const body = await processMarkdown(data.body)

    return (
        <>
            <ModClient data={data} body={body} />
        </>
    )
}