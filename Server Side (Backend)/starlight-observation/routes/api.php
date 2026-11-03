<?php

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ObservatoryController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ValidationController;
// use App\Models\Observatory;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::post('/validation', [ValidationController::class, 'store']);
        Route::get('/validations', [ValidationController::class, 'index']);

        Route::get('/slots', [ObservatoryController::class, 'search']);
        Route::get('/slots/{id}', [ObservatoryController::class, 'show']);

        Route::post('/reservations', [ReservationController::class, 'store']);
        Route::get('/reservations', [ReservationController::class, 'index']);
    });

    Route::get('/health', function () {
        return response()->json([
            'status' => true,
            'message' => 'API OK !'
        ]);
    });
});
