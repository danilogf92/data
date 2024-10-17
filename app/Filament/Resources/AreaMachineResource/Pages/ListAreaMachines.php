<?php

namespace App\Filament\Resources\AreaMachineResource\Pages;

use App\Filament\Resources\AreaMachineResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAreaMachines extends ListRecords
{
    protected static string $resource = AreaMachineResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
