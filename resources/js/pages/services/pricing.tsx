import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    price_from: number;
    icon: string;
}

interface Props {
    services: Service[];
    [key: string]: unknown;
}

export default function ServicesPricing({ services }: Props) {
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
            <Head title="Daftar Harga - Klinik Gigi Modern" />
            
            <div className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            💰 Daftar Harga Layanan
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Kami berkomitmen memberikan pelayanan berkualitas tinggi dengan harga yang transparan 
                            dan terjangkau untuk semua kalangan.
                        </p>
                    </div>

                    {/* Price Table */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 mb-8">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-teal-600 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Layanan</th>
                                        <th className="px-6 py-4 text-left font-semibold">Deskripsi Singkat</th>
                                        <th className="px-6 py-4 text-right font-semibold">Harga Mulai Dari (IDR)</th>
                                        <th className="px-6 py-4 text-center font-semibold">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {services.map((service, index) => (
                                        <tr key={service.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <span className="text-2xl mr-3">{service.icon}</span>
                                                    <span className="font-semibold text-gray-900">{service.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 max-w-xs">
                                                <p className="line-clamp-2 text-sm">{service.description}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="font-bold text-teal-600 text-lg">
                                                    {formatPrice(service.price_from)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                                    <Link
                                                        href={`/services/${service.slug}`}
                                                        className="px-3 py-1 bg-teal-100 hover:bg-teal-200 text-teal-700 text-xs font-medium rounded transition-colors duration-200"
                                                    >
                                                        Detail
                                                    </Link>
                                                    <Link
                                                        href="/testimonials/create"
                                                        className="px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs font-medium rounded transition-colors duration-200"
                                                    >
                                                        Booking
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Price Note */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                        <div className="flex items-start">
                            <span className="text-yellow-600 text-2xl mr-4">⚠️</span>
                            <div>
                                <h3 className="font-semibold text-yellow-800 mb-2">Catatan Penting Mengenai Harga</h3>
                                <p className="text-yellow-700 text-sm leading-relaxed">
                                    Biaya akhir dapat disesuaikan tergantung kompleksitas kasus dan kondisi spesifik pasien. 
                                    Silakan konsultasi dengan dokter kami untuk mendapatkan rincian biaya yang lebih akurat 
                                    sesuai dengan kebutuhan perawatan Anda.
                                </p>
                            </div>
                        </div>
                    </div>

                    {services.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">💰</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Daftar Harga Belum Tersedia</h3>
                            <p className="text-gray-600">Informasi harga layanan akan segera diperbarui.</p>
                        </div>
                    )}

                    {/* Payment Methods */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                        <div className="bg-teal-50 rounded-lg p-6 border border-teal-100">
                            <h3 className="text-xl font-bold text-teal-900 mb-4 flex items-center">
                                💳 Metode Pembayaran
                            </h3>
                            <div className="space-y-2">
                                <p className="flex items-center text-teal-700">
                                    <span className="mr-2">✓</span> Tunai
                                </p>
                                <p className="flex items-center text-teal-700">
                                    <span className="mr-2">✓</span> Kartu Debit/Kredit
                                </p>
                                <p className="flex items-center text-teal-700">
                                    <span className="mr-2">✓</span> Transfer Bank
                                </p>
                                <p className="flex items-center text-teal-700">
                                    <span className="mr-2">✓</span> E-wallet (OVO, GoPay, Dana)
                                </p>
                                <p className="flex items-center text-teal-700">
                                    <span className="mr-2">✓</span> Cicilan 0% (Kartu Kredit tertentu)
                                </p>
                            </div>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center">
                                🎯 Konsultasi Gratis
                            </h3>
                            <p className="text-orange-700 mb-4 text-sm">
                                Tidak yakin perawatan mana yang Anda butuhkan? 
                                Dapatkan konsultasi gratis dengan dokter kami untuk menentukan 
                                rencana perawatan dan estimasi biaya yang tepat.
                            </p>
                            <Link
                                href="/testimonials/create"
                                className="w-full inline-flex items-center justify-center px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                📞 Konsultasi Sekarang
                            </Link>
                        </div>
                    </div>

                    {/* Insurance Info */}
                    <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
                        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                            🏥 Kerjasama Asuransi
                        </h3>
                        <p className="text-blue-700 mb-4 text-sm">
                            Kami bekerjasama dengan berbagai perusahaan asuransi kesehatan. 
                            Silakan tanyakan kepada tim administrasi kami mengenai coverage asuransi Anda.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="bg-white p-3 rounded text-center text-blue-700 font-medium">
                                BPJS Kesehatan
                            </div>
                            <div className="bg-white p-3 rounded text-center text-blue-700 font-medium">
                                Prudential
                            </div>
                            <div className="bg-white p-3 rounded text-center text-blue-700 font-medium">
                                Allianz
                            </div>
                            <div className="bg-white p-3 rounded text-center text-blue-700 font-medium">
                                AXA Mandiri
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-12 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            🎯 Siap Memulai Perawatan?
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            Jadwalkan konsultasi dengan tim dokter kami untuk mendapatkan 
                            perawatan terbaik dengan harga terjangkau.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/testimonials/create"
                                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                📅 Buat Janji Temu
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600 font-semibold rounded-lg transition-colors duration-200"
                            >
                                📋 Lihat Semua Layanan
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}