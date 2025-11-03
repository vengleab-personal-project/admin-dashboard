/**
 * Application Configuration
 */

export const config = {
  // Backend API base URL
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  
  // Frontend URL (for OAuth redirects)
  frontendUrl: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000',
  
  // Token storage keys
  tokenKey: 'admin_access_token',
  refreshTokenKey: 'admin_refresh_token',
  userKey: 'admin_user',
} as const;



