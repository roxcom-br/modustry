import { GithubRelease } from '@/lib/types'
import { remark } from 'remark';
import html from 'remark-html';

export function sliceIntoChunks<T>(arr: T[], chunkSize: number) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export async function processMarkdown(md: string) {
    const processedContent = await remark()
        .use(html)
        .process(md);
    return processedContent.toString()
}

export function getAllDownloads(data: GithubRelease[]) {
    var allDownloadsCount = 0
    for (var i = 0; i < data.length; i++) {
        for (var o = 0; o < data[i].assets.length; o++) {
            allDownloadsCount = allDownloadsCount + Number(data[i].assets[o].download_count)
        }
    }
    return allDownloadsCount
}

export function getPublishedDate(data: GithubRelease[]) {
    var publishedDate = "0"
    try { publishedDate = data[data.length - 1].published_at } catch { }
    return publishedDate
}

export function getUpdatedDate(data: GithubRelease[]) {
    var updatedDate = "0"
    try { updatedDate = data[0].published_at } catch { }
    return updatedDate
}

export async function request<T>(url: string) {
    const res = await fetch(url)
    const data: T = await res.json()
    return data
}

export async function requestText(url: string) {
    const res = await fetch(url)
    const data: string = await res.text()
    return data
}

export async function toHtml(data: string) {
    const processedContent = await remark()
        .use(html)
        .process(data);
    const readme = processedContent.toString()
    return readme
}