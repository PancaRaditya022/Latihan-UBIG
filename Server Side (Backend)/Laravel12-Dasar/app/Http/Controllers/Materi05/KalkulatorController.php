<?php

namespace App\Http\Controllers\Materi05;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
class KalkulatorController extends Controller
{
    public function tambah(Request $request)
    {
        $a = $request->input('a'); 
        $b = $request->input('b');

        return response()->json([
            'a' => $a,
            'b' => $b,
            'hasil' => $a + $b,
        ], 200);
    }

    // GET /api/m05/cari?kata=laravel&halaman=2
    public function cari(Request $request)
    {
        return response()->json([
            'kata' => $request->query('kata'),
            'halaman' => $request->query('halaman', 1),
        ]);
    }

    // POST /api/m05/bagi   body: { "a": 10, "b": 0 }
    public function bagi(Request $request)
    {
        if ($request->input('b') == 0) {
            return response()->json([
                'message' => 'Ga bisa dibagi 0',
            ], 422);
        }

        return response()->json([
            'hasil' => $request->input('a') / $request->input('b'),
        ], 200);
    }

    // GET /api/m05/header
    public function header(Request $request)
    {
        return response()->json([
            'accept' => $request->header('Accept'),
            'token' => $request->bearerToken(),
            'semua_input' => $request->all(),
        ]);
    }
}
