<?php

use App\Http\Controllers\API\LastValueController;
use App\Http\Controllers\API\MeterController;
use App\Http\Controllers\API\PlantController;
use App\Http\Controllers\API\PowerBiController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\ProductionByWeightController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\EnsureStaticTokenIsValid;
use Illuminate\Support\Facades\Route;

// Route::redirect('/', '/dashboard');
Route::get('/', function () {
    return inertia('Welcome');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('measurement', MeasurementController::class);
    Route::resource('production-by-weight', ProductionByWeightController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('api')->group(function () {
        Route::get('/plants', [PlantController::class, 'index']);
        Route::get('/meters', [MeterController::class, 'index']);
        Route::get('/lastvalue', [LastValueController::class, 'index']);
    });

    Route::get('/measurements/export', [MeasurementController::class, 'export'])->name('measurements.export');
    Route::get('/production-by-weights/export', [ProductionByWeightController::class, 'export'])->name('production-by-weight.export');
});

Route::prefix('api')->middleware(EnsureStaticTokenIsValid::class)->group(function () {
    Route::get('/measurements', [PowerBiController::class, 'measurements']);
    Route::get('/meter', [PowerBiController::class, 'meters']);
    Route::get('/metertypes', [PowerBiController::class, 'metertypes']);
    Route::get('/plant', [PowerBiController::class, 'plants']);
    Route::get('/production', [PowerBiController::class, 'production']);
});

require __DIR__ . '/auth.php';

