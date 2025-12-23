// FIX: Import React to resolve namespace errors for React types.
import React from 'react';

export type Page = 'dashboard' | 'users' | 'subscriptions' | 'policies' | 'profile' | 'sessions';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Editor = 'editor',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  avatarUrl?: string; // Keep for backward compatibility
  role: 'user' | 'admin' | 'editor';
  oauthProvider: 'google' | 'github';
  oauthId: string;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  metadata?: Record<string, any>;
  status?: UserStatus; // For backward compatibility
}

export interface UserStats {
  userId: string;
  formCount: number;
  fieldCount: number;
  totalApiCalls: number;
  lastUpdated: string;
}

export enum SubscriptionTier {
    Free = 'free',
    Pro = 'pro',
    Enterprise = 'enterprise',
}

export interface SubscriptionLimits {
  forms: number;
  fields: number;
  apiCalls: number;
}

export interface SubscriptionPlan {
    id: string;
    name: SubscriptionTier;
    price: string;
    features: string[];
    apiCalls: number;
    formLimits: number;
    limits: SubscriptionLimits;
}

export interface Addon {
    id: string;
    name: string;
    price: string;
    description: string;
}

export interface Subscription {
    id: string;
    userId: string;
    tier: 'free' | 'pro' | 'enterprise';
    billingCycle?: 'monthly' | 'yearly';
    status: 'active' | 'cancelled' | 'past_due' | 'trialing';
    limits: SubscriptionLimits;
    startDate: string;
    endDate?: string;
    trialEndDate?: string;
    cancelledAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ActiveSubscription {
    id: string;
    userId: string;
    planId: string;
    status: 'Active' | 'Canceled' | 'Past Due';
    startDate: string;
    endDate: string;
    addons: Addon[];
}


export interface Policy {
    id: string;
    name: string;
    description?: string;
    resource: string;
    action: string;
    effect: 'allow' | 'deny';
    conditions?: any;
    priority: number;
    userId?: string;
    enabled?: boolean;
    createdAt?: string;
    updatedAt?: string;
    // For backward compatibility
    subjects?: string[];
    actions?: string[];
    resources?: string[];
}

export interface UsageRecord {
  id: string;
  userId: string;
  month: string;
  formsCreated: number;
  fieldsGenerated: number;
  apiCallsMade: number;
  totalCharges: number;
  createdAt: string;
  updatedAt: string;
}

export interface MetricCardData {
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface ChartDataPoint {
    name: string;
    uv: number;
}

export interface Session {
  id: string;
  userId: string;
  token: string; // JWT token hash
  refreshToken?: string; // Refresh token hash
  ipAddress?: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  os?: string;
  location?: string;
  isActive: boolean;
  lastActivityAt: string;
  expiresAt: string;
  createdAt: string;
}