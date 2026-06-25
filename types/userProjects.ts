import { Mod } from "./mod"

export type UserProjects = {
    data: Mod[],
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    }
}