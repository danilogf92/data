<?php

namespace App\Http\Controllers;

use App\Exports\FuelExport;
use App\Http\Requests\StoreFuelMeasurementRequest;
use App\Http\Requests\UpdateFuelMeasurementRequest;
use App\Http\Resources\FuelResource;
use App\Models\FuelEquipment;
use App\Models\Fuel;
use App\Models\Plant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class FuelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Fuel::query();

        // Aplicar filtros
        if ($request->has('date') && $request->date) {
            $query->whereDate('date', $request->date);
        }

        if ($request->has('fuel_equipment_id') && $request->fuel_equipment_id) {
            $query->where('fuel_equipment_id', $request->fuel_equipment_id);
        }

        if ($request->has('plant_id') && $request->plant_id) {
            $query->where('plant_id', $request->plant_id);
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
        $plants = Plant::orderBy('name', 'ASC')->get();

        return inertia('Fuel/Index',[
            "fuelData" => FuelResource::collection($fuelData),
            "fuelEquipment" => $fuelEquipment,
            'queryParams' => request()->query() ?: null,
            'plants' => $plants,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $permissions = Auth::user()->getPermissionNames();
        
        if (!$permissions->contains('Create Fuel')) {
        abort(403, 'Unauthorized action.');
        }

        $plants = Plant::orderBy('name', 'ASC')->get();
        $fuelEquipment = FuelEquipment::orderBy('name', 'ASC')->get();

        return inertia('Fuel/Create', [
        "plants" => $plants,
        "fuelEquipment" => $fuelEquipment
        ]);        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFuelMeasurementRequest $request)
    {
        $permissions = Auth::user()->getPermissionNames();

        if (!$permissions->contains('Create Fuel')) {
        abort(403, 'Unauthorized action.');
        }

        $data = $request->validated();
        Fuel::create($data);
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
    public function edit(Fuel $fuel)
    {
        $permissions = Auth::user()->getPermissionNames();

        if (!$permissions->contains('Edit Fuel')) {
        abort(403, 'Unauthorized action.');
        }
        
        $plants = Plant::orderBy('name', 'ASC')->get();
        $fuelEquipment = FuelEquipment::orderBy('name', 'ASC')->get();

        return inertia('Fuel/Edit', [
        "plants" => $plants,
        "fuelEquipment" => $fuelEquipment,
        "fuel" => $fuel
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFuelMeasurementRequest $request, Fuel $fuel)
    {
        $permissions = Auth::user()->getPermissionNames();
        
        if (!$permissions->contains('Edit Fuel')) {
            abort(403, 'Unauthorized action.');
        }

        $data = $request->validated();
        $fuel->update($data);

        return redirect()->route('fuel.index')->with('success', 'Fuel updated successfully.');
    }   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fuel $fuel)
    {
        $permissions = Auth::user()->getPermissionNames();

        if (!$permissions->contains('Delete Fuel')) {
            abort(403, 'Unauthorized action.');
        }

        $fuel->delete();
        return redirect()->route('fuel.index')->with('success', 'Fuel measurement deleted successfully.');
    }

    public function export()
    {
        return Excel::download(new FuelExport, 'fuel.xlsx');
    }      
}
