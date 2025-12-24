import React, { useState } from 'react';
import { User, UserStatus } from '../types';
import { userService } from '../services/user.service';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { MoreVerticalIcon, GoogleIcon, GitHubIcon } from '../components/icons/IconComponents';
import ProtectedRoute from '../components/ProtectedRoute';
import { useQuery } from '@tanstack/react-query';

const UsersPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as 'user' | 'admin' | 'editor',
    subscriptionTier: 'free' as 'free' | 'pro' | 'enterprise',
  });

  const {
    data: users = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const fetchedUsers = await userService.getAllUsers();
      return fetchedUsers.map(user => ({
        ...user,
        avatarUrl: user.avatar || user.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
        status: UserStatus.Active, // Backend doesn't have status, default to active
      }));
    },
  });

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case UserStatus.Active:
        return <Badge variant="success">Active</Badge>;
      case UserStatus.Inactive:
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getOAuthIcon = (provider?: 'google' | 'github') => {
    if (provider === 'google') {
        return <GoogleIcon className="h-5 w-5 text-gray-500" title="Google OAuth"/>;
    }
    if (provider === 'github') {
        return <GitHubIcon className="h-5 w-5" title="GitHub OAuth"/>;
    }
    return null;
  };

  const getTierBadge = (tier: string) => {
    const colors = {
      free: 'default',
      pro: 'warning',
      enterprise: 'success',
    };
    return <Badge variant={colors[tier as keyof typeof colors] as any}>{tier.toUpperCase()}</Badge>;
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Note: This is a placeholder. In production, users should be created via OAuth
    alert('Note: Users can only be created through OAuth login (Google/GitHub). This feature is for demo purposes only.');
    setShowAddModal(false);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      subscriptionTier: 'free',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
          <Button onClick={() => refetch()} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
        <div className="flex gap-2">
          <Button onClick={() => refetch()} variant="outline" disabled={isFetching}>
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button onClick={() => setShowAddModal(true)}>Add User</Button>
        </div>
      </div>
      
      {users.length === 0 ? (
        <div className="bg-card dark:bg-card-dark shadow-md rounded-lg p-8 text-center">
          <p className="text-muted-foreground">No users found</p>
        </div>
      ) : (
        <div className="bg-card dark:bg-card-dark shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-muted-dark dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">User</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Role</th>
                  <th scope="col" className="px-6 py-3">Tier</th>
                  <th scope="col" className="px-6 py-3">Created At</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="bg-white border-b dark:bg-card-dark dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center space-x-3">
                        <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt={user.name} />
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {user.name} {getOAuthIcon(user.oauthProvider)}
                          </div>
                          <div className="text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(user.status || UserStatus.Active)}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    <td className="px-6 py-4">{getTierBadge(user.subscriptionTier)}</td>
                    <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white dark:bg-card-dark rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-muted-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-muted-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-muted-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subscription Tier
                </label>
                <select
                  value={newUser.subscriptionTier}
                  onChange={(e) => setNewUser({ ...newUser, subscriptionTier: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-muted-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> Users can only be created through OAuth login. This is for demo purposes.
                </p>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">Add User</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </ProtectedRoute>
  );
};

export default UsersPage;
