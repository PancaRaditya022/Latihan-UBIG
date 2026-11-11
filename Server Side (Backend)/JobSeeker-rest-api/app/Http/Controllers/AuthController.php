<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\Societies;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(AuthRequest $request) {
        $validated = $request->validated();

        $society = Societies::with('regional')
            ->where('id_card_number', $validated['id_card_number'])
            ->where('password', $validated['password'])
            ->first();

        if (!$society) {
            return response()->json([
                'message' => 'ID Card Number or Password incorrect'
            ], 401);
        }

        $token = md5($society->id_card_number);
        $society->update(['login_tokens' => $token]);

        return response()->json([
            'name' => $society->name,
            'born_date' => $society->born_date,
            'gender' => $society->gender,
            'address' => $society->address,
            'token' => $token,
            'regional' => [
                'id' => $society->regional->id,
                'province' => $society->regional->province,
                'district' => $society->regional->district
            ]
        ], 200);
    }

    public function logout(Request $requets) {
        $token = $requets->query('token');

        $societies = Societies::where('login_tokens', $token)->first();

        if(!$token) {
            return response()->json([
                'message' => 'Invalid token'
            ], 401);
        }

        $societies->update(['login_tokens' => null]);

        return response()->json([
            'message' => 'Logout success'
        ], 200);
    }
}
