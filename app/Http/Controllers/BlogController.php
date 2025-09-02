<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BlogArticle;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of published blog articles.
     */
    public function index()
    {
        $articles = BlogArticle::published()->paginate(12);
        
        return Inertia::render('blog/index', [
            'articles' => $articles
        ]);
    }

    /**
     * Display the specified blog article.
     */
    public function show(BlogArticle $article)
    {
        if (!$article->published) {
            abort(404);
        }
        
        return Inertia::render('blog/show', [
            'article' => $article
        ]);
    }
}