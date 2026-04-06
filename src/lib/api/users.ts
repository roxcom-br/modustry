import { request } from "../utils";
import { Data, GithubData } from "../types";
import URLS from "@/lib/data";

export async function getUser(id: string) {
    const data = await request<Data[]>(URLS.MODS_JSON)
    for (var user of data) {
        const username = user.repo.split('/')[0]
        if (username == id) {
            const githubData = await request<GithubData>(`https://api.github.com/users/${id}`)
            if (githubData.login !== "") return { id: githubData.id, username: githubData.login, name: githubData.name, avatar_url: githubData.avatar_url, bio: githubData.bio }
        }
    }
    return undefined
}

export async function getUserProjects(id: string) {
    const data = await request<Data[]>(URLS.MODS_JSON)
    return data.filter(mod => mod.author == id)
}