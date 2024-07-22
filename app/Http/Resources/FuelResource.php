<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FuelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->id,
        'fuel_equipment_id' => $this->fuelEquipment->name,
        'date' => (new Carbon($this->date))->format('Y-m-d'),        
        'start_value' => $this->start_value,
        'end_value' => $this->end_value,
        'difference' => $this->difference
        ];
    }
}
