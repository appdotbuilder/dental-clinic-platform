import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { SimpleLayout } from '@/components/simple-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SharedData } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const getWelcomeMessage = () => {
        switch (user.role) {
            case 'patient':
                return '👋 Welcome to your patient dashboard!';
            case 'doctor':
                return '👨‍⚕️ Welcome to your doctor dashboard!';
            case 'admin':
                return '👑 Welcome to the admin dashboard!';
            default:
                return '👋 Welcome to your dashboard!';
        }
    };

    const getQuickActions = () => {
        switch (user.role) {
            case 'patient':
                return [
                    {
                        title: '📅 Book Appointment',
                        description: 'Schedule a new appointment with our doctors',
                        href: '/appointments/create',
                        color: 'bg-blue-600 hover:bg-blue-700'
                    },
                    {
                        title: '📋 My Appointments',
                        description: 'View and manage your appointments',
                        href: '/appointments',
                        color: 'bg-green-600 hover:bg-green-700'
                    }
                ];
            case 'doctor':
                return [
                    {
                        title: '📋 My Appointments',
                        description: 'View and manage patient appointments',
                        href: '/appointments',
                        color: 'bg-blue-600 hover:bg-blue-700'
                    },
                    {
                        title: '👥 Patient List',
                        description: 'View your patients',
                        href: '/appointments',
                        color: 'bg-green-600 hover:bg-green-700'
                    }
                ];
            case 'admin':
                return [
                    {
                        title: '📋 All Appointments',
                        description: 'Manage all clinic appointments',
                        href: '/appointments',
                        color: 'bg-blue-600 hover:bg-blue-700'
                    },
                    {
                        title: '👨‍⚕️ Manage Doctors',
                        description: 'Add and manage doctor accounts',
                        href: '/appointments',
                        color: 'bg-green-600 hover:bg-green-700'
                    },
                    {
                        title: '🏥 Clinic Settings',
                        description: 'Manage clinic information and services',
                        href: '/appointments',
                        color: 'bg-purple-600 hover:bg-purple-700'
                    }
                ];
            default:
                return [];
        }
    };

    return (
        <SimpleLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {getWelcomeMessage()}
                    </h1>
                    <p className="text-gray-600">
                        Hello, <strong>{user.name}</strong>! Here's your personalized dashboard.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {getQuickActions().map((action, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="text-lg">{action.title}</CardTitle>
                                <CardDescription>{action.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={action.href}>
                                    <Button className={`w-full ${action.color}`}>
                                        Get Started
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Role-specific Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                ℹ️ Quick Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Role:</span>
                                <span className="font-medium capitalize">{user.role}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium">{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Account Status:</span>
                                <span className="font-medium text-green-600">✅ Active</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📞 Need Help?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="text-sm space-y-2">
                                <p><strong>Clinic Hours:</strong><br />Mon-Fri: 9:00 AM - 5:00 PM<br />Sat: 9:00 AM - 2:00 PM</p>
                                <p><strong>Emergency:</strong> (021) 123-4567</p>
                                <p><strong>WhatsApp:</strong> +62 812-3456-7890</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SimpleLayout>
    );
}