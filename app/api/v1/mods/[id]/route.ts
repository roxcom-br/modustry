import { getCache } from "@/lib/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const mods = await getCache()

    return NextResponse.json(mods.find(x => x.id == id))
}