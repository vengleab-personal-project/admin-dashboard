import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { sessionService } from '../services/session.service';
import { Session } from '../types';

const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await sessionService.getActiveSessions();
      setSessions(data);
      setError(null);
    } catch (err) {
      setError('Failed to load sessions');
      console.error('Error loading sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to revoke this session?')) {
      return;
    }

    try {
      await sessionService.revokeSession(sessionId);
      await loadSessions();
    } catch (err) {
      alert('Failed to revoke session');
      console.error('Error revoking session:', err);
    }
  };

  const handleRevokeAllSessions = async () => {
    if (!confirm('Are you sure you want to revoke all other sessions? You will remain logged in on this device.')) {
      return;
    }

    try {
      await sessionService.revokeAllSessions(true);
      await loadSessions();
    } catch (err) {
      alert('Failed to revoke all sessions');
      console.error('Error revoking all sessions:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getDeviceIcon = (device?: string) => {
    if (device?.toLowerCase().includes('mobile')) {
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Active Sessions</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your active login sessions</p>
        </div>
        <Button onClick={handleRevokeAllSessions} variant="destructive">
          Revoke All Other Sessions
        </Button>
      </div>

      {error && (
        <Card>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </Card>
      )}

      {sessions.length === 0 ? (
        <Card>
          <div className="p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No active sessions</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">You don't have any active sessions.</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <Card key={session.id}>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-gray-500 dark:text-gray-400 mt-1">
                      {getDeviceIcon(session.device)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {session.browser || 'Unknown Browser'}
                        </h3>
                        {session.isActive && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          <span className="font-medium">Device:</span> {session.device || 'Unknown'} • {session.os || 'Unknown OS'}
                        </p>
                        <p>
                          <span className="font-medium">IP Address:</span> {session.ipAddress || 'Unknown'}
                        </p>
                        {session.location && (
                          <p>
                            <span className="font-medium">Location:</span> {session.location}
                          </p>
                        )}
                        <p>
                          <span className="font-medium">Last Activity:</span> {formatDate(session.lastActivityAt)}
                        </p>
                        <p>
                          <span className="font-medium">Expires:</span> {formatDate(session.expiresAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRevokeSession(session.id)}
                    variant="destructive"
                    size="sm"
                  >
                    Revoke
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionsPage;

