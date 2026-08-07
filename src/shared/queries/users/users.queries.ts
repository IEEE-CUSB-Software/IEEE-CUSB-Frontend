import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/constants/apiConstants';
import type { User, Role, ApiResponse, PaginationParams, PaginatedUsersResponse } from '@/shared/types/auth.types';
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
   * GET /admin/users — list all users (admin only)
   */
  getUsers: async (params: PaginationParams): Promise<PaginatedUsersResponse> => {
    // Filter out undefined or empty string values from params
    const filteredParams = Object.fromEntries(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== '')
        .map(([k, v]) => [k, String(v)])
    );

    const response = await apiClient.get<ApiResponse<PaginatedUsersResponse>>(
      API_ENDPOINTS.USERS.GET_ALL,
      { params: filteredParams }
    );
    return response.data.data;
  },

  /**
   * GET /admin/users/:id — get single user (admin only)
   */
  getUserById: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.USERS.ADMIN_GET_USER(id)
    );
    return response.data.data;
  },

  /**
   * DELETE /admin/users/:id — delete user (admin only)
   */
  adminDeleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(
      API_ENDPOINTS.USERS.ADMIN_DELETE_USER(id)
    );
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

  viewMyCv: async (): Promise<void> => {
    const response = await apiClient.get<Blob>(API_ENDPOINTS.USERS.DOWNLOAD_CV, {
      responseType: 'blob',
    });
    const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  },

  downloadMyCv: async (fileName: string): Promise<void> => {
    const response = await apiClient.get<Blob>(API_ENDPOINTS.USERS.DOWNLOAD_CV, {
      responseType: 'blob',
    });
    const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * GET /admin/users/:userId/cv/download — admin: view a user's CV in a new tab
   * Streams the PDF binary with proper auth headers.
   */
  adminViewCv: async (userId: string): Promise<void> => {
    const response = await apiClient.get<any>(
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
    const response = await apiClient.get<any>(
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

  /**
   * PATCH /admin/users/:id/role — update user role (Super Admin only)
   */
  updateUserRole: async (id: string, roleId: string): Promise<User> => {
    const response = await apiClient.patch<ApiResponse<User>>(
      API_ENDPOINTS.USERS.ADMIN_UPDATE_USER_ROLE(id),
      { roleId }
    );
    return response.data.data;
  },

  /**
   * GET /roles — get all roles
   */
  getRoles: async (): Promise<Role[]> => {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.ROLES.GET_ALL
    );
    const resData = response.data?.data ?? response.data;
    if (Array.isArray(resData)) return resData;
    if (Array.isArray(resData?.data)) return resData.data;
    return [];
  },
};

// ─── Query Hooks ───────────────────────────────────────────────────────────────

/**
 * Hook to get ALL users with pagination — used in the admin Users page.
 */
export const useUsers = (params: PaginationParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.USERS.ALL, params],
    queryFn: () => usersApi.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to delete a user (Admin only)
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.adminDeleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.ALL });
      toast.success('User deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete user.';
      toast.error(message);
    },
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

/**
 * Hook to fetch all available roles
 */
export const useRoles = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ROLES.ALL,
    queryFn: () => usersApi.getRoles(),
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to update a user's role (Super Admin only)
 */
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, roleId }: { id: string; roleId: string }) =>
      usersApi.updateUserRole(id, roleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.ALL });
      toast.success('User role updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to update user role.';
      toast.error(message);
    },
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
