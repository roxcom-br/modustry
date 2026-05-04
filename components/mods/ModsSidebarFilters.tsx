'use client'

import { Version } from "@/types/version"
import { ReactNode, useState } from "react"

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

type ModsSidebarFilters = {
    loader: string,
    setLoader: (loader: string) => void,
    version: string,
    setVersion: (version: string) => void,
    versions: Version[]
}

export default function ModsSidebarFilters({ loader, setLoader, version, setVersion, versions }: ModsSidebarFilters) {
    const [versionsState, setVersionsState] = useState<boolean>(false)

    return (
        <div className="min-w-75 flex flex-col gap-4">
            <div className="bg-(--scheme-color-secondary) p-6 rounded-xl">
                <h4 className="text-lg font-bold mb-2">Game Version</h4>
                <div className="flex flex-col max-h-75 overflow-scroll">
                    {(versionsState ? versions : versions.filter(x => !x.prerelease)).map((item) => (
                        <OptionButton key={item.id} value={item.id} setValue={(x) => setVersion(x)} active={version == item.id}>{item.name}</OptionButton>
                    ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                    <input type="checkbox" onChange={(e) => setVersionsState(e.target.checked)} />
                    <span>Show all versions</span>
                </div>
            </div>
            <div className="bg-(--scheme-color-secondary) p-6 rounded-xl">
                <h4 className="text-lg font-bold mb-2">Loaders</h4>
                <div className="flex flex-col">
                    <OptionButton value="script" setValue={(x) => setLoader(x)} active={loader == "script"}><i className="fa-brands fa-js" /> Script</OptionButton>
                    <OptionButton value="java" setValue={(x) => setLoader(x)} active={loader == "java"}><i className="fa-brands fa-java" /> Java</OptionButton>
                </div>
            </div>
        </div>
    )
}