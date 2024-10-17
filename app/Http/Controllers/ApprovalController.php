<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\AreaMachine;
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

    return inertia('Permissions/Create', [
      'plants' => $plants,
      'areaMachine' => $areaMachine,
      'suppliers' => $suppliers
    ]);
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
