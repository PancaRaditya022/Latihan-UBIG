<?php

namespace App\Http\Controllers\Materi08;

use App\Http\Controllers\Controller;
use App\Models\Kelas;
use App\Models\Siswa;
class RelasiController extends Controller
{
    // GET /api/m08/siswa-kelas 
    public function siswaDenganKelas()
    {
        $siswa = Siswa::with('kelas')->get();

        return response()->json(['data' => $siswa]);
    }

    // GET /api/m08/kelas
    public function kelasDenganSiswa()
    {
        $kelas = Kelas::with('siswa')->withCount('siswa')->get();

        return response()->json(['data' => $kelas]);
    }

    // GET /api/m08/kelas/1
    public function detailKelas($id)
    {
        $kelas = Kelas::with('siswa')->find($id);

        if (!$kelas) {
            return response()->json(['message' => 'Kelas tidak ditemukan'], 404);
        }

        return response()->json([
            'kelas' => $kelas->nama_kelas,
            'jurusan' => $kelas->jurusan,
            'siswa' => $kelas->siswa->map(function ($s) {
                return [
                    'nama' => $s->nama,
                    'nis' => $s->nis,
                ];
            }),
        ]);
    }
}
