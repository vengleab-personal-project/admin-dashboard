
import { User, UserStatus, UserRole, SubscriptionPlan, SubscriptionTier, ActiveSubscription, Policy, ChartDataPoint } from './types';

export const MOCK_USERS: User[] = [
  { id: 'usr_1', name: 'Alice Johnson', email: 'alice@example.com', avatarUrl: 'https://picsum.photos/id/1011/200/200', status: UserStatus.Active, role: UserRole.Admin, createdAt: '2023-01-15', oauthProvider: 'Google' },
  { id: 'usr_2', name: 'Bob Williams', email: 'bob@example.com', avatarUrl: 'https://picsum.photos/id/1012/200/200', status: UserStatus.Active, role: UserRole.Member, createdAt: '2023-02-20' },
  { id: 'usr_3', name: 'Charlie Brown', email: 'charlie@example.com', avatarUrl: 'https://picsum.photos/id/1013/200/200', status: UserStatus.Inactive, role: UserRole.Member, createdAt: '2023-03-10' },
  { id: 'usr_4', name: 'Diana Miller', email: 'diana@example.com', avatarUrl: 'https://picsum.photos/id/1014/200/200', status: UserStatus.Active, role: UserRole.BillingManager, createdAt: '2023-04-05', oauthProvider: 'GitHub' },
  { id: 'usr_5', name: 'Ethan Davis', email: 'ethan@example.com', avatarUrl: 'https://picsum.photos/id/1015/200/200', status: UserStatus.Active, role: UserRole.Member, createdAt: '2023-05-12' },
];

export const MOCK_PLANS: SubscriptionPlan[] = [
    { id: 'plan_free', name: SubscriptionTier.Free, price: '$0/mo', features: ['1 User', '1 Project', '10,000 API Calls'], apiCalls: 10000, formLimits: 100 },
    { id: 'plan_pro', name: SubscriptionTier.Pro, price: '$49/mo', features: ['10 Users', 'Unlimited Projects', '1,000,000 API Calls', 'Priority Support'], apiCalls: 1000000, formLimits: 1000 },
    { id: 'plan_ent', name: SubscriptionTier.Enterprise, price: 'Contact Us', features: ['Unlimited Users', 'Dedicated Infrastructure', 'SLA', '24/7 Support'], apiCalls: 50000000, formLimits: 10000 },
];

export const MOCK_SUBSCRIPTIONS: ActiveSubscription[] = [
    { id: 'sub_1', userId: 'usr_1', planId: 'plan_pro', status: 'Active', startDate: '2023-06-01', endDate: '2024-06-01', addons: [] },
    { id: 'sub_2', userId: 'usr_2', planId: 'plan_free', status: 'Active', startDate: '2023-02-20', endDate: '2024-02-20', addons: [] },
    { id: 'sub_3', userId: 'usr_4', planId: 'plan_pro', status: 'Past Due', startDate: '2023-05-15', endDate: '2024-05-15', addons: [{id: 'addon_1', name: 'Extra API calls', price: '$10/mo', description: '100,000 extra API calls'}] },
];

export const MOCK_POLICIES: Policy[] = [
    { id: 'pol_1', name: 'Admin Full Access', description: 'Admins can perform any action on any resource.', subjects: ['Admin'], actions: ['*'], resources: ['*'], effect: 'Allow' },
    { id: 'pol_2', name: 'Member Read Access', description: 'Members can only read user and project data.', subjects: ['Member'], actions: ['read'], resources: ['/api/users/*', '/api/projects/*'], effect: 'Allow' },
    { id: 'pol_3', name: 'Billing Manager Access', description: 'Billing managers can view and modify billing information.', subjects: ['Billing Manager'], actions: ['read', 'write'], resources: ['/billing/*', '/subscriptions/*'], effect: 'Allow' },
    { id: 'pol_4', name: 'Deny Guest Write', description: 'Deny write access for unauthenticated users.', subjects: ['Guest'], actions: ['write', 'delete'], resources: ['*'], effect: 'Deny' },
];

export const API_USAGE_DATA: ChartDataPoint[] = [
    { name: 'Mon', uv: 4000 }, { name: 'Tue', uv: 3000 }, { name: 'Wed', uv: 2000 },
    { name: 'Thu', uv: 2780 }, { name: 'Fri', uv: 1890 }, { name: 'Sat', uv: 2390 }, { name: 'Sun', uv: 3490 },
];

export const BILLING_STATS_DATA: ChartDataPoint[] = [
    { name: 'Jan', uv: 2400 }, { name: 'Feb', uv: 1398 }, { name: 'Mar', uv: 9800 },
    { name: 'Apr', uv: 3908 }, { name: 'May', uv: 4800 }, { name: 'Jun', uv: 3800 },
];
