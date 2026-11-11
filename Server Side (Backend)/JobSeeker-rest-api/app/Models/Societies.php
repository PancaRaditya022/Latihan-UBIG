<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Societies extends Authenticatable
{
    protected $table = "societies";

    protected $fillable = [
        'id_card_number',
        'password',
        'name',
        'bord_date',
        'gender',
        'address',
        'regional_id',
        'login_tokens'
    ];

    public $timestamps = false;

    protected $hidden = ['password', 'login_tokens'];

    public function regional() {
        return $this->belongsTo(Regional::class, 'regional_id', 'id');
    }
}
