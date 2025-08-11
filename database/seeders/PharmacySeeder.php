<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Supplier;
use App\Models\Product;
use App\Models\Patient;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PharmacySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Dr. Admin',
            'email' => 'admin@pharmacare.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
        ]);

        // Create cashier user
        $cashier = User::create([
            'name' => 'John Cashier',
            'email' => 'cashier@pharmacare.com',
            'password' => Hash::make('password'),
            'role' => 'cashier',
            'is_active' => true,
        ]);

        // Create doctor user
        $doctor = User::create([
            'name' => 'Dr. Smith',
            'email' => 'doctor@pharmacare.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
            'is_active' => true,
        ]);

        // Create suppliers
        $suppliers = Supplier::factory(10)->create();

        // Create specific suppliers for common medicines
        $mainSuppliers = [
            ['name' => 'Pharma Plus Nigeria Ltd', 'contact_person' => 'Johnson Adebayo'],
            ['name' => 'MediCare Supplies', 'contact_person' => 'Sarah Williams'],
            ['name' => 'HealthTech Distributors', 'contact_person' => 'Ahmed Hassan'],
        ];

        foreach ($mainSuppliers as $supplierData) {
            Supplier::create([
                'name' => $supplierData['name'],
                'contact_person' => $supplierData['contact_person'],
                'phone' => fake()->phoneNumber(),
                'email' => fake()->companyEmail(),
                'address' => fake()->address(),
                'is_active' => true,
            ]);
        }

        // Create products with some having low stock
        Product::factory(50)->create();

        // Create some specific common medicines with realistic data
        $commonMedicines = [
            [
                'name' => 'Paracetamol',
                'generic_name' => 'Acetaminophen',
                'strength' => '500mg',
                'dosage_form' => 'Tablet',
                'selling_price' => 50.00,
                'current_stock' => 2, // Low stock
                'minimum_stock' => 10,
                'category' => 'medicine',
            ],
            [
                'name' => 'Ibuprofen',
                'generic_name' => 'Ibuprofen',
                'strength' => '400mg',
                'dosage_form' => 'Tablet',
                'selling_price' => 80.00,
                'current_stock' => 5, // Low stock
                'minimum_stock' => 15,
                'category' => 'medicine',
            ],
            [
                'name' => 'Amoxicillin',
                'generic_name' => 'Amoxicillin',
                'strength' => '500mg',
                'dosage_form' => 'Capsule',
                'selling_price' => 120.00,
                'current_stock' => 25,
                'minimum_stock' => 10,
                'category' => 'medicine',
                'requires_prescription' => true,
            ],
            [
                'name' => 'Digital Thermometer',
                'generic_name' => null,
                'strength' => null,
                'dosage_form' => null,
                'selling_price' => 1500.00,
                'current_stock' => 8,
                'minimum_stock' => 5,
                'category' => 'equipment',
            ],
        ];

        foreach ($commonMedicines as $medicine) {
            Product::create(array_merge($medicine, [
                'unit' => $medicine['category'] === 'medicine' ? 'strip' : 'piece',
                'purchase_price' => $medicine['selling_price'] * 0.6,
                'supplier_id' => Supplier::inRandomOrder()->first()->id,
                'is_active' => true,
            ]));
        }

        // Create patients
        Patient::factory(30)->create();

        // Create some sales with realistic data
        $products = Product::where('current_stock', '>', 0)->get();
        $patients = Patient::all();

        for ($i = 0; $i < 20; $i++) {
            $sale = Sale::create([
                'receipt_number' => Sale::generateReceiptNumber(),
                'subtotal' => 0,
                'tax_amount' => 0,
                'discount_amount' => 0,
                'total_amount' => 0,
                'amount_paid' => 0,
                'change_given' => 0,
                'payment_method' => fake()->randomElement(['cash', 'card', 'mobile']),
                'patient_id' => fake()->boolean(70) ? $patients->random()->id : null,
                'cashier_id' => $cashier->id,
                'created_at' => fake()->dateTimeBetween('-30 days', 'now'),
            ]);

            $subtotal = 0;
            $itemCount = fake()->numberBetween(1, 5);

            for ($j = 0; $j < $itemCount; $j++) {
                $product = $products->random();
                $quantity = fake()->numberBetween(1, 3);
                $unitPrice = $product->selling_price;
                $totalPrice = $quantity * $unitPrice;

                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                ]);

                $subtotal += $totalPrice;

                // Update product stock
                $product->current_stock = max(0, $product->current_stock - $quantity);
                $product->save();
            }

            $tax = $subtotal * 0.05; // 5% tax
            $total = $subtotal + $tax;

            $sale->update([
                'subtotal' => $subtotal,
                'tax_amount' => $tax,
                'total_amount' => $total,
                'amount_paid' => $total,
                'change_given' => 0,
            ]);
        }
    }
}