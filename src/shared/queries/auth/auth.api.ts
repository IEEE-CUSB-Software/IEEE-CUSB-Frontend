import { apiClient } from '@/shared/config/api.config';
import { API_ENDPOINTS } from '@/shared/constants/apiConstants';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SendOTPRequest,
  VerifyOTPRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  CompleteOAuthProfileRequest,
} from '@/shared/types/auth.types';

/**
 * Authentication API Service
 */
export const authApi = {
  /**
   * Login user with email/username and password
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data.data;
  },

  /**
   * Register new user (default role: Visitor)
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<ApiResponse<RegisterResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  /**
   * Get current authenticated user
   */
  getMe: async (): Promise<{
    user: import('@/shared/types/auth.types').User;
  }> => {
    const response = await apiClient.get<
      ApiResponse<{ user: import('@/shared/types/auth.types').User }>
    >(API_ENDPOINTS.AUTH.ME);
    return response.data.data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (
    data: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    const response = await apiClient.post<ApiResponse<RefreshTokenResponse>>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      data
    );
    return response.data.data;
  },

  /**
   * Send OTP to email for verification
   */
  sendEmailOTP: async (data: SendOTPRequest): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.SEND_EMAIL_OTP, data);
  },

  /**
   * Verify email with OTP
   */
  verifyEmailOTP: async (data: VerifyOTPRequest): Promise<void> => {
    await apiClient.patch(API_ENDPOINTS.AUTH.VERIFY_EMAIL_OTP, data);
  },

  /**
   * Send OTP to email for password reset
   */
  sendPasswordOTP: async (data: SendOTPRequest): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.SEND_PASSWORD_OTP, data);
  },

  /**
   * Reset password with OTP
   */
  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    await apiClient.patch(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },

  /**
   * Change password (requires authentication)
   */
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await apiClient.patch(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },

  /**
   * Complete OAuth profile after social login
   */
  completeOAuthProfile: async (
    data: CompleteOAuthProfileRequest
  ): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.COMPLETE_OAUTH_PROFILE, data);
  },
};
