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
} from '@/shared/types/events.types';

type EventsCache =
  | PaginatedEventsResponse
  | InfiniteData<PaginatedEventsResponse>
  | Event[]
  | Event;

const updateSingleEventRegistration = (
  event: Event,
  eventId: string,
  isRegistered: boolean
): Event => {
  if (event.id !== eventId) return event;

  const currentSpots = event.remainingSpots ?? event.capacity ?? 0;
  const newSpots = isRegistered
    ? Math.max(0, currentSpots - 1)
    : currentSpots + 1;

  return {
    ...event,
    is_registered: isRegistered,
    remainingSpots: newSpots,
    is_full: newSpots === 0,
  };
};

const updateEventRegistrationState = (
  cache: EventsCache | undefined,
  eventId: string,
  isRegistered: boolean
): EventsCache | undefined => {
  if (!cache) return cache;

  // 1. Array of events
  if (Array.isArray(cache)) {
    return cache.map(event =>
      updateSingleEventRegistration(event, eventId, isRegistered)
    );
  }

  // 2. Infinite query structure { pages: [{ data: Event[] }] }
  if ('pages' in cache && Array.isArray(cache.pages)) {
    return {
      ...cache,
      pages: cache.pages.map(page => ({
        ...page,
        data: Array.isArray(page.data)
          ? page.data.map(event =>
              updateSingleEventRegistration(event, eventId, isRegistered)
            )
          : page.data,
      })),
    };
  }

  // 3. Paginated response { data: Event[] }
  if ('data' in cache && Array.isArray(cache.data)) {
    return {
      ...cache,
      data: cache.data.map(event =>
        updateSingleEventRegistration(event, eventId, isRegistered)
      ),
    };
  }

  // 4. Single Event object { id: string, ... }
  if ('id' in cache && (cache as Event).id === eventId) {
    return updateSingleEventRegistration(cache as Event, eventId, isRegistered);
  }

  return cache;
};

const eventListQueryFilter = {
  queryKey: QUERY_KEYS.EVENTS.ALL,
  predicate: (query: { queryKey: readonly unknown[] }) =>
    query.queryKey.length === 2 &&
    (query.queryKey[1] === 'infinite' ||
      query.queryKey[1] === undefined ||
      typeof query.queryKey[1] === 'object'),
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

      const previousEvent = queryClient.getQueryData<Event>(
        QUERY_KEYS.EVENTS.ONE(eventId)
      );
      const previousEvents =
        queryClient.getQueriesData<EventsCache>(eventListQueryFilter);

      queryClient.setQueryData<Event>(QUERY_KEYS.EVENTS.ONE(eventId), old =>
        old ? updateSingleEventRegistration(old, eventId, true) : old
      );

      queryClient.setQueriesData<EventsCache>(eventListQueryFilter, old =>
        updateEventRegistrationState(old, eventId, true)
      );

      return { previousEvent, previousEvents };
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

      const message =
        error?.response?.data?.message || 'Failed to register for event.';
      toast.error(message);
    },

    onSuccess: () => {
      toast.success('Successfully registered for the event!');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS.ALL });
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

      const previousEvent = queryClient.getQueryData<Event>(
        QUERY_KEYS.EVENTS.ONE(eventId)
      );
      const previousEvents =
        queryClient.getQueriesData<EventsCache>(eventListQueryFilter);

      queryClient.setQueryData<Event>(QUERY_KEYS.EVENTS.ONE(eventId), old =>
        old ? updateSingleEventRegistration(old, eventId, false) : old
      );
      queryClient.setQueriesData<EventsCache>(eventListQueryFilter, old =>
        updateEventRegistrationState(old, eventId, false)
      );

      return { previousEvent, previousEvents };
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

      const message =
        error?.response?.data?.message || 'Failed to cancel registration.';
      toast.error(message);
    },
    onSuccess: () => {
      toast.success('Registration cancelled successfully!');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.EVENTS.ALL,
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
