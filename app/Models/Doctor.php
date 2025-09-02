<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Doctor
 *
 * @property int $id
 * @property string $name
 * @property string $title
 * @property string $specialization
 * @property string|null $description
 * @property string|null $experience
 * @property string|null $education
 * @property string|null $schedule
 * @property string|null $photo
 * @property bool $featured
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor query()
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereEducation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereExperience($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereSchedule($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereSpecialization($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Doctor featured()
 * @method static \Database\Factories\DoctorFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Doctor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'title',
        'specialization',
        'description',
        'experience',
        'education',
        'schedule',
        'photo',
        'featured',
        'order',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'featured' => 'boolean',
        'order' => 'integer',
        'experience' => 'array',
        'education' => 'array',
        'schedule' => 'array',
    ];

    /**
     * Scope a query to only include featured doctors.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true)->orderBy('order');
    }
}