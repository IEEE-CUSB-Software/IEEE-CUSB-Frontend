import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from './workshops.api';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import type {
  CreateInstructorRequest,
  UpdateInstructorRequest,
  CreateWorkshopRequest,
  UpdateWorkshopRequest,
  UpdateRegistrationStatusRequest,
  PaginatedWorkshopsResponse,
  Workshop,
} from '@/shared/types/workshops.types';
import { PaginationParams } from '@/shared/types/auth.types';
import type { InfiniteData } from '@tanstack/react-query';

// ==========================================
// INSTRUCTORS
// ==========================================

type WorkshopsCache =
  | PaginatedWorkshopsResponse
  | InfiniteData<PaginatedWorkshopsResponse>
  | Workshop[]
  | Workshop;

const updateSingleWorkshopRegistration = (
  workshop: Workshop,
  workshopId: string,
  isRegistered: boolean
): Workshop => {
  if (workshop.id !== workshopId) return workshop;

  const currentSpots = workshop.remainingSpots ?? workshop.capacity ?? 0;
  const newSpots = isRegistered
    ? Math.max(0, currentSpots - 1)
    : currentSpots + 1;

  return {
    ...workshop,
    is_registered: isRegistered,
    remainingSpots: newSpots,
    is_full: newSpots === 0,
  };
};

const updateWorkshopRegistrationState = (
  cache: WorkshopsCache | undefined,
  workshopId: string,
  isRegistered: boolean
): WorkshopsCache | undefined => {
  if (!cache) return cache;

  // 1. Array of workshops
  if (Array.isArray(cache)) {
    return cache.map(workshop =>
      updateSingleWorkshopRegistration(workshop, workshopId, isRegistered)
    );
  }

  // 2. Infinite query structure { pages: [{ data: Workshop[] }] }
  if ('pages' in cache && Array.isArray(cache.pages)) {
    return {
      ...cache,
      pages: cache.pages.map(page => ({
        ...page,
        data: Array.isArray(page.data)
          ? page.data.map(workshop =>
              updateSingleWorkshopRegistration(
                workshop,
                workshopId,
                isRegistered
              )
            )
          : page.data,
      })),
    };
  }

  // 3. Paginated response { data: Workshop[] }
  if ('data' in cache && Array.isArray(cache.data)) {
    return {
      ...cache,
      data: cache.data.map(workshop =>
        updateSingleWorkshopRegistration(workshop, workshopId, isRegistered)
      ),
    };
  }

  // 4. Single Workshop object { id: string, ... }
  if ('id' in cache && (cache as Workshop).id === workshopId) {
    return updateSingleWorkshopRegistration(
      cache as Workshop,
      workshopId,
      isRegistered
    );
  }

  return cache;
};

const workshopListQueryFilter = {
  queryKey: QUERY_KEYS.WORKSHOPS.ALL,
  predicate: (query: { queryKey: readonly unknown[] }) => {
    const key = query.queryKey;
    if (key[1] === 'instructors') return false;
    if (
      typeof key[1] === 'string' &&
      key[1] !== 'admin' &&
      key[1] !== 'infinite'
    ) {
      return false;
    }
    return true;
  },
};

export const useGetInstructors = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.WORKSHOPS.INSTRUCTORS, params],
    queryFn: () => api.getInstructors(params),
    // Add fallback in case the endpoint doesn't exist yet
    retry: false,
  });
};

export const useCreateInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInstructorRequest) => api.createInstructor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS,
      });
      toast.success('Instructor created successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to create instructor'
      );
    },
  });
};

export const useUpdateInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInstructorRequest }) =>
      api.updateInstructor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS,
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Instructor updated successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update instructor'
      );
    },
  });
};

export const useDeleteInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteInstructor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS,
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Instructor deleted successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete instructor'
      );
    },
  });
};

export const useUploadInstructorImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      api.uploadInstructorImage(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS,
      });
      toast.success('Instructor image uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to upload instructor image'
      );
    },
  });
};

export const useDeleteInstructorImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteInstructorImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS,
      });
      toast.success('Instructor image deleted successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete instructor image'
      );
    },
  });
};

// ==========================================
// WORKSHOPS
// ==========================================

export const useWorkshops = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.WORKSHOPS.ALL, params],
    queryFn: () => api.getWorkshops(params),
  });
};

export const useGetAdminWorkshops = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.WORKSHOPS.ALL, 'admin', params],
    queryFn: () => api.getWorkshops(params),
  });
};

export const useGetWorkshopById = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.WORKSHOPS.ONE(id),
    queryFn: () => api.getWorkshop(id),
    enabled: !!id,
  });
};

export const useCreateWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateWorkshopRequest) => api.createWorkshop(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Workshop created successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to create workshop'
      );
    },
  });
};

export const useUpdateWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkshopRequest }) =>
      api.updateWorkshop(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Workshop updated successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update workshop'
      );
    },
  });
};

