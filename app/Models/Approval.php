<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
  use HasFactory;

  // Especifica la tabla si no sigue la convención
  protected $table = 'approvals';

  // Especifica los campos que pueden ser llenados masivamente
  protected $fillable = [
    'fechaEjecucion',
    'desde',
    'hasta',
    'inspectorSSA',
    'plant',
    'areaMaquina',
    'ejecutorTrabajo',
    'descripcionTrabajo',
    'condiciones',
    'TrabajosIncompatible',
    'RiesgosFactores',
    'TrabajosElectricos',
    'TrabajosDeSoldadura',
    'TrabajosEnAlturas',
    'TrabajosDentroCocinadores',
    'TrabajosTransportar',
    'TrabajosLevantarObjetos',
  ];

  // Opcional: define atributos para los campos JSON
  protected $casts = [
    'condiciones' => 'array', // Esto convierte el campo JSON a un array automáticamente
  ];
}
