import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { useTodoStore, usePaginatedTodos } from '../store/todoStore';

/**
 * Pagination Component
 *
 * Provides pagination controls for the todo list with configurable items per page.
 * Shows page navigation, items per page selector, and current page information.
 * Only renders when there are multiple pages to display.
 */
export const Pagination: React.FC = () => {
  // Get pagination state and actions from the store
  const { pagination, setCurrentPage, setItemsPerPage } = useTodoStore();

  // Get total pages from the paginated todos hook
  const { totalPages } = usePaginatedTodos();

  /**
   * Handles page navigation
   * Validates the page number is within valid range before updating
   * @param page - Target page number
   */
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /**
   * Handles items per page changes
   * Resets to first page when changing items per page for better UX
   * @param itemsPerPage - New number of items per page
   */
  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  /**
   * Generates an array of page numbers to display
   * Shows up to 5 page numbers with smart positioning around current page
   * @returns Array of page numbers to display
   */
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination: show pages around current page
      const start = Math.max(1, pagination.currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <div className="pagination-controls">
        {/* Items per page selector */}
        <div className="items-per-page">
          <label htmlFor="itemsPerPage">Items per page:</label>
          <select
            id="itemsPerPage"
            value={pagination.itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            className="items-per-page-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Page navigation controls */}
        <div className="page-navigation">
          {/* First page button */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={pagination.currentPage === 1}
            className="pagination-button"
            title="First page"
          >
            <ChevronsLeft size={16} />
          </button>

          {/* Previous page button */}
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="pagination-button"
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page number buttons */}
          {generatePageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-button page-number ${
                page === pagination.currentPage ? 'active' : ''
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next page button */}
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === totalPages}
            className="pagination-button"
            title="Next page"
          >
            <ChevronRight size={16} />
          </button>

          {/* Last page button */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={pagination.currentPage === totalPages}
            className="pagination-button"
            title="Last page"
          >
            <ChevronsRight size={16} />
          </button>
        </div>

        {/* Current page information */}
        <div className="page-info">
          Page {pagination.currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
};
