/**
 * Core Todo Interface
 *
 * Represents a single todo item with all its properties.
 * Includes unique identifier, text content, completion status, and creation timestamp.
 */
export interface Todo {
  id: string; // Unique identifier for the todo
  text: string; // The todo text content
  completed: boolean; // Whether the todo is completed
  createdAt: Date; // When the todo was created
}

/**
 * Filter Type Union
 *
 * Defines the possible status filter values for the todo list.
 * Used to filter todos by their completion status.
 */
export type FilterType = 'all' | 'active' | 'completed';

/**
 * Pagination State Interface
 *
 * Manages the pagination state for the todo list.
 * Tracks current page, items per page, and calculated total pages.
 */
export interface PaginationState {
  currentPage: number; // Current page number (1-based)
  itemsPerPage: number; // Number of items displayed per page
  totalPages: number; // Total number of pages (calculated)
}

/**
 * Date Filter Interface
 *
 * Configures date-based filtering for todos.
 * Supports specific date selection, date ranges, and start/end date boundaries.
 * All dates are compared at day level (ignoring time).
 */
export interface DateFilter {
  startDate: Date | null; // Start date for range filtering (inclusive)
  endDate: Date | null; // End date for range filtering (inclusive)
  selectedDate: Date | null; // Specific date for exact matching
}

/**
 * Deleted Todo Interface
 *
 * Represents a todo that has been deleted and stored for potential undo.
 * Includes the original todo and when it was deleted.
 * Used to implement the undo delete functionality.
 */
export interface DeletedTodo {
  todo: Todo; // The original todo that was deleted
  deletedAt: Date; // When the todo was deleted
}
