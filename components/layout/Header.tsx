
import React, { useState } from 'react';
import { MenuIcon, SearchIcon, BellIcon, ChevronDownIcon } from '../icons/IconComponents';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const avatarUrl = user?.avatar || user?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`;

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
          <MenuIcon className="h-6 w-6" />
        </Button>
        <div className="relative hidden md:block ml-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </Button>
        <Button variant="ghost" size="icon">
            <BellIcon className="h-6 w-6" />
        </Button>
        
        <div className="relative">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
              <img 
                  src={avatarUrl} 
                  alt={user?.name || 'User Avatar'}
                  className="h-10 w-10 rounded-full object-cover"
              />
              <div className='hidden sm:block'>
                  <p className="font-semibold text-gray-900 dark:text-white">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || ''}</p>
              </div>
              <Button variant="ghost" size="icon">
                  <ChevronDownIcon className="h-5 w-5" />
              </Button>
          </div>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700">
              <div className="px-4 py-2 border-b dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Role: <span className="font-medium">{user?.role}</span> | 
                  Tier: <span className="font-medium">{user?.subscriptionTier}</span>
                </p>
              </div>
              <button
                onClick={() => { setShowUserMenu(false); window.location.hash = '#profile'; }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                My Profile
              </button>
              <button
                onClick={() => { setShowUserMenu(false); window.location.hash = '#sessions'; }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Active Sessions
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
