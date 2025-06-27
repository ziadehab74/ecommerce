<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\AuthController;

// Public routes
Route::get('/products', [ProductController::class, 'index']);

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes (requires Sanctum token)
Route::middleware('auth:sanctum')->group(function () {
    // Orders
    Route::post('/orders', [OrderController::class, 'store']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});
