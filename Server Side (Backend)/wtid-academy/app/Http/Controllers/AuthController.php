<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\AuthResource;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\RegisterResource;
use App\Models\Administrator;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function store(RegisterRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'full_name' => $validated['full_name'],
            'username'  => $validated['username'],
            'password'  => Hash::make($validated['password']),
            'role'      => 'user'
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        // dd($token)

        $user->token = $token;
        $user->role = 'user';
        // dd($user->role)

        return response()->json([
            'status'  => 'success',
            'message' => 'User registration successful',
            'data'    => new RegisterResource($user)
        ], 201);
    }

    public function login(AuthRequest $request) {
        $validated = $request->validated();

        $admin = Administrator::where('username', $validated['username'])->first();
        $user = User::where('username', $validated['username'])->first();

        if($admin && Hash::check($validated['password'], $admin->password)) {
            $token = $admin->createToken('auth_token', ['role:admin'])->plainTextToken;

            $admin->token = $token;
            $admin->role = 'admin';

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'data' => new AuthResource($admin)
            ], 200);
        }

        if($user && Hash::check($validated['password'], $user->password)) {
            $token = $user->createToken('auth_token', ['role:user'])->plainTextToken;

            $user->token = $token;
            $user->role = 'role';

            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'data' => new AuthResource($user)
            ], 200);
        }

        return response()->json([
            'status' => 'authentication_failed',
            'message' => 'The username or password you entered is incorrect'
        ], 401);
    }

    public function logout(Request $request) {
        $token = $request->user()?->currentAccessToken();

        if (!$token) {
            return response()->json([
                'status'  => 'invalid_token',
                'message' => 'Invalid or expired token'
            ], 401);
        }

        $token->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Logout successful'
        ], 200);
    }
}
