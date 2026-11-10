<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\Society;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(AuthRequest $request) {
        $validate = $request->validated();

        $societies = Society::with('regional')
            ->where('id_card_number', $validate['id_card_number'])
            ->where('password', $validate['password'])
            ->first();
        
        if (!$societies) {
            return response()->json([
                'message' => 'ID Card Number or Password incorrect'
            ], 401);
        }

        $token = md5($societies->id_card_number);
        $societies->update(['login_tokens' => $token]);

        return response()->json([
            'name' => $societies->name,
            'born_date' => $societies->born_date,
            'gender' => $societies->gender,
            'address' => $societies->address,
            'token' => $token,
            'regional' => [
                'id' => $societies->regional->id,
                'province' => $societies->regional->province,
                'district' => $societies->regional->district
            ]
        ], 200);
    }

    public function logout(Request $request) {
        $token = $request->query('token');

        if(!$token) {
            return response()->json([
                'message' => 'Invalid token'
            ], 401);
        }

        $societies = Society::where('login_tokens')->first();

        $societies->update(['login_tokens' => null]);

        return response()->json([
            'message' => 'Logout success'
        ], 200);
    }
}
