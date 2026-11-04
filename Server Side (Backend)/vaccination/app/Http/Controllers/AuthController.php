<?php

namespace App\Http\Controllers;

use App\Models\Society;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\AuthResource;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(AuthRequest $request)
    {
        $validated = $request->validated();

        $society = Society::with('regional')
            ->where('id_card_number', $validated['id_card_number'])
            ->where('password', $validated['password'])
            ->first();

        if(!$society) {
            return response()->json([
                'message' => 'ID Card Number or Password incorrect'
            ], 401);
        }

        $token = md5($society->id_card_number);
        $society->update(['login_tokens' => $token]);
        $society->token = $token;
        // dd($token);

        // dd(new AuthResource($society));
        return new AuthResource($society);
    }

    public function logout(Request $request)
    {
        $token = $request->header('token') ?? $request->query('token');
        // dd($token);

        if (!$token) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $society = Society::where('login_tokens', $token)->first();

        if (!$society) {
            return response()->json([
                'message' => 'Unauthorized user'
            ], 401);
        }

        $society->update(['login_tokens' => null]);

        return response()->json([
            'message' => 'Logout success'
        ], 200);
    }
}
