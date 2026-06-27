export interface ApiResponse<T> {
  data: T;
  message?: string;
  status_code?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  message?: string;
}

export interface Vacancy {
  id: string;
  title: string;
  description: string;
  is_open: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApplicationExtraData {
  why_join: string;
  portfolio?: string;
  [key: string]: any; // To support future extra data
}

export interface Application {
  id: string;
  user_id: string;
  vacancy_id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  extra_data: ApplicationExtraData;
  created_at: string;
  updated_at: string;
}

export interface ApplyToVacancyRequest {
  extra_data: ApplicationExtraData;
}
