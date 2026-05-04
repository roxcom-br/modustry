import { getVersionsCache } from "@/lib/cache";
import { parsePositiveInt } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const page = parsePositiveInt(searchParams.get('page'), 1)
    const limit = parsePositiveInt(searchParams.get('limit'), 20)

    let versions = await getVersionsCache()

    const start = (page - 1) * limit
    const end = start + limit
    
    return NextResponse.json({
        data: versions.slice(start, end),
        pagination: {
            page,
            limit,
            total: versions.length,
            totalPages: Math.ceil(versions.length / limit)
        }
    })
}