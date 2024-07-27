<?php

namespace App\Exports;

use App\Models\Fuel;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\Exportable;
use Illuminate\Support\Carbon;

class FuelExport implements FromQuery, WithMapping, WithHeadings
{
    use Exportable;

    public function query()
    {
        return Fuel::query()
            ->select(
                'fuel_equipment.name as fuel_equipment_name',
                'fuels.date',
                'fuels.start_value',
                'fuels.end_value',
                'fuels.difference',
                'plants.name as plant_name',
                'fuel_types.name as fuel_type_name'
            )
            ->join('plants', 'fuels.plant_id', '=', 'plants.id')
            ->join('fuel_equipment', 'fuels.fuel_equipment_id', '=', 'fuel_equipment.id')
            ->join('fuel_types', 'fuel_equipment.type_fuel_id', '=', 'fuel_types.id');
    }

    public function map($fuel): array
    {
        return [
            $fuel->fuel_equipment_name,
            $fuel->fuel_type_name,
            Carbon::parse($fuel->date)->format('n/j/Y'),
            $fuel->start_value,
            $fuel->end_value,
            $fuel->difference,
            $fuel->plant_name,
        ];
    }

    public function headings(): array
    {
        return [
            'Nombre del Equipo',
            'Tipo de Combustible',
            'Fecha',
            'Inicio',
            'Final',
            'Diferencia',
            'Planta',
        ];
    }
}
