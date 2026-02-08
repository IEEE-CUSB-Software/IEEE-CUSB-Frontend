/**
 * Authentication Types
 * These types match the backend DTOs and entities
 */

/**
 * Role enum matching backend RoleName enum
 */
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
 */
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

/**
 * Register Request DTO
 * Note: role is not included - defaults to Visitor on backend
 */
export interface RegisterRequest {
  email: string;
  username: string;
  name: string;
  phone: string;
  faculty: string;
  university: string;
  academic_year: number;
  major: string;
  password: string;
  confirmPassword: string;
}

/**
 * Register Response
 */
export interface RegisterResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

/**
 * Refresh Token Request
 */
export interface RefreshTokenRequest {
  refresh_token: string;
}

/**
 * Refresh Token Response
 */
export interface RefreshTokenResponse {
  access_token: string;
}

/**
 * Change Password Request
 */
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

/**
 * Send OTP Request
 */
export interface SendOTPRequest {
  email: string;
}

/**
 * Verify OTP Request
 */
export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

/**
 * Reset Password Request
 */
export interface ResetPasswordRequest {
  email: string;
  otp: string;
  new_password: string;
}

/**
 * Complete OAuth Profile Request
 */
export interface CompleteOAuthProfileRequest {
  faculty: string;
  university: string;
  phone: string;
  academic_year: number;
  major: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

/**
 * API Error Response
 */
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}
