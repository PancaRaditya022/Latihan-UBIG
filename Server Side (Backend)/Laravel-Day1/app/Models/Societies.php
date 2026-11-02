<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Societies extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'societies';

    public $timestamps = false;

    protected $fillable = ['id_card_number', 'password', 'name', 'born_date', 'gender', 'address', 'regional_id' ,'login_tokens'];

    protected $hidden = ['password'];

    public function regional() {
        return $this->belongsTo(Regional::class, 'regional_id', 'id');
    }
}
