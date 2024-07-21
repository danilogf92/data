<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Measurement;
use App\Models\Meter;
use App\Models\MeterType;
use App\Models\Plant;
use App\Models\ProductionByWeight;

class PowerBiController extends Controller
{
    public function measurements()
    {
        $measurements = Measurement::all();

        return response()->json($measurements);
    }

    public function meters()
    {
        $meters = Meter::all();

        return response()->json($meters);
    }

    public function metertypes()
    {
        $metertypes = MeterType::all();

        return response()->json($metertypes);
    }    

    public function plants()
    {
        $plants = Plant::all();

        return response()->json($plants);
    }     

    public function production()
    {
        $production = ProductionByWeight::all();

        return response()->json($production);
    }       
}
