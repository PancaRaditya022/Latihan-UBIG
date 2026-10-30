<?php

use App\Http\Controllers\Materi07\SiswaController;
use Illuminate\Support\Facades\Route;


Route::prefix('m07')->group(function () {
    Route::get('/cari', [SiswaController::class, 'cari']);
    Route::get('/siswa', [SiswaController::class, 'index']);
    Route::get('/siswa/{id}', [SiswaController::class, 'show']);
    Route::post('/siswa', [SiswaController::class, 'store']);
    Route::put('/siswa/{id}', [SiswaController::class, 'update']);
    Route::delete('/siswa/{id}', [SiswaController::class, 'destroy']);
});
