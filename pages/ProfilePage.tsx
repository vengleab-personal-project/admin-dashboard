import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/user.service';
import { User, UserStats } from '../types';

const ProfilePage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
  });

  useEffect(() => {
    loadUserStats();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  const loadUserStats = async () => {
    try {
      setLoading(true);
      const userStats = await userService.getUserStats();
      setStats(userStats);
    } catch (err) {
      console.error('Error loading user stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await userService.updateCurrentUser(formData);
      await refreshUser();
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const avatarUrl = user?.avatar || user?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Profile Information Card */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
            {!editing && (
              <Button onClick={() => setEditing(true)}>Edit Profile</Button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <img
                    src={formData.avatar || avatarUrl}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <input
                      type="url"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      placeholder="Enter avatar URL"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-muted-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Enter a URL to your profile picture
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-muted-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex space-x-3">
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                  <p className="mt-1 text-gray-900 dark:text-white capitalize">{user?.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Subscription Tier</label>
                  <p className="mt-1 text-gray-900 dark:text-white capitalize">{user?.subscriptionTier}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">OAuth Provider</label>
                  <p className="mt-1 text-gray-900 dark:text-white capitalize">{user?.oauthProvider}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Account Created</label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Usage Statistics Card */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Usage Statistics</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Forms Created</p>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">{stats.formCount}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Fields Generated</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">{stats.fieldCount}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Total API Calls</p>
                <p className="text-3xl font-bold text-orange-900 dark:text-orange-100 mt-2">{stats.totalApiCalls}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-2">
                  {new Date(stats.lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No statistics available</p>
          )}
        </div>
      </Card>

      {/* Account Settings Card */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Settings</h2>
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => window.location.hash = '#sessions'}>
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Manage Active Sessions
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;

