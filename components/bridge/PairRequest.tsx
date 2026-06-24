'use client'

export default function PairRequest({ pairCode, open, onConfirm, onCancel }: { pairCode: String, open: boolean, onConfirm: () => void, onCancel: () => void }) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 md:px-0">
            <div className="max-w-lg rounded-2xl bg-(--background) p-6 shadow-xl border-2 border-(--scheme-color-001)">
                <h2 className="text-xl font-bold text-center">
                    Modustry Bridge
                </h2>

                <p className="mt-3 text-center">
                    Confirm the code on game to pair
                </p>
                <p className="mt-3 text-center">
                    {pairCode}
                </p>

                <div className="flex gap-10">
                    <button
                        onClick={onConfirm}
                        className="mt-5 rounded-lg bg-(--scheme-color-001)/75 border border-(--scheme-color-001) px-4 py-2 text-white"
                    >
                        Confirm
                    </button>

                    <button
                        onClick={onCancel}
                        className="mt-5 rounded-lg bg-(--scheme-color-001)/75 border border-(--scheme-color-001) px-4 py-2 text-white"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}