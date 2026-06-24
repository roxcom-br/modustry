import { getCache, getCachePast } from "@/lib/cache";
import { parsePositiveInt } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const page = parsePositiveInt(searchParams.get('page'), 1)
    const limit = parsePositiveInt(searchParams.get('limit'), 20)
    const sort = searchParams.get('sort') ?? "relevance"
    const loader = searchParams.get('loader') ?? "all"
    const version = searchParams.get('version') ?? ""

    let mods = await getCache()
    let modsPast = await getCachePast()

    const q = searchParams.get('q')?.toLowerCase() ?? ""

    mods = mods.map((mod) => {
        let score = 0

        if (mod.name.toLowerCase().includes(q)) score += 100;
        if (mod.author.toLowerCase().includes(q)) score += 50;
        if (mod.repo.toLowerCase().includes(q)) score += 25;
        if (mod.description.toLowerCase().includes(q)) score += 10;

        return {
            ...mod,
            score
        }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ score, ...mod }) => mod)

    if (version) mods = mods.filter(x => parseFloat(x.min_game_version) >= parseFloat(version.replace('v', '')))
    
    if (loader == "java") mods = mods.filter(x => x.has_java)
    if (loader == "script") mods = mods.filter(x => x.has_scripts)

    if (sort == "rising") mods.sort((a, b) => (b.stars - (modsPast.find(x => x.id == b.id)?.stars || 0)) - (a.stars - (modsPast.find(x => x.id == a.id)?.stars || 0)))
    if (sort == "downloads") mods.sort((a, b) => b.downloads - a.downloads)
    if (sort == "date published") mods.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    if (sort == "date updated") mods.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))

    const start = (page - 1) * limit
    const end = start + limit
    
    return NextResponse.json({
        data: mods.slice(start, end),
        pagination: {
            page,
            limit,
            total: mods.length,
            totalPages: Math.ceil(mods.length / limit)
        }
    })
}