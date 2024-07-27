<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FuelEquipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'plant_id',
        'type_fuel_id'
    ];

    public function plant()
    {
        return $this->belongsTo(Plant::class, 'plant_id');
    }

    public function fuelType()
    {
        return $this->belongsTo(FuelType::class, 'type_fuel_id');
    }

    public function fuelMeasurements()
    {
        return $this->hasMany(FuelMeasurement::class, 'fuel_equipment_id');
    }
}
