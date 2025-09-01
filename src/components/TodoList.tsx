import { TodoItem } from './TodoItem';
import { ClipboardList, Sparkles, Rainbow, Star } from 'lucide-react';
import { useFilteredTodos } from '../store/todoStore';

export const TodoList: React.FC = () => {
  const filteredTodos = useFilteredTodos();

  if (filteredTodos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
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
    <div className="todo-list">
      {filteredTodos.map((todo, index) => (
        <div
          key={todo.id}
          className="todo-item-wrapper"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
};
