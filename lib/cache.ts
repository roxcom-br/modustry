import { Mod } from "@/types/mod";
import { Server } from "@/types/server";
import { Version } from "@/types/version";
import { unstable_cache } from "next/cache";

export const getCache = unstable_cache(
    async () => {
        const res = await fetch("https://raw.githubusercontent.com/Roxxedo/MindustryMods/master/data/mods.json")

        if (!res.ok) {
            throw new Error(`Erro ao buscar data: ${res.status}`)
        }

        let mods = await res.json()

        return mods as Mod[]
    },
    ['cache'],
    {
        revalidate: 300
    }
)

export const getVersionsCache = unstable_cache(
    async () => {
        const res = await fetch("https://raw.githubusercontent.com/Roxxedo/MindustryMods/master/data/versions.json")

        if (!res.ok) {
            throw new Error(`Erro ao buscar data: ${res.status}`)
        }

        let versions = await res.json()

        return versions as Version[]
    },
    ['versions-cache'],
    {
        revalidate: 600
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

        v6 = v6.map((x: any) => ({
            id: x.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
            name: x.name,
            address: x.address,
            version: "v6"
        }))
        v7 = v7.map((x: any) => ({
            id: x.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
            name: x.name,
            address: x.address,
            version: "v7"
        }))

        return [...v6, ...v7] as Server[]
    },
    ['servers-cache'],
    {
        revalidate: 300
    }
)