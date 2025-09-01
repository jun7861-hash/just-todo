# Todo App

A modern, feature-rich Todo application built with React, TypeScript, and Tailwind CSS.

## Features

### Core Features ✅

- **Add a new todo** - Create new todos with a clean input form
- **Mark todo as complete/incomplete** - Toggle todo completion status with visual feedback
- **Update Todo Description** - Edit existing todos inline with keyboard shortcuts (Enter to save, Escape to cancel)
- **Delete a todo** - Remove todos with a single click
- **Search Functionality** - Search todos by name with real-time filtering
- **Filter Functionality** - Filter by All, Active, or Completed todos
- **Combined Search & Filter** - Search and filter work together seamlessly

### Extras ✅

- **localStorage Persistence** - Todos are automatically saved and persist after page refresh
- **Todo Statistics** - Real-time count of total, active, and completed todos
- **Clear Completed** - Bulk remove all completed todos with one click

## Technical Stack

- **React 19** - Latest React with modern hooks and patterns
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for modern styling
- **Lucide React** - Beautiful, customizable icons
- **Vite** - Fast build tool and development server

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── TodoForm.tsx    # Form for adding new todos
│   ├── TodoItem.tsx    # Individual todo item component
│   ├── TodoList.tsx    # List container for todos
│   └── TodoFilters.tsx # Search and filter controls
├── types/              # TypeScript type definitions
│   └── todo.ts         # Todo and FilterType interfaces
├── utils/              # Utility functions
│   ├── helpers.ts      # Helper functions for filtering and stats
│   └── localStorage.ts # localStorage operations
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended for optimal performance)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd just-todo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Adding Todos

- Type your todo in the input field and press Enter or click "Add"
- New todos appear at the top of the list

### Managing Todos

- **Complete/Incomplete**: Click the circular checkbox next to any todo
- **Edit**: Click the edit icon (pencil) to modify the todo text
  - Press Enter to save changes
  - Press Escape to cancel editing
- **Delete**: Click the X icon to remove a todo

### Search & Filter

- **Search**: Use the search bar to find todos by name
- **Filter**: Click "All", "Active", or "Completed" to filter by status
- **Combined**: Search and filter work together - search within filtered results

### Statistics

- View real-time counts of total, active, and completed todos
- Click "Clear completed" to remove all completed todos at once

## Code Quality

### React Best Practices

- ✅ Functional components with hooks
- ✅ Proper state management with useState and useEffect
- ✅ Component composition and reusability
- ✅ Clean separation of concerns
- ✅ TypeScript for type safety

### Code Structure

- ✅ Modular component architecture
- ✅ Utility functions for business logic
- ✅ Consistent naming conventions
- ✅ Proper TypeScript interfaces
- ✅ Error handling for localStorage operations

### Performance

- ✅ Efficient filtering and search algorithms
- ✅ Minimal re-renders with proper state updates
- ✅ Optimized localStorage operations
- ✅ Responsive design with Tailwind CSS

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).
