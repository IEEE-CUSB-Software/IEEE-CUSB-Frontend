import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type {
  Award,
  CreateAwardRequest,
  UpdateAwardRequest,
} from '@/shared/types/award.types';

interface AwardsListResponse {
  awards: Award[];
  count: number;
}

interface AwardApiResponse<T> {
  data: T;
  count: number;
  message: string;
}

/**
 * Awards API Service
 */
export const awardsApi = {
  /**
   * Get all awards ordered by title (ascending)
   */
  getAwards: async (): Promise<Award[]> => {
    const response = await apiClient.get<AwardApiResponse<AwardsListResponse>>(
      API_ENDPOINTS.AWARDS.GET_ALL
    );
    return response.data.data.awards;
  },

  /**
   * Get a single award by ID
   */
  getAwardById: async (id: string): Promise<Award> => {
    const response = await apiClient.get<AwardApiResponse<Award>>(
      API_ENDPOINTS.AWARDS.GET_ONE(id)
    );
    return response.data.data;
  },

  /**
   * Create a new award (Admin only)
   */
  createAward: async (data: CreateAwardRequest): Promise<Award> => {
    const response = await apiClient.post<AwardApiResponse<Award>>(
      API_ENDPOINTS.AWARDS.CREATE,
      data
    );
    return response.data.data;
  },

  /**
   * Update an award (Admin only)
   */
  updateAward: async (id: string, data: UpdateAwardRequest): Promise<Award> => {
    const response = await apiClient.patch<AwardApiResponse<Award>>(
      API_ENDPOINTS.AWARDS.UPDATE(id),
      data
    );
    return response.data.data;
  },

  /**
   * Delete an award (Admin only)
   */
  deleteAward: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.AWARDS.DELETE(id));
  },

  /**
   * Upload or replace award image (Admin only)
   */
  uploadAwardImage: async (id: string, file: File): Promise<Award> => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiClient.post<AwardApiResponse<Award>>(
      API_ENDPOINTS.AWARDS.UPLOAD_IMAGE(id),
      formData
    );
    return response.data.data;
  },

  /**
   * Delete award image (Admin only)
   */
  deleteAwardImage: async (id: string): Promise<Award> => {
    const response = await apiClient.delete<AwardApiResponse<Award>>(
      API_ENDPOINTS.AWARDS.DELETE_IMAGE(id)
    );
    return response.data.data;
  },
};

