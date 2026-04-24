import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type {
  Event,
  EventRegistration,
  EventGalleryImage,
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
   * Backend returns: { data: { data: Event[], total, page, limit, totalPages }, count, message }
   */
  getEvents: async (
    params: PaginationParams
  ): Promise<PaginatedEventsResponse> => {
    const response = await apiClient.get<{ data: PaginatedEventsResponse }>(
      API_ENDPOINTS.EVENTS.GET_ALL,
      {
        params: {
          page: params.page.toString(),
          limit: params.limit.toString(),
        },
      }
    );
    // Unwrap the nested data structure
    return response.data.data;
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
   * Upload or replace the primary event image (Admin only)
   */
  uploadEventImage: async (id: string, file: File): Promise<Event> => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiClient.post<EventApiResponse<Event>>(
      API_ENDPOINTS.EVENTS.UPLOAD_IMAGE(id),
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.data;
  },

  /**
   * Delete the primary event image (Admin only)
   */
  deleteEventImage: async (id: string): Promise<Event> => {
    const response = await apiClient.delete<EventApiResponse<Event>>(
      API_ENDPOINTS.EVENTS.DELETE_IMAGE(id)
    );
    return response.data.data;
  },

  /**
   * Upload one or more gallery images (Admin only)
   */
  uploadEventGallery: async (id: string, files: File[]): Promise<EventGalleryImage[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    const response = await apiClient.post<EventApiResponse<EventGalleryImage[]>>(
      API_ENDPOINTS.EVENTS.UPLOAD_GALLERY(id),
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.data;
  },

  /**
   * Delete a single gallery image (Admin only)
   */
  deleteEventGalleryImage: async (id: string, imageId: string): Promise<EventGalleryImage> => {
    const response = await apiClient.delete<EventApiResponse<EventGalleryImage>>(
      API_ENDPOINTS.EVENTS.DELETE_GALLERY_IMAGE(id, imageId)
    );
    return response.data.data;
  },

  /**
   * Get event gallery images (Public)
   */
  getEventGallery: async (id: string): Promise<EventGalleryImage[]> => {
    const response = await apiClient.get<EventApiResponse<EventGalleryImage[]>>(
      API_ENDPOINTS.EVENTS.GET_GALLERY(id)
    );
    return response.data.data;
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
    const response = await apiClient.get<{
      data: PaginatedRegistrationsResponse;
    }>(API_ENDPOINTS.EVENTS.GET_REGISTRATIONS(eventId), {
      params: {
        page: params.page.toString(),
        limit: params.limit.toString(),
      },
    });
    return response.data.data;
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

