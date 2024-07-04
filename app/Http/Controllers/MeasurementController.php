<?php

namespace App\Http\Controllers;

use App\Models\Measurement;
use App\Http\Requests\StoreMeasurementRequest;
use App\Http\Requests\UpdateMeasurementRequest;
use App\Http\Resources\MeasurementResource;
use App\Models\Meter;
use App\Models\Plant;
use Illuminate\Support\Facades\Auth;

class MeasurementController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {

    $query = Measurement::query();

    $measurements = $query->orderBy('date', 'DESC')->paginate(10);

    return inertia('Measurement/Index', [
      "measurements" => MeasurementResource::collection($measurements)
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

    $plants = Plant::orderBy('name', 'ASC')->get();
    $meters = Meter::where('enabled', 1)
               ->orderBy('name', 'ASC')
               ->get();

    // $measurements = Measurement::orderBy('date', 'desc')
    //                         // ->take(10)
    //                         ->get();              


    return inertia('Measurement/Create', [
      "plants" => $plants,
      "meters" => $meters
      // "measurements" => $measurements
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreMeasurementRequest $request)
  {

    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Create Water')) {
      abort(403, 'Unauthorized action.');
    }

    $data = $request->validated();
    Measurement::create($data);
   // return redirect()->route('measurement.index')->with('success', 'Measurement created successfully.');
  }
  /**
   * Display the specified resource.
   */
  public function show(Measurement $measurement)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Measurement $measurement)
  {
    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Edit Water')) {
      abort(403, 'Unauthorized action.');
    }
    
    $plants = Plant::orderBy('name', 'ASC')->get();
    $meters = Meter::orderBy('name', 'ASC')->get();

    return inertia('Measurement/Edit', [
      "plants" => $plants,
      "meters" => $meters,
      "measurement" => $measurement
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateMeasurementRequest $request, Measurement $measurement)
  {
    $data = $request->validated();
    $measurement->update($data);

    return redirect()->route('measurement.index')->with('success', 'Measurement updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Measurement $measurement)
  {
    $permissions = Auth::user()->getPermissionNames();

    if (!$permissions->contains('Delete Water')) {
      abort(403, 'Unauthorized action.');
    }

    $measurement->delete();
    return redirect()->route('measurement.index')->with('success', 'Delete Measurement.');
  }
}
