import { TodoItem } from './TodoItem';
import { Pagination } from './Pagination';
import { ClipboardList, Sparkles, Rainbow, Star } from 'lucide-react';
import { usePaginatedTodos } from '../store/todoStore';

/**
 * TodoList Component
 *
 * Displays the list of todos with pagination support.
 * Shows an empty state when no todos exist, or renders the paginated todo list.
 * Integrates with the pagination component for navigation.
 */
export const TodoList: React.FC = () => {
  // Get paginated todos from the store (automatically handles filtering and pagination)
  const { paginatedTodos } = usePaginatedTodos();

  // Show empty state when no todos exist
  if (paginatedTodos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          {/* Decorative empty state with animated icons */}
          <div className="empty-state-icon">
            <div className="empty-state-glow"></div>
            <ClipboardList className="clipboard-icon" size={80} />
            <div className="empty-state-sparkles">
              <Sparkles className="sparkle-icon" size={32} />
            </div>
            <div className="empty-state-rainbow">
              <Rainbow className="rainbow-icon" size={28} />
            </div>
            <div className="empty-state-star">
              <Star className="star-icon" size={24} />
            </div>
          </div>
          {/* Empty state text with call to action */}
          <div className="empty-state-text">
            <h3 className="empty-state-title">No tasks yet!</h3>
            <p className="empty-state-description">
              Ready to create something amazing? Add your first task above and
              let's make magic happen! ✨
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      {/* Todo List with staggered animation delays */}
      <div className="todo-list">
        {paginatedTodos.map((todo, index) => (
          <div
            key={todo.id}
            className="todo-item-wrapper"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <TodoItem todo={todo} />
          </div>
        ))}
      </div>

      {/* Pagination Component - Only shows when multiple pages exist */}
      <Pagination />
    </div>
  );
};
