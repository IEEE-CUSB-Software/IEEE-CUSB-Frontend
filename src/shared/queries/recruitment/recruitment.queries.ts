import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import * as api from './recruitment.api';
import type { ApplyToVacancyRequest } from '@/shared/types/recruitment.types';

export const useGetVacancies = () => {
  return useQuery({
    queryKey: QUERY_KEYS.RECRUITMENT.VACANCIES,
    queryFn: api.getVacancies,
  });
};

export const useGetMyApplications = () => {
  return useQuery({
    queryKey: QUERY_KEYS.RECRUITMENT.MY_APPLICATIONS,
    queryFn: api.getMyApplications,
  });
};

export const useApplyToVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vacancyId, data }: { vacancyId: string; data: ApplyToVacancyRequest }) =>
      api.applyToVacancy(vacancyId, data),
    onSuccess: () => {
      toast.success('Successfully applied to the vacancy!');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECRUITMENT.MY_APPLICATIONS });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to apply to the vacancy. Please try again.'
      );
    },
  });
};

export const useRevokeApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.revokeApplication(id),
    onSuccess: () => {
      toast.success('Application revoked successfully.');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.RECRUITMENT.MY_APPLICATIONS });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to revoke application. Please try again.'
      );
    },
  });
};
