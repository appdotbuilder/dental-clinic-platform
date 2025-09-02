<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Inertia\Inertia;

class GalleryController extends Controller
{
    /**
     * Display the gallery.
     */
    public function index()
    {
        $galleryItems = GalleryItem::orderBy('category')->orderBy('order')->get();
        
        $categories = [
            'interior' => 'Interior & Clinic Facilities',
            'team' => 'Our Team',
            'before_after' => 'Before & After Treatment',
            'activities' => 'Activities & Education'
        ];
        
        return Inertia::render('gallery/index', [
            'galleryItems' => $galleryItems,
            'categories' => $categories
        ]);
    }
}