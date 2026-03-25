import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type {
  AddCommitteeMember,
  Committee,
  CommitteeApiResponse,
  CommitteeCategory,
  CommitteeMember,
  CreateCategory,
  CreateCommittee,
  UpdateCategory,
  UpdateCommittee,
  UpdateCommitteeMember,
} from '@/shared/types/committees.types';

interface CategoriesListResponse {
  categories: CommitteeCategory[];
  count: number;
}

interface CommitteesListResponse {
  committees: Committee[];
  count: number;
}

interface MembersListResponse {
  members: CommitteeMember[];
  count: number;
}

export const committeeApi = {
  // ── Categories ──────────────────────────────────────────

  getCategories: async (): Promise<CommitteeCategory[]> => {
    const response = await apiClient.get<
      CommitteeApiResponse<CategoriesListResponse>
    >(API_ENDPOINTS.COMMITTEE_CATEGORIES.GET_ALL);
    return response.data.data.categories;
  },

  createCategory: async (data: CreateCategory): Promise<CommitteeCategory> => {
    const response = await apiClient.post<
      CommitteeApiResponse<CommitteeCategory>
    >(API_ENDPOINTS.COMMITTEE_CATEGORIES.CREATE, data);
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

  // ── Committees ──────────────────────────────────────────

  getCommittees: async (): Promise<Committee[]> => {
    const response = await apiClient.get<
      CommitteeApiResponse<CommitteesListResponse>
    >(API_ENDPOINTS.COMMITTEES.GET_ALL);
    return response.data.data.committees;
  },

  getCommitteesByCategory: async (
    categoryId: string
  ): Promise<Committee[]> => {
    const response = await apiClient.get<
      CommitteeApiResponse<CommitteesListResponse>
    >(API_ENDPOINTS.COMMITTEES.GET_ALL, {
      params: { category_id: categoryId },
    });
    return response.data.data.committees;
  },

  getCommitteeById: async (id: string): Promise<Committee> => {
    const response = await apiClient.get<CommitteeApiResponse<Committee>>(
      API_ENDPOINTS.COMMITTEES.GET_ONE(id)
    );
    return response.data.data;
  },

  createCommittee: async (data: CreateCommittee): Promise<Committee> => {
    const response = await apiClient.post<CommitteeApiResponse<Committee>>(
      API_ENDPOINTS.COMMITTEES.CREATE,
      data
    );
    return response.data.data;
  },

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

  deleteCommittee: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.COMMITTEES.DELETE(id));
  },

  // ── Committee Members ───────────────────────────────────

  getCommitteeMembers: async (
    committeeId: string
  ): Promise<CommitteeMember[]> => {
    const response = await apiClient.get<
      CommitteeApiResponse<MembersListResponse>
    >(API_ENDPOINTS.COMMITTEES.GET_MEMBERS(committeeId));
    return response.data.data.members;
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
