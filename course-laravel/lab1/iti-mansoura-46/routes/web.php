<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/',[PostController::class, 'index'])->name('posts.index');

//show the create form
Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');

Route::get('/posts/edit/{post}', [PostController::class, 'edit'])->name('posts.edit');
Route::post('/posts/update/{post}', [PostController::class, 'update'])->name('posts.update');


Route::post('/posts', [PostController::class, 'store'])->name('posts.store');

Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
