"use client";

const BRIDGE_URL = "http://localhost:48123";
var pairCode: string;

export async function getBridgeHealth() {
    try {
        const res = await fetch(`${BRIDGE_URL}/health`)

        if (!res.ok) return null

        return (await res.json())["status"]
    } catch {
        return null
    }
}

export async function requestPair() {
    try {
        const res = await fetch(`${BRIDGE_URL}/pair/request`)
        pairCode = (await res.json())['pairCode']
        return pairCode
    } catch {
        return null
    }
}

export async function confirmPair(pairCode: string) {
    const res = await fetch(`${BRIDGE_URL}/pair/confirm`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pairCode
        })
    })

    return res.ok
}

export async function getInstalledMods() {
    try {
        const res = await fetch(`${BRIDGE_URL}/mods/installed`)
        
        var mods = await res.json()

        return mods.map((mod: any) => mod.repo);
    } catch (e) {
        console.log(e)
        return null
    }
}

export async function installMod(id: string, version: string | null): Promise<boolean> {
    try {
        const res = await fetch(`${BRIDGE_URL}/mods/install`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Modustry-Pair-Code": pairCode
            },
            body: JSON.stringify({
                id,
                version
            })
        })

        if (!res.ok) throw new Error("Failed to install mod via Modustry Bridge");

        const installed = (await res.json())["installed"]

        if (!installed) throw new Error("Failed to install mod via Modustry Bridge");

        return res.ok && installed
    } catch {
        return false
    }
}