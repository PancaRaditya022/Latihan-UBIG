<?php

use App\Http\Controllers\Materi04\SapaController;
use Illuminate\Support\Facades\Route;
Route::prefix('m04')->group(function () {
    Route::get('/halo', [SapaController::class, 'halo']);
    Route::get('/sapa/{nama}', [SapaController::class, 'sapa']);
    Route::get('/jadwal', [SapaController::class, 'jadwal']);
});
