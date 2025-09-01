import {
  Search,
  Filter,
  Sparkles,
  Target,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { useTodoStore, useTodoStats } from '../store/todoStore';

export const TodoFilters: React.FC = () => {
  const {
    searchQuery,
    currentFilter,
    setSearchQuery,
    setCurrentFilter,
    clearCompleted,
  } = useTodoStore();

  const stats = useTodoStats();

  const filterButtons = [
    {
      value: 'all' as const,
      label: 'All Tasks',
      count: stats.total,
      icon: Target,
    },
    {
      value: 'active' as const,
      label: 'Active',
      count: stats.active,
      icon: Clock,
    },
    {
      value: 'completed' as const,
      label: 'Completed',
      count: stats.completed,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="todo-filters">
      {/* Search */}
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search your magical tasks..."
          className="search-input"
        />
        <div className="search-overlay"></div>
      </div>

      {/* Filter buttons */}
      <div className="filter-section">
        <div className="filter-header">
          <Filter size={18} className="filter-icon" />
          <span>Filter by status:</span>
          <Sparkles size={16} className="sparkle-icon" />
        </div>
        <div className="filter-buttons">
          {filterButtons.map(({ value, label, count, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setCurrentFilter(value)}
              className={`filter-button ${
                currentFilter === value ? 'active' : ''
              }`}
            >
              <Icon size={18} />
              <span className="filter-label">{label}</span>
              <span
                className={`filter-badge ${
                  currentFilter === value ? 'active' : ''
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear completed button */}
      {stats.completed > 0 && (
        <div className="clear-completed">
          <button onClick={clearCompleted} className="clear-button">
            🗑️ Clear completed ({stats.completed})
          </button>
        </div>
      )}
    </div>
  );
};
