<?php

namespace App\Exports;

use App\Models\Fuel;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Carbon;

class FuelExport implements FromQuery, WithMapping, WithHeadings
{
    use Exportable;

    public function query()
    {
        return Fuel::select(
            'fuel_equipment.name as fuel_equipment_name',
            'fuel_measurements.date',
            'fuel_measurements.start_value',
            'fuel_measurements.end_value',
            'fuel_measurements.difference',
            'plants.name as plant_name',
            'fuel_types.name as fuel_type_name'
        )
        ->join('plants', 'fuel_measurements.plant_id', '=', 'plants.id')
        ->join('fuel_equipment', 'fuel_measurements.fuel_equipment_id', '=', 'fuel_equipment.id')
        ->join('fuel_types', 'fuel_equipment.type_fuel_id', '=', 'fuel_types.id');

    }

    public function map($fuelMeasurement): array
    {
        return [
            $fuelMeasurement->fuel_equipment_name,
            $fuelMeasurement->fuel_type_name,
            Carbon::parse($fuelMeasurement->date)->format('n/j/Y'), 
            $fuelMeasurement->start_value,
            $fuelMeasurement->end_value,
            $fuelMeasurement->difference,
            $fuelMeasurement->plant_name,
        ];
    }

    public function headings(): array
    {
        return [
            'Nombre del Equipo',
            'Tipo de Combustible ',
            'Fecha',
            'Inicio',
            'Final',
            'Diferencia',
            'Planta',
        ];
    }
}
