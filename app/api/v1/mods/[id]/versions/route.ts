import { getCache } from "@/lib/cache";
import { parsePositiveInt } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const { searchParams } = new URL(request.url)

    const page = parsePositiveInt(searchParams.get('page'), 1)
    const limit = parsePositiveInt(searchParams.get('limit'), 20)

    const mod = (await getCache()).find(x => x.id == id)

    if (!mod) {
        return NextResponse.json({
            error: {
                code: "NOT_FOUND",
                message: "The requested resource cannot be found"
            }
        }, { status: 404 })
    }

    let list;
    if (mod.has_java) {
        const res = await fetch(`https://api.github.com/repos/${mod!!.repo}/releases?per_page=100`)

        if (!res.ok) {
            return NextResponse.json({
                error: {
                    code: "INTERNAL_ERROR",
                    message: "Internal server error"
                }
            }, { status: 500 })
        }

        const json = await res.json()

        list = json.map((value: any) => (
            {
                name: value.name,
                version: value.tag_name,
                download_count: value.assets[0].download_count,
                download_url: value.assets[0].browser_download_url,
                created_at: value.assets[0].created_at
            }
        ))
    } else {
        list = [{
            name: "Zipball",
            version: "zipball",
            download_count: null,
            download_url: `https://api.github.com/repos/${mod.repo}/zipball/${mod.branch}`,
            created_at: mod.updated_at
        }]
    }

    const start = (page - 1) * limit
    const end = start + limit

    return NextResponse.json({
        data: list.slice(start, end),
        pagination: {
            page,
            limit,
            total: list.length,
            totalPages: Math.ceil(list.length / limit)
        }
    })
}