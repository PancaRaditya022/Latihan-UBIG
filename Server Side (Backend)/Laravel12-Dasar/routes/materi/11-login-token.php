<?php

use App\Http\Controllers\Materi11\AuthController;
use App\Http\Middleware\CekTokenMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('m11')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(CekTokenMiddleware::class)->group(function () {
        Route::get('/profil', [AuthController::class, 'profil']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
