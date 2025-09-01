import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';

function App() {
  return (
    <div className="app-container">
      {/* Background decorative elements */}
      <div className="bg-decoration">
        <div className="bg-orb-1"></div>
        <div className="bg-orb-2"></div>
        <div className="bg-orb-3"></div>
      </div>

      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1 className="title">✨ Elegant Todo</h1>
          <p className="subtitle">
            Transform your productivity with style and grace
          </p>
        </div>

        {/* Main Card */}
        <div className="main-card">
          <TodoForm />
          <TodoFilters />
          <TodoList />
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-content">
            <div className="footer-dot"></div>
            <p className="footer-text">Crafted with React, TypeScript & CSS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
