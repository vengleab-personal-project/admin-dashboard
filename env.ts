/**
 * Centralized environment variables for the Admin Dashboard
 */

export const env = {
  // Backend API base URL
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',

  // Frontend URL (for OAuth redirects)
  frontendUrl: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000',
} as const;


