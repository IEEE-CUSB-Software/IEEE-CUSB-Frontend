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
    // 1. Refresh the token
    const storedRefreshToken = localStorage.getItem('refresh_token');
    if (!storedRefreshToken) {
      throw new Error('No refresh token found');
    }

    const refreshResponse = await authApi.refreshToken({
      refresh_token: storedRefreshToken,
    });
    const accessToken = refreshResponse.access_token;

    // 2. Decode the token to get user ID
    const { parseJwt } = await import('@/shared/utils/helpers');
    const decoded = parseJwt(accessToken);

    if (!decoded || !decoded.id) {
      throw new Error('Failed to decode token');
    }

    // 3. Fetch user details using the new token
    // We need to manually set the Authorization header for this request
    // because the interceptor might not have the new token yet
    const userResponse = await apiClient.get<
      ApiResponse<import('@/shared/types/auth.types').User>
    >(API_ENDPOINTS.USERS.GET_USER(decoded.id), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 4. Return user data
    // The response is wrapped in ApiResponse, so user data is in userResponse.data.data
    // Note: We also need to return the new access token so AuthProvider can update the store
    // However, the current return type is just { user }.
    // The AuthProvider will handle the token update if we ensure valid tokens are in place.
    // Ideally, getMe should probably return the token too, but let's stick to the interface.
    // The interceptor or AuthProvider should update the localStorage/store with the new token.

    // Actually, since we are doing this manually, we should update localStorage here to be safe
    // or rely on the caller to handle it.
    // Let's update localStorage here for immediate consistency
    localStorage.setItem('access_token', accessToken);

    return { user: userResponse.data.data as any };
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
