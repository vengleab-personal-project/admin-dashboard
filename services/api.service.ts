import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { config } from '../config';

/**
 * Axios instance configured for the backend API
 */
class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(config.tokenKey);
        if (token && request.headers) {
          request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // If 401 and haven't retried, try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem(config.refreshTokenKey);
            if (refreshToken) {
              const response = await axios.post(`${config.apiBaseUrl}/auth/refresh`, {
                refreshToken,
              });

              const { accessToken, refreshToken: newRefreshToken } = response.data;
              localStorage.setItem(config.tokenKey, accessToken);
              localStorage.setItem(config.refreshTokenKey, newRefreshToken);

              // Retry original request with new token
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              }
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, logout user
            this.clearAuth();
            window.location.href = config.routes.login;
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Get the axios instance
   */
  getInstance(): AxiosInstance {
    return this.api;
  }

  /**
   * Set authentication token
   */
  setAuthToken(token: string, refreshToken?: string): void {
    localStorage.setItem(config.tokenKey, token);
    if (refreshToken) {
      localStorage.setItem(config.refreshTokenKey, refreshToken);
    }
  }

  /**
   * Get authentication token
   */
  getAuthToken(): string | null {
    return localStorage.getItem(config.tokenKey);
  }

  /**
   * Clear authentication
   */
  clearAuth(): void {
    localStorage.removeItem(config.tokenKey);
    localStorage.removeItem(config.refreshTokenKey);
    localStorage.removeItem(config.userKey);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}

export const apiService = new ApiService();
export const api = apiService.getInstance();



