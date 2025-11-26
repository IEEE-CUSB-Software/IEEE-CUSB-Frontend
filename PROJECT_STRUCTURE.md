# IEEE CUSB Frontend - Project Structure

## 📁 Project Organization

```
src/
├── assets/              # Static assets (images, fonts, etc.)
├── constants/           # Application constants
├── features/            # 🎯 FEATURE-BASED MODULES (Self-contained)
│   └── example/
│       ├── components/  # Feature-specific components
│       ├── hooks/       # Feature-specific custom hooks
│       ├── queries/     # Feature-specific React Query hooks
│       ├── store/       # 🆕 Feature-specific Redux store
│       │   ├── exampleSlice.ts  # Feature state, actions, reducers
│       │   └── index.ts         # Feature store exports
│       ├── types/       # Feature-specific TypeScript types
│       ├── utils/       # Feature-specific utility functions
│       ├── mocks/       # Feature-specific MSW handlers
│       └── index.ts     # Feature exports (components, hooks, queries, store, types, utils)
├── mock/                # MSW mock API handlers
│   ├── handlers.ts      # Combined API mock handlers from all features
│   └── browser.ts       # MSW browser setup
├── routing/             # React Router configuration
│   ├── components/      # Layout and routing components
│   ├── pages/           # Page components
│   └── index.tsx        # Router setup
├── shared/              # 🔄 SHARED/CROSS-CUTTING CODE ONLY
│   ├── components/
│   │   ├── generic/     # Generic reusable components
│   │   ├── hoc/         # Higher-Order Components
│   │   └── ui/          # UI components (Button, Input, etc.)
│   ├── hooks/           # Shared custom React hooks (not feature-specific)
│   ├── providers/       # Context providers (Redux, Query, Theme, etc.)
│   ├── store/           # Root Redux store (combines feature stores)
│   │   ├── slices/      # Shared/global Redux slices ONLY (auth, theme, etc.)
│   │   ├── hooks.ts     # Typed Redux hooks (useAppDispatch, useAppSelector)
│   │   └── index.ts     # Store configuration & RootState
│   ├── types/           # Shared TypeScript type definitions
│   └── utils/           # Shared utility functions
├── App.tsx              # Main App component
├── main.tsx             # Application entry point
└── vite-env.d.ts        # Vite type declarations
```

## 🚀 Key Features

### � Tailwind CSS v4.1 with Theme System

**Setup:**

```bash
npm install -D tailwindcss@next @tailwindcss/postcss@next
```

**Configuration:**

```javascript
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // ⚠️ Must use @tailwindcss/postcss, NOT tailwindcss
  },
};
```

```css
/* src/index.css */
@import 'tailwindcss';

@theme {
  /* Light theme colors (hex codes) */
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-card: #f8fafc;
  --color-card-foreground: #0f172a;
  --color-primary: #3b82f6;
  --color-primary-foreground: #ffffff;
  /* ... more colors */
}

@layer base {
  /* Dark theme colors - must be in @layer base, NOT @theme */
  .dark {
    --color-background: #0f172a;
    --color-foreground: #f8fafc;
    --color-card: #1e293b;
    --color-card-foreground: #f8fafc;
    --color-primary: #60a5fa;
    --color-primary-foreground: #0f172a;
    /* ... more colors */
  }
}
```

**⚠️ Important Rules:**

- Use `@tailwindcss/postcss` plugin, NOT the base `tailwindcss` plugin
- `@theme` blocks can ONLY contain custom properties or `@keyframes` - no selectors
- Dark mode colors must be in `@layer base .dark { }` - NOT in a `@theme dark` block
- Use hexadecimal color codes for better compatibility

**Theme Hook:**

```typescript
// src/shared/hooks/useTheme.ts
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { setTheme, selectTheme } from '@/shared/store/slices/uiSlice';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    toggleTheme,
    setTheme: (newTheme: 'light' | 'dark') => dispatch(setTheme(newTheme)),
    isDark: theme === 'dark',
  };
};
```

**Usage in Components:**

```typescript
import { useTheme } from '@/shared/hooks/useTheme';

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="bg-background text-foreground">
      <button
        onClick={toggleTheme}
        className="p-2 rounded bg-primary text-primary-foreground"
      >
        {isDark ? '🌙' : '☀️'} Toggle Theme
      </button>
    </div>
  );
}
```

**Available Theme Colors:**

- `bg-background` / `text-foreground`
- `bg-card` / `text-card-foreground`
- `bg-primary` / `text-primary-foreground`
- `bg-secondary` / `text-secondary-foreground`
- `bg-accent` / `text-accent-foreground`
- `bg-muted` / `text-muted-foreground`
- `border-border`
- `ring-ring`

