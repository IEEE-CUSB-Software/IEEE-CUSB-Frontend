/**
 * Example Feature Module
 *
 * This is a self-contained feature module that exports all its components,
 * hooks, queries, types, store, and utilities for easy importing.
 */

// Components
export * from './components/ExampleFeature';

// React Query Hooks
export * from './queries';

// Custom Hooks
export * from './hooks';

// Types
export * from './types/item.types';

// Store (Redux slice, actions, selectors)
export * from './store';

// Utilities
export * from './utils/itemUtils';

// Note: Mock handlers are not exported from the feature index
// They should be imported directly in src/mock/handlers.ts
