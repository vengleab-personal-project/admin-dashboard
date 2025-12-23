import React from 'react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { GoogleIcon, GitHubIcon } from '../components/icons/IconComponents';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Admin Dashboard</CardTitle>
          <CardDescription>Sign in to manage your application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-3"
            onClick={() => login('google')}
          >
            <GoogleIcon className="h-5 w-5" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-3"
            onClick={() => login('github')}
          >
            <GitHubIcon className="h-5 w-5" />
            Continue with GitHub
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary hover:underline font-semibold">
              Sign up here
            </a>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;



