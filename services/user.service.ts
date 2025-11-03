import { api } from './api.service';
import { User, UserStats } from '../types';

/**
 * User Service
 */
export class UserService {
  /**
   * Get all users (admin only)
   */
  async getAllUsers(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data.users || [];
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<{ user: User; stats: UserStats }> {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<{ user: User; stats: UserStats }> {
    const response = await api.get('/users/me');
    return response.data;
  }

  /**
   * Update current user
   */
  async updateCurrentUser(updates: Partial<User>): Promise<User> {
    const response = await api.patch('/users/me', updates);
    return response.data.user;
  }

  /**
   * Update user (admin only)
   */
  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const response = await api.patch(`/users/${userId}`, updates);
    return response.data.user;
  }

  /**
   * Delete user account
   */
  async deleteUser(): Promise<void> {
    await api.delete('/users/me');
  }

  /**
   * Get user statistics
   */
  async getUserStats(userId?: string): Promise<UserStats> {
    const endpoint = userId ? `/users/${userId}/stats` : '/users/me/stats';
    const response = await api.get(endpoint);
    return response.data.stats;
  }
}

export const userService = new UserService();



