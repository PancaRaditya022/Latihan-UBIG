<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Validators extends Model
{
    protected $table = 'validators';

    protected $fillable = ['user_id', 'role', 'name'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