### �🎯 Feature-Based Architecture

This project follows a **feature-based** (or domain-based) architecture where each feature is self-contained with all its dependencies:

**Complete Feature Structure:**

```
src/features/example/
├── components/          # Feature UI components
├── hooks/              # Feature-specific custom hooks
├── queries/            # React Query hooks for API calls
├── store/              # 🆕 Feature-specific Redux store
│   ├── exampleSlice.ts # State, actions, reducers, selectors
│   └── index.ts        # Store exports
├── types/              # Feature-specific TypeScript types
├── utils/              # Feature-specific utilities
├── mocks/              # MSW handlers for this feature
└── index.ts            # Exports all feature modules
```

**Benefits:**

- ✅ **Encapsulation**: Each feature is independent and self-contained
- ✅ **Scalability**: Easy to add new features without affecting existing ones
- ✅ **Maintainability**: All related code is in one place
- ✅ **Testability**: Features can be tested in isolation
- ✅ **Team collaboration**: Different teams can work on different features

**Shared vs Feature:**

- **Features**: Feature-specific code (components, hooks, queries, store, types, utils)
- **Shared**: Truly shared/cross-cutting code (auth, theme, generic UI components, utilities used across multiple features)

### 🏪 State Management Architecture

**📊 Redux Toolkit (Client/Global State)**

- ✅ For UI state, user preferences, and client-side data
- ✅ **Feature stores**: Each feature has its own `store/` folder with Redux slice
- ✅ **Shared stores**: Global state (auth, theme) in `src/shared/store/slices/`
- ✅ Root store in `src/shared/store/index.ts` combines all feature + shared stores
- ✅ Typed hooks (`useAppDispatch`, `useAppSelector`) in `src/shared/store/hooks.ts`

**🔄 TanStack Query / React Query (Server State)**

- ✅ For API calls, data fetching, and caching
- ✅ **Feature queries**: Each feature has its own `queries/` folder with React Query hooks
- ✅ Automatic background refetching, caching, and synchronization
- ✅ React Query Devtools for debugging

### 🧭 React Router

- ✅ React Router v6 with Data APIs
- ✅ Nested routes with Layout component
- ✅ Type-safe route constants
- ✅ Example pages (Home, About, Dashboard, Profile, 404)
- ✅ Navigation with NavLink and programmatic routing

### Mock Service Worker (MSW)

- ✅ API mocking for development in `src/mock/handlers.ts`
- ✅ Automatic MSW initialization in development mode
- ✅ Examples of GET, POST, PUT, DELETE handlers

### TypeScript

- ✅ Full TypeScript support with strict mode
- ✅ Type-safe Redux hooks
- ✅ Type-safe React Query hooks
- ✅ Common types in `src/shared/types/`

### 📂 Path Aliases

Clean, absolute imports using `@/` alias throughout the entire project.

**Configuration:**

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

```typescript
// vite.config.ts
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Usage Examples:**

```typescript
// ❌ Old way (relative imports)
import { useAppDispatch } from '../../../shared/store/hooks';
import { ExampleFeature } from '../../features/example';
import { Button } from '../../shared/components/ui/Button';

// ✅ New way (path alias)
import { useAppDispatch } from '@/shared/store/hooks';
import { ExampleFeature } from '@/features/example';
import { Button } from '@/shared/components/ui/Button';

// Works from any depth in your project
import { useTheme } from '@/shared/hooks/useTheme';
import { ROUTES } from '@/constants';
import type { User } from '@/shared/types';
```

**Benefits:**

- ✅ No more `../../../` relative path hell
- ✅ Easy refactoring - imports don't break when moving files
- ✅ Clearer code - instantly know if import is internal or external
- ✅ Better IDE autocompletion
- ✅ Consistent import paths across the project

### 🔧 Code Quality & Tooling

**Development Tools:**

- ✅ **TypeScript**: Full strict mode with path aliases
- ✅ **ESLint**: Configured for React and TypeScript
- ✅ **Prettier**: Consistent code formatting
- ✅ **Tailwind CSS v4.1**: Utility-first CSS with dark mode
- ✅ **PostCSS**: Processes Tailwind with `@tailwindcss/postcss`
- ✅ **Vite**: Fast build tool with HMR and path resolution

**Git Hooks (Husky):**

- ✅ **Pre-commit**: Lint-staged (ESLint + Prettier)
- ✅ **Pre-commit**: Type checking (`tsc --noEmit`)
- ✅ **Pre-commit**: Build verification
- ✅ **Commit-msg**: Commitlint for conventional commits

**Editor Configuration:**

- Path alias support with `@/` in VSCode
- Tailwind CSS IntelliSense for autocomplete
- ESLint + Prettier integration
- TypeScript language server

## 📝 Usage Examples

### 🎯 State Management Decision Guide

**Use Redux for CLIENT STATE:**

- ✅ UI state (modals, sidebars, themes)
- ✅ User preferences and settings
- ✅ Selected items, filters, form state
- ✅ Client-side computed data
- ✅ Global app state that isn't from an API

**Use React Query for SERVER STATE:**

- ✅ Data from APIs (users, posts, items)
- ✅ Any server-side data
- ✅ Caching API responses
- ✅ Background data synchronization
- ✅ Optimistic updates

### Using React Query (Server State)

```typescript
import { useItems, useCreateItem } from '@/shared/hooks/queries/useItems';

