<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $services = [
            'Scaling' => [
                'description' => 'Pembersihan karang gigi profesional untuk menjaga kesehatan gusi dan gigi.',
                'benefits' => [
                    'Menghilangkan plak dan karang gigi',
                    'Mencegah penyakit gusi',
                    'Menjaga nafas tetap segar',
                    'Mempertahankan kesehatan mulut'
                ],
                'price' => 150000,
                'icon' => '🦷'
            ],
            'Tambal Gigi Estetik' => [
                'description' => 'Perawatan tambal gigi dengan bahan sewarna gigi untuk hasil yang natural.',
                'benefits' => [
                    'Hasil tambal yang natural',
                    'Tahan lama dan kuat',
                    'Tidak mengandung merkuri',
                    'Estetika yang baik'
                ],
                'price' => 250000,
                'icon' => '✨'
            ],
            'Perawatan Saluran Akar' => [
                'description' => 'Perawatan untuk menyelamatkan gigi yang sudah terinfeksi atau rusak parah.',
                'benefits' => [
                    'Menyelamatkan gigi asli',
                    'Menghilangkan nyeri',
                    'Mencegah infeksi lebih lanjut',
                    'Alternatif pencabutan gigi'
                ],
                'price' => 500000,
                'icon' => '🏥'
            ],
            'Veneer Gigi' => [
                'description' => 'Lapisan tipis porselen untuk memperbaiki bentuk dan warna gigi.',
                'benefits' => [
                    'Memperbaiki bentuk gigi',
                    'Memutihkan gigi secara permanen',
                    'Tahan lama hingga 15 tahun',
                    'Hasil yang natural'
                ],
                'price' => 2500000,
                'icon' => '💎'
            ],
            'Pemutihan Gigi' => [
                'description' => 'Prosedur pemutihan gigi profesional untuk senyum yang lebih cerah.',
                'benefits' => [
                    'Gigi lebih putih hingga 8 shade',
                    'Hasil cepat dan aman',
                    'Dilakukan oleh profesional',
                    'Boost kepercayaan diri'
                ],
                'price' => 1500000,
                'icon' => '⚡'
            ],
            'Implan Gigi' => [
                'description' => 'Penggantian gigi yang hilang dengan implan titanium yang permanen.',
                'benefits' => [
                    'Pengganti gigi permanen',
                    'Fungsi seperti gigi asli',
                    'Tidak mengganggu gigi lain',
                    'Tahan lama seumur hidup'
                ],
                'price' => 8000000,
                'icon' => '🔩'
            ],
            'Behel Gigi' => [
                'description' => 'Perawatan ortodontik untuk merapikan susunan gigi yang tidak rapi.',
                'benefits' => [
                    'Gigi lebih rapi dan sejajar',
                    'Memperbaiki fungsi kunyah',
                    'Meningkatkan kepercayaan diri',
                    'Mudah dibersihkan'
                ],
                'price' => 15000000,
                'icon' => '🎯'
            ]
        ];

        $serviceName = fake()->randomElement(array_keys($services));
        $serviceData = $services[$serviceName];

        return [
            'name' => $serviceName,
            'slug' => Str::slug($serviceName),
            'description' => $serviceData['description'],
            'benefits' => $serviceData['benefits'],
            'process' => 'Konsultasi → Pemeriksaan → Perawatan → Follow-up',
            'faq' => [
                [
                    'question' => 'Apakah perawatan ini sakit?',
                    'answer' => 'Perawatan dilakukan dengan anastesi lokal sehingga tidak terasa sakit.'
                ],
                [
                    'question' => 'Berapa lama prosedur ini?',
                    'answer' => 'Durasi perawatan bervariasi tergantung kompleksitas kasus, umumnya 30-60 menit.'
                ]
            ],
            'price_from' => $serviceData['price'],
            'icon' => $serviceData['icon'],
            'featured' => fake()->boolean(40),
            'order' => fake()->numberBetween(1, 10),
        ];
    }

    /**
     * Indicate that the service is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'featured' => true,
        ]);
    }
}