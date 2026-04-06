import { Data, GithubRelease } from '@/lib/types'
import { GetServerSidePropsContext } from 'next';
import { request, toHtml } from '../utils';

const API_URL = process.env.API_URL

export const getProps = async (ctx: GetServerSidePropsContext) => {
    const { id } = ctx.query
    
    const data = await request<Data>(`${API_URL}/api/mods/${id}`)
    var githubData = await request<GithubRelease[]>(`https://api.github.com/repos/${data.repo}/releases`)


    githubData.map(async (value, index, number) => {
        value.body = (await toHtml(value.body)).replaceAll('h2', 'h4')
    })
    
    if (githubData.length == 0) githubData = [{ name: "Latest", tag_name: "source", body: "Just to download the zip, not jar mod.", assets: [{ name: "Source Code", download_count: "Not Measured", browser_download_url: `https://codeload.github.com/${data.repo}/zip/refs/heads/master` }, { name: "Source Code - Alternative", download_count: "Not Measured", browser_download_url: `https://codeload.github.com/${data.repo}/zip/refs/heads/main` }], target_commitish: "master", published_at: "undefined" }]

    var props = { githubData, data }
    return props
}