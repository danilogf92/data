<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
  use HasFactory;

  // Especifica los campos que se pueden llenar masivamente
  protected $fillable = [
    'fechaEjecucion',
    'desde',
    'hasta',
    'inspectorSSA',
    'plant_id',
    'areaMaquina',
    'ejecutorTrabajo',
    'descripcionTrabajo',
    'condiciones',
    'TrabajosIncompatible',
    'RiesgosFactores',
    'TrabajosElectricos',
    'TrabajosDeSoldadura',
    'TrabajosEnAlturas',
    'Escalera',
    'Montacargas',
    'Andamios',
    'Techo',
    'TrabajosDentroCocinadores',
    'TrabajosTransportar',
    'TrabajosLevantarObjetos',
  ];

  // Define la relación con Plant
  public function plant()
  {
    return $this->belongsTo(Plant::class);
  }

  // Define los casts para el campo JSON
  protected $casts = [
    'condiciones' => 'array',
  ];
}
