import { RotateCcw } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

/**
 * UndoDeleteNotification Component
 *
 * Displays a notification when a todo is deleted, allowing users to undo the action.
 * Shows the deleted todo text and provides an undo button.
 * Only renders when there are deleted todos to restore.
 * Positioned as a fixed notification at the bottom of the screen.
 */
export const UndoDeleteNotification: React.FC = () => {
  // Get deleted todos and undo action from the store
  const { deletedTodos, undoDelete } = useTodoStore();

  // Don't render if no todos have been deleted
  if (deletedTodos.length === 0) {
    return null;
  }

  // Get the most recently deleted todo (LIFO - Last In, First Out)
  const latestDeleted = deletedTodos[0];

  return (
    <div className="undo-notification">
      <div className="undo-notification-content">
        {/* Deleted todo information */}
        <div className="undo-notification-text">
          <span className="undo-icon">🗑️</span>
          <span>"{latestDeleted.todo.text}" was deleted</span>
        </div>

        {/* Undo button to restore the deleted todo */}
        <button
          onClick={undoDelete}
          className="undo-button"
          title="Undo delete"
        >
          <RotateCcw size={16} />
          <span>Undo</span>
        </button>
      </div>
    </div>
  );
};
