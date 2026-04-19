import { Mod } from "@/types/mod";
import { Server } from "@/types/server";
import { unstable_cache } from "next/cache";

export const getCache = unstable_cache(
    async () => {
        const res = await fetch("https://raw.githubusercontent.com/Anuken/MindustryMods/master/mods.json")

        if (!res.ok) {
            throw new Error(`Erro ao buscar data: ${res.status}`)
        }

        let mods = await res.json()

        mods = mods.map(({ internalName, ...rest }: any) => ({
            id: internalName,
            name: rest.name,
            repo: rest.repo,
            author: rest.author,
            minGameVersion: rest.minGameVersion,
            lastUpdated: rest.lastUpdated,
            stars: rest.stars,
            hasScripts: rest.hasScripts,
            hasJava: rest.hasJava,
            description: rest.description
        }))

        return mods as Mod[]
    },
    ['cache'],
    {
        revalidate: 300
    }
)

export const getServersCache = unstable_cache(
    async () => {
        const v6res = await fetch("https://raw.githubusercontent.com/Anuken/Mindustry/refs/heads/master/servers_v6.json")
        const v7res = await fetch("https://raw.githubusercontent.com/Anuken/Mindustry/refs/heads/master/servers_v7.json")

        if (!v6res.ok || !v7res.ok) {
            throw new Error(`Erro ao buscar data`)
        }

        let v6 = await v6res.json()
        let v7 = await v7res.json()

        v6 = v6.map((x: any) => ({ ...x, version: "v6" }))
        v7 = v7.map((x: any) => ({ ...x, version: "v7" }))

        return [...v6, ...v7] as Server[]
    },
    ['servers-cache'],
    {
        revalidate: 300
    }
)