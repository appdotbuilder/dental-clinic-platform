<?php

namespace Database\Seeders;

use App\Models\BlogArticle;
use App\Models\Doctor;
use App\Models\GalleryItem;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class DentalClinicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create featured services
        $services = [
            [
                'name' => 'Pemutihan Gigi',
                'slug' => 'pemutihan-gigi',
                'description' => 'Prosedur pemutihan gigi profesional untuk senyum yang lebih cerah dan memukau.',
                'benefits' => [
                    'Gigi lebih putih hingga 8 shade',
                    'Hasil cepat dan aman',
                    'Dilakukan oleh profesional',
                    'Boost kepercayaan diri'
                ],
                'process' => 'Konsultasi → Pemeriksaan → Aplikasi gel pemutih → Aktivasi dengan laser → Evaluasi hasil',
                'faq' => [
                    [
                        'question' => 'Apakah pemutihan gigi aman?',
                        'answer' => 'Ya, pemutihan gigi di klinik kami menggunakan bahan yang aman dan telah teruji klinis.'
                    ],
                    [
                        'question' => 'Berapa lama hasilnya bertahan?',
                        'answer' => 'Hasil pemutihan dapat bertahan 1-3 tahun tergantung kebiasaan makan dan minum.'
                    ]
                ],
                'price_from' => 1500000,
                'icon' => '⚡',
                'featured' => true,
                'order' => 1
            ],
            [
                'name' => 'Behel Gigi',
                'slug' => 'behel-gigi',
                'description' => 'Perawatan ortodontik untuk merapikan susunan gigi yang tidak rapi dengan teknologi terkini.',
                'benefits' => [
                    'Gigi lebih rapi dan sejajar',
                    'Memperbaiki fungsi kunyah',
                    'Meningkatkan kepercayaan diri',
                    'Mudah dibersihkan setelah perawatan'
                ],
                'process' => 'Konsultasi → Rontgen & cetak gigi → Pemasangan behel → Kontrol rutin → Pelepasan behel',
                'faq' => [
                    [
                        'question' => 'Berapa lama perawatan behel?',
                        'answer' => 'Durasi perawatan bervariasi antara 1-3 tahun tergantung tingkat keparahan kasus.'
                    ],
                    [
                        'question' => 'Apakah pakai behel sakit?',
                        'answer' => 'Mungkin ada ketidaknyamanan di awal, tetapi akan berkurang dalam beberapa hari.'
                    ]
                ],
                'price_from' => 15000000,
                'icon' => '🎯',
                'featured' => true,
                'order' => 2
            ],
            [
                'name' => 'Implan Gigi',
                'slug' => 'implan-gigi',
                'description' => 'Penggantian gigi yang hilang dengan implan titanium yang permanen dan berkualitas tinggi.',
                'benefits' => [
                    'Pengganti gigi permanen',
                    'Fungsi seperti gigi asli',
                    'Tidak mengganggu gigi lain',
                    'Tahan lama seumur hidup'
                ],
                'process' => 'Konsultasi → CT Scan → Pemasangan implan → Masa penyembuhan → Pemasangan mahkota',
                'faq' => [
                    [
                        'question' => 'Apakah semua orang bisa pasang implan?',
                        'answer' => 'Sebagian besar orang dewasa dengan tulang rahang yang cukup dapat memasang implan.'
                    ],
                    [
                        'question' => 'Berapa success rate implan gigi?',
                        'answer' => 'Success rate implan gigi mencapai 95-98% dengan perawatan yang tepat.'
                    ]
                ],
                'price_from' => 8000000,
                'icon' => '🔩',
                'featured' => true,
                'order' => 3
            ],
            [
                'name' => 'Veneer Gigi',
                'slug' => 'veneer-gigi',
                'description' => 'Lapisan tipis porselen untuk memperbaiki bentuk dan warna gigi secara permanen.',
                'benefits' => [
                    'Memperbaiki bentuk gigi',
                    'Memutihkan gigi secara permanen',
                    'Tahan lama hingga 15 tahun',
                    'Hasil yang sangat natural'
                ],
                'process' => 'Konsultasi → Preparasi gigi → Cetak gigi → Pemasangan veneer sementara → Pemasangan veneer permanen',
                'faq' => [
                    [
                        'question' => 'Apakah veneer bisa lepas?',
                        'answer' => 'Veneer yang dipasang dengan baik sangat jarang lepas dan dapat bertahan bertahun-tahun.'
                    ],
                    [
                        'question' => 'Berapa lama proses pembuatan veneer?',
                        'answer' => 'Proses pembuatan veneer membutuhkan waktu 1-2 minggu dari persiapan hingga pemasangan.'
                    ]
                ],
                'price_from' => 2500000,
                'icon' => '💎',
                'featured' => true,
                'order' => 4
            ]
        ];

        foreach ($services as $serviceData) {
            Service::create($serviceData);
        }

        // Create additional services
        Service::factory(6)->create();

        // Create featured doctors
        $doctors = [
            [
                'name' => 'Dr. Sarah Wijaya, Sp.KG',
                'title' => 'Dr.',
                'specialization' => 'Konservasi Gigi',
                'description' => 'Dokter Sarah memiliki passion dalam perawatan konservasi gigi dan estetik dental. Dengan pengalaman lebih dari 8 tahun, beliau berkomitmen memberikan perawatan terbaik dengan pendekatan yang ramah dan professional.',
                'experience' => [
                    'RS Mitra Keluarga - Dokter Gigi (2016-2019)',
                    'Klinik Dental Smile - Dokter Spesialis (2019-sekarang)',
                    'Private Practice - Konsultan Estetik Dental (2020-sekarang)'
                ],
                'education' => [
                    'S1 Kedokteran Gigi - Universitas Indonesia (2015)',
                    'Sp. Konservasi Gigi - Universitas Indonesia (2018)'
                ],
                'schedule' => [
                    'senin' => '09:00-17:00',
                    'selasa' => '09:00-17:00',
                    'rabu' => '09:00-17:00',
                    'kamis' => '09:00-17:00',
                    'jumat' => '09:00-17:00',
                    'sabtu' => '09:00-14:00',
                    'minggu' => 'Libur'
                ],
                'featured' => true,
                'order' => 1
            ],
            [
                'name' => 'Dr. Michael Chen, Sp.Ort',
                'title' => 'Dr.',
                'specialization' => 'Ortodontis',
                'description' => 'Dokter Michael adalah spesialis ortodontis yang ahli dalam perawatan behel dan perapihan gigi. Dengan teknologi terkini dan pendekatan yang personal, beliau membantu pasien mendapatkan senyum yang sempurna.',
                'experience' => [
                    'RS Siloam - Orthodontist (2017-2020)',
                    'Smile Orthodontic Center - Senior Orthodontist (2020-sekarang)'
                ],
                'education' => [
                    'S1 Kedokteran Gigi - Universitas Gadjah Mada (2016)',
                    'Sp. Ortodontia - Universitas Gadjah Mada (2019)'
                ],
                'schedule' => [
                    'senin' => '10:00-18:00',
                    'selasa' => '10:00-18:00',
                    'rabu' => 'Libur',
                    'kamis' => '10:00-18:00',
                    'jumat' => '10:00-18:00',
                    'sabtu' => '08:00-15:00',
                    'minggu' => 'Libur'
                ],
                'featured' => true,
                'order' => 2
            ],
            [
                'name' => 'Dr. Lisa Handayani, Sp.BM',
                'title' => 'Dr.',
                'specialization' => 'Bedah Mulut',
                'description' => 'Dokter Lisa adalah spesialis bedah mulut yang berpengalaman dalam berbagai prosedur bedah dental termasuk implan gigi dan operasi gigi bungsu. Beliau dikenal dengan teknik yang minim invasif dan recovery yang cepat.',
                'experience' => [
                    'RSCM - Resident Bedah Mulut (2018-2021)',
                    'Jakarta Dental Surgery - Senior Surgeon (2021-sekarang)'
                ],
                'education' => [
                    'S1 Kedokteran Gigi - Universitas Airlangga (2017)',
                    'Sp. Bedah Mulut - Universitas Indonesia (2021)'
                ],
                'schedule' => [
                    'senin' => '08:00-16:00',
                    'selasa' => '08:00-16:00',
                    'rabu' => '08:00-16:00',
                    'kamis' => 'Libur',
                    'jumat' => '08:00-16:00',
                    'sabtu' => '08:00-12:00',
                    'minggu' => 'Libur'
                ],
                'featured' => true,
                'order' => 3
            ]
        ];

        foreach ($doctors as $doctorData) {
            Doctor::create($doctorData);
        }

        // Create additional doctors
        Doctor::factory(4)->create();

        // Create featured testimonials
        $testimonials = [
            [
                'patient_name' => 'Rina',
                'content' => 'Pelayanan di klinik ini luar biasa! Dr. Sarah sangat ramah dan menjelaskan setiap prosedur dengan detail. Hasil veneer gigi saya sangat memuaskan, terlihat natural dan gigi jadi lebih putih. Highly recommended!',
                'service_received' => 'Veneer Gigi',
                'rating' => 5,
                'approved' => true,
                'featured' => true,
                'source' => 'website'
            ],
            [
                'patient_name' => 'Andi',
                'content' => 'Proses pemasangan behel di Dr. Michael sangat profesional. Dokternya sabar menjelaskan dan tidak sakit sama sekali. Setelah 18 bulan, gigi saya sudah rapi dan senyum jadi lebih percaya diri!',
                'service_received' => 'Behel Gigi',
                'rating' => 5,
                'approved' => true,
                'featured' => true,
                'source' => 'google'
            ],
            [
                'patient_name' => 'Maya',
                'content' => 'Implan gigi di Dr. Lisa hasilnya sangat bagus! Prosedurnya tidak sesakit yang dibayangkan dan recovery-nya cepat. Sekarang bisa makan dengan nyaman lagi. Terima kasih dokter!',
                'service_received' => 'Implan Gigi',
                'rating' => 5,
                'approved' => true,
                'featured' => true,
                'source' => 'website'
            ],
            [
                'patient_name' => 'Budi',
                'content' => 'Pemutihan gigi di sini hasilnya amazing! Gigi langsung putih bersih dalam sekali treatment. Staff-nya ramah dan kliniknya bersih. Pasti akan balik lagi untuk perawatan selanjutnya.',
                'service_received' => 'Pemutihan Gigi',
                'rating' => 5,
                'approved' => true,
                'featured' => true,
                'source' => 'whatsapp'
            ]
        ];

        foreach ($testimonials as $testimonialData) {
            Testimonial::create($testimonialData);
        }

        // Create additional testimonials
        Testimonial::factory(15)->approved()->create();

        // Create blog articles
        BlogArticle::factory(8)->published()->create();

        // Create gallery items
        GalleryItem::factory(20)->create();
    }
}