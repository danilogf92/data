<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fuel_equipment', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            $table->unsignedBigInteger('plant_id');
            $table->foreign('plant_id')->references('id')->on('plants')
                ->onDelete('cascade')->onUpdate('cascade');

            $table->unsignedBigInteger('type_fuel_id');
            $table->foreign('type_fuel_id')->references('id')->on('fuel_types')
                ->onDelete('cascade')->onUpdate('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fuel_equipment');
    }
};
