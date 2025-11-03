import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from './ui/Card';
import Button from './ui/Button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'editor' | 'user';
  requiredRoles?: ('admin' | 'editor' | 'user')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  requiredRoles 
}) => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Card>
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to be logged in to access this page.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Check if user has required role(s)
  const hasAccess = (() => {
    if (requiredRole) {
      return user.role === requiredRole;
    }
    if (requiredRoles && requiredRoles.length > 0) {
      return requiredRoles.includes(user.role);
    }
    return true; // No role requirement
  })();

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <Card>
          <div className="p-8 text-center max-w-md">
            <div className="mb-6">
              <svg 
                className="mx-auto h-16 w-16 text-red-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
              Required role: <span className="font-semibold">{requiredRole || requiredRoles?.join(' or ')}</span>
              <br />
              Your role: <span className="font-semibold">{user.role}</span>
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Button variant="outline" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

