<?php
use App\Http\Controllers\API\MeterController;
use App\Http\Controllers\API\PlantController;
use App\Http\Controllers\API\PowerBiController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\EnsureStaticTokenIsValid;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('measurement', MeasurementController::class);

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('api')->group(function () {
        Route::get('/plants', [PlantController::class, 'index']);
        Route::get('/meters', [MeterController::class, 'index']);
    });
});

Route::prefix('api')->middleware(EnsureStaticTokenIsValid::class)->group(function () {
    Route::get('/measurements', [PowerBiController::class, 'measurements']);
    Route::get('/meter', [PowerBiController::class, 'meters']);
    Route::get('/metertypes', [PowerBiController::class, 'metertypes']);
    Route::get('/plant', [PowerBiController::class, 'plants']);
});

require __DIR__ . '/auth.php';

