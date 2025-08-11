<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->optional(0.6)->safeEmail(),
            'date_of_birth' => fake()->dateTimeBetween('-80 years', '-1 year'),
            'gender' => fake()->randomElement(['male', 'female', 'other']),
            'address' => fake()->optional(0.7)->address(),
            'medical_history' => fake()->optional(0.3)->paragraph(),
            'allergies' => fake()->optional(0.2)->sentence(),
            'emergency_contact' => fake()->optional(0.8)->phoneNumber(),
            'insurance_info' => fake()->optional(0.4)->sentence(),
            'is_active' => fake()->boolean(95),
        ];
    }
}