<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClinicGallery>
 */
class ClinicGalleryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $galleryItems = [
            'Modern Treatment Room',
            'Reception Area',
            'Waiting Lounge',
            'X-Ray Equipment',
            'Sterilization Room',
            'Consultation Room',
            'Emergency Treatment Area',
            'Children\'s Area',
        ];

        return [
            'title' => fake()->randomElement($galleryItems),
            'description' => fake()->sentence(),
            'image_path' => fake()->imageUrl(800, 600, 'medical'),
            'sort_order' => fake()->numberBetween(1, 10),
            'is_active' => fake()->boolean(95),
        ];
    }
}