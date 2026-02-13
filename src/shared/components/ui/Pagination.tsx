import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  className?: string;
}

/**
 * Reusable Pagination Component
 * Supports both button-based navigation and page number display
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  showPageNumbers = true,
  maxVisiblePages = 5,
  className = '',
}: PaginationProps) => {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Calculate visible page numbers
  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const firstVisiblePage = visiblePages[0];
  const lastVisiblePage = visiblePages[visiblePages.length - 1];

  const buttonBaseClass =
    'flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Previous Button */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious || isLoading}
        whileHover={{ scale: hasPrevious && !isLoading ? 1.05 : 1 }}
        whileTap={{ scale: hasPrevious && !isLoading ? 0.95 : 1 }}
        className={`${buttonBaseClass} px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 font-medium`}
        aria-label="Previous page"
      >
        <HiChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline ml-1">Previous</span>
      </motion.button>

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="flex items-center gap-1">
          {/* First page + ellipsis */}
          {firstVisiblePage !== undefined && firstVisiblePage > 1 && (
            <>
              <motion.button
                onClick={() => onPageChange(1)}
                disabled={isLoading}
                whileHover={{ scale: !isLoading ? 1.1 : 1 }}
                whileTap={{ scale: !isLoading ? 0.95 : 1 }}
                className={`${buttonBaseClass} w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 font-medium`}
              >
                1
              </motion.button>
              {firstVisiblePage > 2 && (
                <span className="px-2 text-gray-500">...</span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map(page => (
            <motion.button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={isLoading}
              whileHover={{ scale: !isLoading ? 1.1 : 1 }}
              whileTap={{ scale: !isLoading ? 0.95 : 1 }}
              className={`${buttonBaseClass} w-10 h-10 rounded-lg border-2 font-medium ${
                page === currentPage
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900'
              }`}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </motion.button>
          ))}

          {/* Last page + ellipsis */}
          {lastVisiblePage !== undefined && lastVisiblePage < totalPages && (
            <>
              {lastVisiblePage < totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <motion.button
                onClick={() => onPageChange(totalPages)}
                disabled={isLoading}
                whileHover={{ scale: !isLoading ? 1.1 : 1 }}
                whileTap={{ scale: !isLoading ? 0.95 : 1 }}
                className={`${buttonBaseClass} w-10 h-10 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 font-medium`}
              >
                {totalPages}
              </motion.button>
            </>
          )}
        </div>
      )}

      {/* Next Button */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext || isLoading}
        whileHover={{ scale: hasNext && !isLoading ? 1.05 : 1 }}
        whileTap={{ scale: hasNext && !isLoading ? 0.95 : 1 }}
        className={`${buttonBaseClass} px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 font-medium`}
        aria-label="Next page"
      >
        <span className="hidden sm:inline mr-1">Next</span>
        <HiChevronRight className="w-5 h-5" />
      </motion.button>

      {/* Loading indicator */}
      {isLoading && (
        <div className="ml-2">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Pagination;