function ItemsList() {
  // Fetch data from API - automatically cached and refetched
  const { data: items, isLoading, error } = useItems();

  // Mutations for creating/updating/deleting
  const createMutation = useCreateItem();

  const handleCreate = () => {
    createMutation.mutate({
      name: 'New Item',
      description: 'Description'
    }, {
      onSuccess: () => {
        console.log('Item created!');
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {items?.map(item => <p key={item}>{item}</p>)}
      <button
        onClick={handleCreate}
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? 'Creating...' : 'Add Item'}
      </button>
    </div>
  );
}
```

### Creating React Query Hooks

```typescript
// src/shared/hooks/queries/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query keys - centralized for cache management
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
};

// Fetch users
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
  });
};

// Create user mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: { name: string; email: string }) => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (!res.ok) throw new Error('Failed to create');
      return res.json();
    },
    onSuccess: () => {
      // Automatically refetch users list
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
```

### Using Redux (Feature Store)

```typescript
// Import from feature store, not shared store
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  selectItem,
  addToFavorites,
  selectSelectedItem,
  selectFavorites
} from '@/features/example/store'; // 🆕 From feature store

function ExampleComponent() {
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector(selectSelectedItem);
  const favorites = useAppSelector(selectFavorites);

  return (
    <div>
      <button onClick={() => dispatch(selectItem('item-1'))}>
        Select Item 1
      </button>
      <button onClick={() => dispatch(addToFavorites('item-1'))}>
        Add to Favorites
      </button>
      <p>Selected: {selectedItem}</p>
      <p>Favorites: {favorites.join(', ')}</p>
    </div>
  );
}
```

### Creating a New Feature Store

**Step 1: Create the feature slice**

```typescript
// src/features/myFeature/store/myFeatureSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MyFeatureState {
  selectedId: string | null;
  isFilterVisible: boolean;
}

const initialState: MyFeatureState = {
  selectedId: null,
  isFilterVisible: false,
};

const myFeatureSlice = createSlice({
  name: 'myFeature',
  initialState,
  reducers: {
    selectId: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
    toggleFilter: state => {
      state.isFilterVisible = !state.isFilterVisible;
    },
  },
});

export const { selectId, toggleFilter } = myFeatureSlice.actions;
export const myFeatureReducer = myFeatureSlice.reducer;

// Selectors
export const selectSelectedId = (state: { myFeature: MyFeatureState }) =>
  state.myFeature.selectedId;
export const selectIsFilterVisible = (state: { myFeature: MyFeatureState }) =>
  state.myFeature.isFilterVisible;
```

**Step 2: Export from feature store**

```typescript
// src/features/myFeature/store/index.ts
export * from './myFeatureSlice';
```

**Step 3: Add to root store**

```typescript
// src/shared/store/index.ts
import { myFeatureReducer } from '../../features/myFeature/store';

export const store = configureStore({
  reducer: {
    myFeature: myFeatureReducer, // 🆕 Add feature reducer
    example: exampleReducer,
  },
});
```

**Step 4: Export from feature index**

```typescript
// src/features/myFeature/index.ts
export * from './store'; // Export store along with other feature modules
```

### Creating a Shared Redux Slice (Global State Only)

```typescript
// src/shared/store/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  modalOpen: boolean;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
}

