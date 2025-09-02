import React from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { SimpleLayout } from '@/components/simple-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SharedData } from '@/types';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    email: string;
    phone: string | null;
}

interface PatientUser {
    id: number;
    name: string;
    email: string;
    phone: string | null;
}

interface Appointment {
    id: number;
    appointment_date: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    complaint: string | null;
    notes: string | null;
    doctor: Doctor;
    user: PatientUser;
}

interface Props {
    appointment: Appointment;
    [key: string]: unknown;
}

export default function ShowAppointment({ appointment }: Props) {
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

    const handleCancelAppointment = () => {
        if (confirm('Are you sure you want to cancel this appointment?')) {
            router.delete(route('appointments.destroy', appointment.id));
        }
    };

    const handleUpdateStatus = (status: string) => {
        router.patch(route('appointments.update', appointment.id), {
            status: status
        });
    };

    const canEdit = user.role === 'patient' && appointment.user.id === user.id && appointment.status === 'pending';
    const canCancel = (user.role === 'patient' && appointment.user.id === user.id && appointment.status === 'pending') || user.role === 'admin';
    const canUpdateStatus = user.role === 'doctor' || user.role === 'admin';

    return (
        <SimpleLayout>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">📅 Appointment Details</h1>
                        <p className="text-gray-600">View and manage appointment information</p>
                    </div>
                    <Link href="/appointments">
                        <Button variant="outline">
                            ← Back to Appointments
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-6">
                    {/* Main Appointment Info */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-3">
                                        🦷 Appointment #{appointment.id}
                                        <Badge className={getStatusColor(appointment.status)}>
                                            {getStatusIcon(appointment.status)} {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                        </Badge>
                                    </CardTitle>
                                    <CardDescription>
                                        Scheduled for {formatDate(appointment.appointment_date)}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Date & Time */}
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                        📅 Date & Time
                                    </h3>
                                    <div className="space-y-1">
                                        <p className="text-gray-900">{formatDate(appointment.appointment_date)}</p>
                                        <p className="text-blue-600 font-medium">
                                            🕒 {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
                                        </p>
                                    </div>
                                </div>

                                {/* Doctor Info */}
                                {user.role !== 'doctor' && (
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                            👨‍⚕️ Doctor
                                        </h3>
                                        <div className="space-y-1">
                                            <p className="font-medium text-gray-900">{appointment.doctor.name}</p>
                                            <p className="text-gray-600">{appointment.doctor.specialization}</p>
                                            <div className="text-sm text-gray-500 space-y-1">
                                                <p>📧 {appointment.doctor.email}</p>
                                                {appointment.doctor.phone && (
                                                    <p>📞 {appointment.doctor.phone}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Patient Info */}
                                {user.role !== 'patient' && (
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                            👤 Patient
                                        </h3>
                                        <div className="space-y-1">
                                            <p className="font-medium text-gray-900">{appointment.user.name}</p>
                                            <div className="text-sm text-gray-500 space-y-1">
                                                <p>📧 {appointment.user.email}</p>
                                                {appointment.user.phone && (
                                                    <p>📞 {appointment.user.phone}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Complaint & Notes */}
                    {(appointment.complaint || appointment.notes) && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    📝 Medical Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {appointment.complaint && (
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Initial Complaint:</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-gray-700">{appointment.complaint}</p>
                                        </div>
                                    </div>
                                )}

                                {appointment.notes && (
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Doctor's Notes:</h3>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="text-blue-900">{appointment.notes}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                ⚡ Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3">
                                {canEdit && (
                                    <Link href={`/appointments/${appointment.id}/edit`}>
                                        <Button variant="outline">
                                            ✏️ Edit Appointment
                                        </Button>
                                    </Link>
                                )}

                                {canUpdateStatus && appointment.status === 'pending' && (
                                    <Button
                                        onClick={() => handleUpdateStatus('confirmed')}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        ✅ Confirm Appointment
                                    </Button>
                                )}

                                {canUpdateStatus && appointment.status === 'confirmed' && (
                                    <Button
                                        onClick={() => handleUpdateStatus('completed')}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        ✅ Mark as Completed
                                    </Button>
                                )}

                                {canCancel && (
                                    <Button
                                        variant="destructive"
                                        onClick={handleCancelAppointment}
                                    >
                                        ❌ Cancel Appointment
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Important Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                ℹ️ Important Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2 text-gray-600">
                            <p>• Please arrive 15 minutes before your appointment time</p>
                            <p>• Bring a valid ID and any relevant medical documents</p>
                            <p>• Appointments can be cancelled up to 24 hours in advance</p>
                            <p>• For emergency situations, call our clinic directly at (021) 123-4567</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SimpleLayout>
    );
}