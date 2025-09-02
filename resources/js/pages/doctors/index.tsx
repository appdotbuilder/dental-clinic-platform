import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Doctor {
    id: number;
    name: string;
    title: string;
    specialization: string;
    description: string;
    photo?: string;
    featured: boolean;
}

interface Props {
    doctors: Doctor[];
    [key: string]: unknown;
}

export default function DoctorsIndex({ doctors }: Props) {
    return (
        <AppShell>
            <Head title="Tim Dokter - Klinik Gigi Modern" />
            
            <div className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            👨‍⚕️ Tim Dokter Kami
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Bertemu dengan tim dokter spesialis berpengalaman yang siap memberikan 
                            perawatan terbaik dengan teknologi modern dan pendekatan yang ramah.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {doctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="w-24 h-24 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                                            <span className="text-4xl">👨‍⚕️</span>
                                        </div>
                                        {doctor.featured && (
                                            <div className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                                                ⭐ Dokter Unggulan
                                            </div>
                                        )}
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h2>
                                        <p className="text-teal-600 font-semibold">{doctor.specialization}</p>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-4">
                                        {doctor.description}
                                    </p>
                                    
                                    <div className="space-y-3">
                                        <Link
                                            href={`/doctors/${doctor.id}`}
                                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                        >
                                            👤 Lihat Profil Lengkap
                                        </Link>
                                        <Link
                                            href="/testimonials/create"
                                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                                        >
                                            📅 Buat Janji dengan {doctor.title} {doctor.name.split(' ')[0]}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {doctors.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">👨‍⚕️</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Dokter</h3>
                            <p className="text-gray-600">Tim dokter akan segera hadir untuk melayani Anda.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}