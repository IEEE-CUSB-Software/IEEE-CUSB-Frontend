import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { eventsApi } from './events.api';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import type {
  CreateEventRequest,
  UpdateEventRequest,
  UpdateRegistrationStatusRequest,
  PaginationParams,
} from '@/shared/types/events.types';

/**
 * Hook to get all events with pagination
 */
export const useEvents = (params: PaginationParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.EVENTS.ALL, params.page, params.limit],
    queryFn: () => eventsApi.getEvents(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get events with infinite scrolling
 */
export const useInfiniteEvents = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.EVENTS.INFINITE,
    queryFn: ({ pageParam = 1 }) =>
      eventsApi.getEvents({ page: pageParam, limit }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (acc, page) => acc + page.data.length,
        0
      );
      if (totalFetched < lastPage.count) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to get a single event by ID
 */
export const useEvent = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.EVENTS.ONE(id),
    queryFn: () => eventsApi.getEventById(id),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to create a new event (Admin only)
 */
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventRequest) => eventsApi.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      toast.success('Event created successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to create event.';
      toast.error(message);
    },
  });
};

/**
 * Hook to update an event (Admin only)
 */
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventRequest }) =>
      eventsApi.updateEvent(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(variables.id),
      });
      toast.success('Event updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to update event.';
      toast.error(message);
    },
  });
};

/**
 * Hook to delete an event (Admin only)
 */
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventsApi.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      toast.success('Event deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete event.';
      toast.error(message);
    },
  });
};

/**
 * Hook to register for an event
 */
export const useRegisterForEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => eventsApi.registerForEvent(eventId),
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(eventId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.REGISTRATIONS(eventId),
      });
      toast.success('Successfully registered for the event!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to register for event.';
      toast.error(message);
    },
  });
};

/**
 * Hook to cancel event registration
 */
export const useCancelRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => eventsApi.cancelRegistration(eventId),
    onSuccess: (_, eventId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(eventId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.REGISTRATIONS(eventId),
      });
      toast.success('Registration cancelled successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to cancel registration.';
      toast.error(message);
    },
  });
};

/**
 * Hook to get event registrations (Admin only)
 */
export const useEventRegistrations = (
  eventId: string,
  params: PaginationParams,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.EVENTS.REGISTRATIONS(eventId),
      params.page,
      params.limit,
    ],
    queryFn: () => eventsApi.getEventRegistrations(eventId, params),
    enabled: enabled && !!eventId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to update registration status (Admin only)
 */
export const useUpdateRegistrationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      eventId,
      registrationId,
      data,
    }: {
      eventId: string;
      registrationId: string;
      data: UpdateRegistrationStatusRequest;
    }) => eventsApi.updateRegistrationStatus(eventId, registrationId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.REGISTRATIONS(variables.eventId),
      });
      toast.success('Registration status updated successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        'Failed to update registration status.';
      toast.error(message);
    },
  });
};
