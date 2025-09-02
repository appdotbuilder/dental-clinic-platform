import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface BlogArticle {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    published_at: string;
    featured_image?: string;
}

interface Props {
    article: BlogArticle;
    [key: string]: unknown;
}

export default function BlogShow({ article }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <AppShell>
            <Head title={`${article.title} - Blog`} />
            
            <div className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Breadcrumb */}
                        <nav className="mb-8">
                            <div className="flex items-center text-sm text-gray-500">
                                <Link href="/" className="hover:text-teal-600">Beranda</Link>
                                <span className="mx-2">›</span>
                                <Link href="/blog" className="hover:text-teal-600">Blog</Link>
                                <span className="mx-2">›</span>
                                <span className="text-gray-900 truncate">{article.title}</span>
                            </div>
                        </nav>

                        {/* Article Header */}
                        <header className="mb-8">
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                <span className="mr-2">📅</span>
                                {formatDate(article.published_at)}
                            </div>
                            
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {article.title}
                            </h1>
                            
                            {article.excerpt && (
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    {article.excerpt}
                                </p>
                            )}
                        </header>

                        {/* Featured Image Placeholder */}
                        <div className="aspect-video bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg flex items-center justify-center mb-8">
                            <span className="text-6xl">📚</span>
                        </div>

                        {/* Article Content */}
                        <article className="prose prose-lg max-w-none">
                            <div className="bg-white rounded-lg">
                                {/* Content formatted as paragraphs */}
                                {article.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </article>

                        {/* Article Footer */}
                        <footer className="mt-12 pt-8 border-t border-gray-200">
                            <div className="bg-teal-50 rounded-lg p-6 border border-teal-100">
                                <h3 className="text-lg font-bold text-teal-900 mb-3">
                                    💡 Butuh Konsultasi Lebih Lanjut?
                                </h3>
                                <p className="text-teal-700 mb-4">
                                    Artikel ini memberikan informasi umum. Untuk kondisi spesifik, 
                                    konsultasikan dengan dokter gigi profesional kami.
                                </p>
                                <Link
                                    href="/testimonials/create"
                                    className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors duration-200"
                                >
                                    📞 Konsultasi Sekarang
                                </Link>
                            </div>
                        </footer>

                        {/* Share Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4 justify-center">
                            <p className="text-gray-600 font-medium self-center">Bagikan artikel ini:</p>
                            <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200">
                                📘 Facebook
                            </button>
                            <button className="flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors duration-200">
                                🐦 Twitter
                            </button>
                            <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors duration-200">
                                💬 WhatsApp
                            </button>
                            <button className="flex items-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm transition-colors duration-200">
                                💼 LinkedIn
                            </button>
                        </div>

                        {/* Related Articles */}
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                                📖 Artikel Terkait
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    {
                                        title: "Tips Menjaga Kebersihan Gigi Harian",
                                        excerpt: "Panduan lengkap merawat gigi setiap hari untuk kesehatan optimal.",
                                        icon: "🦷"
                                    },
                                    {
                                        title: "Makanan yang Baik untuk Kesehatan Gigi",
                                        excerpt: "Daftar makanan yang dapat memperkuat gigi dan menjaga kesehatan mulut.",
                                        icon: "🥗"
                                    },
                                    {
                                        title: "Cara Mengatasi Bau Mulut yang Persisten",
                                        excerpt: "Solusi efektif untuk mengatasi masalah bau mulut yang mengganggu.",
                                        icon: "🌿"
                                    }
                                ].map((related, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200"
                                    >
                                        <div className="text-center mb-4">
                                            <div className="text-3xl mb-2">{related.icon}</div>
                                            <h3 className="font-semibold text-gray-900 mb-2">{related.title}</h3>
                                            <p className="text-gray-600 text-sm">{related.excerpt}</p>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-teal-600 font-medium text-sm">
                                                Segera Tersedia
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="mt-12 text-center">
                            <Link
                                href="/blog"
                                className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
                            >
                                ← Kembali ke Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}