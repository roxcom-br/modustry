import { getCache } from "@/lib/cache"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const mods = await getCache()
    const authors = mods.map(x => x.repo.split('/')[0])

    if (!authors.includes(id)) {
        throw Error(`Usuário não encontrado`)
    } 

    const res = await fetch(`https://api.github.com/users/${id}`)

    if (!res.ok) {
        throw Error(`Usuário não encontrado`)
    }

    let user = await res.json() 

    user = {
        id: user.id,
        name: user.name,
        username: user.login,
        avatar_url: user.avatar_url,
        bio: user.bio
    }

    return NextResponse.json(user)
}