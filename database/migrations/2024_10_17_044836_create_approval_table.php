<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('approvals', function (Blueprint $table) {
      $table->id(); // ID autoincrementable
      $table->date('fechaEjecucion')->nullable(); // Campo de fecha
      $table->string('desde'); // Campo de hora de inicio
      $table->string('hasta'); // Campo de hora de finalización
      $table->string('inspectorSSA'); // Inspector
      $table->string('plant')->nullable(); // Planta
      $table->string('areaMaquina')->nullable(); // Área de máquina
      $table->string('ejecutorTrabajo')->nullable(); // Ejecutor de trabajo
      $table->text('descripcionTrabajo')->nullable(); // Descripción del trabajo
      $table->json('condiciones'); // Condiciones en formato JSON
      $table->text('TrabajosIncompatible')->nullable(); // Trabajos incompatibles
      $table->text('RiesgosFactores')->nullable(); // Riesgos y factores
      $table->string('TrabajosElectricos')->default('NO'); // Trabajos eléctricos
      $table->string('TrabajosDeSoldadura')->default('NO'); // Trabajos de soldadura
      $table->string('TrabajosEnAlturas')->default('NO'); // Trabajos en alturas
      $table->string('TrabajosDentroCocinadores')->default('NO'); // Trabajos dentro de cocinadores
      $table->string('TrabajosTransportar')->default('NO'); // Trabajos de transporte
      $table->string('TrabajosLevantarObjetos')->default('NO'); // Trabajos de levantamiento de objetos
      $table->timestamps(); // Campos de timestamps
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('approvals'); // Elimina la tabla si existe
  }
};
