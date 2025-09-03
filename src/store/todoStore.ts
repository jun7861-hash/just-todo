import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Todo,
  FilterType,
  DateFilter,
  PaginationState,
  DeletedTodo,
} from '../types/todo';
import {
  generateId,
  filterTodos,
  filterTodosByDate,
  getTodoStats,
  getPaginatedTodos,
} from '../utils/helpers';

/**
 * TodoStore State Interface
 *
 * Defines the complete state structure for the todo application.
 * Includes todos, deleted todos, filters, search, pagination, and all actions.
 */
interface TodoState {
  // Core Data
  todos: Todo[]; // Array of all todos
  deletedTodos: DeletedTodo[]; // Stack of recently deleted todos for undo functionality

  // Filtering and Search
  searchQuery: string; // Current search term
  currentFilter: FilterType; // Current status filter (all/active/completed)
  dateFilter: DateFilter; // Date range and specific date filters

  // Pagination
  pagination: PaginationState; // Current page, items per page, and total pages

  // Actions
  addTodo: (text: string) => void; // Create new todo
  toggleTodo: (id: string) => void; // Toggle todo completion
  deleteTodo: (id: string) => void; // Delete todo (stores for undo)
  undoDelete: () => void; // Restore most recently deleted todo
  updateTodo: (id: string, text: string) => void; // Edit todo text
  clearCompleted: () => void; // Remove all completed todos

  // Filter Actions
  setSearchQuery: (query: string) => void; // Update search term
  setCurrentFilter: (filter: FilterType) => void; // Update status filter
  setDateFilter: (filter: DateFilter) => void; // Update date filter
  clearDateFilter: () => void; // Clear all date filters

  // Pagination Actions
  setCurrentPage: (page: number) => void; // Navigate to specific page
  setItemsPerPage: (itemsPerPage: number) => void; // Change items per page
}

/**
 * Migration Helper Function
 *
 * Converts string dates to Date objects when loading from localStorage.
 * Ensures backward compatibility with older stored data.
 * @param todos - Array of todos with potentially string dates
 * @returns Array of todos with proper Date objects
 */
const migrateTodos = (
  todos: {
    id: string;
    text: string;
    completed: boolean;
    createdAt: string | Date;
  }[]
): Todo[] => {
  return todos.map((todo) => ({
    ...todo,
    createdAt:
      typeof todo.createdAt === 'string'
        ? new Date(todo.createdAt)
        : todo.createdAt,
  }));
};

/**
 * Todo Store
 *
 * Zustand store that manages all todo application state.
 * Features persistence, undo functionality, and automatic pagination management.
 * All actions automatically reset pagination to page 1 when filters change.
 */
