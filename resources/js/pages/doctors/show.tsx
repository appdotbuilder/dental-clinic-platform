import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Doctor {
    id: number;
    name: string;
    title: string;
    specialization: string;
    description: string;
    experience: string[];
    education: string[];
    schedule: Record<string, string>;
    photo?: string;
    featured: boolean;
}

interface Props {
    doctor: Doctor;
    [key: string]: unknown;
}

export default function DoctorShow({ doctor }: Props) {
    const dayNames: Record<string, string> = {
        'senin': 'Senin',
        'selasa': 'Selasa',
        'rabu': 'Rabu',
        'kamis': 'Kamis',
        'jumat': 'Jumat',
        'sabtu': 'Sabtu',
        'minggu': 'Minggu'
    };

    return (
        <AppShell>
            <Head title={`${doctor.name} - Tim Dokter`} />
            
            <div className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg p-8 mb-8">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-6xl">👨‍⚕️</span>
                            </div>
                            <div className="text-center md:text-left flex-1">
                                {doctor.featured && (
                                    <div className="inline-block bg-orange-500 text-white text-sm px-3 py-1 rounded-full mb-3">
                                        ⭐ Dokter Unggulan
                                    </div>
                                )}
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">{doctor.name}</h1>
                                <p className="text-xl text-teal-100 font-semibold mb-4">{doctor.specialization}</p>
                                <Link
                                    href="/testimonials/create"
                                    className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    📅 Buat Janji dengan {doctor.title} {doctor.name.split(' ')[0]}
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* About */}
                            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                    👨‍⚕️ Tentang Dokter
                                </h2>
                                <p className="text-gray-600 leading-relaxed">{doctor.description}</p>
                            </div>

                            {/* Experience */}
                            {doctor.experience && doctor.experience.length > 0 && (
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                        💼 Pengalaman Kerja
                                    </h2>
                                    <ul className="space-y-3">
                                        {doctor.experience.map((exp, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-teal-600 mr-3 mt-1">▸</span>
                                                <span className="text-gray-600">{exp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Education */}
                            {doctor.education && doctor.education.length > 0 && (
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                        🎓 Pendidikan
                                    </h2>
                                    <ul className="space-y-3">
                                        {doctor.education.map((edu, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-teal-600 mr-3 mt-1">▸</span>
                                                <span className="text-gray-600">{edu}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Schedule */}
                            {doctor.schedule && (
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        ⏰ Jadwal Praktek
                                    </h3>
                                    <div className="space-y-2">
                                        {Object.entries(doctor.schedule).map(([day, time]) => (
                                            <div key={day} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                                                <span className="text-gray-600 font-medium">{dayNames[day] || day}</span>
                                                <span className={`font-semibold ${time === 'Libur' ? 'text-red-500' : 'text-teal-600'}`}>
                                                    {time}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="bg-teal-50 rounded-lg p-6 border border-teal-100">
                                <h3 className="text-lg font-bold text-teal-900 mb-3">
                                    🎯 Siap untuk Konsultasi?
                                </h3>
                                <p className="text-teal-700 text-sm mb-4">
                                    Jadwalkan konsultasi dengan {doctor.title} {doctor.name.split(' ')[0]} 
                                    untuk mendapatkan perawatan terbaik.
                                </p>
                                <Link
                                    href="/testimonials/create"
                                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    📅 Buat Janji Sekarang
                                </Link>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    📞 Kontak Klinik
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <p className="text-gray-600">
                                        <span className="font-medium">Telepon:</span><br />
                                        (021) 1234-5678
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">WhatsApp:</span><br />
                                        0812-3456-7890
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Email:</span><br />
                                        info@klinikgigi.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-8">
                        <Link
                            href="/doctors"
                            className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
                        >
                            ← Kembali ke Tim Dokter
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}