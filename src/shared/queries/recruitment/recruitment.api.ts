import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type {
  Vacancy,
  Application,
  ApplyToVacancyRequest,
  ApiResponse,
  PaginatedResponse,
  AddVacancy,
  UpdateVacancy,
  GetAllApplicationsParams,
  UpdateStatus,
  ExportApplicationsParams,
} from '@/shared/types/recruitment.types';

export const addVacancy = async (data: AddVacancy): Promise<Vacancy> => {
  const response = await apiClient.post<ApiResponse<Vacancy>>(
    API_ENDPOINTS.RECRUITMENT.CREATE,
    data
  );
  return response.data.data;
};

export const getAdminVacancies = async (): Promise<Vacancy[]> => {
  const response = await apiClient.get<PaginatedResponse<Vacancy>>(
    API_ENDPOINTS.RECRUITMENT.GET_ALL_VACANCIES
  );
  return response.data.data;
};

export const updateVacancy = async (
  vacancyId: string,
  data: UpdateVacancy
): Promise<Vacancy> => {
  const response = await apiClient.patch<ApiResponse<Vacancy>>(
    API_ENDPOINTS.RECRUITMENT.UPDATE_VACANCY(vacancyId),
    data
  );
  return response.data.data;
};

export const deleteVacancy = async (vacancyId: string): Promise<void> => {
  await apiClient.delete<ApiResponse<Vacancy>>(
    API_ENDPOINTS.RECRUITMENT.DELETE_VACANCY(vacancyId)
  );
};

export const getAllApplications = async ({
  vacancyId,
  startDate,
  endDate,
  page = 1,
  limit = 100,
}: GetAllApplicationsParams): Promise<Application[]> => {
  const response = await apiClient.get<PaginatedResponse<Application>>(
    API_ENDPOINTS.RECRUITMENT.GET_ALL_APPLICATIONS(vacancyId),
    {
      params: {
        startDate,
        endDate,
        page,
        limit,
      },
    }
  );
  return response.data.data;
};

export const updateApplicationStatus = async (
  applicationId: string,
  data: UpdateStatus
): Promise<Application> => {
  const response = await apiClient.patch<ApiResponse<Application>>(
    API_ENDPOINTS.RECRUITMENT.UPDATE_APPLICATION_STATUS(applicationId),
    data
  );
  return response.data.data;
};

export const exportApplications = async ({
  vacancyId,
  startDate,
  endDate,
}: ExportApplicationsParams): Promise<Blob> => {
  const response = await apiClient.get(
    API_ENDPOINTS.RECRUITMENT.EXPORT_APPLICATIONS(vacancyId),
    {
      params: {
        startDate,
        endDate,
      },
      responseType: 'blob',
    }
  );

  return response.data;
};

export const viewApplicationCV = async (
  applicationId: string
): Promise<Blob> => {
  const response = await apiClient.get(
    API_ENDPOINTS.RECRUITMENT.VIEW_APPLICATION_CV(applicationId),
    {
      responseType: 'blob',
    }
  );

  return response.data;
};

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
