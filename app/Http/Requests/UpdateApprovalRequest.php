<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApprovalRequest extends FormRequest
{
  // Determina si el usuario está autorizado a realizar esta solicitud
  public function authorize(): bool
  {
    return true; // Cambia esto según la lógica de autorización que necesites
  }

  // Define las reglas de validación para la actualización
  public function rules(): array
  {
    return [
      'fechaEjecucion' => 'sometimes|required|date',
      'desde' => 'sometimes|required|string|max:255',
      'hasta' => 'sometimes|required|string|max:255',
      'inspectorSSA' => 'sometimes|required|string|max:255',
      'plant_id' => 'sometimes|required|exists:plants,id', // Verifica que la planta exista
      'areaMaquina' => 'sometimes|required|string|max:255',
      'ejecutorTrabajo' => 'sometimes|required|string|max:255',
      'descripcionTrabajo' => 'sometimes|required|string|max:1000',
      'condiciones' => 'sometimes|required|array',
      'TrabajosIncompatible' => 'nullable|string|max:255',
      'RiesgosFactores' => 'nullable|string|max:255',

      // Campos booleanos representados como "SI" o "NO"
      'TrabajosElectricos' => 'sometimes|required|string|in:SI,NO',
      'TrabajosDeSoldadura' => 'sometimes|required|string|in:SI,NO',
      'TrabajosEnAlturas' => 'sometimes|required|string|in:SI,NO',
      'Escalera' => 'sometimes|required|string|in:SI,NO',
      'Montacargas' => 'sometimes|required|string|in:SI,NO',
      'Andamios' => 'sometimes|required|string|in:SI,NO',
      'Techo' => 'sometimes|required|string|in:SI,NO',
      'TrabajosDentroCocinadores' => 'sometimes|required|string|in:SI,NO',
      'TrabajosTransportar' => 'sometimes|required|string|in:SI,NO',
      'TrabajosLevantarObjetos' => 'sometimes|required|string|in:SI,NO',
    ];
  }

  // Personaliza los mensajes de error
  public function messages(): array
  {
    return [
      'fechaEjecucion.required' => 'La fecha de ejecución es obligatoria.',
      'desde.required' => 'El campo "Desde" es obligatorio.',
      'hasta.required' => 'El campo "Hasta" es obligatorio.',
      'inspectorSSA.required' => 'El campo "Inspector SSA" es obligatorio.',
      'plant_id.required' => 'El campo "Planta" es obligatorio.',
      'plant_id.exists' => 'La planta seleccionada no existe.',
      'descripcionTrabajo.required' => 'La descripción del trabajo es obligatoria.',
      'descripcionTrabajo.max' => 'La descripción no debe exceder los 1000 caracteres.',
      'condiciones.required' => 'Las condiciones son obligatorias.',
      'TrabajosElectricos.required' => 'El campo "Trabajos Eléctricos" es obligatorio.',
      'TrabajosDeSoldadura.required' => 'El campo "Trabajos de Soldadura" es obligatorio.',
      'TrabajosEnAlturas.required' => 'El campo "Trabajos en Alturas" es obligatorio.',
      'Escalera.required' => 'El campo "Escalera" es obligatorio.',
      'Montacargas.required' => 'El campo "Montacargas" es obligatorio.',
      'Andamios.required' => 'El campo "Andamios" es obligatorio.',
      'Techo.required' => 'El campo "Techo" es obligatorio.',
      'TrabajosDentroCocinadores.required' => 'El campo "Trabajos dentro de Cocinadores" es obligatorio.',
      'TrabajosTransportar.required' => 'El campo "Trabajos a Transportar" es obligatorio.',
      'TrabajosLevantarObjetos.required' => 'El campo "Trabajos a Levantar Objetos" es obligatorio.',
    ];
  }
}
