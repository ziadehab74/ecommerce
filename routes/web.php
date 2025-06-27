<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/{any}', function () {
    return view('welcome'); // 👈 this should be the Blade view that loads your React app
})->where('any', '.*');
