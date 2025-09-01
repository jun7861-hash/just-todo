import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo, FilterType } from '../types/todo';
import { generateId, filterTodos, getTodoStats } from '../utils/helpers';

interface TodoState {
  // State
  todos: Todo[];
  searchQuery: string;
  currentFilter: FilterType;

  // Actions
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  clearCompleted: () => void;
  setSearchQuery: (query: string) => void;
  setCurrentFilter: (filter: FilterType) => void;
}

// Helper function to convert string dates to Date objects
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

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      // Initial state
      todos: [],
      searchQuery: '',
      currentFilter: 'all',

      // Actions
      addTodo: (text: string) => {
        const newTodo: Todo = {
          id: generateId(),
          text,
          completed: false,
          createdAt: new Date(),
        };
        set((state) => ({
          todos: [newTodo, ...state.todos],
        }));
      },

      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      updateTodo: (id: string, text: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        }));
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      setCurrentFilter: (filter: FilterType) => {
        set({ currentFilter: filter });
      },
    }),
    {
      name: 'todo-storage', // localStorage key
      partialize: (state) => ({ todos: state.todos }), // Only persist todos
      onRehydrateStorage: () => (state) => {
        // Convert string dates to Date objects when loading from localStorage
        if (state?.todos) {
          state.todos = migrateTodos(state.todos);
        }
      },
    }
  )
);

// Selector functions for computed values
export const useFilteredTodos = () => {
  const { todos, currentFilter, searchQuery } = useTodoStore();
  return filterTodos(todos, currentFilter, searchQuery);
};

export const useTodoStats = () => {
  const { todos } = useTodoStore();
  return getTodoStats(todos);
};