export const useDeleteWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteWorkshop(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Workshop deleted successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete workshop'
      );
    },
  });
};

export const useUploadWorkshopCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      api.uploadWorkshopCover(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Workshop cover image uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Failed to upload workshop cover image'
      );
    },
  });
};

export const useDeleteWorkshopCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteWorkshopCover(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Workshop cover image deleted successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Failed to delete workshop cover image'
      );
    },
  });
};

export const useUploadWorkshopGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, files }: { id: string; files: File[] }) =>
      api.uploadWorkshopGallery(id, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Workshop gallery images uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to upload gallery images'
      );
    },
  });
};

export const useDeleteWorkshopGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, imageId }: { id: string; imageId: string }) =>
      api.deleteWorkshopGalleryImage(id, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Gallery image deleted successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to delete gallery image'
      );
    },
  });
};

// ==========================================
// REGISTRATIONS
// ==========================================

export const useGetWorkshopRegistrations = (
  id: string,
  params?: PaginationParams,
  enabled = true
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.WORKSHOPS.REGISTRATIONS(id), params],
    queryFn: () => api.getWorkshopRegistrations(id, params),
    enabled: !!id && enabled,
  });
};

export const useUpdateRegistrationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      registrationId,
      status,
    }: {
      id: string;
      registrationId: string;
      status: UpdateRegistrationStatusRequest;
    }) => api.updateRegistrationStatus(id, registrationId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHOPS.REGISTRATIONS(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL }); // Invalidate workshops to update remainingSpots
      toast.success('Registration status updated successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update registration status'
      );
    },
  });
};

export const useBulkRegisterToWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userIds }: { id: string; userIds: string[] }) =>
      api.bulkRegisterToWorkshop(id, userIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.WORKSHOPS.REGISTRATIONS(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Users registered successfully');
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to bulk register users'
      );
    },
  });
};

export const useRegisterWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.registerToWorkshop(id),
    onMutate: async (workshopId: string) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.WORKSHOPS.ONE(workshopId),
      });

      const previousWorkshop = queryClient.getQueryData<Workshop>(
        QUERY_KEYS.WORKSHOPS.ONE(workshopId)
      );
      const previousWorkshops =
        queryClient.getQueriesData<WorkshopsCache>(workshopListQueryFilter);

      queryClient.setQueryData<Workshop>(
        QUERY_KEYS.WORKSHOPS.ONE(workshopId),
        old => (old ? updateSingleWorkshopRegistration(old, workshopId, true) : old)
      );

      queryClient.setQueriesData<WorkshopsCache>(workshopListQueryFilter, old =>
        updateWorkshopRegistrationState(old, workshopId, true)
      );

      return { previousWorkshop, previousWorkshops };
    },
    onSuccess: () => {
      toast.success('Successfully registered for the workshop');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
    },
    onError: (error: any, workshopId, context) => {
      if (context?.previousWorkshop) {
        queryClient.setQueryData(
          QUERY_KEYS.WORKSHOPS.ONE(workshopId),
          context.previousWorkshop
        );
      }
      context?.previousWorkshops?.forEach(([queryKey, previousWorkshops]) => {
        queryClient.setQueryData(queryKey, previousWorkshops);
      });
      toast.error(
        error?.response?.data?.message || 'Failed to register for workshop'
      );
    },
  });
};

export const useCancelWorkshopRegistration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.cancelWorkshopRegistration(id),
    onMutate: async (workshopId: string) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.WORKSHOPS.ONE(workshopId),
      });

      const previousWorkshop = queryClient.getQueryData<Workshop>(
        QUERY_KEYS.WORKSHOPS.ONE(workshopId)
      );
      const previousWorkshops =
        queryClient.getQueriesData<WorkshopsCache>(workshopListQueryFilter);

      queryClient.setQueryData<Workshop>(
        QUERY_KEYS.WORKSHOPS.ONE(workshopId),
        old => (old ? updateSingleWorkshopRegistration(old, workshopId, false) : old)
      );

      queryClient.setQueriesData<WorkshopsCache>(workshopListQueryFilter, old =>
        updateWorkshopRegistrationState(old, workshopId, false)
      );

      return { previousWorkshop, previousWorkshops };
    },
    onSuccess: () => {
      toast.success('Registration cancelled successfully');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
    },
    onError: (error: any, workshopId, context) => {
      if (context?.previousWorkshop) {
        queryClient.setQueryData(
          QUERY_KEYS.WORKSHOPS.ONE(workshopId),
          context.previousWorkshop
        );
      }
      context?.previousWorkshops?.forEach(([queryKey, previousWorkshops]) => {
        queryClient.setQueryData(queryKey, previousWorkshops);
      });
      toast.error(
        error?.response?.data?.message || 'Failed to cancel registration'
      );
    },
  });
};
