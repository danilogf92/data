<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
  use HasFactory;

  protected $fillable = [
    'fechaEjecucion',
    'desde',
    'hasta',
    'inspectorSSA',
    'user_id',
    'plant_id',
    'area_machine_id',
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

  public function plant()
  {
    return $this->belongsTo(Plant::class);
  }

  public function areaMachine()
  {
    return $this->belongsTo(AreaMachines::class, 'area_machine_id');
  }

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  protected $casts = [
    'condiciones' => 'array',
  ];
}
