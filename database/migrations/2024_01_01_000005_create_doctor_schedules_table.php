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
        Schema::create('doctor_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->integer('day_of_week'); // 1-7 (Monday-Sunday)
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('slot_duration')->default(30); // in minutes
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['doctor_id', 'day_of_week']);
            $table->index('is_active');
            $table->unique(['doctor_id', 'day_of_week', 'start_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctor_schedules');
    }
};