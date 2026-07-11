import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type { ApiResponse, User } from '@/shared/types/auth.types';

export interface UsersListResponse {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Admin Users API Service
 */
export const adminUsersApi = {
  /**
   * Get all users with pagination
   */
  getAllUsers: async (
    page: number = 1,
    limit: number = 10
  ): Promise<UsersListResponse> => {
    const response = await apiClient.get<ApiResponse<UsersListResponse>>(
      `${API_ENDPOINTS.USERS.GET_ALL}?page=${page}&limit=${limit}`
    );
    return response.data.data;
  },

  /**
   * Get single user
   */
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.USERS.ADMIN_GET_USER(id)
    );
    return response.data.data;
  },

  /**
   * Delete user
   */
  deleteUser: async (id: string): Promise<{ success: boolean }> => {
    const response = await apiClient.delete<ApiResponse<{ success: boolean }>>(
      API_ENDPOINTS.USERS.ADMIN_DELETE_USER(id)
    );
    return response.data.data;
  },
};
