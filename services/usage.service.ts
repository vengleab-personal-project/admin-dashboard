import { api } from './api.service';
import { UsageRecord } from '../types';

/**
 * Usage Service
 */
export class UsageService {
  /**
   * Get current month usage
   */
  async getCurrentMonthUsage(): Promise<UsageRecord> {
    const response = await api.get('/usage/me');
    return response.data.usage;
  }

  /**
   * Get usage history
   */
  async getUsageHistory(): Promise<UsageRecord[]> {
    const response = await api.get('/usage/me/history');
    return response.data.history || [];
  }

  /**
   * Get recent usage events
   */
  async getRecentEvents(limit: number = 100): Promise<any[]> {
    const response = await api.get(`/usage/me/events?limit=${limit}`);
    return response.data.events || [];
  }

  /**
   * Get aggregated usage stats for dashboard
   */
  async getUsageStats(): Promise<{
    apiCallsToday: number;
    apiCallsThisWeek: number;
    apiCallsThisMonth: number;
    formsCreated: number;
    fieldsGenerated: number;
  }> {
    try {
      const usage = await this.getCurrentMonthUsage();
      const history = await this.getUsageHistory();

      return {
        apiCallsToday: 0, // Would need backend endpoint
        apiCallsThisWeek: 0, // Would need backend endpoint
        apiCallsThisMonth: usage.apiCallsMade,
        formsCreated: usage.formsCreated,
        fieldsGenerated: usage.fieldsGenerated,
      };
    } catch (error) {
      console.error('Error fetching usage stats:', error);
      return {
        apiCallsToday: 0,
        apiCallsThisWeek: 0,
        apiCallsThisMonth: 0,
        formsCreated: 0,
        fieldsGenerated: 0,
      };
    }
  }
}

export const usageService = new UsageService();



