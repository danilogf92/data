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
        Schema::create('production_by_weights', function (Blueprint $table) {
            $table->id();
            $table->string('date');
            $table->float('net');
            $table->float('total_boxes');
            $table->float('pn_per_box');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('production_by_weights');
    }
};
