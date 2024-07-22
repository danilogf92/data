<?php

namespace App\Http\Controllers;

use App\Http\Resources\FuelResource;
use App\Models\FuelEquipment;
use App\Models\FuelMeasurement;
use App\Models\Meter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FuelMeasurementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = FuelMeasurement::query();

        // Aplicar filtros
        if ($request->has('date') && $request->date) {
            $query->whereDate('date', $request->date);
        }

        if ($request->has('fuel_equipment_id') && $request->fuel_equipment_id) {
            $query->where('fuel_equipment_id', $request->fuel_equipment_id);
        }

        if ($request->has('rows') && $request->rows) {            
          $rowsPerPage = $request->input('rows', $request->rows );
        }else{
          $rowsPerPage = $request->input('rows', 5);
        }

        if ($rowsPerPage === 'all') {
            $fuelData = $query->orderBy('date', 'DESC')
                                  ->orderBy('fuel_equipment_id', 'ASC')
                                  ->get();
        } else {
            $fuelData = $query->orderBy('date', 'DESC')
                                  ->orderBy('fuel_equipment_id', 'ASC')
                                  ->paginate((int)$rowsPerPage);
        }

        $fuelEquipment = FuelEquipment::orderBy('name', 'ASC')->get();
        $meters = Meter::where('enabled', 1)
                      ->orderBy('id', 'ASC')
                      ->get();

        return inertia('Fuel/Index',[
            "fuelData" => FuelResource::collection($fuelData),
            "fuelEquipment" => $fuelEquipment,
            "meters" => $meters,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Auth::user()->getPermissionNames();
        
        if (!$permissions->contains('Create Water')) {
        abort(403, 'Unauthorized action.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
