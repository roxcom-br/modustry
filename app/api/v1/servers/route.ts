import { getServersCache } from "@/lib/cache"
import { parsePositiveInt } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const page = parsePositiveInt(searchParams.get('page'), 1)
    const limit = parsePositiveInt(searchParams.get('limit'), 20)

    const servers = await getServersCache()

    const start = (page - 1) * limit
    const end = start + limit

    return NextResponse.json({
        data: servers.slice(start, end),
        pagination: {
            page,
            limit,
            total: servers.length,
            totalPages: Math.ceil(servers.length / limit)
        }
    })
}