<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
class LatihanSeeder extends Seeder
{
    public function run(): void
    {
        
        DB::table('kelas')->insert([
            ['id' => 1, 'nama_kelas' => 'XI PG 1', 'jurusan' => 'Pengembangan Gim', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'nama_kelas' => 'XI TJKT 1', 'jurusan' => 'Teknik Jaringan', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'nama_kelas' => 'XI DKV 1', 'jurusan' => 'Desain Komunikasi Visual', 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('siswa')->insert([
            ['kelas_id' => 1, 'nama' => 'April', 'nis' => '2425001', 'jenis_kelamin' => 'P', 'alamat' => 'Jakarta', 'created_at' => now(), 'updated_at' => now()],
            ['kelas_id' => 1, 'nama' => 'Budi Santoso', 'nis' => '2425002', 'jenis_kelamin' => 'L', 'alamat' => 'Depok', 'created_at' => now(), 'updated_at' => now()],
            ['kelas_id' => 2, 'nama' => 'Rina Amelia', 'nis' => '2425003', 'jenis_kelamin' => 'P', 'alamat' => 'Bekasi', 'created_at' => now(), 'updated_at' => now()],
            ['kelas_id' => 2, 'nama' => 'Dodi Pratama', 'nis' => '2425004', 'jenis_kelamin' => 'L', 'alamat' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kelas_id' => 3, 'nama' => 'Eka Putri', 'nis' => '2425005', 'jenis_kelamin' => 'P', 'alamat' => 'Bogor', 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('akun')->insert([
            'username' => 'april',
            'password' => Hash::make('rahasia123'),
            'nama' => 'April',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
