<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApprovalRequest extends FormRequest
{
  // Determina si el usuario está autorizado a realizar esta solicitud
  public function authorize()
  {
    return true; // Cambia esto según tu lógica de autorización
  }

  // Define las reglas de validación
  public function rules()
  {
    return [
      'fechaEjecucion' => 'required|date',
      'desde' => 'required|string|max:255',
      'hasta' => 'required|string|max:255',
      'inspectorSSA' => 'required|string|max:255',
      'plant' => 'nullable|string|max:255',
      'areaMaquina' => 'nullable|string|max:255',
      'ejecutorTrabajo' => 'nullable|string|max:255',
      'descripcionTrabajo' => 'nullable|string|max:255',
      'condiciones' => 'required|array',
      'TrabajosIncompatible' => 'nullable|string|max:255',
      'RiesgosFactores' => 'nullable|string|max:255',
      'TrabajosElectricos' => 'required|string|in:SI,NO',
      'TrabajosDeSoldadura' => 'required|string|in:SI,NO',
      'TrabajosEnAlturas' => 'required|string|in:SI,NO',
      'TrabajosDentroCocinadores' => 'required|string|in:SI,NO',
      'TrabajosTransportar' => 'required|string|in:SI,NO',
      'TrabajosLevantarObjetos' => 'required|string|in:SI,NO',
    ];
  }

  // Opcional: personaliza los mensajes de error
  public function messages()
  {
    return [
      'fechaEjecucion.required' => 'La fecha de ejecución es obligatoria.',
      'desde.required' => 'El campo "desde" es obligatorio.',
      'hasta.required' => 'El campo "hasta" es obligatorio.',
      'inspectorSSA.required' => 'El campo "inspector SSA" es obligatorio.',
      'condiciones.required' => 'Las condiciones son obligatorias.',
      'TrabajosElectricos.required' => 'El campo "Trabajos Eléctricos" es obligatorio.',
      'TrabajosDeSoldadura.required' => 'El campo "Trabajos de Soldadura" es obligatorio.',
      'TrabajosEnAlturas.required' => 'El campo "Trabajos en Alturas" es obligatorio.',
      'TrabajosDentroCocinadores.required' => 'El campo "Trabajos dentro de Cocinadores" es obligatorio.',
      'TrabajosTransportar.required' => 'El campo "Trabajos a Transportar" es obligatorio.',
      'TrabajosLevantarObjetos.required' => 'El campo "Trabajos a Levantar Objetos" es obligatorio.',
    ];
  }
}
