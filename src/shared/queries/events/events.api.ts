import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type {
  Event,
  EventRegistration,
  CreateEventRequest,
  UpdateEventRequest,
  UpdateRegistrationStatusRequest,
  PaginationParams,
  EventApiResponse,
  PaginatedEventsResponse,
  PaginatedRegistrationsResponse,
} from '@/shared/types/events.types';

/**
 * Events API Service
 */
export const eventsApi = {
  /**
   * Create a new event (Admin only)
   */
  createEvent: async (data: CreateEventRequest): Promise<Event> => {
    const response = await apiClient.post<EventApiResponse<Event>>(
      API_ENDPOINTS.EVENTS.CREATE,
      data
    );
    return response.data.data;
  },

  /**
   * Get all events with pagination
   */
  getEvents: async (
    params: PaginationParams
  ): Promise<PaginatedEventsResponse> => {
    const response = await apiClient.get<PaginatedEventsResponse>(
      API_ENDPOINTS.EVENTS.GET_ALL,
      {
        params: {
          page: params.page.toString(),
          limit: params.limit.toString(),
        },
      }
    );
    return response.data;
  },

  /**
   * Get a single event by ID
   */
  getEventById: async (id: string): Promise<Event> => {
    const response = await apiClient.get<EventApiResponse<Event>>(
      API_ENDPOINTS.EVENTS.GET_ONE(id)
    );
    return response.data.data;
  },

  /**
   * Update an event (Admin only)
   */
  updateEvent: async (id: string, data: UpdateEventRequest): Promise<Event> => {
    const response = await apiClient.patch<EventApiResponse<Event>>(
      API_ENDPOINTS.EVENTS.UPDATE(id),
      data
    );
    return response.data.data;
  },

  /**
   * Delete an event (Admin only)
   */
  deleteEvent: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.EVENTS.DELETE(id));
  },

  /**
   * Register for an event
   */
  registerForEvent: async (eventId: string): Promise<EventRegistration> => {
    const response = await apiClient.post<EventApiResponse<EventRegistration>>(
      API_ENDPOINTS.EVENTS.REGISTER(eventId)
    );
    return response.data.data;
  },

  /**
   * Cancel event registration
   */
  cancelRegistration: async (eventId: string): Promise<EventRegistration> => {
    const response = await apiClient.patch<EventApiResponse<EventRegistration>>(
      API_ENDPOINTS.EVENTS.CANCEL_REGISTRATION(eventId)
    );
    return response.data.data;
  },

  /**
   * Get event registrations (Admin only)
   */
  getEventRegistrations: async (
    eventId: string,
    params: PaginationParams
  ): Promise<PaginatedRegistrationsResponse> => {
    const response = await apiClient.get<PaginatedRegistrationsResponse>(
      API_ENDPOINTS.EVENTS.GET_REGISTRATIONS(eventId),
      {
        params: {
          page: params.page.toString(),
          limit: params.limit.toString(),
        },
      }
    );
    return response.data;
  },

  /**
   * Update registration status (Admin only)
   */
  updateRegistrationStatus: async (
    eventId: string,
    registrationId: string,
    data: UpdateRegistrationStatusRequest
  ): Promise<EventRegistration> => {
    const response = await apiClient.patch<EventApiResponse<EventRegistration>>(
      API_ENDPOINTS.EVENTS.UPDATE_REGISTRATION_STATUS(eventId, registrationId),
      data
    );
    return response.data.data;
  },
};
