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
        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Image title');
            $table->string('image_path')->comment('Image file path');
            $table->string('category')->comment('Gallery category');
            $table->text('description')->nullable()->comment('Image description');
            $table->integer('order')->default(0)->comment('Display order');
            $table->timestamps();
            
            $table->index('category');
            $table->index(['category', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery_items');
    }
};