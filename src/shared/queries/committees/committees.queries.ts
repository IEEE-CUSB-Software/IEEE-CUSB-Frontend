import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import type {
  AddCommitteeMember,
  CreateCategory,
  CreateCommittee,
  UpdateCategory,
  UpdateCommittee,
  UpdateCommitteeMember,
} from '@/shared/types/committees.types';
import { committeeApi } from './committees.api';

// ── Categories ──────────────────────────────────────────────

export const useCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMITTEE_CATEGORIES.ALL,
    queryFn: () => committeeApi.getCategories(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategory) => committeeApi.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMITTEE_CATEGORIES.ALL,
      });
      toast.success('Category created successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to create category.';
      toast.error(message);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategory }) =>
      committeeApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMITTEE_CATEGORIES.ALL,
      });
      toast.success('Category updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to update category.';
      toast.error(message);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => committeeApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMITTEE_CATEGORIES.ALL,
      });
      toast.success('Category deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete category.';
      toast.error(message);
    },
  });
};

// ── Committees ──────────────────────────────────────────────

export const useCommittees = () => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMITTEES.ALL,
    queryFn: () => committeeApi.getCommittees(),
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * get a committee by id
 */
export const useCommittee = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMITTEES.ONE(id),
    queryFn: () => committeeApi.getCommitteeById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCommitteesByCategory = (
  categoryId: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.COMMITTEES.ALL, 'category', categoryId],
    queryFn: () => committeeApi.getCommitteesByCategory(categoryId),
    enabled: enabled && !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
};

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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMITTEES.ALL });
      toast.success('Committee deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete committee.';
      toast.error(message);
    },
  });
};

// ── Committee Members ───────────────────────────────────────

export const useCommitteeMembers = (
  committeeId: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMITTEES.MEMBERS(committeeId),
    queryFn: () => committeeApi.getCommitteeMembers(committeeId),
    enabled: enabled && !!committeeId,
    staleTime: 5 * 60 * 1000,
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
      toast.success('Member added successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to add member.';
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
      toast.success('Member updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to update member.';
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
      toast.success('Member deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete member.';
      toast.error(message);
    },
  });
};
