import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from './workshops.api';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import type { 
  CreateInstructorRequest, 
  UpdateInstructorRequest,
  CreateWorkshopRequest,
  UpdateWorkshopRequest,
  UpdateRegistrationStatusRequest
} from '@/shared/types/workshops.types';

// ==========================================
// INSTRUCTORS
// ==========================================

export const useGetInstructors = () => {
  return useQuery({
    queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS,
    queryFn: api.getInstructors,
    // Add fallback in case the endpoint doesn't exist yet
    retry: false
  });
};

export const useCreateInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInstructorRequest) => api.createInstructor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS });
      toast.success('Instructor created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create instructor');
    }
  });
};

export const useUpdateInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInstructorRequest }) => api.updateInstructor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Instructor updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update instructor');
    }
  });
};

export const useDeleteInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteInstructor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Instructor deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete instructor');
    }
  });
};

export const useUploadInstructorImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) => api.uploadInstructorImage(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS });
      toast.success('Instructor image uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to upload instructor image');
    }
  });
};

export const useDeleteInstructorImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteInstructorImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.INSTRUCTORS });
      toast.success('Instructor image deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete instructor image');
    }
  });
};

// ==========================================
// WORKSHOPS
// ==========================================

export const useWorkshops = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.WORKSHOPS.ALL, { page, limit }],
    queryFn: () => api.getWorkshops(page, limit),
  });
};

export const useGetAdminWorkshops = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.WORKSHOPS.ALL, 'admin', { page, limit }],
    queryFn: () => api.getWorkshops(page, limit),
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
      toast.error(error?.response?.data?.message || 'Failed to create workshop');
    }
  });
};

export const useUpdateWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkshopRequest }) => api.updateWorkshop(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Workshop updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update workshop');
    }
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
      toast.error(error?.response?.data?.message || 'Failed to delete workshop');
    }
  });
};

export const useUploadWorkshopCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) => api.uploadWorkshopCover(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Workshop cover image uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to upload workshop cover image');
    }
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
      toast.error(error?.response?.data?.message || 'Failed to delete workshop cover image');
    }
  });
};

export const useUploadWorkshopGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, files }: { id: string; files: File[] }) => api.uploadWorkshopGallery(id, files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Workshop gallery images uploaded successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to upload gallery images');
    }
  });
};

export const useDeleteWorkshopGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, imageId }: { id: string; imageId: string }) => api.deleteWorkshopGalleryImage(id, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Gallery image deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete gallery image');
    }
  });
};

// ==========================================
// REGISTRATIONS
// ==========================================

export const useGetWorkshopRegistrations = (id: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.WORKSHOPS.REGISTRATIONS(id), { page, limit }],
    queryFn: () => api.getWorkshopRegistrations(id, page, limit),
    enabled: !!id,
  });
};

export const useUpdateRegistrationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, registrationId, status }: { id: string; registrationId: string; status: UpdateRegistrationStatusRequest }) => 
      api.updateRegistrationStatus(id, registrationId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.REGISTRATIONS(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL }); // Invalidate workshops to update remainingSpots
      toast.success('Registration status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update registration status');
    }
  });
};

export const useBulkRegisterToWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userIds }: { id: string; userIds: string[] }) => api.bulkRegisterToWorkshop(id, userIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.REGISTRATIONS(variables.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Users registered successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to bulk register users');
    }
  });
};

export const useRegisterWorkshop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.registerToWorkshop(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ONE(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Successfully registered for the workshop');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to register for workshop');
    }
  });
};

export const useCancelWorkshopRegistration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.cancelWorkshopRegistration(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ONE(id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WORKSHOPS.ALL });
      toast.success('Registration cancelled successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to cancel registration');
    }
  });
};
