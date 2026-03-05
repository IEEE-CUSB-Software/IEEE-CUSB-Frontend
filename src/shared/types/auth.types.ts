
export enum RoleName {
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  FACULTY_MEMBER = 'Faculty Member',
  VISITOR = 'Visitor',
}

/**
 * Role entity type
 */
export interface Role {
  id: string;
  name: RoleName;
  description: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * User entity type
 */
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role_id: string;
  role: Role;
  avatar_url: string | null;
  bio: string | null;
  phone: string;
  faculty: string;
  university: string;
  academic_year: number;
  major: string;
  created_at: string;
  updated_at: string;
  verified_email: boolean;
  is_active: boolean;
  github_id: string | null;
  google_id: string | null;
  oauth_provider?: string | null;
}

/**
 * Login Request DTO
 */
export interface LoginRequest {
  identifier: string; // email or username
  password: string;
}

/**
 * Login Response
 * Note: refresh_token is set as httpOnly cookie by the backend
 */
export interface LoginResponse {
  access_token: string;
  user: User;
}

/**
 * Register Request DTO
 */
export interface RegisterRequest {
  email: string;
  username: string;
  name: string;
  phone: string;
  faculty: string;
  university: string;
  academic_year: number;
  password: string;
  confirmPassword: string;
}

/**
 * Register Response
 * Note: Backend returns only the user object, no tokens
 */
export interface RegisterResponse {
  user: User;
}

/**
 * Refresh Token Response
 * Note: refresh_token is read from httpOnly cookie by the backend
 */
export interface RefreshTokenResponse {
  access_token: string;
}

/**
 * Change Password Request
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

/**
 * Send OTP Request (for password reset)
 */
export interface SendOTPRequest {
  email: string;
}

/**
 * Verify OTP Request (for email verification — user identified via JWT)
 */
export interface VerifyOTPRequest {
  otp: string;
}

/**
 * Reset Password Request
 */
export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

/**
 * Complete OAuth Profile Request
 */
export interface CompleteOAuthProfileRequest {
  faculty: string;
  university: string;
  phone: string;
  academic_year: number;
  major?: string;
  username?: string;
}

/**
 * API Response wrapper (matches backend ResponseInterceptor)
 */
export interface ApiResponse<T> {
  data: T;
  count: number;
  message: string;
}

/**
 * API Error Response
 */
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
