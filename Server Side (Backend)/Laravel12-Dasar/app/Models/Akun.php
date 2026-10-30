<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Akun extends Model
{
    protected $table = 'akun';

    protected $fillable = ['username', 'password', 'nama', 'login_token'];

    protected $hidden = ['password', 'login_token'];
}
