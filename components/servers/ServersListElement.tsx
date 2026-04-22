import { Server } from "@/types/server";
import Link from "next/link";
import Image from "@/components/utils/Image"

export default function ServersListElement({ data }: { data: Server }) {
    return (
        <Link
            href={""}
            aria-current="true"
            key={`${data.name}-${data.version}-${data.address.length}`}
            className="flex items-center gap-3 mb-4 rounded-xl transition bg-(--scheme-color-secondary)"
        >
            <Image
                src={[
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
                </div>
            </div>
        </Link>
    )
}