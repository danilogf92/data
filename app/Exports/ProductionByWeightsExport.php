<?php

namespace App\Exports;

use App\Models\ProductionByWeight;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;

class ProductionByWeightsExport implements FromCollection
{
    public function collection()
    {
        dd("test");
        return ProductionByWeight::all();
    }

}
