import { useState } from 'react';
import { Plus, Sparkles, Zap } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

/**
 * TodoForm Component
 *
 * Provides a form for creating new todos with real-time validation.
 * Shows decorative icons when text is entered and disables submit when empty.
 * Automatically clears the form after successful submission.
 */
export const TodoForm: React.FC = () => {
  // Local state for the todo text input
  const [text, setText] = useState('');

  // Get the addTodo action from the store
  const addTodo = useTodoStore((state) => state.addTodo);

  /**
   * Handles form submission
   * Prevents default form behavior, validates text, adds todo, and clears form
   * @param e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText(''); // Clear the input after adding todo
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-container">
        {/* Input container with decorative elements */}
        <div className="input-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="🌟 What magical task shall we accomplish today?"
            className="todo-input"
          />

          {/* Decorative icons that appear when text is entered */}
          {text.trim() && (
            <div className="input-icons">
              <Sparkles className="sparkle-icon" size={20} />
              <Zap className="zap-icon" size={16} />
            </div>
          )}

          {/* Visual overlay for enhanced styling */}
          <div className="input-overlay"></div>
        </div>

        {/* Submit button - disabled when no text is entered */}
        <button type="submit" disabled={!text.trim()} className="add-button">
          <Plus size={24} />
          <span>Create</span>
        </button>
      </div>
    </form>
  );
};
