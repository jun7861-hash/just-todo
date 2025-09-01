import { useState, useEffect } from 'react';
import type { Todo } from '../types/todo';
import { X, Edit2, Save, Clock, Star } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore();

  // Sync editText with todo.text when todo changes
  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  const handleSave = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-accent-bar"></div>
      <div className="todo-content">
        <div className="todo-checkbox-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="todo-checkbox"
          />
        </div>

        <div className="todo-text-container">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleSave}
              className="edit-input"
              autoFocus
            />
          ) : (
            <div>
              <span
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
              >
                {todo.text}
              </span>
              <div className="todo-meta">
                <div className="todo-date">
                  <Clock size={12} />
                  {formatDate(todo.createdAt)}
                </div>
                {!todo.completed && (
                  <div className="todo-status">
                    <Star className="star-icon" size={12} />
                    <span>Active</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="todo-actions">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="action-button edit-button"
              title="Edit todo"
            >
              <Edit2 size={18} />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="action-button save-button"
              title="Save changes"
            >
              <Save size={18} />
            </button>
          )}

          <button
            onClick={() => deleteTodo(todo.id)}
            className="action-button delete-button"
            title="Delete todo"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
