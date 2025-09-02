<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\Api\AppointmentController as ApiAppointmentController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page with clinic information
Route::get('/', [HomeController::class, 'index'])->name('home');

// API routes for AJAX requests
Route::prefix('api')->group(function () {
    Route::get('/appointments/available-slots', [ApiAppointmentController::class, 'index']);
});

// Appointment routes (requires authentication)
Route::middleware(['auth'])->group(function () {
    Route::resource('appointments', AppointmentController::class);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';