import { unstable_cache } from "next/cache";

export const getCache = unstable_cache(
    async () => {
        const res = await fetch("https://raw.githubusercontent.com/Anuken/MindustryMods/master/mods.json")

        if (!res.ok) {
            throw new Error(`Erro ao buscar data: ${res.status}`)
        }

        return await res.json()
    },
    ['cache'],
    {
        revalidate: 300
    }
)