const initialState: UiState = {
  modalOpen: false,
  sidebarOpen: true,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: state => {
      state.modalOpen = true;
    },
    closeModal: state => {
      state.modalOpen = false;
    },
    toggleSidebar: state => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { openModal, closeModal, toggleSidebar, setTheme } =
  uiSlice.actions;
export const uiReducer = uiSlice.reducer;

// Selectors
export const selectModalOpen = (state: { ui: UiState }) => state.ui.modalOpen;
export const selectSidebarOpen = (state: { ui: UiState }) =>
  state.ui.sidebarOpen;
export const selectTheme = (state: { ui: UiState }) => state.ui.theme;
```

Then register it in the store:

```typescript
// src/shared/store/index.ts
import { uiReducer } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    // ... other reducers
  },
});
```

### Using React Router

```typescript
import { useNavigate, useParams, Link, NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants';

function MyComponent() {
  const navigate = useNavigate();
  const params = useParams();

  // Programmatic navigation
  const goToProfile = () => {
    navigate(ROUTES.PROFILE);
  };

  return (
    <div>
      {/* Link component */}
      <Link to={ROUTES.HOME}>Go Home</Link>

      {/* NavLink with active styles */}
      <NavLink
        to={ROUTES.DASHBOARD}
        style={({ isActive }) => ({
          color: isActive ? 'blue' : 'black'
        })}
      >
        Dashboard
      </NavLink>

      {/* Programmatic navigation */}
      <button onClick={goToProfile}>View Profile</button>

      {/* Go back */}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
```

### Creating New Routes

```typescript
// 1. Add route constant
// src/constants/index.ts
export const ROUTES = {
  // ...existing routes
  NEW_PAGE: '/new-page',
} as const;

// 2. Create page component
// src/routing/pages/NewPage.tsx
export const NewPage = () => {
  return <div><h1>New Page</h1></div>;
};

// 3. Add to router
// src/routing/index.tsx
import { NewPage } from './pages/NewPage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      // ...existing routes
      {
        path: ROUTES.NEW_PAGE,
        element: <NewPage />,
      },
    ],
  },
];
```

### Adding MSW Handlers

```typescript
// src/mock/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ]);
  }),

  http.post('/api/users', async ({ request }) => {
    const newUser = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        id: Math.random(),
        ...newUser,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),
];
```

### Using Custom Hooks

```typescript
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useState } from 'react';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  // Use debouncedSearch for API call
  const { data } = useSearchResults(debouncedSearch);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server with MSW and Tailwind
npm run build        # Build for production (includes type checking)
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
npm run format       # Format code with Prettier
npm run preview      # Preview production build
```

## 🎨 Styling Guide

### Using Tailwind Classes

```typescript
// Basic styling
<div className="bg-background text-foreground p-4 rounded-lg">
  <h1 className="text-2xl font-bold text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>

// Interactive elements
<button className="
  bg-primary text-primary-foreground
  hover:bg-primary/90
  focus:outline-none focus:ring-2 focus:ring-ring
  px-4 py-2 rounded-md
  transition-colors
">
  Click Me
</button>

// Dark mode aware
<div className="
  bg-card text-card-foreground
  border border-border
  shadow-lg
">
  {/* Automatically adjusts colors based on theme */}
</div>
```

### Theme Color Reference

| Tailwind Class    | Usage             | Light Mode | Dark Mode |
| ----------------- | ----------------- | ---------- | --------- |
| `bg-background`   | Main background   | `#ffffff`  | `#0f172a` |
| `text-foreground` | Primary text      | `#0f172a`  | `#f8fafc` |
| `bg-card`         | Card backgrounds  | `#f8fafc`  | `#1e293b` |
| `bg-primary`      | Primary actions   | `#3b82f6`  | `#60a5fa` |
| `bg-secondary`    | Secondary actions | `#f1f5f9`  | `#334155` |
| `bg-accent`       | Accent elements   | `#f0f9ff`  | `#1e3a8a` |
| `bg-muted`        | Muted backgrounds | `#f1f5f9`  | `#1e293b` |
| `border-border`   | Borders           | `#e2e8f0`  | `#334155` |
| `ring-ring`       | Focus rings       | `#3b82f6`  | `#60a5fa` |

### Creating Custom Styles

For complex styles, use `@apply` in CSS files:

```css
/* src/features/myFeature/components/MyComponent.module.css */
.container {
  @apply bg-card text-card-foreground;
  @apply rounded-lg shadow-md;
  @apply p-6 space-y-4;
}

.button {
  @apply bg-primary text-primary-foreground;
  @apply hover:bg-primary/90;
  @apply px-4 py-2 rounded-md;
  @apply transition-colors duration-200;
}
```

## 🎯 Commit Message Format

Follow conventional commits:

```
feat: add user authentication
fix: resolve login button issue
refactor: improve API error handling
docs: update README
chore: update dependencies
style: format code
test: add unit tests
perf: optimize rendering
```

## 🆕 Creating a New Feature

Follow these steps to create a complete, self-contained feature:

### 1. Create Feature Structure

```bash
mkdir -p src/features/myFeature/{components,hooks,queries,store,types,utils,mocks}
```

### 2. Define Types

