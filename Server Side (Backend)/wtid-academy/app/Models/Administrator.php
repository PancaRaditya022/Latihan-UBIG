<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
// use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Administrator extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'administrators';

    protected $fillable = ['username', 'password', 'remember_token', 'created_at', 'updated_at'];

    protected $hidden = ['password', 'remember_token'];
}
