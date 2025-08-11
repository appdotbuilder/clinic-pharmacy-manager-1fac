<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StockLog
 *
 * @property int $id
 * @property int $product_id
 * @property string $type
 * @property int $quantity
 * @property int $previous_stock
 * @property int $new_stock
 * @property float|null $unit_cost
 * @property string|null $notes
 * @property string|null $reference
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog wherePreviousStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereNewStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereUnitCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereReference($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StockLog whereUpdatedAt($value)
 * @method static \Database\Factories\StockLogFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class StockLog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'type',
        'quantity',
        'previous_stock',
        'new_stock',
        'unit_cost',
        'notes',
        'reference',
        'user_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'previous_stock' => 'integer',
        'new_stock' => 'integer',
        'unit_cost' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the product for this stock log.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the user who created this stock log.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}