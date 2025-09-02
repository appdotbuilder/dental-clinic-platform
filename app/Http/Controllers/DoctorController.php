<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Inertia\Inertia;

class DoctorController extends Controller
{
    /**
     * Display a listing of all doctors.
     */
    public function index()
    {
        $doctors = Doctor::orderBy('order')->get();
        
        return Inertia::render('doctors/index', [
            'doctors' => $doctors
        ]);
    }

    /**
     * Display the specified doctor.
     */
    public function show(Doctor $doctor)
    {
        return Inertia::render('doctors/show', [
            'doctor' => $doctor
        ]);
    }
}