export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      // Initial State
      todos: [],
      deletedTodos: [],
      searchQuery: '',
      currentFilter: 'all',
      dateFilter: {
        startDate: null,
        endDate: null,
        selectedDate: null,
      },
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalPages: 1,
      },

      // Core Todo Actions

      /**
       * Adds a new todo to the beginning of the list
       * Automatically resets pagination to page 1 for better UX
       * @param text - The todo text content
       */
      addTodo: (text: string) => {
        const newTodo: Todo = {
          id: generateId(),
          text,
          completed: false,
          createdAt: new Date(),
        };
        set((state) => ({
          todos: [newTodo, ...state.todos],
          pagination: {
            ...state.pagination,
            currentPage: 1, // Reset to first page when adding new todo
          },
        }));
      },

      /**
       * Toggles the completion status of a todo
       * @param id - The todo ID to toggle
       */
      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      /**
       * Deletes a todo and stores it for potential undo
       * Automatically adjusts pagination if current page becomes invalid
       * @param id - The todo ID to delete
       */
      deleteTodo: (id: string) => {
        const state = get();
        const todoToDelete = state.todos.find((todo) => todo.id === id);

        if (todoToDelete) {
          const deletedTodo: DeletedTodo = {
            todo: todoToDelete,
            deletedAt: new Date(),
          };

          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
            deletedTodos: [deletedTodo, ...state.deletedTodos],
            pagination: {
              ...state.pagination,
              currentPage: Math.min(
                state.pagination.currentPage,
                Math.ceil(
                  (state.todos.length - 1) / state.pagination.itemsPerPage
                )
              ),
            },
          }));
        }
      },

      /**
       * Restores the most recently deleted todo
       * Implements LIFO (Last In, First Out) undo behavior
       * Automatically resets pagination to page 1
       */
      undoDelete: () => {
        const state = get();
        if (state.deletedTodos.length > 0) {
          const [latestDeleted, ...remainingDeleted] = state.deletedTodos;

          set((state) => ({
            todos: [latestDeleted.todo, ...state.todos],
            deletedTodos: remainingDeleted,
            pagination: {
              ...state.pagination,
              currentPage: 1, // Reset to first page when undoing
            },
          }));
        }
      },

      /**
       * Updates the text content of an existing todo
       * @param id - The todo ID to update
       * @param text - The new text content
       */
      updateTodo: (id: string, text: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        }));
      },

      /**
       * Removes all completed todos from the list
       * Automatically resets pagination to page 1
       */
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
          pagination: {
            ...state.pagination,
            currentPage: 1, // Reset to first page when clearing completed
          },
        }));
      },

      // Filter Actions (all reset pagination to page 1)

      /**
       * Updates the search query
       * Resets pagination to page 1 for better UX
       * @param query - The new search term
       */
      setSearchQuery: (query: string) => {
        set({
          searchQuery: query,
          pagination: { ...get().pagination, currentPage: 1 }, // Reset to first page when searching
        });
      },

      /**
       * Updates the status filter (all/active/completed)
       * Resets pagination to page 1
       * @param filter - The new filter type
       */
      setCurrentFilter: (filter: FilterType) => {
        set({
          currentFilter: filter,
          pagination: { ...get().pagination, currentPage: 1 }, // Reset to first page when changing filter
        });
      },

      /**
       * Updates the date filter settings
       * Resets pagination to page 1
       * @param filter - The new date filter configuration
       */
      setDateFilter: (filter: DateFilter) => {
        set({
          dateFilter: filter,
          pagination: { ...get().pagination, currentPage: 1 }, // Reset to first page when changing date filter
        });
      },

      /**
       * Clears all date filters
       * Resets pagination to page 1
       */
      clearDateFilter: () => {
        set({
          dateFilter: {
            startDate: null,
            endDate: null,
            selectedDate: null,
          },
          pagination: { ...get().pagination, currentPage: 1 }, // Reset to first page when clearing date filter
        });
      },

      // Pagination Actions

      /**
       * Navigates to a specific page
       * @param page - The target page number
       */
      setCurrentPage: (page: number) => {
        set((state) => ({
          pagination: {
            ...state.pagination,
            currentPage: page,
          },
        }));
      },

      /**
       * Changes the number of items displayed per page
       * Automatically resets to page 1 for better UX
       * @param itemsPerPage - The new items per page count
       */
      setItemsPerPage: (itemsPerPage: number) => {
        set((state) => ({
          pagination: {
            ...state.pagination,
            itemsPerPage,
            currentPage: 1, // Reset to first page when changing items per page
          },
        }));
      },
    }),
    {
      name: 'todo-storage', // localStorage key
      partialize: (state) => ({
        todos: state.todos,
        deletedTodos: state.deletedTodos,
        pagination: state.pagination,
      }), // Persist todos, deleted todos, and pagination
      onRehydrateStorage: () => (state) => {
        // Convert string dates to Date objects when loading from localStorage
        if (state?.todos) {
          state.todos = migrateTodos(state.todos);
        }
        if (state?.deletedTodos) {
          state.deletedTodos = state.deletedTodos.map((deleted) => ({
            ...deleted,
            todo: {
              ...deleted.todo,
              createdAt:
                typeof deleted.todo.createdAt === 'string'
                  ? new Date(deleted.todo.createdAt)
                  : deleted.todo.createdAt,
            },
            deletedAt:
              typeof deleted.deletedAt === 'string'
                ? new Date(deleted.deletedAt)
                : deleted.deletedAt,
          }));
        }
      },
    }
  )
);

// Selector Functions for Computed Values

/**
 * Hook to get filtered todos based on current filters and search
 * Applies status filter, search filter, and date filter in sequence
 * @returns Array of filtered todos
 */
export const useFilteredTodos = () => {
  const { todos, currentFilter, searchQuery, dateFilter } = useTodoStore();
  let filtered = filterTodos(todos, currentFilter, searchQuery);
  filtered = filterTodosByDate(filtered, dateFilter);
  return filtered;
};

/**
 * Hook to get paginated todos based on current filters and pagination
 * Automatically calculates total pages and current page items
 * @returns Object with paginated todos and total pages
 */
export const usePaginatedTodos = () => {
  const { pagination } = useTodoStore();
  const filteredTodos = useFilteredTodos();
  const { paginatedTodos, totalPages } = getPaginatedTodos(
    filteredTodos,
    pagination.currentPage,
    pagination.itemsPerPage
  );

  return { paginatedTodos, totalPages };
};

/**
 * Hook to get todo statistics (total, active, completed counts)
 * @returns Object with todo counts
 */
export const useTodoStats = () => {
  const { todos } = useTodoStore();
  return getTodoStats(todos);
};
