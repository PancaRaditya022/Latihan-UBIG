<?php

use App\Http\Controllers\PageSectionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\TemplateController;
use App\Models\Pages;
use App\Models\Template;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/pages', [PagesController::class, 'store']);
    Route::get('/pages', [PagesController::class, 'index']);
    Route::get('/pages/{slug}', [PagesController::class, 'show']);
    Route::put('/pages/{slug}', [PagesController::class, 'update']);
    Route::delete('/pages/{pageSlug}', [PagesController::class, 'destroy']);

    Route::get('/templates', [TemplateController::class, 'index']);
    Route::get('/templates/{template}', [TemplateController::class, 'show']);

    Route::post('/pages/{slug}/sections', [PageSectionController::class, 'store']);
    Route::put('/pages/{slug}/sections/{sectionId}/fields', [PageSectionController::class, 'update']);
    Route::put('/pages/{slug}/sections/reorder', [PageSectionController::class, 'reorder']);
    Route::delete('/pages/{slug}/sections/{sectionId}', [PageSectionController::class, 'destroy']);
});