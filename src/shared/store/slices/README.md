# Shared Redux Slices

This folder contains **truly shared/global state** that is used across multiple features or the entire application.

## What belongs here?

- **Authentication state** (user info, tokens, login status)
- **Global UI state** (theme, language, notifications)
- **App-wide settings** (user preferences that affect multiple features)
- **Navigation state** (breadcrumbs, active routes)

## What does NOT belong here?

- Feature-specific state → Place in `src/features/{featureName}/store/`
- Server state (API data) → Use React Query in `src/features/{featureName}/queries/`

## Example Structure

```typescript
// src/shared/store/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
```

Then import it in `src/shared/store/index.ts`:

```typescript
import { authReducer } from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Shared state
    example: exampleReducer, // Feature state
  },
});
```

## Key Principles

1. **Feature stores** are self-contained in `src/features/{featureName}/store/`
2. **Shared stores** are for cross-cutting concerns only
3. **Never use Redux for server state** - use React Query instead
