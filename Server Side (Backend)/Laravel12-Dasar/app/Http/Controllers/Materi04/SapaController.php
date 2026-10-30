<?php

namespace App\Http\Controllers\Materi04;

use App\Http\Controllers\Controller;
class SapaController extends Controller
{
    // GET /api/m04/halo
    public function halo()
    {
        return response()->json([
            'pesan' => 'halo dari controller!',
        ]);
    }

    // GET /api/m04/sapa/{nama}
    public function sapa($nama)
    {
        return response()->json([
            'pesan' => "halo {$nama}!",
            'panjang_nama' => strlen($nama), 
        ]);
    }

    // GET /api/m04/jadwal
    public function jadwal()
    {
        $jadwal = ['js dasar', 'js es6', 'dom', 'laravel', 'react'];

        $jadwalBesar = array_map(fn ($materi) => strtoupper($materi), $jadwal);

        return response()->json([
            'total' => count($jadwal),
            'jadwal' => $jadwalBesar,
        ]);
    }
}
