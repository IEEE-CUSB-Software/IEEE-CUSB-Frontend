import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import * as api from './recruitment.api';
import type {
  AddVacancy,
  ApplyToVacancyRequest,
  ExportApplicationsParams,
  GetAllApplicationsParams,
  UpdateStatus,
  UpdateVacancy,
} from '@/shared/types/recruitment.types';

export const useAddVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: AddVacancy }) => api.addVacancy(data),
    onSuccess: (_, variables) => {
      toast.success('Vacancy Successfully added!');
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RECRUITMENT.ADMIN_VACANCIES,
      });

      if (variables.data?.is_open) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.RECRUITMENT.VACANCIES,
        });
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          'Failed to add the vacancy. Please try again.'
      );
    },
  });
};

export const useGetAdminVacancies = () => {
  return useQuery({
    queryKey: QUERY_KEYS.RECRUITMENT.ADMIN_VACANCIES,
    queryFn: api.getAdminVacancies,
  });
};

export const useUpdateVacancies = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateVacancy }) =>
      api.updateVacancy(id, data),
    onSuccess: (_, variables) => {
      toast.success('Vacancy updated successfully');
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RECRUITMENT.ADMIN_VACANCIES,
      });

      if (variables.data?.is_open) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.RECRUITMENT.VACANCIES,
        });
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update vacancy');
    },
  });
};

export const useDeleteVacancy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.deleteVacancy(id),
    onSuccess: () => {
      toast.success('Vacancy deleted successfully');

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RECRUITMENT.ADMIN_VACANCIES,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RECRUITMENT.VACANCIES,
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete vacancy');
    },
  });
};
export const useGetAllApplications = ({
  vacancyId,
  page = 1,
  limit = 100,
  startDate,
  endDate,
}: GetAllApplicationsParams) => {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.RECRUITMENT.ADMIN_VACANCY_APPLICATIONS(vacancyId),
      page,
      limit,
      startDate,
      endDate,
    ],
    queryFn: () =>
      api.getAllApplications({
        vacancyId,
        page,
        limit,
        startDate,
        endDate,
      }),
  });
};

export const useUpdateApplicationStatus = (applicationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStatus }) =>
      api.updateApplicationStatus(id, data),
    onSuccess: () => {
      toast.success('Application status updated successfully');
      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.RECRUITMENT.ADMIN_VACANCY_APPLICATIONS(applicationId),
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update application status'
      );
    },
  });
};

export const useExportApplications = () => {
  return useMutation({
    mutationFn: (params: ExportApplicationsParams) =>
      api.exportApplications(params),

    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to export applications'
      );
    },
  });
};

export const useViewApplicationCV = () => {
  return useMutation({
    mutationFn: (applicationId: string) => api.viewApplicationCV(applicationId),

    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to load CV');
    },
  });
};

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
    mutationFn: ({
      vacancyId,
      data,
    }: {
      vacancyId: string;
      data: ApplyToVacancyRequest;
    }) => api.applyToVacancy(vacancyId, data),
    onSuccess: () => {
      toast.success('Successfully applied to the vacancy!');
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RECRUITMENT.MY_APPLICATIONS,
      });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          'Failed to apply to the vacancy. Please try again.'
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
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.RECRUITMENT.MY_APPLICATIONS,
      });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ||
          'Failed to revoke application. Please try again.'
      );
    },
  });
};
