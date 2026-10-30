<?php

namespace App\Http\Controllers\Materi09;

use App\Http\Controllers\Controller;
use App\Http\Requests\TambahSiswaRequest;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class ValidasiController extends Controller
{
    // POST /api/m09/cara1
    public function caraSatu(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kelas_id' => 'required|integer|exists:kelas,id',
            'nama' => 'required|string|min:3',
            'nis' => 'required|digits:7|unique:siswa,nis',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid field',
                'errors' => $validator->errors(),
            ], 422);
        }

        $siswa = Siswa::create($validator->validated());

        return response()->json([
            'message' => 'Siswa berhasil ditambah (cara 1)',
            'data' => $siswa,
        ], 201);
    }

    // POST /api/m09/cara2
    public function caraDua(TambahSiswaRequest $request)
    {
        $siswa = Siswa::create($request->validated());

        return response()->json([
            'message' => 'Siswa berhasil ditambah (cara 2)',
            'data' => $siswa,
        ], 201);
    }
}
