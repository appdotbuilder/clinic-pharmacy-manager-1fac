<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $medicines = [
            ['name' => 'Paracetamol', 'generic' => 'Acetaminophen', 'strength' => '500mg', 'form' => 'Tablet'],
            ['name' => 'Ibuprofen', 'generic' => 'Ibuprofen', 'strength' => '200mg', 'form' => 'Tablet'],
            ['name' => 'Amoxicillin', 'generic' => 'Amoxicillin', 'strength' => '500mg', 'form' => 'Capsule'],
            ['name' => 'Vitamin C', 'generic' => 'Ascorbic Acid', 'strength' => '1000mg', 'form' => 'Tablet'],
            ['name' => 'Cough Syrup', 'generic' => 'Dextromethorphan', 'strength' => '15mg/5ml', 'form' => 'Syrup'],
            ['name' => 'Aspirin', 'generic' => 'Acetylsalicylic Acid', 'strength' => '75mg', 'form' => 'Tablet'],
            ['name' => 'Multivitamin', 'generic' => 'Multivitamin', 'strength' => null, 'form' => 'Tablet'],
            ['name' => 'Antacid', 'generic' => 'Calcium Carbonate', 'strength' => '500mg', 'form' => 'Tablet'],
        ];
        
        $supplies = [
            ['name' => 'Bandages', 'generic' => null, 'strength' => null, 'form' => null],
            ['name' => 'Cotton Wool', 'generic' => null, 'strength' => null, 'form' => null],
            ['name' => 'Surgical Gloves', 'generic' => null, 'strength' => null, 'form' => null],
            ['name' => 'Thermometer', 'generic' => null, 'strength' => null, 'form' => null],
            ['name' => 'Face Mask', 'generic' => null, 'strength' => null, 'form' => null],
            ['name' => 'Syringe 5ml', 'generic' => null, 'strength' => null, 'form' => null],
        ];
        
        $category = fake()->randomElement(['medicine', 'medical_supply', 'equipment', 'other']);
        
        if ($category === 'medicine') {
            $item = fake()->randomElement($medicines);
        } else {
            $item = fake()->randomElement($supplies);
        }
        
        $purchasePrice = fake()->randomFloat(2, 10, 1000);
        $sellingPrice = $purchasePrice * fake()->randomFloat(2, 1.2, 2.5);
        $currentStock = fake()->numberBetween(0, 200);
        $minimumStock = fake()->numberBetween(5, 25);
        
        return [
            'name' => $item['name'],
            'generic_name' => $item['generic'],
            'brand' => fake()->optional(0.6)->company(),
            'barcode' => fake()->optional(0.7)->ean13(),
            'category' => $category,
            'dosage_form' => $item['form'],
            'strength' => $item['strength'],
            'unit' => fake()->randomElement(['piece', 'box', 'bottle', 'pack', 'strip']),
            'purchase_price' => $purchasePrice,
            'selling_price' => $sellingPrice,
            'current_stock' => $currentStock,
            'minimum_stock' => $minimumStock,
            'expiry_date' => fake()->optional(0.8)->dateTimeBetween('+1 month', '+2 years'),
            'batch_number' => fake()->optional(0.6)->bothify('BATCH-####-??'),
            'description' => fake()->optional(0.4)->sentence(),
            'requires_prescription' => $category === 'medicine' ? fake()->boolean(30) : false,
            'is_active' => fake()->boolean(90),
            'supplier_id' => Supplier::factory(),
        ];
    }
}