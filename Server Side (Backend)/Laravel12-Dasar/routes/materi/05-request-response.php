<?php

use App\Http\Controllers\Materi05\KalkulatorController;
use Illuminate\Support\Facades\Route;
Route::prefix('m05')->group(function () {
    Route::post('/tambah', [KalkulatorController::class, 'tambah']);
    Route::get('/cari', [KalkulatorController::class, 'cari']);
    Route::post('/bagi', [KalkulatorController::class, 'bagi']);
    Route::get('/header', [KalkulatorController::class, 'header']);
});
