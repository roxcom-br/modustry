import { Data, GithubRelease } from '@/lib/types'
import { GetServerSidePropsContext } from 'next'
import { remark } from 'remark'
import html from 'remark-html'

const API_URL = process.env.API_URL

export const getProps = async (ctx: GetServerSidePropsContext) => {
    const { id } = ctx.query
    
    const res = await fetch(`${API_URL}/api/mods/${id}`)
    const data: Data = await res.json()

    const gres = await fetch(`https://api.github.com/repos/${data.repo}/releases`)
    var gjson: GithubRelease[] = await gres.json();

    gjson.map(async (value, index, number) => {
        const processedContent = await remark()
        .use(html)
        .process(value.body);
        value.body = processedContent.toString().replaceAll('h2', 'h4')
    })

    if (gjson.length == 0) gjson = [{ name: "Latest", tag_name: "source", body: "Just to download the zip, not jar mod.", assets: [{ name: "Source Code", download_count: "Not Measured", browser_download_url: `https://codeload.github.com/${data.repo}/zip/refs/heads/master` }, { name: "Source Code - Alternative", download_count: "Not Measured", browser_download_url: `https://codeload.github.com/${data.repo}/zip/refs/heads/main` }], target_commitish: "master", published_at: "undefined" }]

    var props = { gjson, data }
    return props
}