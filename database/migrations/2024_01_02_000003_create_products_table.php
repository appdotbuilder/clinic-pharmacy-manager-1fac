<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('generic_name')->nullable();
            $table->string('brand')->nullable();
            $table->string('barcode')->unique()->nullable();
            $table->enum('category', ['medicine', 'medical_supply', 'equipment', 'other'])->default('medicine');
            $table->string('dosage_form')->nullable()->comment('tablet, capsule, syrup, injection, etc.');
            $table->string('strength')->nullable()->comment('250mg, 500ml, etc.');
            $table->string('unit')->default('piece')->comment('piece, box, bottle, etc.');
            $table->decimal('purchase_price', 10, 2)->default(0);
            $table->decimal('selling_price', 10, 2);
            $table->integer('current_stock')->default(0);
            $table->integer('minimum_stock')->default(5);
            $table->date('expiry_date')->nullable();
            $table->string('batch_number')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('requires_prescription')->default(false);
            $table->boolean('is_active')->default(true);
            $table->foreignId('supplier_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
            
            $table->index('name');
            $table->index('barcode');
            $table->index('category');
            $table->index('current_stock');
            $table->index('minimum_stock');
            $table->index(['category', 'is_active']);
            $table->index(['current_stock', 'minimum_stock']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};