import React, { useEffect } from 'react';
import { authService } from '../services/auth.service';

/**
 * OAuth Callback Page
 * Handles OAuth redirect with tokens in URL
 */
const OAuthCallbackPage: React.FC = () => {
  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refreshToken = params.get('refresh');

    if (token && refreshToken) {
      // Store tokens
      authService.handleOAuthCallback(token, refreshToken);
      
      // Redirect to dashboard
      window.location.href = '/';
    } else {
      // Error in OAuth flow
      console.error('OAuth callback missing tokens');
      window.location.href = '/login?error=oauth_failed';
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background-dark text-gray-900 dark:text-foreground-dark">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Completing login...</p>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;



