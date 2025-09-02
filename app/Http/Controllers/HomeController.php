<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ClinicGallery;
use App\Models\ClinicService;
use App\Models\Doctor;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $doctors = Doctor::active()->get();
        $services = ClinicService::active()->orderBy('sort_order')->get();
        $gallery = ClinicGallery::active()->orderBy('sort_order')->limit(8)->get();

        return Inertia::render('welcome', [
            'doctors' => $doctors,
            'services' => $services,
            'gallery' => $gallery,
        ]);
    }
}