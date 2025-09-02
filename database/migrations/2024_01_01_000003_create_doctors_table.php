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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Doctor full name');
            $table->string('title')->comment('Professional title (Dr.)');
            $table->string('specialization')->comment('Medical specialization');
            $table->text('description')->nullable()->comment('Doctor description or philosophy');
            $table->text('experience')->nullable()->comment('Work experience as JSON');
            $table->text('education')->nullable()->comment('Educational background as JSON');
            $table->text('schedule')->nullable()->comment('Weekly practice schedule as JSON');
            $table->string('photo')->nullable()->comment('Profile photo path');
            $table->boolean('featured')->default(false)->comment('Show on home page');
            $table->integer('order')->default(0)->comment('Display order');
            $table->timestamps();
            
            $table->index('featured');
            $table->index(['featured', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};