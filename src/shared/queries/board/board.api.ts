import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type {
  BoardMember,
  CommitteeApiResponse,
  CreateBoardMember,
  UpdateBoardMember,
} from '@/shared/types/committees.types';

import { PaginationParams, BackendPaginatedResponse, PaginatedPayload } from '@/shared/types/auth.types';

export const boardApi = {
  getBoard: async (params?: PaginationParams): Promise<PaginatedPayload<BoardMember, 'members'>> => {
    const filteredParams = params
      ? Object.fromEntries(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== '')
            .map(([k, v]) => [k, String(v)])
        )
      : undefined;

    const response = await apiClient.get<
      BackendPaginatedResponse<BoardMember, 'members'>
    >(API_ENDPOINTS.BOARD.GET_ALL, { params: filteredParams });
    return response.data.data;
  },

  getOfficers: async (): Promise<{ board: BoardMember[]; leaders: any[] }> => {
    const response = await apiClient.get<{ data: { board: BoardMember[]; leaders: any[] } }>(
      API_ENDPOINTS.BOARD.GET_OFFICERS
    );
    return response.data.data;
  },

  createBoardMember: async (
    data: CreateBoardMember
  ): Promise<BoardMember> => {
    const response = await apiClient.post<
      CommitteeApiResponse<BoardMember>
    >(API_ENDPOINTS.BOARD.CREATE, data);
    return response.data.data;
  },

  updateBoardMember: async (
    id: string,
    data: UpdateBoardMember
  ): Promise<BoardMember> => {
    const response = await apiClient.patch<
      CommitteeApiResponse<BoardMember>
    >(API_ENDPOINTS.BOARD.UPDATE(id), data);
    return response.data.data;
  },

  deleteBoardMember: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.BOARD.DELETE(id));
  },

  uploadBoardMemberImage: async (id: string, file: File): Promise<BoardMember> => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiClient.post<CommitteeApiResponse<BoardMember>>(
      API_ENDPOINTS.BOARD.UPLOAD_IMAGE(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.data;
  },

  deleteBoardMemberImage: async (id: string): Promise<BoardMember> => {
    const response = await apiClient.delete<CommitteeApiResponse<BoardMember>>(
      API_ENDPOINTS.BOARD.DELETE_IMAGE(id)
    );
    return response.data.data;
  },
};
