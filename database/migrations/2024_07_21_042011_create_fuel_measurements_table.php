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
        Schema::create('fuel_measurements', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('fuel_equipment_id');
            $table->foreign('fuel_equipment_id')->references('id')->on('fuel_types')
                ->onDelete('cascade')->onUpdate('cascade');          
            
            $table->date('date');
            $table->integer('start_value');
            $table->integer('end_value');
            $table->integer('difference');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fuel_measurements');
    }
};
