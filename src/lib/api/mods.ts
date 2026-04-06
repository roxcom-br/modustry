import { request } from "../utils";
import { Data } from "../types";
import URLS from "@/lib/data";

export async function getMod(id: string) {
    const data = await request<Data[]>(URLS.MODS_JSON)
    return data.find(item => item.repo.split("/")[1] == id)
}