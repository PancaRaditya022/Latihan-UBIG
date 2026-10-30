<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Route::prefix('m03')->group(function () {
    //GET /api/m03/halo
    Route::get('/halo', function () {
        return 'halo dari laravel!';
    });
    // GET /api/m03/profil
    Route::get('/profil', function () {
        return [
            'nama' => 'April',
            'sekolah' => 'SMK Cyber Media',
            'jurusan' => 'PG',
        ];
    });
    Route::get('/sapa/{nama}', function ($nama) {
        return "halo {$nama}, selamat belajar!";
    });
    // GET /api/m03/kelas     
    // GET /api/m03/kelas/11
    Route::get('/kelas/{angka?}', function ($angka = 10) {
        return "kamu kelas {$angka}";
    });
    // POST /api/m03/kirim  
    Route::post('/kirim', function (Request $request) {
        return [
            'diterima' => $request->input('pesan'),
        ];
    });
});
