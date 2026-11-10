import { getCache } from "@/lib/cache";
import { parsePositiveInt } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const page = parsePositiveInt(searchParams.get('page'), 1)
    const limit = parsePositiveInt(searchParams.get('limit'), 20)

    const version = searchParams.get('version') ?? ""

    let textures = await getCache()

    const q = searchParams.get('q')?.toLowerCase() ?? ""

    textures = textures.filter(x => 
        x.name.toLowerCase().includes('texturepack') ||
        x.name.toLowerCase().includes('texture pack') ||
        x.description.toLowerCase().includes('texturepack') ||
        x.description.toLowerCase().includes('texture pack')
    )

    textures = textures.filter(x =>
        x.name.toLowerCase().includes(q) ||
        x.author.toLowerCase().includes(q) ||
        x.repo.toLowerCase().includes(q) ||
        x.description.toLowerCase().includes(q)
    )

    if (version) textures = textures.filter(x => parseFloat(x.min_game_version) >= parseFloat(version.replace('v', '')))

    const start = (page - 1) * limit
    const end = start + limit
    
    return NextResponse.json({
        data: textures.slice(start, end),
        pagination: {
            page,
            limit,
            total: textures.length,
            totalPages: Math.ceil(textures.length / limit)
        }
    })
}