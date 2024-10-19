<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApprovalRequest;
use App\Http\Requests\UpdateApprovalRequest;
use App\Http\Resources\ApprovalResource;
use App\Models\Approval;
use App\Models\AreaMachine;
use App\Models\Condition;
use App\Models\Plant;
use App\Models\Supplier;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ApprovalController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {

    $query = Approval::query();

    // Aplicar filtros
    if ($request->has('date') && $request->date) {
      $query->whereDate('fechaEjecucion', $request->date);
    }

    if ($request->has('rows') && $request->rows) {
      $rowsPerPage = $request->input('rows', $request->rows);
    } else {
      $rowsPerPage = $request->input('rows', 5);
    }

    $data = $query->orderBy('fechaEjecucion', 'DESC')->paginate((int)$rowsPerPage);

    return inertia('Permissions/Index', [
      "data" => ApprovalResource::collection($data),
      'queryParams' => request()->query() ?: null
    ]);
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
  public function store(StoreApprovalRequest $request)
  {
    // Validar los datos y crear un nuevo registro
    $data = $request->validated();
    Approval::create($data);

    // Redirigir al método index con un mensaje de éxito
    return redirect()->route('permission.index')
      ->with('success', 'Approval created successfully.');
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
  public function edit($id)
  {
    $approval = Approval::findOrFail($id);

    $plants = Plant::orderBy('name', 'ASC')->get();
    $areaMachine = AreaMachine::orderBy('nombre', 'ASC')->get();
    $suppliers = Supplier::orderBy('name', 'ASC')->get();
    $conditions = Condition::orderBy('id', 'ASC')->get();

    return inertia(
      'Permissions/Edit',
      [
        "approval" => $approval,
        'plants' => $plants,
        'areaMachine' => $areaMachine,
        'suppliers' => $suppliers,
        'conditions' => $conditions
      ]
    );
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateApprovalRequest $request, $id)
  {
    $approval = Approval::findOrFail($id); // Encuentra el recurso
    $data = $request->validated(); // Valida los datos

    $approval->update($data); // Actualiza el recurso
    return redirect()->route('permission.index')->with('success', 'Approval updated successfully.');
  }



  /**
   * Remove the specified resource from storage.
   */
  public function destroy($id)
  {
    $approval = Approval::findOrFail($id);

    $approval->delete();
    return redirect()->route('permission.index')->with('success', 'Approval deleted successfully.');
  }

  public function export($id)
  {
    // Encuentra la aprobación o lanza un error 404
    $approval = Approval::findOrFail($id);

    // Asegúrate de que la ruta de la plantilla sea correcta
    $templatePath = storage_path('app/template/template.xlsx');
    $fecha = now();
    $plant = preg_replace('/[^A-Za-z0-9_\-]/', '_', $approval->plant->name); // Sanitiza el nombre
    $area = preg_replace('/[^A-Za-z0-9_\-]/', '_', $approval->areaMaquina); // Sanitiza el área

    // Genera la ruta y el nombre del archivo exportado
    $filename = "Permiso_{$plant}_{$area}_{$fecha->format('d-m-Y')}.xlsx";
    $newExcelPath = storage_path("app/exports/{$filename}");

    // Verifica si la plantilla existe
    if (!file_exists($templatePath)) {
      return response()->json(['error' => 'Template file not found.'], 404);
    }

    // Carga la plantilla Excel
    $spreadsheet = IOFactory::load($templatePath);

    // Obtén la hoja activa y modifica los datos
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('B2', $approval->fechaEjecucion);
    $sheet->setCellValue('E2', $approval->desde);
    $sheet->setCellValue('H2', $approval->hasta);
    $sheet->setCellValue('B3', $approval->plant->name);
    $sheet->setCellValue('H3', $approval->areaMaquina);
    $sheet->setCellValue('H4', $approval->ejecutorTrabajo);
    $sheet->setCellValue('A7', $approval->descripcionTrabajo);
    $sheet->setCellValue('A30', $approval->TrabajosIncompatible);
    $sheet->setCellValue('A34', $approval->RiesgosFactores);

    // Itera sobre las condiciones
    $rowIndex = 11;
    foreach ($approval->condiciones as $item) {
      $sheet->setCellValue('A' . $rowIndex, $item['nombre']);
      $sheet->getStyle('A' . $rowIndex)->getFont()->setSize(6)->setBold(true);

      if ($item['cumple'] === "SI") {
        $sheet->setCellValue('G' . $rowIndex, "X");
      } elseif ($item['cumple'] === "NO") {
        $sheet->setCellValue('H' . $rowIndex, "X");
      } else {
        $sheet->setCellValue('I' . $rowIndex, "X");
      }

      $sheet->setCellValue('J' . $rowIndex, $item['observaciones']);
      $rowIndex++;
    }

    // Rellena otras celdas
    $sheet->setCellValue('L39', $approval->TrabajosElectricos);
    $sheet->setCellValue('L40', $approval->TrabajosDeSoldadura);
    $sheet->setCellValue('L41', $approval->TrabajosEnAlturas);
    $sheet->setCellValue('L42', $approval->TrabajosDentroCocinadores);
    $sheet->setCellValue('L43', $approval->TrabajosTransportar);
    $sheet->setCellValue('L44', $approval->TrabajosLevantarObjetos);

    // Guarda el archivo Excel en la ruta especificada
    $writer = new Xlsx($spreadsheet);
    $writer->save($newExcelPath);

    // Descarga el archivo y elimina después de enviar
    return response()->download($newExcelPath)->deleteFileAfterSend(true);
  }
}
