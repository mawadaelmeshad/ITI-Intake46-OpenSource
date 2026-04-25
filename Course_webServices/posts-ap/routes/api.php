<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Route;

// Auth routes (public)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Public post routes
Route::get('/posts',     [PostController::class, 'index']);
Route::get('/posts/{id}',[PostController::class, 'show']);

// Protected post routes — JWT required
Route::middleware('auth:api')->group(function () {
    Route::post('/posts',        [PostController::class, 'store']);
    Route::put('/posts/{id}',    [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
});