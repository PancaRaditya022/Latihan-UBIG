<?php

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\VaccinationController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::prefix('v1')->group(function () {
    Route::get('/health', function () {
        return response()->json([
            'status' => true,
            'message' => 'API OK !'
        ]);
    });

    Route::post('/auth/login', [AuthController::class, 'login'])->name('login');

    // Route::middleware('auth:api')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::post('/consultations', [ConsultationController::class, 'store']);
        Route::get('/consultations', [ConsultationController::class, 'index']);

        Route::get('/spots', [SpotController::class, 'index']);
        Route::get('/spots/{id}', [SpotController::class, 'show']);

        Route::post('/vaccinations', [VaccinationController::class, 'store']);
        Route::get('/vaccinations', [VaccinationController::class, 'index']);
    // });
});
