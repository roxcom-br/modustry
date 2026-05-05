import ModChangelogClient from "./client";
import { remark } from "remark"
import html from "remark-html"

async function getData(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/v1/mods/${id}`, {
        next: { revalidate: 300 }
    })

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

async function processMarkdown(value: string) {
    return (await remark()
        .use(html)
        .process(value)).toString()
}

export default async function ModChangelog({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const data = await getData(id)
    let changelog = await getChangelogData(id)

    changelog = await Promise.all(changelog.map(async (x: any) => {
        x.body = (await processMarkdown(x.body)).replaceAll("h2", "h3")
        return x
    }))

    return (
        <>
            <ModChangelogClient data={data} changelog={changelog} />
        </>
    )
}