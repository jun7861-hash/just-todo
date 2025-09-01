import type { Todo, FilterType } from '../types/todo';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const filterTodos = (
  todos: Todo[],
  filter: FilterType,
  searchQuery: string
): Todo[] => {
  let filtered = todos;

  // Apply search filter
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

export const getTodoStats = (todos: Todo[]) => {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const active = total - completed;

  return { total, completed, active };
};
