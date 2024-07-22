<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuelMeasurement extends Model
{
    use HasFactory;

    // Los campos que se pueden asignar masivamente
    protected $fillable = [
        'fuel_equipment_id',
        'date',
        'start_value',
        'end_value',
        'difference',
    ];

    // Relación con la tabla 'fuel_equipment'
    public function fuelEquipment()
    {
        return $this->belongsTo(FuelEquipment::class, 'fuel_equipment_id');
    }
}
