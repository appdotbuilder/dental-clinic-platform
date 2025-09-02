import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    price_from: number;
    featured: boolean;
}

interface Props {
    services: Service[];
    [key: string]: unknown;
}

export default function ServicesIndex({ services }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <AppShell>
            <Head title="Layanan - Klinik Gigi Modern" />
            
            <div className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            🦷 Layanan Kami
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Kami menyediakan berbagai layanan perawatan gigi dengan teknologi modern 
                            dan standar medis terbaik untuk menjaga kesehatan dan kecantikan senyum Anda.
                        </p>
                    </div>

                    <div className="mb-8 text-center">
                        <Link
                            href="/pricing"
                            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            💰 Lihat Daftar Harga Lengkap
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="text-center mb-4">
                                        <div className="text-4xl mb-2">{service.icon}</div>
                                        {service.featured && (
                                            <div className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                                                ⭐ Layanan Unggulan
                                            </div>
                                        )}
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h2>
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {service.description}
                                    </p>
                                    
                                    {service.price_from && (
                                        <div className="mb-4 p-3 bg-teal-50 rounded-lg">
                                            <p className="text-teal-800 font-semibold text-center">
                                                Mulai dari {formatPrice(service.price_from)}
                                            </p>
                                        </div>
                                    )}
                                    
                                    <div className="space-y-2">
                                        <Link
                                            href={`/services/${service.slug}`}
                                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                        >
                                            📋 Detail Layanan
                                        </Link>
                                        <Link
                                            href="/testimonials/create"
                                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                                        >
                                            📅 Buat Janji Temu
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {services.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🦷</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Layanan</h3>
                            <p className="text-gray-600">Layanan perawatan gigi akan segera tersedia.</p>
                        </div>
                    )}

                    {/* Info Section */}
                    <div className="mt-16 bg-teal-50 rounded-lg p-8 border border-teal-100">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-teal-900 mb-4">
                                💡 Butuh Konsultasi?
                            </h2>
                            <p className="text-teal-700 mb-6 max-w-2xl mx-auto">
                                Tidak yakin layanan mana yang Anda butuhkan? Tim dokter kami siap memberikan 
                                konsultasi gratis untuk menentukan perawatan terbaik sesuai kebutuhan Anda.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/testimonials/create"
                                    className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    📞 Konsultasi Gratis
                                </Link>
                                <Link
                                    href="/doctors"
                                    className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 text-teal-600 font-semibold rounded-lg border border-teal-200 transition-colors duration-200"
                                >
                                    👨‍⚕️ Lihat Tim Dokter
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}