import Link from 'next/link';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function BlogPagination({
  currentPage,
  totalPages,
}: BlogPaginationProps) {
  const getPageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Blog pagination">
      <Link
        href={`/blog?page=${currentPage - 1}`}
        className={`px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 transition-colors ${
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : 'hover:bg-zinc-50'
        }`}
        aria-disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Previous
      </Link>

      {pageNumbers.map((pageNum, idx) =>
        pageNum === '...' ? (
          <span key={`dots-${idx}`} className="px-3 py-2 text-zinc-700">
            ...
          </span>
        ) : (
          <Link
            key={pageNum}
            href={`/blog?page=${pageNum}`}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentPage === pageNum
                ? 'bg-zinc-800 text-white'
                : 'border border-zinc-300 text-zinc-700 hover:bg-zinc-50'
            }`}
            aria-label={`Page ${pageNum}`}
            aria-current={currentPage === pageNum ? 'page' : undefined}
          >
            {pageNum}
          </Link>
        )
      )}

      <Link
        href={`/blog?page=${currentPage + 1}`}
        className={`px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 transition-colors ${
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : 'hover:bg-zinc-50'
        }`}
        aria-disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </Link>
    </nav>
  );
}
