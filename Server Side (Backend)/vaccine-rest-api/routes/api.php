<?php

// use Illuminate\Http\Request;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsulationController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\VaccinationController;
use App\Models\Spot;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix("v1")->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::post('/consultations', [ConsulationController::class, 'store']);
    Route::get('/consultations', [ConsulationController::class, 'index']);

    Route::get('/spots', [SpotController::class, 'index']);
    Route::get('/spots/{spot_id}', [SpotController::class, 'show']);

    Route::post('/vaccinations', [VaccinationController::class, 'store']);
    Route::get('/vaccinations', [VaccinationController::class, 'index']);
});