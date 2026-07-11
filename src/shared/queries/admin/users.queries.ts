import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminUsersApi } from './users.api';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import toast from 'react-hot-toast';
import { authApi } from '../auth';

/**
 * Hook to get all users with pagination
 */
export const useAdminUsers = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS.ALL, page, limit],
    queryFn: () => adminUsersApi.getAllUsers(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get single user
 */
export const useAdminUser = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.USERS.ONE(id),
    queryFn: () => adminUsersApi.getUser(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to delete a user
 */
export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminUsersApi.deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted successfully');
      // Invalidate the users list query
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS.ALL] });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'Failed to delete user';
      toast.error(errorMessage);
    },
  });
};

/**
 * Hook to create a user
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success('User created successfully!');
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS.ALL] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Failed to create user. Please try again.';
      toast.error(message);
    },
  });
};
