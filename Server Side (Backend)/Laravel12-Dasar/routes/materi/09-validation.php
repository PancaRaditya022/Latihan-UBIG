<?php

use App\Http\Controllers\Materi09\ValidasiController;
use Illuminate\Support\Facades\Route;

Route::prefix('m09')->group(function () {
    Route::post('/cara1', [ValidasiController::class, 'caraSatu']);
    Route::post('/cara2', [ValidasiController::class, 'caraDua']);
});
