import type { Todo, FilterType, DateFilter } from '../types/todo';

/**
 * Generates a unique ID for new todos
 * Combines timestamp and random string for uniqueness
 * @returns Unique string ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Filters todos based on status filter and search query
 * Applies filters in sequence: search first, then status
 * @param todos - Array of todos to filter
 * @param filter - Status filter type (all/active/completed)
 * @param searchQuery - Search term to filter by
 * @returns Filtered array of todos
 */
export const filterTodos = (
  todos: Todo[],
  filter: FilterType,
  searchQuery: string
): Todo[] => {
  let filtered = todos;

  // Apply search filter first (case-insensitive)
  if (searchQuery.trim()) {
    filtered = filtered.filter((todo) =>
      todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply status filter
  switch (filter) {
    case 'active':
      filtered = filtered.filter((todo) => !todo.completed);
      break;
    case 'completed':
      filtered = filtered.filter((todo) => todo.completed);
      break;
    default:
      // 'all' - no additional filtering needed
      break;
  }

  return filtered;
};

/**
 * Filters todos based on date criteria
 * Supports specific date, date ranges, and start/end dates
 * Compares dates at day level (ignores time)
 * @param todos - Array of todos to filter
 * @param dateFilter - Date filter configuration
 * @returns Filtered array of todos
 */
export const filterTodosByDate = (
  todos: Todo[],
  dateFilter: DateFilter
): Todo[] => {
  // Return all todos if no date filter is set
  if (
    !dateFilter.selectedDate &&
    !dateFilter.startDate &&
    !dateFilter.endDate
  ) {
    return todos;
  }

  return todos.filter((todo) => {
    const todoDate = new Date(todo.createdAt);
    todoDate.setHours(0, 0, 0, 0); // Normalize to start of day

    // Filter by specific date (exact match)
    if (dateFilter.selectedDate) {
      const selectedDate = new Date(dateFilter.selectedDate);
      selectedDate.setHours(0, 0, 0, 0);
      return todoDate.getTime() === selectedDate.getTime();
    }

    // Filter by date range (inclusive)
    if (dateFilter.startDate && dateFilter.endDate) {
      const startDate = new Date(dateFilter.startDate);
      const endDate = new Date(dateFilter.endDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999); // End of day
      return todoDate >= startDate && todoDate <= endDate;
    }

    // Filter by start date only (from this date onwards)
    if (dateFilter.startDate) {
      const startDate = new Date(dateFilter.startDate);
      startDate.setHours(0, 0, 0, 0);
      return todoDate >= startDate;
    }

    // Filter by end date only (up to this date)
    if (dateFilter.endDate) {
      const endDate = new Date(dateFilter.endDate);
      endDate.setHours(23, 59, 59, 999); // End of day
      return todoDate <= endDate;
    }

    return true;
  });
};

/**
 * Paginates an array of todos
 * Calculates total pages and returns items for current page
 * @param todos - Array of todos to paginate
 * @param currentPage - Current page number (1-based)
 * @param itemsPerPage - Number of items per page
 * @returns Object with paginated todos and total pages
 */
export const getPaginatedTodos = (
  todos: Todo[],
  currentPage: number,
  itemsPerPage: number
): { paginatedTodos: Todo[]; totalPages: number } => {
  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTodos = todos.slice(startIndex, endIndex);

  return { paginatedTodos, totalPages };
};

/**
 * Calculates statistics for a collection of todos
 * Provides counts for total, completed, and active todos
 * @param todos - Array of todos to analyze
 * @returns Object with todo counts
 */
export const getTodoStats = (todos: Todo[]) => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  return { total, completed, active };
};
