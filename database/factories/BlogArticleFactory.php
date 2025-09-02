<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BlogArticle>
 */
class BlogArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            '5 Cara Mudah Merawat Gigi Sensitif',
            'Kapan Waktu yang Tepat untuk Anak Pakai Behel?',
            'Mitos dan Fakta tentang Pemutihan Gigi',
            'Manfaat Scaling Gigi yang Perlu Anda Ketahui',
            'Tips Menjaga Kesehatan Gigi Selama Puasa',
            'Perbedaan Tambal Gigi Amalgam dan Komposit',
            'Cara Mencegah Gigi Berlubang pada Anak',
            'Pentingnya Pemeriksaan Gigi Rutin'
        ];

        $title = fake()->randomElement($titles);
        $slug = Str::slug($title);

        return [
            'title' => $title,
            'slug' => $slug,
            'content' => fake()->paragraphs(8, true),
            'excerpt' => fake()->paragraph(2),
            'published' => fake()->boolean(80),
            'published_at' => fake()->dateTimeBetween('-3 months', 'now'),
        ];
    }

    /**
     * Indicate that the article is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'published' => true,
            'published_at' => fake()->dateTimeBetween('-3 months', 'now'),
        ]);
    }
}