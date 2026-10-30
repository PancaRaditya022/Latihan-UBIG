<?php

namespace App\Http\Controllers\Materi07;

use App\Http\Controllers\Controller;
use App\Models\Siswa;
use Illuminate\Http\Request;
class SiswaController extends Controller
{
    // GET /api/m07/siswa
    public function index()
    {
        $siswa = Siswa::all();
        return response()->json([
            'total' => $siswa->count(),
            'data' => $siswa,
        ]);
    }

    // GET /api/m07/siswa/1
    public function show($id)
    {
        $siswa = Siswa::find($id); 

        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        return response()->json(['data' => $siswa]);
    }

    // POST /api/m07/siswa
    public function store(Request $request)
    {
        $siswa = Siswa::create($request->only(['kelas_id', 'nama', 'nis', 'jenis_kelamin', 'alamat']));

        return response()->json([
            'message' => 'Siswa berhasil ditambah',
            'data' => $siswa,
        ], 201);
    }

    // PUT /api/m07/siswa/1 
    public function update(Request $request, $id)
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        $siswa->update($request->only(['kelas_id', 'nama', 'nis', 'jenis_kelamin', 'alamat']));

        return response()->json([
            'message' => 'Siswa berhasil diubah',
            'data' => $siswa,
        ]);
    }

    // DELETE /api/m07/siswa/1
    public function destroy($id)
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        $siswa->delete();

        return response()->json(['message' => 'Siswa berhasil dihapus']);
    }

    // GET /api/m07/cari?jk=P
    public function cari(Request $request)
    {
        $siswa = Siswa::where('jenis_kelamin', $request->query('jk', 'P'))
            ->orderBy('nama')
            ->get();

        return response()->json(['data' => $siswa]);
    }
}
