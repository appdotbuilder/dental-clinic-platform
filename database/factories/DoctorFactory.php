<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $specializations = [
            'Ortodontis',
            'Dokter Gigi Anak',
            'Bedah Mulut',
            'Konservasi Gigi',
            'Prostodontis',
            'Periodontis'
        ];

        return [
            'name' => fake()->name(),
            'title' => 'Dr.',
            'specialization' => fake()->randomElement($specializations),
            'description' => fake()->paragraph(3),
            'experience' => [
                fake()->company() . ' - ' . fake()->jobTitle() . ' (2018-2021)',
                fake()->company() . ' - ' . fake()->jobTitle() . ' (2021-sekarang)'
            ],
            'education' => [
                'S1 Kedokteran Gigi - ' . fake()->randomElement(['UI', 'UGM', 'UNAIR', 'UNPAD']),
                'Spesialis ' . fake()->randomElement($specializations) . ' - ' . fake()->randomElement(['UI', 'UGM'])
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
            'featured' => fake()->boolean(30),
            'order' => fake()->numberBetween(1, 10),
        ];
    }

    /**
     * Indicate that the doctor is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'featured' => true,
        ]);
    }
}