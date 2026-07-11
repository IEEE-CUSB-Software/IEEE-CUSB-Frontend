import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/constants/apiConstants';
import type { User, ApiResponse } from '@/shared/types/auth.types';
import toast from 'react-hot-toast';

// ─── Response Shapes ───────────────────────────────────────────────────────────

interface CvUploadResponse {
  message: string;
  fileKey: string;
  fileUrl: string;
  fileName: string;
}

// ─── API helpers ───────────────────────────────────────────────────────────────

export const usersApi = {
  /**
   * GET /users — list all users (admin only)
   * Backend may return { data: User[] } or { data: { users: User[] } }.
   */
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<unknown>>(
      API_ENDPOINTS.USERS.GET_ALL
    );
    const payload = response.data?.data;
    if (Array.isArray(payload)) return payload;
    if (payload && typeof payload === 'object') {
      const nested = (payload as Record<string, unknown>)['users'];
      if (Array.isArray(nested)) return nested as User[];
    }
    return [];
  },

  /**
   * GET /users/:id — get single user (admin or self)
   */
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.USERS.GET_USER(id)
    );
    return response.data.data;
  },

  /**
   * POST /users/me/cv/upload — upload a PDF CV for the authenticated user
   */
  uploadCv: async (file: File): Promise<CvUploadResponse> => {
    const formData = new FormData();
    formData.append('cv', file);
    const response = await apiClient.post<CvUploadResponse>(
      API_ENDPOINTS.USERS.UPLOAD_CV,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  },

  /**
   * DELETE /users/me/cv — delete the authenticated user's CV
   */
  deleteCv: async (): Promise<User> => {
    const response = await apiClient.delete<ApiResponse<User>>(
      API_ENDPOINTS.USERS.DELETE_CV
    );
    return response.data.data;
  },

  /**
   * GET /admin/users/:userId/cv/download — admin: view a user's CV in a new tab
   * Streams the PDF binary with proper auth headers.
   */
  adminViewCv: async (userId: string): Promise<void> => {
    const response = await apiClient.get(
      API_ENDPOINTS.USERS.ADMIN_DOWNLOAD_CV(userId),
      { responseType: 'blob' }
    );
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    // Revoke after a delay so the browser has time to load
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  },

  /**
   * GET /admin/users/:userId/cv/download — admin: trigger download of a user's CV
   * Streams the PDF binary with proper auth headers.
   */
  adminDownloadCv: async (userId: string, fileName: string): Promise<void> => {
    const response = await apiClient.get(
      API_ENDPOINTS.USERS.ADMIN_DOWNLOAD_CV(userId),
      { responseType: 'blob' }
    );
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
};

// ─── Query Hooks ───────────────────────────────────────────────────────────────

/**
 * Hook to get ALL users — used in the admin Users page.
 */
export const useUsers = () => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS.ALL,
    queryFn: () => usersApi.getUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get a single user by id.
 */
export const useUser = (id: string, enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS.ONE(id),
    queryFn: () => usersApi.getUserById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// ─── Mutation Hooks ────────────────────────────────────────────────────────────

/**
 * Hook to upload a CV PDF for the current user.
 * On success it refreshes the current-user query so cv_url updates everywhere.
 */
export const useUploadCv = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => usersApi.uploadCv(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.CURRENT_USER });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.ALL });
      toast.success('CV uploaded successfully!');
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? 'Failed to upload CV.';
      toast.error(message);
    },
  });
};

/**
 * Hook to delete the current user's CV.
 */
export const useDeleteCv = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => usersApi.deleteCv(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.CURRENT_USER });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.ALL });
      toast.success('CV deleted successfully.');
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? 'Failed to delete CV.';
      toast.error(message);
    },
  });
};
