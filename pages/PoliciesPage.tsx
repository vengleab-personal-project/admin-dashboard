import React, { useState, useEffect } from 'react';
import { Policy } from '../types';
import { policyService } from '../services/policy.service';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import ProtectedRoute from '../components/ProtectedRoute';

const PolicyCard: React.FC<{ policy: Policy }> = ({ policy }) => {
    // Map backend format to UI format
    const subjects = policy.subjects || [policy.userId || 'All Users'];
    const actions = policy.actions || [policy.action];
    const resources = policy.resources || [policy.resource];

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{policy.name}</CardTitle>
                        <CardDescription>{policy.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant={policy.effect === 'allow' ? 'success' : 'destructive'}>
                            {policy.effect.toUpperCase()}
                        </Badge>
                        {policy.enabled !== false && (
                            <Badge variant="success">Enabled</Badge>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div>
                    <h4 className="font-semibold">Priority</h4>
                    <p className="mt-1">
                        <Badge variant="warning">{policy.priority}</Badge>
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold">Subjects/Roles</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {subjects.map((s, i) => <Badge key={i}>{s}</Badge>)}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold">Actions</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {actions.map((a, i) => <Badge key={i} variant="warning">{a}</Badge>)}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold">Resources</h4>
                    <p className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-1 break-all text-xs">
                        {resources.join(', ')}
                    </p>
                </div>
                {policy.conditions && (
                    <div>
                        <h4 className="font-semibold">Conditions</h4>
                        <pre className="font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-1 overflow-x-auto text-xs">
                            {JSON.stringify(policy.conditions, null, 2)}
                        </pre>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

const PoliciesPage: React.FC = () => {
    const [policies, setPolicies] = useState<Policy[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const fetchedPolicies = await policyService.getAllPolicies();
            setPolicies(fetchedPolicies);
        } catch (err: any) {
            console.error('Error fetching policies:', err);
            setError(err?.message || 'Failed to fetch policies');
            setPolicies([]);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <ProtectedRoute requiredRole="admin">
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">ABAC Policies</h1>
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute requiredRole="admin">
            <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">ABAC Policies</h1>
                    <p className="text-muted-foreground">Manage Attribute-Based Access Control rules.</p>
                    {error && (
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                            {error}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button onClick={fetchPolicies} variant="outline">Refresh</Button>
                    <Button>Create Policy</Button>
                </div>
            </div>

            {policies.length === 0 ? (
                <div className="bg-card dark:bg-gray-800 shadow-md rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">No policies found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {policies.map(policy => (
                        <PolicyCard key={policy.id} policy={policy} />
                    ))}
                </div>
            )}
            </div>
        </ProtectedRoute>
    );
};

export default PoliciesPage;
