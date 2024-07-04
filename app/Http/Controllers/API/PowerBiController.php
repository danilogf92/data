<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Measurement;
use Illuminate\Http\Request;

class PowerBiController extends Controller
{
    public function index()
    {
        $measurements = Measurement::all();

        return response()->json($measurements);
    }
}
