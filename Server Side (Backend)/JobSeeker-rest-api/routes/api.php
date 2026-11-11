<?php

// use Illuminate\Http\Request;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobApplyController;
use App\Http\Controllers\JobVacancy;
use App\Http\Controllers\ValidationController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::prefix('v1')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login'])->name('login');
    Route::post('/auth/logout', [AuthController::class,'logout']);

    Route::post('/validations', [ValidationController::class, 'store']);
    Route::get('/validations', [ValidationController::class, 'index']);

    Route::get('/job_vacancies', [JobVacancy::class, 'index']);
    Route::get('/job_vacancies/{id}', [JobVacancy::class, 'show']);

    Route::post('/applications', [JobApplyController::class, 'store']);
    Route::get('/applications', [JobApplyController::class, 'index']);
});