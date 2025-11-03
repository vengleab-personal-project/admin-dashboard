
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-card text-card-foreground rounded-lg border dark:border-gray-700 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
};

const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
};

const CardDescription: React.FC<CardProps> = ({ children, className = '' }) => {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
};

const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

const CardFooter: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
