<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreAuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ApiResponse;
    public function store(StoreAuthRequest $request)
    {
        
        $user = User::create($request->validated());
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->success([
            ...$user->toArray(),
            'token'=> $token,
        ], 'Registration successful', 201);
    }

    public function login(LoginRequest $request) {
        if(!Auth::attempt($request->validated())) {
            return $this->error('Username or password incorrect', 401);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->success([
            ...$user->toArray(),
            'token'=> $token,
        ], 'Login successful', 200);
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return $this->success(null, 'Logout successful', 200);
    }
}
