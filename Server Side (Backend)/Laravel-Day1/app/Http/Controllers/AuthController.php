<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use Illuminate\Http\Request;
use App\Providers\AuthProvider;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use ApiResponse;

    protected $authProvider;

    public function __construct() {
        $this->authProvider = new AuthProvider();
    }

    public function login(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'id_card_number' => 'required|string|max:10',
            'password' => 'required|string|min:5'
        ]);

        if($validator->fails()) {
            return $this->errorResponse('ID Card Number or Password incorrect', 401);
        }

        $result = $this->authProvider->attemptLogin(
            $request->only('id_card_number', 'password')
        );

        if($result === false) {
            return $this->errorResponse('ID Card Number or Password incorrect', 401);
        };

        return response()->json($result, 200);
    }

    public function logout(): JsonResponse {
        $result = $this->authProvider->attemptLogout();

        if (!$result) {
            return $this->errorResponse('Invalid token', 401);
        }

        return $this->successNoData('Logout success');
    }
}
