import React, { useState, useEffect } from 'react';
import { Subscription } from '../types';
import { subscriptionService } from '../services/subscription.service';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '../components/ui/Card';
import { CheckCircleIcon } from '../components/icons/IconComponents';
import Badge from '../components/ui/Badge';

const SubscriptionsPage: React.FC = () => {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [subscriptionLimits, setSubscriptionLimits] = useState<any>(null);
  const [pricing, setPricing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Always load pricing so we can show subscription options
      const pricingPromise = subscriptionService.getPricing();

      let subscription: Subscription | null = null;
      let limits: any = null;

      try {
        subscription = await subscriptionService.getCurrentSubscription();
        limits = await subscriptionService.checkLimits();
      } catch (err: any) {
        // If user has no subscription yet (e.g. 404), we still want to show pricing
        if (err?.response?.status !== 404) {
          console.error('Error fetching current subscription or limits:', err);
          throw err;
        }
      }

      const pricingData = await pricingPromise;

      setCurrentSubscription(subscription);
      setSubscriptionLimits(limits);
      setPricing(pricingData.pricing);
    } catch (err: any) {
      console.error('Error fetching subscription data:', err);
      setError(err?.response?.data?.error || 'Failed to load subscription data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = async (tier: 'free' | 'pro' | 'enterprise') => {
    if (!confirm(`Upgrade to ${tier.toUpperCase()} plan?`)) return;

    try {
      await subscriptionService.upgradeSubscription(tier, 'monthly');
      await fetchSubscriptionData();
      alert('Subscription upgraded successfully!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to upgrade subscription');
    }
  };

  const getStatusBadge = (status: string) => {
    const badgeMap: Record<string, any> = {
      active: <Badge variant="success">Active</Badge>,
      cancelled: <Badge>Cancelled</Badge>,
      past_due: <Badge variant="destructive">Past Due</Badge>,
      trialing: <Badge variant="warning">Trial</Badge>,
    };
    return badgeMap[status] || <Badge>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
          <Button onClick={fetchSubscriptionData} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  }

  const plans = [
    {
      tier: 'free',
      name: 'Free',
      price: '$0/mo',
      features: [
        `${pricing?.free?.limits?.forms || 10} forms`,
        `${pricing?.free?.limits?.fields || 100} fields`,
        `${pricing?.free?.limits?.apiCalls?.toLocaleString() || '1,000'} API calls/month`,
      ],
    },
    {
      tier: 'pro',
      name: 'Pro',
      price: '$29/mo',
      features: [
        `${pricing?.pro?.limits?.forms || 100} forms`,
        'Unlimited fields',
        `${pricing?.pro?.limits?.apiCalls?.toLocaleString() || '50,000'} API calls/month`,
        'Priority Support',
      ],
    },
    {
      tier: 'enterprise',
      name: 'Enterprise',
      price: '$199/mo',
      features: [
        'Unlimited forms',
        'Unlimited fields',
        'Unlimited API calls',
        'Custom ABAC policies',
        '24/7 Support',
        'SLA Guarantee',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Current Subscription Info */}
      {currentSubscription && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Current Subscription</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="text-xl font-bold capitalize">{currentSubscription.tier}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-1">{getStatusBadge(currentSubscription.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Billing Cycle</p>
                  <p className="text-xl font-bold capitalize">{currentSubscription.billingCycle || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Started</p>
                  <p className="text-xl font-bold">{new Date(currentSubscription.startDate).toLocaleDateString()}</p>
                </div>
              </div>

              {subscriptionLimits && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3">Usage</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Forms</p>
                      <p className="text-lg">
                        {subscriptionLimits.usage.forms} / {subscriptionLimits.limits.forms}
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (subscriptionLimits.usage.forms / subscriptionLimits.limits.forms) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">API Calls</p>
                      <p className="text-lg">
                        {subscriptionLimits.usage.apiCalls.toLocaleString()} / {subscriptionLimits.limits.apiCalls.toLocaleString()}
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (subscriptionLimits.usage.apiCalls / subscriptionLimits.limits.apiCalls) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fields</p>
                      <p className="text-lg">
                        {subscriptionLimits.usage.fields} / {subscriptionLimits.limits.fields === 999999 ? '∞' : subscriptionLimits.limits.fields}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map(plan => (
            <Card key={plan.tier} className={`flex flex-col ${currentSubscription?.tier === plan.tier ? 'border-2 border-primary' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.name}
                  {currentSubscription?.tier === plan.tier && (
                    <Badge variant="success">Current</Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-4xl font-bold">{plan.price}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={currentSubscription?.tier === plan.tier}
                  onClick={() => handleUpgrade(plan.tier as any)}
                >
                  {currentSubscription?.tier === plan.tier ? 'Current Plan' : 
                   plan.tier === 'enterprise' ? 'Contact Sales' : 'Upgrade'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
