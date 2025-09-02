<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTestimonialRequest;
use App\Models\Testimonial;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    /**
     * Display a listing of approved testimonials.
     */
    public function index()
    {
        $testimonials = Testimonial::approved()->latest()->paginate(12);
        
        return Inertia::render('testimonials/index', [
            'testimonials' => $testimonials
        ]);
    }

    /**
     * Show the form for creating a new testimonial.
     */
    public function create()
    {
        return Inertia::render('testimonials/create');
    }

    /**
     * Store a newly created testimonial.
     */
    public function store(StoreTestimonialRequest $request)
    {
        Testimonial::create($request->validated());

        return redirect()->route('testimonials.create')
            ->with('success', 'Terima kasih! Testimoni Anda telah dikirim dan akan ditinjau oleh admin.');
    }
}