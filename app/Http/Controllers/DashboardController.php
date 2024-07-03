<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Measurement;
use App\Models\Meter;
use App\Models\MeterType;
use App\Models\Plant;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $summary = Measurement::selectRaw('plant_id, SUM(difference) as total_difference')
            ->with('plant')
            ->groupBy('plant_id')
            ->get();

// $summary2 = Measurement::selectRaw('meters.id as meter_id, meter_types.id as meter_type_id, SUM(measurements.difference) as total_difference')
//     ->join('meters', 'measurements.meter_id', '=', 'meters.id')
//     ->join('meter_types', 'meters.type_id', '=', 'meter_types.id')
//     ->groupBy('meters.id', 'meter_types.id')
//     ->get();

        $lastYear = Measurement::orderBy('date', 'desc')
            ->value(DB::raw('YEAR(date)'));

        $lastMonth = Measurement::whereYear('date', $lastYear)
            ->orderBy('date', 'desc')
            ->value(DB::raw('MONTH(date)'));

        // Obtener las mediciones por mes del último año con el nombre del mes
        $measurementsByMonth  = Measurement::selectRaw('YEAR(date) as year, MONTH(date) as month, MONTHNAME(date) as month_name, SUM(difference) as total_difference')
            ->whereYear('date', $lastYear)
            ->groupBy('year', 'month', 'month_name')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'asc')
            ->get();
            
      $chartData = $measurementsByMonth->map(function ($item) {
            return [
                'name' => $item->month_name,
                'Consumption by month m³' => (int) $item->total_difference,
            ];
        });

$lastMonthData = Measurement::selectRaw('plant_id, DAY(date) as day, SUM(difference) as total_difference')
    ->whereYear('date', $lastYear)
    ->whereMonth('date', $lastMonth)
    ->groupBy('plant_id', 'day')
    ->orderBy('day', 'asc')
    ->get();

$dataByDay = [];

foreach ($lastMonthData as $measurement) {
    $plantId = $measurement->plant_id;
    $day = $measurement->day;
    $totalDifference = (int) $measurement->total_difference;

    // Construir la clave de fecha en el formato deseado (por ejemplo, 'Jan 22')
    $dateKey = date('M d', mktime(0, 0, 0, $lastMonth, $day));

    // Obtener el nombre de la planta según plant_id
    $plantName = $plantId == 1 ? 'Ciesa 1' : 'Ciesa 2';

    // Agregar datos por día y por nombre de planta
    if (!isset($dataByDay[$dateKey])) {
        $dataByDay[$dateKey] = [
            'date' => $dateKey,
        ];
    }

    // Asignar el total_difference al nombre de planta correspondiente
    $dataByDay[$dateKey][$plantName] = $totalDifference;
}

// Convertir el array asociativo en un array numérico para mantener el orden
$result = array_values($dataByDay);

        return Inertia::render('Dashboard', [
            'summary' => $summary,
            'summary2' => $measurementsByMonth,
            'chartData' => $chartData,
            'lastMonthData' => $result,
        ]);
    }
}
