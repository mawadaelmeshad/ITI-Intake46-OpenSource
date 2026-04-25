<?php
// app/Http/Controllers/Api/AuthController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use ApiResponse;

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return $this->error('Validation Failed', 422, $validator->errors());
        }

        $user  = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $token = Auth::login($user);

        return $this->success(['token' => $token, 'user' => $user], 'Registered successfully', 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $token       = Auth::attempt($credentials);  // same as lecture slide!

        if (!$token) {
            return $this->error('Invalid credentials', 401);
        }

        return $this->success(['token' => $token], 'Login successful');
    }
}