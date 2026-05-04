export type Version = {
    id: string
    name: string
    prerelease: boolean
    body: string
    assets: {
        name: string
        size: number
        download_count: number
        download_url: string
        created_at: string
        updated_at: string
    }[]
    created_at: string
    updated_at: string
}