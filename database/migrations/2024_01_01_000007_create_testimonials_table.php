<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('patient_name')->comment('Patient first name');
            $table->text('content')->comment('Testimonial content');
            $table->string('service_received')->comment('Service patient received');
            $table->string('photo')->nullable()->comment('Patient photo path');
            $table->integer('rating')->default(5)->comment('Rating out of 5');
            $table->boolean('approved')->default(false)->comment('Admin approval status');
            $table->boolean('featured')->default(false)->comment('Show on home page');
            $table->string('source')->default('website')->comment('Source of testimonial');
            $table->timestamps();
            
            $table->index('approved');
            $table->index(['approved', 'featured']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};