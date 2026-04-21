'use client'

import { ReactNode } from "react"

type Pagination = {
    page: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: Pagination) {
    function getVisiblePages(currentPage: number, totalPages: number, window = 5) {
        const half = Math.floor(window / 2)

        let start = currentPage - half
        let end = currentPage + half

        if (start < 1) {
            start = 1
            end = Math.min(window, totalPages)
        }

        if (end > totalPages) {
            end = totalPages
            start = Math.max(totalPages - window + 1, 1)
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }

    const pages = getVisiblePages(page, totalPages)

    function Button({ children, onClick, disabled, active }: { children: ReactNode, onClick: () => void, disabled?: boolean, active?: boolean }) {
        return (
            <button
                type="button"
                className={`w-8 h-8 rounded disabled:opacity-50 cursor-pointer ${active ? "border border-(--scheme-color-001) bg-(--scheme-color-001)/50 text-(--scheme-color-001) font-bold" : "bg-(--scheme-color-secondary)"}`}
                onClick={() => onClick()}
                disabled={disabled ?? false}
            >
                {children}
            </button>
        )
    }

    return (
        <nav className="my-4">
            <div className="flex justify-center items-center gap-2">
                <Button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                >
                    {'<'}
                </Button>
                {pages.map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        active={page === pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </Button>
                ))}
                <Button
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    {'>'}
                </Button>
            </div>
        </nav>
    )
}