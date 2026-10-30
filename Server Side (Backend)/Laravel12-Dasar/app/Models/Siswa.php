<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Siswa extends Model
{
    protected $table = 'siswa';

    protected $fillable = ['kelas_id', 'nama', 'nis', 'jenis_kelamin', 'alamat'];
    
    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }
}
