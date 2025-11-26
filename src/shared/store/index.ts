import { configureStore } from '@reduxjs/toolkit';
// Import feature reducers
import { exampleReducer } from '@/features/example/store';
// Import shared reducers
import { uiReducer } from './slices/uiSlice';

/**
 * Shared Redux Store
 *
 * This is the root store that combines:
 * 1. Feature-specific stores (from each feature's store folder)
 * 2. Shared/global stores (from shared/store/slices folder)
 *
 * Each feature manages its own state and exports its reducer,
 * which is then combined here.
 */

export const store = configureStore({
  reducer: {
    // Shared/global stores (UI, auth, theme, etc.)
    ui: uiReducer,

    // Feature stores
    example: exampleReducer,
    // Add more feature reducers here as you create new features
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types if needed
        ignoredActions: ['your/action/type'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
