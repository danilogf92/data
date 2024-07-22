<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FuelEquipmentResource\Pages;
use App\Filament\Resources\FuelEquipmentResource\RelationManagers;
use App\Models\FuelEquipment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class FuelEquipmentResource extends Resource
{
    protected static ?string $model = FuelEquipment::class;

    protected static ?string $navigationGroup = 'Fuel consumption managment';

    protected static ?string $navigationIcon = 'heroicon-o-funnel';
    
    protected static ?int $navigationSort = 2;    

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),

                Forms\Components\Select::make('plant_id')
                    ->relationship(name: 'plant', titleAttribute: 'name')
                    ->searchable()
                    ->preload()
                    ->required(),                    

                Forms\Components\Select::make('type_fuel_id')
                    ->relationship(name: 'fuelType', titleAttribute: 'name')
                    ->searchable()
                    ->preload()
                    ->required(),  
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->searchable(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('plant.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('fuelType.name')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFuelEquipment::route('/'),
            'create' => Pages\CreateFuelEquipment::route('/create'),
            'edit' => Pages\EditFuelEquipment::route('/{record}/edit'),
        ];
    }
}
