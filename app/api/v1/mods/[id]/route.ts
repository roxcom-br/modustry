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

    return NextResponse.json(mod)
}