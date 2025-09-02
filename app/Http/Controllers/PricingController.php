<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;

class PricingController extends Controller
{
    /**
     * Display the pricing page.
     */
    public function index()
    {
        $services = Service::whereNotNull('price_from')->orderBy('order')->get();
        
        return Inertia::render('services/pricing', [
            'services' => $services
        ]);
    }
}