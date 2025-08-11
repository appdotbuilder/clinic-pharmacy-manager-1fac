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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('receipt_number')->unique();
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->decimal('amount_paid', 10, 2);
            $table->decimal('change_given', 10, 2)->default(0);
            $table->enum('payment_method', ['cash', 'card', 'mobile', 'insurance'])->default('cash');
            $table->text('notes')->nullable();
            $table->string('prescription_file')->nullable();
            $table->foreignId('patient_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('cashier_id')->constrained('users');
            $table->timestamps();
            
            $table->index('receipt_number');
            $table->index('total_amount');
            $table->index('payment_method');
            $table->index('created_at');
            $table->index(['cashier_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};