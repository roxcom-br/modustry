'use client'

import { useEffect, useState } from "react"

export default function BridgeModal() {
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        const alreadySeen = localStorage.getItem('bridge-modal-seen')

        if (!alreadySeen) {
            setOpen(true)
        }
    }, [])

    function closeModal() {
        localStorage.setItem('bridge-modal-seen', 'true')
        setOpen(false)
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 md:px-0">
            <div className="max-w-4xl rounded-2xl bg-(--background) p-6 shadow-xl max-h-[90vh] overflow-y-scroll">
                <h2 className="text-2xl font-bold text-center">
                    Modustry Bridge is here!
                </h2>

                <p className="mt-5">
                    Modustry Bridge <strong className="text-(--scheme-color-001)">is now available</strong> as a new way to connect Modustry directly with Mindustry.
                </p>
                <p className="mt-3">
                    With Bridge, you can install mods from Modustry more easily, without needing to manually copy repositories, download files, or move mods around. The goal is to make discovering and installing community mods feel more integrated, faster, and more convenient.
                </p>
                <img className="mt-3 border border-(--scheme-color-001)" src={"/announcements/bridge/bridge1.png"} />
                <span className="text-sm text-gray-400">Install mods directly from Modustry</span>
                <p className="mt-3">
                    After installing the Bridge mod in Mindustry, Modustry can communicate with your game locally and send mod installation requests directly to it. This keeps the process simple while still giving you control over what is installed.                
                </p>
                <p className="mt-3">
                    During pairing, Modustry and Modustry Bridge confirm that both sides are trying to connect to the same session. A temporary code is shown in Mindustry and must be confirmed on the website before any install request can be sent. This helps prevent unwanted connections and makes sure that Bridge only accepts actions from the Modustry page you intentionally connected. Once paired, you can send mods from the website directly to your game in a more seamless and controlled way.
                </p>
                <img className="mt-3 border border-(--scheme-color-001)" src={"/announcements/bridge/bridge3.png"} />
                <span className="text-sm text-gray-400">Pairing request on <span className="text-(--scheme-color-001)">Modustry</span></span>
                <img className="mt-3 border border-(--scheme-color-001)" src={"/announcements/bridge/bridge2.png"} />
                <span className="text-sm text-gray-400">Pairing request on <span className="text-(--scheme-color-001)">Mindustry</span></span>
                <p className="mt-3">
                    This is the <strong className="text-(--scheme-color-001)">first public version</strong> of Modustry Bridge, so some things may still change as it improves. Feedback, bug reports, and suggestions are very welcome.
                </p>
                <p className="mt-3">
                    Thank you for supporting Modustry and helping make the Mindustry modding experience better.
                </p>
                <p className="mt-3">
                    <strong className="text-(--scheme-color-001)">Welcome to Modustry Bridge.</strong>
                </p>
                
                <button
                    onClick={closeModal}
                    className="mt-5 rounded-lg bg-(--scheme-color-001)/75 border border-(--scheme-color-001) px-10 py-2 text-white"
                >
                    <strong>Got it!</strong>
                </button>
            </div>
        </div>
    )
}