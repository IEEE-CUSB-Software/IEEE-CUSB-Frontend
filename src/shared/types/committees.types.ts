import { RoleName, User } from './auth.types';

export interface CommitteeCategory {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategory {
  name: string;
  description: string;
}

export interface UpdateCategory {
  name?: string;
  description?: string;
}

export interface Committee {
  id: string;
  name: string;
  about: string;
  category_id: string;
  category: CommitteeCategory;
  created_at: string;
  updated_at: string;
}

export interface CreateCommittee {
  name: string;
  about: string;
  category_id: string;
}

export interface UpdateCommittee {
  name?: string;
  about?: string;
  category_id?: string;
}

export interface CommitteeMember {
  id: string;
  committee_id: string;
  email: string;
  role: RoleName;
  image_url?: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface AddCommitteeMember {
  committee_id: string;
  name: string;
  email: string;
  role: RoleName;
  image_url?: string;
}

export interface UpdateCommitteeMember {
  committee_id?: string;
  name?: string;
  email?: string;
  role?: RoleName;
  image_url?: string;
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated Committees Response
 */
export interface PaginatedCommitteesResponse {
  data: Committee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  count: number;
  message: string;
}

export interface PaginatedCategoriesResponse {
  data: CommitteeCategory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedCommitteeMembersResponse {
  data: CommitteeMember[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * API Response wrapper (matches backend response format)
 */
export interface CommitteeApiResponse<T> {
  data: T;
  count: number;
  message: string;
}
