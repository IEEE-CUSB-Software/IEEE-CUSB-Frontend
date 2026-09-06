import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { eventsApi } from './events.api';
import { QUERY_KEYS } from '@/shared/constants/apiConstants';
import type {
  Event,
  CreateEventRequest,
  UpdateEventRequest,
  UpdateRegistrationStatusRequest,
  PaginationParams,
  PaginatedEventsResponse,
  PaginatedRegistrationsResponse,
} from '@/shared/types/events.types';

type EventsCache =
  | PaginatedEventsResponse
  | InfiniteData<PaginatedEventsResponse>
  | Event[];

const updateEventRegistrationState = (
  cache: EventsCache | undefined,
  eventId: string,
  isRegistered: boolean
): EventsCache | undefined => {
  if (!cache) return cache;

  if (Array.isArray(cache)) {
    return cache.map(event =>
      event.id === eventId ? { ...event, is_registered: isRegistered } : event
    );
  }

  if ('pages' in cache) {
    return {
      ...cache,
      pages: cache.pages.map(page => ({
        ...page,
        data: page.data.map(event =>
          event.id === eventId
            ? { ...event, is_registered: isRegistered }
            : event
        ),
      })),
    };
  }

  return {
    ...cache,
    data: cache.data.map(event =>
      event.id === eventId ? { ...event, is_registered: isRegistered } : event
    ),
  };
};

const eventListQueryFilter = {
  queryKey: QUERY_KEYS.EVENTS.ALL,
  predicate: (query: { queryKey: readonly unknown[] }) =>
    query.queryKey.length === 2 &&
    (query.queryKey[1] === 'infinite' || typeof query.queryKey[1] === 'object'),
};

/**
 * Hook to get all events with pagination
 */
export const useEvents = (params: PaginationParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.EVENTS.ALL, params],
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

    onMutate: async (eventId: string) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(eventId),
      });
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.EVENTS.REGISTRATIONS(eventId),
      });

      const previousEvent = queryClient.getQueryData<Event>(
        QUERY_KEYS.EVENTS.ONE(eventId)
      );
      const previousEvents =
        queryClient.getQueriesData<EventsCache>(eventListQueryFilter);
      const previousRegistrations =
        queryClient.getQueriesData<PaginatedRegistrationsResponse>({
          queryKey: QUERY_KEYS.EVENTS.REGISTRATIONS(eventId),
        });

      queryClient.setQueryData<Event>(QUERY_KEYS.EVENTS.ONE(eventId), old =>
        old ? { ...old, is_registered: true } : old
      );

      queryClient.setQueriesData<EventsCache>(eventListQueryFilter, old =>
        updateEventRegistrationState(old, eventId, true)
      );

      return { previousEvent, previousEvents, previousRegistrations };
    },

    onError: (error: any, eventId, context) => {
      if (context?.previousEvent) {
        queryClient.setQueryData(
          QUERY_KEYS.EVENTS.ONE(eventId),
          context.previousEvent
        );
      }
      context?.previousEvents?.forEach(([queryKey, previousEvents]) => {
        queryClient.setQueryData(queryKey, previousEvents);
      });
      context?.previousRegistrations?.forEach(
        ([queryKey, previousRegistrations]) => {
          queryClient.setQueryData(queryKey, previousRegistrations);
        }
      );

      const message =
        error?.response?.data?.message || 'Failed to register for event.';
      toast.error(message);
    },

    onSuccess: () => {
      toast.success('Successfully registered for the event!');
    },

    onSettled: (_, __, eventId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(eventId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.REGISTRATIONS(eventId),
      });
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
    onMutate: async (eventId: string) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(eventId),
      });
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.EVENTS.REGISTRATIONS(eventId),
      });

      const previousEvent = queryClient.getQueryData<Event>(
        QUERY_KEYS.EVENTS.ONE(eventId)
      );
      const previousEvents =
        queryClient.getQueriesData<EventsCache>(eventListQueryFilter);
      const previousRegistrations =
        queryClient.getQueriesData<PaginatedRegistrationsResponse>({
          queryKey: QUERY_KEYS.EVENTS.REGISTRATIONS(eventId),
        });

      queryClient.setQueryData<Event>(QUERY_KEYS.EVENTS.ONE(eventId), old =>
        old ? { ...old, is_registered: false } : old
      );
      queryClient.setQueriesData<EventsCache>(eventListQueryFilter, old =>
        updateEventRegistrationState(old, eventId, false)
      );

      return { previousEvent, previousEvents, previousRegistrations };
    },
    onError: (error: any, eventId, context) => {
      if (context?.previousEvent) {
        queryClient.setQueryData(
          QUERY_KEYS.EVENTS.ONE(eventId),
          context.previousEvent
        );
      }
      context?.previousEvents?.forEach(([queryKey, previousEvents]) => {
        queryClient.setQueryData(queryKey, previousEvents);
      });
      context?.previousRegistrations?.forEach(
        ([queryKey, previousRegistrations]) => {
          queryClient.setQueryData(queryKey, previousRegistrations);
        }
      );

      const message =
        error?.response?.data?.message || 'Failed to cancel registration.';
      toast.error(message);
    },
    onSuccess: () => {
      toast.success('Registration cancelled successfully!');
    },
    onSettled: (_, __, eventId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ALL,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(eventId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.REGISTRATIONS(eventId),
      });
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

// ─── Event Image Hooks ──────────────────────────────────────────────────────

/**
 * Hook to upload/replace primary event image (Admin only)
 */
export const useUploadEventImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) =>
      eventsApi.uploadEventImage(id, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(variables.id),
      });
      toast.success('Event image uploaded successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to upload event image.';
      toast.error(message);
    },
  });
};

/**
 * Hook to delete primary event image (Admin only)
 */
export const useDeleteEventImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventsApi.deleteEventImage(id),
    onSuccess: updatedEvent => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(updatedEvent.id),
      });
      toast.success('Event image deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete event image.';
      toast.error(message);
    },
  });
};

/**
 * Hook to upload event gallery images (Admin only)
 */
export const useUploadEventGallery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, files }: { id: string; files: File[] }) =>
      eventsApi.uploadEventGallery(id, files),
    onSuccess: (_, variables) => {
      // Invalidate both the list and the single event so event.images stays fresh
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(variables.id),
      });
      toast.success('Gallery images uploaded successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to upload gallery images.';
      toast.error(message);
    },
  });
};

/**
 * Hook to delete a single gallery image (Admin only)
 */
export const useDeleteEventGalleryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId, imageId }: { eventId: string; imageId: string }) =>
      eventsApi.deleteEventGalleryImage(eventId, imageId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ONE(variables.eventId),
      });
      toast.success('Gallery image deleted successfully!');
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || 'Failed to delete gallery image.';
      toast.error(message);
    },
  });
};
