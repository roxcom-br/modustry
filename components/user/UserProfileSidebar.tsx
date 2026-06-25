import Image from "../utils/Image"
import { User } from "@/types/user"

export default function UserProfileSidebar({ user, totalStars }: { user: User, totalStars: number }) {
    return (
        <div className="flex flex-col bg-(--scheme-color-secondary) p-6 rounded-xl md:max-w-[320px] md:min-w-[320px] self-start">
            <Image
                src={[user.avatar_url]}
                className="rounded-xl"
                alt="Mod Icon"
                width={128}
                height={128}
            />
            <div>
                <h2 className="text-2xl font-semibold mt-1">{user.name || user.username}</h2>
                <span className="text-sm text-gray-400">{user.username}</span>
                <p className="mt-3">{user.bio}</p>

                <hr className="my-4 border-zinc-200" />

                <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center gap-1">
                        <i className="fa-solid fa-star" />
                        <span className="font-bold">{totalStars}</span>
                        Stars
                    </span>
                </div>

                <div className="buttons mt-5 flex gap-2">
                    <a
                        href={'https://github.com/' + user.username}
                        className="flex items-center gap-1 rounded-lg px-4 py-2 bg-(--scheme-color-001) text-white transition"
                    >
                        <i className="fa-brands fa-github" />
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    )
}