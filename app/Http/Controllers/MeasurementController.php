<?php

namespace App\Http\Controllers;

use App\Models\Measurement;
use App\Http\Requests\StoreMeasurementRequest;
use App\Http\Requests\UpdateMeasurementRequest;
use App\Http\Resources\MeasurementResource;

class MeasurementController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {

    $query = Measurement::query();

    $measurements = $query->paginate(2);

    return inertia('Measurement/Index', [
      "measurements" => MeasurementResource::collection($measurements)
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return inertia('Measurement/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreMeasurementRequest $request)
  {
    $data = $request->validated();
    dd($data);
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
    return inertia('Measurement/Edit');
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateMeasurementRequest $request, Measurement $measurement)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Measurement $measurement)
  {
    //
  }
}
