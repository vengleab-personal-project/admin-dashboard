import React, { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import PoliciesPage from "./pages/PoliciesPage";
import ProfilePage from "./pages/ProfilePage";
import SessionsPage from "./pages/SessionsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";

const queryClient = new QueryClient();

const RootRoute = createRootRoute({
  component: () => <Outlet />,
});

const LoginRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/login",
  component: () => <LoginPage />,
});

const SignupRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/signup",
  component: () => <SignupPage />,
});

const OAuthCallbackRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: "/auth/callback",
  component: () => <OAuthCallbackPage />,
});

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="flex h-screen bg-background dark:bg-background-dark">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background dark:bg-background-dark p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AppRoute = createRoute({
  getParentRoute: () => RootRoute,
  id: "app",
  component: AppLayout,
});

const DashboardRoute = createRoute({
  getParentRoute: () => AppRoute,
  path: "/",
  component: () => <DashboardPage />,
});

const UsersRoute = createRoute({
  getParentRoute: () => AppRoute,
  path: "/users",
  component: () => <UsersPage />,
});

const SubscriptionsRoute = createRoute({
  getParentRoute: () => AppRoute,
  path: "/subscriptions",
  component: () => <SubscriptionsPage />,
});

const PoliciesRoute = createRoute({
  getParentRoute: () => AppRoute,
  path: "/policies",
  component: () => <PoliciesPage />,
});

const ProfileRoute = createRoute({
  getParentRoute: () => AppRoute,
  path: "/profile",
  component: () => <ProfilePage />,
});

const SessionsRoute = createRoute({
  getParentRoute: () => AppRoute,
  path: "/sessions",
  component: () => <SessionsPage />,
});

const routeTree = RootRoute.addChildren([
  LoginRoute,
  SignupRoute,
  OAuthCallbackRoute,
  AppRoute.addChildren([
    DashboardRoute,
    UsersRoute,
    SubscriptionsRoute,
    PoliciesRoute,
    ProfileRoute,
    SessionsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
