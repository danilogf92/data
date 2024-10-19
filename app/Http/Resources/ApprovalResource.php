<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ApprovalResource extends JsonResource
{
  /**
   * Transforma los datos del modelo Approval en un array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array<string, mixed>
   */
  public function toArray($request)
  {
    return [
      'id' => $this->id,
      'fechaEjecucion' => (new Carbon($this->fechaEjecucion))->format('Y-m-d'),
      // 'desde' => $this->desde,
      // 'hasta' => $this->hasta,
      // 'inspectorSSA' => $this->inspectorSSA,
      'plant' => $this->plant->name,
      'areaMaquina' => $this->areaMaquina,
      'ejecutorTrabajo' => $this->ejecutorTrabajo,
      'descripcionTrabajo' => $this->descripcionTrabajo,
      // 'condiciones' => $this->condiciones,
      // 'TrabajosIncompatible' => $this->TrabajosIncompatible,
      // 'RiesgosFactores' => $this->RiesgosFactores,
      // 'TrabajosElectricos' => $this->TrabajosElectricos,
      // 'TrabajosDeSoldadura' => $this->TrabajosDeSoldadura,
      'TrabajosEnAlturas' => $this->TrabajosEnAlturas,
      // 'Escalera' => $this->Escalera,
      // 'Montacargas' => $this->Montacargas,
      // 'Andamios' => $this->Andamios,
      // 'Techo' => $this->Techo,
      // 'TrabajosDentroCocinadores' => $this->TrabajosDentroCocinadores,
      // 'TrabajosTransportar' => $this->TrabajosTransportar,
      // 'TrabajosLevantarObjetos' => $this->TrabajosLevantarObjetos,
      // 'created_at' => $this->created_at->toDateTimeString(),
      // 'updated_at' => $this->updated_at->toDateTimeString(),
    ];
  }
}
