<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of all services.
     */
    public function index()
    {
        $services = Service::orderBy('order')->get();
        
        return Inertia::render('services/index', [
            'services' => $services
        ]);
    }

    /**
     * Display the specified service.
     */
    public function show(Service $service)
    {
        return Inertia::render('services/show', [
            'service' => $service
        ]);
    }


}