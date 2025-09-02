import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';



export default function TestimonialsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        patient_name: '',
        content: '',
        service_received: '',
        rating: 5,
    });

    const services = [
        'Scaling',
        'Tambal Gigi Estetik',
        'Perawatan Saluran Akar',
        'Veneer Gigi',
        'Pemutihan Gigi',
        'Implan Gigi',
        'Behel Gigi',
        'Pembersihan Karang Gigi',
        'Konsultasi Umum',
        'Lainnya'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('testimonials.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppShell>
            <Head title="Bagikan Pengalaman - Klinik Gigi Modern" />
            
            <div className="py-16 bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                ✍️ Bagikan Pengalaman Anda
                            </h1>
                            <p className="text-xl text-gray-600">
                                Ceritakan pengalaman perawatan Anda di klinik kami. 
                                Testimoni Anda sangat berharga untuk membantu pasien lain.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Patient Name */}
                                <div>
                                    <label htmlFor="patient_name" className="block text-sm font-semibold text-gray-900 mb-2">
                                        👤 Nama Anda <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="patient_name"
                                        value={data.patient_name}
                                        onChange={(e) => setData('patient_name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        placeholder="Masukkan nama Anda"
                                        required
                                    />
                                    {errors.patient_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.patient_name}</p>
                                    )}
                                </div>

                                {/* Service Received */}
                                <div>
                                    <label htmlFor="service_received" className="block text-sm font-semibold text-gray-900 mb-2">
                                        🦷 Layanan yang Diterima <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="service_received"
                                        value={data.service_received}
                                        onChange={(e) => setData('service_received', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Pilih layanan yang Anda terima</option>
                                        {services.map((service) => (
                                            <option key={service} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.service_received && (
                                        <p className="mt-1 text-sm text-red-600">{errors.service_received}</p>
                                    )}
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        ⭐ Rating Kepuasan <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                type="button"
                                                onClick={() => setData('rating', rating)}
                                                className={`text-3xl transition-colors duration-200 ${
                                                    rating <= data.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                                                }`}
                                            >
                                                ⭐
                                            </button>
                                        ))}
                                        <span className="ml-3 text-sm text-gray-600 self-center">
                                            ({data.rating} dari 5 bintang)
                                        </span>
                                    </div>
                                    {errors.rating && (
                                        <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                                    )}
                                </div>

                                {/* Content */}
                                <div>
                                    <label htmlFor="content" className="block text-sm font-semibold text-gray-900 mb-2">
                                        💬 Testimoni Anda <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                                        placeholder="Ceritakan pengalaman Anda di klinik kami..."
                                        required
                                    />
                                    <div className="mt-1 flex justify-between">
                                        {errors.content && (
                                            <p className="text-sm text-red-600">{errors.content}</p>
                                        )}
                                        <p className="text-sm text-gray-500 ml-auto">
                                            {data.content.length} karakter (minimal 10 karakter)
                                        </p>
                                    </div>
                                </div>

                                {/* Privacy Notice */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <span className="text-blue-600 text-xl mr-3">🔒</span>
                                        <div className="text-sm text-blue-800">
                                            <p className="font-semibold mb-1">Catatan Privasi</p>
                                            <p>
                                                Testimoni Anda akan ditinjau oleh admin sebelum dipublikasikan. 
                                                Kami menghormati privasi Anda dan hanya akan menampilkan nama depan Anda.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                                    >
                                        {processing ? '⏳ Mengirim...' : '📤 Kirim Testimoni'}
                                    </button>
                                    <a
                                        href="/testimonials"
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200"
                                    >
                                        👁️ Lihat Testimoni Lain
                                    </a>
                                </div>
                            </form>
                        </div>

                        {/* Contact Alternative */}
                        <div className="mt-8 bg-orange-50 rounded-lg p-6 border border-orange-100 text-center">
                            <h3 className="text-lg font-bold text-orange-900 mb-2">
                                📞 Atau Hubungi Kami Langsung
                            </h3>
                            <p className="text-orange-700 mb-4 text-sm">
                                Ingin memberikan testimoni atau feedback secara langsung? 
                                Tim kami siap mendengarkan Anda.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="tel:+6221234567"
                                    className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    📞 (021) 1234-5678
                                </a>
                                <a
                                    href="https://wa.me/6281234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    💬 WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}