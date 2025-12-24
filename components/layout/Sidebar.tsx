
import React from 'react';
import { DashboardIcon, UsersIcon, SubscriptionIcon, PolicyIcon } from '../icons/IconComponents';
import { useAuth } from '../../context/AuthContext';
import { Link, useRouterState } from '@tanstack/react-router';

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const { location } = useRouterState();
  const currentPath = location.pathname;

  const navItems = [
    { to: '/', label: 'Dashboard', icon: DashboardIcon, show: true },
    { to: '/users', label: 'Users', icon: UsersIcon, show: isAdmin },
    { to: '/subscriptions', label: 'Subscriptions', icon: SubscriptionIcon, show: true },
    { to: '/policies', label: 'Policies', icon: PolicyIcon, show: isAdmin },
  ].filter(item => item.show);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-white dark:bg-card-dark border-r border-gray-200 dark:border-gray-700 flex-shrink-0 z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <PolicyIcon className="h-8 w-8 text-blue-500" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">User Dashboard</span>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = currentPath === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-gray-200 dark:bg-gray-700 text-primary-dark dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
