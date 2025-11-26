import { useState, useCallback, useMemo } from 'react';
import type { Item, ItemFilters } from '../types';
import { filterItems } from '../utils';

/**
 * Custom hook for managing item filters and search
 */
export const useItemFilters = (items: Item[] = []) => {
  const [filters, setFilters] = useState<ItemFilters>({
    search: '',
    sortBy: 'name',
    order: 'asc',
  });

  const filteredItems = useMemo(() => {
    return filterItems(items, filters);
  }, [items, filters]);

  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);

  const setSortBy = useCallback((sortBy: ItemFilters['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  }, []);

  const toggleOrder = useCallback(() => {
    setFilters(prev => ({
      ...prev,
      order: prev.order === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      sortBy: 'name',
      order: 'asc',
    });
  }, []);

  return {
    filters,
    filteredItems,
    setSearch,
    setSortBy,
    toggleOrder,
    clearFilters,
  };
};
