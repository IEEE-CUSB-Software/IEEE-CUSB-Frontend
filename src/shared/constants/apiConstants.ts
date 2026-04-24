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

  // Awards endpoints
  AWARDS: {
    GET_ALL: '/awards',
    GET_ONE: (id: string) => `/awards/${id}`,
    CREATE: '/admin/awards',
    UPDATE: (id: string) => `/admin/awards/${id}`,
    DELETE: (id: string) => `/admin/awards/${id}`,
    UPLOAD_IMAGE: (id: string) => `/admin/awards/${id}/image`,
    DELETE_IMAGE: (id: string) => `/admin/awards/${id}/image`,
  },

  // Events endpoints
  EVENTS: {
    CREATE: '/admin/events',
    GET_ALL: '/events',
    GET_ONE: (id: string) => `/events/${id}`,
    UPDATE: (id: string) => `/admin/events/${id}`,
    DELETE: (id: string) => `/admin/events/${id}`,
    REGISTER: (id: string) => `/events/${id}/register`,
    CANCEL_REGISTRATION: (id: string) => `/events/${id}/cancel`,
    GET_REGISTRATIONS: (id: string) => `/admin/events/${id}/registrations`,
    UPDATE_REGISTRATION_STATUS: (eventId: string, registrationId: string) =>
      `/admin/events/${eventId}/registrations/${registrationId}/status`,
    UPLOAD_IMAGE: (id: string) => `/admin/events/${id}/image`,
    DELETE_IMAGE: (id: string) => `/admin/events/${id}/image`,
    UPLOAD_GALLERY: (id: string) => `/admin/events/${id}/images`,
    DELETE_GALLERY_IMAGE: (id: string, imageId: string) =>
      `/admin/events/${id}/images/${imageId}`,
    GET_GALLERY: (id: string) => `/events/${id}/images`,
  },

  // Committees endpoints
  COMMITTEES: {
    CREATE: '/admin/committees',
    GET_ALL: '/committees',
    GET_ONE: (id: string) => `/committees/${id}`,
    UPDATE: (id: string) => `/admin/committees/${id}`,
    DELETE: (id: string) => `/admin/committees/${id}`,
    GET_MEMBERS: (committeeId: string) => `/committees/${committeeId}/members`,
    CREATE_COMMITTEE_MEMBER: `/admin/committees/members`,
    UPDATE_COMMITTEE_MEMBER: (id: string) => `/admin/committees/members/${id}`,
    DELETE_COMMITTEE_MEMBER: (id: string) => `/admin/committees/members/${id}`,
  },

  COMMITTEE_CATEGORIES: {
    CREATE: '/admin/categories',
    GET_ALL: '/categories',
    UPDATE: (id: string) => `/admin/categories/${id}`,
    DELETE: (id: string) => `/admin/categories/${id}`,
  },

  // Board endpoints
  BOARD: {
    GET_ALL: '/board',
    CREATE: '/admin/board',
    UPDATE: (id: string) => `/admin/board/${id}`,
    DELETE: (id: string) => `/admin/board/${id}`,
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
    GALLERY: (eventId: string) => ['events', eventId, 'gallery'],
  },
  COMMITTEES: {
    ALL: ['committees'],
    INFINITE: ['committees', 'infinite'],
    ONE: (id: string) => ['committees', id],
    MEMBERS: (committeeId: string) => ['committees', committeeId, 'members'],
    ONE_MEMBER: (committeeId: string, id: string) => [
      'committees',
      committeeId,
      'members',
      id,
    ],
  },
  COMMITTEE_CATEGORIES: {
    ALL: ['categories'],
    ONE: (id: string) => ['categories', id],
  },
  AWARDS: {
    ALL: ['awards'],
    ONE: (id: string) => ['awards', id],
  },
  BOARD: {
    ALL: ['board'],
  },
} as const;
