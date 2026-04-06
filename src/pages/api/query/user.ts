import type { NextApiRequest, NextApiResponse } from 'next'

import { Data } from '@/lib/types'
import { queryUser } from '@/lib/api/query'
import { request } from '@/lib/utils'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>
) {
    const { q } = req.query
    const data = await request<Data[]>('https://raw.githubusercontent.com/Anuken/MindustryMods/master/mods.json')
    res.status(200).json((await queryUser(q as string, data)))
    res.end()
}