import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type {
  Vacancy,
  Application,
  ApplyToVacancyRequest,
  ApiResponse,
  PaginatedResponse
} from '@/shared/types/recruitment.types';

export const getVacancies = async (): Promise<Vacancy[]> => {
  const response = await apiClient.get<PaginatedResponse<Vacancy>>(
    API_ENDPOINTS.RECRUITMENT.GET_VACANCIES
  );
  return response.data.data;
};

export const applyToVacancy = async (
  vacancyId: string,
  data: ApplyToVacancyRequest
): Promise<Application> => {
  const response = await apiClient.post<ApiResponse<Application>>(
    API_ENDPOINTS.RECRUITMENT.APPLY(vacancyId),
    data
  );
  return response.data.data;
};

export const getMyApplications = async (): Promise<Application[]> => {
  const response = await apiClient.get<PaginatedResponse<Application>>(
    API_ENDPOINTS.RECRUITMENT.GET_MY_APPLICATIONS
  );
  return response.data.data;
};

export const revokeApplication = async (id: string): Promise<void> => {
  await apiClient.delete(API_ENDPOINTS.RECRUITMENT.REVOKE_APPLICATION(id));
};

/**
 * GET /admin/recruitment/applications/:id/cv — admin: view an applicant's CV
 * Streams the PDF binary directly to a new browser tab with proper auth headers.
 */
export const adminViewApplicationCv = async (applicationId: string): Promise<void> => {
  const response = await apiClient.get(
    API_ENDPOINTS.RECRUITMENT.ADMIN_VIEW_APPLICATION_CV(applicationId),
    { responseType: 'blob' }
  );
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
};
