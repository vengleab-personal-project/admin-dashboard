import React from 'react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { GoogleIcon, GitHubIcon, CheckCircleIcon } from '../components/icons/IconComponents';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/ui/Badge';

const SignupPage: React.FC = () => {
  const { login } = useAuth();

  const features = [
    'Free tier with 10 forms and 1,000 API calls',
    'Upgrade anytime to Pro or Enterprise',
    'OAuth security with Google or GitHub',
    'Real-time usage tracking',
    'ABAC access control',
    'No credit card required',
  ];

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['10 forms', '100 fields', '1,000 API calls/month'],
      badge: 'Most Popular',
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      features: ['100 forms', 'Unlimited fields', '50,000 API calls/month', 'Priority support'],
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: '/month',
      features: ['Unlimited forms', 'Unlimited fields', 'Unlimited API calls', 'Custom ABAC policies', '24/7 support'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background-dark text-gray-900 dark:text-foreground-dark">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Manage your forms, users, and subscriptions with powerful ABAC controls
          </p>
          <Badge variant="success" className="text-lg px-4 py-2">
            Start Free - No Credit Card Required
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Sign Up Card */}
        <Card className="mb-12 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl mb-2">Create Your Account</CardTitle>
            <CardDescription className="text-lg">
              Sign up in seconds with your existing account
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-md mx-auto space-y-4 pb-8">
            <Button
              className="w-full flex items-center justify-center gap-3 text-lg py-6"
              onClick={() => login('google')}
            >
              <GoogleIcon className="h-6 w-6" />
              Sign up with Google
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 text-lg py-6"
              onClick={() => login('github')}
            >
              <GitHubIcon className="h-6 w-6" />
              Sign up with GitHub
            </Button>
            
            <div className="text-center text-sm text-muted-foreground pt-4">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline font-semibold">
                Log in here
              </a>
            </div>

            <p className="text-xs text-center text-muted-foreground pt-2">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 bg-white dark:bg-card-dark p-4 rounded-lg shadow">
                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-muted-foreground mb-8 text-lg">
            Start with Free, upgrade anytime
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.name} className={`flex flex-col ${plan.badge ? 'border-2 border-primary shadow-lg' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    {plan.badge && (
                      <Badge variant="success">{plan.badge}</Badge>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6">
            All plans include secure authentication, real-time analytics, and ABAC access control
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of users managing their applications with ease
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
              onClick={() => login('google')}
            >
              <GoogleIcon className="h-6 w-6 mr-2" />
              Sign up with Google
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6"
              onClick={() => login('github')}
            >
              <GitHubIcon className="h-6 w-6 mr-2" />
              Sign up with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

