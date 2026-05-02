import { Mod } from "@/types/mod"
import Image from "../utils/Image"
import moment from "moment"

type ModSidebarInfo = {
    data: Mod
}

export default function ModSidebarInfo({ data }: ModSidebarInfo) {
    return (
        <div className="flex flex-col bg-(--scheme-color-secondary) p-6 rounded-xl max-w-[320px]">
            <Image
                src={[
                    'https://raw.githubusercontent.com/' + data.repo + '/master/icon.png',
                    'https://raw.githubusercontent.com/' + data.repo + '/master/assets/icon.png',
                    '/icon.jpg',
                ]}
                className="rounded-xl"
                alt="Mod Icon"
                width={128}
                height={128}
            />
            <div>
                <h2 className="text-2xl font-semibold my-1">{data.name}</h2>
                <span>{data.description}</span>
                <div className="flex items-center gap-2 mt-2">
                    <a
                        className="flex items-center gap-1"
                        target="_blank"
                        href={`https://github.com/${data.repo}/issues`}
                    >
                        <i className="fa-solid fa-triangle-exclamation" />
                        Issues
                    </a>
                    <span>•</span>
                    <a
                        className="flex items-center gap-1"
                        target="_blank"
                        href={`https://github.com/${data.repo}`}
                    >
                        <i className="fa-solid fa-code" />
                        Source
                    </a>
                </div>
            </div>
            <hr className="my-4 border-zinc-200" />
            <div className="flex flex-col gap-1">
                <span className="inline-flex items-center gap-1">
                    <i className="fa-solid fa-download" />
                    <span className="font-bold">{}</span>
                    Downloads
                </span>
                <span className="inline-flex items-center gap-1">
                    <i className="fa-solid fa-star" />
                    <span className="font-bold">{data.stars}</span>
                    Stars
                </span>
                <div className="dates flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1">
                        <i className="fa-solid fa-calendar" />
                        Created <span className="font-bold">{moment(data.createdAt).fromNow()}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <i className="fa-solid fa-rotate" />
                        Updated <span className="font-bold">{moment(data.updatedAt).fromNow()}</span>
                    </span>
                </div>
                <div className="buttons mt-3 flex gap-2">
                    <a
                        href={`https://github.com/contact/report-content?content_url=https%3A%2F%2Fgithub.com%2F${data.repo}&report=${data.repo.split('/')[0]}+%28user%29`}
                        className="flex items-center gap-1 rounded-lg px-4 py-2 bg-(--scheme-color-001) text-white transition"
                    >
                        <i className="fa-solid fa-flag" />
                        Report
                    </a>
                    <a
                        href={'https://github.com/' + data.repo}
                        className="flex items-center gap-1 rounded-lg px-4 py-2 bg-(--scheme-color-001) text-white transition"
                    >
                        <i className="fa-solid fa-star" />
                        Star
                    </a>
                </div>
            </div>
            <hr className="my-4 border-zinc-200" />
            <div>
                <h5 className="mb-2 text-lg font-semibold">Authors:</h5>
                <ul>
                    <li>
                        <a
                            href={`https://github.com/${data.repo.split('/')[0]}`}
                            target="_blank"
                            className="inline-flex items-center gap-3"
                        >
                            <img
                                src={`https://avatars.githubusercontent.com/${data.repo.split('/')[0]}`}
                                height={48}
                                width={48}
                                className="rounded-full"
                            />
                            {data.repo.split('/')[0]}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}