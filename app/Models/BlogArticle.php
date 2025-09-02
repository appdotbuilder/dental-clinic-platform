<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BlogArticle
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $content
 * @property string|null $excerpt
 * @property string|null $featured_image
 * @property bool $published
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle query()
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle whereExcerpt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle whereFeaturedImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle wherePublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|BlogArticle published()
 * @method static \Database\Factories\BlogArticleFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class BlogArticle extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'published',
        'published_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'published' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Scope a query to only include published articles.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('published', true)->orderBy('published_at', 'desc');
    }
}