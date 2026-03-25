import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type {
  BoardMember,
  CommitteeApiResponse,
  CreateBoardMember,
  UpdateBoardMember,
} from '@/shared/types/committees.types';

interface BoardListResponse {
  members: BoardMember[];
  count: number;
}

export const boardApi = {
  getBoard: async (): Promise<BoardMember[]> => {
    const response = await apiClient.get<
      CommitteeApiResponse<BoardListResponse>
    >(API_ENDPOINTS.BOARD.GET_ALL);
    return response.data.data.members;
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
};
