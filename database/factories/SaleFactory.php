<?php

namespace Database\Factories;

use App\Models\Sale;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 100, 5000);
        $taxAmount = $subtotal * 0.05;
        $discountAmount = fake()->randomFloat(2, 0, $subtotal * 0.1);
        $totalAmount = $subtotal + $taxAmount - $discountAmount;
        
        return [
            'receipt_number' => Sale::generateReceiptNumber(),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount,
            'amount_paid' => $totalAmount,
            'change_given' => 0,
            'payment_method' => fake()->randomElement(['cash', 'card', 'mobile', 'insurance']),
            'notes' => fake()->optional(0.3)->sentence(),
            'patient_id' => fake()->boolean(70) ? Patient::factory() : null,
            'cashier_id' => User::factory(),
        ];
    }
}