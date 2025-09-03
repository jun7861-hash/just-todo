import { useState, useEffect } from 'react';
import type { Todo } from '../types/todo';
import { X, Edit2, Save, Clock, Star } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

interface TodoItemProps {
  todo: Todo;
}

/**
 * TodoItem Component
 *
 * Renders a single todo item with edit, toggle, and delete functionality.
 * Supports inline editing with keyboard shortcuts (Enter to save, Escape to cancel).
 * Shows creation date and status indicators.
 */
export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  // Local state for editing mode and edit text
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // Get todo actions from the store
  const { toggleTodo, deleteTodo, updateTodo } = useTodoStore();

  // Sync editText with todo.text when todo changes (e.g., from external updates)
  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  /**
   * Saves the edited todo text
   * Only saves if the text is not empty after trimming
   */
  const handleSave = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  /**
   * Cancels editing and reverts to original text
   */
  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  /**
   * Handles keyboard events during editing
   * Enter: Save changes
   * Escape: Cancel editing
   * @param e - Keyboard event
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  /**
   * Formats the creation date for display
   * Shows month, day, hour, and minute
   * @param date - Date to format
   * @returns Formatted date string
   */
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
      {/* Visual accent bar for completed todos */}
      <div className="todo-accent-bar"></div>

      <div className="todo-content">
        {/* Checkbox for toggling completion status */}
        <div className="todo-checkbox-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="todo-checkbox"
          />
        </div>

        {/* Todo text content and metadata */}
        <div className="todo-text-container">
          {isEditing ? (
            // Edit mode: Input field for editing
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
            // Display mode: Show text and metadata
            <div>
              <span
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
              >
                {todo.text}
              </span>
              {/* Metadata: Creation date and status */}
              <div className="todo-meta">
                <div className="todo-date">
                  <Clock size={12} />
                  {formatDate(todo.createdAt)}
                </div>
                {/* Show active status only for incomplete todos */}
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

        {/* Action buttons: Edit/Save and Delete */}
        <div className="todo-actions">
          {!isEditing ? (
            // Edit button - switches to edit mode
            <button
              onClick={() => setIsEditing(true)}
              className="action-button edit-button"
              title="Edit todo"
            >
              <Edit2 size={18} />
            </button>
          ) : (
            // Save button - saves changes
            <button
              onClick={handleSave}
              className="action-button save-button"
              title="Save changes"
            >
              <Save size={18} />
            </button>
          )}

          {/* Delete button - removes the todo */}
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
