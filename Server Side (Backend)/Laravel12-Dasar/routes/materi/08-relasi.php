<?php

use App\Http\Controllers\Materi08\RelasiController;
use Illuminate\Support\Facades\Route;


Route::prefix('m08')->group(function () {
    Route::get('/siswa-kelas', [RelasiController::class, 'siswaDenganKelas']);
    Route::get('/kelas', [RelasiController::class, 'kelasDenganSiswa']);
    Route::get('/kelas/{id}', [RelasiController::class, 'detailKelas']);
});
