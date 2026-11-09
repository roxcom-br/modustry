'use client'

import { ReactNode } from "react"

function OptionButton({
    children,
    value,
    setValue,
    active
}: {
    children: ReactNode,
    value: string,
    setValue: (value: string) => void,
    active: boolean
}) {
    const toggle = (value: string) => active ? "" : value

    return (
        <button
            className={`flex items-center gap-1 w-full transition hover:bg-(--scheme-color-001)/50 p-1 rounded ${active ? "bg-(--scheme-color-001)/50" : ""}`}
            onClick={() => setValue(toggle(value))}
        >{children}</button>
    )
}

type ServerSidebarFilters = {
    version: string,
    setVersion: (loader: string) => void,
}

export default function ServerSidebarFilters({ version, setVersion }: ServerSidebarFilters) {
    return (
        <div className="min-w-75 flex flex-col gap-4">
            <div className="bg-(--scheme-color-secondary) p-6 rounded-xl">
                <h4 className="text-lg font-bold mb-2">Game Version</h4>
                <div className="flex flex-col max-h-75 overflow-scroll">
                    <OptionButton value="be" setValue={(x) => setVersion(x)} active={version == "be"}>be</OptionButton>
                    <OptionButton value="v8" setValue={(x) => setVersion(x)} active={version == "v8"}>v8</OptionButton>
                </div>
            </div>
        </div>
    )
}