import Image from "@/components/utils/Image"
import { Server } from "@/types/server"

type ServerSidebarInfo = {
    data: Server
}

export default function ServerSidebarInfo({ data }: ServerSidebarInfo) {
    return (
        <div className="flex flex-col bg-(--scheme-color-secondary) p-6 rounded-xl md:max-w-[320px]">
            <Image
                src={[
                    '/icon.jpg',
                ]}
                className="rounded-xl"
                alt="Mod Icon"
                width={128}
                height={128}
            />
            <div>
                <h2 className="text-2xl font-semibold my-1">{data.name}</h2>
            </div>
            <hr className="my-4 border-zinc-200" />
            <ul className="flex flex-col gap-1 list-disc ps-4">
                {data.address.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    )
}