'use client'

import { usePathname } from "next/navigation"

export default function ModsNavbar() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname == path.replace('[id]', pathname.split('/')[2]) ? "text-white underline decoration-[2.5px] decoration-(--scheme-color-001)" : ""

    var value = [
        { path: "/mod/[id]", name: "Description" },
        { path: "/mod/[id]/changelog", name: "Changelog" },
        { path: "/mod/[id]/versions", name: "Versions" }
    ]

    return (
        <>
            <div className="container mx-auto p-0">
                <header className="mt-2 mb-2 flex items-center justify-center py-2">
                    <ul className="flex w-full justify-center">
                        {value.map((item) => (
                            <li key={item.path}>
                                <a
                                    href={item.path.replace('[id]', pathname.split('/')[2])}
                                    className={`px-2 py-2 text-gray-500 ${isActive(item.path)}`}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </header>
            </div>
        </>
    )
}