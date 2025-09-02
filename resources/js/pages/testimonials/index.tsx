import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Testimonial {
    id: number;
    patient_name: string;
    content: string;
    service_received: string;
    rating: number;
    source: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    testimonials: {
        data: Testimonial[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

export default function TestimonialsIndex({ testimonials }: Props) {
    const getSourceLabel = (source: string) => {
        const labels: Record<string, string> = {
            website: 'Website',
            google: 'Google Business',
            whatsapp: 'WhatsApp'
        };
        return labels[source] || source;
    };

    const getSourceIcon = (source: string) => {
        const icons: Record<string, string> = {
            website: '🌐',
            google: '🔍',
            whatsapp: '💬'
        };
        return icons[source] || '📱';
    };

    return (
        <AppShell>
            <Head title="Testimoni Pasien - Klinik Gigi Modern" />
            
            <div className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            💬 Testimoni Pasien
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Dengarkan pengalaman nyata dari ribuan pasien yang telah merasakan 
                            pelayanan dan perawatan berkualitas tinggi di klinik kami.
                        </p>
                    </div>

                    <div className="text-center mb-8">
                        <Link
                            href="/testimonials/create"
                            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            ✍️ Bagikan Pengalaman Anda
                        </Link>
                    </div>
                    
                    {/* Testimonials Grid */}
                    {testimonials.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {testimonials.data.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 p-6"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                                                <span className="text-lg">😊</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{testimonial.patient_name}</h3>
                                                <p className="text-sm text-teal-600">{testimonial.service_received}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500 flex items-center">
                                                {getSourceIcon(testimonial.source)}
                                                <span className="ml-1">{getSourceLabel(testimonial.source)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Rating */}
                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <span
                                                key={i}
                                                className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                ⭐
                                            </span>
                                        ))}
                                    </div>
                                    
                                    {/* Content */}
                                    <blockquote className="text-gray-600 text-sm italic leading-relaxed">
                                        "{testimonial.content}"
                                    </blockquote>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">💬</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Testimoni</h3>
                            <p className="text-gray-600 mb-6">Jadilah yang pertama berbagi pengalaman Anda!</p>
                            <Link
                                href="/testimonials/create"
                                className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                ✍️ Tulis Testimoni
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {testimonials.meta && testimonials.meta.last_page > 1 && (
                        <div className="flex justify-center mt-12">
                            <div className="flex space-x-2">
                                {testimonials.links.map((link, index: number) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                            link.active
                                                ? 'bg-teal-600 text-white'
                                                : link.url
                                                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stats Section */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-teal-50 rounded-lg p-6 text-center border border-teal-100">
                            <div className="text-3xl font-bold text-teal-600 mb-2">1000+</div>
                            <p className="text-teal-800 font-semibold">Pasien Puas</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-6 text-center border border-orange-100">
                            <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
                            <p className="text-orange-800 font-semibold">Rating Kepuasan</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
                            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                            <p className="text-blue-800 font-semibold">Rekomendasi</p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            🎯 Ingin Merasakan Pengalaman yang Sama?
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            Bergabunglah dengan ribuan pasien yang telah merasakan pelayanan terbaik kami. 
                            Jadwalkan konsultasi sekarang dan rasakan perbedaannya!
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
                                🔍 Lihat Layanan Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}