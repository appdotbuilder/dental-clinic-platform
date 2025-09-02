<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ClinicGallery
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property string $image_path
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ClinicGallery newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClinicGallery newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ClinicGallery query()
 * @method static \Illuminate\Database\Eloquent\Builder|ClinicGallery active()
 * @method static \Database\Factories\ClinicGalleryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ClinicGallery extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'image_path',
        'sort_order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort_order' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active gallery items.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}