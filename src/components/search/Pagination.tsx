import DefaultPage from "@/lib/default";

export type PaginationInput<T> = {
    manager: DefaultPage<T>
}

export default function Pagination<T>({ manager }: PaginationInput<T>) {
    const currentPage = manager.index;
    const totalPages = manager.pages.length;

    const getVisiblePages = () => {
        const visiblePages: number[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

            for (let i = startPage; i <= endPage; i++) {
                visiblePages.push(i);
            }
        }
        return visiblePages;
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            manager.setIndex(newPage);
        }
    };

    return (
        <nav className='pagination my-4'>
            <div className='d-flex justify-content-center'>
                <button
                    type='button'
                    className='btn'
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                >
                    <i className="fa-solid fa-angles-left" />
                </button>

                <button
                    type='button'
                    className='btn'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <i className="fa-solid fa-angle-left" />
                </button>

                <div className="mx-1" />

                {getVisiblePages().map(pageNumber => (
                    <button
                        key={pageNumber}
                        className={`btn ${currentPage === pageNumber ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}

                <div className="mx-1" />

                <button
                    type='button'
                    className='btn'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <i className="fa-solid fa-angle-right" />
                </button>

                <button
                    type='button'
                    className='btn'
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    <i className="fa-solid fa-angles-right" />
                </button>
            </div>
        </nav>
    );
}