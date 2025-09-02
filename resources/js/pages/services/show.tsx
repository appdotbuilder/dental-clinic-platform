import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface FAQ {
    question: string;
    answer: string;
}

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    benefits: string[];
    process: string;
    faq: FAQ[];
    icon: string;
    price_from: number;
    featured: boolean;
}

interface Props {
    service: Service;
    [key: string]: unknown;
}

export default function ServiceShow({ service }: Props) {
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
            <Head title={`${service.name} - Layanan`} />
            
            <div className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg p-8 mb-8">
                        <div className="text-center">
                            <div className="text-6xl mb-4">{service.icon}</div>
                            {service.featured && (
                                <div className="inline-block bg-orange-500 text-white text-sm px-3 py-1 rounded-full mb-3">
                                    ⭐ Layanan Unggulan
                                </div>
                            )}
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.name}</h1>
                            <p className="text-xl text-teal-100 mb-6 max-w-2xl mx-auto">{service.description}</p>
                            {service.price_from && (
                                <div className="inline-block bg-white/20 px-6 py-3 rounded-lg mb-4">
                                    <p className="text-lg font-semibold">
                                        Mulai dari {formatPrice(service.price_from)}
                                    </p>
                                </div>
                            )}
                            <Link
                                href="/testimonials/create"
                                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                📅 Buat Janji Temu
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Benefits */}
                            {service.benefits && service.benefits.length > 0 && (
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                        ✨ Manfaat {service.name}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-start p-4 bg-teal-50 rounded-lg">
                                                <span className="text-teal-600 mr-3 mt-1">✓</span>
                                                <span className="text-gray-700">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Process */}
                            {service.process && (
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                        🔄 Proses Perawatan
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-700 font-medium">{service.process}</p>
                                    </div>
                                </div>
                            )}

                            {/* FAQ */}
                            {service.faq && service.faq.length > 0 && (
                                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                        ❓ Pertanyaan yang Sering Diajukan
                                    </h2>
                                    <div className="space-y-6">
                                        {service.faq.map((item, index) => (
                                            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                                                <h3 className="font-semibold text-gray-900 mb-2 flex items-start">
                                                    <span className="text-teal-600 mr-2">Q:</span>
                                                    {item.question}
                                                </h3>
                                                <p className="text-gray-600 ml-6">
                                                    <span className="text-teal-600 mr-2 font-semibold">A:</span>
                                                    {item.answer}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Booking CTA */}
                            <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                                <h3 className="text-lg font-bold text-orange-900 mb-3">
                                    🎯 Tertarik dengan {service.name}?
                                </h3>
                                <p className="text-orange-700 text-sm mb-4">
                                    Jadwalkan konsultasi dengan tim dokter kami untuk mendapatkan perawatan terbaik.
                                </p>
                                <Link
                                    href="/testimonials/create"
                                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    📅 Buat Janji Sekarang
                                </Link>
                            </div>

                            {/* Price Info */}
                            {service.price_from && (
                                <div className="bg-teal-50 rounded-lg p-6 border border-teal-100">
                                    <h3 className="text-lg font-bold text-teal-900 mb-3">
                                        💰 Informasi Harga
                                    </h3>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-teal-600 mb-2">
                                            {formatPrice(service.price_from)}
                                        </p>
                                        <p className="text-teal-700 text-sm mb-4">
                                            *Biaya akhir dapat disesuaikan tergantung kompleksitas kasus
                                        </p>
                                        <Link
                                            href="/pricing"
                                            className="text-teal-600 hover:text-teal-700 font-medium text-sm underline"
                                        >
                                            Lihat Daftar Harga Lengkap →
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Other Services */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    🔗 Layanan Lainnya
                                </h3>
                                <div className="space-y-2">
                                    <Link
                                        href="/services"
                                        className="block text-teal-600 hover:text-teal-700 font-medium text-sm"
                                    >
                                        • Lihat Semua Layanan
                                    </Link>
                                    <Link
                                        href="/doctors"
                                        className="block text-teal-600 hover:text-teal-700 font-medium text-sm"
                                    >
                                        • Tim Dokter Kami
                                    </Link>
                                    <Link
                                        href="/testimonials"
                                        className="block text-teal-600 hover:text-teal-700 font-medium text-sm"
                                    >
                                        • Testimoni Pasien
                                    </Link>
                                    <Link
                                        href="/gallery"
                                        className="block text-teal-600 hover:text-teal-700 font-medium text-sm"
                                    >
                                        • Galeri Klinik
                                    </Link>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    📞 Hubungi Kami
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
                            href="/services"
                            className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
                        >
                            ← Kembali ke Layanan
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}