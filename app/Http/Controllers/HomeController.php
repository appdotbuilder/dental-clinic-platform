<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\Service;
use App\Models\Testimonial;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $featuredServices = Service::featured()->take(4)->get();
        $featuredDoctors = Doctor::featured()->take(3)->get();
        $featuredTestimonials = Testimonial::featured()->take(6)->get();
        
        return Inertia::render('welcome', [
            'featuredServices' => $featuredServices,
            'featuredDoctors' => $featuredDoctors,
            'featuredTestimonials' => $featuredTestimonials,
        ]);
    }
}