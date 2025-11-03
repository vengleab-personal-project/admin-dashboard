
import React from 'react';
import { Page } from '../../types';
import { DashboardIcon, UsersIcon, SubscriptionIcon, PolicyIcon } from '../icons/IconComponents';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface NavLinkProps {
  icon: React.ElementType;
  label: string;
  page: Page;
  currentPage: Page;
  onClick: (page: Page) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, label, page, currentPage, onClick }) => {
  const isActive = currentPage === page;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick(page);
      }}
      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
        isActive
          ? 'bg-gray-200 dark:bg-gray-700 text-primary-dark dark:text-white'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isSidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
          isSidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <PolicyIcon className="h-8 w-8 text-blue-500" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">User Dashboard</span>
        </div>
        <nav className="p-4 space-y-2">
          <NavLink icon={DashboardIcon} label="Dashboard" page="dashboard" currentPage={currentPage} onClick={handleNavClick} />
          {isAdmin && (
            <NavLink icon={UsersIcon} label="Users" page="users" currentPage={currentPage} onClick={handleNavClick} />
          )}
          <NavLink icon={SubscriptionIcon} label="Subscriptions" page="subscriptions" currentPage={currentPage} onClick={handleNavClick} />
          {isAdmin && (
            <NavLink icon={PolicyIcon} label="Policies" page="policies" currentPage={currentPage} onClick={handleNavClick} />
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
