import { request } from "../utils";
import { ServerType } from "../types";
import URLS from "../data";

export default async function getServer(id: string) {
    const data = await request<ServerType[]>(URLS.SERVERS_JSON)
    return data.find(item => item.id == id)
}