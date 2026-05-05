import { getCache } from "@/lib/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const mod = (await getCache()).find(x => x.id == id)

    if (!mod) {
        return NextResponse.json({
            error: {
                code: "NOT_FOUND",
                message: "The requested resource cannot be found"
            }
        }, { status: 404 })
    }

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

    let list = json.map((value: any) => (
        {
            name: value.name,
            version: value.tag_name,
            download_count: value.assets[0].download_count,
            download_url: value.assets[0].browser_download_url,
            created_at: value.assets[0].created_at
        }
    ))

    return NextResponse.json(list)
}