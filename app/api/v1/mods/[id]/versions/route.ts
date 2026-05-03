import { getCache } from "@/lib/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const mod = (await getCache()).find(x => x.id == id)

    const res = await fetch(`https://api.github.com/repos/${mod!!.repo}/releases?per_page=100`)
    
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