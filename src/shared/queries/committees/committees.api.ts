import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import {
  AddCommitteeMember,
  Committee,
  CommitteeApiResponse,
  CommitteeCategory,
  CommitteeMember,
  CreateCategory,
  CreateCommittee,
  PaginatedCategoriesResponse,
  PaginatedCommitteeMembersResponse,
  PaginatedCommitteesResponse,
  PaginationParams,
  UpdateCategory,
  UpdateCommittee,
  UpdateCommitteeMember,
} from '@/shared/types/committees.types';

export const committeeApi = {
  /**
   * Create a new category (Admin only)
   */
  createCategory: async (data: CreateCategory): Promise<CommitteeCategory> => {
    const response = await apiClient.post<
      CommitteeApiResponse<CommitteeCategory>
    >(API_ENDPOINTS.COMMITTEE_CATEGORIES.CREATE, data);
    return response.data.data;
  },

  getCategories: async (
    params: PaginationParams
  ): Promise<PaginatedCategoriesResponse> => {
    const response = await apiClient.get<{ data: PaginatedCategoriesResponse }>(
      API_ENDPOINTS.COMMITTEE_CATEGORIES.GET_ALL,
      {
        params: {
          page: params.page.toString(),
          limit: params.limit.toString(),
        },
      }
    );
    return response.data.data;
  },

  updateCategory: async (
    id: string,
    data: UpdateCategory
  ): Promise<CommitteeCategory> => {
    const response = await apiClient.patch<
      CommitteeApiResponse<CommitteeCategory>
    >(API_ENDPOINTS.COMMITTEE_CATEGORIES.UPDATE(id), data);
    return response.data.data;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.COMMITTEE_CATEGORIES.DELETE(id));
  },

  /**
   * Create a new committee (Admin only)
   */
  createCommittee: async (data: CreateCommittee): Promise<Committee> => {
    const response = await apiClient.post<CommitteeApiResponse<Committee>>(
      API_ENDPOINTS.COMMITTEES.CREATE,
      data
    );
    return response.data.data;
  },

  /**
   * Get all committees with pagination
   * Backend returns: { data: { data: Committee[], total, page, limit, totalPages }, count, message }
   */
  getCommittees: async (
    params: PaginationParams
  ): Promise<PaginatedCommitteesResponse> => {
    const response = await apiClient.get<{ data: PaginatedCommitteesResponse }>(
      API_ENDPOINTS.COMMITTEES.GET_ALL,
      {
        params: {
          page: params.page.toString(),
          limit: params.limit.toString(),
        },
      }
    );
    // Unwrap the nested data structure
    return response.data.data;
  },

  /**
   * Get a single committee by ID
   */
  getCommitteById: async (id: string): Promise<Committee> => {
    const response = await apiClient.get<CommitteeApiResponse<Committee>>(
      API_ENDPOINTS.COMMITTEES.GET_ONE(id)
    );
    return response.data.data;
  },

  /**
   * Update an committee (Admin only)
   */
  updateCommittee: async (
    id: string,
    data: UpdateCommittee
  ): Promise<Committee> => {
    const response = await apiClient.patch<CommitteeApiResponse<Committee>>(
      API_ENDPOINTS.COMMITTEES.UPDATE(id),
      data
    );
    return response.data.data;
  },

  /**
   * Delete an committee (Admin only)
   */
  deleteCommittee: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.COMMITTEES.DELETE(id));
  },

  getCommitteeMembers: async (
    params: PaginationParams
  ): Promise<PaginatedCommitteeMembersResponse> => {
    const response = await apiClient.get<{
      data: PaginatedCommitteeMembersResponse;
    }>(API_ENDPOINTS.COMMITTEES.GET_MEMBERS(params.page.toString()));
    return response.data.data;
  },

  createCommitteeMember: async (
    data: AddCommitteeMember
  ): Promise<CommitteeMember> => {
    const response = await apiClient.post<
      CommitteeApiResponse<CommitteeMember>
    >(API_ENDPOINTS.COMMITTEES.CREATE_COMMITTEE_MEMBER, data);
    return response.data.data;
  },

  updateCommitteeMember: async (
    id: string,
    data: UpdateCommitteeMember
  ): Promise<CommitteeMember> => {
    const response = await apiClient.patch<
      CommitteeApiResponse<CommitteeMember>
    >(API_ENDPOINTS.COMMITTEES.UPDATE_COMMITTEE_MEMBER(id), data);
    return response.data.data;
  },

  deleteCommitteeMember: async (id: string): Promise<void> => {
    await apiClient.delete(
      API_ENDPOINTS.COMMITTEES.DELETE_COMMITTEE_MEMBER(id)
    );
  },
};
