import { getServersCache } from "@/lib/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const servers = await getServersCache()

    return NextResponse.json(servers.find(x => x.id == id))
}