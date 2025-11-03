import { api, apiService } from './api.service';
import { config } from '../config';
import { User } from '../types';

export interface LoginResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
    tokenType: string;
  };
}

/**
 * Authentication Service
 */
export class AuthService {
  /**
   * Initiate Google OAuth login
   */
  loginWithGoogle(): void {
    window.location.href = `${config.apiBaseUrl}/auth/google`;
  }

  /**
   * Initiate GitHub OAuth login
   */
  loginWithGitHub(): void {
    window.location.href = `${config.apiBaseUrl}/auth/github`;
  }

  /**
   * Handle OAuth callback with tokens from URL
   */
  handleOAuthCallback(token: string, refreshToken: string): void {
    apiService.setAuthToken(token, refreshToken);
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    const user = response.data.user;
    localStorage.setItem(config.userKey, JSON.stringify(user));
    return user;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse['tokens']> {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiService.clearAuth();
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return apiService.isAuthenticated();
  }

  /**
   * Get stored user from localStorage
   */
  getStoredUser(): User | null {
    const userStr = localStorage.getItem(config.userKey);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }
}

export const authService = new AuthService();



