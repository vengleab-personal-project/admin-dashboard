/**
 * Application Configuration
 */

import { env } from './env';

export const config = {
  // Backend API base URL
  apiBaseUrl: env.apiBaseUrl,
  
  // Frontend URL (for OAuth redirects)
  frontendUrl: env.frontendUrl,
  
  // Token storage keys
  tokenKey: 'admin_access_token',
  refreshTokenKey: 'admin_refresh_token',
  userKey: 'admin_user',
  routes: {
    login: '/auth/login',
  },
} as const;



