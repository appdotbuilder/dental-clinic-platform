import React from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    bio: string;
    photo: string | null;
}

interface Service {
    id: number;
    name: string;
    description: string;
    price: number | null;
}

interface GalleryItem {
    id: number;
    title: string;
    description: string | null;
    image_path: string;
}

interface Props {
    doctors: Doctor[];
    services: Service[];
    gallery: GalleryItem[];
    [key: string]: unknown;
}

export default function Welcome({ doctors, services, gallery }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">🦷</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">DentalCare Clinic</h1>
                                <p className="text-sm text-gray-600">Professional Dental Services</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="text-gray-600 hover:text-blue-600 font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/appointments/create"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Book Appointment
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-600 hover:text-blue-600 font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            🦷 Smile with Confidence
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Klinik gigi modern dengan layanan terpercaya untuk kesehatan gigi dan mulut Anda. 
                            Dipercaya oleh ribuan pasien untuk perawatan gigi berkualitas tinggi.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <Link
                                    href="/appointments/create"
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    📅 Book Your Appointment
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/register"
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        📅 Book Appointment
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
                                    >
                                        👨‍⚕️ Doctor Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">🏥 Our Services</h2>
                        <p className="text-lg text-gray-600">Comprehensive dental care for all your needs</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.slice(0, 6).map((service) => (
                            <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.name}</h3>
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                {service.price && (
                                    <p className="text-blue-600 font-semibold text-lg">
                                        Rp {service.price.toLocaleString('id-ID')}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Doctors Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">👨‍⚕️ Our Expert Doctors</h2>
                        <p className="text-lg text-gray-600">Meet our experienced and caring dental professionals</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition">
                                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    {doctor.photo ? (
                                        <img 
                                            src={doctor.photo} 
                                            alt={doctor.name}
                                            className="w-24 h-24 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-3xl">👨‍⚕️</span>
                                    )}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{doctor.specialization}</p>
                                <p className="text-gray-600 text-sm">{doctor.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            {gallery.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">🏢 Our Clinic Gallery</h2>
                            <p className="text-lg text-gray-600">Take a look at our modern facilities</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {gallery.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                                        <span className="text-4xl">🏥</span>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                                        {item.description && (
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact & Info Section */}
            <section className="py-16 bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl mb-4">📍</div>
                            <h3 className="text-xl font-semibold mb-2">Location</h3>
                            <p>Jl. Kesehatan No. 123<br />Jakarta Pusat, 10110</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">📞</div>
                            <h3 className="text-xl font-semibold mb-2">Contact</h3>
                            <p>Phone: (021) 123-4567<br />WhatsApp: +62 812-3456-7890</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl mb-4">🕒</div>
                            <h3 className="text-xl font-semibold mb-2">Hours</h3>
                            <p>Mon-Fri: 9:00 AM - 5:00 PM<br />Sat: 9:00 AM - 2:00 PM</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p>&copy; 2024 DentalCare Clinic. All rights reserved.</p>
                    <p className="mt-2 text-sm">Professional dental care you can trust 🦷</p>
                </div>
            </footer>
        </div>
    );
}