<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ClinicService
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property float|null $price
 * @property string|null $image
 * @property bool $is_active
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ClinicService newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClinicService newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClinicService query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClinicService active()
 * @method static \Database\Factories\ClinicServiceFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ClinicService extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
        'is_active',
        'sort_order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active services.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}