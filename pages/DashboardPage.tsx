import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { UsersIcon, TrendingUpIcon, DollarSignIcon, CreditCardIcon, TrendingDownIcon } from '../components/icons/IconComponents';
import { MetricCardData, ChartDataPoint } from '../types';
import { usageService } from '../services/usage.service';
import { subscriptionService } from '../services/subscription.service';
import { userService } from '../services/user.service';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MetricCard: React.FC<{ data: MetricCardData }> = ({ data }) => {
    const { title, value, change, changeType, icon: Icon } = data;
    const isIncrease = changeType === 'increase';
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className={`text-xs ${isIncrease ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                    {isIncrease ? <TrendingUpIcon className="h-4 w-4 mr-1"/> : <TrendingDownIcon className="h-4 w-4 mr-1"/>}
                    {change} from last month
                </p>
            </CardContent>
        </Card>
    );
};

const ChartCard: React.FC<{ title: string; description: string; data: ChartDataPoint[]; children: React.ReactNode }> = ({ title, description, children }) => (
    <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                {children}
            </ResponsiveContainer>
        </CardContent>
    </Card>
);

const DashboardPage: React.FC = () => {
    const [metrics, setMetrics] = useState<MetricCardData[]>([
        { title: "Total Revenue", value: "$0", change: "+0%", changeType: 'increase', icon: DollarSignIcon },
        { title: "Subscriptions", value: "0", change: "+0%", changeType: 'increase', icon: UsersIcon },
        { title: "API Calls (Month)", value: "0", change: "0%", changeType: 'increase', icon: TrendingUpIcon },
        { title: "Active Users", value: "0", change: "+0", changeType: 'increase', icon: CreditCardIcon },
    ]);
    const [apiUsageData, setApiUsageData] = useState<ChartDataPoint[]>([]);
    const [billingData, setBillingData] = useState<ChartDataPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);

            // Fetch usage stats
            const usageStats = await usageService.getUsageStats();
            const { stats: userStats } = await userService.getCurrentUser();
            
            // Update metrics with real data
            setMetrics([
                { 
                    title: "Total Revenue", 
                    value: "$0", // Would need billing endpoint
                    change: "+0%", 
                    changeType: 'increase', 
                    icon: DollarSignIcon 
                },
                { 
                    title: "Forms Created", 
                    value: userStats.formCount.toString(), 
                    change: `+${usageStats.formsCreated} this month`, 
                    changeType: 'increase', 
                    icon: UsersIcon 
                },
                { 
                    title: "API Calls (Month)", 
                    value: usageStats.apiCallsThisMonth.toLocaleString(), 
                    change: `${usageStats.apiCallsThisMonth} total`, 
                    changeType: 'increase', 
                    icon: TrendingUpIcon 
                },
                { 
                    title: "Fields Generated", 
                    value: userStats.fieldCount.toString(), 
                    change: `+${usageStats.fieldsGenerated} this month`, 
                    changeType: 'increase', 
                    icon: CreditCardIcon 
                },
            ]);

            // For now, use mock data for charts (would need time-series endpoints)
            setApiUsageData([
                { name: 'Mon', uv: 4000 }, { name: 'Tue', uv: 3000 }, { name: 'Wed', uv: 2000 },
                { name: 'Thu', uv: 2780 }, { name: 'Fri', uv: 1890 }, { name: 'Sat', uv: 2390 }, 
                { name: 'Sun', uv: 3490 },
            ]);

            setBillingData([
                { name: 'Jan', uv: 2400 }, { name: 'Feb', uv: 1398 }, { name: 'Mar', uv: 9800 },
                { name: 'Apr', uv: 3908 }, { name: 'May', uv: 4800 }, { name: 'Jun', uv: 3800 },
            ]);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <button
                    onClick={fetchDashboardData}
                    className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                    Refresh
                </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map(metric => <MetricCard key={metric.title} data={metric} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <ChartCard title="API Usage" description="API calls over the last 7 days.">
                     <LineChart data={apiUsageData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ChartCard>
                <ChartCard title="Billing Stats" description="Monthly Recurring Revenue (MRR) trend.">
                    <BarChart data={billingData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ChartCard>
            </div>
        </div>
    );
};

export default DashboardPage;
