<?php

namespace App\Http\Controllers\Materi11;

use App\Http\Controllers\Controller;
use App\Models\Akun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
class AuthController extends Controller
{
    // POST /api/m11/login
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors(),
            ], 422);
        }

        $akun = Akun::where('username', $request->username)->first();

        if (!$akun || !Hash::check($request->password, $akun->password)) {
            return response()->json([
                'message' => 'Username atau password salah'
            ], 401);
        }

        $token = Str::random(40);
        $akun->update(['login_token' => $token]);

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'akun' => $akun, 
        ]);
    }

    // GET /api/m11/profil  
    public function profil(Request $request)
    {
        return response()->json([
            'akun' => $request->user(),
        ]);
    }

    // POST /api/m11/logout  
    public function logout(Request $request)
    {
        $request->user()->update(['login_token' => null]);

        return response()->json([
            'message' => 'Logout berhasil'
        ]);
    }
}
