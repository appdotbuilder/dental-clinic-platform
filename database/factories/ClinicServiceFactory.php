<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClinicService>
 */
class ClinicServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $services = [
            'General Checkup' => 'Complete oral examination and cleaning',
            'Teeth Cleaning' => 'Professional dental cleaning and plaque removal',
            'Teeth Whitening' => 'Professional whitening treatment for brighter smile',
            'Dental Filling' => 'Cavity treatment and tooth restoration',
            'Root Canal' => 'Endodontic treatment for infected teeth',
            'Tooth Extraction' => 'Safe and painless tooth removal',
            'Dental Crown' => 'Custom crown placement for damaged teeth',
            'Dental Implant' => 'Permanent tooth replacement solution',
            'Orthodontics' => 'Braces and alignment treatment',
            'Emergency Care' => '24/7 dental emergency treatment',
        ];

        $serviceName = fake()->randomElement(array_keys($services));
        
        return [
            'name' => $serviceName,
            'description' => $services[$serviceName],
            'price' => fake()->randomFloat(2, 100000, 2000000), // Indonesian Rupiah
            'image' => null,
            'is_active' => fake()->boolean(90),
            'sort_order' => fake()->numberBetween(1, 10),
        ];
    }
}