```typescript
// src/features/myFeature/types/myFeature.types.ts
export interface MyItem {
  id: string;
  name: string;
  description: string;
}

export interface CreateMyItemDto {
  name: string;
  description: string;
}
```

### 3. Create Feature Store (Optional)

```typescript
// src/features/myFeature/store/myFeatureSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MyFeatureState {
  selectedId: string | null;
}

const initialState: MyFeatureState = { selectedId: null };

const myFeatureSlice = createSlice({
  name: 'myFeature',
  initialState,
  reducers: {
    selectId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
  },
});

export const { selectId } = myFeatureSlice.actions;
export const myFeatureReducer = myFeatureSlice.reducer;
export const selectSelectedId = (state: { myFeature: MyFeatureState }) =>
  state.myFeature.selectedId;
```

### 4. Create React Query Hooks

```typescript
// src/features/myFeature/queries/useMyItems.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { MyItem, CreateMyItemDto } from '../types/myFeature.types';

export const useMyItems = () => {
  return useQuery({
    queryKey: ['myItems'],
    queryFn: async () => {
      const res = await fetch('/api/my-items');
      return res.json() as Promise<MyItem[]>;
    },
  });
};

export const useCreateMyItem = () => {
  return useMutation({
    mutationFn: async (data: CreateMyItemDto) => {
      const res = await fetch('/api/my-items', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return res.json();
    },
  });
};
```

### 5. Create MSW Handlers

```typescript
// src/features/myFeature/mocks/myFeatureHandlers.ts
import { http, HttpResponse } from 'msw';

export const myFeatureHandlers = [
  http.get('/api/my-items', () => {
    return HttpResponse.json([
      { id: '1', name: 'Item 1', description: 'First item' },
    ]);
  }),
];
```

### 6. Create Feature Component

```typescript
// src/features/myFeature/components/MyFeature.tsx
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { selectId, selectSelectedId } from '../store';
import { useMyItems } from '../queries';

export const MyFeature = () => {
  const { data: items } = useMyItems();
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(selectSelectedId);

  return (
    <div>
      {items?.map(item => (
        <button key={item.id} onClick={() => dispatch(selectId(item.id))}>
          {item.name}
        </button>
      ))}
    </div>
  );
};
```

### 7. Export Everything

```typescript
// src/features/myFeature/index.ts
export * from './components/MyFeature';
export * from './queries';
export * from './hooks';
export * from './types/myFeature.types';
export * from './store';
export * from './utils';
```

### 8. Register Feature Store

```typescript
// src/shared/store/index.ts
import { myFeatureReducer } from '../../features/myFeature/store';

export const store = configureStore({
  reducer: {
    myFeature: myFeatureReducer, // Add here
  },
});
```

### 9. Combine MSW Handlers

```typescript
// src/mock/handlers.ts
import { myFeatureHandlers } from '../features/myFeature/mocks';

export const handlers = [
  ...myFeatureHandlers,
  // ...other handlers
];
```

## 💡 Best Practices

### Separation of Concerns

- **Never** use Redux for API data
- **Never** use Redux thunks - use React Query instead
- Redux is ONLY for client-side UI state (per feature or shared)
- React Query handles ALL server state
- Each feature should have its own store if it needs client state

### File Organization

- Keep features **completely self-contained** in `/features`
- Each feature has: components, hooks, queries, store, types, utils, mocks
- Share **only truly shared** code in `/shared` (auth, theme, generic components)
- Co-locate related files (component + styles + tests)
- Always use `@/` path alias for imports

### TypeScript

- Always define types for props and state
- Use `interface` for object shapes
- Use `type` for unions and intersections
- Avoid `any` - use `unknown` if type is truly unknown
- Export types from feature `index.ts` for reusability

### React Query

- Use query keys consistently
- Centralize query keys (e.g., `userKeys`)
- Invalidate queries after mutations
- Use `enabled` option to conditionally run queries

### Styling with Tailwind

- **Use theme colors**: `bg-background`, `text-foreground`, etc.
- **Avoid hard-coded colors**: Use CSS custom properties
- **Responsive by default**: Mobile-first with `md:`, `lg:` breakpoints
- **Dark mode ready**: All theme colors automatically switch
- **Utility-first**: Compose styles with Tailwind classes
- **Component variants**: Use `@apply` for complex, reusable styles
- **Consistent spacing**: Use Tailwind's spacing scale (`p-4`, `gap-6`)

### Theme System

- Use `useTheme()` hook for theme toggling
- Theme state persists in localStorage
- `.dark` class on root element controls theme
- All colors defined as CSS custom properties
- Hex colors for better browser compatibility
