import { api } from './api.service';
import { Subscription, SubscriptionPlan } from '../types';

export interface SubscriptionLimitsCheck {
  formsAllowed: boolean;
  fieldsAllowed: boolean;
  apiCallsAllowed: boolean;
  limits: {
    forms: number;
    fields: number;
    apiCalls: number;
  };
  usage: {
    forms: number;
    fields: number;
    apiCalls: number;
  };
}

export interface PricingInfo {
  free: { monthly: number; yearly: number; limits: any };
  pro: { monthly: number; yearly: number; limits: any };
  enterprise: { monthly: number; yearly: number; limits: any };
}

/**
 * Subscription Service
 */
export class SubscriptionService {
  /**
   * Get current user's subscription
   */
  async getCurrentSubscription(): Promise<Subscription> {
    const response = await api.get('/subscriptions/me');
    return response.data.subscription;
  }

  /**
   * Check subscription limits
   */
  async checkLimits(): Promise<SubscriptionLimitsCheck> {
    const response = await api.get('/subscriptions/me/limits');
    return response.data;
  }

  /**
   * Get pricing information
   */
  async getPricing(): Promise<{ pricing: PricingInfo }> {
    const response = await api.get('/subscriptions/pricing');
    return response.data;
  }

  /**
   * Upgrade subscription
   */
  async upgradeSubscription(tier: 'free' | 'pro' | 'enterprise', billingCycle?: 'monthly' | 'yearly'): Promise<Subscription> {
    const response = await api.post('/subscriptions/upgrade', { tier, billingCycle });
    return response.data.subscription;
  }

  /**
   * Downgrade subscription
   */
  async downgradeSubscription(tier: 'free' | 'pro' | 'enterprise'): Promise<Subscription> {
    const response = await api.post('/subscriptions/downgrade', { tier });
    return response.data.subscription;
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(): Promise<Subscription> {
    const response = await api.post('/subscriptions/cancel');
    return response.data.subscription;
  }

  /**
   * Get overage charges
   */
  async getOverageCharges(): Promise<{ charges: any[]; totalAmount: number; currency: string }> {
    const response = await api.get('/subscriptions/me/overage');
    return response.data;
  }

  /**
   * Get all subscriptions (for admin dashboard)
   * Note: This would need to be implemented in backend as admin endpoint
   */
  async getAllSubscriptions(): Promise<Subscription[]> {
    // This is a placeholder - you'd need to add this endpoint to backend
    try {
      const response = await api.get('/subscriptions');
      return response.data.subscriptions || [];
    } catch (error) {
      console.error('getAllSubscriptions not implemented yet');
      return [];
    }
  }
}

export const subscriptionService = new SubscriptionService();



