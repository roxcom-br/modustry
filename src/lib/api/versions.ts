import { ReleaseData } from "@/lib/types"
import { request } from "../utils"

export async function getVersionList() {
    const db = await fetch(`https://api.github.com/repos/Anuken/Mindustry/releases?per_page=100`)
    const json: ReleaseData[] = await db.json()
    return json.map(x => x.tag_name.replace('v', ''))
}

export async function getVersion(id: string) {
    const data = await request<ReleaseData[]>(`https://api.github.com/repos/Anuken/Mindustry/releases?per_page=100`)
    for (var version of data) {
        if (version.tag_name == `v${id}`) {
            return { tag: version.tag_name, body: version.body, github_url: version.html_url, download_links: [{ type: `Client - ${version.assets[0].name}`, url: version.assets[0].browser_download_url }, { type: `Server - ${version.assets[1].name}`, url: version.assets[1].browser_download_url }] }
        }
    }
    return undefined
}