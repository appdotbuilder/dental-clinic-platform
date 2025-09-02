import React from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { SimpleLayout } from '@/components/simple-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SharedData, User } from '@/types';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
}

interface Appointment {
    id: number;
    appointment_date: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    complaint: string | null;
    doctor: Doctor;
    user: User;
}

interface PaginatedData {
    data: Appointment[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    appointments: PaginatedData;
    [key: string]: unknown;
}

export default function AppointmentsIndex({ appointments }: Props) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'confirmed':
                return '✅';
            case 'completed':
                return '✅';
            case 'cancelled':
                return '❌';
            default:
                return '📅';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (timeString: string) => {
        return timeString.slice(0, 5);
    };

    const getTitle = () => {
        if (user.role === 'patient') return 'My Appointments';
        if (user.role === 'doctor') return 'My Patient Appointments';
        return 'All Appointments';
    };

    const getDescription = () => {
        if (user.role === 'patient') return 'View and manage your dental appointments';
        if (user.role === 'doctor') return 'Manage your patient appointments';
        return 'Manage all clinic appointments';
    };

    return (
        <SimpleLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">📅 {getTitle()}</h1>
                        <p className="text-gray-600">{getDescription()}</p>
                    </div>
                    {user.role === 'patient' && (
                        <Link href="/appointments/create">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ➕ New Appointment
                            </Button>
                        </Link>
                    )}
                </div>

                {appointments.data.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Appointments Found</h3>
                            <p className="text-gray-600 mb-6">
                                {user.role === 'patient' 
                                    ? "You don't have any appointments yet."
                                    : "No appointments found for the selected criteria."
                                }
                            </p>
                            {user.role === 'patient' && (
                                <Link href="/appointments/create">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        📅 Book Your First Appointment
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {appointments.data.map((appointment) => (
                            <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Badge className={getStatusColor(appointment.status)}>
                                                    {getStatusIcon(appointment.status)} {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                </Badge>
                                                <span className="text-sm text-gray-500">
                                                    #{appointment.id}
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">Date & Time</p>
                                                    <p className="font-semibold text-gray-900">
                                                        {formatDate(appointment.appointment_date)}
                                                    </p>
                                                    <p className="text-blue-600 font-medium">
                                                        🕒 {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                                                    </p>
                                                </div>
                                                
                                                <div>
                                                    {user.role !== 'doctor' && (
                                                        <>
                                                            <p className="text-sm text-gray-600">Doctor</p>
                                                            <p className="font-semibold text-gray-900">
                                                                👨‍⚕️ {appointment.doctor.name}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {appointment.doctor.specialization}
                                                            </p>
                                                        </>
                                                    )}
                                                    
                                                    {user.role !== 'patient' && (
                                                        <>
                                                            <p className="text-sm text-gray-600">Patient</p>
                                                            <p className="font-semibold text-gray-900">
                                                                👤 {appointment.user.name}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                {appointment.user.email}
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {appointment.complaint && (
                                                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                                    <p className="text-sm text-gray-600 mb-1">Initial Complaint:</p>
                                                    <p className="text-gray-900">{appointment.complaint}</p>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                                            <Link href={`/appointments/${appointment.id}`}>
                                                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                                    👁️ View
                                                </Button>
                                            </Link>
                                            
                                            {user.role === 'patient' && appointment.status === 'pending' && (
                                                <Link href={`/appointments/${appointment.id}/edit`}>
                                                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {appointments.last_page > 1 && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex space-x-1">
                            {appointments.current_page > 1 && (
                                <Link
                                    href={`/appointments?page=${appointments.current_page - 1}`}
                                    className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            
                            {Array.from({ length: appointments.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={`/appointments?page=${page}`}
                                    className={`px-3 py-2 text-sm border rounded-md ${
                                        page === appointments.current_page
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </Link>
                            ))}
                            
                            {appointments.current_page < appointments.last_page && (
                                <Link
                                    href={`/appointments?page=${appointments.current_page + 1}`}
                                    className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </SimpleLayout>
    );
}