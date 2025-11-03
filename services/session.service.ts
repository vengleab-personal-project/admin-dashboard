import { api } from './api.service';
import { Session } from '../types';

/**
 * Session Service
 */
export class SessionService {
  /**
   * Get all sessions for current user
   */
  async getUserSessions(): Promise<Session[]> {
    const response = await api.get('/auth/sessions');
    return response.data.sessions || [];
  }

  /**
   * Get active sessions for current user
   */
  async getActiveSessions(): Promise<Session[]> {
    const response = await api.get('/auth/sessions/active');
    return response.data.sessions || [];
  }

  /**
   * Revoke a specific session
   */
  async revokeSession(sessionId: string): Promise<void> {
    await api.delete(`/auth/sessions/${sessionId}`);
  }

  /**
   * Revoke all sessions except current
   */
  async revokeAllSessions(exceptCurrentSession: boolean = false, currentSessionId?: string): Promise<void> {
    await api.post('/auth/sessions/revoke-all', {
      exceptCurrentSession,
      currentSessionId,
    });
  }
}

export const sessionService = new SessionService();

