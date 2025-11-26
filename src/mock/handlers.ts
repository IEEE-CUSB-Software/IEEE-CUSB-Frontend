import { http, HttpResponse } from 'msw';
import { itemHandlers } from '@/features/example/mocks';

/**
 * Global MSW Handlers
 * Import feature-specific handlers and combine them here
 */

// Define your API base URL
const API_BASE_URL = '/api';

// Global handlers (not feature-specific)
const globalHandlers = [
  // Error response example
  http.get(`${API_BASE_URL}/error`, () => {
    return HttpResponse.json(
      {
        error: 'This is a simulated error',
      },
      { status: 500 }
    );
  }),

  // Delayed response example
  http.get(`${API_BASE_URL}/slow`, async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return HttpResponse.json({ message: 'Slow response' }, { status: 200 });
  }),
];

/**
 * Combine all handlers
 * Feature handlers take precedence over global handlers
 */
export const handlers = [
  ...itemHandlers, // Example feature handlers
  ...globalHandlers, // Global handlers
];
