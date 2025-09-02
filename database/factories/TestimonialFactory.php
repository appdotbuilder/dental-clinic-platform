<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $services = [
            'Scaling',
            'Tambal Gigi Estetik',
            'Perawatan Saluran Akar',
            'Veneer Gigi',
            'Pemutihan Gigi',
            'Implan Gigi',
            'Behel Gigi'
        ];

        $testimonials = [
            'Pelayanan sangat memuaskan! Dokter dan staffnya ramah, kliniknya juga bersih dan nyaman.',
            'Proses perawatan tidak sakit sama sekali. Hasilnya juga sangat bagus, sangat puas!',
            'Klinik ini recommended banget! Dokternya profesional dan menjelaskan dengan detail.',
            'Fasilitas lengkap dan modern. Dokternya sabar menjelaskan setiap prosedur.',
            'Hasil perawatan sangat memuaskan. Senyum saya jadi lebih percaya diri!',
            'Staff yang ramah dan pelayanan yang cepat. Tidak perlu menunggu lama.',
            'Dokternya sangat ahli dan berpengalaman. Pasti akan kembali lagi untuk perawatan selanjutnya.'
        ];

        return [
            'patient_name' => fake()->firstName(),
            'content' => fake()->randomElement($testimonials),
            'service_received' => fake()->randomElement($services),
            'rating' => fake()->numberBetween(4, 5),
            'approved' => fake()->boolean(80),
            'featured' => fake()->boolean(20),
            'source' => fake()->randomElement(['website', 'google', 'whatsapp']),
        ];
    }

    /**
     * Indicate that the testimonial is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'approved' => true,
        ]);
    }

    /**
     * Indicate that the testimonial is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'featured' => true,
            'approved' => true,
        ]);
    }
}