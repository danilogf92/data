<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\AreaMachine;
use App\Models\Condition;
use App\Models\Plant;
use App\Models\Supplier;
use Illuminate\Http\Request;

class ApprovalController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return inertia('Permissions/Index');
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $plants = Plant::orderBy('name', 'ASC')->get();
    $areaMachine = AreaMachine::orderBy('nombre', 'ASC')->get();
    $suppliers = Supplier::orderBy('name', 'ASC')->get();
    $conditions = Condition::orderBy('id', 'ASC')->get();

    return inertia('Permissions/Create', [
      'plants' => $plants,
      'areaMachine' => $areaMachine,
      'suppliers' => $suppliers,
      'conditions' => $conditions
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    // $permissions = Auth::user()->getPermissionNames();

    // if (!$permissions->contains('Create Fuel')) {
    //   abort(403, 'Unauthorized action.');
    // }

    // dd($request);

    Approval::create([
      'fechaEjecucion' => $request->fechaEjecucion,
      'desde' => $request->desde,
      'hasta' => $request->hasta,
      'inspectorSSA' => $request->inspectorSSA,
      'plant' => $request->plant,
      'areaMaquina' => $request->areaMaquina,
      'ejecutorTrabajo' => $request->ejecutorTrabajo,
      'descripcionTrabajo' => $request->descripcionTrabajo,
      'condiciones' => json_encode($request->condiciones), // Convierte a JSON
      'TrabajosIncompatible' => $request->TrabajosIncompatible,
      'RiesgosFactores' => $request->RiesgosFactores,
      'TrabajosElectricos' => $request->TrabajosElectricos,
      'TrabajosDeSoldadura' => $request->TrabajosDeSoldadura,
      'TrabajosEnAlturas' => $request->TrabajosEnAlturas,
      'TrabajosDentroCocinadores' => $request->TrabajosDentroCocinadores,
      'TrabajosTransportar' => $request->TrabajosTransportar,
      'TrabajosLevantarObjetos' => $request->TrabajosLevantarObjetos,
    ]);

    return inertia('Permissions/Index');
  }

  /**
   * Display the specified resource.
   */
  public function show(Approval $approval)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Approval $approval)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Approval $approval)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Approval $approval)
  {
    //
  }
}
