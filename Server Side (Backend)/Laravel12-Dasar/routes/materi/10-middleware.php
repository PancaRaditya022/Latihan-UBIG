<?php

use App\Http\Middleware\CekKunciMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('m10')->group(function () {

    Route::get('/umum', function () {
        return ['message' => 'Ini halaman umum, bebas dibuka'];
    });

    Route::middleware(CekKunciMiddleware::class)->group(function () {
        Route::get('/rahasia', function () {
            return ['message' => 'Selamat, kamu lolos satpam!'];
        });
    });
});
