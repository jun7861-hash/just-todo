import { useState } from 'react';
import { Plus, Sparkles, Zap } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

export const TodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-container">
        <div className="input-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="🌟 What magical task shall we accomplish today?"
            className="todo-input"
          />
          {text.trim() && (
            <div className="input-icons">
              <Sparkles className="sparkle-icon" size={20} />
              <Zap className="zap-icon" size={16} />
            </div>
          )}
          <div className="input-overlay"></div>
        </div>
        <button type="submit" disabled={!text.trim()} className="add-button">
          <Plus size={24} />
          <span>Create</span>
        </button>
      </div>
    </form>
  );
};
