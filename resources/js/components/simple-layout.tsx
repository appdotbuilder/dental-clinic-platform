import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

interface SimpleLayoutProps {
    children: React.ReactNode;
}

export function SimpleLayout({ children }: SimpleLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">🦷</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">DentalCare</span>
                            </Link>
                        </div>
                        
                        {auth.user && (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/dashboard"
                                    className="text-gray-600 hover:text-blue-600"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/appointments"
                                    className="text-gray-600 hover:text-blue-600"
                                >
                                    Appointments
                                </Link>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">
                                        {auth.user.name}
                                    </span>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                        {auth.user.role}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            
            {/* Main Content */}
            <main>
                {children}
            </main>
        </div>
    );
}