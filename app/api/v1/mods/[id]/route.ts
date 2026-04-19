import { getCache } from "@/lib/cache";
import { NextResponse } from "next/server";

export async function GET(
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const mods = await getCache()

    return NextResponse.json(mods.find(x => x.id == id))
}