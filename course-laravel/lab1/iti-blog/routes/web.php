<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;


Route::get('/',[PostsController::class, 'index'])->name('posts.index');

//show the create form
Route::get('/posts/create', [PostsController::class, 'create'])->name('posts.create');

Route::post('/posts', [PostsController::class, 'store'])->name('posts.store');

Route::get('/posts/{post}', [PostsController::class, 'show'])->name('posts.show');