'use client'

import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname == path ? "text-white underline decoration-[2.5px] decoration-(--scheme-color-001)" : ""

    let value = [
        { path: "/mods", name: "Mods" },
        { path: "/textures", name: "Textures" },
        { path: "/servers", name: "Servers" }
    ]

    return (
        <nav className="container mx-auto">
            <header className="mt-2 mb-4 flex items-center justify-center py-2 md:justify-between">
                <div className="md:w-1/4">
                    <h4 className="m-0 inline-flex font-bold text-xl">
                        <a href="/">
                            Modustry
                        </a>
                    </h4>
                </div>

                <ul className="flex w-full justify-center md:w-auto">
                    {value.map((value) => (
                        <li key={value.path}>
                            <a
                                href={value.path}
                                className={`px-2 py-2 ${isActive(value.path)} text-gray-500`}
                            >
                                {value.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="md:w-1/4" />
            </header>
        </nav>
    )
}