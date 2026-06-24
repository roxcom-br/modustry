"use client";

import { confirmPair, getBridgeHealth, getInstalledMods, requestPair } from "@/lib/bridge";
import PairRequest from "./PairRequest";
import { useEffect, useState } from "react";

export function Bridge() {
    const [pairOpen, setPairOpen] = useState(false);
    const [pairCode, setPairCode] = useState<string | null>(null);
    const [pairing, setPairing] = useState(false);

    const [paired, setPaired] = useState(false)
    const [running, setRunning] = useState(false)

    useEffect(() => {
        let cancelled = false;

        async function checkBridge() {
            const active = await getBridgeHealth();

            if (!cancelled) {
                setRunning(active != null)
                if (active != null) setPaired(active == "paired")
            }
        }

        checkBridge()

        setInterval(() => {
            checkBridge()
        }, 5000)

        return () => {
            cancelled = true
        }
    }, [])

    async function handlePair() {
        if (pairing) return;

        if (paired) {
            await requestPair();
            return;
        }

        try {
            setPairing(true);

            const code = await requestPair();

            setPairCode(code);
            setPairOpen(true);
        } catch (error) {
            console.error("Failed to request pair:", error);
        } finally {
            setPairing(false);
        }
    }

    async function handleConfirm() {
        if (!pairCode) return;
        confirmPair(pairCode)
        setPairOpen(false)
    }

    return (
        <>
            <button
                type="button"
                disabled={pairing}
                className={`bg-(--scheme-color-001) w-12 h-12 rounded-full fixed bottom-5 left-5${paired ? " border-2 border-green-500" : " border-2 border-red-500"}${running ? "" : " opacity-0"}`}
                onClick={handlePair}
            >
                <div className="flex items-center justify-center">
                    <span className="text-white text-2xl font-black">
                        {pairing ? "..." : "B"}
                    </span>
                </div>
            </button>

            {pairCode && <PairRequest pairCode={pairCode} open={pairOpen} onConfirm={handleConfirm} onCancel={() => setPairOpen(false)} />}
        </>
    );
}