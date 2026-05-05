import { getCache } from "@/lib/cache";
import { parsePositiveInt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const { searchParams } = new URL(request.url)

    const page = parsePositiveInt(searchParams.get('page'), 1);
    const limit = parsePositiveInt(searchParams.get('limit'), 20);

    let mods = await getCache()

    if (!mods.map(x => x.repo.split('/')[0]).includes(id)) {
        return NextResponse.json({
            error: {
                code: "NOT_FOUND",
                message: "The requested resource cannot be found"
            }
        }, { status: 404 })
    }

    mods = mods.filter(x => x.repo.split("/")[0] == id)

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