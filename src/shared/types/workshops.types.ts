import { User } from './auth.types';

export type WorkshopCategory = 'Technical' | 'Non-Technical' | 'Social';

export interface Workshop {
  id: string;
  title: string;
  description: string;
  category: WorkshopCategory;
  location: string;
  start_time: string;
  end_time: string;
  capacity: number;
  remainingSpots: number;
  is_full: boolean;
  registration_deadline: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  image_url?: string | null;
  image_public_id?: string | null;
  images?: WorkshopGalleryImage[];
  is_registered?: boolean;
  registration_id?: string;
}

/**
 * Workshop gallery image entity
 */
export interface WorkshopGalleryImage {
  id: string;
  workshop_id: string;
  image_url: string;
  image_public_id: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Workshop registration status enum
 */
export enum WorkshopRegistrationStatus {
  REGISTERED = 'registered',
  WAITLISTED = 'waitlisted',
  CANCELLED = 'cancelled',
  ATTENDED = 'attended',
}

/**
 * Workshop registration entity type
 */
export interface WorkshopRegistration {
  id: string;
  user_id: string;
  workshop_id: string;
  status: WorkshopRegistrationStatus;
  created_at: string;
  updated_at: string;
  user?: User;
}

/**
 * Create Workshop Request DTO
 */
export interface CreateWorkshopRequest {
  title: string;
  description: string;
  category: WorkshopCategory;
  location: string;
  start_time: string;
  end_time: string;
  capacity: number;
  registration_deadline: string;
}

/**
 * Update Workshop Request DTO (all fields optional)
 */
export interface UpdateWorkshopRequest {
  title?: string;
  description?: string;
  category?: WorkshopCategory;
  location?: string;
  start_time?: string;
  end_time?: string;
  capacity?: number;
  registration_deadline?: string;
}

/**
 * Update Registration Status Request DTO
 */
export interface UpdateRegistrationStatusRequest {
  status: WorkshopRegistrationStatus;
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * API Response wrapper (matches backend response format)
 */
export interface WorkshopApiResponse<T> {
  data: T;
  count: number;
  message: string;
}

/**
 * Paginated Workshops Response
 */
export interface PaginatedWorkshopsResponse {
  data: Workshop[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  count: number;
  message: string;
}

/**
 * Paginated Registrations Response
 */
export interface PaginatedRegistrationsResponse {
  data: WorkshopRegistration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Default export for backward compatibility
export default Workshop;
