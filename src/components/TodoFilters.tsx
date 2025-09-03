import {
  Search,
  Filter,
  Sparkles,
  Target,
  CheckCircle,
  Clock,
  X,
} from 'lucide-react';
import { useTodoStore, useTodoStats } from '../store/todoStore';

/**
 * TodoFilters Component
 *
 * Provides filtering and search functionality for the todo list.
 * Includes search input, date filtering, status filtering, and clear completed actions.
 * All filters work together and automatically reset pagination when changed.
 */
export const TodoFilters: React.FC = () => {
  // Get filter state and actions from the todo store
  const {
    searchQuery,
    currentFilter,
    dateFilter,
    setSearchQuery,
    setCurrentFilter,
    setDateFilter,
    clearDateFilter,
    clearCompleted,
  } = useTodoStore();

  // Get computed statistics for display in filter buttons
  const stats = useTodoStats();

  // Define filter button configurations with icons, labels, and counts
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

  /**
   * Handles date filter changes from the date input
   * Converts the input value to a Date object and updates the filter
   * @param e - Change event from the date input
   */
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value ? new Date(e.target.value) : null;
    setDateFilter({
      startDate: null,
      endDate: null,
      selectedDate,
    });
  };

  // Check if any date filter is currently active
  const hasActiveDateFilter =
    dateFilter.selectedDate || dateFilter.startDate || dateFilter.endDate;

  return (
    <div className="todo-filters">
      {/* Search and Date Filter Row - Layout: 75% search, 25% date filter */}
      <div className="search-date-row">
        {/* Search Input Section */}
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

        {/* Compact Date Filter Section */}
        <div className="date-filter-compact">
          <div className="date-filter-controls">
            <input
              type="date"
              value={
                dateFilter.selectedDate
                  ? dateFilter.selectedDate.toISOString().split('T')[0]
                  : ''
              }
              onChange={handleDateChange}
              className="date-input"
              placeholder="Select a date"
            />
            {/* Clear Date Filter Button - Only shows when filter is active */}
            {hasActiveDateFilter && (
              <button
                onClick={clearDateFilter}
                className="clear-date-button"
                title="Clear date filter"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Date Filter Display - Shows current filter status */}
      {hasActiveDateFilter && (
        <div className="active-date-filter">
          <span className="active-filter-label">
            📅 &nbsp; Showing tasks for:{' '}
            {dateFilter.selectedDate?.toLocaleDateString()}
          </span>
        </div>
      )}

      {/* Status Filter Buttons - Filter by completion status */}
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

      {/* Clear Completed Button - Only shows when there are completed todos */}
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
