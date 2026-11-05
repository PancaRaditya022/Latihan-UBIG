<?php

// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\SetsController;
use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/health', function () {
    return response()->json([
        'status' => true,
        'message' => 'API OK !',
        'data' => null
    ]);
});

Route::post('/register', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/courses', [CourseController::class, 'index']);
    Route::post('/courses', [CourseController::class, 'store']);
    Route::get('/courses/{slug}', [CourseController::class, 'show']);
    Route::put('/courses/{slug}', [CourseController::class, 'update']);
    Route::delete('/courses/{slug}', [CourseController::class, 'destroy']);

    Route::post('/courses/{courses:slug}/sets', [SetsController::class, 'store']);
    Route::delete('/courses/{courses:slug}/sets/{id}', [SetsController::class, 'destroy']);

    Route::post('/lessons', [LessonController::class, 'store']);
    Route::delete('/lessons/{id}', [LessonController::class, 'destroy']);
});


Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::post('/courses/{courses:slug}/register', [CourseController::class, 'register']);
    Route::post('/lesson-contents/{id}/contents/{content_id}/check', [LessonController::class, 'checkAnswer']);

    Route::put('/lessons/{id}/complete', [LessonController::class, 'update']);

    Route::get('/users/progress', [UserController::class, 'index']);
});
