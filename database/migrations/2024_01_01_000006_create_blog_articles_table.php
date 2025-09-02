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
        Schema::create('blog_articles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Article title');
            $table->string('slug')->unique()->comment('URL slug');
            $table->text('content')->comment('Article content');
            $table->text('excerpt')->nullable()->comment('Short excerpt');
            $table->string('featured_image')->nullable()->comment('Featured image path');
            $table->boolean('published')->default(false)->comment('Publication status');
            $table->timestamp('published_at')->nullable()->comment('Publication date');
            $table->timestamps();
            
            $table->index('slug');
            $table->index('published');
            $table->index(['published', 'published_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_articles');
    }
};