/**
 * Item Types for Example Feature
 */

export interface Item {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateItemDto {
  name: string;
  description: string;
}

export interface UpdateItemDto {
  id: string;
  updates: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>;
}

export interface ItemFilters {
  search?: string;
  sortBy?: 'name' | 'createdAt';
  order?: 'asc' | 'desc';
}
