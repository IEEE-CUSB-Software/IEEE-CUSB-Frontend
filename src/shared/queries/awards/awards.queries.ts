import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { awardsApi } from './awards.api';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import type {
  CreateAwardRequest,
  UpdateAwardRequest,
} from '@/shared/types/award.types';

/**
 * Hook to get all awards
 */
export const useAwards = () => {
  return useQuery({
    queryKey: QUERY_KEYS.AWARDS.ALL,
    queryFn: () => awardsApi.getAwards(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get a single award by ID
 */
export const useAward = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.AWARDS.ONE(id),
    queryFn: () => awardsApi.getAwardById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook to create a new award (Admin only)
 */
export const useCreateAward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAwardRequest) => awardsApi.createAward(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AWARDS.ALL });
      toast.success('Award created successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to create award.';
      toast.error(message);
    },
  });
};

/**
 * Hook to update an award (Admin only)
 */
export const useUpdateAward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAwardRequest }) =>
      awardsApi.updateAward(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AWARDS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AWARDS.ONE(variables.id),
      });
      toast.success('Award updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to update award.';
      toast.error(message);
    },
  });
};

/**
 * Hook to delete an award (Admin only)
 */
export const useDeleteAward = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => awardsApi.deleteAward(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AWARDS.ALL });
      toast.success('Award deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete award.';
      toast.error(message);
    },
  });
};
