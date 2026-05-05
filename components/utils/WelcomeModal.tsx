'use client'

import { useEffect, useState } from "react"

export default function WelcomeModal() {
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        const alreadySeen = localStorage.getItem('welcome-modal-seen')

        if (!alreadySeen) {
            setOpen(true)
        }
    }, [])

    function closeModal() {
        localStorage.setItem('welcome-modal-seen', 'true')
        setOpen(false)
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="max-w-lg rounded-2xl bg-(--background) p-6 shadow-xl">
                <h2 className="text-xl font-bold">
                    Modustry v2 is here!
                </h2>

                <p className="mt-3">
                    After a lot of work, testing, and improvements, we are officially launching the new version of <span className="font-black">Modustry</span>, a platform created to make it easier to discover, organize, and access mods from the <span className="font-black">Mindustry</span> community.
                </p>
                <p className="mt-3">
                    In this new version, Modustry is faster, more complete, and better prepared to grow alongside the community. It is now even easier to find mods, explore project information, and follow the ecosystem of creations made by players.
                </p>
                <p className="mt-3">
                    Thank you to everyone who followed the project, tested it, shared ideas, and helped in any way during development.
                </p>
                <p className="mt-3">
                    Welcome to Modustry v2
                </p>
                
                <button
                    onClick={closeModal}
                    className="mt-5 rounded-lg bg-(--scheme-color-001)/75 border border-(--scheme-color-001) px-4 py-2 text-white"
                >
                    Thanks!
                </button>
            </div>
        </div>
    )
}