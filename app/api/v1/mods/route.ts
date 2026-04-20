import { getCache } from "@/lib/cache";
import { parsePositiveInt } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const page = parsePositiveInt(searchParams.get('page'), 1)
    const limit = parsePositiveInt(searchParams.get('limit'), 20)

    let mods = await getCache()

    const q = searchParams.get('q')?.toLowerCase() ?? ""

    mods = mods.filter(x =>
        x.name.toLowerCase().includes(q) ||
        x.author.toLowerCase().includes(q) ||
        x.repo.toLowerCase().includes(q) ||
        x.description.toLowerCase().includes(q)
    )

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