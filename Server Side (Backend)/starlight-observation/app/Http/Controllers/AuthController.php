<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Providers\AuthProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    protected $authProvider;

    public function __construct()
    {
        $this->authProvider = new AuthProvider();
    }

    public function login(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required|string|min:8'
        ]);

        if($validator->fails()) {
            return response()->json([
                'message' => 'Username or Password incorrect'
            ], 401);
        }

        $result = $this->authProvider->attemptLogin(
            $request->only('username', 'password')
        );

        if(!$result) {
            return response()->json([
                'message' => 'Username or Password incorrect'
            ], 401);
        }

        return response()->json($result, 200);
    }

    public function logout(): JsonResponse {
        $result = $this->authProvider->execLogout();

        if(!$result) {
            return response()->json([
                'message' => 'Invalid token'
            ], 401);
        }
        return response()->json([
            'message' => 'Logout success'
        ], 200);
    }
}
