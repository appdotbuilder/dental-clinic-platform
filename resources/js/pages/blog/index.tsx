import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface BlogArticle {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    published_at: string;
    featured_image?: string;
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
    articles: {
        data: BlogArticle[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

export default function BlogIndex({ articles }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <AppShell>
            <Head title="Blog - Klinik Gigi Modern" />
            
            <div className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            📚 Blog Kesehatan Gigi
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Tips, informasi, dan edukasi kesehatan gigi terkini dari para ahli. 
                            Temukan jawaban atas pertanyaan umum seputar perawatan gigi dan mulut.
                        </p>
                    </div>
                    
                    {/* Featured Topics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        <div className="bg-teal-50 rounded-lg p-4 text-center border border-teal-100">
                            <div className="text-2xl mb-2">🦷</div>
                            <p className="text-sm font-semibold text-teal-800">Perawatan Dasar</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-100">
                            <div className="text-2xl mb-2">👶</div>
                            <p className="text-sm font-semibold text-orange-800">Gigi Anak</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                            <div className="text-2xl mb-2">✨</div>
                            <p className="text-sm font-semibold text-blue-800">Estetik Dental</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
                            <div className="text-2xl mb-2">🥗</div>
                            <p className="text-sm font-semibold text-green-800">Nutrisi & Gigi</p>
                        </div>
                    </div>

                    {/* Articles Grid */}
                    {articles.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.data.map((article) => (
                                <article
                                    key={article.id}
                                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 overflow-hidden"
                                >
                                    {/* Featured Image Placeholder */}
                                    <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                                        <span className="text-4xl">📚</span>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            <span className="mr-2">📅</span>
                                            {formatDate(article.published_at)}
                                        </div>
                                        
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-teal-600 transition-colors duration-200">
                                            <Link href={`/blog/${article.slug}`}>
                                                {article.title}
                                            </Link>
                                        </h2>
                                        
                                        {article.excerpt && (
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {article.excerpt}
                                            </p>
                                        )}
                                        
                                        <Link
                                            href={`/blog/${article.slug}`}
                                            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold text-sm"
                                        >
                                            Baca Selengkapnya →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Artikel Segera Hadir</h3>
                                <p className="text-gray-600">Tim ahli kami sedang menyiapkan artikel-artikel menarik untuk Anda.</p>
                            </div>

                            {/* Demo Articles */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    {
                                        title: "5 Cara Mudah Merawat Gigi Sensitif",
                                        excerpt: "Gigi sensitif bisa sangat mengganggu aktivitas sehari-hari. Pelajari cara efektif mengatasi dan mencegah gigi sensitif dengan tips dari dokter ahli.",
                                        icon: "🦷"
                                    },
                                    {
                                        title: "Kapan Waktu yang Tepat untuk Anak Pakai Behel?",
                                        excerpt: "Menentukan waktu yang tepat untuk perawatan ortodontik pada anak sangat penting. Simak panduan lengkap dari ortodontis berpengalaman.",
                                        icon: "🎯"
                                    },
                                    {
                                        title: "Mitos dan Fakta tentang Pemutihan Gigi",
                                        excerpt: "Banyak mitos seputar pemutihan gigi yang beredar. Mari kita bedah fakta ilmiah di balik prosedur pemutihan gigi yang aman dan efektif.",
                                        icon: "⚡"
                                    },
                                    {
                                        title: "Manfaat Scaling Gigi yang Perlu Anda Ketahui",
                                        excerpt: "Scaling atau pembersihan karang gigi memiliki banyak manfaat untuk kesehatan mulut. Pelajari mengapa scaling penting dilakukan secara rutin.",
                                        icon: "✨"
                                    },
                                    {
                                        title: "Tips Menjaga Kesehatan Gigi Selama Puasa",
                                        excerpt: "Puasa bukan alasan untuk mengabaikan kesehatan gigi. Ikuti tips praktis untuk menjaga kebersihan mulut selama bulan puasa.",
                                        icon: "🌙"
                                    },
                                    {
                                        title: "Pentingnya Pemeriksaan Gigi Rutin",
                                        excerpt: "Pemeriksaan gigi rutin adalah kunci utama menjaga kesehatan mulut. Ketahui manfaat dan frekuensi ideal untuk kontrol ke dokter gigi.",
                                        icon: "🔍"
                                    }
                                ].map((demo, index) => (
                                    <article
                                        key={index}
                                        className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden opacity-75"
                                    >
                                        <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center">
                                            <span className="text-4xl">{demo.icon}</span>
                                        </div>
                                        
                                        <div className="p-6">
                                            <div className="flex items-center text-sm text-gray-500 mb-3">
                                                <span className="mr-2">📅</span>
                                                Coming Soon
                                            </div>
                                            
                                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                                {demo.title}
                                            </h2>
                                            
                                            <p className="text-gray-600 text-sm mb-4">
                                                {demo.excerpt}
                                            </p>
                                            
                                            <span className="inline-flex items-center text-gray-400 font-semibold text-sm">
                                                Segera Tersedia...
                                            </span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Pagination */}
                    {articles.meta && articles.meta.last_page > 1 && (
                        <div className="flex justify-center mt-12">
                            <div className="flex space-x-2">
                                {articles.links.map((link, index: number) => (
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

                    {/* Newsletter Signup */}
                    <div className="mt-16 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            📧 Berlangganan Newsletter
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            Dapatkan tips kesehatan gigi terbaru dan informasi promo menarik 
                            langsung di email Anda setiap minggu.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Masukkan email Anda"
                                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200">
                                Berlangganan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}