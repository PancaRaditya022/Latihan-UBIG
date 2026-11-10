<?php

use App\Http\Controllers\ApplicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ValidationsController;
use App\Http\Controllers\InstallmentCarsController;

Route::prefix('v1')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::post('/validation', [ValidationsController::class, 'store']);
        Route::get('/validations', [ValidationsController::class, 'index']);

        Route::get('/instalment_cars', [InstallmentCarsController::class, 'index']);
        Route::get('/instalment_cars/{id}', [InstallmentCarsController::class, 'show']);

        Route::post('/applications', [ApplicationController::class, 'store']);
        Route::get('/applications', [ApplicationController::class, 'index']);
    });
});

Route::get('/health', function(Request $request) {
    return json_encode([
        'status' => true,
        'message' => 'API Sehat'
    ]);
});
