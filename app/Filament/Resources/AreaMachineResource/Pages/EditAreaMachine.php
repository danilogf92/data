<?php

namespace App\Filament\Resources\AreaMachineResource\Pages;

use App\Filament\Resources\AreaMachineResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAreaMachine extends EditRecord
{
  protected static string $resource = AreaMachineResource::class;

  protected function getHeaderActions(): array
  {
    return [
      Actions\DeleteAction::make(),
    ];
  }

  protected function getRedirectUrl(): string
  {
    return $this->getResource()::getUrl('index');
  }
}
