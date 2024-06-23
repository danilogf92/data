<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_id',
        'meter_id',
        'start_value',
        'end_value',
        'difference',
        'date'
    ];

    // Relación muchos a uno con Plant
    public function plant()
    {
        return $this->belongsTo(Plant::class, 'name_id');
    }

    // Relación muchos a uno con Meter
    public function meter()
    {
        return $this->belongsTo(Meter::class, 'meter_id');
    }
}
