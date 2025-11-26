import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Example Feature Redux Slice - For FEATURE-SPECIFIC CLIENT STATE
 * Use React Query for server state (API calls, caching, etc.)
 * Use Redux for:
 * - Feature UI state (selected items, filters visibility, etc.)
 * - Feature-specific user preferences
 * - Feature-specific client-side temporary data
 */

// Define the shape of your feature state
export interface ExampleState {
  selectedItem: string | null;
  favorites: string[];
  filterVisible: boolean;
  sortOrder: 'asc' | 'desc';
}

// Initial state
const initialState: ExampleState = {
  selectedItem: null,
  favorites: [],
  filterVisible: false,
  sortOrder: 'asc',
};

// Create the slice
const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    // UI State actions
    selectItem: (state, action: PayloadAction<string | null>) => {
      state.selectedItem = action.payload;
    },
    toggleFilterVisible: state => {
      state.filterVisible = !state.filterVisible;
    },
    setFilterVisible: (state, action: PayloadAction<boolean>) => {
      state.filterVisible = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    // Client-side data management
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    clearFavorites: state => {
      state.favorites = [];
    },
  },
});

// Export actions
export const {
  selectItem,
  toggleFilterVisible,
  setFilterVisible,
  setSortOrder,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} = exampleSlice.actions;

// Export reducer
export const exampleReducer = exampleSlice.reducer;

// Selectors - these work with the full RootState
export const selectSelectedItem = (state: { example: ExampleState }) =>
  state.example.selectedItem;
export const selectFavorites = (state: { example: ExampleState }) =>
  state.example.favorites;
export const selectFilterVisible = (state: { example: ExampleState }) =>
  state.example.filterVisible;
export const selectSortOrder = (state: { example: ExampleState }) =>
  state.example.sortOrder;
