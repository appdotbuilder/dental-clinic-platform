import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    description: string;
    photo?: string;
}

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    price_from: number;
}

interface Testimonial {
    id: number;
    patient_name: string;
    content: string;
    service_received: string;
    rating: number;
}

interface Props {
    featuredServices: Service[];
    featuredDoctors: Doctor[];
    featuredTestimonials: Testimonial[];
    [key: string]: unknown;
}

export default function Welcome({ featuredServices, featuredDoctors, featuredTestimonials }: Props) {
    return (
        <AppShell>
            <Head title="Klinik Gigi Modern - Senyum Sehat dan Percaya Diri" />
            
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-teal-600 to-blue-600 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        🦷 Senyum Sehat dan Percaya Diri<br />Dimulai di Sini
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                        Klinik gigi modern dengan teknologi terdepan dan tim dokter berpengalaman untuk perawatan gigi terbaik Anda
                    </p>
                    <Link
                        href="/testimonials/create"
                        className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-lg transition-colors duration-200"
                    >
                        📅 Buat Janji Temu Online
                    </Link>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        🏥 Tentang Klinik Kami
                    </h2>
                    <div className="text-lg text-gray-600 space-y-4">
                        <p>
                            Kami berkomitmen memberikan pelayanan kesehatan gigi terbaik dengan menggabungkan teknologi modern, 
                            fasilitas yang nyaman, dan tim medis yang berpengalaman. Setiap pasien adalah prioritas utama kami.
                        </p>
                        <p>
                            Dengan pendekatan yang ramah dan profesional, kami memastikan setiap kunjungan Anda menjadi 
                            pengalaman yang menyenangkan dan hasil perawatan yang memuaskan.
                        </p>
                        <p>
                            Kepercayaan dan kenyamanan pasien adalah fondasi dari setiap perawatan yang kami berikan. 
                            Mari wujudkan senyum sehat impian Anda bersama kami.
                        </p>
                    </div>
                </div>
            </div>

            {/* Featured Services */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            ⭐ Layanan Unggulan Kami
                        </h2>
                        <p className="text-lg text-gray-600">
                            Perawatan gigi berkualitas tinggi dengan teknologi terdepan
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredServices.map((service) => (
                            <Link
                                key={service.id}
                                href={`/services/${service.slug}`}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100"
                            >
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                                <div className="text-teal-600 font-semibold">
                                    Mulai dari Rp {service.price_from.toLocaleString('id-ID')}
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                    <div className="text-center mt-8">
                        <Link
                            href="/services"
                            className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            Lihat Semua Layanan →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Featured Doctors */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            👨‍⚕️ Tim Dokter Berpengalaman
                        </h2>
                        <p className="text-lg text-gray-600">
                            Dokter spesialis yang siap memberikan perawatan terbaik untuk Anda
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredDoctors.map((doctor) => (
                            <Link
                                key={doctor.id}
                                href={`/doctors/${doctor.id}`}
                                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 text-center"
                            >
                                <div className="w-24 h-24 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                                    <span className="text-3xl">👨‍⚕️</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                                <p className="text-teal-600 font-semibold mb-3">{doctor.specialization}</p>
                                <p className="text-gray-600 text-sm line-clamp-3">{doctor.description}</p>
                                <div className="mt-4 text-teal-600 font-semibold">
                                    Lihat Profil →
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                    <div className="text-center mt-8">
                        <Link
                            href="/doctors"
                            className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            🏥 Lihat Tim Kami
                        </Link>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            💬 Testimoni Pasien
                        </h2>
                        <p className="text-lg text-gray-600">
                            Dengarkan pengalaman pasien yang telah merasakan perawatan kami
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredTestimonials.slice(0, 6).map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-lg">😊</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.patient_name}</h4>
                                        <p className="text-sm text-teal-600">{testimonial.service_received}</p>
                                    </div>
                                </div>
                                
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            ⭐
                                        </span>
                                    ))}
                                </div>
                                
                                <p className="text-gray-600 text-sm italic">
                                    "{testimonial.content}"
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-8">
                        <Link
                            href="/testimonials"
                            className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            Lihat Semua Testimoni →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="py-16 bg-teal-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div>
                            <h3 className="text-xl font-bold mb-4">📍 Alamat Klinik</h3>
                            <p className="mb-2">Jl. Sehat Sentosa No. 123</p>
                            <p className="mb-2">Jakarta Selatan 12560</p>
                            <a 
                                href="https://maps.google.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-orange-300 hover:text-orange-200 underline"
                            >
                                Lihat di Google Maps →
                            </a>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4">📞 Kontak</h3>
                            <p className="mb-2">Telepon: (021) 1234-5678</p>
                            <p className="mb-2">WhatsApp: 0812-3456-7890</p>
                            <p>Email: info@klinikgigi.com</p>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-bold mb-4">⏰ Jam Buka</h3>
                            <p className="mb-2">Senin - Jumat: 09:00 - 17:00</p>
                            <p className="mb-2">Sabtu: 09:00 - 14:00</p>
                            <p>Minggu: Tutup</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-orange-500 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">
                        🎯 Siap untuk Senyum yang Lebih Sehat?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Jangan tunda lagi! Konsultasikan kebutuhan gigi Anda dengan tim dokter berpengalaman kami.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/testimonials/create"
                            className="inline-flex items-center px-8 py-4 bg-white text-orange-500 hover:bg-gray-100 font-semibold rounded-lg transition-colors duration-200"
                        >
                            📅 Buat Janji Sekarang
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 font-semibold rounded-lg transition-colors duration-200"
                        >
                            🔍 Lihat Layanan Kami
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}