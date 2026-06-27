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
