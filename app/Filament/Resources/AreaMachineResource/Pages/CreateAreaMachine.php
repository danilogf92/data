<?php

namespace App\Filament\Resources\AreaMachineResource\Pages;

use App\Filament\Resources\AreaMachineResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateAreaMachine extends CreateRecord
{
  protected static string $resource = AreaMachineResource::class;

  protected function getRedirectUrl(): string
  {
    return $this->getResource()::getUrl('index');
  }
}
