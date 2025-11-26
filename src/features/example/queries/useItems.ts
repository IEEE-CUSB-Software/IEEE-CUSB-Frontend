import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Item, CreateItemDto, UpdateItemDto } from '../types';

/**
 * API Service Functions
 */

const fetchItems = async (): Promise<Item[]> => {
  const response = await fetch('/api/items');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

const fetchItemById = async (id: string): Promise<Item> => {
  const response = await fetch(`/api/items/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch item ${id}`);
  }
  return response.json();
};

const createItem = async (newItem: CreateItemDto): Promise<Item> => {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  });
  if (!response.ok) {
    throw new Error('Failed to create item');
  }
  return response.json();
};

const updateItem = async (payload: UpdateItemDto): Promise<Item> => {
  const response = await fetch(`/api/items/${payload.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload.updates),
  });
  if (!response.ok) {
    throw new Error('Failed to update item');
  }
  return response.json();
};

const deleteItem = async (id: string): Promise<void> => {
  const response = await fetch(`/api/items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete item');
  }
};

/**
 * Query Keys
 */
export const itemKeys = {
  all: ['items'] as const,
  lists: () => [...itemKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) =>
    [...itemKeys.lists(), { filters }] as const,
  details: () => [...itemKeys.all, 'detail'] as const,
  detail: (id: string) => [...itemKeys.details(), id] as const,
};

/**
 * React Query Hooks
 */

export const useItems = () => {
  return useQuery({
    queryKey: itemKeys.lists(),
    queryFn: fetchItems,
  });
};

export const useItem = (id: string) => {
  return useQuery({
    queryKey: itemKeys.detail(id),
    queryFn: () => fetchItemById(id),
    enabled: !!id,
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: itemKeys.lists() });
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItem,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: itemKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: itemKeys.lists() });
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItem,
    onSuccess: (_data, deletedId) => {
      queryClient.removeQueries({ queryKey: itemKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: itemKeys.lists() });
    },
  });
};
