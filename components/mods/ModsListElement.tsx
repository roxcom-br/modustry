import { Mod } from "@/types/mod";
import Link from "next/link";
import Image from "@/components/utils/Image"
import { MindustryText } from "../utils/MindustryText";

export default function ListElement({ data }: { data: Mod }) {
    return (
        <Link
            href={'/mod/' + data.id}
            aria-current="true"
            className="flex items-center gap-3 mb-4 rounded-xl transition bg-(--scheme-color-secondary)"
        >
            <Image
                src={[
                    ("https://raw.githubusercontent.com/" + data.repo + "/master/icon.png"),
                    ("https://raw.githubusercontent.com/" + data.repo + "/master/assets/icon.png"),
                    "/icon.jpg"
                ]}
                alt="Mod Icon"
                width={96}
                height={96}
                className="rounded-xl"
            />

            <div className="flex w-full justify-between gap-2">
                <div>
                    <h3 className="mb-1 inline-block text-xl font-semibold">{data.name}</h3>
                    <small className="text-sm text-zinc-500"> by {data.repo.split('/')[0]}</small>

                    <div className="mb-1 text-sm text-zinc-500">
                        <span>Stars: {data.stars} | Game Version: {data.min_game_version}</span>
                    </div>

                    <p
                        className="mb-1 text-sm overflow-hidden"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            lineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        <MindustryText text={data.description} />
                    </p>
                </div>
            </div>
        </Link>
    )
}