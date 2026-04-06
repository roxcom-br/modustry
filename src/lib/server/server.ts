import { Data } from '@/lib/types'
import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { request } from '../utils';

interface IParams extends ParsedUrlQuery {
    id: string
}

const API_URL = process.env.API_URL

export const getProps = async (ctx: GetStaticPropsContext) => {
    const { id } = ctx.params as IParams

    const data = await request<Data>(`${API_URL}/api/servers/${id}`)
    
    var props = { data }
    return props
}