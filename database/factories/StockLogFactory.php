<?php

namespace Database\Factories;

use App\Models\StockLog;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StockLog>
 */
class StockLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = fake()->numberBetween(1, 100);
        $previousStock = fake()->numberBetween(0, 500);
        $type = fake()->randomElement(['purchase', 'sale', 'adjustment', 'expired', 'damaged']);
        
        // Adjust new stock based on type
        $newStock = match ($type) {
            'purchase', 'adjustment' => $previousStock + $quantity,
            'sale', 'expired', 'damaged' => max(0, $previousStock - $quantity),
            default => $previousStock,
        };
        
        return [
            'product_id' => Product::factory(),
            'type' => $type,
            'quantity' => $quantity,
            'previous_stock' => $previousStock,
            'new_stock' => $newStock,
            'unit_cost' => fake()->optional(0.7)->randomFloat(2, 10, 200),
            'notes' => fake()->optional(0.3)->sentence(),
            'reference' => fake()->optional(0.5)->bothify('REF-####-??'),
            'user_id' => User::factory(),
        ];
    }
}