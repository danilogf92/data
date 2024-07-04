<?php

use App\Http\Controllers\API\MeterController;
use App\Http\Controllers\API\PlantController;
use App\Http\Controllers\API\PowerBiController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MeasurementController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth'])->group(function () {
  // Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
  Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
  Route::resource('measurement', MeasurementController::class);
});

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->prefix('api')->group(function () {
    Route::get('/plants', [PlantController::class, 'index']);
    Route::get('/meters', [MeterController::class, 'index']);
    // Route::get('/power-bi', [PowerBiController::class, 'index']);
});

Route::prefix('api')->group(function () {
    Route::get('/dashboard', [PowerBiController::class, 'index']);
});

require __DIR__ . '/auth.php';
