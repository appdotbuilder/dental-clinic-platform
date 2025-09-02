import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface GalleryItem {
    id: number;
    title: string;
    image_path: string;
    category: string;
    description?: string;
}

interface Props {
    galleryItems: GalleryItem[];
    categories: Record<string, string>;
    [key: string]: unknown;
}

export default function GalleryIndex({ galleryItems, categories }: Props) {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const filteredItems = activeCategory === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === activeCategory);

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            interior: '🏥',
            team: '👥',
            before_after: '✨',
            activities: '📚'
        };
        return icons[category] || '📷';
    };

    return (
        <AppShell>
            <Head title="Galeri - Klinik Gigi Modern" />
            
            <div className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            📸 Galeri Klinik
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Lihat fasilitas modern, tim profesional, dan hasil perawatan berkualitas tinggi 
                            yang telah kami berikan kepada ribuan pasien.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                                activeCategory === 'all'
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            📷 Semua Foto
                        </button>
                        {Object.entries(categories).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                                    activeCategory === key
                                        ? 'bg-teal-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {getCategoryIcon(key)} {label}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 overflow-hidden"
                                >
                                    {/* Image Placeholder */}
                                    <div className="aspect-square bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
                                        <div className="text-6xl opacity-50">
                                            {getCategoryIcon(item.category)}
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
                                        {/* Overlay with category badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                                                {categories[item.category]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📸</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak Ada Foto</h3>
                            <p className="text-gray-600">
                                Belum ada foto untuk kategori{' '}
                                {activeCategory === 'all' ? 'ini' : categories[activeCategory]}.
                            </p>
                        </div>
                    )}

                    {/* Demo Gallery Items (showing placeholders) */}
                    {galleryItems.length === 0 && (
                        <>
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    🎭 Preview Galeri
                                </h2>
                                <p className="text-gray-600">
                                    Berikut adalah contoh tampilan galeri klinik kami:
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {/* Interior & Facilities */}
                                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                                        <div className="text-6xl">🏥</div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                                                Interior & Fasilitas
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Ruang Tunggu yang Nyaman</h3>
                                        <p className="text-gray-600 text-sm">
                                            Area tunggu yang luas dan nyaman dengan fasilitas modern
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="aspect-square bg-gradient-to-br from-teal-100 to-green-100 flex items-center justify-center">
                                        <div className="text-6xl">⚕️</div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                                                Interior & Fasilitas
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Ruang Praktek Modern</h3>
                                        <p className="text-gray-600 text-sm">
                                            Ruang perawatan dengan peralatan dental terkini
                                        </p>
                                    </div>
                                </div>

                                {/* Team */}
                                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="aspect-square bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                                        <div className="text-6xl">👥</div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                                                Tim Kami
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Tim Dokter Berpengalaman</h3>
                                        <p className="text-gray-600 text-sm">
                                            Tim medis profesional dan berpengalaman
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                        <div className="text-6xl">👩‍⚕️</div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                                                Tim Kami
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Staff yang Ramah</h3>
                                        <p className="text-gray-600 text-sm">
                                            Tim administrasi dan perawat yang siap membantu
                                        </p>
                                    </div>
                                </div>

                                {/* Before & After */}
                                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                                        <div className="text-6xl">✨</div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                                                Before & After
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Hasil Veneer Gigi</h3>
                                        <p className="text-gray-600 text-sm">
                                            Transformasi gigi dengan hasil yang menakjubkan
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="aspect-square bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                                        <div className="text-6xl">⚡</div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                                                Before & After
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Pemutihan Gigi</h3>
                                        <p className="text-gray-600 text-sm">
                                            Gigi lebih putih dan bersih dalam sekali perawatan
                                        </p>
                                    </div>
                                </div>

                                {/* Activities */}
                                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="aspect-square bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                                        <div className="text-6xl">📚</div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                                                Aktivitas & Edukasi
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Seminar Kesehatan Gigi</h3>
                                        <p className="text-gray-600 text-sm">
                                            Edukasi kesehatan gigi untuk masyarakat
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="aspect-square bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                                        <div className="text-6xl">🎓</div>
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">
                                                Aktivitas & Edukasi
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Pelatihan Tim Medis</h3>
                                        <p className="text-gray-600 text-sm">
                                            Peningkatan skill dan pengetahuan tim medis
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* CTA Section */}
                    <div className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            🎯 Tertarik dengan Fasilitas Kami?
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            Kunjungi langsung klinik kami untuk merasakan fasilitas modern 
                            dan pelayanan terbaik dari tim profesional kami.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/testimonials/create"
                                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
                            >
                                📅 Buat Janji Kunjungan
                            </a>
                            <a
                                href="/services"
                                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600 font-semibold rounded-lg transition-colors duration-200"
                            >
                                🔍 Lihat Layanan Kami
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}