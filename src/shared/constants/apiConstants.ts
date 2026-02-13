/**
 * API Endpoints Constants
 */

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/token/refresh',
    ME: '/auth/me',
    SEND_EMAIL_OTP: '/auth/otp/email/send',
    VERIFY_EMAIL_OTP: '/auth/otp/email/verify',
    SEND_PASSWORD_OTP: '/auth/otp/password/send',
    RESET_PASSWORD: '/auth/password/reset',
    CHANGE_PASSWORD: '/auth/password/change',
    GOOGLE_AUTH: '/auth/google',
    GOOGLE_CALLBACK: '/auth/google/callback',
    GITHUB_AUTH: '/auth/github',
    GITHUB_CALLBACK: '/auth/github/callback',
    COMPLETE_OAUTH_PROFILE: '/auth/oauth/complete-profile',
  },

  // Users endpoints
  USERS: {
    GET_USER: (id: string) => `/users/${id}`,
    UPDATE_USER: (id: string) => `/users/${id}`,
    DELETE_USER: (id: string) => `/users/${id}`,
  },

  // Roles endpoints
  ROLES: {
    GET_ALL: '/roles',
    GET_ONE: (id: string) => `/roles/${id}`,
    CREATE: '/roles',
    UPDATE: (id: string) => `/roles/${id}`,
    DELETE: (id: string) => `/roles/${id}`,
  },

  // Events endpoints
  EVENTS: {
    CREATE: '/events',
    GET_ALL: '/events',
    GET_ONE: (id: string) => `/events/${id}`,
    UPDATE: (id: string) => `/events/${id}`,
    DELETE: (id: string) => `/events/${id}`,
    REGISTER: (id: string) => `/events/${id}/register`,
    CANCEL_REGISTRATION: (id: string) => `/events/${id}/cancel`,
    GET_REGISTRATIONS: (id: string) => `/events/${id}/registrations`,
    UPDATE_REGISTRATION_STATUS: (eventId: string, registrationId: string) =>
      `/events/${eventId}/registrations/${registrationId}/status`,
  },
} as const;

/**
 * Query Keys for React Query
 */
export const QUERY_KEYS = {
  AUTH: {
    CURRENT_USER: ['auth', 'current-user'],
  },
  USERS: {
    ALL: ['users'],
    ONE: (id: string) => ['users', id],
  },
  ROLES: {
    ALL: ['roles'],
    ONE: (id: string) => ['roles', id],
  },
  EVENTS: {
    ALL: ['events'],
    INFINITE: ['events', 'infinite'],
    ONE: (id: string) => ['events', id],
    REGISTRATIONS: (eventId: string) => ['events', eventId, 'registrations'],
  },
} as const;
