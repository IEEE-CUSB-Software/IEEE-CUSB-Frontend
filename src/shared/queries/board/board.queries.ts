import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import type {
  CreateBoardMember,
  UpdateBoardMember,
} from '@/shared/types/committees.types';
import { boardApi } from './board.api';

export const useBoard = () => {
  return useQuery({
    queryKey: QUERY_KEYS.BOARD.ALL,
    queryFn: () => boardApi.getBoard(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateBoardMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBoardMember) => boardApi.createBoardMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOARD.ALL });
      toast.success('Board member created successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to create board member.';
      toast.error(message);
    },
  });
};

export const useUpdateBoardMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBoardMember }) =>
      boardApi.updateBoardMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOARD.ALL });
      toast.success('Board member updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to update board member.';
      toast.error(message);
    },
  });
};

export const useDeleteBoardMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => boardApi.deleteBoardMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOARD.ALL });
      toast.success('Board member deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete board member.';
      toast.error(message);
    },
  });
};
