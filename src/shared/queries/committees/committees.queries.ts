import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import {
  AddCommitteeMember,
  CreateCategory,
  CreateCommittee,
  PaginationParams,
  UpdateCategory,
  UpdateCommittee,
  UpdateCommitteeMember,
} from '@/shared/types/committees.types';
import { committeeApi } from './committees.api';

/**
 * see all committees
 */
export const useCommittees = () => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMITTEES.ALL,
    queryFn: () => committeeApi.getCommittees(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * see a committee by id
 */
export const useCommittee = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMITTEES.ONE(id),
    queryFn: () => committeeApi.getCommitteById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * create a committee
 */

export const useCreateCommittee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommittee) => committeeApi.createCommittee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMITTEES.ALL });
      toast.success('Committee created successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to create committee.';
      toast.error(message);
    },
  });
};

/**
 * update a committee
 */
export const useUpdateCommittee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCommittee }) =>
      committeeApi.updateCommittee(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMITTEES.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMITTEES.ONE(variables.id),
      });
      toast.success('Committee updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to update committee.';
      toast.error(message);
    },
  });
};

/**
 * delete a committee
 */
export const useDeleteCommittee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => committeeApi.deleteCommittee(id),
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMITTEES.ALL }),
        toast.success('Committee deleted successfully!'));
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete committee.';
      toast.error(message);
    },
  });
};

/**
 * see committees of certain category
 */
export const useCommitteesOneCategory = (categoryId: string) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.COMMITTEES.ALL, categoryId],
    queryFn: () => committeeApi.getCommitteesOfOneCategory(categoryId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * see all categories
 */
export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMITTEE_CATEGORIES.ALL,
    queryFn: () => committeeApi.getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * add a new category
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategory) => committeeApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMITTEES.ALL });
      toast.success('Category created successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to create category.';
      toast.error(message);
    },
  });
};

/**
 * update a category
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategory }) =>
      committeeApi.updateCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMITTEE_CATEGORIES.ALL,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMITTEE_CATEGORIES.ONE(variables.id),
      });
      toast.success('Category updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to category committee.';
      toast.error(message);
    },
  });
};
/**
 * delete a category
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => committeeApi.deleteCategory(id),
    onSuccess: () => {
      (queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMITTEE_CATEGORIES.ALL,
      }),
        toast.success('Category deleted successfully!'));
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete category.';
      toast.error(message);
    },
  });
};

/**
 * see all members
 */
export const useCommitteeMembers = (
  committeeId: string,
  enabled: boolean,
  params: PaginationParams
) => {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.COMMITTEES.MEMBERS(committeeId),
      params.page,
      params.limit,
    ],
    queryFn: () => committeeApi.getCommittees(),
    enabled: enabled && !!committeeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * add a new member
 */
export const useCreateCommitteeMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddCommitteeMember) =>
      committeeApi.createCommitteeMember(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMITTEES.MEMBERS(variables.committee_id),
      });
      toast.success('Committee member added successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to create committee member.';
      toast.error(message);
    },
  });
};

/**
 * update a member
 */
export const useUpdateCommitteeMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      committee_id,
      data,
    }: {
      id: string;
      committee_id: string;
      data: UpdateCommitteeMember;
    }) => committeeApi.updateCommitteeMember(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMITTEES.MEMBERS(variables.committee_id),
      });
      toast.success('Committee member updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to update committee member.';
      toast.error(message);
    },
  });
};

/**
 * delete a member
 */
export const useDeleteCommitteeMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; committee_id: string }) =>
      committeeApi.deleteCommitteeMember(data.id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMITTEES.MEMBERS(variables.committee_id),
      });
      toast.success('Committee member deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete committee member.';
      toast.error(message);
    },
  });
};
