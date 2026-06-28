import { apiClient as api } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type {
  Instructor,
  Workshop,
  WorkshopRegistration,
  CreateInstructorRequest,
  UpdateInstructorRequest,
  CreateWorkshopRequest,
  UpdateWorkshopRequest,
  UpdateRegistrationStatusRequest,
  WorkshopApiResponse,
  PaginatedWorkshopsResponse,
  PaginatedRegistrationsResponse,
} from '@/shared/types/workshops.types';

// ==========================================
// INSTRUCTORS
// ==========================================

export const createInstructor = async (
  data: CreateInstructorRequest
): Promise<Instructor> => {
  const response = await api.post<WorkshopApiResponse<Instructor>>(
    API_ENDPOINTS.WORKSHOPS.CREATE_INSTRUCTOR,
    data
  );
  return response.data.data;
};

export const updateInstructor = async (
  id: string,
  data: UpdateInstructorRequest
): Promise<Instructor> => {
  const response = await api.patch<WorkshopApiResponse<Instructor>>(
    API_ENDPOINTS.WORKSHOPS.UPDATE_INSTRUCTOR(id),
    data
  );
  return response.data.data;
};

export const deleteInstructor = async (id: string): Promise<void> => {
  await api.delete(API_ENDPOINTS.WORKSHOPS.DELETE_INSTRUCTOR(id));
};

export const uploadInstructorImage = async (
  id: string,
  file: File
): Promise<Instructor> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post<WorkshopApiResponse<Instructor>>(
    API_ENDPOINTS.WORKSHOPS.UPLOAD_INSTRUCTOR_IMAGE(id),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data.data;
};

export const deleteInstructorImage = async (
  id: string
): Promise<Instructor> => {
  const response = await api.delete<WorkshopApiResponse<Instructor>>(
    API_ENDPOINTS.WORKSHOPS.DELETE_INSTRUCTOR_IMAGE(id)
  );
  return response.data.data;
};

export const getInstructors = async (): Promise<Instructor[]> => {
  const response = await api.get<{ data: Instructor[] }>(
    API_ENDPOINTS.WORKSHOPS.GET_INSTRUCTORS
  );
  return response.data.data;
};

// ==========================================
// WORKSHOPS
// ==========================================

export const createWorkshop = async (
  data: CreateWorkshopRequest
): Promise<Workshop> => {
  const response = await api.post<WorkshopApiResponse<Workshop>>(
    API_ENDPOINTS.WORKSHOPS.CREATE,
    data
  );
  return response.data.data;
};

export const updateWorkshop = async (
  id: string,
  data: UpdateWorkshopRequest
): Promise<Workshop> => {
  const response = await api.patch<WorkshopApiResponse<Workshop>>(
    API_ENDPOINTS.WORKSHOPS.UPDATE(id),
    data
  );
  return response.data.data;
};

export const deleteWorkshop = async (id: string): Promise<void> => {
  await api.delete(API_ENDPOINTS.WORKSHOPS.DELETE(id));
};

export const uploadWorkshopCover = async (
  id: string,
  file: File
): Promise<Workshop> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post<WorkshopApiResponse<Workshop>>(
    API_ENDPOINTS.WORKSHOPS.UPLOAD_IMAGE(id),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data.data;
};

export const deleteWorkshopCover = async (id: string): Promise<Workshop> => {
  const response = await api.delete<WorkshopApiResponse<Workshop>>(
    API_ENDPOINTS.WORKSHOPS.DELETE_IMAGE(id)
  );
  return response.data.data;
};

export const uploadWorkshopGallery = async (
  id: string,
  files: File[]
): Promise<void> => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  await api.post(API_ENDPOINTS.WORKSHOPS.UPLOAD_GALLERY(id), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteWorkshopGalleryImage = async (
  id: string,
  imageId: string
): Promise<void> => {
  await api.delete(API_ENDPOINTS.WORKSHOPS.DELETE_GALLERY_IMAGE(id, imageId));
};

export const getWorkshops = async (
  page = 1,
  limit = 10
): Promise<PaginatedWorkshopsResponse> => {
  const response = await api.get<{ data: PaginatedWorkshopsResponse }>(
    API_ENDPOINTS.WORKSHOPS.GET_ALL,
    {
      params: { page, limit },
    }
  );
  return response.data.data;
};

export const getWorkshop = async (id: string): Promise<Workshop> => {
  const response = await api.get<WorkshopApiResponse<Workshop>>(
    API_ENDPOINTS.WORKSHOPS.GET_ONE(id)
  );
  return response.data.data;
};

// ==========================================
// REGISTRATIONS
// ==========================================

export const getWorkshopRegistrations = async (
  id: string,
  page = 1,
  limit = 10
): Promise<PaginatedRegistrationsResponse> => {
  const response = await api.get<{ data: PaginatedRegistrationsResponse }>(
    API_ENDPOINTS.WORKSHOPS.GET_REGISTRATIONS(id),
    {
      params: { page, limit },
    }
  );
  return response.data.data;
};

export const updateRegistrationStatus = async (
  id: string,
  registrationId: string,
  status: UpdateRegistrationStatusRequest
): Promise<WorkshopRegistration> => {
  const response = await api.patch<WorkshopApiResponse<WorkshopRegistration>>(
    API_ENDPOINTS.WORKSHOPS.UPDATE_REGISTRATION_STATUS(id, registrationId),
    status
  );
  return response.data.data;
};

export const bulkRegisterToWorkshop = async (
  id: string,
  userIds: string[]
): Promise<WorkshopRegistration[]> => {
  const response = await api.post<WorkshopApiResponse<WorkshopRegistration[]>>(
    API_ENDPOINTS.WORKSHOPS.BULK_REGISTER(id),
    { user_ids: userIds }
  );
  return response.data.data;
};

export const registerToWorkshop = async (
  id: string
): Promise<WorkshopRegistration> => {
  const response = await api.post<WorkshopApiResponse<WorkshopRegistration>>(
    API_ENDPOINTS.WORKSHOPS.REGISTER(id)
  );
  return response.data.data;
};

export const cancelWorkshopRegistration = async (id: string): Promise<void> => {
  await api.post(API_ENDPOINTS.WORKSHOPS.CANCEL_REGISTRATION(id));
};
