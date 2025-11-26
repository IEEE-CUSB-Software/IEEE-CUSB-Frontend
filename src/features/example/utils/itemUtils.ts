import type { Item, ItemFilters } from '../types';

/**
 * Filter items based on search criteria
 */
export const filterItems = (items: Item[], filters: ItemFilters): Item[] => {
  let filtered = [...items];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      item =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy!];
      const bValue = b[filters.sortBy!];

      if (!aValue || !bValue) return 0;

      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;

      return filters.order === 'desc' ? -comparison : comparison;
    });
  }

  return filtered;
};

/**
 * Format item for display
 */
export const formatItemName = (item: Item): string => {
  return `${item.name} (#${item.id.slice(0, 8)})`;
};

/**
 * Validate item data
 */
export const validateItem = (
  item: Partial<Item>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!item.name || item.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (item.name && item.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (!item.description || item.description.trim().length === 0) {
    errors.push('Description is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
