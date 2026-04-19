import { Mod } from "@/types/mod";
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