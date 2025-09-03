import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { UndoDeleteNotification } from './components/UndoDeleteNotification';

/**
 * App Component
 *
 * Main application component that orchestrates the todo app layout.
 * Features a beautiful glassmorphism design with decorative background elements.
 * Organizes components in a logical flow: form → filters → list → notifications.
 */
function App() {
  return (
    <div className="app-container">
      {/* Background decorative elements for visual appeal */}
      <div className="bg-decoration">
        <div className="bg-orb-1"></div>
        <div className="bg-orb-2"></div>
        <div className="bg-orb-3"></div>
      </div>

      <div className="main-content">
        {/* App header with title and subtitle */}
        <div className="header">
          <h1 className="title">✨ Elegant Todo</h1>
          <p className="subtitle">
            Transform your productivity with style and grace
          </p>
        </div>

        {/* Main application card containing all interactive elements */}
        <div className="main-card">
          {/* Todo creation form */}
          <TodoForm />

          {/* Search, filtering, and status controls */}
          <TodoFilters />

          {/* Todo list with pagination */}
          <TodoList />
        </div>

        {/* Undo delete notification - positioned outside main card for overlay effect */}
        <UndoDeleteNotification />

        {/* Footer with technology credits */}
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
