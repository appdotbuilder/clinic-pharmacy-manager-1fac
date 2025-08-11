<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Sale
 *
 * @property int $id
 * @property string $receipt_number
 * @property float $subtotal
 * @property float $tax_amount
 * @property float $discount_amount
 * @property float $total_amount
 * @property float $amount_paid
 * @property float $change_given
 * @property string $payment_method
 * @property string|null $notes
 * @property string|null $prescription_file
 * @property int|null $patient_id
 * @property int $cashier_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Patient|null $patient
 * @property-read \App\Models\User $cashier
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Sale newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sale newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sale query()
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereReceiptNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereTaxAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereDiscountAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereAmountPaid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereChangeGiven($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale wherePrescriptionFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale wherePatientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereCashierId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sale whereUpdatedAt($value)
 * @method static \Database\Factories\SaleFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Sale extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'receipt_number',
        'subtotal',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'amount_paid',
        'change_given',
        'payment_method',
        'notes',
        'prescription_file',
        'patient_id',
        'cashier_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'amount_paid' => 'decimal:2',
        'change_given' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Generate receipt number.
     */
    public static function generateReceiptNumber(): string
    {
        $prefix = 'RCP';
        $date = now()->format('Ymd');
        $count = self::whereDate('created_at', now())->count() + 1;
        
        return $prefix . $date . str_pad((string)$count, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Get the patient that owns this sale.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    /**
     * Get the cashier that made this sale.
     */
    public function cashier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cashier_id');
    }

    /**
     * Get sale items for this sale.
     */
    public function items(): HasMany
    {
        return $this->hasMany(SaleItem::class);
    }
}