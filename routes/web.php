<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PricingController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', [HomeController::class, 'index'])->name('home');

// Public routes for dental clinic
Route::controller(DoctorController::class)->group(function () {
    Route::get('/doctors', 'index')->name('doctors.index');
    Route::get('/doctors/{doctor}', 'show')->name('doctors.show');
});

Route::controller(ServiceController::class)->group(function () {
    Route::get('/services', 'index')->name('services.index');
    Route::get('/services/{service}', 'show')->name('services.show');
});

Route::get('/pricing', [PricingController::class, 'index'])->name('services.pricing');

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery.index');

Route::controller(BlogController::class)->group(function () {
    Route::get('/blog', 'index')->name('blog.index');
    Route::get('/blog/{article}', 'show')->name('blog.show');
});

Route::controller(TestimonialController::class)->group(function () {
    Route::get('/testimonials', 'index')->name('testimonials.index');
    Route::get('/testimonials/create', 'create')->name('testimonials.create');
    Route::post('/testimonials', 'store')->name('testimonials.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
