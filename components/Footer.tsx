import Image from "./utils/Image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="py-10 mt-10 bg-(--scheme-color-001)/75 border-t-2 border-(--scheme-color-001)">
            <footer className="container mx-auto">
                <div className="grid grid-rows-4 md:grid-cols-5 md:grid-rows-1 gap-5 md:gap-0">
                    <div className="flex flex-col items-center gap-6">
                        <Image src={["/icon.jpg"]} alt="" width={72} height={72} className="rounded" />
                        <div className="flex flex-col">
                            <span>Modustry is Open Source</span>
                            <span>© 2026 Modustry</span>
                        </div>
                    </div>
                    <div className="hidden md:block" />
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <h2 className="text-xl mb-2 font-bold">Content</h2>
                        <Link href={"/"}>Home</Link>
                        <Link href={"/mods"}>Mods</Link>
                        <Link href={"/textures"}>Textures</Link>
                        <Link href={"/servers"}>Servers</Link>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <h2 className="text-xl mb-2 font-bold">Resources</h2>
                        <Link href={"#"} className="text-gray-300">Docs</Link>
                        <Link href={"#"} className="text-gray-300">Status</Link>
                        <Link href={"https://github.com/roxcom-br/modustry"}>GitHub</Link>
                        <Link href={"https://discord.gg/mXuJZV85c3"}>Discord</Link>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <h2 className="text-xl mb-2 font-bold">Mindustry</h2>
                        <Link href={"https://github.com/Anuken/Mindustry"}>GitHub</Link>
                        <Link href={"https://discord.gg/mindustry"}>Discord</Link>
                        <Link href={"https://mindustrygame.github.io"}>Website</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}