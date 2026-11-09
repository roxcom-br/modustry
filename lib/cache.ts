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

export const getCachePast = unstable_cache(
    async () => {
        const commit_res = await fetch("https://api.github.com/repos/Roxxedo/MindustryMods/commits?per_page=100")

        if (!commit_res.ok) {
            throw new Error(`Erro ao buscar data: ${commit_res.status}`)
        }

        let commits = await commit_res.json()
        
        const res = await fetch(`https://raw.githubusercontent.com/Roxxedo/MindustryMods/${commits[49]["sha"]}/data/mods.json`)

        if (!res.ok) {
            throw new Error(`Erro ao buscar data: ${res.status}`)
        }

        let mods = await res.json()

        return mods as Mod[]
    },
    ['cache-past'],
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
        const beres = await fetch("https://raw.githubusercontent.com/Anuken/MindustryServerList/refs/heads/main/servers_be.json")
        const v8res = await fetch("https://raw.githubusercontent.com/Anuken/MindustryServerList/refs/heads/main/servers_v8.json")

        if (!beres.ok || !v8res.ok) {
            throw new Error(`Erro ao buscar data`)
        }

        let be = await beres.json()
        let v8 = await v8res.json()

        be = be.map((x: any) => ({
            id: x.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
            name: x.name,
            address: x.address,
            version: "be"
        }))
        v8 = v8.map((x: any) => ({
            id: x.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase(),
            name: x.name,
            address: x.address,
            version: "v8"
        }))

        return [...be, ...v8] as Server[]
    },
    ['servers-cache'],
    {
        revalidate: 300
    }
)