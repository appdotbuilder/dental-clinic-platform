<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GalleryItem>
 */
class GalleryItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['interior', 'team', 'before_after', 'activities'];
        $category = fake()->randomElement($categories);

        $titles = [
            'interior' => [
                'Ruang Tunggu yang Nyaman',
                'Ruang Praktek Modern',
                'Peralatan Dental Terbaru',
                'Area Sterilisasi'
            ],
            'team' => [
                'Tim Dokter Berpengalaman',
                'Staff yang Ramah',
                'Pelatihan Tim Medis',
                'Rapat Tim Mingguan'
            ],
            'before_after' => [
                'Hasil Veneer Gigi',
                'Pemutihan Gigi Sebelum Sesudah',
                'Perbaikan Gigi dengan Behel',
                'Restorasi Gigi Berlubang'
            ],
            'activities' => [
                'Penyuluhan Kesehatan Gigi',
                'Seminar Kedokteran Gigi',
                'Bakti Sosial Kesehatan',
                'Workshop Tim Medis'
            ]
        ];

        return [
            'title' => fake()->randomElement($titles[$category]),
            'image_path' => 'gallery/' . fake()->uuid() . '.jpg',
            'category' => $category,
            'description' => fake()->sentence(),
            'order' => fake()->numberBetween(1, 10),
        ];
    }
}