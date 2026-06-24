"use client";

import { installMod } from "@/lib/bridge";
import { useState } from "react";

export function InstallButton({
    id,
    version,
    installed,
}: {
    id: string;
    version: string | null;
    installed: boolean;
}) {
    const [installing, setInstalling] = useState(false);
    const [isInstalled, setIsInstalled] = useState(installed);

    async function handleInstall(ev: React.MouseEvent<HTMLButtonElement>) {
        ev.preventDefault();
        ev.stopPropagation();

        if (isInstalled || installing) return;

        try {
            setInstalling(true);

            const success = await installMod(id, version);

            setIsInstalled(success)
        } catch (error) {
            console.error("Failed to install mod:", error);
        } finally {
            setInstalling(false);
        }
    }

    return (
        <button
            type="button"
            disabled={isInstalled || installing}
            onClick={handleInstall}
            className="flex items-center gap-1 rounded-lg px-4 py-2 mx-4 bg-(--scheme-color-001) text-white transition"
        >
            {isInstalled ? "Installed" : installing ? "Installing..." : "Install"}
        </button>
    );
}