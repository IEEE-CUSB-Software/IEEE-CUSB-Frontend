import axios from 'axios';

/**
 * API Configuration
 */

// Base URL for API requests
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Axios instance with default configuration
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies (httpOnly refresh_token) in requests
});

/**
 * Request interceptor to add auth token
 */
apiClient.interceptors.request.use(
  config => {
    // Get token from localStorage
    const token = localStorage.getItem('access_token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle 401 errors with automatic token refresh
 * The refresh token is sent automatically as an httpOnly cookie (withCredentials: true)
 */
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || '';
    const accessToken = localStorage.getItem('access_token');

    const isPublicAuthRequest =
      requestUrl.includes('/auth/login') ||
      requestUrl.includes('/auth/register') ||
      requestUrl.includes('/auth/password/reset') ||
      requestUrl.includes('/auth/otp/password/send');

    if (
      error.response?.status === 401 &&
      !!accessToken &&
      !isPublicAuthRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/token/refresh')
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token is sent automatically via httpOnly cookie
        const response = await axios.post<{ data: { access_token: string } }>(
          `${API_BASE_URL}/auth/token/refresh`,
          {},
          { withCredentials: true }
        );

        const { access_token } = response.data.data;

        // Store new access token
        localStorage.setItem('access_token', access_token);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed — clear access token and redirect to login
        localStorage.removeItem('access_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
