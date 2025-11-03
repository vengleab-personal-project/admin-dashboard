
import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import PoliciesPage from './pages/PoliciesPage';
import ProfilePage from './pages/ProfilePage';
import SessionsPage from './pages/SessionsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OAuthCallbackPage from './pages/OAuthCallbackPage';
import { Page } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  // Check if we're on special pages
  const isOAuthCallback = window.location.pathname === '/auth/callback';
  const isSignupPage = window.location.pathname === '/signup';
  const isLoginPage = window.location.pathname === '/login';

  useEffect(() => {
    // Handle special pages
    if (isOAuthCallback || isSignupPage || isLoginPage) {
      return;
    }

    // Handle hash-based navigation
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash === 'profile') {
        setCurrentPage('profile');
      } else if (hash === 'sessions') {
        setCurrentPage('sessions');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isOAuthCallback, isSignupPage, isLoginPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-primary-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show OAuth callback page
  if (isOAuthCallback) {
    return <OAuthCallbackPage />;
  }

  // Show signup page
  if (isSignupPage) {
    return <SignupPage />;
  }

  // Show login page
  if (isLoginPage || !isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'users':
        return <UsersPage />;
      case 'subscriptions':
        return <SubscriptionsPage />;
      case 'policies':
        return <PoliciesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'sessions':
        return <SessionsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-primary-dark">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-primary-dark p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
