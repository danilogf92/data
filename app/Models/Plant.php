<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location'
    ];

    // Relación uno a muchos con Meter
    public function meters()
    {
        return $this->hasMany(Meter::class, 'plant_id');
    }

    // Relación uno a muchos con Measurement
    public function measurements()
    {
        return $this->hasMany(Measurement::class, 'name_id');
    }
}
