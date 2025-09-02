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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Service name');
            $table->string('slug')->unique()->comment('URL slug');
            $table->text('description')->comment('Detailed service description');
            $table->text('benefits')->nullable()->comment('Service benefits as JSON');
            $table->text('process')->nullable()->comment('Process overview');
            $table->text('faq')->nullable()->comment('FAQ as JSON');
            $table->decimal('price_from', 10, 2)->nullable()->comment('Starting price in IDR');
            $table->string('icon')->nullable()->comment('Service icon');
            $table->boolean('featured')->default(false)->comment('Show on home page');
            $table->integer('order')->default(0)->comment('Display order');
            $table->timestamps();
            
            $table->index('slug');
            $table->index('featured');
            $table->index(['featured', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};