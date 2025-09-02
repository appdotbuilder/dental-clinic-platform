import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { SimpleLayout } from '@/components/simple-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    bio: string;
}

interface Props {
    doctors: Doctor[];
    [key: string]: unknown;
}

type AppointmentFormData = {
    doctor_id: string;
    appointment_date: string;
    start_time: string;
    end_time: string;
    complaint: string;
}

export default function CreateAppointment({ doctors }: Props) {
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    const { data, setData, post, processing, errors } = useForm<AppointmentFormData>({
        doctor_id: '',
        appointment_date: '',
        start_time: '',
        end_time: '',
        complaint: '',
    });

    const fetchAvailableSlots = async (doctorId: string, date: string) => {
        if (!doctorId || !date) return;

        setIsLoadingSlots(true);
        try {
            const response = await fetch(`/api/appointments/available-slots?doctor_id=${doctorId}&date=${date}`);
            const result = await response.json();
            setAvailableSlots(result.slots || []);
        } catch (error) {
            console.error('Error fetching slots:', error);
            setAvailableSlots([]);
        } finally {
            setIsLoadingSlots(false);
        }
    };

    useEffect(() => {
        if (data.doctor_id && data.appointment_date) {
            fetchAvailableSlots(data.doctor_id, data.appointment_date);
        }
    }, [data.doctor_id, data.appointment_date]);

    const handleTimeSlotSelect = (startTime: string) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const endTime = new Date();
        endTime.setHours(hours, minutes + 30, 0); // 30-minute slots
        
        setData({
            ...data,
            start_time: startTime,
            end_time: endTime.toTimeString().slice(0, 8),
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('appointments.store'));
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <SimpleLayout>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">📅 Book an Appointment</h1>
                    <p className="text-gray-600">Schedule your dental visit with one of our expert doctors</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            🦷 New Appointment
                        </CardTitle>
                        <CardDescription>
                            Fill in the details below to book your appointment
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Doctor Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="doctor_id">Select Doctor *</Label>
                                <Select
                                    value={data.doctor_id}
                                    onValueChange={(value) => setData('doctor_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a doctor..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {doctors.map((doctor) => (
                                            <SelectItem key={doctor.id} value={doctor.id.toString()}>
                                                <div>
                                                    <div className="font-medium">{doctor.name}</div>
                                                    <div className="text-sm text-gray-600">{doctor.specialization}</div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.doctor_id && (
                                    <p className="text-sm text-red-600">{errors.doctor_id}</p>
                                )}
                            </div>

                            {/* Date Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="appointment_date">Appointment Date *</Label>
                                <Input
                                    type="date"
                                    id="appointment_date"
                                    min={today}
                                    value={data.appointment_date}
                                    onChange={(e) => setData('appointment_date', e.target.value)}
                                    className="w-full"
                                />
                                {errors.appointment_date && (
                                    <p className="text-sm text-red-600">{errors.appointment_date}</p>
                                )}
                            </div>

                            {/* Time Slots */}
                            {data.doctor_id && data.appointment_date && (
                                <div className="space-y-2">
                                    <Label>Available Time Slots *</Label>
                                    {isLoadingSlots ? (
                                        <div className="text-center py-4">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                            <p className="text-sm text-gray-600 mt-2">Loading available slots...</p>
                                        </div>
                                    ) : availableSlots.length > 0 ? (
                                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                            {availableSlots.map((slot) => (
                                                <button
                                                    key={slot}
                                                    type="button"
                                                    onClick={() => handleTimeSlotSelect(slot)}
                                                    className={`p-2 text-sm border rounded-md transition ${
                                                        data.start_time === slot
                                                            ? 'bg-blue-600 text-white border-blue-600'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                                                    }`}
                                                >
                                                    {slot.slice(0, 5)}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <p>⚠️ No available slots for the selected date</p>
                                            <p className="text-sm">Please try a different date</p>
                                        </div>
                                    )}
                                    {errors.start_time && (
                                        <p className="text-sm text-red-600">{errors.start_time}</p>
                                    )}
                                </div>
                            )}

                            {/* Complaint */}
                            <div className="space-y-2">
                                <Label htmlFor="complaint">Initial Complaint (Optional)</Label>
                                <Textarea
                                    id="complaint"
                                    placeholder="Describe any dental concerns or symptoms you're experiencing..."
                                    value={data.complaint}
                                    onChange={(e) => setData('complaint', e.target.value)}
                                    rows={4}
                                />
                                {errors.complaint && (
                                    <p className="text-sm text-red-600">{errors.complaint}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-4 pt-4 border-t">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.get('/')}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing || !data.doctor_id || !data.appointment_date || !data.start_time}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {processing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Booking...
                                        </>
                                    ) : (
                                        <>
                                            📅 Book Appointment
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Info Section */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                ℹ️ Booking Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <p>• Appointments can be cancelled up to 24 hours in advance</p>
                            <p>• You will receive confirmation via email and WhatsApp</p>
                            <p>• Please arrive 15 minutes before your appointment</p>
                            <p>• Bring your ID and any relevant medical documents</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                📞 Need Help?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <p>Phone: <strong>(021) 123-4567</strong></p>
                            <p>WhatsApp: <strong>+62 812-3456-7890</strong></p>
                            <p>Email: <strong>info@dentalcare.com</strong></p>
                            <p>Our team is here to assist you!</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </SimpleLayout>
    );
}