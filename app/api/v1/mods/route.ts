import { getCache } from "@/lib/cache";
import { parsePositiveInt } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const page = parsePositiveInt(searchParams.get('page'), 1)
    const limit = parsePositiveInt(searchParams.get('limit'), 20)

    const data = await getCache()
    const mods = Array.isArray(data) ? data : []

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